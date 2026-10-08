import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { TokenDiffReport, formatJson } from 'ai-token-diff';
import { Language, I18N_STRINGS } from '@/lib/constants';
import { Terminal, Code, AlignLeft, Copy, Check, Sparkles } from 'lucide-react';

interface ResultTabsProps {
  diff: TokenDiffReport | null;
  model: string;
  lang: Language;
}

export const ResultTabs: React.FC<ResultTabsProps> = ({ diff, model, lang }) => {
  const t = I18N_STRINGS[lang];
  const [copiedJson, setCopiedJson] = React.useState(false);
  const [copiedCli, setCopiedCli] = React.useState(false);

  // Generate standardized API Transport envelope json string
  const jsonEnvelopeString = React.useMemo(() => {
    if (!diff) return '{\n  "data": null,\n  "metadata": {\n    "source": "token-diff",\n    "status": "waiting_for_input"\n  }\n}';
    return formatJson(diff, 12);
  }, [diff]);

  // Generate equivalent terminal command
  const cliCommandString = React.useMemo(() => {
    if (!diff) return `td diff before.txt after.txt --model ${model}`;
    const cleanBefore = diff.before.label.length > 25 ? 'original.txt' : `"${diff.before.label.replace(/"/g, '\\"')}"`;
    const cleanAfter = diff.after.label.length > 25 ? 'optimized.txt' : `"${diff.after.label.replace(/"/g, '\\"')}"`;
    return `td diff ${cleanBefore} ${cleanAfter} --model ${model}`;
  }, [diff, model]);

  const handleCopyJson = async () => {
    await navigator.clipboard.writeText(jsonEnvelopeString);
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 1500);
  };

  const handleCopyCli = async () => {
    await navigator.clipboard.writeText(cliCommandString);
    setCopiedCli(true);
    setTimeout(() => setCopiedCli(false), 1500);
  };

  return (
    <Card className="bg-zinc-900/60 border-zinc-800 backdrop-blur-sm shadow-md">
      <CardContent className="p-4">
        <Tabs defaultValue="summary" className="w-full">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <TabsList aria-label="Result format views" className="w-full sm:w-auto grid grid-cols-3 sm:inline-flex bg-zinc-950/60 border border-zinc-800/80 p-0.5">
              <TabsTrigger
                value="summary"
                className="text-[11px] sm:text-xs font-mono data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-100 flex items-center justify-center gap-1 sm:gap-1.5 px-1.5 sm:px-3 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
              >
                <AlignLeft className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate">{t.tabSummary}</span>
              </TabsTrigger>
              <TabsTrigger
                value="json"
                className="text-[11px] sm:text-xs font-mono data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-100 flex items-center justify-center gap-1 sm:gap-1.5 px-1.5 sm:px-3 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
              >
                <Code className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate">{t.tabJson}</span>
              </TabsTrigger>
              <TabsTrigger
                value="cli"
                className="text-[11px] sm:text-xs font-mono data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-100 flex items-center justify-center gap-1 sm:gap-1.5 px-1.5 sm:px-3 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
              >
                <Terminal className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                <span className="truncate">{t.tabCli}</span>
              </TabsTrigger>
            </TabsList>

            <div className="text-xs text-zinc-400 font-mono hidden sm:block">
              {diff ? (
                <span className="flex items-center gap-1 text-emerald-400/90">
                  <Sparkles className="w-3 h-3" aria-hidden="true" />
                  {diff.encoding}
                </span>
              ) : (
                <span>{t.statusIdle}</span>
              )}
            </div>
          </div>

          {/* TAB 1: Visual Summary */}
          <TabsContent value="summary" className="mt-4 space-y-3">
            {diff ? (
              <div className="space-y-3">
                <div className="p-3.5 rounded-md bg-zinc-950/70 border border-zinc-800/80 font-mono text-xs text-zinc-200 leading-relaxed">
                  <span className="text-emerald-400 font-semibold">
                    {lang === 'vi'
                      ? diff.diff.token_delta < 0
                        ? `Tiết kiệm ${Math.abs(diff.diff.token_delta)} tokens (-${Math.abs(diff.diff.token_delta_pct)}%) từ ${diff.before.token_count} xuống ${diff.after.token_count} (ký tự: ${diff.before.char_count} → ${diff.after.char_count}, ${diff.diff.char_delta_pct}%)`
                        : diff.diff.token_delta > 0
                        ? `Tăng thêm ${diff.diff.token_delta} tokens (+${diff.diff.token_delta_pct}%) từ ${diff.before.token_count} lên ${diff.after.token_count} (ký tự: ${diff.before.char_count} → ${diff.after.char_count}, +${diff.diff.char_delta_pct}%)`
                        : `Token count không đổi (${diff.before.token_count} tokens)`
                      : diff.summary}
                  </span>
                </div>

                {/* Table representation matching CLI output */}
                <div className="overflow-x-auto rounded-md border border-zinc-800/80 bg-zinc-950/50" tabIndex={0} aria-label="Token comparison table container" role="region">
                  <table className="w-full text-left font-mono text-xs" aria-label="Token difference breakdown table">
                    <thead>
                      <tr className="border-b border-zinc-800 text-zinc-300 bg-zinc-900/50">
                        <th scope="col" className="py-2 px-3 font-semibold">{t.tableTarget}</th>
                        <th scope="col" className="py-2 px-3 font-semibold">{t.tableTokens}</th>
                        <th scope="col" className="py-2 px-3 font-semibold">{t.tableChars}</th>
                        <th scope="col" className="py-2 px-3 font-semibold">{t.tableLines}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
                      <tr>
                        <td className="py-2 px-3 text-zinc-300 font-medium">
                          {diff.before.label === 'Before' ? t.beforeLabel : diff.before.label}
                        </td>
                        <td className="py-2 px-3">{diff.before.token_count}</td>
                        <td className="py-2 px-3">{diff.before.char_count}</td>
                        <td className="py-2 px-3">{diff.before.line_count}</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 text-zinc-300 font-medium">
                          {diff.after.label === 'After' ? t.afterLabel : diff.after.label}
                        </td>
                        <td className="py-2 px-3">{diff.after.token_count}</td>
                        <td className="py-2 px-3">{diff.after.char_count}</td>
                        <td className="py-2 px-3">{diff.after.line_count}</td>
                      </tr>
                      <tr className="bg-zinc-900/30 font-semibold">
                        <td className="py-2 px-3 text-zinc-100">{t.tableDiff}</td>
                        <td
                          className={`py-2 px-3 ${
                            diff.diff.token_delta < 0
                              ? 'text-emerald-400'
                              : diff.diff.token_delta > 0
                              ? 'text-rose-400'
                              : 'text-zinc-300'
                          }`}
                        >
                          {diff.diff.token_delta > 0 ? `+${diff.diff.token_delta}` : diff.diff.token_delta} ({diff.diff.token_delta > 0 ? `+${diff.diff.token_delta_pct}` : diff.diff.token_delta_pct}%)
                        </td>
                        <td className="py-2 px-3 text-zinc-300">
                          {diff.diff.char_delta > 0 ? `+${diff.diff.char_delta}` : diff.diff.char_delta} ({diff.diff.char_delta_pct}%)
                        </td>
                        <td className="py-2 px-3 text-zinc-300">
                          {diff.after.line_count - diff.before.line_count}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-xs font-mono text-zinc-400">
                {t.emptyPromptNotice}
              </div>
            )}
          </TabsContent>

          {/* TAB 2: JSON Transport Envelope */}
          <TabsContent value="json" className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-zinc-300">
                {t.transportEnvelopeHeader}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyJson}
                aria-label={copiedJson ? t.copiedJson : t.copyJson}
                className="h-7 px-2.5 text-xs font-mono bg-zinc-950 border-zinc-800 hover:bg-zinc-800 text-zinc-300 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
              >
                {copiedJson ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400 mr-1.5" aria-hidden="true" />
                    <span>{t.copiedJson}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
                    <span>{t.copyJson}</span>
                  </>
                )}
              </Button>
            </div>

            <pre
              tabIndex={0}
              role="region"
              aria-label="JSON format output"
              className="p-3.5 rounded-md bg-zinc-950 border border-zinc-800/80 font-mono text-xs text-zinc-200 overflow-x-auto max-h-[320px] scrollbar-thin focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
            >
              <code>{jsonEnvelopeString}</code>
            </pre>
          </TabsContent>

          {/* TAB 3: CLI Equivalent Command */}
          <TabsContent value="cli" className="mt-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-zinc-300">
                {t.cliHelpNote}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleCopyCli}
                aria-label={copiedCli ? t.copiedCli : t.copyCli}
                className="h-7 px-2.5 text-xs font-mono bg-zinc-950 border-zinc-800 hover:bg-zinc-800 text-zinc-300 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
              >
                {copiedCli ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400 mr-1.5" aria-hidden="true" />
                    <span>{t.copiedCli}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 mr-1.5" aria-hidden="true" />
                    <span>{t.copyCli}</span>
                  </>
                )}
              </Button>
            </div>

            <div
              tabIndex={0}
              role="region"
              aria-label="CLI command invocation"
              className="p-3.5 rounded-md bg-zinc-950 border border-zinc-800/80 flex items-center justify-between font-mono text-xs text-emerald-400 overflow-x-auto focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
            >
              <code>$ {cliCommandString}</code>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
