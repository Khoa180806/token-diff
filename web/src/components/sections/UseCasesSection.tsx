'use client';

import React from 'react';
import { Sparkles, GitPullRequest, Bot } from 'lucide-react';
import { I18N_STRINGS, Language } from '@/lib/constants';

interface UseCasesSectionProps {
  lang: Language;
}

export function UseCasesSection({ lang }: UseCasesSectionProps) {
  const t = I18N_STRINGS[lang];

  const useCases = [
    {
      icon: Sparkles,
      title: t.useCase1Title,
      description: t.useCase1Desc,
      tag: 'Prompt Engineering',
      codeSnippet: 'token-diff system_v1.prompt system_v2.prompt',
    },
    {
      icon: GitPullRequest,
      title: t.useCase2Title,
      description: t.useCase2Desc,
      tag: 'CI / GitHub Actions',
      codeSnippet: `token-diff base.prompt head.prompt --json \\\n  | jq -e '.delta.token_delta <= 0'`,
    },
    {
      icon: Bot,
      title: t.useCase3Title,
      description: t.useCase3Desc,
      tag: 'Autonomous Agents',
      codeSnippet: 'import { computeDiff } from "ai-token-diff";',
    },
  ];

  return (
    <section id="use-cases" className="py-20 border-b border-zinc-800/80 bg-zinc-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border border-zinc-700 bg-zinc-900/80 text-zinc-300 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
            {t.useCasesBadge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 mb-4">
            {t.useCasesHeading}
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-sans">
            {t.useCasesSubheading}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {useCases.map((uc, idx) => {
            const Icon = uc.icon;
            return (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-7 hover:border-zinc-700 hover:bg-zinc-900/90 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-lg border border-zinc-800 bg-zinc-950 text-blue-400 group-hover:border-blue-500/40 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full border border-zinc-700 bg-zinc-800/80 text-zinc-300">
                      {uc.tag}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-zinc-100 mb-2 group-hover:text-blue-300 transition-colors">
                    {uc.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6 font-sans">
                    {uc.description}
                  </p>
                </div>

                <div className="rounded-lg border border-zinc-800/80 bg-zinc-950 p-3 font-mono text-xs text-zinc-300 overflow-x-auto">
                  <div className="text-[10px] text-zinc-400 uppercase tracking-wider mb-1 font-semibold">
                    Snippet
                  </div>
                  <pre className="text-emerald-400 whitespace-pre-wrap">{uc.codeSnippet}</pre>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
