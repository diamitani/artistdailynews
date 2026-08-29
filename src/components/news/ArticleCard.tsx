'use client';

import React from 'react';

interface ArticleCardProps {
  platform: string;
  sourceName?: string; // Add sourceName for the Follow feature
  mediaType: string;
  title: string;
  dek: string;
  whyItMatters: string;
  timestamp: string;
  url: string;
}

export function ArticleCard({ platform, sourceName = 'Unknown Source', mediaType, title, dek, whyItMatters, timestamp, url }: ArticleCardProps) {
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
    <div className="flex flex-col border border-[#D9D1C4] bg-[#F6F1E8] hover:border-[#111111] transition-colors relative group h-full">
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block p-4 flex-grow"
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
      
      {/* Source & Follow Bar */}
      <div className="px-4 py-2 border-t border-[#D9D1C4] bg-white flex justify-between items-center text-xs font-sans mt-auto">
        <span className="font-bold text-[#111111]/70 truncate max-w-[70%]">{sourceName}</span>
        <button 
          className="font-bold uppercase tracking-widest text-[#C1121F] hover:text-[#111111]"
          title="Follow this source in your Newsroom"
          onClick={(e) => {
            e.preventDefault();
            // Client-side action to insert into adn_user_sources goes here
            alert(`Followed ${sourceName}`);
          }}
        >
          + Follow
        </button>
      </div>
    </div>
  );
}
