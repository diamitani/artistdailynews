"use client";

import { useState } from "react";
import { Ticket, ShieldCheck, QrCode, Camera } from "lucide-react";

export function PressBadgeGenerator() {
  const [name, setName] = useState("Alex Rivers");
  const [outlet, setOutlet] = useState("Artispreneur Media / ADN Field Unit");
  const [role, setRole] = useState("Concert Photojournalist");
  const [event, setEvent] = useState("SXSW 2026 Music Festival");
  const [location, setLocation] = useState("Austin, TX");
  const [badgeId, setBadgeId] = useState("ADN-8849-PASS");

  return (
    <div className="card-brand p-6 sm:p-8 space-y-8">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-5">
        <div>
          <div className="flex items-center space-x-2 text-[var(--accent-primary)] text-xs font-mono font-bold uppercase tracking-wider">
            <Ticket className="w-4 h-4" />
            <span>Official Credential Card Generator</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-[var(--text-primary)] mt-1">
            Live Digital Media Badge Preview
          </h2>
          <p className="text-xs text-[var(--text-muted)] font-mono">
            Preview how your verified credentials render on the official Artispreneur / ADN Field Pass lanyard
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left: Interactive Controls (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-mono text-[var(--text-secondary)] block mb-1">Accredited Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] focus:border-[var(--accent-primary)] rounded-lg p-2.5 text-xs text-[var(--text-primary)] focus:outline-none font-sans"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-[var(--text-secondary)] block mb-1">Media Role</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] focus:border-[var(--accent-primary)] rounded-lg p-2.5 text-xs text-[var(--text-primary)] focus:outline-none font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-mono text-[var(--text-secondary)] block mb-1">Target Festival / Event</label>
              <input
                type="text"
                value={event}
                onChange={(e) => setEvent(e.target.value)}
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] focus:border-[var(--accent-primary)] rounded-lg p-2.5 text-xs text-[var(--text-primary)] focus:outline-none font-sans"
              />
            </div>

            <div>
              <label className="text-xs font-mono text-[var(--text-secondary)] block mb-1">Event City/State</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-[var(--bg-secondary)] border border-[var(--border-color)] focus:border-[var(--accent-primary)] rounded-lg p-2.5 text-xs text-[var(--text-primary)] focus:outline-none font-sans"
              />
            </div>
          </div>

          <div className="p-4 bg-[var(--bg-secondary)] rounded-xl border border-[var(--border-color)] text-xs text-[var(--text-secondary)] space-y-2">
            <div className="flex items-center space-x-2 font-bold text-[var(--text-primary)]">
              <ShieldCheck className="w-4 h-4 text-[var(--accent-emerald)]" />
              <span>Official Verification Safeguards</span>
            </div>
            <p className="leading-relaxed">
              Every digital credential includes an active cryptographic QR code linking to our real-time editorial registry at <code className="text-[var(--accent-primary)]">artistdailynews.com/verify</code>.
            </p>
          </div>
        </div>

        {/* Right: Badge Lanyard Visual (6 cols) */}
        <div id="badge-preview" className="lg:col-span-6 flex justify-center">
          <div className="w-72 bg-gradient-to-b from-[#1C1917] via-[#292524] to-[#1C1917] border-2 border-[var(--accent-primary)]/50 rounded-3xl p-6 shadow-2xl text-white relative space-y-4">
            
            {/* Lanyard Hole */}
            <div className="w-16 h-3 bg-stone-900 border border-stone-700 rounded-full mx-auto shadow-inner" />

            {/* Header / Brand */}
            <div className="text-center space-y-1">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-stone-900 border border-amber-500/40 p-0.5 mb-1 mx-auto flex items-center justify-center">
                <img src="/artispreneur-logo.png" alt="Artispreneur" className="w-full h-full object-contain" />
              </div>
              <div className="text-[9px] font-mono tracking-widest text-[var(--accent-primary)] uppercase font-bold">
                PRESS PASS &bull; OFFICIAL ACCREDITATION
              </div>
              <div className="font-serif font-black text-sm tracking-tight text-white">
                ARTIST DAILY NEWS
              </div>
              <div className="text-[8px] font-mono text-stone-400 uppercase">
                An Artispreneur Media Property
              </div>
            </div>

            {/* Photo Avatar */}
            <div className="text-center">
              <div className="w-20 h-20 rounded-2xl mx-auto overflow-hidden bg-stone-800 border-2 border-[var(--accent-primary)] relative shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
                  alt="Press Photo"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-1 right-1 bg-black/80 p-1 rounded-full text-white">
                  <Camera className="w-3 h-3 text-[var(--accent-primary)]" />
                </div>
              </div>

              <h3 className="font-bold text-base text-white mt-2 leading-tight">{name}</h3>
              <span className="text-[10px] font-mono text-[var(--accent-primary)] font-bold uppercase tracking-wider block">
                {role}
              </span>
            </div>

            {/* Event Strip */}
            <div className="bg-black/60 p-3 rounded-xl border border-white/10 space-y-1 text-center font-mono">
              <div className="text-[9px] text-stone-400 uppercase">ASSIGNMENT EVENT:</div>
              <div className="text-xs font-bold text-white">{event}</div>
              <div className="text-[10px] text-stone-400">{location}</div>
            </div>

            {/* Footer QR & ID */}
            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[9px] font-mono text-stone-400">
              <div>
                <div>ID: <strong className="text-white">{badgeId}</strong></div>
                <div className="text-emerald-400">STATUS: VERIFIED</div>
              </div>
              <div className="p-1 bg-white rounded-md">
                <QrCode className="w-6 h-6 text-black" />
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
