"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, Newspaper, Sparkles, User, TrendingUp, Gift, Mic2, ChevronDown, Layers, Tv, Radio, Database } from "lucide-react";
import { CommandMenu } from "./CommandMenu";
import { useAuth } from "./AuthContext";

interface HeaderProps {
  onSearchOpen?: () => void;
  onSubscribeClick?: () => void;
}

const SECTIONS = [
  { href: "/topics/financial", label: "Business", icon: TrendingUp, color: "#047857" },
  { href: "/topics/streaming", label: "Culture", icon: Mic2, color: "#C0272D" },
  { href: "/#news-by-platform", label: "By Platform", icon: Layers, color: "#2563EB" },
  { href: "/resources", label: "Top 100 Resources & Sheets", icon: Database, color: "#00E599" },
  { href: "/library", label: "27+ Channels & Videos", icon: Tv, color: "#7C3AED" },
];

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  highlight?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { href: "/news", label: "Today", icon: Newspaper },
  { href: "/resources", label: "Data Sheets", icon: Database },
];

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
        {/* Top Utility Bar */}
        <div className="border-b border-[var(--border-color)] text-[11px] text-[var(--text-muted)] bg-[var(--bg-secondary)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between">
            <div className="flex items-center space-x-3 truncate">
              <div className="flex items-center space-x-1.5 font-bold text-[var(--accent-primary)]">
                <span className="live-pulse w-2 h-2 rounded-full bg-[var(--accent-primary)]"></span>
                <span className="tracking-widest uppercase text-[10px]">LIVE</span>
              </div>
              <span className="text-[var(--border-highlight)] hidden sm:inline">|</span>
              <span className="font-mono text-[var(--text-secondary)] hidden md:inline">
                {currentDateStr || "Today's Edition"}
              </span>
            </div>
            <div className="flex items-center space-x-4 shrink-0">
              <div className="hidden xl:flex items-center space-x-2 font-mono text-[10px] bg-[var(--bg-primary)] px-2 py-0.5 rounded border border-[var(--border-color)]">
                <span className="text-[var(--text-muted)]">WIRE:</span>
                <span className="text-[var(--accent-primary)] font-bold">50+ Feeds Synced</span>
                <span className="text-[var(--border-highlight)]">|</span>
                <span className="text-[var(--accent-emerald)] font-bold">Continuous Aggregation</span>
              </div>
              <Link href="/network" className="flex items-center space-x-1.5 text-[var(--color-gold)] hover:text-[var(--color-gold-hover)] transition-colors">
                <Gift className="w-3.5 h-3.5" />
                <span className="font-bold hidden sm:inline">Partner Deals</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Main Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 group shrink-0">
              <div className="relative flex items-center">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-primary)] flex flex-col items-center justify-center text-white font-black shadow-sm group-hover:shadow-md group-hover:scale-105 transition-all">
                  <span className="text-[13px] tracking-wider leading-none font-mono font-black">ADN</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] p-0.5 shadow-sm overflow-hidden flex items-center justify-center">
                  <img src="/artispreneur-logo.png" alt="Artispreneur" className="w-full h-full object-contain" />
                </div>
              </div>

              <div className="flex flex-col">
                <span className="font-black text-lg tracking-tight leading-none text-[var(--text-primary)]">
                  ARTIST DAILY <span className="text-[var(--accent-primary)]">NEWS</span>
                </span>
                <span className="text-[9px] font-mono tracking-wider text-[var(--text-muted)] uppercase">
                  Powered by <span className="font-bold text-[var(--accent-primary)]">ARTISPRENEUR</span>
                </span>
              </div>
            </Link>

            {/* Section Navigation (Desktop) */}
            <nav className="hidden lg:flex items-center space-x-1 border-l border-[var(--border-color)] pl-6 ml-6">
              {SECTIONS.map((section) => (
                <Link
                  key={section.href}
                  href={section.href}
                  className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-colors hover:bg-[var(--bg-secondary)]"
                  style={{ color: section.color }}
                >
                  <section.icon className="w-4 h-4" />
                  <span>{section.label}</span>
                </Link>
              ))}
            </nav>

            {/* Main Navigation (Desktop) */}
            <nav className="hidden md:flex items-center space-x-1 ml-auto mr-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    item.highlight
                      ? "bg-[var(--accent-primary-subtle)] text-[var(--accent-primary)] hover:bg-[var(--accent-primary-light)]"
                      : "text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCommandMenuOpen(true)}
                className="hidden sm:flex items-center space-x-2 text-sm text-[var(--text-muted)] bg-[var(--bg-secondary)] hover:bg-[var(--border-color)] px-3 py-1.5 rounded-lg border border-[var(--border-color)] transition-colors"
              >
                <Search className="w-4 h-4" />
                <span className="text-xs hidden lg:inline">Search</span>
                <kbd className="hidden lg:inline-flex h-5 items-center rounded border border-[var(--border-highlight)] bg-[var(--bg-primary)] px-1.5 font-mono text-[10px] text-[var(--text-muted)]">⌘K</kbd>
              </button>

              {user && (
                <Link href="/dashboard" className="flex items-center space-x-2 bg-[var(--bg-secondary)] hover:bg-[var(--border-color)] text-[var(--text-primary)] px-3 py-1.5 rounded-lg border border-[var(--border-color)] transition-colors">
                  <div className="w-6 h-6 rounded-full bg-[var(--accent-primary)] flex items-center justify-center text-white text-xs font-bold">
                    {user.name?.[0] || "U"}
                  </div>
                  <span className="text-sm font-medium hidden sm:inline">Dashboard</span>
                </Link>
              )}

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[var(--border-color)] bg-[var(--bg-card)] max-h-[80vh] overflow-y-auto">
            <div className="px-4 py-4 space-y-4">
              {/* Sections */}
              <div className="space-y-1">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] px-3">Sections</span>
                <nav className="flex flex-col space-y-1">
                  {SECTIONS.map((section) => (
                    <Link
                      key={section.href}
                      href={section.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="px-3 py-2 rounded-md hover:bg-[var(--bg-secondary)] flex items-center space-x-2"
                      style={{ color: section.color }}
                    >
                      <section.icon className="w-4 h-4" />
                      <span className="font-semibold">{section.label}</span>
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Navigation */}
              <div className="space-y-1 pt-2 border-t border-[var(--border-color)]">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] px-3">Navigation</span>
                <nav className="flex flex-col space-y-1">
                  {NAV_ITEMS.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`px-3 py-2 rounded-md flex items-center space-x-2 ${
                        item.highlight
                          ? "bg-[var(--accent-primary-subtle)] text-[var(--accent-primary)]"
                          : "hover:bg-[var(--bg-secondary)] text-[var(--text-primary)]"
                      }`}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Account */}
              <div className="space-y-1 pt-2 border-t border-[var(--border-color)]">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[var(--text-muted)] px-3">Account</span>
                <nav className="flex flex-col space-y-1">
                  <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded hover:bg-[var(--bg-secondary)] flex items-center space-x-2 text-[var(--text-secondary)]">
                    <User className="w-4 h-4" />
                    <span>Dashboard</span>
                  </Link>
                  <Link href="/network" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded hover:bg-[var(--bg-secondary)] flex items-center space-x-2 text-[var(--text-secondary)]">
                    <Gift className="w-4 h-4" />
                    <span>Partner Deals</span>
                  </Link>
                  <Link href="/podcasts" onClick={() => setMobileMenuOpen(false)} className="px-3 py-2 rounded hover:bg-[var(--bg-secondary)] flex items-center space-x-2 text-[var(--text-secondary)]">
                    <Tv className="w-4 h-4" />
                    <span>Audio & Video</span>
                  </Link>
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
