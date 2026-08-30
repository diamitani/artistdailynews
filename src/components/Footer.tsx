import Link from "next/link";
import { Ticket, Radio, Rss, ShieldCheck, Mail, ArrowUpRight, Gift, ExternalLink, Bot, BarChart3, Newspaper, Megaphone } from "lucide-react";
import { CATEGORIES } from "@/lib/feeds-config";
import { ArtispreneurLogo } from "./ArtispreneurLogo";

export function Footer() {
  return (
    <footer className="bg-[var(--bg-primary)] border-t border-[var(--border-color)] text-[var(--text-secondary)] text-xs">
      {/* Upper Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative flex items-center">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent-primary)] flex flex-col items-center justify-center text-white font-black shadow-sm group-hover:scale-105 transition-all">
                  <span className="text-[13px] tracking-wider leading-none font-mono font-black">ADN</span>
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[var(--bg-card)] border border-[var(--border-color)] p-0.5 shadow-sm overflow-hidden flex items-center justify-center">
                  <img src="/artispreneur-logo.png" alt="Artispreneur" className="w-full h-full object-contain" />
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg text-[var(--text-primary)] tracking-tight">
                  ARTIST DAILY <span className="text-[var(--accent-primary)]">NEWS</span>
                </span>
                <span className="text-[9px] font-mono tracking-widest text-[var(--text-muted)] uppercase">
                  Powered by <strong className="text-[var(--accent-primary)]">Artispreneur</strong>
                </span>
              </div>
            </Link>

            <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-sm">
              The premier intelligence platform for independent musicians, managers, and indie labels worldwide. Aggregating 50+ music industry feeds with autonomous AI synthesis.
            </p>

            <div className="p-3.5 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)] flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-full bg-white p-0.5 border border-[var(--border-color)] flex items-center justify-center shrink-0">
                  <img src="/artispreneur-logo.png" alt="Artispreneur" className="w-full h-full object-contain" />
                </div>
                <div>
                  <div className="text-[11px] font-bold text-[var(--text-primary)]">Powered by Artispreneur.com</div>
                  <div className="text-[9px] font-mono text-[var(--text-muted)]">The Music Business Operating System</div>
                </div>
              </div>
              <a
                href="https://artispreneur.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--accent-primary)] hover:underline font-mono text-[10px] font-bold flex items-center"
              >
                <span>Artispreneur.com</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            </div>

            <div className="flex items-center space-x-3 text-[11px] font-mono text-[var(--text-muted)] pt-1">
              <span className="flex items-center text-[var(--text-secondary)]">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-400" /> Verified Press Entity
              </span>
              <span>&bull;</span>
              <span className="text-[var(--text-secondary)]">ISSN Registered</span>
            </div>
          </div>

          {/* Col 2: Channel Desks */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[var(--text-primary)] font-bold">Channel Desks</h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/topics/${cat.slug}`} className="hover:text-[#E2B547] transition-colors">{cat.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Creator Ecosystem */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[var(--text-primary)] font-bold">Creator Ecosystem</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/network" className="hover:text-[#E2B547] transition-colors text-[#E2B547] font-bold flex items-center space-x-1.5"><Gift className="w-3.5 h-3.5" /><span>Partner Deals</span></Link></li>
              <li><Link href="/tools" className="hover:text-emerald-300 transition-colors text-emerald-400 flex items-center space-x-1.5"><BarChart3 className="w-3.5 h-3.5" /><span>Financial Lab</span></Link></li>
              <li><Link href="/chat" className="hover:text-[#E2B547] transition-colors text-[#E2B547] flex items-center space-x-1.5"><Bot className="w-3.5 h-3.5" /><span>AI Copilot</span></Link></li>
              <li><Link href="/podcasts" className="hover:text-cyan-300 transition-colors text-cyan-400 flex items-center space-x-1.5"><Radio className="w-3.5 h-3.5" /><span>Podcasts</span></Link></li>
              <li><Link href="/newsletters" className="hover:text-slate-200 transition-colors"><span>Newsletter Archives</span></Link></li>
              <li><Link href="/press-pass" className="hover:text-[#E2B547] transition-colors"><span>Press Credentials</span></Link></li>
              <li><Link href="/pricing" className="hover:text-[#E2B547] transition-colors">VIP Membership</Link></li>
              <li><Link href="/dashboard" className="hover:text-[#E2B547] transition-colors">Creator Dashboard</Link></li>
            </ul>
          </div>

          {/* Col 4: Monetization */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-[var(--text-primary)] font-bold">Monetization & Press</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/advertise" className="hover:text-[#E2B547] transition-colors">Media Kit & Rate Card</Link></li>
              <li><Link href="/advertise#sponsor-packages" className="hover:text-[#E2B547] transition-colors">Newsletter Sponsorships</Link></li>
              <li><Link href="/billing" className="hover:text-[#E2B547] transition-colors">Subscription Portal</Link></li>
              <li><Link href="/admin/newsdesk" className="hover:text-[#E2B547] transition-colors">Newsroom Studio</Link></li>
              <li><a href="/ads.txt" target="_blank" className="hover:text-[#E2B547] transition-colors font-mono text-[11px]">Google Ads.txt</a></li>
              <li><a href="/api/news/feed?format=rss" target="_blank" className="hover:text-[#E2B547] transition-colors flex items-center space-x-1"><Rss className="w-3 h-3 text-orange-400" /><span>RSS Feed</span></a></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[var(--border-subtle)] py-6 text-[var(--text-muted)] text-[11px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            &copy; {new Date().getFullYear()} ArtistDailyNews.com &bull; Powered by <a href="https://artispreneur.com" target="_blank" rel="noopener noreferrer" className="text-[#E2B547] hover:underline font-bold">Artispreneur.com</a>. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/" className="hover:text-slate-300">Home</Link>
            <Link href="/network" className="hover:text-[#E2B547]">Partner Deals</Link>
            <Link href="/podcasts" className="hover:text-cyan-300">Podcasts</Link>
            <Link href="/press-pass" className="hover:text-slate-300">Press Pass</Link>
            <Link href="/advertise" className="hover:text-slate-300">Advertise</Link>
            <Link href="/pricing" className="hover:text-slate-300">VIP Pro</Link>
            <span className="font-mono text-[var(--text-muted)]">v2.0.0-ARTISPRENEUR</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
