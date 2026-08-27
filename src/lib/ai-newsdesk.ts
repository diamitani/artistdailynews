import { Article, CategoryType } from "./types";

export interface SummarizeArticleInput {
  title: string;
  rawText: string;
  sourceName: string;
  category: CategoryType;
}

export interface SummarizeArticleOutput {
  summary: string;
  bullets: string[];
  takeaway: string;
  suggestedTags: string[];
}

export async function summarizeWithAINewsdesk(input: SummarizeArticleInput): Promise<SummarizeArticleOutput> {
  const apiKey = process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY || process.env.GEMINI_API_KEY;

  if (apiKey && process.env.OPENAI_API_KEY) {
    try {
      const prompt = `You are the lead editor at ArtistDailyNews.com (ADN), the premier intelligence publication for independent musicians and indie record labels.
Analyze this raw news article:
Source: ${input.sourceName}
Category: ${input.category}
Title: ${input.title}
Content: ${input.rawText.slice(0, 1500)}

Generate a JSON response with:
1. "summary": A compelling 2-sentence executive summary explaining what happened in high-stakes music business terms.
2. "bullets": An array of 3 concise, high-impact takeaway bullet points.
3. "takeaway": A direct, actionable "Why This Matters for DIY Artists" instruction (1-2 sentences).
4. "suggestedTags": Array of 3-5 relevant industry tags.

Format strictly as JSON.`;

      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          response_format: { type: "json_object" },
          temperature: 0.3,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const parsed = JSON.parse(data.choices[0].message.content);
        return {
          summary: parsed.summary || input.rawText.slice(0, 200),
          bullets: parsed.bullets || ["Industry metrics updated.", "Impacts release schedules.", "Check distributor status."],
          takeaway: parsed.takeaway || "Review your current royalty setup to optimize for this change.",
          suggestedTags: parsed.suggestedTags || [input.category, "Music Business"],
        };
      }
    } catch (e) {
      console.warn("[AI Newsdesk API Fallback to heuristic summarizer]", e);
    }
  }

  // Heuristic Natural Language Extraction Fallback
  const sentences = input.rawText
    .replace(/\s+/g, " ")
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 20);

  const summary =
    sentences.slice(0, 2).join(". ") + (sentences.length > 0 ? "." : "Latest intelligence report from the independent music industry.");

  const bullets = [
    sentences[2] ? `${sentences[2]}.` : `Breaking developments reported by ${input.sourceName}.`,
    sentences[3] ? `${sentences[3]}.` : "Critical policy shifts affecting streaming payouts and master rights.",
    sentences[4] ? `${sentences[4]}.` : "Independent creators advised to adjust distribution timelines accordingly.",
  ];

  const takeaway = `Independent creators should review their release strategy and rights registrations in light of these updates from ${input.sourceName}.`;

  return {
    summary: summary.slice(0, 300),
    bullets,
    takeaway,
    suggestedTags: [input.category, input.sourceName, "Music Business", "DIY Artists"],
  };
}

export function compileDailyNewsletterDigest(articles: Article[]): {
  subject: string;
  previewText: string;
  html: string;
  markdown: string;
} {
  const dateStr = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  const top5 = articles.slice(0, 5);
  const featured = top5[0] || articles[0];

  const subject = `ADN Daily Dispatch: ${featured ? featured.title.slice(0, 50) + "..." : "Today's Independent Music Intelligence"}`;
  const previewText = featured ? featured.summary.slice(0, 90) : "Your 3-minute morning briefing for the music business.";

  const articleRowsHtml = top5
    .map(
      (art, idx) => `
    <div style="margin-bottom: 24px; padding-bottom: 20px; border-bottom: 1px solid #222;">
      <span style="font-size: 11px; font-weight: 700; color: #D4FF00; text-transform: uppercase; letter-spacing: 1px;">0${idx + 1} // ${art.category.toUpperCase()}</span>
      <h3 style="margin: 6px 0 10px; font-size: 18px; color: #ffffff; line-height: 1.3;">
        <a href="https://artistdailynews.com/news/${art.slug}" style="color: #ffffff; text-decoration: none;">${art.title}</a>
      </h3>
      <p style="font-size: 14px; color: #a1a1aa; line-height: 1.5; margin: 0 0 10px;">${art.summary}</p>
      <div style="background-color: #12131a; border-left: 3px solid #D4FF00; padding: 8px 12px; font-size: 13px; color: #e4e4e7;">
        <strong>💡 Why This Matters for DIY:</strong> ${art.takeaway}
      </div>
    </div>
  `
    )
    .join("");

  const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #090A0F; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #ffffff;">
  <div style="max-width: 600px; margin: 0 auto; padding: 32px 20px;">
    
    <!-- Header -->
    <div style="border-bottom: 2px solid #D4FF00; padding-bottom: 16px; margin-bottom: 24px; text-align: center;">
      <h1 style="font-size: 26px; font-weight: 900; letter-spacing: 2px; margin: 0; text-transform: uppercase;">ARTIST DAILY NEWS</h1>
      <p style="font-size: 12px; color: #71717a; margin: 6px 0 0; text-transform: uppercase; letter-spacing: 1px;">${dateStr} // MORNING BRIEFING</p>
    </div>

    <!-- Sponsor Slot -->
    <div style="background: linear-gradient(135deg, #181924, #12131a); border: 1px solid #27272a; border-radius: 8px; padding: 16px; margin-bottom: 28px; text-align: center;">
      <span style="font-size: 10px; color: #71717a; text-transform: uppercase; letter-spacing: 1px;">SPONSORED BY LANDR STUDIO</span>
      <p style="font-size: 13px; color: #d4d4d8; margin: 6px 0 10px;">Get 30% off AI mastering, stem separation & distribution with code <strong>ADNPRO</strong>.</p>
      <a href="https://landr.com?utm_source=artistdailynews" style="display: inline-block; background-color: #D4FF00; color: #000000; font-weight: 700; font-size: 12px; padding: 6px 14px; border-radius: 4px; text-decoration: none;">Claim 30% Discount &rarr;</a>
    </div>

    <!-- Stories -->
    ${articleRowsHtml}

    <!-- Footer -->
    <div style="margin-top: 36px; padding-top: 20px; border-top: 1px solid #27272a; text-align: center; font-size: 12px; color: #71717a;">
      <p style="margin: 0 0 8px;">You are receiving this because you subscribed to Artist Daily News.</p>
      <p style="margin: 0;"><a href="https://artistdailynews.com" style="color: #D4FF00; text-decoration: none;">ArtistDailyNews.com</a> &bull; <a href="https://artistdailynews.com/press-pass" style="color: #a1a1aa; text-decoration: none;">Press Passes</a> &bull; <a href="https://artistdailynews.com/advertise" style="color: #a1a1aa; text-decoration: none;">Advertise</a></p>
    </div>

  </div>
</body>
</html>
  `;

  const markdown = `
# ARTIST DAILY NEWS — ${dateStr}
*The Front Page of the Independent Music World*

---

${top5
  .map(
    (a, i) => `
### 0${i + 1}. [${a.title}](https://artistdailynews.com/news/${a.slug})
*Category: ${a.category.toUpperCase()} | Source: ${a.sourceName}*

${a.summary}

- **💡 Why this matters for DIY:** ${a.takeaway}
`
  )
  .join("\n---\n")}
  `;

  return { subject, previewText, html, markdown };
}
