import { useState, useEffect, useRef } from 'react';
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

export function useTokenDiff({
  beforeText,
  afterText,
  model,
  debounceMs = 200,
}: UseTokenDiffOptions): UseTokenDiffResult {
  const [before, setBefore] = useState<TokenizerResult | null>(null);
  const [after, setAfter] = useState<TokenizerResult | null>(null);
  const [diff, setDiff] = useState<TokenDiffReport | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<number | null>(null);

  useEffect(() => {
    setLoading(true);

    if (abortControllerRef.current !== null) {
      window.clearTimeout(abortControllerRef.current);
    }

    abortControllerRef.current = window.setTimeout(async () => {
      try {
        const result = await requestTokenDiff(beforeText, afterText, model);
        setBefore(result.before);
        setAfter(result.after);
        setDiff(result.diff);
        setError(null);
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : String(err);
        setError(msg);
      } finally {
        setLoading(false);
      }
    }, debounceMs);

    return () => {
      if (abortControllerRef.current !== null) {
        window.clearTimeout(abortControllerRef.current);
      }
    };
  }, [beforeText, afterText, model, debounceMs]);

  return {
    before,
    after,
    diff,
    loading,
    error,
  };
}
