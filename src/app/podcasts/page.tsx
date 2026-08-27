import { Metadata } from "next";
import { Header } from "@/components/Header";
import { BreakingTicker } from "@/components/BreakingTicker";
import { PodcastPlayer } from "@/components/PodcastPlayer";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { MOCK_ARTICLES, MOCK_PODCASTS } from "@/lib/mock-articles";
import { Headphones, Radio, Mic } from "lucide-react";

export const metadata: Metadata = {
  title: "Music Business Podcasts & Masterclass Audio Interviews | Artist Daily News",
  description: "Curated daily audio conversations with A&Rs, music attorneys, independent moguls, and chart-topping producers.",
};

export default function PodcastsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090A0F]">
      <Header />
      <BreakingTicker articles={MOCK_ARTICLES} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            <Mic className="w-3.5 h-3.5" />
            <span>ADN Audio & Podcast Network</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            Learn From the Moguls Who Built Independent Empires.
          </h1>

          <p className="text-sm sm:text-base text-slate-300">
            Stream the highest-signal music business interviews directly from your browser or sync with Spotify and Apple Podcasts.
          </p>
        </div>

        <PodcastPlayer episodes={MOCK_PODCASTS} />
      </main>

      <NewsletterSignup />
    </div>
  );
}
