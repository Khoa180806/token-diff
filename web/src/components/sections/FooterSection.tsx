'use client';

import React from 'react';
import { ArrowUp } from 'lucide-react';
import { I18N_STRINGS, Language } from '@/lib/constants';

interface FooterSectionProps {
  lang: Language;
}

export function FooterSection({ lang }: FooterSectionProps) {
  const t = I18N_STRINGS[lang];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 bg-zinc-950 border-t border-zinc-800 text-zinc-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
          <span className="font-mono font-bold text-zinc-200 tracking-tight text-sm">token-diff</span>
          <span className="text-zinc-600">|</span>
          <span className="text-xs text-zinc-400">{t.footerBuiltBy}</span>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-xs font-mono">
          <a
            href="https://github.com/Khoa180806/token-diff"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-200 transition-colors"
          >
            {t.footerGithub}
          </a>
          <a
            href="https://github.com/Khoa180806/token-diff#readme"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-200 transition-colors"
          >
            {t.footerDocumentation}
          </a>
          <span className="text-zinc-400">{t.footerLicense}</span>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded border border-zinc-800 hover:border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-zinc-100 transition-colors cursor-pointer"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            <span>{t.footerBackToTop}</span>
          </button>
        </div>
      </div>
    </footer>
  );
}
