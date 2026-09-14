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
  Headphones,
  Play,
  Bookmark,
  Copy,
  Check,
  ShieldCheck,
  Zap,
  Eye,
} from "lucide-react";

interface ArticleDetailViewProps {
  article: Article;
  relatedArticles: Article[];
  /** Real 7-day reader stats; only rendered when views7d > 0 (never fabricated). */
  readStats?: { views7d: number; engaged7d: number; sourceClicks7d: number };
}

export function ArticleDetailView({ article, relatedArticles, readStats }: ArticleDetailViewProps) {
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

  // Provenance: show the PUBLISHER's date, never a fabricated one.
  const sourceDate = article.sourcePublishedAt || article.publishedAt;
  const hasSourceUrl = !!article.originalUrl && /^https?:\/\//.test(article.originalUrl);

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-[var(--text-primary)]">
      {/* Breadcrumbs Navigation */}
      <div className="flex items-center space-x-2 text-xs font-mono text-[var(--text-muted)]">
        <Link href="/" className="hover:text-[var(--accent-primary)] flex items-center space-x-1">
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          <span>Front Page</span>
        </Link>
        <span>/</span>
        <Link href={`/topics/${article.category}`} className="text-[var(--accent-primary)] uppercase font-bold hover:underline">
          {article.category}
        </Link>
        <span>/</span>
        <span className="text-[var(--text-muted)] truncate max-w-xs">{article.title}</span>
      </div>

      {/* Article Header & Masthead */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="bg-[var(--bg-secondary)] text-[var(--accent-primary)] border border-[var(--border-color)] font-mono text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
            {article.category} DESK
          </span>
          {article.isBreaking && (
            <span className="bg-[var(--accent-primary)] text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md flex items-center shadow animate-pulse">
              <Zap className="w-3 h-3 mr-1 fill-current" /> Breaking Alert
            </span>
          )}
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] leading-[1.12]">
          {article.title}
        </h1>

        {/* Byline & Publication Timestamp Strip — real publisher date, never fabricated */}
        <div className="flex flex-wrap items-center justify-between gap-4 text-xs text-[var(--text-muted)] font-mono border-y border-[var(--border-color)] py-3.5">
          <div className="flex items-center space-x-3">
            <span className="text-[var(--text-primary)] font-bold">
              By {article.author || "ADN Editorial Board"}
            </span>
            <span>&bull;</span>
            <span title={sourceDate ? `Source published ${formatDate(sourceDate)}` : undefined}>
              {sourceDate ? formatDate(sourceDate) : "Date unavailable"}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <span className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1 text-[var(--accent-primary)]" />
              {article.readTimeMinutes} min read
            </span>
            {/* Real reader count — rendered only when actual views exist */}
            {readStats && readStats.views7d > 0 && (
              <>
                <span>&bull;</span>
                <span className="flex items-center">
                  <Eye className="w-3.5 h-3.5 mr-1 text-[var(--accent-primary)]" />
                  {readStats.views7d.toLocaleString()} reads this week
                </span>
              </>
            )}
            <span>&bull;</span>
            {hasSourceUrl ? (
              <a
                href={article.originalUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-track-event="source_click"
                className="text-[var(--accent-primary)] hover:underline flex items-center font-bold"
              >
                <span>Source: {article.sourceName}</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            ) : (
              <span>Source: {article.sourceName}</span>
            )}
          </div>
        </div>
      </div>

      {/* Audio Briefing Player Bar */}
      <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center space-x-3 text-left">
          <div className="w-11 h-11 rounded-xl bg-[var(--accent-primary-light)] border border-[var(--accent-primary)]/20 flex items-center justify-center text-[var(--accent-primary)] shrink-0">
            <Headphones className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-mono font-bold text-[var(--accent-primary)] uppercase tracking-wider">
                AUDIO BRIEFING
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-medium">
              Listen to an audio read of this briefing while you browse.
            </p>
          </div>
        </div>

        <button
          onClick={() => playArticleBriefing(article.title, article.takeaway)}
          className="btn-brand px-5 py-2.5 shrink-0"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>Play Audio Brief</span>
        </button>
      </div>

      {/* Featured Lead Image */}
      {article.imageUrl ? (
        <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-color)] shadow-sm">
          <img
            src={article.imageUrl}
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-2.5 left-3 text-[10px] font-mono text-white bg-black/75 px-2.5 py-0.5 rounded backdrop-blur-sm">
            Image via {article.sourceName}
          </div>
        </div>
      ) : null}

      {/* Semafor-Style 4-Point Structured Intelligence Module */}
      <div className={`card-brand p-6 sm:p-8 space-y-6 ${textSizeClass}`}>
        <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
          <div className="flex items-center space-x-2 text-[var(--accent-primary)] font-mono text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-4 h-4" />
            <span>ADN 4-POINT EXECUTIVE INTELLIGENCE BRIEF</span>
          </div>
          <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase">Semaform Standard</span>
        </div>

        {/* 1. The News */}
        <div className="space-y-1.5">
          <div className="text-xs font-mono font-bold text-[var(--text-primary)] uppercase tracking-wider flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-blue)]"></span>
            <span>1. The News</span>
          </div>
          <p className="text-base sm:text-lg text-[var(--text-primary)] font-medium leading-relaxed pl-3.5 border-l-2 border-[var(--accent-blue)]">
            {article.summary}
          </p>
        </div>

        {/* 2. Key Takeaways */}
        <div className="space-y-2">
          <div className="text-xs font-mono font-bold text-[var(--text-primary)] uppercase tracking-wider flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)]"></span>
            <span>2. Core Intelligence Points</span>
          </div>
          <div className="space-y-2 pl-3.5">
            {article.bullets.map((bullet, idx) => (
              <div key={idx} className="flex items-start space-x-2.5 bg-[var(--bg-secondary)] p-3 rounded-xl border border-[var(--border-color)] text-xs sm:text-sm text-[var(--text-secondary)]">
                <CheckCircle2 className="w-4 h-4 text-[var(--accent-primary)] shrink-0 mt-0.5" />
                <span>{bullet}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 3. The Signal for DIY Artists */}
        <div className="bg-[var(--accent-emerald)]/10 border border-[var(--accent-emerald)]/30 rounded-2xl p-5 space-y-1.5">
          <div className="text-[var(--accent-emerald)] font-mono font-bold text-xs uppercase tracking-wider flex items-center space-x-1.5">
            <Zap className="w-3.5 h-3.5" />
            <span>3. The Signal for Independent Rights Holders</span>
          </div>
          <p className="text-xs sm:text-sm text-[var(--text-primary)] leading-relaxed font-medium">
            {article.takeaway}
          </p>
        </div>

        {/* 4. Extended analysis — only rendered from real article content, never filler */}
        {article.content && article.content.trim() && (
          <div className="space-y-1.5">
            <div className="text-xs font-mono font-bold text-[var(--text-primary)] uppercase tracking-wider flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-[var(--accent-amber)]"></span>
              <span>4. Extended Analysis</span>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed pl-3.5 border-l-2 border-[var(--accent-amber)]">
              {article.content}
            </p>
          </div>
        )}
      </div>

      {/* Reading Controls & Actions Bar */}
      <div className="flex items-center justify-between border-y border-[var(--border-color)] py-3 text-xs text-[var(--text-muted)] font-mono">
        <div className="flex items-center space-x-2">
          <span>Text Scale:</span>
          <button
            onClick={() => setTextSize("sm")}
            className={`px-2 py-0.5 rounded ${textSize === "sm" ? "bg-[var(--accent-primary)] text-white font-bold" : "hover:text-[var(--text-primary)]"}`}
          >
            A-
          </button>
          <button
            onClick={() => setTextSize("base")}
            className={`px-2 py-0.5 rounded ${textSize === "base" ? "bg-[var(--accent-primary)] text-white font-bold" : "hover:text-[var(--text-primary)]"}`}
          >
            A
          </button>
          <button
            onClick={() => setTextSize("lg")}
            className={`px-2 py-0.5 rounded ${textSize === "lg" ? "bg-[var(--accent-primary)] text-white font-bold" : "hover:text-[var(--text-primary)]"}`}
          >
            A+
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`flex items-center space-x-1 transition-colors ${
              bookmarked ? "text-[var(--accent-primary)] font-bold" : "hover:text-[var(--text-primary)]"
            }`}
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>{bookmarked ? "Saved" : "Save"}</span>
          </button>

          <button
            onClick={handleCopyLink}
            data-track-event="share"
            className="flex items-center space-x-1 hover:text-[var(--text-primary)] transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-[var(--accent-emerald)]" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Link Copied" : "Share"}</span>
          </button>
        </div>
      </div>

      {/* Mid-Article Leaderboard Unit */}
      <AdContainer slotType="in-feed" />

      {/* Full-story CTA — ADN publishes briefs, not full articles; the canonical source is the destination */}
      {hasSourceUrl && (
        <div className={`rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6 text-center space-y-3`}>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
            This is an ADN briefing. Read the full story at the original publisher.
          </p>
          <a
            href={article.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-track-event="source_click"
            className="btn-brand px-6 py-2.5 inline-flex items-center space-x-2"
          >
            <span>Read Full Story at {article.sourceName}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}

      {/* Fact-Check & Verification Methodology Card */}
      <div className="card-brand p-5 flex items-start space-x-3.5 text-xs text-[var(--text-muted)]">
        <ShieldCheck className="w-5 h-5 text-[var(--accent-emerald)] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <div className="text-[var(--text-primary)] font-bold">Editorial Verification & Integrity Statement</div>
          <p className="leading-relaxed text-[var(--text-secondary)]">
            This intelligence dispatch was synthesized by the Artist Daily News Editorial Desk with primary source attribution from {article.sourceName}. Our newsroom operates independently under strict journalistic verification standards, powered by the Artispreneur media network.
          </p>
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-[var(--border-color)]">
        <span className="text-xs font-mono text-[var(--text-muted)] mr-2">DISPATCH TAGS:</span>
        {article.tags.map((tag) => (
          <span key={tag} className="text-xs font-mono bg-[var(--bg-secondary)] text-[var(--text-secondary)] px-3 py-1 rounded-lg border border-[var(--border-color)]">
            #{tag}
          </span>
        ))}
      </div>

      {/* Press Pass Fast Track CTA Banner */}
      <div className="bg-[var(--bg-dark)] text-white rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1.5 text-center sm:text-left">
          <span className="text-[10px] font-mono text-[var(--accent-primary)] font-bold uppercase tracking-wider bg-white/10 px-2 py-0.5 rounded border border-white/20">
            Creator Badge
          </span>
          <h3 className="font-serif text-xl font-bold text-white">Get Your ADN Creator Badge</h3>
          <p className="text-xs text-white/70">
            Generate a free digital media badge for your EPK and socials. Self-issued by Artist Daily News — not official festival accreditation.
          </p>
        </div>
        <Link
          href="/press-pass"
          className="btn-brand px-6 py-3 shrink-0"
        >
          Get Your Badge &rarr;
        </Link>
      </div>

      {/* Related Dispatches Grid */}
      {relatedArticles.length > 0 && (
        <div className="pt-8 space-y-4">
          <h3 className="font-serif text-xl font-bold text-[var(--text-primary)] flex items-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent-primary)] mr-2.5"></span>
            Related {article.category.toUpperCase()} Dispatches
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {relatedArticles.map((rel) => (
              <Link
                key={rel.id}
                href={`/news/${rel.slug}`}
                className="card-brand p-4 space-y-2 block group"
              >
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className="text-[var(--accent-primary)] uppercase font-bold">{rel.sourceName}</span>
                  <span className="text-[var(--text-muted)]">{formatTimeAgo(rel.publishedAt)}</span>
                </div>
                <h4 className="font-serif text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors leading-snug line-clamp-2">
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
