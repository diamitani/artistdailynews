"use client";

import Link from "next/link";
import { Article } from "@/lib/types";
import { formatTimeAgo } from "@/lib/utils";
import { Sparkles, Clock, ArrowUpRight, Zap, ExternalLink } from "lucide-react";

interface ArticleCardProps {
  article: Article;
  onQuickRead?: (article: Article) => void;
  featured?: boolean;
}

export function ArticleCard({ article, onQuickRead, featured }: ArticleCardProps) {
  const categoryColorMap: Record<string, string> = {
    financial: "text-emerald-700 border-emerald-300 bg-emerald-50",
    streaming: "text-blue-700 border-blue-300 bg-blue-50",
    "tech-ai": "text-purple-700 border-purple-300 bg-purple-50",
    marketing: "text-pink-700 border-pink-300 bg-pink-50",
    legal: "text-amber-700 border-amber-300 bg-amber-50",
    podcasts: "text-cyan-700 border-cyan-300 bg-cyan-50",
    tutorials: "text-teal-700 border-teal-300 bg-teal-50",
    opportunities: "text-[var(--accent-primary)] border-[var(--accent-primary)]/30 bg-[var(--accent-primary-light)]",
  };

  const badgeClass = categoryColorMap[article.category] || "text-[var(--text-muted)] border-[var(--border-color)] bg-[var(--bg-secondary)]";

  return (
    <article className="group card-brand p-5 overflow-hidden transition-all duration-300 flex flex-col justify-between hover:shadow-sm hover:border-[var(--border-highlight)] bg-[var(--bg-card)]">
      <div className="space-y-2.5">
        
        {/* Header Meta Line */}
        <div className="flex items-center justify-between text-xs font-mono border-b border-[var(--border-color)] pb-2">
          <div className="flex items-center space-x-2">
            <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${badgeClass}`}>
              {article.category}
            </span>
            <span className="font-bold text-[var(--text-primary)] uppercase text-[11px]">
              {article.sourceName}
            </span>
          </div>

          <span className="text-[var(--text-muted)] flex items-center text-[10px]">
            <Clock className="w-3 h-3 mr-1" />
            {formatTimeAgo(article.publishedAt)}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-serif font-bold text-base sm:text-lg text-[var(--text-primary)] leading-snug group-hover:text-[var(--accent-primary)] transition-colors line-clamp-2">
          <a href={article.originalUrl} target="_blank" rel="noopener noreferrer">
            {article.title}
          </a>
        </h3>

        {/* Summary */}
        {article.summary && (
          <p className="text-xs text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
            {article.summary}
          </p>
        )}
      </div>

      {/* Footer Quick Actions */}
      <div className="pt-3 mt-3 border-t border-[var(--border-color)] flex items-center justify-between text-xs font-mono">
        {onQuickRead ? (
          <button
            onClick={() => onQuickRead(article)}
            className="inline-flex items-center space-x-1.5 text-xs text-[var(--accent-primary)] hover:underline font-bold transition-colors py-0.5"
          >
            <Sparkles className="w-3 h-3" />
            <span>30s Brief</span>
          </button>
        ) : (
          <Link
            href={`/news/${article.slug}`}
            className="inline-flex items-center space-x-1 text-[11px] text-[var(--accent-primary)] hover:underline font-bold"
          >
            <span>Read Story</span>
            <ArrowUpRight className="w-3 h-3" />
          </Link>
        )}

        <a
          href={article.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1 text-[11px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
        >
          <span>Source</span>
          <ExternalLink className="w-2.5 h-2.5" />
        </a>
      </div>
    </article>
  );
}
