import { Metadata } from "next";
import { BreakingTicker } from "@/components/BreakingTicker";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { MOCK_ARTICLES } from "@/lib/mock-articles";
import { compileDailyNewsletterDigest } from "@/lib/ai-newsdesk";
import { Mail, Calendar } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ADN Daily Dispatch Newsletter Archive | Artist Daily News",
  description: "Browse recent editions of the Artist Daily News morning intelligence digest.",
};

export default function NewslettersPage() {
  const digest = compileDailyNewsletterDigest(MOCK_ARTICLES);

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] justify-between">
      <BreakingTicker articles={MOCK_ARTICLES} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 w-full">
        
        {/* Masthead */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center space-x-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--accent-primary)] px-3.5 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider">
            <Mail className="w-3.5 h-3.5" />
            <span>ADN Daily Dispatch &bull; Published Mon–Fri at 7 AM EST</span>
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-[var(--text-primary)]">
            Today&apos;s Morning Intelligence Edition
          </h1>
        </div>

        {/* Email Preview Container */}
        <div className="card-brand p-6 sm:p-10 space-y-6">
          <div className="border-b border-[var(--border-color)] pb-4 flex items-center justify-between text-xs text-[var(--text-muted)] font-mono">
            <span className="text-[var(--accent-primary)] font-bold">SUBJECT: {digest.subject}</span>
            <span className="flex items-center">
              <Calendar className="w-3 h-3 mr-1" /> Today
            </span>
          </div>

          <div className="space-y-6 divide-y divide-[var(--border-color)]">
            {MOCK_ARTICLES.slice(0, 5).map((art, idx) => (
              <div key={art.id} className="pt-6 first:pt-0 space-y-3">
                <div className="flex items-center space-x-2 text-xs font-mono text-[var(--accent-primary)] font-bold">
                  <span>0{idx + 1} //</span>
                  <span className="uppercase">{art.category}</span>
                  <span className="text-[var(--text-muted)]">&bull; {art.sourceName}</span>
                </div>

                <h3 className="font-serif text-xl font-bold text-[var(--text-primary)] hover:text-[var(--accent-primary)] transition-colors">
                  <Link href={`/news/${art.slug}`}>{art.title}</Link>
                </h3>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {art.summary}
                </p>

                <div className="bg-[var(--bg-secondary)] border-l-4 border-[var(--accent-primary)] p-3.5 rounded-r-lg text-xs text-[var(--text-primary)] leading-relaxed">
                  <strong className="text-[var(--accent-primary)]">💡 Why This Matters for DIY:</strong> {art.takeaway}
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
