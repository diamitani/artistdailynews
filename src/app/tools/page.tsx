import { Metadata } from "next";
import { Header } from "@/components/Header";
import { BreakingTicker } from "@/components/BreakingTicker";
import { FinancialCalculator } from "@/components/FinancialCalculator";
import { ReleaseChecklistTool } from "@/components/ReleaseChecklistTool";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { MOCK_ARTICLES } from "@/lib/mock-articles";
import { Calculator, ShieldCheck, DollarSign, BarChart2, BookOpen, Rocket } from "lucide-react";

export const metadata: Metadata = {
  title: "DIY Music Business Royalty, Catalogue & Release Blueprint Calculators | Artist Daily News",
  description:
    "Free interactive financial and career strategy tools for independent artists to calculate Spotify/Apple streaming payouts, master recording vs publishing splits, private equity catalogue valuation multiples, and 6-week release timelines.",
};

export default function ToolsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090A0F]">
      <Header />
      <BreakingTicker articles={MOCK_ARTICLES} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            <span>Artist Financial & Career Intelligence Suite</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            Stop Guessing Your Streaming Payouts, Catalogue Value & Release Dates.
          </h1>

          <p className="text-sm sm:text-base text-slate-300">
            Engineered with verified 2026 pro-rata DSP distributions, Wall Street Net Publisher’s Share (NPS) transaction benchmarks, and proven algorithmic release sequences.
          </p>
        </div>

        {/* Master Financial Calculator */}
        <FinancialCalculator />

        {/* Interactive 6-Week Release Countdown Roadmap */}
        <ReleaseChecklistTool />

        {/* Educational Explainer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          <div className="bg-[#12141F] border border-[#272A38] rounded-xl p-6 space-y-3">
            <DollarSign className="w-6 h-6 text-emerald-400" />
            <h3 className="font-bold text-white text-base">The Two Halves of Music</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every stream yields two separate revenue streams: the <strong>Master Sound Recording</strong> (typically ~82% of payout) and the <strong>Musical Composition/Publishing</strong> (~18%). Independent artists owning 100% of both capture maximum yield.
            </p>
          </div>

          <div className="bg-[#12141F] border border-[#272A38] rounded-xl p-6 space-y-3">
            <BarChart2 className="w-6 h-6 text-[#D4FF00]" />
            <h3 className="font-bold text-white text-base">What Drives Multiples?</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Catalogue sales are valued as a multiple of trailing Net Publisher's Share (NPS). Growing streaming volume, sync placements in film/gaming, and high save-rates push multiples from 10x up to 20x annual earnings.
            </p>
          </div>

          <div className="bg-[#12141F] border border-[#272A38] rounded-xl p-6 space-y-3">
            <Rocket className="w-6 h-6 text-pink-400" />
            <h3 className="font-bold text-white text-base">The 21-Day Pitch Rule</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Spotify editorial teams require at least 14–21 days of lead time to index tracks for official Release Radar and algorithmic radio generation. Rushing a release in 5 days forfeits 80% of first-week discovery potential.
            </p>
          </div>
        </div>

      </main>

      <NewsletterSignup />
    </div>
  );
}
