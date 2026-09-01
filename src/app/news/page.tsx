import React from 'react';
import Link from 'next/link';
import { getLatestIssue } from '@/lib/adn-db';
import { BreakingTicker } from '@/components/BreakingTicker';
import { MOCK_ARTICLES } from '@/lib/mock-articles';

export default async function DailyPostHomepage() {
  const issue = await getLatestIssue();
  
  // Use DB issue if available, else mock
  const issueDate = issue?.issue_date 
    ? new Date(issue.issue_date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase()
    : new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase();
    
  const kicker = issue?.kicker || 'CULTURE';
  const headline = issue?.lead_item?.title || 'The sound that ate Friday';
  const dek = issue?.lead_item?.dek || 'One sentence, what happened + why an independent should care.';
  const bodyParagraphs = issue?.lead_item?.why_it_matters 
    ? [issue.lead_item.why_it_matters]
    : [
        "The first paragraph contains the fact. We do not open with atmosphere. We state the news clearly, avoiding consultant-speak and generic hype.",
        "The second and third paragraphs delve into the zeitgeist or the money. This is where we break down the economics of the platform change, or the cultural rupture that is happening in real time. We use concrete examples.",
        "Every claim needs a source URL. If we cannot source it, we drop it. The music industry changes, but we focus on what exactly happened today."
      ];
  const action = issue?.lead_item?.action || "Check your ASCAP / BMI registration and ensure your splits are documented.";

  // Rails parsing
  const rails = issue?.rails || {
    culture: [
      { title: "TikTok's new algorithm favors micro-genres", platform: "TikTok", time: "2 hours ago" },
      { title: "Pitchfork names new EIC", platform: "Web", time: "5 hours ago" },
      { title: "Chicago's Radius announces fall lineup", platform: "Web", time: "12 hours ago" }
    ],
    business: [
      { title: "Spotify adjusts mechanical royalty rates", platform: "Web", time: "1 hour ago" },
      { title: "Universal Music Q2 earnings breakdown", platform: "Email", time: "4 hours ago" },
      { title: "Live Nation faces new regulatory scrutiny", platform: "Web", time: "8 hours ago" }
    ],
    social: [
      { title: "Questlove on the anatomy of a groove", platform: "Podcast", time: "Yesterday" },
      { title: "How to build an email list from scratch", platform: "YouTube", time: "2 days ago" }
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] justify-between">
      <BreakingTicker articles={MOCK_ARTICLES} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 w-full">
        {/* Issue Header */}
        <div className="flex justify-between font-mono text-xs font-bold text-[var(--text-primary)] uppercase tracking-widest border-b border-[var(--border-color)] pb-4">
          <span>{issueDate} · ISSUE {issue ? issue.id.slice(0, 3).toUpperCase() : '001'} · CHICAGO / GLOBAL</span>
          <span className="text-[var(--accent-primary)]">POWERED BY ARTISPRENEUR</span>
        </div>

        {/* Hero Essay Section */}
        <section className="mb-12 max-w-3xl mx-auto card-brand p-8 sm:p-12">
          <div className="bg-[var(--accent-primary)] text-white inline-block px-3 py-1 font-mono font-bold text-xs uppercase tracking-widest mb-4 rounded">
            Kicker: {kicker}
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl leading-tight font-bold text-[var(--text-primary)] mb-4">
            {headline}
          </h2>
          <p className="font-sans text-lg font-medium text-[var(--accent-primary)] mb-6 border-l-4 border-[var(--accent-primary)] pl-4">
            {dek}
          </p>
          
          <div className="font-serif text-lg leading-relaxed text-[var(--text-secondary)] space-y-5">
            {bodyParagraphs.map((p: string, idx: number) => (
              <p key={idx}>{p}</p>
            ))}
            <p className="font-bold text-[var(--text-primary)] pt-2">
              Action: {action}
            </p>
            <p className="italic border-t border-[var(--border-color)] pt-4 mt-8 text-sm text-[var(--text-muted)]">
              &ldquo;Art means business. Protect your catalog before the weekend hits.&rdquo;
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link href={issue?.lead_item?.url || "#"} className="btn-brand text-xs px-6 py-2.5">
              Read Full Dispatch
            </Link>
            <Link href="/podcasts" className="btn-brand-outline text-xs px-6 py-2.5">
              Listen Audio Brief
            </Link>
          </div>
        </section>

        {/* Rails */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-[var(--border-color)] pt-8">
          {/* Culture Rail */}
          <div className="card-brand p-6">
            <h3 className="font-serif font-bold text-xl uppercase border-b border-[var(--border-color)] pb-2 mb-4 text-[var(--accent-primary)]">
              Culture
            </h3>
            <div className="space-y-4">
              {rails.culture?.map((item: any, idx: number) => (
                <RailItem key={idx} title={item.title} platform={item.platform} time={item.time || 'Today'} />
              ))}
            </div>
          </div>

          {/* Business Rail */}
          <div className="card-brand p-6">
            <h3 className="font-serif font-bold text-xl uppercase border-b border-[var(--border-color)] pb-2 mb-4 text-[var(--accent-emerald)]">
              Business
            </h3>
            <div className="space-y-4">
              {rails.business?.map((item: any, idx: number) => (
                <RailItem key={idx} title={item.title} platform={item.platform} time={item.time || 'Today'} />
              ))}
            </div>
          </div>

          {/* Social Rail */}
          <div className="card-brand p-6">
            <h3 className="font-serif font-bold text-xl uppercase border-b border-[var(--border-color)] pb-2 mb-4 text-[var(--accent-blue)]">
              Social
            </h3>
            <div className="space-y-4">
              {rails.social?.map((item: any, idx: number) => (
                <RailItem key={idx} title={item.title} platform={item.platform} time={item.time || 'Today'} />
              ))}
            </div>
          </div>
        </section>

        {/* Newsroom CTA */}
        <section className="bg-[var(--bg-dark)] p-8 text-center text-white rounded-3xl">
          <h2 className="font-serif text-3xl font-bold mb-4">Make this about your catalog</h2>
          <p className="font-sans text-base mb-6 max-w-xl mx-auto text-white/80">
            Get a personalized digest filtered by your genre and city. Never miss an opportunity in your scene.
          </p>
          <Link href="/news/newsroom" className="btn-brand text-xs px-8 py-3.5 inline-block">
            Go to Newsroom
          </Link>
        </section>
      </main>
    </div>
  );
}

function RailItem({ title, platform, time }: { title: string, platform: string, time: string }) {
  return (
    <Link href="#" className="block group">
      <div className="flex justify-between items-center text-[10px] font-mono font-bold text-[var(--text-muted)] uppercase tracking-wider mb-1">
        <span>{platform}</span>
        <span>{time}</span>
      </div>
      <h4 className="font-serif text-base font-semibold leading-tight text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors">
        {title}
      </h4>
    </Link>
  );
}
