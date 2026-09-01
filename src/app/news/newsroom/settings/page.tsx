'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function NewsroomSettingsPage() {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  // Mock form state
  const [formData, setFormData] = useState({
    city: 'Chicago',
    genres: 'Hip-hop, EDM',
    careerStage: 'Releasing',
    incomeMix: 'Streaming, Live',
    platforms: 'Spotify, TikTok, Instagram'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call to save to Supabase user profile
    await new Promise(resolve => setTimeout(resolve, 800));
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-8">
        <Link href="/news/newsroom" className="font-sans text-sm font-bold uppercase tracking-widest text-[#111111]/70 hover:text-[#C0272D]">
          ← Back to Newsroom
        </Link>
      </div>

      <h2 className="font-serif text-4xl font-bold text-[#111111] mb-2">Newsroom Preferences</h2>
      <p className="font-sans text-[#111111]/80 mb-8 border-b border-[#D9D1C4] pb-6">
        Update your career details. Our agents use this to curate the exact news, deals, and opportunities you need to see.
      </p>

      {saved && (
        <div className="bg-[#111111] text-[#F6F1E8] px-4 py-3 mb-6 font-sans font-bold uppercase tracking-widest text-sm text-center">
          Preferences Saved
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block font-sans font-bold text-sm uppercase text-[#111111] mb-2">City / Tour Markets</label>
          <input 
            type="text" 
            value={formData.city}
            onChange={(e) => setFormData({...formData, city: e.target.value})}
            className="w-full border-2 border-[#111111] bg-[#F6F1E8] p-3 font-sans"
            placeholder="e.g. Chicago, London, Global" 
          />
        </div>

        <div>
          <label className="block font-sans font-bold text-sm uppercase text-[#111111] mb-2">Genres</label>
          <input 
            type="text" 
            value={formData.genres}
            onChange={(e) => setFormData({...formData, genres: e.target.value})}
            className="w-full border-2 border-[#111111] bg-[#F6F1E8] p-3 font-sans"
            placeholder="e.g. Indie, Hip-hop, Pop" 
          />
        </div>

        <div>
          <label className="block font-sans font-bold text-sm uppercase text-[#111111] mb-2">Career Stage</label>
          <select 
            value={formData.careerStage}
            onChange={(e) => setFormData({...formData, careerStage: e.target.value})}
            className="w-full border-2 border-[#111111] bg-[#F6F1E8] p-3 font-sans"
          >
            <option>Unreleased</option>
            <option>Releasing</option>
            <option>Touring</option>
            <option>Catalog</option>
          </select>
        </div>

        <div>
          <label className="block font-sans font-bold text-sm uppercase text-[#111111] mb-2">Primary Income Mix</label>
          <input 
            type="text" 
            value={formData.incomeMix}
            onChange={(e) => setFormData({...formData, incomeMix: e.target.value})}
            className="w-full border-2 border-[#111111] bg-[#F6F1E8] p-3 font-sans"
            placeholder="e.g. Streams, Live, Sync, Merch" 
          />
        </div>

        <div>
          <label className="block font-sans font-bold text-sm uppercase text-[#111111] mb-2">Platforms You Use</label>
          <input 
            type="text" 
            value={formData.platforms}
            onChange={(e) => setFormData({...formData, platforms: e.target.value})}
            className="w-full border-2 border-[#111111] bg-[#F6F1E8] p-3 font-sans"
            placeholder="e.g. TikTok, Spotify, Patreon" 
          />
        </div>

        <div className="pt-6 border-t border-[#D9D1C4]">
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-[#C0272D] text-[#F6F1E8] px-6 py-4 font-sans font-bold uppercase tracking-wide hover:bg-red-800 transition-colors disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Preferences'}
          </button>
        </div>
      </form>
    </div>
  );
}
