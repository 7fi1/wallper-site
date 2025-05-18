import { SES } from "aws-sdk";
import { Stripe } from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-04-30.basil",
});

const ses = new SES({
  region: "eu-north-1",
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

async function sendLicenseEmail(to: string, licenseUuid: string) {
  const params = {
    Source: "support@wallper.app",
    Destination: {
      ToAddresses: [to],
    },
    Message: {
      Subject: {
        Data: "Ваш лицензионный ключ",
        Charset: "UTF-8",
      },
      Body: {
        Html: {
          Data: `<p>Спасибо за покупку! Ваш лицензионный ключ:</p><b>${licenseUuid}</b>`,
          Charset: "UTF-8",
        },
      },
    },
  };

  await ses.sendEmail(params).promise();
}

export async function POST(req: Request) {
  const buf = await req.arrayBuffer();
  const body = Buffer.from(buf).toString("utf8");

  const stripeSignature = (await headers()).get("stripe-signature");

  if (!stripeSignature) {
    return NextResponse.json(
      { message: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  try {
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

  const permittedEvents = [
    "checkout.session.completed",
    "payment_intent.succeeded",
    "payment_intent.payment_failed",
  ];

  if (permittedEvents.includes(event.type)) {
    try {
      switch (event.type) {
        case "checkout.session.completed": {
          const data = event.data.object as Stripe.Checkout.Session;
          const licenseUuid = data.metadata?.license_uuid;
          const customerEmail =
            data.customer_details?.email || data.customer_email;

          if (licenseUuid) {
            try {
              const saveRes = await fetch(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/save-license`,
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ licenseUuid }),
                }
              );

              if (!saveRes.ok) {
                console.error("Failed to save license via /api/save-license");
              } else if (customerEmail) {
                try {
                  await sendLicenseEmail(customerEmail, licenseUuid);
                  console.log("✅ Email sent to", customerEmail);
                } catch (emailErr) {
                  console.error("❌ Failed to send email:", emailErr);
                }
              }
            } catch (fetchErr) {
              console.error("❌ Error while saving license:", fetchErr);
            }
          }
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
