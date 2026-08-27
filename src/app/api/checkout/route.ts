import { NextResponse } from "next/server";
import { SPONSORSHIP_PACKAGES } from "@/lib/feeds-config";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { packageId, sponsorName, sponsorEmail, ctaUrl } = body;

    const pkg = SPONSORSHIP_PACKAGES.find((p) => p.id === packageId) || SPONSORSHIP_PACKAGES[0];

    // If STRIPE_SECRET_KEY is configured in production
    if (process.env.STRIPE_SECRET_KEY) {
      try {
        const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
        const origin = req.headers.get("origin") || "https://artistdailynews.com";

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items: [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: `Artist Daily News: ${pkg.name}`,
                  description: pkg.description,
                },
                unit_amount: pkg.priceCents,
              },
              quantity: 1,
            },
          ],
          mode: pkg.period === "monthly" ? "subscription" : "payment",
          success_url: `${origin}/advertise?success=true&session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${origin}/advertise?canceled=true`,
          customer_email: sponsorEmail,
          metadata: {
            packageId: pkg.id,
            sponsorName: sponsorName || "",
            ctaUrl: ctaUrl || "",
          },
        });

        return NextResponse.json({ url: session.url });
      } catch (stripeErr: any) {
        console.warn("[Stripe API error fallback]", stripeErr);
      }
    }

    // Demo / Simulation Fallback
    return NextResponse.json({
      success: true,
      mode: "simulation",
      message: `Simulated checkout for ${pkg.name} ($${(pkg.priceCents / 100).toFixed(2)})`,
      package: pkg,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to initiate checkout session." },
      { status: 500 }
    );
  }
}
