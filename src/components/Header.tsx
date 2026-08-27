"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Radio, Bell, Menu, X, Ticket, BarChart3, Newspaper, Sparkles, Command, Bot, User, Gift, ExternalLink } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { CommandMenu } from "./CommandMenu";
import { ArtispreneurLogo } from "./ArtispreneurLogo";
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
      <header className="sticky top-0 z-50 w-full bg-[#090A0F]/95 backdrop-blur-md border-b border-[#272A38]">
        {/* Top Meta Bar with Powered By Artispreneur */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/40">
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1.5 font-medium text-slate-300">
              <span className="live-pulse w-2 h-2 rounded-full bg-rose-500"></span>
              <span className="text-rose-400 font-bold uppercase tracking-wider text-[10px]">LIVE NEWSDESK</span>
            </div>
            <span className="text-slate-600">|</span>
            <span className="hidden sm:inline-block font-mono text-slate-400">{currentDateStr || "Today's Edition"}</span>
            <span className="hidden md:inline-block text-slate-500">&bull; Global Music Business & DIY Intelligence</span>
          </div>

          <div className="flex items-center space-x-3.5">
            {/* Powered by Artispreneur Link */}
            <Link
              href="/network"
              className="flex items-center space-x-1.5 text-amber-300 hover:text-amber-200 font-semibold text-[11px] uppercase tracking-wider bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 transition-colors"
            >
              <img src="/artispreneur-logo.png" alt="" className="w-3.5 h-3.5 object-contain" />
              <span>Powered by Artispreneur.com</span>
            </Link>

            <span className="text-slate-700 hidden sm:inline">|</span>

            <Link
              href="/pricing"
              className="text-[#D4FF00] hover:underline font-semibold text-[11px] uppercase tracking-wider hidden sm:inline"
            >
              VIP ($19/mo)
            </Link>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <Link
              href="/press-pass"
              className="flex items-center space-x-1 text-slate-300 hover:text-white font-semibold text-[11px] uppercase tracking-wider"
            >
              <Ticket className="w-3.5 h-3.5 text-[#D4FF00]" />
              <span>Press Pass</span>
            </Link>
            <ThemeToggle />
          </div>
        </div>

        {/* Main Masthead Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-6">
            {/* Brand Logo with Official Laurel A */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-900 border border-amber-500/40 p-0.5 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/10 group-hover:scale-105 transition-transform">
                <img src="/artispreneur-logo.png" alt="Artispreneur" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="font-black text-xl tracking-tight text-white flex items-center">
                  ARTIST DAILY <span className="text-[#D4FF00] ml-1">NEWS</span>
                </div>
                <p className="text-[9px] font-mono tracking-widest text-slate-400 uppercase -mt-1">
                  Artispreneur Media Network &bull; ISSN Registered
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center space-x-5 text-sm font-medium text-slate-300">
              <Link href="/" className="hover:text-[#D4FF00] transition-colors">
                Today's Feed
              </Link>
              <Link href="/topics/financial" className="hover:text-[#D4FF00] transition-colors">
                Royalties
              </Link>
              <Link href="/topics/streaming" className="hover:text-[#D4FF00] transition-colors">
                Streaming
              </Link>
              <Link href="/topics/tech-ai" className="hover:text-[#D4FF00] transition-colors">
                AI & Tech
              </Link>
              <Link href="/network" className="hover:text-amber-300 transition-colors flex items-center space-x-1 text-amber-400">
                <Gift className="w-3.5 h-3.5" />
                <span>Partner Deals</span>
              </Link>
              <Link href="/chat" className="hover:text-[#D4FF00] transition-colors flex items-center space-x-1 text-[#D4FF00]">
                <Bot className="w-3.5 h-3.5" />
                <span>AI Copilot</span>
              </Link>
              <Link href="/tools" className="hover:text-[#D4FF00] transition-colors flex items-center space-x-1 text-emerald-400">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Calculators</span>
              </Link>
            </nav>
          </div>

          {/* Right CTA Area */}
          <div className="flex items-center space-x-3">
            {/* Search Trigger Button */}
            <button
              onClick={() => (onSearchOpen ? onSearchOpen() : setCommandMenuOpen(true))}
              className="px-3 py-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-900 border border-slate-700/80 hover:border-slate-500 transition-colors flex items-center space-x-2 text-xs font-mono"
              title="Search (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              <span className="hidden sm:inline">Search...</span>
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
              onClick={onSubscribeClick || (() => {
                const el = document.getElementById("newsletter-section");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              })}
              className="bg-[#D4FF00] hover:bg-[#bde600] text-black font-bold px-3.5 py-2 rounded-md text-xs uppercase tracking-wider transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-[#D4FF00]/10 flex items-center space-x-1.5"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Join Briefing</span>
            </button>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#0D0E15] border-b border-slate-800 px-4 pt-3 pb-6 space-y-3">
            <nav className="flex flex-col space-y-2 text-sm font-medium text-slate-300">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-slate-800 text-white"
              >
                Today's Live News Feed
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
                href="/chat"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-slate-800 text-[#D4FF00] font-bold flex items-center space-x-2"
              >
                <Bot className="w-4 h-4" />
                <span>ADN Music Business AI Copilot</span>
              </Link>
              <Link
                href="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-slate-800 text-white flex items-center space-x-2"
              >
                <User className="w-4 h-4" />
                <span>Creator Dashboard & Saved Briefings</span>
              </Link>
              <Link
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-slate-800 text-amber-400"
              >
                ⭐ VIP Memberships ($19/mo)
              </Link>
              <Link
                href="/topics/financial"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-slate-800 text-emerald-400"
              >
                💰 Royalties & Catalogue Deals
              </Link>
              <Link
                href="/tools"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-slate-800 text-emerald-300"
              >
                📊 Royalty & Release Blueprint Calculators
              </Link>
              <Link
                href="/press-pass"
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md hover:bg-slate-800 text-purple-400"
              >
                🎟️ Apply for Official Press Pass
              </Link>
            </nav>
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
