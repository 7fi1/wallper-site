import { Resend } from "resend";
import { Stripe } from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2025-04-30.basil",
});

const resend = new Resend(process.env.RESEND_API_KEY);
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

function countryCodeToEmoji(code: string) {
  if (!code || typeof code !== "string") return "🏳️";
  return code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

const fallbackTimezones: Record<string, string> = {
  US: "America/New_York",
  DE: "Europe/Berlin",
  CZ: "Europe/Prague",
  GB: "Europe/London",
  CA: "America/Toronto",
  AU: "Australia/Sydney",
  UA: "Europe/Kyiv",
};

async function sendLicenseEmail(to: string, licenseUuid: string) {
  await resend.emails.send({
    from: "Wallper Team <support@wallper.app>",
    to,
    subject: "Your license key",
    html: `
  <div style="background-color: #000000; padding: 40px; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
    <div style="max-width: 600px; margin: 0 auto; background-color: #000000; border-radius: 14px; padding: 36px; box-shadow: 0 6px 24px rgba(0,0,0,0.7); color: #ffffff; text-align: center;">
      <h1 style="color: #ffffff; font-size: 28px; margin-bottom: 18px;">Thank you for your purchase!</h1>
      <p style="color: #bbbbbb; font-size: 16px; margin-bottom: 28px;">
        Your personal license key is below. Please keep it safe and secure.
      </p>
      <div style="
        display: inline-block;
        border-radius: 10px;
        padding: 16px 24px;
        font-size: 20px;
        font-weight: bold;
        color: #00aaff;
        letter-spacing: 2px;
        word-break: break-word;
      ">
        ${licenseUuid}
      </div>
      <hr style="border: none; border-top: 1px solid #333; margin: 30px 0;" />
      <p style="color: #888888; font-size: 14px; margin-bottom: 24px;">
        You can return to the store at any time to manage your purchases.
      </p>
      <a href="https://www.wallper.app/" style="
        display: inline-block;
        background: #007aff;
        color: #ffffff;
        text-decoration: none;
        font-size: 14px;
        padding: 12px 28px;
        border-radius: 10px;
        font-weight: 600;
        transition: background 0.3s ease;
      ">
        Back to Wallper
      </a>
      <p style="color: #666666; font-size: 13px; margin-top: 40px; line-height: 1.5;">
        If you have any questions or need assistance, just reply to this email — we're always happy to help.
      </p>
      <p style="color: #007aff; font-size: 13px; margin-top: 20px;">
        — The Wallper Team
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

          const amountTotal = ((data.amount_total || 0) / 100).toFixed(2);
          const currency = data.currency?.toUpperCase() || "USD";
          const country = data.customer_details?.address?.country || "Unknown";

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

              try {
                const customerIp =
                  req.headers.get("x-forwarded-for")?.split(",")[0] ||
                  req.headers.get("x-real-ip") ||
                  "Unknown";

                const orderId = data?.id || "Unknown";
                const timezone =
                  data.metadata?.user_timezone ||
                  fallbackTimezones[country] ||
                  "UTC";

                let localTime = "Unknown";
                try {
                  localTime = new Date().toLocaleString("en-US", {
                    timeZone: timezone,
                    dateStyle: "medium",
                    timeStyle: "short",
                  });
                } catch {
                  localTime = new Date().toUTCString();
                }

                const locale = data.metadata?.locale || "Unknown";
                const deviceType = data.metadata?.device_type || "Unknown";
                const referrer = data.metadata?.referrer || "direct";

                const countryCode = country;
                const countryFlag = countryCodeToEmoji(countryCode);

                const embed = {
                  title: `${countryFlag} New Wallper Purchase`,
                  description:
                    "A new customer just unlocked **Wallper PRO – Lifetime License** 🖥️✨",
                  color: 0xffd700,
                  fields: [
                    {
                      name: "🧾 **Order ID**",
                      value: `\`${orderId}\``,
                      inline: true,
                    },
                    {
                      name: "👤 **Email**",
                      value: customerEmail || "_Not provided_",
                      inline: true,
                    },
                    {
                      name: "🔑 **License Key**",
                      value: `\`${licenseUuid}\``,
                      inline: true,
                    },
                    {
                      name: "💵 **Amount**",
                      value: `**$${amountTotal} ${currency}**`,
                      inline: true,
                    },
                    {
                      name: "🌍 **Country**",
                      value: `${countryFlag} ${countryCode}`,
                      inline: true,
                    },
                    {
                      name: "📦 **Status**",
                      value: data.payment_status || "_Unknown_",
                      inline: true,
                    },
                    {
                      name: "🕒 **Local Time**",
                      value: localTime,
                      inline: true,
                    },
                    {
                      name: "🌐 **IP Address**",
                      value: customerIp,
                      inline: true,
                    },
                    {
                      name: "🗣️ **Locale**",
                      value: locale,
                      inline: true,
                    },
                    {
                      name: "📱 **Device**",
                      value: deviceType,
                      inline: true,
                    },
                    {
                      name: "🔗 **Referrer**",
                      value:
                        referrer.length > 45
                          ? referrer.slice(0, 45) + "…"
                          : referrer,
                      inline: false,
                    },
                  ],
                  footer: {
                    text: "Wallper Store • Premium Experience",
                  },
                  timestamp: new Date().toISOString(),
                };

                const webhookRes = await fetch(DISCORD_WEBHOOK_URL!, {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    username: "Wallper Purchase",
                    avatar_url: "https://www.wallper.app/w.png",
                    content: `🧾 **Order ID**: \`${orderId}\``,
                    embeds: [embed],
                  }),
                });

                if (!webhookRes.ok) {
                  const errText = await webhookRes.text();
                  console.error(
                    "❌ Discord webhook failed:",
                    webhookRes.status,
                    errText
                  );
                } else {
                  console.log("📢 Discord notification sent");
                }
              } catch (error) {
                console.error("❌ Failed to send Discord webhook:", error);
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
