'use client';

import React from 'react';

interface LiveEvent {
  artist: string;
  venue: string;
  date: string; // ISO date string or formatted date
  genres: string[];
  ticketUrl: string;
}

interface LiveRailProps {
  city: string;
  events: LiveEvent[];
}

export function LiveRail({ city, events }: LiveRailProps) {
  if (!events || events.length === 0) {
    return null;
  }

  return (
    <div className="border-t-4 border-[#111111] pt-8 mb-12">
      <div className="flex justify-between items-end mb-6 border-b border-[#D9D1C4] pb-2">
        <h3 className="font-sans font-black text-2xl uppercase text-[#111111]">
          {city} Live Radar
        </h3>
        <span className="font-sans text-xs font-bold uppercase text-[#111111]/60">
          Powered by adn.scout
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {events.map((event, idx) => {
          const dateObj = new Date(event.date);
          const day = dateObj.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase();
          const date = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase();

          return (
            <div key={idx} className="flex border border-[#D9D1C4] bg-white group hover:border-[#111111] transition-colors">
              {/* Date Badge */}
              <div className="bg-[#111111] text-[#F6F1E8] flex flex-col items-center justify-center p-3 min-w-[70px]">
                <span className="font-sans text-xs font-bold uppercase">{day}</span>
                <span className="font-serif text-2xl font-bold">{date.split(' ')[1]}</span>
              </div>
              
              {/* Event Info */}
              <div className="p-3 flex-grow flex flex-col justify-center">
                <h4 className="font-serif text-lg font-bold text-[#111111] leading-tight group-hover:text-[#C0272D]">
                  {event.artist}
                </h4>
                <div className="flex items-center text-xs font-sans font-semibold text-[#111111]/70 mt-1 uppercase tracking-wider">
                  <span>📍 {event.venue}</span>
                </div>
              </div>
              
              {/* Action */}
              <div className="p-3 flex items-center justify-center border-l border-[#D9D1C4]">
                <a 
                  href={event.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xs font-bold uppercase text-[#C0272D] hover:underline"
                >
                  Tickets
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
