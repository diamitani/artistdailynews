"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search,
  Radio,
  Bell,
  Menu,
  X,
  Ticket,
  BarChart3,
  Newspaper,
  Sparkles,
  Command,
  Bot,
  User,
  Gift,
  ExternalLink,
  ShieldCheck,
  TrendingUp,
  Globe,
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { CommandMenu } from "./CommandMenu";
import { useAuth } from "./AuthContext";

interface HeaderProps {
  onSearchOpen?: () => void;
  onSubscribeClick?: () => void;
}

export function Header({ onSearchOpen, onSubscribeClick }: HeaderProps) {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [commandMenuOpen, setCommandMenuOpen] = useState(false);
  const [currentDateStr, setCurrentDateStr] = useState("");

  useEffect(() => {
    const formatted = new Intl.DateTimeFormat("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(new Date());
    setCurrentDateStr(formatted);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#08090D]/95 backdrop-blur-md border-b border-[#212638]">
        {/* Tier 1: Broadsheet Edition, Bureaus & Live DSP Rate Ticker Rail */}
        <div className="border-b border-[#1C2030] bg-[#06070A] text-[11px] text-slate-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between">
            {/* Left: Bureau & Issue Metadata */}
            <div className="flex items-center space-x-3 truncate">
              <div className="flex items-center space-x-1.5 font-bold text-rose-400">
                <span className="live-pulse w-2 h-2 rounded-full bg-rose-500"></span>
                <span className="tracking-widest uppercase text-[10px]">LIVE NEWSDESK</span>
              </div>
              <span className="text-slate-700 hidden sm:inline">|</span>
              <span className="font-mono text-slate-300 hidden md:inline">
                VOL. IV, NO. 241 &bull; {currentDateStr || "Today's Edition"}
              </span>
              <span className="text-slate-700 hidden lg:inline">|</span>
              <span className="text-slate-400 font-mono text-[10px] hidden lg:inline flex items-center space-x-1">
                <Globe className="w-3 h-3 text-slate-500 mr-1" />
                <span>Bureaus: Nashville &bull; New York &bull; Los Angeles &bull; London</span>
              </span>
            </div>

            {/* Right: Market Snapshot & Network Link */}
            <div className="flex items-center space-x-3 shrink-0">
              {/* Mini Stream Index Ticker */}
              <div className="hidden xl:flex items-center space-x-2 font-mono text-[10px] bg-[#0E1018] px-2 py-0.5 rounded border border-slate-800">
                <span className="text-slate-400">DSP Index:</span>
                <span className="text-emerald-400 font-bold">Apple $0.0078 ▲</span>
                <span className="text-slate-600">|</span>
                <span className="text-rose-400 font-bold">Spotify $0.0035 ▼</span>
                <span className="text-slate-600">|</span>
                <span className="text-emerald-400 font-bold">Tidal $0.0125 ▲</span>
              </div>

              {/* Powered by Artispreneur Link */}
              <Link
                href="/network"
                className="flex items-center space-x-1.5 text-amber-300 hover:text-amber-200 font-semibold text-[11px] uppercase tracking-wider bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 transition-colors"
              >
                <img src="/artispreneur-logo.png" alt="" className="w-3.5 h-3.5 object-contain" />
                <span className="hidden sm:inline">Artispreneur.com</span>
              </Link>

              <span className="text-slate-700 hidden sm:inline">|</span>

              <Link
                href="/pricing"
                className="text-[#D4FF00] hover:underline font-bold text-[11px] uppercase tracking-wider hidden sm:inline"
              >
                VIP PRO ($19/mo)
              </Link>

              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Tier 2: The Grand Broadsheet Masthead */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between border-b border-[#1A1E2C]">
          {/* Masthead Center/Left Branding */}
          <Link href="/" className="flex items-center space-x-3.5 group">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-900 border border-amber-500/40 p-0.5 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/10 group-hover:scale-105 transition-transform">
              <img src="/artispreneur-logo.png" alt="Artispreneur Laurel" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="font-serif-headline text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center">
                ARTIST DAILY <span className="text-[#D4FF00] ml-1.5 italic font-sans font-black">NEWS</span>
              </div>
              <p className="text-[9px] font-mono tracking-widest text-slate-400 uppercase -mt-0.5 flex items-center space-x-2">
                <span>The Daily Journal of Independent Music Economics & Strategy</span>
                <span className="hidden md:inline text-slate-600">&bull;</span>
                <span className="hidden md:inline text-emerald-400">ISSN Registered</span>
              </p>
            </div>
          </Link>

          {/* Quick Action Suite */}
          <div className="flex items-center space-x-3">
            {/* Search Trigger Button */}
            <button
              onClick={() => (onSearchOpen ? onSearchOpen() : setCommandMenuOpen(true))}
              className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-700/80 hover:border-slate-500 transition-colors flex items-center space-x-2 text-xs font-mono"
              title="Search Newsdesk (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Search Dispatches...</span>
              <kbd className="hidden sm:inline-flex items-center text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 border border-slate-700">
                ⌘K
              </kbd>
            </button>

            {user ? (
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 p-1 pl-2 pr-3 bg-slate-900 border border-slate-700 rounded-xl hover:border-[#D4FF00] transition-colors"
              >
                <div className="w-6 h-6 rounded-lg overflow-hidden bg-slate-800">
                  <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" />
                </div>
                <span className="text-xs font-bold text-white max-w-[80px] truncate hidden sm:inline">
                  {user.name.split(" ")[0]}
                </span>
              </Link>
            ) : (
              <Link
                href="/auth/login"
                className="text-xs font-mono text-slate-300 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition-colors hidden sm:inline"
              >
                Sign In
              </Link>
            )}

            <button
              onClick={
                onSubscribeClick ||
                (() => {
                  const el = document.getElementById("newsletter-section");
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                })
              }
              className="bg-[#D4FF00] hover:bg-[#bde600] text-black font-black px-3.5 py-2 rounded-md text-xs uppercase tracking-wider transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-[#D4FF00]/10 flex items-center space-x-1.5 shrink-0"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Join Briefing</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Tier 3: Category Desk Navigation Ribbon */}
        <div className="hidden xl:block bg-[#0A0C12] border-b border-[#1E2334] px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-medium text-slate-300">
            <nav className="flex items-center space-x-6 py-2">
              <Link href="/" className="hover:text-[#D4FF00] transition-colors font-bold text-white">
                Front Page
              </Link>
              <Link href="/topics/financial" className="hover:text-emerald-400 transition-colors">
                Royalties & Publishing
              </Link>
              <Link href="/topics/streaming" className="hover:text-blue-400 transition-colors">
                Streaming & DSPs
              </Link>
              <Link href="/topics/tech-ai" className="hover:text-purple-400 transition-colors">
                AI & Music Tech
              </Link>
              <Link href="/topics/marketing" className="hover:text-pink-400 transition-colors">
                Viral Growth
              </Link>
              <Link href="/topics/legal" className="hover:text-amber-400 transition-colors">
                Legal & Rights
              </Link>
              <Link href="/podcasts" className="hover:text-cyan-400 transition-colors">
                Podcasts
              </Link>
              <Link href="/tools" className="hover:text-emerald-400 transition-colors flex items-center space-x-1">
                <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Financial Lab</span>
              </Link>
              <Link href="/network" className="hover:text-amber-300 transition-colors flex items-center space-x-1 text-amber-400 font-semibold">
                <Gift className="w-3.5 h-3.5" />
                <span>Partner Deals</span>
              </Link>
              <Link href="/chat" className="hover:text-[#D4FF00] transition-colors flex items-center space-x-1 text-[#D4FF00] font-semibold">
                <Bot className="w-3.5 h-3.5" />
                <span>AI Copilot</span>
              </Link>
            </nav>

            <Link
              href="/press-pass"
              className="flex items-center space-x-1.5 text-slate-300 hover:text-white text-[11px] font-mono uppercase tracking-wider py-1"
            >
              <Ticket className="w-3.5 h-3.5 text-[#D4FF00]" />
              <span>Press Pass Credentials</span>
            </Link>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#0A0C14] border-b border-slate-800 px-4 pt-3 pb-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-3">
                Main Navigation
              </span>
              <nav className="flex flex-col space-y-1 text-sm font-medium text-slate-300">
                <Link
                  href="/"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-md hover:bg-slate-800 text-white font-bold"
                >
                  Front Page (Live Feed)
                </Link>
                <Link
                  href="/chat"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-md hover:bg-slate-800 text-[#D4FF00] font-bold flex items-center space-x-2"
                >
                  <Bot className="w-4 h-4" />
                  <span>ADN Music Business AI Copilot</span>
                </Link>
                <Link
                  href="/network"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-md hover:bg-slate-800 text-amber-300 font-bold flex items-center space-x-2"
                >
                  <Gift className="w-4 h-4" />
                  <span>Artispreneur Network & Partner Deals</span>
                </Link>
                <Link
                  href="/pricing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-md hover:bg-slate-800 text-amber-400 font-bold"
                >
                  ⭐ VIP Pro Membership ($19/mo)
                </Link>
                <Link
                  href="/tools"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-md hover:bg-slate-800 text-emerald-400 flex items-center space-x-2"
                >
                  <BarChart3 className="w-4 h-4" />
                  <span>Royalty & Valuation Financial Lab</span>
                </Link>
                <Link
                  href="/press-pass"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-md hover:bg-slate-800 text-purple-400 flex items-center space-x-2"
                >
                  <Ticket className="w-4 h-4" />
                  <span>Official Press Pass Accreditation</span>
                </Link>
                <Link
                  href="/podcasts"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-md hover:bg-slate-800 text-cyan-400 flex items-center space-x-2"
                >
                  <Radio className="w-4 h-4" />
                  <span>Podcasts & Masterclass Audio</span>
                </Link>
                <Link
                  href="/newsletters"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 rounded-md hover:bg-slate-800 text-slate-300 flex items-center space-x-2"
                >
                  <Newspaper className="w-4 h-4" />
                  <span>Daily Dispatch Newsletter Archive</span>
                </Link>
              </nav>
            </div>

            <div className="space-y-1 pt-2 border-t border-slate-800">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-3">
                Channel Desks
              </span>
              <nav className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs font-mono text-slate-300">
                <Link
                  href="/topics/financial"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-1.5 rounded hover:bg-slate-800 text-emerald-400"
                >
                  💰 Royalties & Catalogues
                </Link>
                <Link
                  href="/topics/streaming"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-1.5 rounded hover:bg-slate-800 text-blue-400"
                >
                  📻 Streaming & Playlists
                </Link>
                <Link
                  href="/topics/tech-ai"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-1.5 rounded hover:bg-slate-800 text-purple-400"
                >
                  🤖 AI & Music Tech
                </Link>
                <Link
                  href="/topics/marketing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-1.5 rounded hover:bg-slate-800 text-pink-400"
                >
                  📈 TikTok & Viral Growth
                </Link>
                <Link
                  href="/topics/legal"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-1.5 rounded hover:bg-slate-800 text-amber-400"
                >
                  ⚖️ Legal & Copyright
                </Link>
                <Link
                  href="/topics/podcasts"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-1.5 rounded hover:bg-slate-800 text-cyan-400"
                >
                  🎙️ Podcasts & Interviews
                </Link>
                <Link
                  href="/topics/tutorials"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-1.5 rounded hover:bg-slate-800 text-teal-400"
                >
                  🎓 DIY Masterclasses
                </Link>
                <Link
                  href="/topics/opportunities"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-1.5 rounded hover:bg-slate-800 text-[#D4FF00]"
                >
                  🎟️ Press Passes & Grants
                </Link>
              </nav>
            </div>

            <div className="space-y-1 pt-2 border-t border-slate-800">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-3">
                Account & Admin
              </span>
              <nav className="flex flex-col space-y-1 text-xs font-mono text-slate-400">
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-1.5 rounded hover:bg-slate-800 text-white flex items-center space-x-2"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Creator Dashboard</span>
                </Link>
                <Link
                  href="/billing"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-1.5 rounded hover:bg-slate-800 hover:text-white"
                >
                  Manage Billing & Invoices
                </Link>
                <Link
                  href="/advertise"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-1.5 rounded hover:bg-slate-800 hover:text-white"
                >
                  Media Kit & Advertising Rates
                </Link>
                <Link
                  href="/admin/newsdesk"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-1.5 rounded hover:bg-slate-800 hover:text-white"
                >
                  Newsroom Command Studio
                </Link>
              </nav>
            </div>
          </div>
        )}
      </header>

      {/* Global Command Palette */}
      <CommandMenu
        isOpen={commandMenuOpen}
        onClose={() => setCommandMenuOpen(false)}
      />
    </>
  );
}
