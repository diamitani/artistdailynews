import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      applicantName,
      artistOrOutletName,
      email,
      role,
    } = body;

    if (!applicantName || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    console.log(`[Creator Badge Request] ${applicantName} (${artistOrOutletName || "Independent"} / ${role || "Creator"}) requested a badge.`);

    return NextResponse.json({
      success: true,
      message: "Creator badge request submitted successfully.",
      applicationId: `ADN-BADGE-${Date.now().toString().slice(-6)}`,
      status: "received",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to submit creator badge request." },
      { status: 500 }
    );
  }
}
