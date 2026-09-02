"use client";

import Link from "next/link";
import { Article } from "@/lib/types";
import { formatTimeAgo } from "@/lib/utils";
import { Sparkles, Clock, ArrowUpRight, Zap } from "lucide-react";

interface ArticleCardProps {
  article: Article;
  onQuickRead?: (article: Article) => void;
  featured?: boolean;
}

export function ArticleCard({ article, onQuickRead, featured }: ArticleCardProps) {
  const categoryColorMap: Record<string, string> = {
    financial: "text-emerald-800 border-emerald-300 bg-emerald-50",
    streaming: "text-blue-800 border-blue-300 bg-blue-50",
    "tech-ai": "text-purple-800 border-purple-300 bg-purple-50",
    marketing: "text-pink-800 border-pink-300 bg-pink-50",
    legal: "text-amber-800 border-amber-300 bg-amber-50",
    podcasts: "text-cyan-800 border-cyan-300 bg-cyan-50",
    tutorials: "text-teal-800 border-teal-300 bg-teal-50",
    opportunities: "text-[var(--accent-primary)] border-[var(--accent-primary)]/30 bg-[var(--accent-primary-light)]",
  };

  const badgeClass = categoryColorMap[article.category] || "text-[var(--text-muted)] border-[var(--border-color)] bg-[var(--bg-secondary)]";

  return (
    <article className="group card-brand overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-md">
      <div>
        {/* Article Image Cover */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-[var(--bg-secondary)]">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex items-center space-x-2">
            <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border backdrop-blur-md ${badgeClass}`}>
              {article.category}
            </span>
            {article.isBreaking && (
              <span className="bg-[var(--accent-primary)] text-white font-bold text-[9px] uppercase px-1.5 py-0.5 rounded flex items-center shadow">
                <Zap className="w-2.5 h-2.5 mr-0.5 fill-current" /> Live Alert
              </span>
            )}
            {article.isSponsored && (
              <span className="bg-[var(--accent-primary-light)] text-[var(--accent-primary)] border border-[var(--accent-primary)]/30 text-[9px] font-bold uppercase px-2 py-0.5 rounded">
                Sponsored
              </span>
            )}
          </div>

          <div className="absolute bottom-2.5 right-3 text-[10px] text-white/90 font-mono flex items-center bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm">
            <Clock className="w-3 h-3 mr-1" />
            {article.readTimeMinutes} min read
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-[var(--text-muted)] font-mono">
            <span className="text-[var(--text-secondary)] font-medium">{article.sourceName}</span>
            <span>{formatTimeAgo(article.publishedAt)}</span>
          </div>

          <h3 className="font-serif font-bold text-lg sm:text-xl text-[var(--text-primary)] leading-snug group-hover:text-[var(--accent-primary)] transition-colors line-clamp-2">
            <Link href={`/news/${article.slug}`}>
              {article.title}
            </Link>
          </h3>

          <p className="text-xs sm:text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
            {article.summary}
          </p>
        </div>
      </div>

      {/* Footer Quick Actions */}
      <div className="px-5 pb-4 pt-3 border-t border-[var(--border-color)] flex items-center justify-between">
        {onQuickRead ? (
          <button
            onClick={() => onQuickRead(article)}
            className="inline-flex items-center space-x-1.5 text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--accent-primary)] font-semibold transition-colors py-1"
          >
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
            <span>30s Briefing</span>
          </button>
        ) : (
          <Link
            href={`/news/${article.slug}`}
            className="inline-flex items-center space-x-1.5 text-xs font-mono text-[var(--accent-primary)] hover:underline font-semibold py-1"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Read Briefing</span>
          </Link>
        )}

        <Link
          href={`/news/${article.slug}`}
          className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] flex items-center font-medium font-mono"
        >
          <span>Story</span>
          <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
        </Link>
      </div>
    </article>
  );
}
