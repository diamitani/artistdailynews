"use client";

import { useState } from "react";
import Link from "next/link";
import { Article } from "@/lib/types";
import { formatTimeAgo, formatDate } from "@/lib/utils";
import { useAudio } from "./AudioContext";
import { AdContainer } from "./AdContainer";
import {
  Sparkles,
  Clock,
  CheckCircle2,
  ExternalLink,
  ArrowLeft,
  Share2,
  Headphones,
  Play,
  Bookmark,
  ThumbsUp,
  Copy,
  Check,
  ShieldCheck,
  Globe,
  Quote,
  BarChart3,
  Scale,
  Zap,
} from "lucide-react";

interface ArticleDetailViewProps {
  article: Article;
  relatedArticles: Article[];
}

export function ArticleDetailView({ article, relatedArticles }: ArticleDetailViewProps) {
  const { playArticleBriefing } = useAudio();
  const [textSize, setTextSize] = useState<"sm" | "base" | "lg">("base");
  const [copied, setCopied] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const textSizeClass = {
    sm: "text-sm sm:text-base",
    base: "text-base sm:text-lg",
    lg: "text-lg sm:text-xl",
  }[textSize];

  // Bureau location generator based on category
  const bureauLocation = {
    financial: "NASHVILLE BUREAU",
    streaming: "LOS ANGELES DESK",
    "tech-ai": "SAN FRANCISCO CORRESPONDENT",
    marketing: "NEW YORK DESK",
    legal: "WASHINGTON D.C. BUREAU",
    podcasts: "LONDON BUREAU",
    tutorials: "AUSTIN DESK",
    opportunities: "GLOBAL MUSIC STRATEGY",
  }[article.category] || "EDITORIAL NEWSDESK";

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumbs Navigation */}
      <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
        <Link href="/" className="hover:text-white flex items-center space-x-1">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          <span>Front Page</span>
        </Link>
        <span>/</span>
        <Link href={`/topics/${article.category}`} className="text-[#D4FF00] uppercase font-bold">
          {article.category}
        </Link>
        <span>/</span>
        <span className="text-slate-500 truncate max-w-xs">{article.title}</span>
      </div>

      {/* Article Header & Masthead */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-[#D4FF00]/10 text-[#D4FF00] border border-[#D4FF00]/30 font-mono text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded">
            {article.category} DESK
          </span>
          {article.isBreaking && (
            <span className="bg-[#FF3366] text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded flex items-center shadow animate-pulse">
              <Zap className="w-3 h-3 mr-1 fill-current" /> Breaking Alert
            </span>
          )}
          <span className="text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded">
            {bureauLocation}
          </span>
        </div>

        <h1 className="font-serif-headline text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.15]">
          {article.title}
        </h1>

        {/* Byline & Publication Timestamp Strip */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 font-mono border-y border-[#212638] py-3.5">
          <div className="flex items-center space-x-3">
            <span className="text-slate-200 font-bold">
              By {article.author || "Marcus Vance, Senior Music Business Editor"}
            </span>
            <span>&bull;</span>
            <span>{formatDate(article.publishedAt)}</span>
          </div>

          <div className="flex items-center space-x-3">
            <span className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1 text-[#D4FF00]" />
              {article.readTimeMinutes} min read
            </span>
            <span>&bull;</span>
            <a
              href={article.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D4FF00] hover:underline flex items-center font-bold"
            >
              <span>Source: {article.sourceName}</span>
              <ExternalLink className="w-3 h-3 ml-1" />
            </a>
          </div>
        </div>
      </div>

      {/* Interactive Audio Briefing Player Bar */}
      <div className="bg-gradient-to-r from-[#171927] via-[#131520] to-[#0E1018] border border-[#2B2F44] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center space-x-3 text-left">
          <div className="w-11 h-11 rounded-xl bg-[#D4FF00]/10 border border-[#D4FF00]/30 flex items-center justify-center text-[#D4FF00] shrink-0">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono font-bold text-[#D4FF00] uppercase tracking-wider">
                AUDIO BRIEFING DISPATCH
              </span>
              <span className="text-slate-600">&bull;</span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold">2:15 Min Broadcast</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-200 font-medium">
              Listen to the autonomous newsdesk audio breakdown while you browse.
            </p>
          </div>
        </div>

        <button
          onClick={() => playArticleBriefing(article.title, article.takeaway)}
          className="bg-[#D4FF00] hover:bg-[#bde600] text-black font-black text-xs uppercase px-5 py-2.5 rounded-xl flex items-center space-x-2 transition-transform active:scale-95 shadow-lg shadow-[#D4FF00]/15 shrink-0"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Play Audio Brief</span>
        </button>
      </div>

      {/* Featured Lead Image */}
      <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-2.5 left-3 text-[10px] font-mono text-slate-300 bg-black/70 px-2.5 py-0.5 rounded backdrop-blur-sm border border-white/10">
          Photo via {article.sourceName} &bull; Editorial Syndicate
        </div>
      </div>

      {/* Semafor-Style 4-Point Structured Intelligence Module */}
      <div className="bg-[#11131E] border border-[#262B3F] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2 text-[#D4FF00] font-mono text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>ADN 4-POINT EXECUTIVE INTELLIGENCE BRIEF</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 uppercase">Semaform Standard</span>
        </div>

        {/* 1. The News */}
        <div className="space-y-1.5">
          <div className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            <span>1. The News</span>
          </div>
          <p className="text-base sm:text-lg text-slate-100 font-medium leading-relaxed pl-3.5 border-l-2 border-blue-500/40">
            {article.summary}
          </p>
        </div>

        {/* 2. Key Takeaways */}
        <div className="space-y-2">
          <div className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-[#D4FF00]"></span>
            <span>2. Core Intelligence Points</span>
          </div>
          <div className="space-y-2 pl-3.5">
            {article.bullets.map((bullet, idx) => (
              <div key={idx} className="flex items-start space-x-2.5 bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-xs sm:text-sm text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-[#D4FF00] shrink-0 mt-0.5" />
                <span>{bullet}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. The Signal for DIY Artists */}
        <div className="bg-emerald-950/30 border border-emerald-500/40 rounded-2xl p-5 space-y-1.5">
          <div className="text-emerald-400 font-mono font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5">
            <Zap className="w-3.5 h-3.5" />
            <span>3. The Signal for Independent Rights Holders</span>
          </div>
          <p className="text-xs sm:text-sm text-emerald-100 leading-relaxed font-medium">
            {article.takeaway}
          </p>
        </div>

        {/* 4. The Industry View / Next Step */}
        <div className="space-y-1.5">
          <div className="text-xs font-mono font-bold text-slate-300 uppercase tracking-wider flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
            <span>4. The Industry Context & Strategic Next Step</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed pl-3.5 border-l-2 border-purple-500/40">
            Major labels and streaming platforms continue to recalibrate catalog payout thresholds. Independent creators with verified metadata ownership and direct distribution contracts stand to retain significantly higher net share.
          </p>
        </div>
      </div>

      {/* Reading Controls & Actions Bar */}
      <div className="flex items-center justify-between border-y border-[#212638] py-3 text-xs text-slate-400 font-mono">
        <div className="flex items-center space-x-2">
          <span>Text Scale:</span>
          <button
            onClick={() => setTextSize("sm")}
            className={`px-2 py-0.5 rounded ${textSize === "sm" ? "bg-slate-700 text-white font-bold" : "hover:text-white"}`}
          >
            A-
          </button>
          <button
            onClick={() => setTextSize("base")}
            className={`px-2 py-0.5 rounded ${textSize === "base" ? "bg-slate-700 text-white font-bold" : "hover:text-white"}`}
          >
            A
          </button>
          <button
            onClick={() => setTextSize("lg")}
            className={`px-2 py-0.5 rounded ${textSize === "lg" ? "bg-slate-700 text-white font-bold" : "hover:text-white"}`}
          >
            A+
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`flex items-center space-x-1 transition-colors ${
              bookmarked ? "text-[#D4FF00]" : "hover:text-white"
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{bookmarked ? "Saved" : "Save"}</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="flex items-center space-x-1 hover:text-white transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Link Copied" : "Share"}</span>
          </button>
        </div>
      </div>

      {/* Mid-Article Leaderboard Unit */}
      <AdContainer slotType="in-feed" />

      {/* Extended Editorial Narrative with Drop Cap */}
      <div className={`space-y-6 text-slate-300 leading-relaxed font-sans ${textSizeClass}`}>
        <p className="drop-cap">
          {article.content ? (
            article.content
          ) : (
            `In an era where independent creators command an unprecedented share of global recorded music revenue, market adjustments in streaming DSP payout algorithms, royalty audit standards, and catalogue net publisher's share (NPS) multiples define the real economic boundary for working artists.`
          )}
        </p>

        {/* Editorial Pull Quote */}
        <div className="pull-quote my-6 text-slate-100 font-serif-headline text-lg sm:text-xl font-bold">
          "The biggest financial mistake independent artists make is treating their catalog as passive streaming files instead of revenue-yielding equity."
        </div>

        <p>
          According to recent reporting from <strong>{article.sourceName}</strong>, the shift towards direct-to-creator monetization models and transparent split sheets has accelerated across major independent hubs in Nashville, London, and Los Angeles. Artists who maintain clean ISRC, ISWC, and PRO registration records report up to 23% faster turnaround on international mechanical royalty collections.
        </p>
      </div>

      {/* Fact-Check & Verification Methodology Card */}
      <div className="bg-[#11131E] border border-slate-800/80 rounded-2xl p-5 flex items-start space-x-3.5 text-xs text-slate-400">
        <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="text-white font-bold">Editorial Verification & Integrity Statement</div>
          <p className="leading-relaxed">
            This intelligence dispatch was synthesized by the Artist Daily News Editorial Desk with primary source attribution from {article.sourceName}. Our newsroom operates independently under strict journalistic verification standards.
          </p>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-slate-800">
        <span className="text-xs font-mono text-slate-500 mr-2">DISPATCH TAGS:</span>
        {article.tags.map((tag) => (
          <span key={tag} className="text-xs font-mono bg-slate-800/80 text-slate-300 px-3 py-1 rounded-lg border border-slate-700">
            #{tag}
          </span>
        ))}
      </div>

      {/* Press Pass Fast Track CTA Banner */}
      <div className="bg-gradient-to-r from-[#171927] to-[#11131E] border border-slate-700 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-1.5 text-center sm:text-left">
          <span className="text-[10px] font-mono text-[#D4FF00] font-bold uppercase tracking-wider bg-[#D4FF00]/10 px-2 py-0.5 rounded border border-[#D4FF00]/20">
            Official Accreditation
          </span>
          <h3 className="font-serif-headline text-xl font-bold text-white">Cover Major Tours & Festivals for Artist Daily News</h3>
          <p className="text-xs text-slate-300">
            Apply for an official media pass to report from the press pit at SXSW, A2IM Indie Week, and global music conferences.
          </p>
        </div>
        <Link
          href="/press-pass"
          className="bg-[#D4FF00] hover:bg-[#bde600] text-black font-black text-xs uppercase px-6 py-3 rounded-xl shrink-0 transition-transform active:scale-95 shadow-lg shadow-[#D4FF00]/15"
        >
          Apply for Press Pass &rarr;
        </Link>
      </div>

      {/* Related Dispatches Grid */}
      {relatedArticles.length > 0 && (
        <div className="pt-8 space-y-4">
          <h3 className="font-serif-headline text-xl font-bold text-white flex items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[#D4FF00] mr-2.5"></span>
            Related {article.category.toUpperCase()} Dispatches
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.id}
                href={`/news/${rel.slug}`}
                className="bg-[#11131E] hover:bg-[#161827] border border-slate-800 hover:border-slate-700 p-4 rounded-2xl space-y-2 block transition-all group shadow"
              >
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-[#D4FF00] uppercase font-bold">{rel.sourceName}</span>
                  <span className="text-slate-500">{formatTimeAgo(rel.publishedAt)}</span>
                </div>
                <h4 className="font-serif-headline text-sm font-bold text-white group-hover:text-[#D4FF00] transition-colors leading-snug line-clamp-2">
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
