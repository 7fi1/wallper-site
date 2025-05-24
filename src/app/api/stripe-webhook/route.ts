import { Resend } from "resend";
import { Stripe } from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-04-30.basil",
});

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendLicenseEmail(to: string, licenseUuid: string) {
  await resend.emails.send({
    from: "Wallper Team <support@wallper.app>",
    to,
    subject: "Your license key",
    html: `
  <div style="background-color: #000000; padding: 40px; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #111111; border-radius: 12px; padding: 32px; box-shadow: 0 4px 20px rgba(0,0,0,0.6); color: #ffffff;">
      
      <div style="text-align: center; margin-bottom: 24px;">
        <img src="https://wallper.app/logo/logo.ico" alt="Wallper Logo" width="64" height="64" style="border-radius: 50%; border: 2px solid #007aff;" />
      </div>

      <h1 style="color: #ffffff; font-size: 24px; text-align: center; margin-bottom: 16px;">Thank you for your purchase!</h1>
      <p style="color: #cccccc; font-size: 16px; text-align: center; margin-bottom: 32px;">
        We’re excited to have you on board. Here’s your personal license key:
      </p>

      <div style="background-color: #1c1c1c; border-left: 4px solid #007aff; padding: 16px 20px; border-radius: 8px; font-size: 20px; font-weight: bold; color: #ffffff; text-align: center; letter-spacing: 1px;">
        ${licenseUuid}
      </div>

      <p style="color: #999999; font-size: 14px; margin-top: 32px; text-align: center;">
        If you have any questions or need help, just reply to this email. Our support team is here for you.
      </p>

      <p style="color: #555555; font-size: 12px; margin-top: 40px; text-align: center;">
        — The <span style="color: #007aff;">Wallper</span> Team
      </p>
    </div>
  </div>
`,
  });
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
