import type { Metadata } from "next";
import { Newsreader, Inter, JetBrains_Mono, Geist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { AudioProvider } from "@/components/AudioContext";
import { AuthProvider } from "@/components/AuthContext";
import { AudioPlayerBar } from "@/components/AudioPlayerBar";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { cn } from "@/lib/utils";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif-headline",
  display: "swap",
});

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Artist Daily News — Powered by Artispreneur | Music Business Intelligence",
    template: "%s | Artist Daily News (ADN) · Powered by Artispreneur",
  },
  description:
    "Join 35,000+ independent artists, managers, and labels. Daily music business intelligence, streaming royalty calculators, catalogue valuation data, AI copilot, press credentials, and exclusive partner deals.",
  keywords: [
    "music business news",
    "independent artist platform",
    "music publishing",
    "streaming royalties",
    "spotify algorithm",
    "catalogue valuation",
    "music press pass",
    "artist grants",
    "music industry intelligence",
    "artispreneur",
  ],
  authors: [{ name: "Artispreneur Editorial Board", url: "https://artistdailynews.com" }],
  creator: "Artispreneur Media Network",
  publisher: "Artispreneur Publishing",
  metadataBase: new URL("https://artistdailynews.com"),
  alternates: {
    canonical: "https://artistdailynews.com",
    types: {
      "application/rss+xml": "https://artistdailynews.com/api/news/feed?format=rss",
    },
  },
  openGraph: {
    title: "Artispreneur — The Intelligence Platform for Independent Music Professionals",
    description:
      "Daily music business intelligence, streaming benchmarks, catalogue data, and DIY strategy for independent creators.",
    url: "https://artistdailynews.com",
    siteName: "Artispreneur · Artist Daily News",
    images: [
      {
        url: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Artispreneur · Artist Daily News",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Artispreneur · Artist Daily News",
    description: "Daily music business intelligence for independent creators and indie labels.",
    site: "@artistdailynews",
    creator: "@artispreneur",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Global JSON-LD Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "NewsMediaOrganization",
    name: "Artist Daily News",
    alternateName: ["ADN", "Artispreneur"],
    url: "https://artistdailynews.com",
    logo: "https://artistdailynews.com/artispreneur-logo.png",
    sameAs: [
      "https://artispreneur.com",
      "https://twitter.com/artistdailynews",
    ],
    publishingPrinciples: "https://artistdailynews.com/press-pass",
    foundingDate: "2024",
    parentOrganization: {
      "@type": "Organization",
      name: "Artispreneur Media Network",
      url: "https://artispreneur.com",
    },
  };

  return (
    <html lang="en" className={cn("light", newsreader.variable, jetbrainsMono.variable, "font-sans", geist.variable)}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-0000000000000000"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen flex flex-col font-sans antialiased">
        <AuthProvider>
          <AudioProvider>
            <ReadingProgressBar />
            <Header />
            <main className="flex-1 pb-20">{children}</main>
            <AudioPlayerBar />
            <Footer />
          </AudioProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
