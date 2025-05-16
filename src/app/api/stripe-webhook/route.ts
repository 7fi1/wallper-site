import Stripe from "stripe";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendLicenseEmail(to: string, licenseUuid: string) {
  const mailOptions = {
    from: `"Wallper app" <${process.env.SMTP_USER}>`,
    to,
    subject: "Ваш лицензионный ключ",
    text: `Спасибо за покупку! Ваш лицензионный ключ: ${licenseUuid}`,
    html: `<p>Спасибо за покупку! Ваш лицензионный ключ:</p><b>${licenseUuid}</b>`,
  };

  await transporter.sendMail(mailOptions);
}

export async function POST(req: Request) {
  const payload = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  try {
    const event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("metadata:", session.metadata);

      const licenseUuid = session.metadata?.license_uuid;
      const customerEmail =
        session.customer_details?.email || session.customer_email;

      if (licenseUuid) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/save-license`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ licenseUuid }),
          }
        );
        if (!res.ok) {
          console.error("Failed to save license via /api/save-license");
        } else if (customerEmail) {
          try {
            await sendLicenseEmail(customerEmail, licenseUuid);
            console.log("Email sent to", customerEmail);
          } catch (emailErr) {
            console.error("Failed to send email:", emailErr);
          }
        }
        console.log("Payment succeeded, saving license:", licenseUuid);
      }
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Webhook error:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }
}
