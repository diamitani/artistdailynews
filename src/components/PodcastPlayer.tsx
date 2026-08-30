"use client";

import { useState } from "react";
import { PodcastEpisode } from "@/lib/types";
import { Headphones, Play, Pause, ExternalLink } from "lucide-react";

interface PodcastPlayerProps {
  episodes: PodcastEpisode[];
}

export function PodcastPlayer({ episodes }: PodcastPlayerProps) {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const togglePlay = (id: string) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
    }
  };

  return (
    <div className="card-brand p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-[var(--accent-primary-light)] border border-[var(--accent-primary)]/20 flex items-center justify-center text-[var(--accent-primary)]">
            <Headphones className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-serif font-bold text-[var(--text-primary)] text-xl">Top Music Business Audio Intelligence</h3>
            <p className="text-xs text-[var(--text-muted)] font-mono">Curated interviews with managers, founders, and independent hitmakers</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {episodes.map((ep) => {
          const isPlaying = playingId === ep.id;

          return (
            <div
              key={ep.id}
              className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-5 flex flex-col justify-between space-y-4 hover:border-[var(--accent-primary)] transition-all group"
            >
              <div className="space-y-3">
                <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-[var(--bg-card)]">
                  <img
                    src={ep.imageUrl}
                    alt={ep.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <button
                      onClick={() => togglePlay(ep.id)}
                      className="w-12 h-12 rounded-full bg-[var(--accent-primary)] hover:bg-[var(--accent-primary-hover)] text-white flex items-center justify-center shadow-lg transition-transform active:scale-90"
                    >
                      {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                    </button>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-[10px] text-white px-2 py-0.5 rounded font-mono">
                    {ep.duration}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-[var(--accent-primary)] font-bold uppercase tracking-wider block">
                    {ep.showName} &bull; Hosted by {ep.host}
                  </span>
                  <h4 className="font-serif font-bold text-base text-[var(--text-primary)] mt-1 leading-snug group-hover:text-[var(--accent-primary)] transition-colors">
                    {ep.title}
                  </h4>
                </div>

                <p className="text-xs text-[var(--text-secondary)] line-clamp-3 leading-relaxed">
                  {ep.summary}
                </p>
              </div>

              {isPlaying && (
                <div className="bg-[var(--bg-card)] p-3 rounded-lg border border-[var(--accent-primary)]/40 text-xs text-[var(--accent-primary)] animate-pulse flex items-center justify-between font-medium">
                  <span>▶ Playing audio preview stream...</span>
                  <span className="font-mono text-[10px]">320kbps</span>
                </div>
              )}

              <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between text-xs">
                <a
                  href={ep.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-muted)] hover:text-[var(--accent-emerald)] flex items-center space-x-1 font-mono text-[11px]"
                >
                  <span>Spotify</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={ep.appleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--text-muted)] hover:text-[var(--accent-primary)] flex items-center space-x-1 font-mono text-[11px]"
                >
                  <span>Apple Podcasts</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
