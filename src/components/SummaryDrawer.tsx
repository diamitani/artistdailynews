"use client";

import { Article } from "@/lib/types";
import { X, ExternalLink, Clock, Sparkles, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { formatTimeAgo } from "@/lib/utils";

interface SummaryDrawerProps {
  article: Article | null;
  onClose: () => void;
}

export function SummaryDrawer({ article, onClose }: SummaryDrawerProps) {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm animate-fadeIn">
      {/* Overlay backdrop */}
      <div className="flex-1 cursor-pointer" onClick={onClose} />

      {/* Drawer Body */}
      <div className="w-full max-w-lg bg-[var(--bg-primary)] border-l border-[var(--border-color)] h-full overflow-y-auto p-6 sm:p-8 flex flex-col justify-between shadow-2xl animate-slideLeft text-[var(--text-primary)]">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
            <div className="flex items-center space-x-2">
              <span className="bg-[var(--bg-secondary)] text-[var(--accent-primary)] border border-[var(--border-color)] font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                30-SECOND EXECUTIVE BRIEF
              </span>
              <span className="text-xs text-[var(--text-muted)] font-mono flex items-center">
                <Clock className="w-3 h-3 mr-1" /> {article.readTimeMinutes}m read
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Source & Title */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs text-[var(--text-muted)] font-mono">
              <span className="font-bold text-[var(--text-primary)]">{article.sourceName}</span>
              <span>&bull;</span>
              <span>{formatTimeAgo(article.publishedAt)}</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] leading-snug">
              {article.title}
            </h2>
          </div>

          {/* Executive Summary */}
          <div className="card-brand p-5 space-y-3">
            <div className="flex items-center space-x-2 text-[var(--accent-primary)] text-xs font-bold uppercase tracking-wider font-mono">
              <Sparkles className="w-4 h-4" />
              <span>AI Executive Synthesis</span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{article.summary}</p>
          </div>

          {/* Core Takeaway Bullets */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[var(--text-muted)] font-bold">
              Key Industry Takeaways
            </h4>
            <div className="space-y-2.5">
              {article.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start space-x-3 bg-[var(--bg-secondary)] p-3 rounded-lg border border-[var(--border-color)]">
                  <CheckCircle2 className="w-4 h-4 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-normal">{bullet}</p>
                </div>
              ))}
            </div>
          </div>

          {/* DIY Actionable Impact */}
          <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-4 space-y-1.5">
            <div className="text-emerald-800 text-xs font-bold uppercase tracking-wider font-mono">
              💡 Actionable Strategy For DIY Artists
            </div>
            <p className="text-xs sm:text-sm text-emerald-950 leading-relaxed font-medium">
              {article.takeaway}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-[var(--border-color)] mt-6 flex items-center justify-between">
          <Link
            href={`/news/${article.slug}`}
            onClick={onClose}
            className="text-xs text-[var(--accent-primary)] hover:underline font-bold uppercase tracking-wider font-mono"
          >
            Read Full Deep-Dive &rarr;
          </Link>
          <a
            href={article.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brand-ghost text-xs px-3.5 py-2 flex items-center space-x-1.5"
          >
            <span>Original Source</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
