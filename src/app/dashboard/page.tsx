"use client";

import { BreakingTicker } from "@/components/BreakingTicker";
import { useAuth } from "@/components/AuthContext";
import { MOCK_ARTICLES } from "@/lib/mock-articles";
import { Sparkles, Bookmark, Ticket, Rocket, Calculator, Bot, ArrowRight, ShieldCheck, User, LogOut, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  const savedArticles = MOCK_ARTICLES.filter((a) =>
    user?.savedArticleIds?.includes(a.id)
  );

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] justify-between">
      <BreakingTicker articles={MOCK_ARTICLES} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 w-full">
        
        {/* User Hero Bar */}
        <div className="card-brand p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-[var(--bg-secondary)] border-2 border-[var(--accent-primary)]/40 shrink-0 shadow-sm">
              <img src={user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"} alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-serif font-bold text-xl sm:text-2xl text-[var(--text-primary)]">{user?.name || "Independent Creator"}</h1>
                <span className="bg-[var(--accent-primary)] text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow-sm">
                  {user?.tier === "pro_insider" ? "PRO INSIDER" : user?.tier === "enterprise" ? "ENTERPRISE" : "FREE DIY"}
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] font-mono mt-0.5">
                Role: <strong className="text-[var(--text-secondary)]">{user?.role || "Artist"}</strong> &bull; {user?.email || "artist@adn.media"}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            {user?.tier === "free" && (
              <Link
                href="/pricing"
                className="btn-brand text-xs px-4 py-2.5 flex items-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Upgrade to Pro ($19/mo)</span>
              </Link>
            )}

            <button
              onClick={logout}
              className="p-2.5 rounded-xl bg-[var(--bg-secondary)] hover:bg-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors border border-[var(--border-color)]"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Hub Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/chat"
            className="card-brand p-5 space-y-2 block group"
          >
            <div className="w-9 h-9 rounded-xl bg-[var(--accent-primary-light)] border border-[var(--accent-primary)]/20 flex items-center justify-center text-[var(--accent-primary)]">
              <Bot className="w-4 h-4" />
            </div>
            <h3 className="font-serif font-bold text-[var(--text-primary)] text-base group-hover:text-[var(--accent-primary)] transition-colors">
              AI Copilot Assistant
            </h3>
            <p className="text-xs text-[var(--text-muted)]">Ask valuation, pitch & legal contract queries</p>
          </Link>

          <Link
            href="/tools"
            className="card-brand p-5 space-y-2 block group"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[var(--accent-emerald)]">
              <Calculator className="w-4 h-4" />
            </div>
            <h3 className="font-serif font-bold text-[var(--text-primary)] text-base group-hover:text-[var(--accent-emerald)] transition-colors">
              Royalty & Valuation Lab
            </h3>
            <p className="text-xs text-[var(--text-muted)]">Spotify stream payouts & catalogue multipliers</p>
          </Link>

          <Link
            href="/press-pass"
            className="card-brand p-5 space-y-2 block group"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-[var(--accent-blue)]">
              <Ticket className="w-4 h-4" />
            </div>
            <h3 className="font-serif font-bold text-[var(--text-primary)] text-base group-hover:text-[var(--accent-blue)] transition-colors">
              Press Pass Credentials
            </h3>
            <p className="text-xs text-[var(--text-muted)]">Apply for SXSW & festival photo pit access</p>
          </Link>

          <Link
            href="/billing"
            className="card-brand p-5 space-y-2 block group"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-serif font-bold text-[var(--text-primary)] text-base group-hover:text-purple-600 transition-colors">
              Membership & Billing
            </h3>
            <p className="text-xs text-[var(--text-muted)]">Manage Stripe subscription & VAT invoices</p>
          </Link>
        </div>

        {/* 2-Column Section: Saved Dispatches & Active Credentials */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Saved Bookmarks (7 cols) */}
          <div className="lg:col-span-7 card-brand p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
              <h2 className="text-sm font-mono uppercase font-bold text-[var(--text-primary)] flex items-center space-x-2">
                <Bookmark className="w-4 h-4 text-[var(--accent-primary)]" />
                <span>Saved Intelligence Briefings ({savedArticles.length})</span>
              </h2>
              <Link href="/" className="text-xs text-[var(--accent-primary)] hover:underline font-mono font-bold">
                Browse Feed &rarr;
              </Link>
            </div>

            <div className="divide-y divide-[var(--border-color)] space-y-3">
              {savedArticles.length === 0 ? (
                <p className="text-xs text-[var(--text-muted)] font-mono py-4">No saved briefings yet. Click the bookmark icon on any article to save it here.</p>
              ) : (
                savedArticles.map((art) => (
                  <div key={art.id} className="pt-3 first:pt-0 group">
                    <div className="flex items-center space-x-2 text-[10px] font-mono text-[var(--text-muted)]">
                      <span className="text-[var(--accent-primary)] font-bold uppercase">{art.category}</span>
                      <span>&bull;</span>
                      <span>{art.sourceName}</span>
                    </div>
                    <h3 className="font-serif text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors mt-0.5">
                      <Link href={`/news/${art.slug}`}>{art.title}</Link>
                    </h3>
                    <p className="text-xs text-[var(--text-secondary)] line-clamp-1 mt-0.5">{art.takeaway}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right: Press Pass & Release Status (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Press Pass Status Card */}
            <div className="card-brand p-6 space-y-4">
              <div className="border-b border-[var(--border-color)] pb-3">
                <h3 className="text-sm font-mono uppercase font-bold text-[var(--text-primary)] flex items-center space-x-2">
                  <Ticket className="w-4 h-4 text-[var(--accent-primary)]" />
                  <span>Active Press Accreditation</span>
                </h3>
              </div>

              <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] p-4 rounded-xl space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[var(--text-primary)] font-bold">SXSW 2026 Music Festival</span>
                  <span className="bg-amber-100 text-amber-900 border border-amber-300 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                    UNDER REVIEW
                  </span>
                </div>
                <p className="text-[11px] text-[var(--text-muted)] font-mono">Assignment ID: ADN-PRESS-892147</p>
                <div className="text-[11px] text-emerald-700 font-mono flex items-center pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Letter of Assignment drafting in progress
                </div>
              </div>
            </div>

            {/* Release Roadmap Quick Widget */}
            <div className="card-brand p-6 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-mono uppercase font-bold text-[var(--text-primary)] flex items-center space-x-2">
                  <Rocket className="w-4 h-4 text-[var(--accent-primary)]" />
                  <span>Release Roadmap</span>
                </h3>
                <Link href="/tools" className="text-xs text-[var(--accent-primary)] hover:underline font-mono font-bold">
                  View Checklist &rarr;
                </Link>
              </div>
              <p className="text-xs text-[var(--text-secondary)]">
                You have 4 tasks remaining for your next algorithmic release cycle.
              </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
