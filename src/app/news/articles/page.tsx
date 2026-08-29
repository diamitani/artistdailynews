import React from 'react';
import { ArticleCard } from '@/components/news/ArticleCard';

export default function ArticlesPage() {
  const filters = ['All', 'Culture', 'Business', 'Ideas', 'Web', 'TikTok', 'YouTube', 'Podcast', 'Instagram'];

  // Mock data for articles
  const articles = [
    {
      platform: 'Web',
      mediaType: 'Article',
      title: 'Spotify announces new payout thresholds for independent artists',
      dek: 'The streaming giant is raising the minimum stream count required to generate royalties, a move that will heavily impact the long tail of independent creators.',
      whyItMatters: 'If you have a catalog of older tracks getting passive plays, they may no longer generate income.',
      timestamp: '2 hours ago',
      url: '#'
    },
    {
      platform: 'TikTok',
      mediaType: 'Social',
      title: 'The "Gritty Synth" trend is dominating the FYP',
      dek: 'A new micro-genre blending 80s synth with drill beats is the fastest growing sound this week.',
      whyItMatters: 'Consider this aesthetic if you are teasing a dark, high-energy track.',
      timestamp: '5 hours ago',
      url: '#'
    },
    {
      platform: 'Podcast',
      mediaType: 'Audio',
      title: 'Ari Herstand on building a touring business without an agent',
      dek: 'Practical tips on booking your own regional runs and routing efficiently to minimize overhead.',
      whyItMatters: 'Essential listening for artists planning their first 10-city run.',
      timestamp: 'Yesterday',
      url: '#'
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between border-b-2 border-[#111111] pb-4 mb-8">
        <h2 className="font-serif font-bold text-4xl text-[#111111]">Articles</h2>
        <div className="hidden md:flex space-x-2">
          {filters.map(f => (
            <button key={f} className={`px-3 py-1 font-sans text-xs font-bold uppercase tracking-wider border ${f === 'All' ? 'bg-[#111111] text-[#F6F1E8] border-[#111111]' : 'border-[#D9D1C4] text-[#111111] hover:border-[#111111]'}`}>
              {f}
            </button>
          ))}
        </div>
      </div>
      
      {/* Mobile filter dropdown (mocked) */}
      <div className="md:hidden mb-6">
        <select className="w-full border-2 border-[#111111] bg-[#F6F1E8] p-2 font-sans font-bold uppercase text-sm">
          {filters.map(f => <option key={f}>{f}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {articles.map((article, idx) => (
          <ArticleCard key={idx} {...article} />
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <button className="border-2 border-[#111111] text-[#111111] px-8 py-3 font-sans font-bold uppercase tracking-wide hover:bg-[#111111] hover:text-[#F6F1E8] transition-colors">
          Load More
        </button>
      </div>
    </div>
  );
}
