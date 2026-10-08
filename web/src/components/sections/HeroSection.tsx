import React, { useState } from 'react';
import Image from 'next/image';
import { Button, buttonVariants } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Language,
  I18N_STRINGS,
  INSTALL_SNIPPETS,
  PROJECT_LINKS,
} from '@/lib/constants';
import {
  Terminal,
  Copy,
  Check,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Zap,
  Globe,
  Star,
  BookOpen,
  Cpu,
} from 'lucide-react';

interface HeroSectionProps {
  lang: Language;
  onToggleLang: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ lang, onToggleLang }) => {
  const t = I18N_STRINGS[lang];
  const [selectedSnippetId, setSelectedSnippetId] = useState<string>('npx');
  const [copied, setCopied] = useState<boolean>(false);

  const activeSnippet =
    INSTALL_SNIPPETS.find((s) => s.id === selectedSnippetId) ?? INSTALL_SNIPPETS[0];

  const handleCopyCommand = async () => {
    await navigator.clipboard.writeText(activeSnippet.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const scrollToPlayground = () => {
    const el = document.getElementById('playground');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full overflow-hidden border-b border-zinc-800/80 bg-zinc-950">
      {/* Background ambient lighting effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[360px] bg-gradient-to-b from-emerald-500/10 via-emerald-950/5 to-transparent blur-3xl pointer-events-none" />

      {/* Top Navigation Bar */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-4 py-4 flex items-center justify-between border-b border-zinc-900">
        <div className="flex items-center gap-3">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 flex items-center justify-center p-1">
            <Image
              src="/logo.png"
              alt="token-diff logo"
              width={32}
              height={32}
              priority
              className="object-contain"
            />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-mono font-bold text-base tracking-tight text-zinc-100">
              token-diff
            </span>
            <span className="text-[11px] font-mono text-zinc-500">v0.1.1</span>
          </div>
        </div>

        <nav className="flex items-center gap-2 sm:gap-4">
          <a
            href={PROJECT_LINKS.docs}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-mono text-zinc-400 hover:text-zinc-100 transition-colors flex items-center gap-1"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t.navDocs}</span>
          </a>

          <a
            href={PROJECT_LINKS.github}
            target="_blank"
            rel="noreferrer"
            className="text-xs font-mono text-zinc-400 hover:text-zinc-100 transition-colors flex items-center gap-1"
          >
            <Star className="w-3.5 h-3.5 text-amber-400/90 fill-amber-400/20" />
            <span className="hidden sm:inline">{t.navGitHub}</span>
          </a>

          <Button
            variant="outline"
            size="sm"
            onClick={onToggleLang}
            className="h-8 px-2.5 text-xs font-mono bg-zinc-900/90 border-zinc-800 hover:bg-zinc-800 text-zinc-200 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
            title="Toggle language (English / Tiếng Việt)"
            aria-label={lang === 'en' ? 'Chuyển sang Tiếng Việt' : 'Switch to English'}
          >
            <Globe className="w-3.5 h-3.5 mr-1 text-zinc-400" />
            {lang === 'en' ? 'VI' : 'EN'}
          </Button>
        </nav>
      </header>

      {/* Hero Main Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 pt-14 pb-16 md:pt-20 md:pb-22 text-center space-y-8">
        {/* Version Badge */}
        <div className="flex items-center justify-center">
          <Badge
            variant="outline"
            className="text-emerald-400 border-emerald-500/30 bg-emerald-500/10 text-xs px-3 py-1 font-mono tracking-wide"
          >
            <Zap className="w-3 h-3 mr-1.5 inline" />
            {t.heroBadge}
          </Badge>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-zinc-100 max-w-4xl mx-auto leading-tight md:leading-none">
          {t.heroTitlePre}{' '}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            {t.heroTitleHighlight}
          </span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          {t.heroSubtitle}
        </p>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1 pb-2">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            {t.pillLocal}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300">
            <Cpu className="w-3.5 h-3.5 text-teal-400" />
            {t.pillPureJs}
          </span>
          <span className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            {t.pillFast}
          </span>
        </div>

        {/* Quick Install Bar & Snippet Switcher */}
        <div className="w-full max-w-xl mx-auto space-y-2 text-left">
          {/* Snippet Tabs */}
          <div className="flex items-center justify-between px-1">
            <div className="flex flex-wrap items-center gap-1" role="tablist" aria-label="Installation methods">
              {INSTALL_SNIPPETS.map((snippet) => (
                <button
                  key={snippet.id}
                  role="tab"
                  aria-selected={selectedSnippetId === snippet.id}
                  aria-label={snippet.label}
                  onClick={() => setSelectedSnippetId(snippet.id)}
                  className={`text-[11px] font-mono px-2.5 py-1 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none ${
                    selectedSnippetId === snippet.id
                      ? 'bg-zinc-800 text-emerald-400 font-semibold'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {snippet.label}
                </button>
              ))}
            </div>
            <span className="text-[10px] font-mono text-zinc-500 hidden sm:inline select-none">
              terminal
            </span>
          </div>

          {/* Terminal Command Bar */}
          <div className="relative group rounded-lg border border-zinc-800 bg-zinc-900/90 shadow-2xl p-3 flex items-center justify-between font-mono text-xs text-zinc-200 gap-2">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pr-2 min-w-0 flex-1">
              <Terminal className="w-4 h-4 text-emerald-400 shrink-0" aria-hidden="true" />
              <span className="text-zinc-500 select-none">$</span>
              <span className="text-zinc-100 whitespace-nowrap">
                {activeSnippet.command}
              </span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyCommand}
              className="h-7 px-2.5 text-xs font-mono bg-zinc-950 border-zinc-800 hover:bg-zinc-800 text-zinc-300 shrink-0 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
              title={t.copyCommand}
              aria-label={copied ? t.copiedCommand : t.copyCommand}
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400 mr-1.5" aria-hidden="true" />
                  <span>{t.copiedCommand}</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
                  <span>{t.copyCommand}</span>
                </>
              )}
            </Button>
          </div>

          <p className="text-[11px] font-mono text-zinc-400 px-1">
            💡 {activeSnippet.description[lang]}
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Button
            size="lg"
            onClick={scrollToPlayground}
            className="w-full sm:w-auto h-11 px-6 text-sm font-semibold bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-lg shadow-emerald-500/20 font-mono focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
          >
            <span>{t.heroCtaPlayground}</span>
            <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
          </Button>

          <a
            href={PROJECT_LINKS.github}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({
              variant: 'outline',
              size: 'lg',
              className:
                'w-full sm:w-auto h-11 px-5 text-sm font-mono bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-zinc-200 inline-flex items-center justify-center cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none',
            })}
          >
            <Star className="w-4 h-4 mr-2 text-amber-400 fill-amber-400/20" aria-hidden="true" />
            <span>{t.heroCtaGithub}</span>
            <ExternalLink className="w-3 h-3 ml-1.5 text-zinc-400" aria-hidden="true" />
          </a>

          <a
            href={PROJECT_LINKS.docs}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({
              variant: 'ghost',
              size: 'lg',
              className:
                'w-full sm:w-auto h-11 px-4 text-sm font-mono text-zinc-300 hover:text-zinc-100 hover:bg-zinc-900 inline-flex items-center justify-center cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none',
            })}
          >
            <BookOpen className="w-4 h-4 mr-2" aria-hidden="true" />
            <span>{t.heroCtaDocs}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
