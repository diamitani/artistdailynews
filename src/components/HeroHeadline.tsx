"use client";

import Link from "next/link";
import { Article } from "@/lib/types";
import { formatTimeAgo } from "@/lib/utils";
import { Sparkles, Clock, ArrowRight, Zap, CheckCircle2 } from "lucide-react";

interface HeroHeadlineProps {
  leadArticle: Article;
  subArticles: Article[];
  onQuickRead: (article: Article) => void;
}

export function HeroHeadline({ leadArticle, subArticles, onQuickRead }: HeroHeadlineProps) {
  if (!leadArticle) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Main Left Lead Story (7 cols) */}
        <div className="lg:col-span-7 bg-[#11131C] border border-[#272A38] rounded-2xl overflow-hidden flex flex-col justify-between group shadow-xl relative">
          <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-slate-900">
            <img
              src={leadArticle.imageUrl}
              alt={leadArticle.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#11131C] via-[#11131C]/40 to-transparent" />

            {/* Overlaid Badges */}
            <div className="absolute top-4 left-4 flex items-center space-x-2">
              <span className="bg-[#D4FF00] text-black font-black text-xs uppercase tracking-wider px-2.5 py-1 rounded shadow-lg">
                ★ TOP STORY
              </span>
              {leadArticle.isBreaking && (
                <span className="bg-[#FF3366] text-white font-bold text-xs uppercase tracking-wider px-2.5 py-1 rounded flex items-center shadow-lg animate-pulse">
                  <Zap className="w-3 h-3 mr-1 fill-current" /> BREAKING
                </span>
              )}
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-slate-300 font-mono">
              <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded">
                Source: <strong className="text-white">{leadArticle.sourceName}</strong>
              </span>
              <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1 text-[#D4FF00]" />
                {leadArticle.readTimeMinutes} min read &bull; {formatTimeAgo(leadArticle.publishedAt)}
              </span>
            </div>
          </div>

          <div className="p-6 sm:p-8 space-y-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight group-hover:text-[#D4FF00] transition-colors">
              <Link href={`/news/${leadArticle.slug}`}>
                {leadArticle.title}
              </Link>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed line-clamp-3">
              {leadArticle.summary}
            </p>

            {/* Executive DIY Takeaway Highlight */}
            <div className="bg-[#181A26] border-l-4 border-[#D4FF00] p-4 rounded-r-lg space-y-1">
              <div className="text-[11px] font-mono font-bold text-[#D4FF00] uppercase tracking-wider">
                ⚡ Why It Matters For DIY Artists
              </div>
              <p className="text-xs sm:text-sm text-slate-200 font-medium">
                {leadArticle.takeaway}
              </p>
            </div>

            {/* Actions */}
            <div className="pt-2 flex items-center space-x-4">
              <Link
                href={`/news/${leadArticle.slug}`}
                className="bg-[#D4FF00] hover:bg-[#bde600] text-black font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-md transition-transform active:scale-95 flex items-center space-x-1.5"
              >
                <span>Read Full Investigation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => onQuickRead(leadArticle)}
                className="text-xs font-mono text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 px-4 py-2.5 rounded-md font-semibold flex items-center space-x-1.5 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#D4FF00]" />
                <span>30s Brief</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Secondary Trending Stories Column (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
          <div className="bg-[#11131C] border border-[#272A38] rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-xs font-mono uppercase tracking-widest text-slate-300 font-bold flex items-center">
                <span className="w-2 h-2 rounded-full bg-[#D4FF00] mr-2"></span>
                Trending Industry Briefings
              </h2>
              <span className="text-[10px] font-mono text-slate-500 uppercase">Real-Time</span>
            </div>

            <div className="divide-y divide-slate-800/60 space-y-3.5">
              {subArticles.slice(0, 3).map((art, idx) => (
                <div key={art.id} className="pt-3 first:pt-0 group">
                  <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-400 mb-1">
                    <span className="text-[#D4FF00] font-bold">0{idx + 2} // {art.category.toUpperCase()}</span>
                    <span>&bull;</span>
                    <span>{formatTimeAgo(art.publishedAt)}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#D4FF00] transition-colors leading-snug">
                    <Link href={`/news/${art.slug}`}>{art.title}</Link>
                  </h3>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[11px] text-slate-400 font-mono">{art.sourceName}</span>
                    <button
                      onClick={() => onQuickRead(art)}
                      className="text-[11px] font-mono text-slate-400 hover:text-[#D4FF00] flex items-center"
                    >
                      <Sparkles className="w-3 h-3 mr-1 text-[#D4FF00]" /> 30s Takeaway
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Press Pass Fast Track Banner */}
          <div className="bg-gradient-to-br from-[#1A1C2B] to-[#12141F] border border-[#3A3E54] rounded-2xl p-5 relative overflow-hidden">
            <div className="relative z-10 space-y-2">
              <span className="text-[10px] font-mono font-bold text-[#D4FF00] uppercase tracking-wider bg-[#D4FF00]/10 px-2 py-0.5 rounded border border-[#D4FF00]/20">
                Official Accreditation
              </span>
              <h3 className="text-base font-black text-white">Cover Festivals with an ADN Press Pass</h3>
              <p className="text-xs text-slate-300">
                Get media credentials for SXSW, A2IM Indie Week, and major tours as a verified creator.
              </p>
              <Link
                href="/press-pass"
                className="inline-block mt-2 bg-white hover:bg-slate-200 text-black font-bold text-xs px-3.5 py-1.5 rounded transition-transform active:scale-95 uppercase tracking-wider"
              >
                Apply for Credentials &rarr;
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
