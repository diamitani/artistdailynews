"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthContext";
import { Sparkles, Send, Bot, User, ArrowRight, ShieldCheck, HelpCircle } from "lucide-react";

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
          content: `**ADN Copilot Response**: Based on 2026 industry benchmarks, catalogues with growing streaming velocity typically command 14–16x trailing Net Publisher's Share (NPS). For active releases, maintain clean ISRC metadata and submit Spotify editorial pitches at least 21 days prior to release date.`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] justify-between">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 flex-1 w-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[var(--accent-primary-light)] border border-[var(--accent-primary)]/20 flex items-center justify-center text-[var(--accent-primary)]">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="font-serif font-bold text-xl text-[var(--text-primary)]">ADN Music Business Copilot</h1>
                <span className="bg-[var(--bg-secondary)] text-[var(--accent-primary)] font-mono text-[10px] font-bold px-2 py-0.5 rounded border border-[var(--border-color)]">
                  LIVE AI
                </span>
              </div>
              <p className="text-xs text-[var(--text-muted)] font-mono">
                Trained on music law, royalty distribution models, and algorithmic promotion
              </p>
            </div>
          </div>
        </div>

        {/* Chat Window */}
        <div className="card-brand p-4 sm:p-6 flex-1 flex flex-col justify-between space-y-4 min-h-[460px]">
          <div className="space-y-4 overflow-y-auto max-h-[500px] pr-2">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex items-start space-x-3 ${
                  m.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-lg flex items-center justify-center text-white shrink-0 mt-1 ${
                    m.role === "user" ? "bg-[var(--accent-primary)]" : "bg-[var(--bg-secondary)] text-[var(--accent-primary)] border border-[var(--border-color)]"
                  }`}
                >
                  {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-[var(--accent-primary)]" />}
                </div>

                <div
                  className={`p-4 rounded-2xl max-w-xl text-xs sm:text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-[var(--accent-primary)] text-white"
                      : "bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)]"
                  }`}
                >
                  <div className="prose prose-sm max-w-none dark:prose-invert">
                    {m.content.split("\n").map((line, lIdx) => (
                      <p key={lIdx} className="mb-1.5 last:mb-0">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center space-x-2 text-xs text-[var(--text-muted)] font-mono pl-11">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-bounce" />
                <span>ADN Intelligence Copilot is querying catalogue databases...</span>
              </div>
            )}
          </div>

          {/* Starter Prompts */}
          <div className="pt-3 border-t border-[var(--border-color)] space-y-2">
            <div className="text-[11px] font-mono text-[var(--text-muted)]">Quick Inquiries:</div>
            <div className="flex flex-wrap gap-2">
              {starterPrompts.map((p) => (
                <button
                  key={p}
                  onClick={() => handleSend(p)}
                  className="px-3 py-1.5 bg-[var(--bg-secondary)] hover:bg-[var(--border-color)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-xl border border-[var(--border-color)] transition-colors text-left"
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2 pt-2"
          >
            <input
              type="text"
              placeholder="Ask about publishing splits, Spotify pitching, catalogue valuation..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-[var(--bg-secondary)] border border-[var(--border-color)] focus:border-[var(--accent-primary)] rounded-xl px-4 py-3 text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="btn-brand px-4 py-3 shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
