import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://token-diff.vercel.app'),
  title: {
    default: 'token-diff — Fast, Local Token Measurement & Prompt Diffing',
    template: '%s | token-diff',
  },
  description:
    'Zero-dependency, offline-first token measurement and context diff infrastructure for LLMs, prompt engineering, and autonomous agent control planes.',
  keywords: [
    'token-diff',
    'ai-token-diff',
    'token counter',
    'tiktoken',
    'prompt engineering',
    'prompt optimization',
    'token savings',
    'LLM token calculator',
    'AI agent transport envelope',
    'context window optimizer',
    'pure javascript bpe',
  ],
  authors: [{ name: 'token-diff contributors' }],
  creator: 'token-diff',
  publisher: 'token-diff',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://token-diff.vercel.app',
    siteName: 'token-diff',
    title: 'token-diff — Fast, Local Token Measurement & Prompt Diffing',
    description:
      'Measure prompt token savings locally and instantly. 100% client-side execution, zero cloud calls, zero telemetry.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'token-diff — Fast, Local Token Measurement & Prompt Diffing',
    description:
      'Measure prompt token savings locally and instantly. 100% client-side execution, zero cloud calls, zero telemetry.',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon.png', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png', type: 'image/png' },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-emerald-500 focus:text-zinc-950 focus:font-mono focus:text-xs focus:font-bold focus:rounded-md focus:shadow-xl focus:outline-none"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
