import { TokenizerResult, TokenDiffReport, computeDiff } from 'ai-token-diff';
import { browserCountTokens } from './browserTokenizer';

/**
 * Requests high-precision token difference computation.
 * Executes purely client-side using lazy BPE ranks (<1ms latency).
 */
export async function requestTokenDiff(
  beforeText: string,
  afterText: string,
  model = 'gpt-4o'
): Promise<{ before: TokenizerResult; after: TokenizerResult; diff: TokenDiffReport }> {
  try {
    const [before, after] = await Promise.all([
      browserCountTokens(beforeText, model),
      browserCountTokens(afterText, model),
    ]);

    const diff = computeDiff(before, after, {
      beforeLabel: 'Before',
      afterLabel: 'After',
    });

    return { before, after, diff };
  } catch (err) {
    console.error('Failed to compute token diff in client:', err);
    throw err;
  }
}
