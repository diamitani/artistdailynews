"use client";

import { useState, useMemo } from "react";
import { VideoItem } from "@/lib/types";
import { CURATED_MEDIA_CHANNELS } from "@/lib/media-channels";
import { 
  Play, 
  Tv, 
  Clock, 
  Eye, 
  X, 
  Sparkles, 
  ExternalLink, 
  Film, 
  GraduationCap, 
  Mic2, 
  ChevronRight,
  Maximize2,
  Radio,
  Rss,
  Layers,
  Search,
  Globe
} from "lucide-react";

interface VideoGallerySectionProps {
  videos: VideoItem[];
}

export function VideoGallerySection({ videos }: VideoGallerySectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeModalVideo, setActiveModalVideo] = useState<VideoItem | null>(null);
  const [showChannelsModal, setShowChannelsModal] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const categories = [
    { id: "all", label: "All 27 Videos", icon: Tv },
    { id: "essay", label: "Business Essays", icon: Film },
    { id: "masterclass", label: "DAW & Audio Masterclasses", icon: GraduationCap },
    { id: "interview", label: "A&R & Legal Interviews", icon: Mic2 },
    { id: "documentary", label: "Culture Documentaries", icon: Sparkles },
  ];

  const filteredVideos = useMemo(() => {
    let list = videos;
    if (selectedCategory !== "all") {
      list = list.filter((v) => v.category === selectedCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter((v) => 
        v.title.toLowerCase().includes(q) || 
        v.channelName.toLowerCase().includes(q) ||
        v.description.toLowerCase().includes(q) ||
        v.tags.some(t => t.toLowerCase().includes(q))
      );
    }
    return list;
  }, [videos, selectedCategory, searchQuery]);

  const featuredVideo = filteredVideos[0] || videos[0];
  const sidePlaylistVideos = filteredVideos.slice(1, 7);
  const lowerGridVideos = filteredVideos.slice(7);

  return (
    <section className="py-12 border-t border-[var(--border-color)]">
      <div className="space-y-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 text-xs font-mono font-bold text-[var(--accent-primary)] uppercase tracking-wider">
              <Tv className="w-3.5 h-3.5" />
              <span>ADN Visual Wire & 27+ Media Channel Library</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[var(--text-primary)] tracking-tight">
              YouTube Video Intelligence & Masterclasses
            </h2>
            <p className="text-sm text-[var(--text-secondary)] max-w-2xl">
              Curated masterclasses, DAW workflows, music business investigations, and cultural documentaries from 27 verified channels.
            </p>
          </div>

          {/* Right Action: 27 Channels Directory Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setShowChannelsModal(true)}
              className="flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-mono font-bold bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--accent-primary)] transition-all shadow-sm"
            >
              <Radio className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              <span>Browse 27+ Channel Directory ({CURATED_MEDIA_CHANNELS.length})</span>
            </button>
          </div>
        </div>

        {/* Category Filter Tabs + Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--border-color)] pb-3">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium whitespace-nowrap transition-colors ${
                    isSelected
                      ? "bg-[var(--accent-primary)] text-white font-bold shadow-sm"
                      : "bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search Filter */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Filter 27 videos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-lg px-3 py-1.5 pl-8 text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-primary)] font-mono"
            />
            <Search className="w-3.5 h-3.5 text-[var(--text-muted)] absolute left-2.5 top-2.5" />
          </div>
        </div>

        {/* Featured Video + Side Playlist (Top Unit) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Main Lead Featured Video (7 cols) */}
          {featuredVideo && (
            <div className="lg:col-span-7">
              <div 
                onClick={() => setActiveModalVideo(featuredVideo)}
                className="group card-brand p-4 sm:p-5 cursor-pointer hover:border-[var(--accent-primary)] transition-all duration-300"
              >
                {/* Video Thumbnail Cover */}
                <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-black shadow-inner">
                  <img
                    src={featuredVideo.thumbnailUrl}
                    alt={featuredVideo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-[var(--accent-primary)] text-white flex items-center justify-center shadow-2xl group-hover:scale-110 group-hover:shadow-[var(--accent-primary)]/50 transition-all duration-300 pl-1">
                      <Play className="w-7 h-7 fill-current" />
                    </div>
                  </div>

                  {/* Top Badges */}
                  <div className="absolute top-3.5 left-3.5 flex items-center space-x-2">
                    <span className="bg-black/75 backdrop-blur-md text-white text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-white/20 flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping" />
                      <span>{featuredVideo.category}</span>
                    </span>
                  </div>

                  {/* Bottom Video Telemetry */}
                  <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between text-xs text-white/90 font-mono">
                    <span className="bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] font-bold">
                      {featuredVideo.channelName}
                    </span>
                    <span className="bg-black/70 backdrop-blur-sm px-2 py-0.5 rounded text-[11px] flex items-center space-x-1">
                      <Clock className="w-3 h-3 mr-1" />
                      {featuredVideo.duration}
                    </span>
                  </div>
                </div>

                {/* Video Info */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center space-x-3 text-xs font-mono text-[var(--text-muted)]">
                    <span className="text-[var(--accent-primary)] font-bold">{featuredVideo.channelName}</span>
                    <span>&bull;</span>
                    {featuredVideo.viewsFormatted && (
                      <span className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {featuredVideo.viewsFormatted}
                      </span>
                    )}
                    <span>&bull;</span>
                    <span>{featuredVideo.publishedAt}</span>
                  </div>

                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-[var(--text-primary)] group-hover:text-[var(--accent-primary)] transition-colors leading-tight">
                    {featuredVideo.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
                    {featuredVideo.description}
                  </p>

                  <div className="pt-2 flex items-center space-x-2">
                    <span className="inline-flex items-center space-x-1 text-xs font-mono font-bold text-[var(--accent-primary)] group-hover:underline">
                      <span>Watch Full Masterclass in HD</span>
                      <Maximize2 className="w-3 h-3 ml-1" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Video Playlist Side Column (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono border-b border-[var(--border-color)] pb-2">
              <span className="font-bold text-[var(--text-primary)] uppercase tracking-wider">
                Up Next on ADN Video Desk
              </span>
              <span className="text-[var(--text-muted)]">
                {filteredVideos.length} Total Curated
              </span>
            </div>

            <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1 scrollbar-none">
              {sidePlaylistVideos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setActiveModalVideo(video)}
                  className="group flex gap-3.5 p-3 rounded-xl bg-[var(--bg-secondary)] hover:bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--border-highlight)] transition-all cursor-pointer"
                >
                  {/* Thumbnail Mini */}
                  <div className="relative w-32 sm:w-36 aspect-[16/10] rounded-lg overflow-hidden shrink-0 bg-black">
                    <img
                      src={video.thumbnailUrl}
                      alt={video.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <div className="w-7 h-7 rounded-full bg-[var(--accent-primary)] text-white flex items-center justify-center pl-0.5 shadow">
                        <Play className="w-3.5 h-3.5 fill-current" />
                      </div>
                    </div>
                    <span className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 rounded text-[9px] font-mono text-white font-bold">
                      {video.duration}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col justify-between py-0.5">
                    <div>
                      <span className="text-[10px] font-mono text-[var(--accent-primary)] font-bold uppercase">
                        {video.channelName}
                      </span>
                      <h4 className="font-serif font-bold text-xs sm:text-sm text-[var(--text-primary)] line-clamp-2 leading-snug group-hover:text-[var(--accent-primary)] transition-colors mt-0.5">
                        {video.title}
                      </h4>
                    </div>
                    <div className="flex items-center space-x-2 text-[10px] font-mono text-[var(--text-muted)] mt-1">
                      {video.viewsFormatted && <span>{video.viewsFormatted}</span>}
                      <span>&bull;</span>
                      <span>{video.publishedAt}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Extended 27-Video Library Grid (Lower Unit) */}
        {lowerGridVideos.length > 0 && (
          <div className="space-y-4 pt-6">
            <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2">
              <span className="font-serif font-bold text-xl text-[var(--text-primary)]">
                More Curated Video Masterclasses ({lowerGridVideos.length})
              </span>
              <span className="text-xs font-mono text-[var(--text-muted)]">
                No Algorithms &bull; Pure Signal
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {lowerGridVideos.map((video) => (
                <div
                  key={video.id}
                  onClick={() => setActiveModalVideo(video)}
                  className="group card-brand p-3.5 flex flex-col justify-between hover:border-[var(--accent-primary)] transition-all cursor-pointer"
                >
                  <div className="space-y-2.5">
                    <div className="relative aspect-[16/10] rounded-lg overflow-hidden bg-black">
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                        <div className="w-8 h-8 rounded-full bg-[var(--accent-primary)] text-white flex items-center justify-center pl-0.5 shadow">
                          <Play className="w-4 h-4 fill-current" />
                        </div>
                      </div>
                      <span className="absolute bottom-1 right-1 bg-black/80 px-1.5 py-0.5 rounded text-[9px] font-mono text-white font-bold">
                        {video.duration}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-muted)]">
                      <span className="text-[var(--accent-primary)] font-bold uppercase truncate pr-1">
                        {video.channelName}
                      </span>
                      <span>{video.publishedAt}</span>
                    </div>

                    <h4 className="font-serif font-bold text-xs sm:text-sm text-[var(--text-primary)] line-clamp-2 leading-snug group-hover:text-[var(--accent-primary)] transition-colors">
                      {video.title}
                    </h4>
                  </div>

                  <div className="pt-2 mt-2 border-t border-[var(--border-color)] flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[var(--text-muted)]">{video.viewsFormatted || "HD Masterclass"}</span>
                    <span className="text-[var(--accent-primary)] font-bold flex items-center">
                      <span>Watch</span>
                      <Maximize2 className="w-2.5 h-2.5 ml-1" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* 27-Channel Directory Modal */}
      {showChannelsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="fixed inset-0" onClick={() => setShowChannelsModal(false)} />
          
          <div className="relative w-full max-w-5xl max-h-[85vh] bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col">
            
            {/* Header */}
            <div className="p-5 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--bg-secondary)]">
              <div className="flex items-center space-x-3">
                <Radio className="w-5 h-5 text-[var(--accent-primary)]" />
                <div>
                  <h3 className="font-serif font-bold text-lg sm:text-xl text-[var(--text-primary)]">
                    27+ Curated Music Industry YouTube Channels & RSS Feeds
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] font-mono">
                    Verified channels and publishers delivering daily independent music intelligence.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowChannelsModal(false)}
                className="p-1.5 rounded-lg bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Channels Grid */}
            <div className="p-6 overflow-y-auto space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {CURATED_MEDIA_CHANNELS.map((ch) => (
                  <div
                    key={ch.id}
                    className="p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span className="text-[var(--accent-primary)] font-bold">{ch.handle}</span>
                        <span className="text-[10px] text-[var(--text-muted)] bg-[var(--bg-card)] px-2 py-0.5 rounded border border-[var(--border-color)]">
                          {ch.category}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-base text-[var(--text-primary)]">
                        {ch.name}
                      </h4>
                      <p className="text-xs text-[var(--text-secondary)] mt-1.5 leading-relaxed line-clamp-2">
                        {ch.description}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-[var(--border-color)] flex items-center justify-between text-xs font-mono">
                      <span className="text-[10px] text-[var(--text-muted)]">
                        {ch.subscribers ? `${ch.subscribers} Subs` : "Active Feed"}
                      </span>
                      <div className="flex items-center space-x-2">
                        {ch.rssFeedUrl && (
                          <a
                            href={ch.rssFeedUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded bg-[var(--bg-card)] text-amber-500 hover:text-amber-400"
                            title="RSS Feed"
                          >
                            <Rss className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <a
                          href={ch.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-red-600/10 text-red-500 hover:bg-red-600 hover:text-white transition-colors font-bold text-[11px]"
                        >
                          <span>YouTube</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[var(--border-color)] bg-[var(--bg-secondary)] text-center text-xs font-mono text-[var(--text-muted)]">
              All 27 channels are actively indexed in the Artist Daily News aggregation engine.
            </div>

          </div>
        </div>
      )}

      {/* Video Modal Player Dialog */}
      {activeModalVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-md animate-fadeIn">
          <div className="fixed inset-0" onClick={() => setActiveModalVideo(null)} />
          
          <div className="relative w-full max-w-4xl bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden shadow-2xl z-10 flex flex-col">
            {/* Modal Header */}
            <div className="p-4 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--bg-secondary)]">
              <div className="flex items-center space-x-2.5 truncate pr-4">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[var(--accent-primary)]">
                  {activeModalVideo.channelName}
                </span>
                <span className="text-[var(--border-highlight)]">|</span>
                <span className="text-sm font-bold text-[var(--text-primary)] truncate">
                  {activeModalVideo.title}
                </span>
              </div>
              <button
                onClick={() => setActiveModalVideo(null)}
                className="p-1.5 rounded-lg bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors shrink-0"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Video Player Iframe */}
            <div className="relative aspect-[16/9] w-full bg-black">
              <iframe
                src={`${activeModalVideo.embedUrl}?autoplay=1&rel=0`}
                title={activeModalVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* Modal Footer Notes */}
            <div className="p-5 space-y-3 bg-[var(--bg-card)]">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h3 className="font-serif font-bold text-lg text-[var(--text-primary)]">
                  {activeModalVideo.title}
                </h3>
                <a
                  href={activeModalVideo.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-bold bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors shrink-0 self-start"
                >
                  <span>Watch on YouTube</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                {activeModalVideo.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
