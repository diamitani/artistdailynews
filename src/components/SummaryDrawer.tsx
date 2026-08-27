"use client";

import { Article } from "@/lib/types";
import { X, ExternalLink, Clock, Sparkles, CheckCircle2, Bookmark } from "lucide-react";
import Link from "next/link";
import { formatTimeAgo } from "@/lib/utils";

interface SummaryDrawerProps {
  article: Article | null;
  onClose: () => void;
}

export function SummaryDrawer({ article, onClose }: SummaryDrawerProps) {
  if (!article) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
      {/* Overlay backdrop */}
      <div className="flex-1 cursor-pointer" onClick={onClose} />

      {/* Drawer Body */}
      <div className="w-full max-w-lg bg-[#0E1017] border-l border-slate-800 h-full overflow-y-auto p-6 sm:p-8 flex flex-col justify-between shadow-2xl animate-slideLeft">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div className="flex items-center space-x-2">
              <span className="bg-[#D4FF00]/10 text-[#D4FF00] border border-[#D4FF00]/30 font-mono text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                30-SECOND EXECUTIVE BRIEF
              </span>
              <span className="text-xs text-slate-500 font-mono flex items-center">
                <Clock className="w-3 h-3 mr-1" /> {article.readTimeMinutes}m read
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Source & Title */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <span className="font-semibold text-slate-200">{article.sourceName}</span>
              <span>&bull;</span>
              <span>{formatTimeAgo(article.publishedAt)}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white leading-snug">
              {article.title}
            </h2>
          </div>

          {/* Executive Summary */}
          <div className="bg-[#151722] border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center space-x-2 text-[#D4FF00] text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>AI Executive Synthesis</span>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">{article.summary}</p>
          </div>

          {/* Core Takeaway Bullets */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 font-bold">
              Key Industry Takeaways
            </h4>
            <div className="space-y-2.5">
              {article.bullets.map((bullet, idx) => (
                <div key={idx} className="flex items-start space-x-3 bg-slate-900/40 p-3 rounded-lg border border-slate-800/60">
                  <CheckCircle2 className="w-4 h-4 text-[#D4FF00] shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-slate-300 leading-normal">{bullet}</p>
                </div>
              ))}
            </div>
          </div>

          {/* DIY Actionable Impact */}
          <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-xl p-4 space-y-1.5">
            <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider font-mono">
              💡 Actionable Strategy For DIY Artists
            </div>
            <p className="text-xs sm:text-sm text-emerald-200/90 leading-relaxed font-medium">
              {article.takeaway}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-6 border-t border-slate-800/80 mt-6 flex items-center justify-between">
          <Link
            href={`/news/${article.slug}`}
            onClick={onClose}
            className="text-xs text-[#D4FF00] hover:underline font-bold uppercase tracking-wider"
          >
            Read Full Deep-Dive &rarr;
          </Link>
          <a
            href={article.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3.5 py-2 rounded-md text-xs font-semibold transition-colors"
          >
            <span>Original Source</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
