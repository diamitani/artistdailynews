import { Metadata } from "next";
import { BreakingTicker } from "@/components/BreakingTicker";
import { PodcastPlayer } from "@/components/PodcastPlayer";
import { VideoGallerySection } from "@/components/VideoGallerySection";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { MOCK_ARTICLES, MOCK_PODCASTS, MOCK_VIDEOS } from "@/lib/mock-articles";
import { Radio, Tv } from "lucide-react";

export const metadata: Metadata = {
  title: "Audio & Video Media Hub — Podcasts & YouTube Masterclasses | Artist Daily News",
  description: "Curated daily audio conversations with A&Rs, music attorneys, independent moguls, and YouTube documentary breakdowns.",
};

export default function PodcastsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] justify-between">
      <BreakingTicker articles={MOCK_ARTICLES} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 w-full">
        {/* Hub Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--accent-primary)] px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            <Radio className="w-3.5 h-3.5" />
            <span>ADN Multimedia Studio & Audio Hub</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] leading-tight">
            Independent Music Intelligence in Audio & Video
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            Stream the highest-signal music business interviews, DAW mixing masterclasses, and YouTube video essays directly from your browser.
          </p>
        </div>

        {/* Video Gallery Section */}
        <div>
          <VideoGallerySection videos={MOCK_VIDEOS} />
        </div>

        {/* Podcast Audio Section */}
        <div className="space-y-6 pt-4 border-t border-[var(--border-color)]">
          <div className="flex items-center space-x-2">
            <Radio className="w-4 h-4 text-[var(--accent-primary)]" />
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              Podcast Audio Network
            </h2>
          </div>
          <PodcastPlayer episodes={MOCK_PODCASTS} />
        </div>
      </main>

      <NewsletterSignup />
    </div>
  );
}
