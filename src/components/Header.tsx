"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Radio, Menu, X, Ticket, BarChart3, Newspaper, Sparkles, Bot, User, ExternalLink, TrendingUp, Gift } from "lucide-react";
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
      weekday: "long", month: "short", day: "numeric", year: "numeric",
    }).format(new Date());
    setCurrentDateStr(formatted);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[var(--bg-card)]/95 backdrop-blur-md border-b border-[var(--border-color)]">
        {/* Edition Bar */}
        <div className="border-b border-[var(--border-color)] text-[11px] text-[var(--text-muted)] bg-[var(--bg-secondary)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between">
            <div className="flex items-center space-x-3 truncate">
              <div className="flex items-center space-x-1.5 font-bold text-[var(--accent-primary)]">
                <span className="live-pulse w-2 h-2 rounded-full bg-[var(--accent-primary)]"></span>
                <span className="tracking-widest uppercase text-[10px]">LIVE NEWSDESK</span>
              </div>
              <span className="text-[var(--border-highlight)] hidden sm:inline">|</span>
              <span className="font-mono text-[var(--text-secondary)] hidden md:inline">
                VOL. IV, NO. 241 &bull; {currentDateStr || "Today's Edition"}
              </span>
            </div>
            <div className="flex items-center space-x-3 shrink-0">
              <div className="hidden xl:flex items-center space-x-2 font-mono text-[10px] bg-[var(--bg-primary)] px-2 py-0.5 rounded border border-[var(--border-color)]">
                <span className="text-[var(--text-muted)]">DSP:</span>
                <span className="text-[var(--accent-emerald)] font-bold">Apple $0.0078 ▲</span>
                <span className="text-[var(--border-highlight)]">|</span>
                <span className="text-[var(--accent-primary)] font-bold">Spotify $0.0035 ▼</span>
              </div>
              <Link href="/network" className="flex items-center space-x-1.5 text-[var(--accent-primary)] hover:text-[var(--accent-primary-hover)] transition-colors">
                <Gift className="w-3.5 h-3.5" />
                <span className="font-bold hidden sm:inline">Deals</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="w-9 h-9 rounded-lg bg-[var(--accent-primary)] flex items-center justify-center text-white font-black text-lg shadow-sm group-hover:shadow-md transition-shadow">
                A
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg tracking-tight leading-none text-[var(--text-primary)]">
                  ARTIS<span className="text-[var(--accent-primary)]">PRENEUR</span>
                </span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-[var(--text-muted)]">Artist Daily News</span>
              </div>
            </Link>

            <nav className="hidden md:flex items-center space-x-1">
              {[
                { href: "/news", label: "Today", icon: Newspaper },
                { href: "/topics/financial", label: "Royalties", icon: TrendingUp },
                { href: "/podcasts", label: "Podcasts", icon: Radio },
                { href: "/tools", label: "Tools", icon: BarChart3 },
                { href: "/chat", label: "AI Copilot", icon: Bot, highlight: true },
              ].map((item) => (
                <Link key={item.href} href={item.href} className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${item.highlight ? "bg-[var(--accent-primary-subtle)] text-[var(--accent-primary)] hover:bg-[var(--accent-primary-light)]" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"}`}>
                  <item.icon className="w-4 h-4" /><span>{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="flex items-center space-x-2">
              <button onClick={() => setCommandMenuOpen(true)} className="hidden sm:flex items-center space-x-2 text-sm text-[var(--text-muted)] bg-[var(--bg-secondary)] hover:bg-[var(--border-color)] px-3 py-1.5 rounded-lg border border-[var(--border-color)] transition-colors">
                <Search className="w-4 h-4" /><span className="text-xs">Search</span>
                <kbd className="hidden lg:inline-flex h-5 items-center rounded border border-[var(--border-highlight)] bg-[var(--bg-primary)] px-1.5 font-mono text-[10px] text-[var(--text-muted)]">⌘K</kbd>
              </button>

              {user ? (
                <Link href="/dashboard" className="flex items-center space-x-2 bg-[var(--bg-secondary)] hover:bg-[var(--border-color)] text-[var(--text-primary)] px-3 py-1.5 rounded-lg border border-[var(--border-color)] transition-colors">
                  <div className="w-6 h-6 rounded-full bg-[var(--accent-primary)] flex items-center justify-center text-white text-xs font-bold">{user.name?.[0] || "U"}</div>
                  <span className="text-sm font-medium hidden sm:inline">Dashboard</span>
                </Link>
              ) : (
                <Link href="/pricing" className="flex items-center space-x-1.5 bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-white px-4 py-2 rounded-lg font-semibold text-sm shadow-sm hover:shadow-md transition-all">
                  <Sparkles className="w-4 h-4" /><span>Subscribe</span>
                </Link>
              )}

              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-lg transition-colors">
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[var(--border-color)] bg-[var(--bg-card)] max-h-[70vh] overflow-y-auto">
            <div className="px-4 py-4 space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] px-3">Navigation</span>
                <nav className="flex flex-col space-y-1">
                  <Link href="/news" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-md hover:bg-[var(--bg-secondary)] flex items-center space-x-2 text-[var(--text-primary)]"><Newspaper className="w-4 h-4" /><span>Today's Briefing</span></Link>
                  <Link href="/chat" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-md bg-[var(--accent-primary-subtle)] text-[var(--accent-primary)] flex items-center space-x-2"><Bot className="w-4 h-4" /><span>AI Copilot</span></Link>
                  <Link href="/tools" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-md hover:bg-[var(--bg-secondary)] flex items-center space-x-2 text-[var(--text-primary)]"><BarChart3 className="w-4 h-4" /><span>Tools</span></Link>
                  <Link href="/podcasts" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded-md hover:bg-[var(--bg-secondary)] flex items-center space-x-2 text-[var(--text-primary)]"><Radio className="w-4 h-4" /><span>Podcasts</span></Link>
                </nav>
              </div>
              <div className="space-y-1 pt-2 border-t border-[var(--border-color)]">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] px-3">Account</span>
                <nav className="flex flex-col space-y-1 text-xs">
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="px-3 py-1.5 rounded hover:bg-[var(--bg-secondary)] flex items-center space-x-2 text-[var(--text-secondary)]"><User className="w-3.5 h-3.5" /><span>Dashboard</span></Link>
                  <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="px-3 py-1.5 rounded hover:bg-[var(--bg-secondary)] text-[var(--text-secondary)]">Upgrade</Link>
                </nav>
              </div>
            </div>
          </div>
        )}
      </header>
      <CommandMenu isOpen={commandMenuOpen} onClose={() => setCommandMenuOpen(false)} />
    </>
  );
}
