import type { Metadata } from "next";
import { Newsreader, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";
import { AudioProvider } from "@/components/AudioContext";
import { AuthProvider } from "@/components/AuthContext";
import { AudioPlayerBar } from "@/components/AudioPlayerBar";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";

const newsreader = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-serif-headline",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Artist Daily News (ADN) — The Daily Journal of Independent Music Economics & Strategy",
    template: "%s | Artist Daily News",
  },
  description:
    "Institutional music business intelligence, daily streaming royalty indices, catalogue valuation multiples, AI music tech investigations, and official press pass accreditation for independent creators.",
  keywords: [
    "music business news",
    "independent artist",
    "music publishing",
    "streaming royalties",
    "spotify algorithm",
    "catalogue valuation",
    "music press pass",
    "artist grants",
    "music industry intelligence",
  ],
  authors: [{ name: "Artist Daily News Editorial Board", url: "https://artistdailynews.com" }],
  creator: "Artispreneur Media Network",
  publisher: "Artist Daily News Publishing Ltd.",
  metadataBase: new URL("https://artistdailynews.com"),
  alternates: {
    canonical: "https://artistdailynews.com",
    types: {
      "application/rss+xml": "https://artistdailynews.com/api/news/feed?format=rss",
    },
  },
  openGraph: {
    title: "Artist Daily News (ADN) — The Front Page of the Independent Music World",
    description:
      "Institutional music business intelligence, streaming royalty benchmarks, catalogue deals, and DIY strategy.",
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
    alternateName: "ADN",
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
    <html lang="en" className={`dark ${newsreader.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
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
      <body className="min-h-screen flex flex-col bg-[#08090D] text-[#F4F4F6] font-sans antialiased selection:bg-[#D4FF00] selection:text-black">
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
