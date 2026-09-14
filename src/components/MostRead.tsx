import Link from "next/link";
import { getMostRead } from "../lib/analytics";

/**
 * "Most Read This Week" module — async server component.
 * Renders null when there is no analytics data (honest empty state).
 */
export default async function MostRead() {
  const items = await getMostRead(5, 7);

  if (!items || items.length === 0) return null;

  return (
    <aside className="card-brand p-6" aria-label="Most read this week">
      <div className="mb-4 flex items-center gap-2">
        <span
          aria-hidden
          className="inline-block h-2 w-2 rounded-full bg-[var(--accent-primary)]"
        />
        <h2 className="font-serif-headline text-xl font-bold text-[var(--text-primary)]">
          Most Read This Week
        </h2>
      </div>

      <ol className="space-y-4">
        {items.map((item, i) => (
          <li key={item.slug} className="flex items-start gap-3">
            <span
              aria-hidden
              className="font-mono-data mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-bold text-[var(--text-inverse)] bg-[var(--bg-dark)]"
            >
              {i + 1}
            </span>
            <div className="min-w-0">
              <Link
                href={`/news/${item.slug}`}
                className="text-pretty text-[15px] font-semibold leading-snug text-[var(--text-primary)] transition-colors hover:text-[var(--accent-primary)]"
              >
                {item.title || item.slug.replace(/-/g, " ")}
              </Link>
              <p className="mt-1 text-xs text-[var(--text-muted)]">
                {item.sourceName ? `${item.sourceName} · ` : ""}
                {item.views.toLocaleString()}{" "}
                {item.views === 1 ? "read" : "reads"} this week
              </p>
            </div>
          </li>
        ))}
      </ol>
    </aside>
  );
}
