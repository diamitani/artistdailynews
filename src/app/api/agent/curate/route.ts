import { NextResponse } from "next/server";
import { summarizeWithAINewsdesk } from "@/lib/ai-newsdesk";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, rawText, sourceName, category } = body;

    if (!title || !rawText) {
      return NextResponse.json(
        { error: "Title and rawText are required for AI curation." },
        { status: 400 }
      );
    }

    const result = await summarizeWithAINewsdesk({
      title,
      rawText,
      sourceName: sourceName || "Independent Trade Feed",
      category: category || "financial",
    });

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to run AI curation." },
      { status: 500 }
    );
  }
}
