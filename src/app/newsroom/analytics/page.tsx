import Link from "next/link";
import {
  analyticsConfigured,
  getEventTotals,
  getArticleRollup,
} from "../../../lib/analytics";

export const metadata = {
  title: "Analytics — Newsroom",
  robots: { index: false, follow: false },
};

const EVENT_LABELS: Record<string, string> = {
  page_view: "Page views",
  engaged_read: "Engaged reads",
  source_click: "Source clicks",
  signup: "Signups",
  share: "Shares",
  offer_click: "Offer clicks",
};

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="card-brand p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-[var(--text-muted)]">
        {label}
      </p>
      <p className="font-mono-data mt-2 text-3xl font-bold text-[var(--text-primary)]">
        {value.toLocaleString()}
      </p>
    </div>
  );
}

/**
 * Internal reader-analytics dashboard (newsroom only — do not link publicly).
 * Shows real data only; if Supabase is unconfigured it says so instead of
 * rendering placeholder metrics.
 */
export default async function NewsroomAnalyticsPage() {
  if (!analyticsConfigured()) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16">
        <div className="card-brand p-8 text-center">
          <h1 className="font-serif-headline text-2xl font-bold text-[var(--text-primary)]">
            Analytics not configured
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
            Reader analytics requires the Supabase table and credentials. Run{" "}
            <code className="font-mono-data rounded bg-[var(--bg-secondary)] px-1.5 py-0.5 text-[13px]">
              supabase/migrations/002_reader_events.sql
            </code>{" "}
            in your Supabase project, then set{" "}
            <code className="font-mono-data rounded bg-[var(--bg-secondary)] px-1.5 py-0.5 text-[13px]">
              SUPABASE_SERVICE_ROLE_KEY
            </code>{" "}
            and{" "}
            <code className="font-mono-data rounded bg-[var(--bg-secondary)] px-1.5 py-0.5 text-[13px]">
              NEXT_PUBLIC_SUPABASE_URL
            </code>
            . Until then this dashboard shows nothing — no placeholder numbers.
          </p>
        </div>
      </main>
    );
  }

  const [totals7d, totals30d, articles] = await Promise.all([
    getEventTotals(7),
    getEventTotals(30),
    getArticleRollup(7),
  ]);

  const hasAnyData = Object.values(totals30d).some((v) => v > 0);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <header className="mb-8">
        <p className="font-mono-data text-xs uppercase tracking-widest text-[var(--text-muted)]">
          Newsroom · Internal
        </p>
        <h1 className="font-serif-headline mt-1 text-3xl font-bold text-[var(--text-primary)]">
          Reader Analytics
        </h1>
        <p className="mt-2 text-sm text-[var(--text-secondary)]">
          Human traffic only (bots excluded). Last 7 days, with 30-day context.
        </p>
      </header>

      {/* Summary cards */}
      <section aria-label="Last 7 days summary" className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <SummaryCard label="Views · 7d" value={totals7d.page_view} />
        <SummaryCard label="Engaged reads · 7d" value={totals7d.engaged_read} />
        <SummaryCard label="Source clicks · 7d" value={totals7d.source_click} />
        <SummaryCard label="Signups · 7d" value={totals7d.signup} />
      </section>

      {/* Event breakdown */}
      <section className="card-brand mt-6 p-6" aria-label="Event breakdown">
        <h2 className="font-serif-headline text-xl font-bold text-[var(--text-primary)]">
          Event breakdown
        </h2>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[420px] text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--border-color)] text-xs uppercase tracking-wider text-[var(--text-muted)]">
                <th className="py-2 pr-4 font-semibold">Event</th>
                <th className="py-2 pr-4 font-semibold text-right">Last 7 days</th>
                <th className="py-2 font-semibold text-right">Last 30 days</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(EVENT_LABELS).map(([key, label]) => (
                <tr key={key} className="border-b border-[var(--border-subtle)] last:border-0">
                  <td className="py-2.5 pr-4 text-[var(--text-primary)]">{label}</td>
                  <td className="font-mono-data py-2.5 pr-4 text-right text-[var(--text-primary)]">
                    {totals7d[key as keyof typeof totals7d].toLocaleString()}
                  </td>
                  <td className="font-mono-data py-2.5 text-right text-[var(--text-secondary)]">
                    {totals30d[key as keyof typeof totals30d].toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Per-article table */}
      <section className="card-brand mt-6 p-6" aria-label="Articles last 7 days">
        <h2 className="font-serif-headline text-xl font-bold text-[var(--text-primary)]">
          Articles · last 7 days
        </h2>
        {!hasAnyData ? (
          <p className="mt-3 text-sm text-[var(--text-secondary)]">
            No events recorded yet. Mount{" "}
            <code className="font-mono-data rounded bg-[var(--bg-secondary)] px-1 py-0.5 text-[13px]">
              {"<AnalyticsTracker />"}
            </code>{" "}
            on article pages to start collecting page views.
          </p>
        ) : articles.length === 0 ? (
          <p className="mt-3 text-sm text-[var(--text-secondary)]">
            Events exist but none are tied to articles yet.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm">
              <thead>
                <tr className="border-b border-[var(--border-color)] text-xs uppercase tracking-wider text-[var(--text-muted)]">
                  <th className="py-2 pr-4 font-semibold">Article</th>
                  <th className="py-2 pr-4 font-semibold text-right">Views</th>
                  <th className="py-2 pr-4 font-semibold text-right">Engaged</th>
                  <th className="py-2 font-semibold text-right">Source clicks</th>
                </tr>
              </thead>
              <tbody>
                {articles.map((a) => (
                  <tr key={a.slug} className="border-b border-[var(--border-subtle)] last:border-0">
                    <td className="max-w-[420px] py-2.5 pr-4">
                      <Link
                        href={`/news/${a.slug}`}
                        className="text-pretty font-medium text-[var(--text-primary)] transition-colors hover:text-[var(--accent-primary)]"
                      >
                        {a.title || a.slug.replace(/-/g, " ")}
                      </Link>
                      {a.sourceName && (
                        <span className="block text-xs text-[var(--text-muted)]">{a.sourceName}</span>
                      )}
                    </td>
                    <td className="font-mono-data py-2.5 pr-4 text-right text-[var(--text-primary)]">
                      {a.views.toLocaleString()}
                    </td>
                    <td className="font-mono-data py-2.5 pr-4 text-right text-[var(--text-primary)]">
                      {a.engagedReads.toLocaleString()}
                    </td>
                    <td className="font-mono-data py-2.5 text-right text-[var(--text-primary)]">
                      {a.sourceClicks.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
