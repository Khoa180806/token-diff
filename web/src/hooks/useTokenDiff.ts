import { useState, useEffect } from 'react';
import { TokenizerResult, TokenDiffReport } from 'ai-token-diff';
import { requestTokenDiff } from '@/lib/tokenizer/client';

export interface UseTokenDiffOptions {
  beforeText: string;
  afterText: string;
  model: string;
  debounceMs?: number;
}

export interface UseTokenDiffResult {
  before: TokenizerResult | null;
  after: TokenizerResult | null;
  diff: TokenDiffReport | null;
  loading: boolean;
  error: string | null;
}

interface CalculatedState {
  before: TokenizerResult;
  after: TokenizerResult;
  diff: TokenDiffReport;
  key: string;
}

export function useTokenDiff({
  beforeText,
  afterText,
  model,
  debounceMs = 200,
}: UseTokenDiffOptions): UseTokenDiffResult {
  const currentKey = `${model}:::${beforeText}:::${afterText}`;
  const [calculated, setCalculated] = useState<CalculatedState | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const timer = window.setTimeout(async () => {
      try {
        const result = await requestTokenDiff(beforeText, afterText, model);
        if (active) {
          setCalculated({
            before: result.before,
            after: result.after,
            diff: result.diff,
            key: currentKey,
          });
          setError(null);
        }
      } catch (err: unknown) {
        if (active) {
          const msg = err instanceof Error ? err.message : String(err);
          setError(msg);
        }
      }
    }, debounceMs);

    return () => {
      active = false;
      window.clearTimeout(timer);
    };
  }, [beforeText, afterText, model, debounceMs, currentKey]);

  const isCurrent = calculated !== null && calculated.key === currentKey;
  const loading = !isCurrent;

  return {
    before: calculated?.before ?? null,
    after: calculated?.after ?? null,
    diff: calculated?.diff ?? null,
    loading,
    error,
  };
}
