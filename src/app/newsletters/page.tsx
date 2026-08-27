import { Metadata } from "next";
import { Header } from "@/components/Header";
import { BreakingTicker } from "@/components/BreakingTicker";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { MOCK_ARTICLES } from "@/lib/mock-articles";
import { compileDailyNewsletterDigest } from "@/lib/ai-newsdesk";
import { Mail, Sparkles, Calendar, CheckCircle2, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ADN Daily Dispatch Newsletter Archive | Artist Daily News",
  description: "Browse recent editions of the Artist Daily News morning intelligence digest.",
};

export default function NewslettersPage() {
  const digest = compileDailyNewsletterDigest(MOCK_ARTICLES);

  return (
    <div className="min-h-screen flex flex-col bg-[#090A0F]">
      <Header />
      <BreakingTicker articles={MOCK_ARTICLES} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        
        {/* Masthead */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-[#D4FF00]/10 border border-[#D4FF00]/30 text-[#D4FF00] px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            <span>ADN Daily Dispatch &bull; Published Mon–Fri at 7 AM EST</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white">
            Today's Morning Intelligence Edition
          </h1>
        </div>

        {/* Email Preview Container */}
        <div className="bg-[#121420] border border-[#272B3F] rounded-2xl p-6 sm:p-10 shadow-2xl space-y-6">
          <div className="border-b border-slate-800 pb-4 flex items-center justify-between text-xs text-slate-400 font-mono">
            <span className="text-[#D4FF00] font-bold">SUBJECT: {digest.subject}</span>
            <span className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" /> Today
            </span>
          </div>

          <div className="space-y-6 divide-y divide-slate-800/80">
            {MOCK_ARTICLES.slice(0, 5).map((art, idx) => (
              <div key={art.id} className="pt-6 first:pt-0 space-y-3">
                <div className="flex items-center space-x-2 text-xs font-mono text-[#D4FF00] font-bold">
                  <span>0{idx + 1} //</span>
                  <span className="uppercase">{art.category}</span>
                  <span className="text-slate-500">&bull; {art.sourceName}</span>
                </div>

                <h3 className="text-lg font-bold text-white hover:text-[#D4FF00] transition-colors">
                  <Link href={`/news/${art.slug}`}>{art.title}</Link>
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {art.summary}
                </p>

                <div className="bg-[#0A0B10] border-l-2 border-[#D4FF00] p-3 rounded-r-lg text-xs text-slate-200">
                  <strong className="text-[#D4FF00]">💡 Why This Matters for DIY:</strong> {art.takeaway}
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

      <NewsletterSignup />
    </div>
  );
}
