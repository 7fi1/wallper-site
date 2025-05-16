import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import nodemailer from "nodemailer";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendLicenseEmail(to: string, licenseUuid: string) {
  await transporter.sendMail({
    from: `"Wallper app" <${process.env.SMTP_USER}>`,
    to,
    subject: "Ваш лицензионный ключ",
    html: `<p>Спасибо за покупку! Ваш лицензионный ключ:</p><b>${licenseUuid}</b>`,
  });
}

export async function POST(req: NextRequest) {
  const rawBody = await req.arrayBuffer(); // 🧊 получаем СЫРОЕ тело
  const signature = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      Buffer.from(rawBody),
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  // ✅ Обработка события
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
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
    }
  }

  return new NextResponse(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
