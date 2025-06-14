import { Resend } from "resend";
import { Stripe } from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

const resend = new Resend(process.env.RESEND_API_KEY);
const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;

function countryCodeToEmoji(code: string) {
  if (!/^[A-Z]{2}$/i.test(code)) return "🏳️";
  return code
    .toUpperCase()
    .replace(/./g, (char) => String.fromCodePoint(127397 + char.charCodeAt(0)));
}

const fallbackTimezones: Record<string, string> = {
  AD: "UTC",
  AE: "UTC",
  AF: "UTC",
  AG: "UTC",
  AI: "UTC",
  AL: "UTC",
  AM: "UTC",
  AO: "UTC",
  AQ: "UTC",
  AR: "America/Argentina/Buenos_Aires",
  AS: "UTC",
  AT: "UTC",
  AU: "Australia/Sydney",
  AW: "UTC",
  AX: "UTC",
  AZ: "UTC",
  BA: "UTC",
  BB: "UTC",
  BD: "UTC",
  BE: "Europe/Brussels",
  BF: "UTC",
  BG: "UTC",
  BH: "UTC",
  BI: "UTC",
  BJ: "UTC",
  BL: "UTC",
  BM: "UTC",
  BN: "UTC",
  BO: "UTC",
  BQ: "UTC",
  BR: "America/Sao_Paulo",
  BS: "UTC",
  BT: "UTC",
  BV: "UTC",
  BW: "UTC",
  BY: "UTC",
  BZ: "UTC",
  CA: "America/Toronto",
  CC: "UTC",
  CD: "UTC",
  CF: "UTC",
  CG: "UTC",
  CH: "Europe/Zurich",
  CI: "UTC",
  CK: "UTC",
  CL: "UTC",
  CM: "UTC",
  CN: "Asia/Shanghai",
  CO: "UTC",
  CR: "UTC",
  CU: "UTC",
  CV: "UTC",
  CW: "UTC",
  CX: "UTC",
  CY: "UTC",
  CZ: "Europe/Prague",
  DE: "Europe/Berlin",
  DJ: "UTC",
  DK: "Europe/Copenhagen",
  DM: "UTC",
  DO: "UTC",
  DZ: "UTC",
  EC: "UTC",
  EE: "UTC",
  EG: "Africa/Cairo",
  EH: "UTC",
  ER: "UTC",
  ES: "Europe/Madrid",
  ET: "UTC",
  FI: "Europe/Helsinki",
  FJ: "UTC",
  FK: "UTC",
  FM: "UTC",
  FO: "UTC",
  FR: "Europe/Paris",
  GA: "UTC",
  GB: "Europe/London",
  GD: "UTC",
  GE: "UTC",
  GF: "UTC",
  GG: "UTC",
  GH: "UTC",
  GI: "UTC",
  GL: "UTC",
  GM: "UTC",
  GN: "UTC",
  GP: "UTC",
  GQ: "UTC",
  GR: "Europe/Athens",
  GS: "UTC",
  GT: "UTC",
  GU: "UTC",
  GW: "UTC",
  GY: "UTC",
  HK: "UTC",
  HM: "UTC",
  HN: "UTC",
  HR: "UTC",
  HT: "UTC",
  HU: "Europe/Budapest",
  ID: "UTC",
  IE: "Europe/Dublin",
  IL: "Asia/Jerusalem",
  IM: "UTC",
  IN: "Asia/Kolkata",
  IO: "UTC",
  IQ: "UTC",
  IR: "UTC",
  IS: "UTC",
  IT: "Europe/Rome",
  JE: "UTC",
  JM: "UTC",
  JO: "UTC",
  JP: "Asia/Tokyo",
  KE: "UTC",
  KG: "UTC",
  KH: "UTC",
  KI: "UTC",
  KM: "UTC",
  KN: "UTC",
  KP: "UTC",
  KR: "Asia/Seoul",
  KW: "UTC",
  KY: "UTC",
  KZ: "UTC",
  LA: "UTC",
  LB: "UTC",
  LC: "UTC",
  LI: "UTC",
  LK: "UTC",
  LR: "UTC",
  LS: "UTC",
  LT: "UTC",
  LU: "UTC",
  LV: "UTC",
  LY: "UTC",
  MA: "UTC",
  MC: "UTC",
  MD: "UTC",
  ME: "UTC",
  MF: "UTC",
  MG: "UTC",
  MH: "UTC",
  MK: "UTC",
  ML: "UTC",
  MM: "UTC",
  MN: "UTC",
  MO: "UTC",
  MP: "UTC",
  MQ: "UTC",
  MR: "UTC",
  MS: "UTC",
  MT: "UTC",
  MU: "UTC",
  MV: "UTC",
  MW: "UTC",
  MX: "America/Mexico_City",
  MY: "UTC",
  MZ: "UTC",
  NA: "UTC",
  NC: "UTC",
  NE: "UTC",
  NF: "UTC",
  NG: "UTC",
  NI: "UTC",
  NL: "Europe/Amsterdam",
  NO: "Europe/Oslo",
  NP: "UTC",
  NR: "UTC",
  NU: "UTC",
  NZ: "Pacific/Auckland",
  OM: "UTC",
  PA: "UTC",
  PE: "UTC",
  PF: "UTC",
  PG: "UTC",
  PH: "UTC",
  PK: "UTC",
  PL: "Europe/Warsaw",
  PM: "UTC",
  PN: "UTC",
  PR: "UTC",
  PS: "UTC",
  PT: "Europe/Lisbon",
  PW: "UTC",
  PY: "UTC",
  QA: "UTC",
  RE: "UTC",
  RO: "Europe/Bucharest",
  RS: "UTC",
  RU: "Europe/Moscow",
  RW: "UTC",
  SA: "UTC",
  SB: "UTC",
  SC: "UTC",
  SD: "UTC",
  SE: "Europe/Stockholm",
  SG: "UTC",
  SH: "UTC",
  SI: "UTC",
  SJ: "UTC",
  SK: "Europe/Bratislava",
  SL: "UTC",
  SM: "UTC",
  SN: "UTC",
  SO: "UTC",
  SR: "UTC",
  SS: "UTC",
  ST: "UTC",
  SV: "UTC",
  SX: "UTC",
  SY: "UTC",
  SZ: "UTC",
  TC: "UTC",
  TD: "UTC",
  TF: "UTC",
  TG: "UTC",
  TH: "UTC",
  TJ: "UTC",
  TK: "UTC",
  TL: "UTC",
  TM: "UTC",
  TN: "UTC",
  TO: "UTC",
  TR: "Europe/Istanbul",
  TT: "UTC",
  TV: "UTC",
  TW: "UTC",
  TZ: "UTC",
  UA: "Europe/Kyiv",
  UG: "UTC",
  UM: "UTC",
  US: "America/New_York",
  UY: "UTC",
  UZ: "UTC",
  VA: "UTC",
  VC: "UTC",
  VE: "UTC",
  VG: "UTC",
  VI: "UTC",
  VN: "UTC",
  VU: "UTC",
  WF: "UTC",
  WS: "UTC",
  YE: "UTC",
  YT: "UTC",
  ZA: "Africa/Johannesburg",
  ZM: "UTC",
  ZW: "UTC",
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
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error";
    console.log(`❌ Error message: ${errorMessage}`);
    return NextResponse.json(
      { message: `Webhook Error: ${errorMessage}` },
      { status: 400 }
    );
  }

  if (
    ![
      "checkout.session.completed",
      "payment_intent.succeeded",
      "payment_intent.payment_failed",
    ].includes(event.type)
  ) {
    return NextResponse.json({ message: "Ignored event" }, { status: 200 });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const data = event.data.object as Stripe.Checkout.Session;

      const licenseUuid = data.metadata?.license_uuid;
      const customerEmail = data.customer_details?.email || data.customer_email;
      const amountTotal = ((data.amount_total || 0) / 100).toFixed(2);
      const currency = data.currency?.toUpperCase() || "USD";
      const country = data.customer_details?.address?.country || "Unknown";

      const customerIp =
        req.headers.get("x-forwarded-for")?.split(",")[0] ||
        req.headers.get("x-real-ip") ||
        "Unknown";

      const timezone =
        data.metadata?.user_timezone || fallbackTimezones[country] || "UTC";

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

      const countryFlag = countryCodeToEmoji(country);

      if (licenseUuid) {
        const saveRes = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/save-license`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ licenseUuid }),
          }
        );

        async function sendPurchaseToGA({
          transaction_id,
          value,
          currency,
        }: {
          transaction_id: string;
          value: number;
          currency: string;
        }) {
          const measurement_id = "G-R7N8SPW14W";
          const api_secret = process.env.GA4_API_SECRET!;

          const payload = {
            client_id: Math.floor(Math.random() * 1000000000).toString(),
            events: [
              {
                name: "purchase",
                params: {
                  transaction_id,
                  value,
                  currency,
                  items: [
                    {
                      item_name: "Wallper PRO License",
                      item_id: "license001",
                      price: value,
                      quantity: 1,
                    },
                  ],
                },
              },
            ],
          };

          const res = await fetch(
            `https://www.google-analytics.com/mp/collect?measurement_id=${measurement_id}&api_secret=${api_secret}`,
            {
              method: "POST",
              body: JSON.stringify(payload),
            }
          );

          if (!res.ok) {
            const text = await res.text();
            console.error("❌ Failed to send GA event:", res.status, text);
          } else {
            console.log("✅ Purchase event sent to GA4");
          }
        }

        await sendPurchaseToGA({
          transaction_id: licenseUuid,
          value: parseFloat(amountTotal),
          currency,
        });

        if (!saveRes.ok) {
          console.error("❌ Failed to save license");
        }

        if (customerEmail) {
          await sendLicenseEmail(customerEmail, licenseUuid);
          console.log("✅ Email sent to", customerEmail);
        }

        const embed = {
          title: `${countryFlag} New Wallper Purchase`,
          description:
            "A new customer just unlocked **Wallper PRO – Lifetime License** 🖥️✨",
          color: 0x5865f2,
          fields: [
            {
              name: "👤 Email",
              value: customerEmail || "_Not provided_",
              inline: true,
            },
            {
              name: "🔑 License Key",
              value: `\`${licenseUuid}\``,
              inline: true,
            },
            {
              name: "💵 Amount",
              value: `**$${amountTotal} ${currency}**`,
              inline: true,
            },
            {
              name: "🌍 Country",
              value: `${countryFlag} ${country}`,
              inline: true,
            },
            {
              name: "📦 Status",
              value: data.payment_status || "_Unknown_",
              inline: true,
            },
            { name: "🕒 Local Time", value: localTime, inline: true },
            { name: "🌐 IP Address", value: customerIp, inline: true },
            { name: "🗣️ Locale", value: locale, inline: true },
            { name: "📱 Device", value: deviceType, inline: true },
            {
              name: "🔗 Referrer",
              value:
                referrer.length > 100 ? referrer.slice(0, 100) + "…" : referrer,
              inline: false,
            },
          ],
          footer: { text: "Wallper Store • Pro Experience" },
          timestamp: new Date().toISOString(),
        };

        const webhookRes = await fetch(DISCORD_WEBHOOK_URL!, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: "Wallper Purchase",
            avatar_url: "https://www.wallper.app/w.png",
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
      }

      console.log(`💰 CheckoutSession status: ${data.payment_status}`);
    }

    if (event.type === "payment_intent.payment_failed") {
      const data = event.data.object as Stripe.PaymentIntent;
      console.log(`❌ Payment failed: ${data.last_payment_error?.message}`);
    }

    if (event.type === "payment_intent.succeeded") {
      const data = event.data.object as Stripe.PaymentIntent;
      console.log(`💰 PaymentIntent status: ${data.status}`);
    }
  } catch (error) {
    console.error("❌ Webhook handler failed:", error);
    return NextResponse.json(
      { message: "Webhook handler failed" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Received" }, { status: 200 });
}
