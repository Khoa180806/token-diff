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
  Globe,
  RotateCcw,
  BookOpen,
} from 'lucide-react';

interface PlaygroundSectionProps {
  lang?: Language;
  onToggleLang?: () => void;
  initialLang?: Language;
}

export const PlaygroundSection: React.FC<PlaygroundSectionProps> = ({
  lang: controlledLang,
  onToggleLang,
  initialLang = 'en',
}) => {
  const [internalLang, setInternalLang] = useState<Language>(initialLang);
  const lang = controlledLang ?? internalLang;
  const toggleLanguage =
    onToggleLang ??
    (() => setInternalLang((prev) => (prev === 'en' ? 'vi' : 'en')));
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
    <section id="playground" className="w-full max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Section Header with Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-zinc-800/80">
        <div className="space-y-1.5">
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

        {/* Global Controls: Language & Model Switcher */}
        <div className="flex flex-wrap items-center gap-2 self-start md:self-end">
          {/* Language toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={toggleLanguage}
            className="h-9 px-3 text-xs font-mono bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-zinc-200"
            title="Toggle English / Tiếng Việt"
          >
            <Globe className="w-3.5 h-3.5 mr-1.5 text-zinc-400" />
            {lang === 'en' ? 'VI / EN' : 'EN / VI'}
          </Button>

          {/* Model Selector */}
          <div className="w-[180px]">
            <Select
              value={selectedModel}
              onValueChange={(val) => {
                if (val) setSelectedModel(val);
              }}
            >
              <SelectTrigger className="h-9 text-xs font-mono bg-zinc-900 border-zinc-800 text-zinc-200">
                <SelectValue placeholder="Model" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800 text-zinc-200 font-mono text-xs">
                {AVAILABLE_MODELS.map((m) => (
                  <SelectItem key={m.value} value={m.value} className="focus:bg-zinc-800 text-xs">
                    <span className="font-semibold text-zinc-100">{m.label}</span>{' '}
                    <span className="text-[10px] text-zinc-500">({m.encoding})</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Toolbar: Example Pickers & Swap */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-zinc-500 font-mono text-[11px] mr-1 flex items-center gap-1">
            <BookOpen className="w-3.5 h-3.5" />
            {t.loadExample}:
          </span>
          {EXAMPLE_PROMPTS.map((ex, idx) => (
            <Button
              key={idx}
              variant="outline"
              size="sm"
              onClick={() => handleLoadExample(idx)}
              className="h-7 text-[11px] font-mono bg-zinc-950/70 border-zinc-800/80 hover:bg-zinc-800/80 text-zinc-300"
            >
              {ex.name[lang]}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 ml-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSwap}
            className="h-7 text-[11px] font-mono bg-zinc-900 border-zinc-800 hover:bg-zinc-800 text-zinc-300"
            title="Swap before and after"
          >
            <ArrowLeftRight className="w-3 h-3 mr-1" />
            {t.swapInputs}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleClear}
            className="h-7 text-[11px] font-mono bg-zinc-900 border-zinc-800 hover:bg-rose-950/30 hover:text-rose-400 text-zinc-400"
            title="Clear all text"
          >
            <RotateCcw className="w-3 h-3 mr-1" />
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
    </section>
  );
};
