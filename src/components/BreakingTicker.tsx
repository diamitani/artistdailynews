"use client";

import { Zap, ExternalLink } from "lucide-react";

interface TickerArticle {
  id?: string;
  title: string;
  url?: string;
  pillar?: string;
  category?: string;
  source_name?: string;
  sourceName?: string;
  isBreaking?: boolean;
}

interface BreakingTickerProps {
  articles: TickerArticle[];
}

export function BreakingTicker({ articles }: BreakingTickerProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  const tickerItems = articles.slice(0, 8);

  return (
    <div className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)] overflow-hidden">
      <div className="max-w-full flex items-center">
        {/* Fixed Label */}
        <div className="shrink-0 bg-[var(--accent-primary)] text-white font-black text-[10px] uppercase tracking-widest px-3 py-2 flex items-center space-x-1.5 z-10">
          <Zap className="w-3 h-3 fill-current" />
          <span>LIVE</span>
        </div>

        {/* Scrolling Ticker */}
        <div className="overflow-hidden relative flex-1">
          <div className="ticker-scroll flex py-2 px-4 space-x-8 text-xs">
            {[...tickerItems, ...tickerItems].map((article, idx) => {
              const category = article.pillar || article.category || 'news';
              const source = article.source_name || article.sourceName || 'ADN';
              const url = article.url || '#';

              return (
                <a
                  key={`${article.id || idx}-${idx}`}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 shrink-0 hover:text-[var(--accent-primary)] transition-colors whitespace-nowrap group"
                >
                  <span className="text-[10px] font-mono font-bold text-[var(--accent-primary)] uppercase">
                    {category}
                  </span>
                  <span className="text-[var(--border-highlight)]">·</span>
                  <span className="font-semibold text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">
                    {article.title.length > 60 ? `${article.title.slice(0, 60)}...` : article.title}
                  </span>
                  <ExternalLink className="w-3 h-3 text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
