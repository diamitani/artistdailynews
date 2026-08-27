"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { PodcastEpisode } from "@/lib/types";
import { MOCK_PODCASTS } from "@/lib/mock-articles";

export interface AudioTrack {
  id: string;
  title: string;
  artistOrShow: string;
  durationStr: string;
  durationSeconds: number;
  imageUrl: string;
  audioUrl?: string;
}

interface AudioContextType {
  currentTrack: AudioTrack | null;
  isPlaying: boolean;
  progressSeconds: number;
  playbackRate: number;
  isExpanded: boolean;
  playTrack: (track: AudioTrack) => void;
  togglePlay: () => void;
  pause: () => void;
  seek: (seconds: number) => void;
  setPlaybackRate: (rate: number) => void;
  setIsExpanded: (expanded: boolean) => void;
  playPodcast: (podcast: PodcastEpisode) => void;
  playArticleBriefing: (title: string, takeaway: string) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>({
    id: "track-default",
    title: MOCK_PODCASTS[0].title,
    artistOrShow: `${MOCK_PODCASTS[0].showName} (feat. ${MOCK_PODCASTS[0].host})`,
    durationStr: "58:00",
    durationSeconds: 3480,
    imageUrl: MOCK_PODCASTS[0].imageUrl,
  });
  const [isPlaying, setIsPlaying] = useState(false);
  const [progressSeconds, setProgressSeconds] = useState(145);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isExpanded, setIsExpanded] = useState(true);

  // Simulated playback ticker when playing
  useEffect(() => {
    let interval: any;
    if (isPlaying && currentTrack) {
      interval = setInterval(() => {
        setProgressSeconds((prev) => {
          if (prev >= currentTrack.durationSeconds) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1 * playbackRate;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, playbackRate, currentTrack]);

  const playTrack = (track: AudioTrack) => {
    setCurrentTrack(track);
    setProgressSeconds(0);
    setIsPlaying(true);
    setIsExpanded(true);
  };

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const pause = () => {
    setIsPlaying(false);
  };

  const seek = (seconds: number) => {
    setProgressSeconds(seconds);
  };

  const playPodcast = (podcast: PodcastEpisode) => {
    playTrack({
      id: podcast.id,
      title: podcast.title,
      artistOrShow: `${podcast.showName} • ${podcast.host}`,
      durationStr: podcast.duration,
      durationSeconds: parseInt(podcast.duration.replace(/\D/g, "") || "45", 10) * 60,
      imageUrl: podcast.imageUrl,
    });
  };

  const playArticleBriefing = (title: string, takeaway: string) => {
    playTrack({
      id: `brief-${Date.now()}`,
      title: `2-Min Audio Briefing: ${title}`,
      artistOrShow: "ADN AI Voice Newsroom Desk",
      durationStr: "2:15",
      durationSeconds: 135,
      imageUrl: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80",
    });
  };

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        progressSeconds,
        playbackRate,
        isExpanded,
        playTrack,
        togglePlay,
        pause,
        seek,
        setPlaybackRate,
        setIsExpanded,
        playPodcast,
        playArticleBriefing,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
}
