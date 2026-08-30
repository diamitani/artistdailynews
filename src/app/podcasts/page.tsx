import { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { BreakingTicker } from "@/components/BreakingTicker";
import { PodcastPlayer } from "@/components/PodcastPlayer";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { MOCK_ARTICLES, MOCK_PODCASTS } from "@/lib/mock-articles";
import { Mic } from "lucide-react";

export const metadata: Metadata = {
  title: "Music Business Podcasts & Masterclass Audio Interviews | Artist Daily News",
  description: "Curated daily audio conversations with A&Rs, music attorneys, independent moguls, and chart-topping producers.",
};

export default function PodcastsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] justify-between">
      <Header />
      <BreakingTicker articles={MOCK_ARTICLES} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 w-full">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--accent-primary)] px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            <Mic className="w-3.5 h-3.5" />
            <span>ADN Audio & Podcast Network</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] leading-tight">
            Learn From Moguls Who Built Independent Empires
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-secondary)]">
            Stream the highest-signal music business interviews directly from your browser or sync with Spotify and Apple Podcasts.
          </p>
        </div>

        <PodcastPlayer episodes={MOCK_PODCASTS} />
      </main>

      <NewsletterSignup />
      <Footer />
    </div>
  );
}
