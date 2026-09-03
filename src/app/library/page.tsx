import { Metadata } from "next";
import { BreakingTicker } from "@/components/BreakingTicker";
import { PodcastPlayer } from "@/components/PodcastPlayer";
import { VideoGallerySection } from "@/components/VideoGallerySection";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { MOCK_ARTICLES, MOCK_PODCASTS, MOCK_VIDEOS } from "@/lib/mock-articles";
import { CURATED_MEDIA_CHANNELS } from "@/lib/media-channels";
import { Radio, Tv, Rss, ExternalLink, GraduationCap, Film, Mic2, Sparkles, Layers, BookOpen } from "lucide-react";

export const metadata: Metadata = {
  title: "Media Library — 27+ Music Industry Channels, RSS Feeds, Masterclasses & Podcasts | Artist Daily News",
  description: "Explore our curated library of 27+ YouTube channels, active RSS feeds, DAW mixing tutorials, and music business podcasts for independent artists.",
};

export default function LibraryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] justify-between">
      <BreakingTicker articles={MOCK_ARTICLES} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 w-full">
        
        {/* Hub Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center space-x-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--accent-primary)] px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            <Radio className="w-3.5 h-3.5" />
            <span>Curated 27+ Media Channels & Learning Library</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-[var(--text-primary)] leading-tight">
            Music Industry Video, Podcast & RSS Feed Library
          </h1>

          <p className="text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed">
            A comprehensive, verified directory of 27+ daily music production channels, business podcasts, RSS feeds, and DAW masterclasses. Zero fake videos, zero algorithmic slop.
          </p>
        </div>

        {/* 27+ YouTube & RSS Channels Directory Grid */}
        <section className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b-2 border-[var(--text-primary)] pb-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-xs font-mono font-bold text-[var(--accent-primary)] uppercase tracking-wider mb-1">
                <Rss className="w-3.5 h-3.5" />
                <span>Verified Publishers & Creators</span>
              </div>
              <h2 className="font-serif text-3xl font-bold text-[var(--text-primary)]">
                27+ Indexed YouTube Channels & RSS Feeds
              </h2>
            </div>
            <span className="text-xs font-mono text-[var(--text-muted)]">
              Daily Updates &bull; Continuous Aggregation
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {CURATED_MEDIA_CHANNELS.map((channel) => (
              <div
                key={channel.id}
                className="card-brand p-5 flex flex-col justify-between space-y-4 hover:border-[var(--border-highlight)] transition-all bg-[var(--bg-card)]"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-[var(--accent-primary)] font-bold">{channel.handle}</span>
                    <span className="text-[10px] text-[var(--text-muted)] bg-[var(--bg-secondary)] px-2 py-0.5 rounded border border-[var(--border-color)]">
                      {channel.category}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg text-[var(--text-primary)]">
                    {channel.name}
                  </h3>

                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed line-clamp-3">
                    {channel.description}
                  </p>

                  {channel.featuredTopic && (
                    <div className="pt-1">
                      <span className="text-[10px] font-mono text-[var(--text-muted)] uppercase block">Featured Topic:</span>
                      <span className="text-xs font-semibold text-[var(--text-primary)]">{channel.featuredTopic}</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between text-xs font-mono">
                  <span className="text-[10px] text-[var(--text-muted)]">
                    {channel.subscribers ? `${channel.subscribers} Subs` : "Verified Feed"}
                  </span>
                  
                  <div className="flex items-center space-x-2">
                    {channel.rssFeedUrl && (
                      <a
                        href={channel.rssFeedUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 rounded bg-[var(--bg-secondary)] text-amber-600 hover:text-amber-500 border border-[var(--border-color)]"
                        title="RSS Feed"
                      >
                        <Rss className="w-3.5 h-3.5" />
                      </a>
                    )}
                    <a
                      href={channel.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-md bg-red-600 text-white font-bold text-[11px] hover:bg-red-700 transition-colors shadow-sm"
                    >
                      <span>YouTube</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Video Gallery Section (27 Verified Masterclasses) */}
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
