"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { BreakingTicker } from "@/components/BreakingTicker";
import { PressPassModal } from "@/components/PressPassModal";
import { PressBadgeGenerator } from "@/components/PressBadgeGenerator";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { MOCK_ARTICLES } from "@/lib/mock-articles";
import { Ticket, ShieldCheck, Camera, Newspaper, Video, Award, CheckCircle2, ArrowRight, Download, Sparkles } from "lucide-react";

export default function PressPassPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-[#090A0F]">
      <Header />
      <BreakingTicker articles={MOCK_ARTICLES} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
        
        {/* Hero */}
        <div className="bg-gradient-to-br from-[#131522] via-[#10121C] to-[#0A0B10] border border-[#2D3145] rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="max-w-3xl space-y-6 relative z-10">
            <div className="inline-flex items-center space-x-2 bg-[#D4FF00]/10 border border-[#D4FF00]/30 text-[#D4FF00] px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
              <Ticket className="w-3.5 h-3.5" />
              <span>Official Press & Media Accreditation Hub</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
              Get Official Press Passes to Festivals, Summits & Tours.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              As an accredited correspondent for <strong>Artist Daily News</strong>, you gain legitimate credentials to cover music festivals (SXSW, Rolling Loud, Coachella), industry conferences (A2IM Indie Week, ADE), and major label tour stops worldwide.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => setModalOpen(true)}
                className="bg-[#D4FF00] hover:bg-[#bde600] text-black font-black text-xs uppercase tracking-wider px-7 py-3.5 rounded-lg transition-transform active:scale-95 flex items-center space-x-2 shadow-xl shadow-[#D4FF00]/15"
              >
                <span>Apply for Credentials</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#badge-preview"
                className="bg-slate-800/80 hover:bg-slate-700 text-slate-200 font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-lg border border-slate-700 transition-colors flex items-center space-x-2"
              >
                <Sparkles className="w-4 h-4 text-[#D4FF00]" />
                <span>Customize Digital Badge</span>
              </a>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#12141F] border border-[#272A38] rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4FF00]/10 border border-[#D4FF00]/30 flex items-center justify-center text-[#D4FF00]">
              <Camera className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Photo Pit & Media Access</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Access the exclusive photo pit (first 3 songs) and backstage media lounge with an authorized letter of assignment from ADN Editorial.
            </p>
          </div>

          <div className="bg-[#12141F] border border-[#272A38] rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Newspaper className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Published Editorial Bylines</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Your interviews, concert photo galleries, and album reviews are published on ArtistDailyNews.com and indexed across Google News.
            </p>
          </div>

          <div className="bg-[#12141F] border border-[#272A38] rounded-2xl p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-white text-base">Instant Creator Credibility</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Elevate your personal artist or media brand from DIY amateur to a recognized music journalist with verified press credentials.
            </p>
          </div>
        </div>

        {/* Live Digital Credential Badge Visualizer */}
        <div id="badge-preview">
          <PressBadgeGenerator />
        </div>

        {/* Verification & Accreditation Criteria */}
        <div className="bg-[#12141F] border border-[#272A38] rounded-2xl p-8 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-xl font-bold text-white">Editorial Accreditation Guidelines</h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">How ADN evaluates press pass applications</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-slate-300">
            <div className="space-y-3">
              <h4 className="font-mono text-[#D4FF00] font-bold uppercase tracking-wider">Required Submission Materials:</h4>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4FF00] shrink-0 mt-0.5" />
                  <span>Active portfolio, Instagram handle, or published writing sample.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4FF00] shrink-0 mt-0.5" />
                  <span>Target event name, city, dates, and PR contact email if available.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-[#D4FF00] shrink-0 mt-0.5" />
                  <span>Short 2-sentence coverage plan (e.g. photo gallery, artist interview).</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <h4 className="font-mono text-[#D4FF00] font-bold uppercase tracking-wider">Post-Event Deliverable:</h4>
              <p className="leading-relaxed text-slate-400">
                In exchange for the official Letter of Assignment, correspondents agree to submit 3–5 high-res photos or a 400-word written event recap to the ADN Newsroom within 72 hours of the event's conclusion.
              </p>
              <div className="p-3 bg-[#0A0B10] rounded-lg border border-slate-800 font-mono text-[11px] text-slate-400">
                Editorial Inquiries: <strong className="text-white">press@artistdailynews.com</strong>
              </div>
            </div>
          </div>
        </div>

      </main>

      <NewsletterSignup />

      <PressPassModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
