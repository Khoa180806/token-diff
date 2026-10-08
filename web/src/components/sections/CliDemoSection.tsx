'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Terminal, Copy, Check } from 'lucide-react';
import { I18N_STRINGS, Language } from '@/lib/constants';

interface CliDemoSectionProps {
  lang: Language;
}

export function CliDemoSection({ lang }: CliDemoSectionProps) {
  const t = I18N_STRINGS[lang];
  const [activeTab, setActiveTab] = useState<'count' | 'diff' | 'stdin' | 'json'>('diff');
  const [copied, setCopied] = useState(false);

  const demoItems = {
    diff: {
      label: t.cliTabDiff,
      cmd: 'td diff prompt_v1.txt prompt_v2.txt',
      imageSrc: '/demo-diff-v2.png',
      alt: 'CLI Diff Mode',
      desc:
        lang === 'en'
          ? 'Side-by-side token delta showing additions, deletions, and savings percentage.'
          : 'So sánh độ lệch token theo định dạng diff trực quan, hiển thị rõ phần thêm, bớt và tỷ lệ tiết kiệm.',
    },
    count: {
      label: t.cliTabCount,
      cmd: 'td count README.md',
      imageSrc: '/demo-count-v2.png',
      alt: 'CLI Count Mode',
      desc:
        lang === 'en'
          ? 'Instant breakdown of token counts, character lengths, and byte sizes.'
          : 'Phân tích chi tiết số lượng token, độ dài ký tự và dung lượng byte tức thì.',
    },
    stdin: {
      label: t.cliTabStdin,
      cmd: 'cat prompt_v2.txt | td diff prompt_v1.txt -',
      imageSrc: '/demo-stdin-v2.png',
      alt: 'CLI Stdin Unix Pipeline',
      desc:
        lang === 'en'
          ? 'Seamless Unix pipe integration for scripting, grep, and terminal pipelines.'
          : 'Tích hợp mượt mà với đường ống Unix pipe, phù hợp cho tự động hóa và script shell.',
    },
    json: {
      label: t.cliTabJson,
      cmd: 'td diff prompt_v1.txt prompt_v2.txt --json',
      imageSrc: '/json-mode-v2.png',
      alt: 'CLI JSON Envelope Mode',
      desc:
        lang === 'en'
          ? 'Machine-readable JSON envelope for agent tool loops and CI budget validations.'
          : 'Định dạng JSON chuẩn hóa máy đọc được, phục vụ tool call của AI agent và kịch bản CI.',
    },
  };

  const current = demoItems[activeTab];

  const handleCopyCmd = () => {
    navigator.clipboard.writeText(current.cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="cli-demo" className="py-20 border-b border-zinc-800/80 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border border-zinc-700 bg-zinc-900/80 text-zinc-300 mb-4">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            {t.cliBadge}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-100 mb-4">
            {t.cliHeading}
          </h2>
          <p className="text-base sm:text-lg text-zinc-400 leading-relaxed font-sans">
            {t.cliSubheading}
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap justify-center gap-2 mb-8" role="tablist" aria-label="CLI Demonstration views">
          {(Object.keys(demoItems) as Array<keyof typeof demoItems>).map((key) => {
            const item = demoItems[key];
            const isActive = activeTab === key;
            return (
              <button
                key={key}
                role="tab"
                aria-selected={isActive}
                onClick={() => {
                  setActiveTab(key);
                  setCopied(false);
                }}
                className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-mono font-medium transition-all focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none ${
                  isActive
                    ? 'bg-zinc-800 text-emerald-400 border border-emerald-500/40 shadow-sm'
                    : 'bg-zinc-900/60 text-zinc-400 border border-zinc-800 hover:bg-zinc-900 hover:text-zinc-200'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Terminal Window Preview */}
        <div className="max-w-4xl mx-auto rounded-xl border border-zinc-800 bg-zinc-900/90 shadow-2xl overflow-hidden">
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between px-3 sm:px-4 py-3 border-b border-zinc-800 bg-zinc-950/80 gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/70 inline-block"></span>
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500/70 inline-block"></span>
              <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500/70 inline-block"></span>
              <span className="ml-2 text-xs font-mono text-zinc-400 hidden sm:inline select-none">
                token-diff — {lang === 'vi' ? 'xem trước dòng lệnh' : 'terminal preview'}
              </span>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 min-w-0">
              <div className="text-[11px] font-mono text-zinc-300 bg-zinc-900 px-2 py-1 rounded border border-zinc-800 truncate max-w-[150px] xs:max-w-[220px] sm:max-w-none">
                <span className="text-emerald-400 select-none">$</span> {current.cmd}
              </div>
              <button
                onClick={handleCopyCmd}
                title={copied ? "Command copied" : "Copy command"}
                aria-label={copied ? "Command copied to clipboard" : "Copy command"}
                className="p-1.5 rounded hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors shrink-0 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" aria-hidden="true" /> : <Copy className="w-4 h-4" aria-hidden="true" />}
              </button>
            </div>
          </div>

          {/* Screenshot Display */}
          <div className="relative bg-zinc-950 flex flex-col items-center justify-center p-2 sm:p-6 min-h-[320px]">
            <div className="relative w-full max-w-3xl overflow-hidden rounded-lg border border-zinc-800/80 shadow-md">
              <Image
                src={current.imageSrc}
                alt={current.alt}
                width={1200}
                height={700}
                className="w-full h-auto object-contain"
                priority
                unoptimized
              />
            </div>
            <p className="mt-4 text-xs sm:text-sm text-zinc-400 font-mono text-center px-4">
              {current.desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
