"use client";

import { Header } from "@/components/Header";
import { BreakingTicker } from "@/components/BreakingTicker";
import { useAuth } from "@/components/AuthContext";
import { MOCK_ARTICLES } from "@/lib/mock-articles";
import { Sparkles, Bookmark, Ticket, Rocket, Calculator, Bot, ArrowRight, ShieldCheck, User, LogOut, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { formatTimeAgo } from "@/lib/utils";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  const savedArticles = MOCK_ARTICLES.filter((a) =>
    user?.savedArticleIds.includes(a.id)
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#090A0F]">
      <Header />
      <BreakingTicker articles={MOCK_ARTICLES} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        
        {/* User Hero Bar */}
        <div className="bg-[#121420] border border-[#272B3F] rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-800 border-2 border-[#D4FF00]/40 shrink-0 shadow-lg">
              <img src={user?.avatarUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"} alt="" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-black text-white">{user?.name || "Independent Creator"}</h1>
                <span className="bg-[#D4FF00] text-black text-[10px] font-black uppercase px-2 py-0.5 rounded shadow">
                  {user?.tier === "pro_insider" ? "PRO INSIDER" : user?.tier === "enterprise" ? "ENTERPRISE" : "FREE DIY"}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Role: <strong className="text-slate-200">{user?.role || "Artist"}</strong> &bull; {user?.email}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            {user?.tier === "free" && (
              <Link
                href="/pricing"
                className="bg-[#D4FF00] hover:bg-[#bde600] text-black font-black text-xs uppercase px-4 py-2.5 rounded-xl transition-transform active:scale-95 shadow-md shadow-[#D4FF00]/10 flex items-center space-x-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Upgrade to Pro ($19/mo)</span>
              </Link>
            )}

            <button
              onClick={logout}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
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
            className="bg-[#141624] hover:bg-[#181A2A] border border-slate-800 p-5 rounded-2xl space-y-2 block transition-colors group"
          >
            <div className="w-9 h-9 rounded-xl bg-[#D4FF00]/10 border border-[#D4FF00]/20 flex items-center justify-center text-[#D4FF00]">
              <Bot className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-white text-sm group-hover:text-[#D4FF00] transition-colors">
              AI Copilot Assistant
            </h3>
            <p className="text-xs text-slate-400">Ask valuation, pitch & legal contract queries</p>
          </Link>

          <Link
            href="/tools"
            className="bg-[#141624] hover:bg-[#181A2A] border border-slate-800 p-5 rounded-2xl space-y-2 block transition-colors group"
          >
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Calculator className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-white text-sm group-hover:text-emerald-400 transition-colors">
              Royalty & Valuation Lab
            </h3>
            <p className="text-xs text-slate-400">Spotify stream payouts & catalogue multipliers</p>
          </Link>

          <Link
            href="/press-pass"
            className="bg-[#141624] hover:bg-[#181A2A] border border-slate-800 p-5 rounded-2xl space-y-2 block transition-colors group"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
              <Ticket className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-white text-sm group-hover:text-blue-400 transition-colors">
              Press Pass Credentials
            </h3>
            <p className="text-xs text-slate-400">Apply for SXSW & festival photo pit access</p>
          </Link>

          <Link
            href="/billing"
            className="bg-[#141624] hover:bg-[#181A2A] border border-slate-800 p-5 rounded-2xl space-y-2 block transition-colors group"
          >
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-white text-sm group-hover:text-purple-400 transition-colors">
              Membership & Billing
            </h3>
            <p className="text-xs text-slate-400">Manage Stripe subscription & VAT invoices</p>
          </Link>
        </div>

        {/* 2-Column Section: Saved Dispatches & Active Credentials */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left: Saved Bookmarks (7 cols) */}
          <div className="lg:col-span-7 bg-[#121420] border border-[#272B3F] rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-sm font-mono uppercase font-bold text-white flex items-center space-x-2">
                <Bookmark className="w-4 h-4 text-[#D4FF00]" />
                <span>Saved Intelligence Briefings ({savedArticles.length})</span>
              </h2>
              <Link href="/" className="text-xs text-[#D4FF00] hover:underline font-mono">
                Browse Feed &rarr;
              </Link>
            </div>

            <div className="divide-y divide-slate-800/80 space-y-3">
              {savedArticles.map((art) => (
                <div key={art.id} className="pt-3 first:pt-0 group">
                  <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-400">
                    <span className="text-[#D4FF00] font-bold uppercase">{art.category}</span>
                    <span>&bull;</span>
                    <span>{art.sourceName}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white group-hover:text-[#D4FF00] transition-colors mt-0.5">
                    <Link href={`/news/${art.slug}`}>{art.title}</Link>
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-0.5">{art.takeaway}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Press Pass & Release Status (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Press Pass Status Card */}
            <div className="bg-[#121420] border border-[#272B3F] rounded-2xl p-6 space-y-4">
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-sm font-mono uppercase font-bold text-white flex items-center space-x-2">
                  <Ticket className="w-4 h-4 text-[#D4FF00]" />
                  <span>Active Press Accreditation</span>
                </h3>
              </div>

              <div className="bg-[#161826] border border-slate-800 p-4 rounded-xl space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-white font-bold">SXSW 2026 Music Festival</span>
                  <span className="bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[10px] font-mono font-bold px-2 py-0.2 rounded">
                    UNDER REVIEW
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono">Assignment ID: ADN-PRESS-892147</p>
                <div className="text-[11px] text-emerald-400 font-mono flex items-center pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Letter of Assignment drafting in progress
                </div>
              </div>
            </div>

            {/* Release Roadmap Quick Widget */}
            <div className="bg-[#121420] border border-[#272B3F] rounded-2xl p-6 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-mono uppercase font-bold text-white flex items-center space-x-2">
                  <Rocket className="w-4 h-4 text-pink-400" />
                  <span>Release Roadmap</span>
                </h3>
                <Link href="/tools" className="text-xs text-[#D4FF00] hover:underline font-mono">
                  View Checklist &rarr;
                </Link>
              </div>
              <p className="text-xs text-slate-300">
                You have 4 tasks remaining for your next algorithmic release cycle.
              </p>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}
