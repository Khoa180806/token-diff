'use client';

import React from 'react';
import { Layers, FileText, CheckCircle2 } from 'lucide-react';
import { I18N_STRINGS, Language } from '@/lib/constants';

interface EcosystemSectionProps {
  lang: Language;
}

export function EcosystemSection({ lang }: EcosystemSectionProps) {
  const t = I18N_STRINGS[lang];

  const standards = [
    {
      label: 'Transport Envelope v1.0',
      desc: lang === 'en' ? 'Standardized JSON structure matching common tool specs.' : 'Định dạng JSON bao gói đồng nhất theo chuẩn hệ sinh thái.',
    },
    {
      label: 'Deterministic Exit Codes',
      desc: lang === 'en' ? '0 = Identical, 1 = Differences detected, 2 = Execution error.' : '0 = Trùng khớp, 1 = Có khác biệt, 2 = Lỗi thực thi.',
    },
    {
      label: 'Frozen Baseline Verification',
      desc: lang === 'en' ? 'Sub-millisecond execution benchmarks frozen across versions.' : 'Điểm chuẩn hiệu năng sub-millisecond được đóng băng kiểm tra định kỳ.',
    },
    {
      label: 'Dual Packaging (ESM + CJS)',
      desc: lang === 'en' ? 'Zero friction imports across modern bundlers and Node runtimes.' : 'Hỗ trợ cả ESM và CommonJS không lỗi tương thích.',
    },
  ];

  return (
    <section id="ecosystem" className="py-20 border-b border-zinc-800/80 bg-zinc-950/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/90 to-zinc-950 p-8 sm:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium border border-zinc-700 bg-zinc-900/80 text-zinc-300 mb-4">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              {t.ecosystemBadge}
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 mb-3">
              {t.ecosystemHeading}
            </h2>
            <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-sans">
              {t.ecosystemSubheading}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
            {standards.map((std, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3 p-4 rounded-xl border border-zinc-800/80 bg-zinc-950/60"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-zinc-200 mb-1">{std.label}</h4>
                  <p className="text-xs text-zinc-400 font-sans">{std.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-zinc-800/80">
            <a
              href="https://github.com/Khoa180806/token-diff/blob/main/docs/SPEC.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-mono font-medium border border-zinc-700 transition-colors"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              {t.ecosystemSpecButton}
            </a>
            <a
              href="https://github.com/Khoa180806/token-diff/blob/main/docs/DECISIONS.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-zinc-900/60 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs font-mono border border-zinc-800 transition-colors"
            >
              {t.ecosystemDecisionLog}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
