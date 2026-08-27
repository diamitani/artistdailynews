import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const sig = req.headers.get("stripe-signature");

    if (process.env.STRIPE_WEBHOOK_SECRET && sig && process.env.STRIPE_SECRET_KEY) {
      const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
      let event;

      try {
        event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
      } catch (err: any) {
        console.error(`[Stripe Webhook Signature Error]: ${err.message}`);
        return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
      }

      if (event.type === "checkout.session.completed") {
        const session = event.data.object;
        console.log(`[Stripe Webhook] Successful checkout session: ${session.id}, Customer: ${session.customer_email}`);
        // Provision entitlement or log sponsorship
      }

      return NextResponse.json({ received: true });
    }

    return NextResponse.json({ received: true, mode: "simulation" });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Stripe webhook handling failed." },
      { status: 500 }
    );
  }
}
