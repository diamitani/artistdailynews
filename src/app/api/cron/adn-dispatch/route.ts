import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function GET(req: Request) {
  return handleDispatch(req);
}

export async function POST(req: Request) {
  return handleDispatch(req);
}

async function handleDispatch(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      const { searchParams } = new URL(req.url);
      if (searchParams.get("secret") !== cronSecret) {
        return NextResponse.json({ error: "Unauthorized cron execution." }, { status: 401 });
      }
    }

    // 1. Fetch today's issue that hasn't been fully dispatched yet
    // For this mock, we just get the latest issue
    const { data: issue, error: issueError } = await supabase
      .from('adn_issues')
      .select('*, lead_item:lead_item_id (*)')
      .order('issue_date', { ascending: false })
      .limit(1)
      .single();

    if (issueError) {
      if (issueError.code === 'PGRST116') {
        return NextResponse.json({ success: true, message: "No issue to dispatch today." });
      }
      throw issueError;
    }

    console.log(`[ADN Dispatch] Starting dispatch for Issue ${issue.id}`);

    const dispatchLog = [];

    // 2. Dispatch Channels Simulation (Agent 6 Checklist)
    // CMS Publish (already handled by SSR loading the latest issue)
    dispatchLog.push("✅ CMS Publish: Homepage and Archive updated.");

    // Email Dispatch (Resend/Beehiiv stub)
    console.log(`[ADN Dispatch Email] Subject: ${issue.email_subject || 'ADN Daily'}`);
    dispatchLog.push("✅ Email Dispatch triggered via Resend/Beehiiv (stub).");

    // Socials
    dispatchLog.push("✅ Social: X, LinkedIn, Instagram crops scheduled (stub).");

    // Queue Newsroom generation
    // In a real implementation, this would push to an inngest/upstash queue
    console.log(`[ADN Dispatch Newsroom] Queuing personalizations for issue_id: ${issue.id}`);
    dispatchLog.push("✅ Newsroom: Personalization batch queued for active subscribers (stub).");

    // Log the desk
    const kicker = issue.kicker || "CULTURE";
    const headline = issue.lead_item?.title || "Unknown Lead";
    const deskLog = `Issue sent. Lead: ${headline}. Pillar: ${kicker}.`;
    console.log(`[ADN Desk] ${deskLog}`);
    dispatchLog.push(deskLog);

    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      dispatched_issue_id: issue.id,
      logs: dispatchLog
    });

  } catch (error: any) {
    console.error("[ADN Dispatch Fatal Error]", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Fatal error during dispatch execution.",
      },
      { status: 500 }
    );
  }
}
