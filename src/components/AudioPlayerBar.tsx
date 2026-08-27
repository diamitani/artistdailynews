"use client";

import { useAudio } from "./AudioContext";
import { Play, Pause, RotateCcw, RotateCw, Volume2, Headphones, X, ChevronUp, ChevronDown, Sparkles } from "lucide-react";
import { formatTimeAgo } from "@/lib/utils";

export function AudioPlayerBar() {
  const {
    currentTrack,
    isPlaying,
    progressSeconds,
    playbackRate,
    isExpanded,
    togglePlay,
    seek,
    setPlaybackRate,
    setIsExpanded,
  } = useAudio();

  if (!currentTrack) return null;

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const progressPct = Math.min(100, (progressSeconds / (currentTrack.durationSeconds || 1)) * 100);

  const speedOptions = [0.75, 1, 1.25, 1.5, 2];

  const cycleSpeed = () => {
    const nextIdx = (speedOptions.indexOf(playbackRate) + 1) % speedOptions.length;
    setPlaybackRate(speedOptions[nextIdx]);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 px-4 pb-4 pointer-events-none">
      <div className="max-w-5xl mx-auto pointer-events-auto transition-all duration-300">
        
        {/* Minimized Bubble when collapsed */}
        {!isExpanded ? (
          <div className="flex justify-end">
            <button
              onClick={() => setIsExpanded(true)}
              className="bg-[#121420]/95 hover:bg-[#161828] border border-[#2D3145] text-white p-3 rounded-2xl shadow-2xl flex items-center space-x-3 backdrop-blur-md transition-transform active:scale-95 group"
            >
              <div className="w-8 h-8 rounded-lg overflow-hidden bg-slate-900 shrink-0 relative">
                <img src={currentTrack.imageUrl} alt="" className="w-full h-full object-cover" />
                {isPlaying && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-[#D4FF00] animate-ping"></span>
                  </div>
                )}
              </div>

              <div className="text-left max-w-xs truncate hidden sm:block">
                <div className="text-xs font-bold text-white truncate">{currentTrack.title}</div>
                <div className="text-[10px] text-slate-400 font-mono truncate">{currentTrack.artistOrShow}</div>
              </div>

              <div className="p-1 rounded bg-[#D4FF00] text-black">
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </div>

              <ChevronUp className="w-4 h-4 text-slate-400 group-hover:text-white" />
            </button>
          </div>
        ) : (
          /* Full Docked Floating Player */
          <div className="bg-[#10121D]/95 border border-[#2B2F44] rounded-2xl p-4 sm:px-6 sm:py-3.5 shadow-2xl backdrop-blur-xl space-y-2">
            
            {/* Top Row: Track Meta, Controls, Waveform, Actions */}
            <div className="flex items-center justify-between gap-4">
              
              {/* Left: Track Thumbnail & Title */}
              <div className="flex items-center space-x-3 min-w-0 max-w-xs sm:max-w-sm">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-800 relative">
                  <img src={currentTrack.imageUrl} alt="" className="w-full h-full object-cover" />
                  {isPlaying && (
                    <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#D4FF00] shadow"></div>
                  )}
                </div>

                <div className="min-w-0">
                  <div className="flex items-center space-x-1.5">
                    <span className="bg-[#D4FF00]/10 text-[#D4FF00] font-mono text-[9px] font-bold px-1.5 py-0.2 rounded border border-[#D4FF00]/20">
                      AUDIO STREAM
                    </span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white truncate mt-0.5">
                    {currentTrack.title}
                  </h4>
                  <p className="text-[10px] sm:text-xs text-slate-400 truncate font-mono">
                    {currentTrack.artistOrShow}
                  </p>
                </div>
              </div>

              {/* Center: Playback Buttons & Live Animated Waveforms */}
              <div className="flex items-center space-x-3 sm:space-x-4 shrink-0">
                <button
                  onClick={() => seek(Math.max(0, progressSeconds - 15))}
                  title="Rewind 15s"
                  className="text-slate-400 hover:text-white transition-colors p-1.5 hidden sm:inline-flex"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-[#D4FF00] hover:bg-[#bde600] text-black flex items-center justify-center shadow-lg shadow-[#D4FF00]/20 transition-transform active:scale-95"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 fill-current" />
                  ) : (
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  )}
                </button>

                <button
                  onClick={() => seek(Math.min(currentTrack.durationSeconds, progressSeconds + 15))}
                  title="Forward 15s"
                  className="text-slate-400 hover:text-white transition-colors p-1.5 hidden sm:inline-flex"
                >
                  <RotateCw className="w-4 h-4" />
                </button>

                {/* Animated Waveform Bars */}
                <div className="hidden md:flex items-center space-x-1 px-3 py-1.5 bg-[#090A0F] rounded-lg border border-slate-800/80">
                  <span className={`w-1 bg-[#D4FF00] rounded-full transition-all duration-200 ${isPlaying ? "h-5 animate-pulse" : "h-2"}`}></span>
                  <span className={`w-1 bg-[#D4FF00] rounded-full transition-all duration-300 ${isPlaying ? "h-3 animate-pulse delay-75" : "h-3"}`}></span>
                  <span className={`w-1 bg-emerald-400 rounded-full transition-all duration-150 ${isPlaying ? "h-6 animate-pulse delay-100" : "h-4"}`}></span>
                  <span className={`w-1 bg-emerald-400 rounded-full transition-all duration-200 ${isPlaying ? "h-4 animate-pulse delay-150" : "h-2"}`}></span>
                  <span className={`w-1 bg-[#D4FF00] rounded-full transition-all duration-300 ${isPlaying ? "h-5 animate-pulse delay-200" : "h-3"}`}></span>
                </div>
              </div>

              {/* Right: Speed Toggle & Controls */}
              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={cycleSpeed}
                  title="Change Playback Speed"
                  className="px-2 py-1 bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white text-[11px] font-mono font-bold rounded border border-slate-700 transition-colors"
                >
                  {playbackRate}x
                </button>

                <button
                  onClick={() => setIsExpanded(false)}
                  title="Collapse Player"
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>

            </div>

            {/* Bottom Scrubber Progress Bar */}
            <div className="flex items-center space-x-3 text-[10px] font-mono text-slate-400 pt-1">
              <span className="w-10 text-right">{formatSeconds(progressSeconds)}</span>
              
              <div
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickPct = (e.clientX - rect.left) / rect.width;
                  seek(clickPct * currentTrack.durationSeconds);
                }}
                className="flex-1 h-1.5 bg-slate-800 hover:h-2 rounded-full overflow-hidden cursor-pointer relative group transition-all"
              >
                <div
                  style={{ width: `${progressPct}%` }}
                  className="h-full bg-gradient-to-r from-[#D4FF00] to-emerald-400 rounded-full relative"
                />
              </div>

              <span className="w-10">{currentTrack.durationStr || formatSeconds(currentTrack.durationSeconds)}</span>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
