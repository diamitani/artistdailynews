"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { useAuth } from "@/components/AuthContext";
import { Sparkles, Send, Bot, User, ArrowRight, ShieldCheck, HelpCircle, Compass } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: `### ⚡ Welcome to the ADN Music Business Intelligence Copilot

I am your 24/7 autonomous music business advisor. Ask me anything regarding:
- **Catalogue Valuation & NPS Multipliers**
- **Spotify for Artists Editorial Pitch Drafts**
- **Sample Clearance & Copyright Split Sheets**
- **Distributor Audits (DistroKid vs Symphonic vs AWAL)**
- **Festival Press Pass Accreditation Strategies**

Select a prompt below or type your inquiry to get started!`,
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const starterPrompts = [
    "What is the average catalogue multiplier for a 2018 indie master?",
    "Draft a Spotify for Artists editorial pitch for my indie pop single",
    "How do I clear a 4-bar vocal sample under fair use?",
    "What are the top 3 grant deadlines closing in the next 30 days?",
  ];

  const handleSend = async (textToSend?: string) => {
    const queryText = textToSend || input;
    if (!queryText.trim() || loading) return;

    const userMsg: Message = { role: "user", content: queryText };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      const data = await res.json();
      if (data.content) {
        setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Independent creators controlling both master sound recordings and publishing composition rights capture maximum equity yield. Try asking about catalogue multipliers or Spotify pitches!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#090A0F]">
      <Header />

      <main className="max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex-1 flex flex-col justify-between space-y-6">
        
        {/* Chat Header */}
        <div className="bg-[#121420] border border-[#272B3F] rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-xl">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#D4FF00]/10 border border-[#D4FF00]/30 flex items-center justify-center text-[#D4FF00]">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base font-bold text-white">ADN Music Business AI Copilot</h1>
                <span className="bg-emerald-500/10 text-emerald-400 text-[10px] font-mono font-bold px-2 py-0.2 rounded border border-emerald-500/20">
                  ONLINE
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">Trained on 2026 Q1 catalogue deals, DSP policies & legal splits</p>
            </div>
          </div>

          <span className="text-xs font-mono text-slate-500 hidden sm:inline">
            Tier: <strong className="text-[#D4FF00]">{user?.tier.toUpperCase()}</strong>
          </span>
        </div>

        {/* Message Stream */}
        <div className="flex-1 space-y-4 overflow-y-auto max-h-[60vh] pr-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start space-x-3 ${
                msg.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {msg.role === "assistant" && (
                <div className="w-8 h-8 rounded-lg bg-[#D4FF00]/10 border border-[#D4FF00]/30 flex items-center justify-center text-[#D4FF00] shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
              )}

              <div
                className={`max-w-2xl rounded-2xl p-5 text-xs sm:text-sm leading-relaxed shadow-lg ${
                  msg.role === "user"
                    ? "bg-[#D4FF00] text-black font-semibold rounded-tr-sm"
                    : "bg-[#141624] border border-[#2B2F44] text-slate-200 rounded-tl-sm space-y-2 whitespace-pre-line"
                }`}
              >
                {msg.content}
              </div>

              {msg.role === "user" && (
                <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-white shrink-0 mt-1">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex items-center space-x-3 text-xs font-mono text-slate-400 animate-pulse">
              <div className="w-8 h-8 rounded-lg bg-[#D4FF00]/10 flex items-center justify-center text-[#D4FF00]">
                <Bot className="w-4 h-4" />
              </div>
              <span>ADN Copilot is analyzing music business intelligence...</span>
            </div>
          )}
        </div>

        {/* Starter Suggestion Pills */}
        {messages.length < 3 && (
          <div className="space-y-2">
            <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500">
              Suggested Questions:
            </div>
            <div className="flex flex-wrap gap-2">
              {starterPrompts.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="px-3 py-1.5 bg-[#141624] hover:bg-slate-800 text-xs text-slate-300 hover:text-white rounded-xl border border-slate-800 transition-colors text-left"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Input Bar */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="relative bg-[#141624] border border-[#2B2F44] rounded-2xl p-2 flex items-center space-x-2 shadow-2xl"
        >
          <input
            type="text"
            placeholder="Ask about catalogue multiples, sample clearances, Spotify pitches..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent px-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="bg-[#D4FF00] hover:bg-[#bde600] text-black font-black p-2.5 rounded-xl transition-transform active:scale-95 disabled:opacity-40"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </main>
    </div>
  );
}
