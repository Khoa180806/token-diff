import { TokenizerResult, TokenDiffReport, computeDiff } from 'ai-token-diff';
import { browserCountTokens } from './browserTokenizer';

export type TokenizeWorkerRequest = {
  id: string;
  type: 'diff';
  beforeText: string;
  afterText: string;
  model: string;
};

export type TokenizeWorkerResponse = {
  id: string;
  success: boolean;
  before?: TokenizerResult;
  after?: TokenizerResult;
  diff?: TokenDiffReport;
  error?: string;
};

if (typeof self !== 'undefined' && typeof window === 'undefined') {
  self.onmessage = async (e: MessageEvent<TokenizeWorkerRequest>) => {
    const { id, type, beforeText, afterText, model } = e.data;

    if (type === 'diff') {
      try {
        const [before, after] = await Promise.all([
          browserCountTokens(beforeText, model),
          browserCountTokens(afterText, model),
        ]);

        const diff = computeDiff(before, after, {
          beforeLabel: 'Before',
          afterLabel: 'After',
        });

        const response: TokenizeWorkerResponse = {
          id,
          success: true,
          before,
          after,
          diff,
        };

        self.postMessage(response);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        const response: TokenizeWorkerResponse = {
          id,
          success: false,
          error: message,
        };
        self.postMessage(response);
      }
    }
  };
}
