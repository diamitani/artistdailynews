import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { AudioProvider } from "@/components/AudioContext";
import { AuthProvider } from "@/components/AuthContext";
import { AudioPlayerBar } from "@/components/AudioPlayerBar";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";

export const metadata: Metadata = {
  title: "Artist Daily News (ADN) — The Front Page of the Independent Music World",
  description:
    "Real-time music business intelligence, daily streaming royalty breakdowns, AI music tech updates, viral marketing playbooks, and official press pass accreditation for independent creators.",
  keywords: [
    "music business news",
    "independent artist",
    "music publishing",
    "streaming royalties",
    "spotify algorithm",
    "catalogue valuation",
    "music press pass",
    "artist grants",
  ],
  authors: [{ name: "Artist Daily News Editorial Desk" }],
  openGraph: {
    title: "Artist Daily News (ADN) — The Front Page of the Independent Music World",
    description: "Daily music business intelligence and actionable insights for independent musicians and indie labels.",
    url: "https://artistdailynews.com",
    siteName: "Artist Daily News",
    images: [
      {
        url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Artist Daily News (ADN)",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Artist Daily News (ADN)",
    description: "Daily music business intelligence for independent creators.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0000000000000000"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#090A0F] text-[#F4F4F6] antialiased selection:bg-[#D4FF00] selection:text-black">
        <AuthProvider>
          <AudioProvider>
            <ReadingProgressBar />
            <main className="flex-1 pb-20">{children}</main>
            <AudioPlayerBar />
            <Footer />
          </AudioProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
