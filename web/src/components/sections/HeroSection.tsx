'use client';

import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Language, I18N_STRINGS } from '@/lib/constants';
import {
  Terminal,
  Copy,
  Check,
  BookOpen,
  ArrowRight,
  Sparkles,
  Zap,
} from 'lucide-react';

interface HeroSectionProps {
  lang: Language;
  onExplorePlayground?: () => void;
}

type InstallTab = 'global' | 'npx' | 'local';

export const HeroSection: React.FC<HeroSectionProps> = ({
  lang,
  onExplorePlayground,
}) => {
  const t = I18N_STRINGS[lang];
  const [activeTab, setActiveTab] = useState<InstallTab>('global');
  const [copied, setCopied] = useState(false);

  const installCommands: Record<InstallTab, string> = {
    global: 'npm install -g ai-token-diff',
    npx: 'npx ai-token-diff diff before.txt after.txt',
    local: 'npm install -D ai-token-diff',
  };

  const currentCommand = installCommands[activeTab];

  const handleCopy = async () => {
    await navigator.clipboard.writeText(currentCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleScrollToPlayground = () => {
    if (onExplorePlayground) {
      onExplorePlayground();
    } else {
      const el = document.getElementById('playground');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24 border-b border-zinc-800/60 bg-gradient-to-b from-zinc-950 via-zinc-950 to-zinc-900/30">
      {/* Background glow gradient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      <div className="w-full max-w-5xl mx-auto px-4 text-center space-y-6">
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2">
          <Badge
            variant="outline"
            className="text-emerald-400 border-emerald-500/30 bg-emerald-500/10 text-xs px-3 py-1 font-mono rounded-full"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5 inline text-emerald-400" />
            {t.heroBadge}
          </Badge>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-100 max-w-4xl mx-auto leading-[1.15]">
          <span>{t.heroTitlePart1}</span>{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            {t.heroTitlePart2}
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          {t.heroSubtitle}
        </p>

        {/* Quick CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button
            size="lg"
            onClick={handleScrollToPlayground}
            className="h-11 px-6 text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
          >
            <Zap className="w-4 h-4 mr-2 fill-zinc-950" />
            {t.heroTryPlayground}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>

          <a
            href="https://github.com/Khoa180806/token-diff"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200 h-11 px-5 text-sm font-medium transition-colors"
          >
            <svg className="w-4 h-4 mr-2 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            {t.heroViewOnGitHub}
          </a>

          <a
            href="https://github.com/Khoa180806/AI_Developer_Tool_Ecosystem/tree/master/docs"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/60 h-11 px-4 text-sm font-medium transition-colors"
          >
            <BookOpen className="w-4 h-4 mr-2 text-zinc-500" />
            {t.heroDocumentation}
          </a>
        </div>

        {/* Quick Install Terminal Box */}
        <div className="pt-6 max-w-xl mx-auto">
          <div className="rounded-xl border border-zinc-800/90 bg-zinc-900/70 backdrop-blur-md shadow-2xl overflow-hidden text-left">
            {/* Terminal Header & Tabs */}
            <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-zinc-800 bg-zinc-950/60 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-[11px] text-zinc-500 ml-2 font-mono flex items-center gap-1">
                  <Terminal className="w-3 h-3 text-zinc-400" />
                  bash
                </span>
              </div>

              {/* Tab Selector */}
              <div className="flex items-center gap-1 bg-zinc-900 p-0.5 rounded-md border border-zinc-800/80">
                <button
                  type="button"
                  onClick={() => setActiveTab('global')}
                  className={`px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer ${
                    activeTab === 'global'
                      ? 'bg-zinc-800 text-zinc-100 font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {t.heroInstallTabGlobal}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('npx')}
                  className={`px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer ${
                    activeTab === 'npx'
                      ? 'bg-zinc-800 text-zinc-100 font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {t.heroInstallTabNpx}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('local')}
                  className={`px-2 py-0.5 rounded text-[11px] transition-colors cursor-pointer ${
                    activeTab === 'local'
                      ? 'bg-zinc-800 text-zinc-100 font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {t.heroInstallTabLocal}
                </button>
              </div>
            </div>

            {/* Terminal Body */}
            <div className="p-3.5 flex items-center justify-between font-mono text-xs sm:text-sm bg-zinc-950/40">
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none text-zinc-200">
                <span className="text-emerald-400 select-none">$</span>
                <span className="tracking-wide">{currentCommand}</span>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className="h-8 px-2.5 ml-2 text-xs font-mono text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors shrink-0 cursor-pointer"
                title="Copy command"
              >
                {copied ? (
                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <Check className="w-3.5 h-3.5" />
                    <span className="text-[11px] hidden sm:inline">{t.copiedCli}</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-1.5">
                    <Copy className="w-3.5 h-3.5" />
                    <span className="text-[11px] hidden sm:inline">Copy</span>
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
