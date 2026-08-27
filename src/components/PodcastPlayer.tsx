"use client";

import { useState } from "react";
import { PodcastEpisode } from "@/lib/types";
import { Headphones, Play, Pause, ExternalLink, Sparkles } from "lucide-react";

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
    <div className="bg-[#11131C] border border-[#272A38] rounded-2xl p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
            <Headphones className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-bold text-white text-lg">Top Music Business Audio Intelligence</h3>
            <p className="text-xs text-slate-400 font-mono">Curated daily interviews with managers, founders, and hitmakers</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {episodes.map((ep) => {
          const isPlaying = playingId === ep.id;

          return (
            <div
              key={ep.id}
              className="bg-[#161826] border border-[#242738] rounded-xl p-5 flex flex-col justify-between space-y-4 hover:border-cyan-500/40 transition-colors group"
            >
              <div className="space-y-3">
                <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-slate-900">
                  <img
                    src={ep.imageUrl}
                    alt={ep.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <button
                      onClick={() => togglePlay(ep.id)}
                      className="w-12 h-12 rounded-full bg-[#D4FF00] hover:bg-[#bde600] text-black flex items-center justify-center shadow-lg transition-transform active:scale-90"
                    >
                      {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                    </button>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/70 text-[10px] text-white px-2 py-0.5 rounded font-mono">
                    {ep.duration}
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block">
                    {ep.showName} &bull; Hosted by {ep.host}
                  </span>
                  <h4 className="font-bold text-sm text-white mt-1 leading-snug group-hover:text-cyan-300 transition-colors">
                    {ep.title}
                  </h4>
                </div>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                  {ep.summary}
                </p>
              </div>

              {isPlaying && (
                <div className="bg-[#0A0B10] p-3 rounded-lg border border-cyan-500/30 text-xs text-cyan-300 animate-pulse flex items-center justify-between">
                  <span>▶ Playing audio preview stream...</span>
                  <span className="font-mono text-[10px]">320kbps</span>
                </div>
              )}

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <a
                  href={ep.spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-emerald-400 flex items-center space-x-1 font-mono text-[11px]"
                >
                  <span>Spotify</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={ep.appleUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-400 hover:text-pink-400 flex items-center space-x-1 font-mono text-[11px]"
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
