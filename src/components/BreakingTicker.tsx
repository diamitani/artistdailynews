"use client";

import Link from "next/link";
import { Article } from "@/lib/types";
import { Zap } from "lucide-react";

interface BreakingTickerProps {
  articles: Article[];
}

export function BreakingTicker({ articles }: BreakingTickerProps) {
  const breakingArticles = articles.filter((a) => a.isBreaking);
  const tickerItems = breakingArticles.length > 0 ? breakingArticles : articles.slice(0, 5);

  return (
    <div className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)] overflow-hidden">
      <div className="max-w-full flex items-center">
        {/* Fixed Label */}
        <div className="shrink-0 bg-[var(--accent-crimson)] text-white font-black text-[10px] uppercase tracking-widest px-3 py-2 flex items-center space-x-1.5 z-10">
          <Zap className="w-3 h-3 fill-current" />
          <span>BREAKING</span>
        </div>

        {/* Scrolling Ticker */}
        <div className="overflow-hidden relative flex-1">
          <div className="animate-ticker py-2 px-4 space-x-12 text-xs">
            {[...tickerItems, ...tickerItems].map((art, idx) => (
              <Link
                key={`${art.id}-${idx}`}
                href={`/news/${art.slug}`}
                className="inline-flex items-center space-x-2 shrink-0 hover:text-[var(--accent-gold)] transition-colors whitespace-nowrap"
              >
                <span className="text-[10px] font-mono font-bold text-[var(--accent-gold)] uppercase">
                  {art.category}
                </span>
                <span className="text-[var(--text-muted)]">&bull;</span>
                <span className="font-semibold text-[var(--text-secondary)]">{art.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
