import { NextResponse } from "next/server";
import { MOCK_ARTICLES } from "@/lib/mock-articles";
import { compileDailyNewsletterDigest } from "@/lib/ai-newsdesk";

export async function POST(req: Request) {
  try {
    const digest = compileDailyNewsletterDigest(MOCK_ARTICLES);

    // If RESEND_API_KEY is configured, dispatch via Resend
    if (process.env.RESEND_API_KEY) {
      try {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "Artist Daily News <newsdesk@artistdailynews.com>",
            to: "subscribers@artistdailynews.com",
            subject: digest.subject,
            html: digest.html,
          }),
        });
        const resData = await res.json();
        return NextResponse.json({ success: true, resend: resData, digest });
      } catch (err: any) {
        console.warn("[Resend dispatch error fallback]", err);
      }
    }

    return NextResponse.json({
      success: true,
      mode: "compiled_preview",
      digest,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to compile newsletter dispatch." },
      { status: 500 }
    );
  }
}
