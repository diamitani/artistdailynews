import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      applicantName,
      artistOrOutletName,
      email,
      phone,
      role,
      targetEvent,
      eventDate,
      portfolioUrl,
      coveragePitch,
    } = body;

    if (!applicantName || !email || !targetEvent) {
      return NextResponse.json(
        { error: "Name, email, and target event are required." },
        { status: 400 }
      );
    }

    console.log(`[Press Pass Application] ${applicantName} (${role}) applied for ${targetEvent}`);

    return NextResponse.json({
      success: true,
      message: "Press pass application submitted successfully.",
      applicationId: `ADN-PRESS-${Date.now().toString().slice(-6)}`,
      status: "pending",
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to submit press pass application." },
      { status: 500 }
    );
  }
}
