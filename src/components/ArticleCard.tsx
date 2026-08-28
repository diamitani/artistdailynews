"use client";

import Link from "next/link";
import { Article } from "@/lib/types";
import { formatTimeAgo } from "@/lib/utils";
import { Sparkles, Clock, ArrowUpRight, Zap, Bookmark } from "lucide-react";

interface ArticleCardProps {
  article: Article;
  onQuickRead: (article: Article) => void;
  featured?: boolean;
}

export function ArticleCard({ article, onQuickRead, featured }: ArticleCardProps) {
  const categoryColorMap: Record<string, string> = {
    financial: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    streaming: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    "tech-ai": "text-purple-400 border-purple-500/30 bg-purple-500/10",
    marketing: "text-pink-400 border-pink-500/30 bg-pink-500/10",
    legal: "text-amber-400 border-amber-500/30 bg-amber-500/10",
    podcasts: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
    tutorials: "text-teal-400 border-teal-500/30 bg-teal-500/10",
    opportunities: "text-[#D4FF00] border-[#D4FF00]/30 bg-[#D4FF00]/10",
  };

  const badgeClass = categoryColorMap[article.category] || "text-slate-300 border-slate-700 bg-slate-800";

  return (
    <article className="group bg-[#11131E] hover:bg-[#161827] border border-[#212435] hover:border-slate-600/80 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-md hover:shadow-xl">
      <div>
        {/* Article Image Cover */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#11131E] via-transparent to-transparent opacity-90" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex items-center space-x-2">
            <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded border backdrop-blur-md ${badgeClass}`}>
              {article.category}
            </span>
            {article.isBreaking && (
              <span className="bg-[#FF3366] text-white font-bold text-[9px] uppercase px-1.5 py-0.5 rounded flex items-center shadow">
                <Zap className="w-2.5 h-2.5 mr-0.5 fill-current" /> Live Alert
              </span>
            )}
            {article.isSponsored && (
              <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[9px] font-bold uppercase px-2 py-0.5 rounded">
                Sponsored
              </span>
            )}
          </div>

          <div className="absolute bottom-2.5 right-3 text-[10px] text-slate-300 font-mono flex items-center bg-black/70 px-2 py-0.5 rounded backdrop-blur-sm border border-white/10">
            <Clock className="w-3 h-3 mr-1 text-[#D4FF00]" />
            {article.readTimeMinutes} min read
          </div>
        </div>

        {/* Content Body */}
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span className="text-slate-300 font-medium">{article.sourceName}</span>
            <span>{formatTimeAgo(article.publishedAt)}</span>
          </div>

          <h3 className="font-serif-headline font-bold text-lg sm:text-xl text-white leading-snug group-hover:text-[#D4FF00] transition-colors line-clamp-2">
            <Link href={`/news/${article.slug}`}>
              {article.title}
            </Link>
          </h3>

          <p className="text-xs sm:text-sm text-slate-300 line-clamp-2 leading-relaxed">
            {article.summary}
          </p>
        </div>
      </div>

      {/* Footer Quick Actions */}
      <div className="px-5 pb-4 pt-3 border-t border-slate-800/60 flex items-center justify-between">
        <button
          onClick={() => onQuickRead(article)}
          className="inline-flex items-center space-x-1.5 text-xs font-mono text-slate-300 hover:text-[#D4FF00] font-semibold transition-colors py-1"
        >
          <Sparkles className="w-3.5 h-3.5 text-[#D4FF00]" />
          <span>30s Briefing</span>
        </button>

        <Link
          href={`/news/${article.slug}`}
          className="text-xs text-slate-400 hover:text-white flex items-center font-medium font-mono"
        >
          <span>Story</span>
          <ArrowUpRight className="w-3.5 h-3.5 ml-0.5" />
        </Link>
      </div>
    </article>
  );
}
