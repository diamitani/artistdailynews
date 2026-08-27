import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { messages } = body;

    const userMessage = messages[messages.length - 1]?.content || "";

    // Simulated high-signal music business intelligence responses
    let responseText = "";

    const lower = userMessage.toLowerCase();

    if (lower.includes("multiplier") || lower.includes("catalogue") || lower.includes("valuation")) {
      responseText = `### 📊 2026 Q1 Music Catalogue Valuation Analysis

Based on current transactions from Hipgnosis, Round Hill, and private credit funds:
- **Current Multiple Range**: Mid-tier independent master recordings (2014–2022 releases with >500k monthly recurring streams) are trading between **14.0x and 18.5x Net Publisher’s Share (NPS)**.
- **Key Multiple Boosters**:
  1. **Sync History**: Prior film/gaming sync placements add a +2.0x premium.
  2. **Streaming Decay**: Tracks showing flat or positive YoY streaming volume yield top-of-bracket multiples.
  3. **100% Rights Ownership**: Artists controlling both Master and Composition hold the highest negotiating leverage.

**Actionable Advice**: If approached with a buyout offer below 12x NPS, consider a non-recourse credit advance against catalogue royalties rather than surrendering permanent copyright.`;
    } else if (lower.includes("spotify") || lower.includes("pitch") || lower.includes("editorial")) {
      responseText = `### 🎯 500-Word Spotify for Artists Pitch Blueprint

Here is an editorial-ready pitch format engineered for DSP curators:

1. **The Hook (1-2 sentences)**: State the genre, distinct sonic identity, and release date (minimum 21 days out).
2. **The Traction Signal**: "Prior release reached 45k monthly listeners with a 42% save-to-stream ratio and 12,000 organic TikTok audio creates."
3. **The Promotional Campaign**:
   - $1,500 Meta Advantage+ conversion ad spend targeted at active Spotify deep-links.
   - 15 micro-creator sound seedings launching on release week.
   - Premiere feature confirmed with Artist Daily News.
4. **Target Playlists**: Specify 3 exact editorial playlists (e.g. *Lorem, Fresh Finds Indie, Pollen*).`;
    } else if (lower.includes("sample") || lower.includes("clear") || lower.includes("copyright")) {
      responseText = `### ⚖️ 4-Bar Sample Clearance Strategy for Indie Creators

To clear a sample without major label legal fees:
1. **Identify the Two Rights Holders**:
   - Master Recording Owner (usually record label or artist).
   - Composition/Publishing Owner (usually music publisher or songwriter PRO).
2. **Micro-Clearing Protocol**:
   - Reach out directly to the publisher's licensing department with the finished mixdown, timestamp of the sample, and your release timeline.
   - Offer a standard 15%–25% master revenue split + 20% publishing share with a modest $250–$500 advance against royalties.
3. **Alternative**: If master clearance is denied, consider re-recording the instrumental elements as an interpolation (only requires composition clearance, bypassing master recording fees).`;
    } else {
      responseText = `### 💡 ADN Intelligence Copilot Response

Independent artists who treat their master recordings and songwriting publishing as structured financial equity consistently outperform peers relying strictly on passive algorithmic streaming.

**Key Action Items For Your Release**:
- Deliver clean 24-bit WAVs with embedded ISRC codes at least 4 weeks prior to release.
- Submit your Spotify for Artists pitch at least 21 days out.
- Ensure split sheets are signed in writing before master delivery.

Feel free to ask about catalogue valuation multiples, distributor audits, or press pass guidelines!`;
    }

    return NextResponse.json({
      role: "assistant",
      content: responseText,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to process chat request." },
      { status: 500 }
    );
  }
}
