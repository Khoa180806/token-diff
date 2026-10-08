import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { TokenDiffReport, TokenizerResult } from '@/lib/types';
import { Language, I18N_STRINGS } from '@/lib/constants';
import { ArrowDownRight, ArrowUpRight, Minus, Hash, FileText, CheckCircle2 } from 'lucide-react';

interface StatsCardsProps {
  before: TokenizerResult | null;
  after: TokenizerResult | null;
  diff: TokenDiffReport | null;
  loading: boolean;
  lang: Language;
}

export const StatsCards: React.FC<StatsCardsProps> = ({
  before,
  after,
  diff,
  loading,
  lang,
}) => {
  const t = I18N_STRINGS[lang];
  const delta = diff?.diff.token_delta ?? 0;
  const deltaPct = diff?.diff.token_delta_pct ?? 0;
  const charDelta = diff?.diff.char_delta ?? 0;
  const charDeltaPct = diff?.diff.char_delta_pct ?? 0;

  const isSaving = delta < 0;
  const isExpansion = delta > 0;

  return (
    <div
      role="region"
      aria-label="Token measurement statistics"
      className={`grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 transition-opacity duration-200 ${loading ? 'opacity-70' : 'opacity-100'}`}
    >
      {/* Card 1: Token Delta */}
      <Card className="bg-zinc-900/60 border-zinc-800 backdrop-blur-sm shadow-sm relative overflow-hidden min-w-0">
        <div
          className={`absolute top-0 left-0 right-0 h-[2px] ${
            isSaving
              ? 'bg-emerald-500'
              : isExpansion
              ? 'bg-rose-500'
              : 'bg-zinc-700'
          }`}
        />
        <CardContent className="p-3 sm:p-4 space-y-1 min-w-0">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span className="truncate">{t.reductionCard}</span>
            {isSaving ? (
              <Badge variant="outline" className="text-emerald-400 border-emerald-500/30 bg-emerald-500/10 text-[10px] px-1.5 py-0 font-mono shrink-0">
                <ArrowDownRight className="w-3 h-3 mr-0.5 inline" />
                {Math.abs(deltaPct)}%
              </Badge>
            ) : isExpansion ? (
              <Badge variant="outline" className="text-rose-400 border-rose-500/30 bg-rose-500/10 text-[10px] px-1.5 py-0 font-mono shrink-0">
                <ArrowUpRight className="w-3 h-3 mr-0.5 inline" />
                +{deltaPct}%
              </Badge>
            ) : (
              <Badge variant="outline" className="text-zinc-400 border-zinc-700 text-[10px] px-1.5 py-0 font-mono shrink-0">
                <Minus className="w-3 h-3 mr-0.5 inline" />
                0%
              </Badge>
            )}
          </div>
          <div className="text-lg sm:text-2xl font-bold font-mono tracking-tight text-zinc-100 flex items-baseline gap-1.5 flex-wrap">
            <span
              className={
                isSaving
                  ? 'text-emerald-400'
                  : isExpansion
                  ? 'text-rose-400'
                  : 'text-zinc-200'
              }
            >
              {delta > 0 ? `+${delta}` : delta}
            </span>
            <span className="text-xs text-zinc-500 font-normal">{t.tokensSuffix}</span>
          </div>
          <p className="text-[11px] text-zinc-400 font-mono truncate">
            {before?.tokenCount ?? 0} → {after?.tokenCount ?? 0}
          </p>
        </CardContent>
      </Card>

      {/* Card 2: Absolute Savings / Ratio */}
      <Card className="bg-zinc-900/60 border-zinc-800 backdrop-blur-sm shadow-sm relative overflow-hidden min-w-0">
        <CardContent className="p-3 sm:p-4 space-y-1 min-w-0">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span className="truncate">{t.tokensCard}</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-zinc-500 shrink-0" aria-hidden="true" />
          </div>
          <div className="text-lg sm:text-2xl font-bold font-mono tracking-tight text-zinc-100 flex items-baseline gap-1.5 flex-wrap">
            <span className="text-emerald-400">
              {isSaving ? Math.abs(delta) : 0}
            </span>
            <span className="text-xs text-zinc-500 font-normal">{t.savedWord}</span>
          </div>
          <p className="text-[11px] text-zinc-400 font-mono truncate">
            {isSaving ? `${Math.abs(deltaPct)}% ${t.reductionWord}` : (lang === 'vi' ? '0% thay đổi' : '0% reduction')}
          </p>
        </CardContent>
      </Card>

      {/* Card 3: Characters */}
      <Card className="bg-zinc-900/60 border-zinc-800 backdrop-blur-sm shadow-sm relative overflow-hidden min-w-0">
        <CardContent className="p-3 sm:p-4 space-y-1 min-w-0">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span className="truncate">{t.charsCard}</span>
            <Hash className="w-3.5 h-3.5 text-zinc-500 shrink-0" aria-hidden="true" />
          </div>
          <div className="text-lg sm:text-2xl font-bold font-mono tracking-tight text-zinc-100 flex items-baseline gap-1.5 flex-wrap">
            <span>{after?.charCount ?? 0}</span>
            <span className="text-xs text-zinc-500 font-normal font-mono">
              ({charDelta > 0 ? `+${charDelta}` : charDelta})
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 font-mono truncate">
            {before?.charCount ?? 0} → {after?.charCount ?? 0} ({charDeltaPct}%)
          </p>
        </CardContent>
      </Card>

      {/* Card 4: Lines */}
      <Card className="bg-zinc-900/60 border-zinc-800 backdrop-blur-sm shadow-sm relative overflow-hidden min-w-0">
        <CardContent className="p-3 sm:p-4 space-y-1 min-w-0">
          <div className="flex items-center justify-between text-xs text-zinc-400 font-mono">
            <span className="truncate">{t.linesCard}</span>
            <FileText className="w-3.5 h-3.5 text-zinc-500 shrink-0" aria-hidden="true" />
          </div>
          <div className="text-lg sm:text-2xl font-bold font-mono tracking-tight text-zinc-100 flex items-baseline gap-1.5 flex-wrap">
            <span>{after?.lineCount ?? 0}</span>
            <span className="text-xs text-zinc-500 font-normal font-mono">
              {t.linesSuffix}
            </span>
          </div>
          <p className="text-[11px] text-zinc-400 font-mono truncate">
            {before?.lineCount ?? 0} → {after?.lineCount ?? 0} {t.linesSuffix}
          </p>
        </CardContent>
      </Card>
    </div>
  );
};
