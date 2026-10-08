import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { TokenizerResult } from 'ai-token-diff';
import { Language, I18N_STRINGS } from '@/lib/constants';
import { Copy, Check, Trash2 } from 'lucide-react';

interface InputPaneProps {
  title: string;
  value: string;
  onChange: (val: string) => void;
  placeholder: string;
  stats: TokenizerResult | null;
  loading: boolean;
  lang: Language;
  onClear: () => void;
  accentColor?: 'emerald' | 'amber' | 'blue';
}

export const InputPane: React.FC<InputPaneProps> = ({
  title,
  value,
  onChange,
  placeholder,
  stats,
  loading,
  lang,
  onClear,
  accentColor = 'blue',
}) => {
  const t = I18N_STRINGS[lang];
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const accentBorder =
    accentColor === 'emerald'
      ? 'focus-within:border-emerald-500/50'
      : accentColor === 'amber'
      ? 'focus-within:border-amber-500/50'
      : 'focus-within:border-blue-500/50';

  return (
    <Card className={`bg-zinc-900/70 border-zinc-800 flex flex-col h-full shadow-md transition-colors ${accentBorder}`}>
      {/* Header bar */}
      <div className="flex items-center justify-between px-3.5 py-2.5 border-b border-zinc-800/80 bg-zinc-950/40">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-zinc-200 tracking-wide font-mono">
            {title}
          </span>
          {stats && (
            <Badge
              variant="secondary"
              className="font-mono text-[10px] bg-zinc-800 text-zinc-300 border-zinc-700/60 px-1.5 py-0"
            >
              {stats.tokenCount} tokens
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            disabled={!value}
            className="h-6 w-6 p-0 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
            title="Copy content"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClear}
            disabled={!value}
            className="h-6 w-6 p-0 text-zinc-400 hover:text-rose-400 hover:bg-zinc-800"
            title={t.clearAll}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>

      {/* Textarea area */}
      <CardContent className="p-0 flex-1 flex flex-col relative">
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 min-h-[220px] max-h-[480px] md:min-h-[280px] resize-y p-3.5 font-mono text-xs text-zinc-200 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 leading-relaxed placeholder:text-zinc-600 rounded-none"
        />

        {/* Footer info bar */}
        <div className="flex items-center justify-between px-3.5 py-1.5 border-t border-zinc-800/60 bg-zinc-950/30 text-[11px] font-mono text-zinc-500">
          <div className="flex items-center gap-3">
            <span>{stats?.charCount ?? 0} chars</span>
            <span>{stats?.lineCount ?? 0} lines</span>
          </div>
          <div>
            {loading ? (
              <span className="text-amber-400/80 animate-pulse text-[10px]">
                {t.statusCalculating}
              </span>
            ) : (
              <span className="text-zinc-600 text-[10px]">
                {stats?.encoding ?? 'ready'}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
