import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export async function POST(request: Request) {
  try {
    function generateCustomUUID() {
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
      const generateBlock = () =>
        Array.from(
          { length: 4 },
          () => chars[Math.floor(Math.random() * chars.length)]
        ).join("");

      return `${generateBlock()}-${generateBlock()}-${generateBlock()}-${generateBlock()}`;
    }

    const uuid = generateCustomUUID();

    // const couponId = process.env[`STRIPE_COUPON_${couponCode}`];

    const promoEnd = new Date("2025-09-17T21:59:59Z");
    const now = new Date();
    let couponId = null;

    if (now < promoEnd) {
      couponId = "ncLT6LyH";
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            product: process.env.STRIPE_PRODUCT_ID!,
            unit_amount: Number(process.env.STRIPE_PRICE_AMOUNT!),
            currency: "usd",
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: { license_uuid: uuid },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?k=${uuid}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      ...(couponId
        ? { discounts: [{ coupon: couponId }] }
        : { allow_promotion_codes: true }),
    });

    if (!session) {
      throw new Error("Failed to create Stripe session");
    }

    return NextResponse.json({ sessionId: session.id, uuid });
  } catch (error) {
    console.error("Error creating Stripe session:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
