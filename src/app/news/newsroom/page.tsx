import React from 'react';
import { ArticleCard } from '@/components/news/ArticleCard';
import { LiveRail } from '@/components/news/LiveRail';
import { getNewsroomForUser } from '@/lib/adn-db';

// Using a mock auth user id for now until standard auth is wired
const MOCK_USER_ID = "00000000-0000-0000-0000-000000000000";

export default async function NewsroomPage() {
  const newsroom = await getNewsroomForUser(MOCK_USER_ID);

  const currentDate = newsroom?.created_for_date 
    ? new Date(newsroom.created_for_date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
    : new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

  // Mock personalized items fallback
  const mockItems = [
    {
      platform: 'Web',
      mediaType: 'Article',
      title: 'Chicago\'s Radius announces fall lineup',
      dek: 'The premier independent venue has booked a heavy electronic and hip-hop autumn schedule.',
      whyItMatters: 'Relevant to your city and genre. Great opportunity to network at these specific shows.',
      timestamp: '12 hours ago',
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
      title: 'Super Duty Tough Work: Indie hip-hop longevity',
      dek: 'Blueprint breaks down how he maintains a sustainable career touring secondary markets.',
      whyItMatters: 'Direct playbook for building a releasing and touring hip-hop career outside the major label system.',
      timestamp: '2 days ago',
      url: '#'
    },
  ];

  const itemsToRender = newsroom?.items?.length > 0
    ? newsroom.items.map((item: any) => ({
        platform: item.platform,
        mediaType: item.media_type || 'Article',
        title: item.title,
        dek: item.dek || '',
        whyItMatters: item.why_it_matters || item.why_this_is_for_you || '',
        timestamp: new Date().toLocaleDateString(), // simplified
        url: item.url
      }))
    : mockItems;

  // Mock Chicago Live Rail Data
  const mockLiveEvents = [
    {
      artist: 'Saba',
      venue: 'Radius',
      date: new Date(Date.now() + 86400000 * 3).toISOString(), // +3 days
      genres: ['hip-hop'],
      ticketUrl: '#'
    },
    {
      artist: 'DJ Seinfeld',
      venue: 'Smartbar',
      date: new Date(Date.now() + 86400000 * 5).toISOString(), // +5 days
      genres: ['electronic'],
      ticketUrl: '#'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      {/* Personalized Greeting Header */}
      <div className="bg-[#111111] text-[#F6F1E8] p-8 mb-12">
        <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Patrick's Newsroom</h2>
        <div className="flex flex-wrap gap-2 font-sans text-xs font-bold uppercase tracking-widest text-[#C1121F]">
          <span className="bg-[#F6F1E8] px-2 py-1">Chicago</span>
          <span className="bg-[#F6F1E8] px-2 py-1">Hip-hop / EDM</span>
          <span className="bg-[#F6F1E8] px-2 py-1">Releasing</span>
        </div>
        <p className="mt-6 font-sans text-lg opacity-90 max-w-2xl">
          A brief dedicated to you. Genre, city, and career stage. Shareable with your friends and network.
        </p>
      </div>
      
      {/* Live Rail Component */}
      <LiveRail city="Chicago" events={mockLiveEvents} />

      <div className="flex justify-between items-end border-b-2 border-[#111111] pb-4 mb-8">
        <h3 className="font-sans font-black text-2xl uppercase text-[#111111]">
          Your 7 · {currentDate}
        </h3>
        <button className="font-sans text-sm font-bold uppercase text-[#C1121F] hover:underline flex items-center space-x-1">
          <span>🔗 Share this Newsroom</span>
        </button>
      </div>

      <div className="space-y-6">
        {itemsToRender.map((item: any, idx: number) => (
          <ArticleCard key={idx} {...item} />
        ))}
      </div>

      <div className="mt-12 bg-[#F6F1E8] border-2 border-[#D9D1C4] p-6 text-center">
        <h4 className="font-serif text-xl font-bold text-[#111111] mb-2">Update your preferences</h4>
        <p className="font-sans text-sm text-[#111111]/70 mb-4">
          Change your city, genres, or career stage to adjust what appears in your digest.
        </p>
        <button className="border border-[#111111] text-[#111111] px-6 py-2 font-sans font-bold uppercase text-sm hover:bg-[#D9D1C4] transition-colors">
          Settings
        </button>
      </div>
    </div>
  );
}

