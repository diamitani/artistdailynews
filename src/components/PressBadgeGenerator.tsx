"use client";

import { useState } from "react";
import { Ticket, ShieldCheck, Download, Sparkles, QrCode, Camera } from "lucide-react";

export function PressBadgeGenerator() {
  const [name, setName] = useState("Alex Rivers");
  const [outlet, setOutlet] = useState("Artispreneur Media / ADN Field Unit");
  const [role, setRole] = useState("Concert Photojournalist");
  const [event, setEvent] = useState("SXSW 2026 Music Festival");
  const [location, setLocation] = useState("Austin, TX");
  const [badgeId, setBadgeId] = useState("ADN-8849-PASS");

  return (
    <div className="bg-[#121420] border border-[#272B3F] rounded-2xl p-6 sm:p-8 space-y-8 shadow-2xl">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
        <div>
          <div className="flex items-center space-x-2 text-[#D4FF00] text-xs font-mono font-bold uppercase tracking-wider">
            <Ticket className="w-4 h-4" />
            <span>Official Credential Card Generator</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
            Live Digital Media Badge Preview
          </h2>
          <p className="text-xs text-slate-400 font-mono">
            Preview how your verified credentials render on the official Artispreneur / ADN Field Pass lanyard
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Interactive Controls (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">Accredited Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[#0A0B10] border border-slate-700 focus:border-[#D4FF00] rounded-lg p-2.5 text-xs text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">Media Role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-[#0A0B10] border border-slate-700 focus:border-[#D4FF00] rounded-lg p-2.5 text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">Target Festival / Event</label>
              <input
                type="text"
                value={event}
                onChange={(e) => setEvent(e.target.value)}
                className="w-full bg-[#0A0B10] border border-slate-700 focus:border-[#D4FF00] rounded-lg p-2.5 text-xs text-white focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-slate-400 block mb-1">Event City / Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-[#0A0B10] border border-slate-700 focus:border-[#D4FF00] rounded-lg p-2.5 text-xs text-white focus:outline-none"
              />
            </div>
          </div>

          <div className="p-4 bg-[#0A0B10] rounded-xl border border-slate-800 text-xs text-slate-400 space-y-1.5 font-mono">
            <span className="text-[#D4FF00] font-bold block flex items-center">
              <ShieldCheck className="w-3.5 h-3.5 mr-1" /> Artispreneur Letter of Assignment Verification:
            </span>
            <p className="text-[11px] leading-relaxed">
              Upon approval, this digital badge is paired with an official signed PDF Letter of Assignment from Artispreneur.com sent directly to festival PR teams.
            </p>
          </div>
        </div>

        {/* Right: Rendered Holographic Pass Card (6 cols) */}
        <div className="lg:col-span-6 flex justify-center">
          <div className="w-72 sm:w-80 bg-gradient-to-b from-[#181B2B] via-[#0E1018] to-[#0A0B10] border-2 border-amber-500/40 rounded-3xl p-5 shadow-2xl relative overflow-hidden text-center space-y-4">
            
            {/* Lanyard Hole Clip */}
            <div className="w-16 h-3 bg-slate-900 border border-slate-700 rounded-full mx-auto shadow-inner" />

            {/* Top Masthead with Artispreneur Laurel Logo */}
            <div className="border-b border-slate-800 pb-3 flex flex-col items-center">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-900 border border-amber-500/40 p-0.5 mb-1">
                <img src="/artispreneur-logo.png" alt="" className="w-full h-full object-contain" />
              </div>
              <div className="flex items-center justify-center space-x-1 font-black text-sm text-white tracking-widest uppercase">
                <span>ARTIST DAILY</span>
                <span className="text-[#D4FF00]">NEWS</span>
              </div>
              <span className="text-[8px] font-mono text-amber-400 uppercase tracking-widest block mt-0.5">
                Artispreneur.com Accredited
              </span>
            </div>

            {/* Holographic Access Tier Bar */}
            <div className="bg-gradient-to-r from-amber-400 via-[#D4FF00] to-emerald-400 text-black font-black text-xs uppercase tracking-widest py-1 rounded shadow-md">
              ★ ALL-ACCESS MEDIA PIT ★
            </div>

            {/* Avatar & Info */}
            <div className="space-y-2">
              <div className="w-20 h-20 rounded-2xl mx-auto overflow-hidden bg-slate-800 border-2 border-amber-400/60 relative shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
                  alt="Correspondent"
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h3 className="font-black text-base text-white">{name}</h3>
                <p className="text-xs font-mono text-[#D4FF00] font-bold">{role}</p>
                <p className="text-[10px] text-slate-400 font-mono mt-0.5">{outlet}</p>
              </div>
            </div>

            {/* Event Details */}
            <div className="bg-[#12141F] border border-slate-800 p-2.5 rounded-xl space-y-0.5 text-xs">
              <div className="font-bold text-white text-[11px] truncate">{event}</div>
              <div className="text-[10px] text-slate-400 font-mono">{location} &bull; 2026</div>
            </div>

            {/* QR Code & Security Number */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between px-2 text-[10px] font-mono text-slate-400">
              <div className="text-left">
                <span className="text-slate-500 block text-[8px]">VALIDATED ID:</span>
                <span className="text-amber-400 font-bold">{badgeId}</span>
              </div>
              <QrCode className="w-8 h-8 text-white" />
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
