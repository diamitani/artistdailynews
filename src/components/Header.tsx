"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Search, Radio, Bell, Menu, X, Ticket, BarChart3, Newspaper,
  Sparkles, Command, Bot, User, Gift, ExternalLink, ShieldCheck,
  TrendingUp, Globe, ChevronRight,
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
      <header className="sticky top-0 z-50 w-full bg-[var(--bg-card)]/95 backdrop-blur-md border-b border-[var(--border-color)]">
        {/* Tier 1: Edition Bar */}
        <div className="border-b border-[var(--border-color)] text-[11px] text-[var(--text-muted)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between">
            {/* Left: Bureau & Issue Metadata */}
            <div className="flex items-center space-x-3 truncate">
              <div className="flex items-center space-x-1.5 font-bold text-[var(--accent-crimson)]">
                <span className="live-pulse w-2 h-2 rounded-full bg-[var(--accent-crimson)]"></span>
                <span className="tracking-widest uppercase text-[10px]">LIVE NEWSDESK</span>
              </div>
              <span className="text-[var(--border-highlight)] hidden sm:inline">|</span>
              <span className="font-mono text-[var(--text-secondary)] hidden md:inline">
                VOL. IV, NO. 241 &bull; {currentDateStr || "Today's Edition"}
              </span>
              <span className="text-[var(--border-highlight)] hidden lg:inline">|</span>
              <span className="text-[var(--text-muted)] font-mono text-[10px] hidden lg:inline">
                <Globe className="w-3 h-3 inline mr-1" />
                Nashville &bull; New York &bull; Los Angeles &bull; London
              </span>
            </div>

            {/* Right: Network + VIP */}
            <div className="flex items-center space-x-3 shrink-0">
              {/* Mini Stream Index */}
              <div className="hidden xl:flex items-center space-x-2 font-mono text-[10px] bg-[var(--bg-secondary)] px-2 py-0.5 rounded border border-[var(--border-color)]">
                <span className="text-[var(--text-muted)]">DSP Index:</span>
                <span className="text-[var(--accent-emerald)] font-bold">Apple $0.0078 ▲</span>
                <span className="text-[var(--border-highlight)]">|</span>
                <span className="text-[var(--accent-crimson)] font-bold">Spotify $0.0035 ▼</span>
                <span className="text-[var(--border-highlight)]">|</span>
                <span className="text-[var(--accent-emerald)] font-bold">Tidal $0.0125 ▲</span>
              </div>

              {/* Artispreneur Network Link */}
              <Link
                href="/network"
                className="flex items-center space-x-1.5 text-[var(--accent-gold)] hover:text-[var(--accent-gold-hover)] font-semibold text-[11px] uppercase tracking-wider bg-[var(--accent-gold-subtle)] px-2 py-0.5 rounded border border-[var(--accent-gold)]/20 transition-colors"
              >
                <img src="/artispreneur-logo.png" alt="" className="w-3.5 h-3.5 object-contain" />
                <span className="hidden sm:inline">Artispreneur.com</span>
              </Link>

              <span className="text-[var(--border-color)] hidden sm:inline">|</span>

              <Link
                href="/pricing"
                className="text-[var(--accent-gold)] hover:underline font-bold text-[11px] uppercase tracking-wider hidden sm:inline"
              >
                VIP PRO ($19/mo)
              </Link>

              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Tier 2: The Grand Masthead */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between border-b border-[var(--border-color)]">
          {/* Masthead Branding */}
          <Link href="/" className="flex items-center space-x-3.5 group">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-[var(--bg-secondary)] border border-[var(--accent-gold)]/40 p-0.5 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <img src="/artispreneur-logo.png" alt="Artispreneur" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="font-serif-headline text-2xl sm:text-3xl font-black tracking-tight text-[var(--text-primary)] flex items-center">
                ARTIST DAILY <span className="text-[var(--accent-gold)] ml-1.5 italic font-sans font-black">NEWS</span>
              </div>
              <p className="text-[9px] font-mono tracking-widest text-[var(--text-muted)] uppercase -mt-0.5 flex items-center space-x-2">
                <span>The Intelligence Platform for Independent Music Professionals</span>
                <span className="hidden md:inline text-[var(--border-highlight)]">&bull;</span>
                <span className="hidden md:inline text-[var(--accent-emerald)]">ISSN Registered</span>
              </p>
            </div>
          </Link>

          {/* Quick Action Suite */}
          <div className="flex items-center space-x-3">
            {/* Search Button */}
            <button
              onClick={() => (onSearchOpen ? onSearchOpen() : setCommandMenuOpen(true))}
              className="px-3 py-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--border-highlight)] transition-colors flex items-center space-x-2 text-xs font-mono"
              title="Search Newsdesk (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Search Dispatches...</span>
              <kbd className="hidden sm:inline-flex items-center text-[10px] bg-[var(--bg-primary)] px-1.5 py-0.5 rounded text-[var(--text-muted)] border border-[var(--border-color)]">
                ⌘K
              </kbd>
            </button>

            {user ? (
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 p-1 pl-2 pr-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl hover:border-[var(--accent-gold)] transition-colors"
              >
                <div className="w-6 h-6 rounded-lg overflow-hidden bg-[var(--bg-primary)]">
                  <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" />
                </div>
                <span className="text-xs font-bold text-[var(--text-primary)] max-w-[80px] truncate hidden sm:inline">
                  {user.name.split(" ")[0]}
                </span>
              </Link>
            ) : (
              <Link
                href="/auth/login"
                className="text-xs font-mono text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-3 py-1.5 rounded-lg hover:bg-[var(--bg-secondary)] transition-colors hidden sm:inline"
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
              className="bg-[var(--accent-gold)] hover:bg-[var(--accent-gold-hover)] text-white font-black px-3.5 py-2 rounded-md text-xs uppercase tracking-wider transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md flex items-center space-x-1.5 shrink-0"
            >
              <Bell className="w-3.5 h-3.5" />
              <span>Join Free</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-md text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Tier 3: Category Desk Navigation Ribbon */}
        <div className="hidden xl:block bg-[var(--bg-card)] border-b border-[var(--border-color)] px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs font-medium text-[var(--text-secondary)]">
            <nav className="flex items-center space-x-6 py-2">
              <Link href="/" className="hover:text-[var(--accent-gold)] transition-colors font-bold text-[var(--text-primary)]">
                Front Page
              </Link>
              <Link href="/topics/financial" className="hover:text-[var(--accent-emerald)] transition-colors">
                Royalties & Publishing
              </Link>
              <Link href="/topics/streaming" className="hover:text-[var(--accent-blue)] transition-colors">
                Streaming & DSPs
              </Link>
              <Link href="/topics/tech-ai" className="hover:text-[var(--accent-purple)] transition-colors">
                AI & Music Tech
              </Link>
              <Link href="/topics/marketing" className="hover:text-pink-600 transition-colors">
                Viral Growth
              </Link>
              <Link href="/topics/legal" className="hover:text-[var(--accent-gold)] transition-colors">
                Legal & Rights
              </Link>
              <Link href="/podcasts" className="hover:text-cyan-600 transition-colors">
                Podcasts
              </Link>
              <Link href="/tools" className="hover:text-[var(--accent-emerald)] transition-colors flex items-center space-x-1">
                <BarChart3 className="w-3.5 h-3.5 text-[var(--accent-emerald)]" />
                <span>Financial Lab</span>
              </Link>
              <Link href="/network" className="hover:text-[var(--accent-gold-hover)] transition-colors flex items-center space-x-1 text-[var(--accent-gold)] font-semibold">
                <Gift className="w-3.5 h-3.5" />
                <span>Partner Deals</span>
              </Link>
              <Link href="/chat" className="hover:text-[var(--accent-gold)] transition-colors flex items-center space-x-1 text-[var(--accent-gold)] font-semibold">
                <Bot className="w-3.5 h-3.5" />
                <span>AI Copilot</span>
              </Link>
            </nav>

            <Link
              href="/press-pass"
              className="flex items-center space-x-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] text-[11px] font-mono uppercase tracking-wider py-1"
            >
              <Ticket className="w-3.5 h-3.5 text-[var(--accent-gold)]" />
              <span>Press Pass Credentials</span>
            </Link>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[var(--bg-card)] border-b border-[var(--border-color)] px-4 pt-3 pb-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="space-y-1">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] px-3">
                Main Navigation
              </span>
              <nav className="flex flex-col space-y-1 text-sm font-medium text-[var(--text-secondary)]">
                <Link href="/" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-md hover:bg-[var(--bg-secondary)] text-[var(--text-primary)] font-bold">
                  Front Page (Live Feed)
                </Link>
                <Link href="/chat" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-md hover:bg-[var(--bg-secondary)] text-[var(--accent-gold)] font-bold flex items-center space-x-2">
                  <Bot className="w-4 h-4" />
                  <span>ADN Music Business AI Copilot</span>
                </Link>
                <Link href="/network" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-md hover:bg-[var(--bg-secondary)] text-[var(--accent-gold)] font-bold flex items-center space-x-2">
                  <Gift className="w-4 h-4" />
                  <span>Artispreneur Network & Partner Deals</span>
                </Link>
                <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-md hover:bg-[var(--bg-secondary)] text-[var(--accent-gold)] font-bold">
                  ⭐ VIP Pro Membership ($19/mo)
                </Link>
                <Link href="/tools" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-md hover:bg-[var(--bg-secondary)] flex items-center space-x-2">
                  <BarChart3 className="w-4 h-4 text-[var(--accent-emerald)]" />
                  <span>Royalty & Valuation Financial Lab</span>
                </Link>
                <Link href="/press-pass" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-md hover:bg-[var(--bg-secondary)] flex items-center space-x-2">
                  <Ticket className="w-4 h-4 text-[var(--accent-purple)]" />
                  <span>Official Press Pass Accreditation</span>
                </Link>
                <Link href="/podcasts" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-md hover:bg-[var(--bg-secondary)] flex items-center space-x-2">
                  <Radio className="w-4 h-4 text-cyan-600" />
                  <span>Podcasts & Masterclass Audio</span>
                </Link>
                <Link href="/newsletters" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-md hover:bg-[var(--bg-secondary)] flex items-center space-x-2">
                  <Newspaper className="w-4 h-4" />
                  <span>Daily Dispatch Newsletter Archive</span>
                </Link>
              </nav>
            </div>

            <div className="space-y-1 pt-2 border-t border-[var(--border-color)]">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] px-3">
                Channel Desks
              </span>
              <nav className="grid grid-cols-2 gap-1 text-xs font-mono text-[var(--text-secondary)]">
                <Link href="/topics/financial" onClick={() => setMobileMenuOpen(false)} className="px-3 py-1.5 rounded hover:bg-[var(--bg-secondary)]">💰 Royalties</Link>
                <Link href="/topics/streaming" onClick={() => setMobileMenuOpen(false)} className="px-3 py-1.5 rounded hover:bg-[var(--bg-secondary)]">📻 Streaming</Link>
                <Link href="/topics/tech-ai" onClick={() => setMobileMenuOpen(false)} className="px-3 py-1.5 rounded hover:bg-[var(--bg-secondary)]">🤖 AI & Tech</Link>
                <Link href="/topics/marketing" onClick={() => setMobileMenuOpen(false)} className="px-3 py-1.5 rounded hover:bg-[var(--bg-secondary)]">📈 Viral Growth</Link>
                <Link href="/topics/legal" onClick={() => setMobileMenuOpen(false)} className="px-3 py-1.5 rounded hover:bg-[var(--bg-secondary)]">⚖️ Legal</Link>
                <Link href="/topics/podcasts" onClick={() => setMobileMenuOpen(false)} className="px-3 py-1.5 rounded hover:bg-[var(--bg-secondary)]">🎙️ Podcasts</Link>
                <Link href="/topics/tutorials" onClick={() => setMobileMenuOpen(false)} className="px-3 py-1.5 rounded hover:bg-[var(--bg-secondary)]">🎓 Masterclasses</Link>
                <Link href="/topics/opportunities" onClick={() => setMobileMenuOpen(false)} className="px-3 py-1.5 rounded hover:bg-[var(--bg-secondary)]">🎟️ Grants</Link>
              </nav>
            </div>

            <div className="space-y-1 pt-2 border-t border-[var(--border-color)]">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] px-3">
                Account
              </span>
              <nav className="flex flex-col space-y-1 text-xs font-mono text-[var(--text-muted)]">
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="px-3 py-1.5 rounded hover:bg-[var(--bg-secondary)] flex items-center space-x-2"><User className="w-3.5 h-3.5" /><span>Creator Dashboard</span></Link>
                <Link href="/billing" onClick={() => setMobileMenuOpen(false)} className="px-3 py-1.5 rounded hover:bg-[var(--bg-secondary)]">Manage Billing</Link>
                <Link href="/advertise" onClick={() => setMobileMenuOpen(false)} className="px-3 py-1.5 rounded hover:bg-[var(--bg-secondary)]">Media Kit & Advertising</Link>
                <Link href="/admin/newsdesk" onClick={() => setMobileMenuOpen(false)} className="px-3 py-1.5 rounded hover:bg-[var(--bg-secondary)]">Newsroom Studio</Link>
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
