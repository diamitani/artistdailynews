import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, role, topics } = body;

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // In production, sync with Supabase / Resend / Constant Contact API
    console.log(`[Newsletter Subscription] ${email} (${role || "Artist"}) subscribed to ADN Daily Dispatch.`);

    return NextResponse.json({
      success: true,
      message: "Successfully subscribed to Artist Daily News Daily Dispatch.",
      subscriber: {
        email,
        role: role || "Independent Artist",
        topics: topics || ["financial", "streaming"],
        subscribedAt: new Date().toISOString(),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to process newsletter subscription." },
      { status: 500 }
    );
  }
}
