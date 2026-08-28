"use client";

import Link from "next/link";
import { Article } from "@/lib/types";
import { formatTimeAgo } from "@/lib/utils";
import { Sparkles, Clock, ArrowRight, Zap, TrendingUp, ShieldCheck, Newspaper, FileText } from "lucide-react";

interface HeroHeadlineProps {
  leadArticle: Article;
  subArticles: Article[];
  onQuickRead: (article: Article) => void;
}

export function HeroHeadline({ leadArticle, subArticles, onQuickRead }: HeroHeadlineProps) {
  if (!leadArticle) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
      {/* Front-Page Broadsheet Lead Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Col 1: Major Lead Investigation (7 cols) */}
        <div className="lg:col-span-7 bg-[#111420] border border-[#23283C] rounded-2xl overflow-hidden flex flex-col justify-between group shadow-2xl relative">
          <div>
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-slate-900">
              <img
                src={leadArticle.imageUrl}
                alt={leadArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111420] via-[#111420]/30 to-transparent" />

              {/* Overlaid Badges */}
              <div className="absolute top-4 left-4 flex items-center space-x-2">
                <span className="bg-[#D4FF00] text-black font-black text-xs uppercase tracking-wider px-2.5 py-1 rounded shadow-lg">
                  ★ LEAD INVESTIGATION
                </span>
                {leadArticle.isBreaking && (
                  <span className="bg-[#FF3366] text-white font-bold text-xs uppercase tracking-wider px-2.5 py-1 rounded flex items-center shadow-lg animate-pulse">
                    <Zap className="w-3 h-3 mr-1 fill-current" /> BREAKING
                  </span>
                )}
              </div>

              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-300 font-mono">
                <span className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                  Dateline: <strong className="text-white">NASHVILLE BUREAU</strong> &bull; {leadArticle.sourceName}
                </span>
                <span className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1 text-[#D4FF00]" />
                  {leadArticle.readTimeMinutes} min read &bull; {formatTimeAgo(leadArticle.publishedAt)}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-7 space-y-4">
              <div className="flex items-center space-x-2 text-xs font-mono text-[#D4FF00] font-bold uppercase tracking-wider">
                <span>CHANNEL: {leadArticle.category.toUpperCase()}</span>
                <span>&bull;</span>
                <span className="text-slate-400">SPECIAL REPORT</span>
              </div>

              <h1 className="font-serif-headline text-2xl sm:text-3xl lg:text-4xl font-black text-white leading-tight group-hover:text-[#D4FF00] transition-colors">
                <Link href={`/news/${leadArticle.slug}`}>
                  {leadArticle.title}
                </Link>
              </h1>

              <p className="drop-cap text-sm sm:text-base text-slate-300 leading-relaxed">
                {leadArticle.summary}
              </p>

              {/* Executive DIY Takeaway Highlight */}
              <div className="bg-[#171A27] border-l-4 border-[#D4FF00] p-4 rounded-r-xl space-y-1 mt-4">
                <div className="text-[11px] font-mono font-bold text-[#D4FF00] uppercase tracking-wider flex items-center">
                  <Zap className="w-3.5 h-3.5 mr-1" />
                  Why It Matters For Independent Rights Holders
                </div>
                <p className="text-xs sm:text-sm text-slate-200 font-medium">
                  {leadArticle.takeaway}
                </p>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 sm:px-7 pb-6 pt-2 flex items-center justify-between border-t border-slate-800/60">
            <Link
              href={`/news/${leadArticle.slug}`}
              className="bg-[#D4FF00] hover:bg-[#bde600] text-black font-black text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg transition-transform active:scale-95 flex items-center space-x-1.5 shadow-md shadow-[#D4FF00]/10"
            >
              <span>Read Full Investigation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => onQuickRead(leadArticle)}
              className="text-xs font-mono text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 px-3.5 py-2 rounded-lg font-semibold flex items-center space-x-1.5 transition-colors border border-slate-700"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4FF00]" />
              <span>30s Brief</span>
            </button>
          </div>
        </div>

        {/* Col 2 & 3: The Wire & Barometer (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
          {/* The Wire (Fast Breaking Dispatches) */}
          <div className="bg-[#111420] border border-[#23283C] rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-xs font-mono uppercase tracking-widest text-white font-bold flex items-center">
                <span className="w-2 h-2 rounded-full bg-emerald-400 mr-2 animate-pulse"></span>
                The Daily Wire // Latest Dispatches
              </h2>
              <span className="text-[10px] font-mono text-slate-400 uppercase bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                Live Feed
              </span>
            </div>

            <div className="divide-y divide-slate-800/60 space-y-3.5">
              {subArticles.slice(0, 3).map((art, idx) => (
                <div key={art.id} className="pt-3.5 first:pt-0 group">
                  <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 mb-1">
                    <span className="text-[#D4FF00] font-bold">
                      0{idx + 2} // {art.category.toUpperCase()}
                    </span>
                    <span>{formatTimeAgo(art.publishedAt)}</span>
                  </div>

                  <h3 className="font-serif-headline text-base font-bold text-white group-hover:text-[#D4FF00] transition-colors leading-snug">
                    <Link href={`/news/${art.slug}`}>{art.title}</Link>
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {art.summary}
                  </p>

                  <div className="mt-2.5 flex items-center justify-between pt-1 text-[11px] font-mono">
                    <span className="text-slate-400">{art.sourceName}</span>
                    <button
                      onClick={() => onQuickRead(art)}
                      className="text-slate-400 hover:text-[#D4FF00] flex items-center font-medium"
                    >
                      <Sparkles className="w-3 h-3 mr-1 text-[#D4FF00]" /> 30s Takeaway
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Editor's Note & Press Accreditation Fast-Track */}
          <div className="bg-gradient-to-br from-[#181B2B] to-[#10121C] border border-[#34394E] rounded-2xl p-5 relative overflow-hidden shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-[#D4FF00] uppercase tracking-wider bg-[#D4FF00]/10 px-2 py-0.5 rounded border border-[#D4FF00]/20">
                Official Media Pass
              </span>
              <span className="text-[10px] font-mono text-slate-400">SXSW &bull; A2IM &bull; Tours</span>
            </div>

            <h3 className="text-base font-black text-white leading-tight">
              Report from the Media Pit as an ADN Accredited Journalist
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              Verified independent artists, videographers, and creators receive official media credentials and Letter of Assignment.
            </p>

            <div className="pt-1 flex items-center justify-between">
              <Link
                href="/press-pass"
                className="bg-white hover:bg-slate-200 text-black font-bold text-xs px-3.5 py-1.5 rounded transition-transform active:scale-95 uppercase tracking-wider"
              >
                Apply for Credentials &rarr;
              </Link>
              <Link
                href="/pricing"
                className="text-xs font-mono text-[#D4FF00] hover:underline font-bold"
              >
                VIP Fast-Track &rarr;
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
