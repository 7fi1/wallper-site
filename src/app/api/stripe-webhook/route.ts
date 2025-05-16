import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { buffer } from "micro";
import nodemailer from "nodemailer";

export const config = {
  api: {
    bodyParser: false, // важно!
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  const rawBody = await buffer(req); // ⬅️ используем raw-body из micro
  const signature = req.headers["stripe-signature"] as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // ✅ Обработка события
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const licenseUuid = session.metadata?.license_uuid;
    const customerEmail =
      session.customer_details?.email || session.customer_email;

    if (licenseUuid) {
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
    }
  }

  res.status(200).json({ received: true });
}
