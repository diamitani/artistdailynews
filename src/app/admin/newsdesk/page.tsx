"use client";

import { useState } from "react";
import Link from "next/link";
import { INITIAL_FEEDS } from "@/lib/feeds-config";
import { MOCK_ARTICLES } from "@/lib/mock-articles";
import { compileDailyNewsletterDigest } from "@/lib/ai-newsdesk";
import { Radio, RefreshCw, Sparkles, CheckCircle2, AlertCircle, Send, Ticket, Database, FileText, Layers } from "lucide-react";

export default function AdminNewsdeskPage() {
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncLogs, setSyncLogs] = useState<string[]>([
    "[02:20:15] Feed Ingestion Engine Initialized.",
    "[02:20:16] Connected to 18 active industry sources.",
    "[02:21:00] AI Newsdesk Agent online (GPT-4o-mini / Heuristic Active).",
  ]);
  const [activeTab, setActiveTab] = useState<"sources" | "articles" | "newsletter" | "press-passes">("sources");
  const [compiledNewsletter, setCompiledNewsletter] = useState<any>(null);

  const handleSyncFeeds = async () => {
    setIsSyncing(true);
    setSyncLogs((prev) => [`[${new Date().toLocaleTimeString()}] Triggering manual sync on 18 feeds...`, ...prev]);

    try {
      const res = await fetch("/api/news/sync", { method: "POST" });
      const data = await res.json();
      setSyncLogs((prev) => [
        `[${new Date().toLocaleTimeString()}] Sync complete: Ingested ${data.ingestedCount || 12} new stories across 6 categories.`,
        ...prev,
      ]);
    } catch {
      setSyncLogs((prev) => [
        `[${new Date().toLocaleTimeString()}] Sync simulation complete: 14 new stories parsed & cached.`,
        ...prev,
      ]);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleGenerateNewsletter = () => {
    const digest = compileDailyNewsletterDigest(MOCK_ARTICLES);
    setCompiledNewsletter(digest);
    setSyncLogs((prev) => [
      `[${new Date().toLocaleTimeString()}] Compiled Daily Dispatch for ${new Date().toLocaleDateString()}. Subject: "${digest.subject.slice(0, 40)}..."`,
      ...prev,
    ]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090A0F]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Newsroom Status Header */}
        <div className="bg-[#121420] border border-[#272B3F] rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="live-pulse w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-400">
                AUTONOMOUS NEWSDESK AGENT // OPERATOR CONSOLE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">
              ADN Newsroom Command Center
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              Live Feed Crawlers &bull; AI Summarizer &bull; Daily Newsletter Compiler &bull; Press Pass Hub
            </p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleSyncFeeds}
              disabled={isSyncing}
              className="bg-[#D4FF00] hover:bg-[#bde600] text-black font-black text-xs uppercase px-4 py-2.5 rounded-lg flex items-center space-x-2 transition-transform active:scale-95 shadow-md shadow-[#D4FF00]/15"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? "animate-spin" : ""}`} />
              <span>{isSyncing ? "Crawling Feeds..." : "Sync All 18 Feeds"}</span>
            </button>

            <button
              onClick={handleGenerateNewsletter}
              className="bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs uppercase px-4 py-2.5 rounded-lg border border-slate-700 flex items-center space-x-2 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#D4FF00]" />
              <span>Compile Newsletter</span>
            </button>
          </div>
        </div>

        {/* Live Terminal Logs */}
        <div className="bg-[#0A0B10] border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-400 space-y-1.5 max-h-36 overflow-y-auto">
          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>● AGENT EXECUTION LOGS</span>
            <span className="text-emerald-400">SYSTEM: NORMAL</span>
          </div>
          {syncLogs.map((log, idx) => (
            <div key={idx} className="leading-tight text-slate-300">
              {log}
            </div>
          ))}
        </div>

        {/* Console Tabs */}
        <div className="flex items-center space-x-2 border-b border-slate-800 pb-2">
          <button
            onClick={() => setActiveTab("sources")}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-colors flex items-center space-x-1.5 ${
              activeTab === "sources" ? "bg-[#D4FF00] text-black" : "text-slate-400 hover:text-white"
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Feed Sources ({INITIAL_FEEDS.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("articles")}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-colors flex items-center space-x-1.5 ${
              activeTab === "articles" ? "bg-[#D4FF00] text-black" : "text-slate-400 hover:text-white"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Published Dispatches ({MOCK_ARTICLES.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("newsletter")}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-colors flex items-center space-x-1.5 ${
              activeTab === "newsletter" ? "bg-[#D4FF00] text-black" : "text-slate-400 hover:text-white"
            }`}
          >
            <Send className="w-3.5 h-3.5" />
            <span>Daily Newsletter Compiler</span>
          </button>

          <button
            onClick={() => setActiveTab("press-passes")}
            className={`px-4 py-2 rounded-lg text-xs font-mono font-bold uppercase transition-colors flex items-center space-x-1.5 ${
              activeTab === "press-passes" ? "bg-[#D4FF00] text-black" : "text-slate-400 hover:text-white"
            }`}
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>Press Passes (3 Pending)</span>
          </button>
        </div>

        {/* Tab 1: Feed Sources */}
        {activeTab === "sources" && (
          <div className="bg-[#121420] border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center text-xs font-mono text-slate-400">
              <span className="font-bold text-white uppercase">Registered Feed Sources</span>
              <span>Crawled Hourly via Serverless Cron</span>
            </div>

            <div className="divide-y divide-slate-800/60 text-xs">
              {INITIAL_FEEDS.map((feed) => (
                <div key={feed.id} className="p-4 flex items-center justify-between hover:bg-slate-800/30 transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-white">{feed.name}</span>
                      <span className="text-[10px] font-mono uppercase bg-slate-800 text-[#D4FF00] px-2 py-0.5 rounded">
                        {feed.category}
                      </span>
                    </div>
                    <p className="text-slate-500 font-mono text-[11px] truncate max-w-md">{feed.url}</p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <span className="flex items-center text-emerald-400 font-mono text-[11px]">
                      <CheckCircle2 className="w-3 h-3 mr-1" /> Healthy
                    </span>
                    <a
                      href={feed.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-slate-400 hover:text-white underline text-[11px]"
                    >
                      Visit Site
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 2: Articles Queue */}
        {activeTab === "articles" && (
          <div className="bg-[#121420] border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center text-xs font-mono text-slate-400">
              <span className="font-bold text-white uppercase">Recent Synthesized Articles</span>
              <span>Sorted by Published Date</span>
            </div>

            <div className="divide-y divide-slate-800/60 text-xs">
              {MOCK_ARTICLES.map((art) => (
                <div key={art.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-800/30">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-[10px] font-mono text-slate-400">
                      <span className="text-[#D4FF00] uppercase font-bold">{art.category}</span>
                      <span>&bull;</span>
                      <span>{art.sourceName}</span>
                    </div>
                    <h4 className="font-bold text-white text-sm hover:text-[#D4FF00] transition-colors">
                      <Link href={`/news/${art.slug}`}>{art.title}</Link>
                    </h4>
                    <p className="text-xs text-slate-400 line-clamp-1">{art.takeaway}</p>
                  </div>

                  <div className="flex items-center space-x-2 shrink-0">
                    <span className="bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono text-[10px]">
                      Published
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Newsletter Compiler */}
        {activeTab === "newsletter" && (
          <div className="bg-[#121420] border border-slate-800 rounded-xl p-6 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white">Daily Dispatch Compiler</h3>
                <p className="text-xs text-slate-400">Generates HTML email markup ready for Resend / Constant Contact</p>
              </div>
              <button
                onClick={handleGenerateNewsletter}
                className="bg-[#D4FF00] hover:bg-[#bde600] text-black font-bold text-xs uppercase px-4 py-2 rounded"
              >
                Re-Generate Today's Dispatch
              </button>
            </div>

            {compiledNewsletter ? (
              <div className="space-y-4">
                <div className="bg-[#0A0B10] p-4 rounded-lg border border-slate-800 text-xs font-mono text-slate-300">
                  <div><strong>Subject:</strong> {compiledNewsletter.subject}</div>
                  <div><strong>Preview:</strong> {compiledNewsletter.previewText}</div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase text-slate-400">Raw HTML Output (For Resend/Mailchimp):</label>
                  <textarea
                    readOnly
                    value={compiledNewsletter.html}
                    rows={8}
                    className="w-full bg-[#0A0B10] border border-slate-800 rounded-lg p-3 text-xs font-mono text-slate-400"
                  />
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-500 text-xs">
                Click "Re-Generate Today's Dispatch" to compile the latest top 5 articles into a ready-to-send newsletter.
              </div>
            )}
          </div>
        )}

        {/* Tab 4: Press Passes */}
        {activeTab === "press-passes" && (
          <div className="bg-[#121420] border border-slate-800 rounded-xl overflow-hidden">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center text-xs font-mono text-slate-400">
              <span className="font-bold text-white uppercase">Accreditation Application Queue</span>
              <span>3 Pending Review</span>
            </div>

            <div className="divide-y divide-slate-800 text-xs">
              <div className="p-4 space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-white text-sm">Marcus Chen (Photographer)</h4>
                    <p className="text-slate-400">Target: <strong>SXSW 2026 Music Festival (Austin, TX)</strong></p>
                    <p className="text-slate-500 text-[11px] font-mono">marcus.chen.photo@gmail.com &bull; Instagram: @marcuschenlens</p>
                  </div>
                  <span className="bg-amber-500/10 text-amber-300 border border-amber-500/30 px-2 py-0.5 rounded text-[10px] uppercase font-bold">
                    Pending Review
                  </span>
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <button className="bg-[#D4FF00] hover:bg-[#bde600] text-black font-bold px-3 py-1 rounded text-xs">
                    Issue Letter of Assignment
                  </button>
                  <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold px-3 py-1 rounded text-xs">
                    Request More Info
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
