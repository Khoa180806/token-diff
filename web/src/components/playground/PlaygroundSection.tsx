'use client';

import React, { useState } from 'react';
import { useTokenDiff } from '@/hooks/useTokenDiff';
import { InputPane } from './InputPane';
import { StatsCards } from './StatsCards';
import { ResultTabs } from './ResultTabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AVAILABLE_MODELS,
  EXAMPLE_PROMPTS,
  Language,
  I18N_STRINGS,
} from '@/lib/constants';
import {
  ArrowLeftRight,
  ShieldCheck,
  Zap,
  RotateCcw,
  BookOpen,
} from 'lucide-react';

interface PlaygroundSectionProps {
  lang: Language;
}

export const PlaygroundSection: React.FC<PlaygroundSectionProps> = ({ lang }) => {
  const t = I18N_STRINGS[lang];

  // Default initial example
  const [beforeText, setBeforeText] = useState<string>(
    EXAMPLE_PROMPTS[0].before
  );
  const [afterText, setAfterText] = useState<string>(
    EXAMPLE_PROMPTS[0].after
  );
  const [selectedModel, setSelectedModel] = useState<string>('gpt-4o');

  // Interactive hook
  const { before, after, diff, loading, error } = useTokenDiff({
    beforeText,
    afterText,
    model: selectedModel,
    debounceMs: 150,
  });

  // Actions
  const handleSwap = () => {
    const temp = beforeText;
    setBeforeText(afterText);
    setAfterText(temp);
  };

  const handleClear = () => {
    setBeforeText('');
    setAfterText('');
  };

  const handleLoadExample = (index: number) => {
    const example = EXAMPLE_PROMPTS[index];
    if (example) {
      setBeforeText(example.before);
      setAfterText(example.after);
    }
  };

  return (
    <section id="playground" className="w-full border-b border-zinc-800/80 bg-zinc-950 py-12 md:py-16">
      <div className="w-full max-w-6xl mx-auto px-4 space-y-6">
        {/* Section Header */}
        <div className="space-y-1.5 pb-2 border-b border-zinc-800/80">
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="text-emerald-400 border-emerald-500/30 bg-emerald-500/10 text-xs px-2.5 py-0.5 font-mono"
            >
              <Zap className="w-3 h-3 mr-1 inline" />
              {t.playgroundBadge}
            </Badge>
            <span className="flex items-center gap-1 text-[11px] text-zinc-400 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              {t.privacyNotice}
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-100">
            {t.playgroundHeading}
          </h2>
          <p className="text-xs md:text-sm text-zinc-400 max-w-2xl">
            {t.playgroundSubheading}
          </p>
        </div>

        {/* Toolbar: Example Pickers (Left) & Model Dropdown + Actions (Right) */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 text-xs">
          {/* Example Prompts */}
          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label={t.loadExample}>
            <span className="text-zinc-400 font-mono text-[11px] mr-1 flex items-center gap-1 select-none">
              <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
              {t.loadExample}:
            </span>
            {EXAMPLE_PROMPTS.map((ex, idx) => (
              <Button
                key={idx}
                variant="outline"
                size="sm"
                onClick={() => handleLoadExample(idx)}
                aria-label={`${t.loadExample}: ${ex.name[lang]}`}
                className="h-7 text-[11px] font-mono bg-zinc-950/70 border-zinc-800/80 hover:bg-zinc-800/80 text-zinc-300 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
              >
                {ex.name[lang]}
              </Button>
            ))}
          </div>

          {/* Model Selector Dropdown & Swap/Clear Actions */}
          <div className="flex flex-wrap items-center gap-2 lg:ml-auto">
            {/* Model Selector next to Swap */}
            <div className="w-[170px] shrink-0">
              <Select
                value={selectedModel}
                onValueChange={(val) => {
                  if (val) setSelectedModel(val);
                }}
              >
                <SelectTrigger
                  aria-label={t.modelSelectLabel}
                  className="h-7 text-xs font-mono bg-zinc-900 border-zinc-800 text-zinc-200 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
                >
                  <SelectValue placeholder={t.modelSelectLabel} />
                </SelectTrigger>
                <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-200 font-mono text-xs">
                  {AVAILABLE_MODELS.map((m) => (
                    <SelectItem key={m.value} value={m.value} className="focus:bg-zinc-800 text-xs">
                      <span className="font-semibold text-zinc-100">{m.label}</span>{' '}
                      <span className="text-[10px] text-zinc-400">({m.encoding})</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleSwap}
              aria-label={t.swapInputs}
              className="h-7 text-[11px] font-mono bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-zinc-300 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
              title={t.swapInputs}
            >
              <ArrowLeftRight className="w-3 h-3 mr-1" aria-hidden="true" />
              {t.swapInputs}
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleClear}
              aria-label={t.clearAll}
              className="h-7 text-[11px] font-mono bg-zinc-900 border-zinc-800 hover:bg-rose-950/30 hover:text-rose-400 text-zinc-400 focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-none"
              title={t.clearAll}
            >
              <RotateCcw className="w-3 h-3 mr-1" aria-hidden="true" />
              {t.clearAll}
            </Button>
          </div>
        </div>

      {/* Error Banner (if any) */}
      {error && (
        <div className="p-3 rounded-md bg-rose-950/40 border border-rose-800/80 text-xs font-mono text-rose-300">
          ⚠️ {error}
        </div>
      )}

      {/* 2-Column Text Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputPane
          title={t.beforeTitle}
          value={beforeText}
          onChange={setBeforeText}
          placeholder={t.beforePlaceholder}
          stats={before}
          loading={loading}
          lang={lang}
          onClear={() => setBeforeText('')}
          accentColor="amber"
        />

        <InputPane
          title={t.afterTitle}
          value={afterText}
          onChange={setAfterText}
          placeholder={t.afterPlaceholder}
          stats={after}
          loading={loading}
          lang={lang}
          onClear={() => setAfterText('')}
          accentColor="emerald"
        />
      </div>

      {/* Summary KPI Cards */}
      <StatsCards
        before={before}
        after={after}
        diff={diff}
        loading={loading}
        lang={lang}
      />

      {/* Result Tabs (Visual summary, JSON Envelope, CLI command) */}
      <ResultTabs diff={diff} model={selectedModel} lang={lang} />
      </div>
    </section>
  );
};
