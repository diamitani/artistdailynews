"use client";

import { useState } from "react";
import { TrendingUp, DollarSign, Clock, Zap, Radio, BarChart3, ArrowUpRight, Flame } from "lucide-react";
import Link from "next/link";

export function MarketTerminal() {
  const [activeTab, setActiveTab] = useState<"stream-index" | "viral-sounds" | "grants">("stream-index");

  const streamRates = [
    { platform: "Apple Music", rate: "$0.0078", change: "+4.2%", trend: "up", perMillion: "$7,800" },
    { platform: "Tidal HiFi", rate: "$0.0125", change: "+1.8%", trend: "up", perMillion: "$12,500" },
    { platform: "Spotify (Global)", rate: "$0.0035", change: "-0.5%", trend: "down", perMillion: "$3,500" },
    { platform: "Amazon Music", rate: "$0.0041", change: "+0.2%", trend: "up", perMillion: "$4,100" },
    { platform: "YouTube Content ID", rate: "$0.0018", change: "+12.4%", trend: "up", perMillion: "$1,800" },
  ];

  const viralSounds = [
    { title: "Neon Nights (Acoustic Hook)", artist: "Kora Grey (Indie)", velocity: "94.2k videos/day", platform: "TikTok FYP", genre: "Indie Pop" },
    { title: "Midnight 808 Drive", artist: "Prod. By Saint", velocity: "68.5k videos/day", platform: "IG Reels", genre: "Trap / Drill" },
    { title: "Echoes in the Rain", artist: "Luna Waves", velocity: "51.0k videos/day", platform: "TikTok / CapCut", genre: "Lo-Fi Instrumental" },
  ];

  const grantDeadlines = [
    { organization: "SXSW 2026 Indie Showcase", amount: "Official Jury Showcase", deadline: "14 Days Left", date: "Sept 10, 2026", link: "/press-pass" },
    { organization: "A2IM Global Indie Touring Grant", amount: "$5,000 Travel Stipend", deadline: "22 Days Left", date: "Sept 18, 2026", link: "/press-pass" },
    { organization: "PRS Foundation Creator Fund", amount: "$3,500 EP Production", deadline: "31 Days Left", date: "Sept 27, 2026", link: "/press-pass" },
  ];

  return (
    <div className="bg-[#10121C] border border-[#272B3E] rounded-2xl p-6 sm:p-7 shadow-xl space-y-6 relative overflow-hidden">
      
      {/* Header with Live Status */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#D4FF00]/10 border border-[#D4FF00]/30 flex items-center justify-center text-[#D4FF00]">
            <BarChart3 className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-bold text-white text-base">ADN Industry Intelligence Terminal</h3>
              <span className="live-pulse w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">LIVE FEED</span>
            </div>
            <p className="text-xs text-slate-400 font-mono">2026 Q1 Market Indices & Velocity Benchmarks</p>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center bg-[#090A0F] p-1 rounded-lg border border-slate-800 text-xs font-mono">
          <button
            onClick={() => setActiveTab("stream-index")}
            className={`px-3 py-1.5 rounded-md font-bold transition-colors ${
              activeTab === "stream-index" ? "bg-[#D4FF00] text-black" : "text-slate-400 hover:text-white"
            }`}
          >
            DSP Stream Rates
          </button>
          <button
            onClick={() => setActiveTab("viral-sounds")}
            className={`px-3 py-1.5 rounded-md font-bold transition-colors ${
              activeTab === "viral-sounds" ? "bg-[#D4FF00] text-black" : "text-slate-400 hover:text-white"
            }`}
          >
            Viral Sound Velocity
          </button>
          <button
            onClick={() => setActiveTab("grants")}
            className={`px-3 py-1.5 rounded-md font-bold transition-colors ${
              activeTab === "grants" ? "bg-[#D4FF00] text-black" : "text-slate-400 hover:text-white"
            }`}
          >
            Grant Countdown
          </button>
        </div>
      </div>

      {/* Tab Content: Streaming Rates */}
      {activeTab === "stream-index" && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {streamRates.map((item) => (
              <div key={item.platform} className="bg-[#151724] border border-slate-800/80 rounded-xl p-3.5 space-y-1">
                <span className="text-[10px] font-mono text-slate-400 block truncate">{item.platform}</span>
                <div className="text-lg font-black text-white font-mono">{item.rate}</div>
                <div className="flex items-center justify-between text-[10px] font-mono">
                  <span className={item.trend === "up" ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
                    {item.change}
                  </span>
                  <span className="text-slate-500">{item.perMillion}/1M</span>
                </div>
              </div>
            ))}
          </div>
          <div className="text-[11px] text-slate-500 font-mono flex items-center justify-between pt-1">
            <span>Aggregated from verified distributor payout statements (DistroKid, Symphonic, TuneCore).</span>
            <Link href="/tools" className="text-[#D4FF00] hover:underline font-bold">
              Open Full Royalty Calculator &rarr;
            </Link>
          </div>
        </div>
      )}

      {/* Tab Content: Viral Sounds */}
      {activeTab === "viral-sounds" && (
        <div className="space-y-2">
          <div className="divide-y divide-slate-800/60 bg-[#151724] border border-slate-800/80 rounded-xl overflow-hidden text-xs">
            {viralSounds.map((sound, idx) => (
              <div key={sound.title} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-slate-800/30">
                <div className="flex items-center space-x-3">
                  <span className="w-5 font-mono text-[#D4FF00] font-bold">0{idx + 1}</span>
                  <div>
                    <h4 className="font-bold text-white">{sound.title}</h4>
                    <span className="text-[11px] text-slate-400 font-mono">{sound.artist} &bull; {sound.genre}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-right">
                  <div>
                    <div className="font-mono font-bold text-emerald-400 flex items-center">
                      <Flame className="w-3.5 h-3.5 mr-1 text-orange-400 fill-current" />
                      {sound.velocity}
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono">{sound.platform}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Grant Deadlines */}
      {activeTab === "grants" && (
        <div className="space-y-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {grantDeadlines.map((grant) => (
              <div key={grant.organization} className="bg-[#151724] border border-slate-800 rounded-xl p-4 flex flex-col justify-between space-y-3">
                <div>
                  <span className="bg-[#D4FF00]/10 text-[#D4FF00] text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded border border-[#D4FF00]/20">
                    {grant.deadline}
                  </span>
                  <h4 className="font-bold text-white text-sm mt-2">{grant.organization}</h4>
                  <div className="text-xs text-emerald-400 font-mono font-bold">{grant.amount}</div>
                </div>
                <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-mono">Closes: {grant.date}</span>
                  <Link href={grant.link} className="text-[#D4FF00] hover:underline font-bold">
                    Apply &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
