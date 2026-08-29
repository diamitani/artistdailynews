import React from 'react';

interface ArticleCardProps {
  platform: string;
  mediaType: string;
  title: string;
  dek: string;
  whyItMatters: string;
  timestamp: string;
  url: string;
}

export function ArticleCard({ platform, mediaType, title, dek, whyItMatters, timestamp, url }: ArticleCardProps) {
  // Map platforms to glyphs or short text
  const platformGlyphs: Record<string, string> = {
    web: '🌐',
    youtube: '▶️',
    tiktok: '🎵',
    instagram: '📸',
    x: '🐦',
    podcast: '🎙️',
    email: '✉️'
  };

  const glyph = platformGlyphs[platform.toLowerCase()] || '📄';

  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block group border border-[#D9D1C4] bg-[#F6F1E8] p-4 hover:border-[#111111] transition-colors"
    >
      <div className="flex items-center space-x-2 text-[12px] font-sans font-medium text-[#111111]/70 mb-2 uppercase tracking-wide">
        <span>{glyph}</span>
        <span>{platform}</span>
        <span>·</span>
        <span>{mediaType}</span>
        <span className="ml-auto text-[#111111]/50">{timestamp}</span>
      </div>
      <h3 className="font-serif text-lg leading-snug font-bold text-[#111111] group-hover:text-[#C1121F] mb-1">
        {title}
      </h3>
      {dek && (
        <p className="font-sans text-sm text-[#111111]/80 mb-3 line-clamp-2">
          {dek}
        </p>
      )}
      {whyItMatters && (
        <div className="pt-2 border-t border-[#D9D1C4] mt-auto">
          <p className="font-sans text-xs font-semibold text-[#111111]">
            <span className="text-[#C1121F]">Why it matters: </span>
            {whyItMatters}
          </p>
        </div>
      )}
    </a>
  );
}
