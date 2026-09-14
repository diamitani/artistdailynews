import React from 'react';
import { ArticleCard } from '@/components/news/ArticleCard';
import { getArticles } from '@/lib/adn-db';

export default async function ArticlesPage({ searchParams }: { searchParams: Promise<{ pillar?: string, platform?: string }> }) {
  const filters: { label: string; param: "pillar" | "platform" | ""; value: string }[] = [
    { label: "All", param: "", value: "" },
    { label: "Streaming & Releases", param: "pillar", value: "culture" },
    { label: "Business", param: "pillar", value: "business" },
    { label: "Ideas", param: "pillar", value: "ideas" },
    { label: "Web", param: "platform", value: "web" },
    { label: "TikTok", param: "platform", value: "tiktok" },
    { label: "YouTube", param: "platform", value: "youtube" },
    { label: "Podcast", param: "platform", value: "podcast" },
    { label: "Instagram", param: "platform", value: "instagram" },
  ];
  
  // Await searchParams for Next.js 15
  const params = await searchParams;
  
  // Fetch from DB
  const fetchedArticles = await getArticles(60, params?.pillar, params?.platform);

  // Mock data for articles fallback
  const mockArticles = [
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

  const articlesToRender = fetchedArticles?.length > 0 
    ? fetchedArticles.map(a => ({
        platform: a.platform,
        mediaType: a.media_type,
        title: a.title,
        dek: a.dek || '',
        whyItMatters: a.why_it_matters || '',
        timestamp: new Date(a.freshness || a.ingested_at).toLocaleDateString(),
        url: a.url
      }))
    : mockArticles;

  return (
    <div>
      <div className="flex items-center justify-between border-b-2 border-[#111111] pb-4 mb-8">
        <h2 className="font-serif font-bold text-4xl text-[#111111]">Articles</h2>
        <div className="hidden md:flex space-x-2">
          {filters.map(f => (
            <a key={f.label} href={f.param ? `/news/articles?${f.param}=${f.value}` : `/news/articles`}
               className={`px-3 py-1 font-sans text-xs font-bold uppercase tracking-wider border ${((f.param === "pillar" && params?.pillar === f.value) || (f.param === "platform" && params?.platform === f.value) || (f.param === "" && !params?.pillar && !params?.platform)) ? 'bg-[#111111] text-[#F6F1E8] border-[#111111]' : 'border-[#D9D1C4] text-[#111111] hover:border-[#111111]'}`}>
              {f.label}
            </a>
          ))}
        </div>
      </div>
      
      {/* Mobile filter dropdown */}
      <div className="md:hidden mb-6">
        <select className="w-full border-2 border-[#111111] bg-[#F6F1E8] p-2 font-sans font-bold uppercase text-sm">
          {filters.map(f => <option key={f.label}>{f.label}</option>)}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {articlesToRender.map((article: any, idx: number) => (
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

