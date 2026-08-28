import Link from "next/link";
import { Ticket, Radio, Rss, ShieldCheck, Mail, ArrowUpRight, Gift, ExternalLink, Bot, BarChart3, Newspaper, Megaphone } from "lucide-react";
import { CATEGORIES } from "@/lib/feeds-config";
import { ArtispreneurLogo } from "./ArtispreneurLogo";

export function Footer() {
  return (
    <footer className="bg-[#07080C] border-t border-[#1F2230] text-slate-400 text-xs">
      {/* Upper Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Col 1: Brand & Credo (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-900 border border-amber-500/40 p-0.5 flex items-center justify-center shrink-0 shadow">
                <img src="/artispreneur-logo.png" alt="Artispreneur" className="w-full h-full object-contain" />
              </div>
              <span className="font-black text-lg text-white tracking-tight">
                ARTIST DAILY <span className="text-[#D4FF00]">NEWS</span>
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The premier intelligence and media platform for independent musicians, managers, and indie labels worldwide. Aggregating 50+ music industry feeds with autonomous AI synthesis.
            </p>

            <div className="p-3.5 bg-[#0F1018] rounded-xl border border-amber-500/20 flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <img src="/artispreneur-logo.png" alt="" className="w-6 h-6 object-contain shrink-0" />
                <div>
                  <div className="text-[11px] font-bold text-white">An Artispreneur Media Property</div>
                  <div className="text-[9px] font-mono text-slate-400">Independent Artist Entrepreneurship Hub</div>
                </div>
              </div>
              <a
                href="https://artispreneur.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#D4FF00] hover:underline font-mono text-[10px] font-bold flex items-center"
              >
                <span>Artispreneur.com</span>
                <ExternalLink className="w-3 h-3 ml-0.5" />
              </a>
            </div>

            <div className="flex items-center space-x-3 text-[11px] font-mono text-slate-500 pt-1">
              <span className="flex items-center text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-400" /> Verified Press Entity
              </span>
              <span>&bull;</span>
              <span className="text-slate-400">ISSN Registered</span>
            </div>
          </div>

          {/* Col 2: Topics / Desks */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold">
              Channel Desks
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <Link href={`/topics/${cat.slug}`} className="hover:text-[#D4FF00] transition-colors flex items-center justify-between">
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Resources & Tools */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold">
              Creator Ecosystem
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/network" className="hover:text-amber-300 transition-colors text-amber-400 font-bold flex items-center space-x-1.5">
                  <Gift className="w-3.5 h-3.5" />
                  <span>Artispreneur Partner Deals</span>
                </Link>
              </li>
              <li>
                <Link href="/tools" className="hover:text-emerald-300 transition-colors text-emerald-400 flex items-center space-x-1.5">
                  <BarChart3 className="w-3.5 h-3.5" />
                  <span>Royalty & Stream Calculators</span>
                </Link>
              </li>
              <li>
                <Link href="/chat" className="hover:text-[#D4FF00] transition-colors text-[#D4FF00] flex items-center space-x-1.5">
                  <Bot className="w-3.5 h-3.5" />
                  <span>AI Music Business Copilot</span>
                </Link>
              </li>
              <li>
                <Link href="/podcasts" className="hover:text-cyan-300 transition-colors text-cyan-400 flex items-center space-x-1.5">
                  <Radio className="w-3.5 h-3.5" />
                  <span>Podcasts & Audio Hub</span>
                </Link>
              </li>
              <li>
                <Link href="/newsletters" className="hover:text-slate-200 transition-colors flex items-center space-x-1.5">
                  <Newspaper className="w-3.5 h-3.5 text-slate-400" />
                  <span>Daily Dispatch Archives</span>
                </Link>
              </li>
              <li>
                <Link href="/press-pass" className="hover:text-[#D4FF00] transition-colors flex items-center space-x-1.5">
                  <Ticket className="w-3.5 h-3.5 text-purple-400" />
                  <span>Press Pass Accreditation</span>
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#D4FF00] transition-colors">
                  VIP Membership Plans
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[#D4FF00] transition-colors">
                  Creator Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Advertising & Press */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white font-bold">
              Monetization & Press
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/advertise" className="hover:text-[#D4FF00] transition-colors">
                  Media Kit & Rate Card
                </Link>
              </li>
              <li>
                <Link href="/advertise#sponsor-packages" className="hover:text-[#D4FF00] transition-colors">
                  Newsletter Sponsorships
                </Link>
              </li>
              <li>
                <Link href="/billing" className="hover:text-[#D4FF00] transition-colors">
                  Subscription & Invoices Portal
                </Link>
              </li>
              <li>
                <Link href="/admin/newsdesk" className="hover:text-[#D4FF00] transition-colors">
                  Newsroom Command Studio
                </Link>
              </li>
              <li>
                <a href="/ads.txt" target="_blank" className="hover:text-[#D4FF00] transition-colors font-mono text-[11px]">
                  Google Ads.txt
                </a>
              </li>
              <li>
                <a href="/api/news/feed?format=rss" target="_blank" className="hover:text-[#D4FF00] transition-colors flex items-center space-x-1">
                  <Rss className="w-3 h-3 text-orange-400" />
                  <span>Master RSS Feed</span>
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#181B26] py-6 text-slate-500 text-[11px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            &copy; {new Date().getFullYear()} ArtistDailyNews.com &bull; Powered by <a href="https://artispreneur.com" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:underline font-bold">Artispreneur.com</a>. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href="/" className="hover:text-slate-300">Home</Link>
            <Link href="/network" className="hover:text-amber-300">Partner Deals</Link>
            <Link href="/podcasts" className="hover:text-cyan-300">Podcasts</Link>
            <Link href="/newsletters" className="hover:text-slate-300">Newsletter</Link>
            <Link href="/press-pass" className="hover:text-slate-300">Press Accreditation</Link>
            <Link href="/advertise" className="hover:text-slate-300">Advertise</Link>
            <Link href="/pricing" className="hover:text-slate-300">VIP Pro</Link>
            <Link href="/admin/newsdesk" className="hover:text-slate-300">Newsdesk</Link>
            <span className="font-mono text-slate-600">v1.2.0-ARTISPRENEUR</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
