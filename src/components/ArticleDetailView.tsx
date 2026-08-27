"use client";

import { useState } from "react";
import Link from "next/link";
import { Article } from "@/lib/types";
import { formatTimeAgo, formatDate } from "@/lib/utils";
import { useAudio } from "./AudioContext";
import { AdContainer } from "./AdContainer";
import { Sparkles, Clock, CheckCircle2, ExternalLink, ArrowLeft, Share2, Headphones, Play, Bookmark, ThumbsUp, Copy, Check } from "lucide-react";

interface ArticleDetailViewProps {
  article: Article;
  relatedArticles: Article[];
}

export function ArticleDetailView({ article, relatedArticles }: ArticleDetailViewProps) {
  const { playArticleBriefing } = useAudio();
  const [textSize, setTextSize] = useState<"sm" | "base" | "lg">("base");
  const [copied, setCopied] = useState(false);
  const [clapped, setClapped] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const textSizeClass = {
    sm: "text-sm",
    base: "text-base sm:text-lg",
    lg: "text-lg sm:text-xl",
  }[textSize];

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumbs */}
      <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
        <Link href="/" className="hover:text-white flex items-center space-x-1">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          <span>Feed</span>
        </Link>
        <span>/</span>
        <Link href={`/topics/${article.category}`} className="text-[#D4FF00] uppercase font-bold">
          {article.category}
        </Link>
        <span>/</span>
        <span className="text-slate-500 truncate max-w-xs">{article.title}</span>
      </div>

      {/* Article Masthead */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-[#D4FF00]/10 text-[#D4FF00] border border-[#D4FF00]/30 font-mono text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded">
            {article.category}
          </span>
          {article.isBreaking && (
            <span className="bg-[#FF3366] text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded">
              Breaking Alert
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
          {article.title}
        </h1>

        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 font-mono border-y border-slate-800 py-3">
          <div className="flex items-center space-x-3">
            <span>Reported via <strong className="text-slate-200">{article.sourceName}</strong></span>
            <span>&bull;</span>
            <span>{formatDate(article.publishedAt)}</span>
          </div>

          <div className="flex items-center space-x-3">
            <span className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1 text-[#D4FF00]" />
              {article.readTimeMinutes} min read
            </span>
            <a
              href={article.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4FF00] hover:underline flex items-center"
            >
              <span>Original Link</span>
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Interactive Audio Briefing Action Bar */}
      <div className="bg-gradient-to-r from-[#171927] via-[#131520] to-[#0E1018] border border-[#2B2F44] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center space-x-3 text-left">
          <div className="w-10 h-10 rounded-xl bg-[#D4FF00]/10 border border-[#D4FF00]/30 flex items-center justify-center text-[#D4FF00] shrink-0">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-[10px] font-mono font-bold text-[#D4FF00] uppercase">LISTEN TO STORY</span>
              <span className="text-slate-600">&bull;</span>
              <span className="text-[10px] font-mono text-slate-400">2:15 Audio Briefing</span>
            </div>
            <p className="text-xs text-slate-200 font-medium">
              Listen to our AI Newsdesk audio breakdown while you browse.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => playArticleBriefing(article.title, article.takeaway)}
            className="bg-[#D4FF00] hover:bg-[#bde600] text-black font-black text-xs uppercase px-4 py-2 rounded-lg flex items-center space-x-1.5 transition-transform active:scale-95 shadow-md shadow-[#D4FF00]/10"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Play Audio Brief</span>
          </button>
        </div>
      </div>

      {/* Featured Image */}
      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Executive 30-Second Briefing Box */}
      <div className="bg-[#121420] border border-[#272B3F] rounded-2xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center space-x-2 text-[#D4FF00] font-mono text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-4 h-4" />
          <span>30-SECOND EXECUTIVE INTELLIGENCE BRIEF</span>
        </div>

        <p className="text-base sm:text-lg text-slate-200 font-medium leading-relaxed">
          {article.summary}
        </p>

        <div className="space-y-2.5 pt-2">
          {article.bullets.map((bullet, idx) => (
            <div key={idx} className="flex items-start space-x-3 bg-slate-900/60 p-3.5 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-[#D4FF00] shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-slate-300 leading-normal">{bullet}</span>
            </div>
          ))}
        </div>

        {/* Actionable DIY Strategy */}
        <div className="mt-4 bg-emerald-950/40 border border-emerald-500/40 rounded-xl p-4 space-y-1">
          <div className="text-emerald-400 font-mono font-bold text-xs uppercase tracking-wider">
            💡 Actionable Strategy For DIY Artists
          </div>
          <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed font-medium">
            {article.takeaway}
          </p>
        </div>
      </div>

      {/* Text Size & Reading Controls */}
      <div className="flex items-center justify-between border-y border-slate-800 py-3 text-xs text-slate-400 font-mono">
        <div className="flex items-center space-x-2">
          <span>Text Size:</span>
          <button
            onClick={() => setTextSize("sm")}
            className={`px-2 py-0.5 rounded ${textSize === "sm" ? "bg-slate-700 text-white" : "hover:text-white"}`}
          >
            A-
          </button>
          <button
            onClick={() => setTextSize("base")}
            className={`px-2 py-0.5 rounded ${textSize === "base" ? "bg-slate-700 text-white" : "hover:text-white"}`}
          >
            A
          </button>
          <button
            onClick={() => setTextSize("lg")}
            className={`px-2 py-0.5 rounded ${textSize === "lg" ? "bg-slate-700 text-white" : "hover:text-white"}`}
          >
            A+
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={handleCopyLink}
            className="flex items-center space-x-1 hover:text-white transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Link Copied" : "Share"}</span>
          </button>
        </div>
      </div>

      {/* Mid-Article Ad Banner Unit */}
      <AdContainer slotType="in-feed" />

      {/* Full Article Extended Narrative */}
      <div className={`prose prose-invert max-w-none text-slate-300 space-y-5 leading-relaxed ${textSizeClass}`}>
        {article.content ? (
          <div className="whitespace-pre-line">{article.content}</div>
        ) : (
          <div className="space-y-4">
            <p>
              As independent market share approaches 40% of the total global recorded music revenue, developments in streaming distribution rules, metadata accuracy, and private catalogue valuations represent the single most important lever for working musicians and indie rights holders.
            </p>
            <p>
              Independent artists who treat their master recordings and songwriting publishing as structured financial equity consistently outperform peers relying strictly on passive algorithmic streaming.
            </p>
          </div>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-800">
        <span className="text-xs font-mono text-slate-500 mr-2">TAGS:</span>
        {article.tags.map((tag) => (
          <span key={tag} className="text-xs font-mono bg-slate-800 text-slate-300 px-3 py-1 rounded-full">
            #{tag}
          </span>
        ))}
      </div>

      {/* Press Pass CTA */}
      <div className="bg-gradient-to-r from-[#171927] to-[#11131E] border border-slate-700 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-[10px] font-mono text-[#D4FF00] font-bold uppercase tracking-wider">
            Official Media Credentials
          </span>
          <h3 className="text-base font-bold text-white">Cover Major Festivals with Artist Daily News</h3>
          <p className="text-xs text-slate-400">
            Apply for an official press pass to report from the media pit at SXSW, Rolling Loud, and industry summits.
          </p>
        </div>
        <Link
          href="/press-pass"
          className="bg-[#D4FF00] hover:bg-[#bde600] text-black font-bold text-xs uppercase px-5 py-2.5 rounded-lg shrink-0 transition-transform active:scale-95"
        >
          Apply for Press Pass &rarr;
        </Link>
      </div>

      {/* Related Articles Section */}
      {relatedArticles.length > 0 && (
        <div className="pt-8 space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center">
            <span className="w-2 h-2 rounded-full bg-[#D4FF00] mr-2"></span>
            Related {article.category.toUpperCase()} Dispatches
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.id}
                href={`/news/${rel.slug}`}
                className="bg-[#12141F] hover:bg-[#161826] border border-slate-800 p-4 rounded-xl space-y-2 block transition-colors group"
              >
                <span className="text-[10px] font-mono text-[#D4FF00] uppercase font-bold">
                  {rel.sourceName}
                </span>
                <h4 className="text-xs font-bold text-white group-hover:text-[#D4FF00] transition-colors leading-snug line-clamp-2">
                  {rel.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
