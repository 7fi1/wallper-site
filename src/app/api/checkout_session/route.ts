import Stripe from "stripe";
import { NextResponse } from "next/server";
import { randomUUID } from "crypto";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-04-30.basil",
});

export async function POST() {
  try {
    const uuid = randomUUID();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID!,
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: { license_uuid: uuid },

      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success?k=${uuid}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
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
