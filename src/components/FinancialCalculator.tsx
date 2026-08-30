"use client";

import { useState } from "react";
import { DollarSign, TrendingUp, Calculator, Sparkles, HelpCircle, Layers } from "lucide-react";

export function FinancialCalculator() {
  const [activeTab, setActiveTab] = useState<"stream-payout" | "catalogue-valuation">("stream-payout");

  // Stream Calculator States
  const [streams, setStreams] = useState<number>(250000);
  const [dsp, setDsp] = useState<"spotify" | "apple" | "tidal" | "youtube">("spotify");
  const [masterShare, setMasterShare] = useState<number>(100);
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
    <div className="card-brand p-6 sm:p-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-5">
        <div>
          <div className="flex items-center space-x-2 text-[var(--accent-primary)] text-xs font-mono font-bold uppercase tracking-wider">
            <Calculator className="w-4 h-4" />
            <span>ADN Independent Financial Lab</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] mt-1">
            Music Business & Rights Calculators
          </h2>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-[var(--bg-secondary)] p-1 rounded-lg border border-[var(--border-color)]">
          <button
            onClick={() => setActiveTab("stream-payout")}
            className={`px-3.5 py-1.5 rounded-md text-xs font-mono font-bold transition-all ${
              activeTab === "stream-payout"
                ? "bg-[var(--accent-primary)] text-white shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Streaming Royalties
          </button>
          <button
            onClick={() => setActiveTab("catalogue-valuation")}
            className={`px-3.5 py-1.5 rounded-md text-xs font-mono font-bold transition-all ${
              activeTab === "catalogue-valuation"
                ? "bg-[var(--accent-primary)] text-white shadow-sm"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            }`}
          >
            Catalogue Valuation Multipliers
          </button>
        </div>
      </div>

      {/* ── TAB 1: Streaming Royalty Calculator ── */}
      {activeTab === "stream-payout" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Controls (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex justify-between text-xs font-mono text-[var(--text-secondary)] mb-2">
                <span>Target Stream Volume:</span>
                <span className="text-[var(--text-primary)] font-bold">{streams.toLocaleString()} streams</span>
              </div>
              <input
                type="range"
                min={10000}
                max={5000000}
                step={25000}
                value={streams}
                onChange={(e) => setStreams(Number(e.target.value))}
                className="w-full h-2 bg-[var(--bg-secondary)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-primary)]"
              />
              <div className="flex justify-between text-[10px] font-mono text-[var(--text-muted)] mt-1">
                <span>10k</span>
                <span>1M</span>
                <span>5M</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {(["spotify", "apple", "tidal", "youtube"] as const).map((key) => (
                <button
                  key={key}
                  onClick={() => setDsp(key)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    dsp === key
                      ? "bg-[var(--bg-secondary)] border-[var(--accent-primary)] text-[var(--text-primary)] ring-1 ring-[var(--accent-primary)]"
                      : "bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--border-highlight)]"
                  }`}
                >
                  <div className="text-xs font-bold capitalize">{key}</div>
                  <div className="text-[10px] font-mono text-[var(--text-muted)] mt-0.5">{dspRates[key].perThousand}/1k</div>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[var(--border-color)]">
              <div>
                <label className="text-xs font-mono text-[var(--text-secondary)] block mb-1.5">
                  Master Ownership Share: {masterShare}%
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={masterShare}
                  onChange={(e) => setMasterShare(Number(e.target.value))}
                  className="w-full h-2 bg-[var(--bg-secondary)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-primary)]"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-[var(--text-secondary)] block mb-1.5">
                  Publishing/Songwriting Share: {publisherShare}%
                </label>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={publisherShare}
                  onChange={(e) => setPublisherShare(Number(e.target.value))}
                  className="w-full h-2 bg-[var(--bg-secondary)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-primary)]"
                />
              </div>
            </div>
          </div>

          {/* Results Summary (5 cols) */}
          <div className="lg:col-span-5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-6 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider block mb-1">
                Estimated Net Take-Home Payout
              </span>
              <div className="text-4xl font-serif font-bold text-[var(--text-primary)]">
                ${totalNetEarnings.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <p className="text-[11px] text-[var(--text-muted)] mt-1 font-mono">
                Based on {dspRates[dsp].name} blended 2026 rates
              </p>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-[var(--border-color)] text-xs font-mono">
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Master Recording Share (~82% pool):</span>
                <span className="text-[var(--text-primary)] font-bold">${masterEarnings.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[var(--text-secondary)]">
                <span>Publishing & Mechanicals (~18% pool):</span>
                <span className="text-[var(--text-primary)] font-bold">${publishingEarnings.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[var(--text-muted)] pt-2 border-t border-[var(--border-color)] text-[11px]">
                <span>Gross Streaming Value:</span>
                <span>${grossStreamingEarnings.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TAB 2: Catalogue Valuation Multipliers ── */}
      {activeTab === "catalogue-valuation" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="flex justify-between text-xs font-mono text-[var(--text-secondary)] mb-2">
                <span>Annual Net Publisher's Share (NPS):</span>
                <span className="text-[var(--text-primary)] font-bold">${annualNetIncome.toLocaleString()}/yr</span>
              </div>
              <input
                type="range"
                min={5000}
                max={250000}
                step={5000}
                value={annualNetIncome}
                onChange={(e) => setAnnualNetIncome(Number(e.target.value))}
                className="w-full h-2 bg-[var(--bg-secondary)] rounded-lg appearance-none cursor-pointer accent-[var(--accent-primary)]"
              />
            </div>

            <div className="space-y-3">
              <label className="text-xs font-mono text-[var(--text-secondary)] block">Streaming Decay / Growth Trajectory:</label>
              <div className="grid grid-cols-3 gap-2.5">
                {(["declining", "stable", "growing"] as const).map((rate) => (
                  <button
                    key={rate}
                    onClick={() => setGrowthRate(rate)}
                    className={`p-3 rounded-xl border text-xs font-bold capitalize transition-all ${
                      growthRate === rate
                        ? "bg-[var(--bg-secondary)] border-[var(--accent-primary)] text-[var(--text-primary)] ring-1 ring-[var(--accent-primary)]"
                        : "bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-secondary)]"
                    }`}
                  >
                    {rate === "declining" && "Decaying (8-10x)"}
                    {rate === "stable" && "Stable (11-13x)"}
                    {rate === "growing" && "Growing (15-18x)"}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-[var(--border-color)] text-xs">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={syncHistory}
                  onChange={(e) => setSyncHistory(e.target.checked)}
                  className="rounded border-[var(--border-color)] text-[var(--accent-primary)] focus:ring-0"
                />
                <span className="text-[var(--text-primary)] font-medium">Proven TV/Film/Gaming Sync Placements (+2x multiple)</span>
              </label>

              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rightsControl === "both"}
                  onChange={(e) => setRightsControl(e.target.checked ? "both" : "master-only")}
                  className="rounded border-[var(--border-color)] text-[var(--accent-primary)] focus:ring-0"
                />
                <span className="text-[var(--text-primary)] font-medium">Controls 100% of both Master & Composition (+2.5x multiple)</span>
              </label>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl p-6 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-wider block mb-1">
                Estimated Catalogue Valuation Benchmark
              </span>
              <div className="text-3xl sm:text-4xl font-serif font-bold text-[var(--text-primary)]">
                ${Math.round(midValuation).toLocaleString()}
              </div>
              <p className="text-[11px] text-[var(--text-muted)] mt-1 font-mono">
                Valuation Multiplier: <strong className="text-[var(--accent-primary)] font-bold">{baseMultiple.toFixed(1)}x NPS</strong>
              </p>
            </div>

            <div className="space-y-2 pt-4 border-t border-[var(--border-color)] text-xs font-mono text-[var(--text-secondary)]">
              <div className="flex justify-between">
                <span>Conservative Range (Low):</span>
                <span className="font-bold text-[var(--text-primary)]">${Math.round(lowValuation).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Aggressive Fund Range (High):</span>
                <span className="font-bold text-[var(--text-primary)]">${Math.round(highValuation).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
