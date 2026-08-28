"use client";

import Link from "next/link";
import { Article } from "@/lib/types";
import { formatTimeAgo } from "@/lib/utils";
import { Sparkles, Clock, ArrowRight, Zap, TrendingUp, ShieldCheck, Users, Radio, BarChart3, Ticket, Bot } from "lucide-react";

interface HeroHeadlineProps {
  leadArticle: Article;
  subArticles: Article[];
  onQuickRead: (article: Article) => void;
}

export function HeroHeadline({ leadArticle, subArticles, onQuickRead }: HeroHeadlineProps) {
  if (!leadArticle) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

      {/* ═══ PLATFORM VALUE PROPOSITION HERO ═══ */}
      <div className="card-elevated rounded-3xl p-8 sm:p-12 relative overflow-hidden">
        {/* Warm gold accent glow */}
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-[var(--accent-gold)]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-[var(--accent-emerald)]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center space-x-2 bg-[var(--accent-gold-subtle)] border border-[var(--accent-gold)]/20 text-[var(--accent-gold)] px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Powered by Artispreneur.com</span>
          </div>

          <h1 className="font-serif-headline text-3xl sm:text-4xl lg:text-5xl font-black text-[var(--text-primary)] leading-tight">
            The Intelligence Platform That{" "}
            <span className="text-[var(--accent-gold)]">Protects Your Music Equity</span>
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed max-w-2xl mx-auto">
            Join <strong className="text-[var(--text-primary)]">35,000+ independent artists, managers, and labels</strong> who start every day with institutional-grade music business intelligence.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/auth/signup"
              className="bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-hover)] text-white font-black text-sm uppercase tracking-wider px-8 py-3.5 rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg flex items-center space-x-2"
            >
              <span>Start Free — No Card Required</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              href="/pricing"
              className="bg-[var(--bg-secondary)] hover:bg-[var(--border-color)] text-[var(--text-primary)] font-bold text-sm uppercase tracking-wider px-8 py-3.5 rounded-xl border border-[var(--border-color)] transition-colors flex items-center space-x-2"
            >
              <span>View Pro Plans</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Social Proof Counters */}
        <div className="relative z-10 mt-10 pt-8 border-t border-[var(--border-color)] grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">35K+</div>
            <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mt-1">Active Members</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">50+</div>
            <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mt-1">Industry Sources</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[var(--text-primary)]">8</div>
            <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mt-1">Intelligence Desks</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-black text-[var(--accent-gold)]">$1,200+</div>
            <div className="text-xs font-mono text-[var(--text-muted)] uppercase tracking-wider mt-1">Avg. Saved / Year</div>
          </div>
        </div>
      </div>

      {/* ═══ PLATFORM PILLARS ═══ */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { icon: Radio, label: "Daily Intel", desc: "50+ feeds synthesized", href: "/" },
          { icon: BarChart3, label: "Financial Lab", desc: "Royalty calculators", href: "/tools" },
          { icon: Bot, label: "AI Copilot", desc: "Business advisor", href: "/chat" },
          { icon: Ticket, label: "Press Pass", desc: "Media credentials", href: "/press-pass" },
          { icon: TrendingUp, label: "Partner Deals", desc: "$1,200+ in savings", href: "/network" },
          { icon: Users, label: "Community", desc: "35K+ professionals", href: "/pricing" },
        ].map((pillar) => {
          const Icon = pillar.icon;
          return (
            <Link
              key={pillar.label}
              href={pillar.href}
              className="card-elevated rounded-xl p-4 text-center space-y-2 group hover:border-[var(--accent-gold)]/30 transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-[var(--accent-gold-subtle)] border border-[var(--accent-gold)]/15 flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Icon className="w-5 h-5 text-[var(--accent-gold)]" />
              </div>
              <div className="text-xs font-bold text-[var(--text-primary)]">{pillar.label}</div>
              <div className="text-[10px] font-mono text-[var(--text-muted)]">{pillar.desc}</div>
            </Link>
          );
        })}
      </div>

      {/* ═══ LEAD STORY + WIRE ═══ */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* Lead Investigation (7 cols) */}
        <div className="lg:col-span-7 card-elevated rounded-2xl overflow-hidden flex flex-col justify-between group">
          <div>
            <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[var(--bg-secondary)]">
              <img
                src={leadArticle.imageUrl}
                alt={leadArticle.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Overlaid Badges */}
              <div className="absolute top-4 left-4 flex items-center space-x-2">
                <span className="gold-badge text-xs px-2.5 py-1 rounded shadow-lg">
                  ★ LEAD INVESTIGATION
                </span>
                {leadArticle.isBreaking && (
                  <span className="bg-[var(--accent-crimson)] text-white font-bold text-xs uppercase tracking-wider px-2.5 py-1 rounded flex items-center shadow-lg animate-pulse">
                    <Zap className="w-3 h-3 mr-1 fill-current" /> BREAKING
                  </span>
                )}
              </div>

              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-white/80 font-mono">
                <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/10">
                  <strong className="text-white">{leadArticle.sourceName}</strong>
                </span>
                <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-white/10 flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1" />
                  {leadArticle.readTimeMinutes} min &bull; {formatTimeAgo(leadArticle.publishedAt)}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-7 space-y-4">
              <div className="flex items-center space-x-2 text-xs font-mono text-[var(--accent-gold)] font-bold uppercase tracking-wider">
                <span>CHANNEL: {leadArticle.category.toUpperCase()}</span>
                <span>&bull;</span>
                <span className="text-[var(--text-muted)]">SPECIAL REPORT</span>
              </div>

              <h2 className="font-serif-headline text-2xl sm:text-3xl lg:text-4xl font-black text-[var(--text-primary)] leading-tight group-hover:text-[var(--accent-gold)] transition-colors">
                <Link href={`/news/${leadArticle.slug}`}>
                  {leadArticle.title}
                </Link>
              </h2>

              <p className="drop-cap text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">
                {leadArticle.summary}
              </p>

              {/* Executive Takeaway */}
              <div className="bg-[var(--accent-gold-subtle)] border-l-4 border-[var(--accent-gold)] p-4 rounded-r-xl space-y-1 mt-4">
                <div className="text-[11px] font-mono font-bold text-[var(--accent-gold)] uppercase tracking-wider flex items-center">
                  <Zap className="w-3.5 h-3.5 mr-1" />
                  Why It Matters For Independent Rights Holders
                </div>
                <p className="text-xs sm:text-sm text-[var(--text-primary)] font-medium">
                  {leadArticle.takeaway}
                </p>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 sm:px-7 pb-6 pt-2 flex items-center justify-between border-t border-[var(--border-color)]">
            <Link
              href={`/news/${leadArticle.slug}`}
              className="bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-hover)] text-white font-black text-xs uppercase tracking-wider px-5 py-2.5 rounded-lg transition-transform active:scale-95 flex items-center space-x-1.5 shadow-md"
            >
              <span>Read Full Investigation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <button
              onClick={() => onQuickRead(leadArticle)}
              className="text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--bg-secondary)] hover:bg-[var(--border-color)] px-3.5 py-2 rounded-lg font-semibold flex items-center space-x-1.5 transition-colors border border-[var(--border-color)]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
              <span>30s Brief</span>
            </button>
          </div>
        </div>

        {/* The Wire (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
          {/* Fast Breaking Dispatches */}
          <div className="card-elevated rounded-2xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
              <h3 className="text-xs font-mono uppercase tracking-widest text-[var(--text-primary)] font-bold flex items-center">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-emerald)] mr-2 animate-pulse"></span>
                The Daily Wire // Latest Dispatches
              </h3>
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase bg-[var(--bg-secondary)] px-2 py-0.5 rounded border border-[var(--border-color)]">
                Live Feed
              </span>
            </div>

            <div className="divide-y divide-[var(--border-color)] space-y-3.5">
              {subArticles.slice(0, 3).map((art, idx) => (
                <div key={art.id} className="pt-3.5 first:pt-0 group">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)] mb-1">
                    <span className="text-[var(--accent-gold)] font-bold">
                      0{idx + 2} // {art.category.toUpperCase()}
                    </span>
                    <span>{formatTimeAgo(art.publishedAt)}</span>
                  </div>

                  <h4 className="font-serif-headline text-base font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-gold)] transition-colors leading-snug">
                    <Link href={`/news/${art.slug}`}>{art.title}</Link>
                  </h4>

                  <p className="text-xs text-[var(--text-muted)] line-clamp-2 mt-1 leading-relaxed">
                    {art.summary}
                  </p>

                  <div className="mt-2.5 flex items-center justify-between pt-1 text-[11px] font-mono">
                    <span className="text-[var(--text-muted)]">{art.sourceName}</span>
                    <button
                      onClick={() => onQuickRead(art)}
                      className="text-[var(--text-muted)] hover:text-[var(--accent-gold)] flex items-center font-medium"
                    >
                      <Sparkles className="w-3 h-3 mr-1 text-[var(--accent-gold)]" /> 30s Takeaway
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Press Credential Card */}
          <div className="card-elevated rounded-2xl p-5 relative overflow-hidden space-y-3 border-[var(--accent-gold)]/20 gold-glow">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono font-bold text-[var(--accent-gold)] uppercase tracking-wider bg-[var(--accent-gold-subtle)] px-2 py-0.5 rounded border border-[var(--accent-gold)]/20">
                Official Media Pass
              </span>
              <span className="text-[10px] font-mono text-[var(--text-muted)]">SXSW &bull; A2IM &bull; Tours</span>
            </div>

            <h4 className="text-base font-black text-[var(--text-primary)] leading-tight">
              Report from the Media Pit as an ADN Accredited Journalist
            </h4>

            <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
              Verified independent artists, videographers, and creators receive official media credentials and Letter of Assignment.
            </p>

            <div className="pt-1 flex items-center justify-between">
              <Link
                href="/press-pass"
                className="bg-[var(--text-primary)] hover:opacity-90 text-[var(--bg-card)] font-bold text-xs px-3.5 py-1.5 rounded transition-transform active:scale-95 uppercase tracking-wider"
              >
                Apply for Credentials &rarr;
              </Link>
              <Link
                href="/pricing"
                className="text-xs font-mono text-[var(--accent-gold)] hover:underline font-bold"
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
