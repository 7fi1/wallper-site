import { Stripe } from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-04-30.basil",
});

export async function POST(req: Request) {
  let event: Stripe.Event;

  // Получаем тело запроса как необработанную строку (raw body)
  const body = await req.text();

  // Получаем заголовок Stripe signature
  const stripeSignature = (await headers()).get("stripe-signature");

  try {
    if (!stripeSignature) {
      throw new Error("Missing stripe-signature header");
    }

    // Проверяем подпись и конструируем event
    event = stripe.webhooks.constructEvent(
      body,
      stripeSignature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.log(`❌ Error message: ${errorMessage}`);

    return NextResponse.json(
      { message: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    );
  }

  console.log("✅ Success:", event.id);

  const permittedEvents: string[] = [
    "checkout.session.completed",
    "payment_intent.succeeded",
    "payment_intent.payment_failed",
  ];

  if (permittedEvents.includes(event.type)) {
    try {
      switch (event.type) {
        case "checkout.session.completed": {
          const data = event.data.object as Stripe.Checkout.Session;
          console.log(`💰 CheckoutSession status: ${data.payment_status}`);
          break;
        }
        case "payment_intent.payment_failed": {
          const data = event.data.object as Stripe.PaymentIntent;
          console.log(`❌ Payment failed: ${data.last_payment_error?.message}`);
          break;
        }
        case "payment_intent.succeeded": {
          const data = event.data.object as Stripe.PaymentIntent;
          console.log(`💰 PaymentIntent status: ${data.status}`);
          break;
        }
        default:
          throw new Error(`Unhandled event: ${event.type}`);
      }
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { message: "Webhook handler failed" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ message: "Received" }, { status: 200 });
}
