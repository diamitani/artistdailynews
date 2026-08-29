import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(req: Request) {
  try {
    const authHeader = req.headers.get("authorization");
    const webhookSecret = process.env.N8N_WEBHOOK_SECRET;

    // Verify authentication if a secret is configured
    if (webhookSecret && authHeader !== `Bearer ${webhookSecret}`) {
      return NextResponse.json({ error: "Unauthorized n8n webhook execution." }, { status: 401 });
    }

    const payload = await req.json();

    // Payload should be an array of ingested items from n8n
    // If n8n sends a single object, wrap it in an array
    const items = Array.isArray(payload) ? payload : [payload];

    if (items.length === 0) {
      return NextResponse.json({ success: true, message: "No items to ingest." });
    }

    // Map n8n payload to adn_items schema
    const formattedItems = items.map((item: any) => ({
      url: item.url,
      title: item.title,
      dek: item.excerpt || item.dek || null,
      source_name: item.source_name || "Unknown Source",
      source_tier: item.source_tier || 'A',
      platform: item.platform || 'web',
      media_type: item.media_type || 'article',
      pillar: item.pillar || 'culture',
      freshness: item.published_at ? new Date(item.published_at).toISOString() : new Date().toISOString(),
      nsfw_or_rights_risk: item.nsfw_or_rights_risk || false,
    }));

    // Insert into Supabase with upsert based on URL to prevent duplicates
    const { data, error } = await supabase
      .from('adn_items')
      .upsert(formattedItems, { onConflict: 'url' })
      .select('id, url');

    if (error) {
      console.error("[n8n Webhook Error] Supabase upsert failed:", error);
      throw error;
    }

    console.log(`[n8n Webhook] Successfully ingested ${data?.length} items.`);

    return NextResponse.json({
      success: true,
      ingestedCount: data?.length || 0,
      timestamp: new Date().toISOString(),
    });

  } catch (error: any) {
    console.error("[n8n Webhook Fatal Error]", error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || "Fatal error during n8n ingestion.",
      },
      { status: 500 }
    );
  }
}
