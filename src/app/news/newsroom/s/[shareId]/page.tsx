import React from 'react';
import { ArticleCard } from '@/components/news/ArticleCard';
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';
const adnDb = createClient(supabaseUrl, supabaseKey);

export default async function NewsroomSharePage({ params }: { params: Promise<{ shareId: string }> }) {
  // Await params for Next.js 15
  const resolvedParams = await params;
  
  // Fetch the share record
  const { data: share, error: shareError } = await adnDb
    .from('adn_shares')
    .select(`
      *,
      newsroom:newsroom_id (
        *,
        user:user_id (name)
      )
    `)
    .eq('share_url_id', resolvedParams.shareId)
    .single();

  if (shareError || !share) {
    return (
      <div className="max-w-4xl mx-auto text-center py-24">
        <h2 className="font-serif text-3xl text-[#111111]">This Newsroom snapshot has expired or does not exist.</h2>
      </div>
    );
  }

  const newsroom = share.newsroom;
  const userName = newsroom.user?.name || 'Artist';
  const currentDate = new Date(newsroom.created_for_date || Date.now()).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  const itemsToRender = newsroom.items?.map((item: any) => ({
    platform: item.platform,
    mediaType: item.media_type || 'Article',
    title: item.title,
    dek: item.dek || '',
    whyItMatters: item.why_it_matters || item.why_this_is_for_you || '',
    timestamp: new Date().toLocaleDateString(),
    url: item.url
  })) || [];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Share Card Header */}
      <div className="bg-[#111111] text-[#F6F1E8] p-8 mb-12 text-center border-b-8 border-[#C1121F]">
        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">{userName}'s ADN · {currentDate}</h2>
        <p className="font-sans text-lg opacity-90 max-w-2xl mx-auto">
          A personalized daily brief from Artist Daily News. 
        </p>
        <ul className="mt-6 font-sans text-sm max-w-xl mx-auto space-y-2 text-left opacity-90 list-disc list-inside">
          <li>Custom curated based on genre and city.</li>
          <li>Zero label spin. Actionable industry updates.</li>
          <li>Designed for independent artists running a business.</li>
        </ul>
      </div>

      <div className="flex justify-between items-end border-b-2 border-[#111111] pb-4 mb-8">
        <h3 className="font-sans font-black text-2xl uppercase text-[#111111]">
          {userName}'s 7 Items
        </h3>
      </div>

      <div className="space-y-6">
        {itemsToRender.map((item: any, idx: number) => (
          <ArticleCard key={idx} {...item} />
        ))}
      </div>

      <div className="mt-12 bg-[#F6F1E8] border-2 border-[#D9D1C4] p-6 text-center">
        <h4 className="font-serif text-xl font-bold text-[#111111] mb-2">Build your own Newsroom</h4>
        <p className="font-sans text-sm text-[#111111]/70 mb-4">
          Join Artispreneur to get a personalized daily brief for your career stage.
        </p>
        <a href="/news" className="inline-block bg-[#111111] text-[#F6F1E8] px-8 py-3 font-sans font-bold uppercase tracking-wide hover:bg-[#C1121F] transition-colors">
          Get Started
        </a>
      </div>
    </div>
  );
}
