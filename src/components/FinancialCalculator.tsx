"use client";

import { useState } from "react";
import { DollarSign, TrendingUp, Calculator, Sparkles, HelpCircle, Layers } from "lucide-react";

export function FinancialCalculator() {
  const [activeTab, setActiveTab] = useState<"stream-payout" | "catalogue-valuation">("stream-payout");

  // Stream Calculator States
  const [streams, setStreams] = useState<number>(250000);
  const [dsp, setDsp] = useState<"spotify" | "apple" | "tidal" | "youtube">("spotify");
  const [masterShare, setMasterShare] = useState<number>(100); // 100% indie
  const [publisherShare, setPublisherShare] = useState<number>(100);

  // Catalogue Valuation States
  const [annualNetIncome, setAnnualNetIncome] = useState<number>(45000);
  const [growthRate, setGrowthRate] = useState<"declining" | "stable" | "growing">("growing");
  const [syncHistory, setSyncHistory] = useState<boolean>(true);
  const [rightsControl, setRightsControl] = useState<"master-only" | "publishing-only" | "both">("both");

  // Rates per stream (2026 average blended)
  const dspRates: Record<string, { name: string; rate: number; perThousand: string }> = {
    spotify: { name: "Spotify (Global Blended)", rate: 0.0035, perThousand: "$3.50" },
    apple: { name: "Apple Music", rate: 0.0078, perThousand: "$7.80" },
    tidal: { name: "Tidal", rate: 0.0125, perThousand: "$12.50" },
    youtube: { name: "YouTube Content ID", rate: 0.0018, perThousand: "$1.80" },
  };

  // Stream payout calculation
  const grossStreamingEarnings = streams * dspRates[dsp].rate;
  const masterEarnings = grossStreamingEarnings * 0.82 * (masterShare / 100);
  const publishingEarnings = grossStreamingEarnings * 0.18 * (publisherShare / 100);
  const totalNetEarnings = masterEarnings + publishingEarnings;

  // Catalogue Valuation Multiplier
  let baseMultiple = 12.0;
  if (growthRate === "declining") baseMultiple = 8.5;
  if (growthRate === "growing") baseMultiple = 16.0;

  if (syncHistory) baseMultiple += 2.0;
  if (rightsControl === "both") baseMultiple += 2.5;

  const lowValuation = annualNetIncome * (baseMultiple - 1.5);
  const midValuation = annualNetIncome * baseMultiple;
  const highValuation = annualNetIncome * (baseMultiple + 2.5);

  return (
    <div className="bg-[#12141F] border border-[#272A38] rounded-2xl p-6 sm:p-8 space-y-8 shadow-xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-[#D4FF00] text-xs font-mono font-bold uppercase tracking-wider">
            <Calculator className="w-4 h-4" />
            <span>ADN Independent Financial Lab</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            Music Business & Rights Calculators
          </h2>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-[#090A0F] p-1 rounded-lg border border-slate-800">
          <button
            onClick={() => setActiveTab("stream-payout")}
            className={`px-3.5 py-1.5 rounded-md text-xs font-mono font-bold transition-all ${
              activeTab === "stream-payout"
                ? "bg-[#D4FF00] text-black shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Streaming Payouts
          </button>
          <button
            onClick={() => setActiveTab("catalogue-valuation")}
            className={`px-3.5 py-1.5 rounded-md text-xs font-mono font-bold transition-all ${
              activeTab === "catalogue-valuation"
                ? "bg-[#D4FF00] text-black shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Catalogue Valuation (NPS)
          </button>
        </div>
      </div>

      {/* Calculator Body */}
      {activeTab === "stream-payout" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <label className="text-slate-300 font-bold">Estimated Total Streams</label>
                <span className="text-[#D4FF00] font-black text-base">{streams.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="10000"
                max="10000000"
                step="10000"
                value={streams}
                onChange={(e) => setStreams(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#D4FF00]"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>10k</span>
                <span>1 Million</span>
                <span>10 Million</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1.5">Platform</label>
                <select
                  value={dsp}
                  onChange={(e) => setDsp(e.target.value as any)}
                  className="w-full bg-[#0A0B10] border border-slate-700 text-xs text-white rounded-lg p-2.5 focus:border-[#D4FF00] focus:outline-none"
                >
                  <option value="spotify">Spotify (~$0.0035/stream)</option>
                  <option value="apple">Apple Music (~$0.0078/stream)</option>
                  <option value="tidal">Tidal (~$0.0125/stream)</option>
                  <option value="youtube">YouTube (~$0.0018/stream)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1.5">Your Master Ownership %</label>
                <select
                  value={masterShare}
                  onChange={(e) => setMasterShare(Number(e.target.value))}
                  className="w-full bg-[#0A0B10] border border-slate-700 text-xs text-white rounded-lg p-2.5 focus:border-[#D4FF00] focus:outline-none"
                >
                  <option value={100}>100% (Independent / Self-Released)</option>
                  <option value={80}>80% (Indie Label / Distro Split)</option>
                  <option value={50}>50% (50/50 Joint Venture)</option>
                  <option value={18}>18% (Traditional Major Label Deal)</option>
                </select>
              </div>
            </div>

            <div className="p-4 bg-[#0A0B10] rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1">
              <span className="text-[#D4FF00] font-mono font-bold block">💡 Streaming Royalty Formula:</span>
              <p>
                DSPs pay ~70% of gross revenue to rights holders: ~82% allocated to Master Recording and ~18% allocated to Composition/Publishing (Mechanicals + Performance).
              </p>
            </div>
          </div>

          {/* Results Summary (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#161826] to-[#0A0B10] border border-[#2D3145] rounded-xl p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 block">
                NET ESTIMATED ARTIST PAYOUT
              </span>
              <div className="text-3xl sm:text-4xl font-black text-[#D4FF00]">
                ${totalNetEarnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-xs text-slate-400">
                Gross generated by {streams.toLocaleString()} {dspRates[dsp].name} streams: <strong>${grossStreamingEarnings.toFixed(2)}</strong>
              </p>

              <div className="divide-y divide-slate-800 text-xs pt-2 space-y-2">
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400">Master Royalties ({masterShare}%):</span>
                  <span className="font-mono text-white font-bold">${masterEarnings.toFixed(2)}</span>
                </div>
                <div className="flex justify-between pt-2">
                  <span className="text-slate-400">Publishing / Mechanicals ({publisherShare}%):</span>
                  <span className="font-mono text-white font-bold">${publishingEarnings.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 font-mono">
              Calculated using 2026 Q1 industry standard weighted pro-rata distributions.
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-2">
                <label className="text-slate-300 font-bold">Annual Net Publisher's Share / Master Profit (NPS)</label>
                <span className="text-emerald-400 font-black text-base">${annualNetIncome.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="5000"
                max="500000"
                step="5000"
                value={annualNetIncome}
                onChange={(e) => setAnnualNetIncome(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-400"
              />
              <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                <span>$5k/yr</span>
                <span>$100k/yr</span>
                <span>$500k/yr</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1.5">Historical Stream Trend</label>
                <select
                  value={growthRate}
                  onChange={(e) => setGrowthRate(e.target.value as any)}
                  className="w-full bg-[#0A0B10] border border-slate-700 text-xs text-white rounded-lg p-2.5 focus:border-emerald-400 focus:outline-none"
                >
                  <option value="growing">Growing / Viral (+15% YoY)</option>
                  <option value="stable">Stable / Evergreen (Flat YoY)</option>
                  <option value="declining">Decaying / Past Peak (-10% YoY)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-mono text-slate-400 block mb-1.5">Rights Controlled</label>
                <select
                  value={rightsControl}
                  onChange={(e) => setRightsControl(e.target.value as any)}
                  className="w-full bg-[#0A0B10] border border-slate-700 text-xs text-white rounded-lg p-2.5 focus:border-emerald-400 focus:outline-none"
                >
                  <option value="both">Both Master & Publishing (100%)</option>
                  <option value="master-only">Master Sound Recordings Only</option>
                  <option value="publishing-only">Publishing & Composition Only</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 bg-[#0A0B10] rounded-xl border border-slate-800">
              <input
                type="checkbox"
                id="sync-check"
                checked={syncHistory}
                onChange={(e) => setSyncHistory(e.target.checked)}
                className="w-4 h-4 rounded accent-emerald-400 cursor-pointer"
              />
              <label htmlFor="sync-check" className="text-xs text-slate-300 cursor-pointer">
                Track record of TV / Film / Gaming sync placements (+2.0x multiple premium)
              </label>
            </div>
          </div>

          {/* Results Summary (5 cols) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#121F17] to-[#0A0B10] border border-emerald-500/30 rounded-xl p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 block">
                ESTIMATED CATALOGUE MARKET VALUE
              </span>
              <div className="text-3xl sm:text-4xl font-black text-white">
                ${midValuation.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </div>
              <p className="text-xs text-emerald-200">
                Implied Valuation Multiple: <strong>{baseMultiple.toFixed(1)}x NPS</strong>
              </p>

              <div className="bg-[#080D0A] p-3 rounded-lg border border-emerald-900/50 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-400">
                  <span>Conservative (Liquidity Floor):</span>
                  <span className="text-white font-mono font-bold">${lowValuation.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
                <div className="flex justify-between text-slate-400">
                  <span>Aggressive (Private Equity Bid):</span>
                  <span className="text-emerald-400 font-mono font-bold">${highValuation.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-emerald-950 text-[11px] text-slate-500 font-mono">
              Based on trailing multiples published by Hipgnosis, Round Hill, and Chord Music.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
