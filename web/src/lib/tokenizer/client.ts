import { TokenizerResult, TokenDiffReport, computeDiff } from 'ai-token-diff';
import { browserCountTokens } from './browserTokenizer';
import { TokenizeWorkerRequest, TokenizeWorkerResponse } from './worker';

let workerInstance: Worker | null = null;
const pendingRequests = new Map<
  string,
  {
    resolve: (res: { before: TokenizerResult; after: TokenizerResult; diff: TokenDiffReport }) => void;
    reject: (err: Error) => void;
  }
>();

function getWorker(): Worker | null {
  if (typeof window === 'undefined') return null;

  if (!workerInstance) {
    try {
      workerInstance = new Worker(new URL('./worker.ts', import.meta.url), {
        type: 'module',
      });

      workerInstance.onmessage = (e: MessageEvent<TokenizeWorkerResponse>) => {
        const { id, success, before, after, diff, error } = e.data;
        const pending = pendingRequests.get(id);
        if (!pending) return;

        pendingRequests.delete(id);

        if (success && before && after && diff) {
          pending.resolve({ before, after, diff });
        } else {
          pending.reject(new Error(error || 'Worker execution failed'));
        }
      };

      workerInstance.onerror = (e) => {
        console.error('Worker error:', e);
      };
    } catch (err) {
      console.warn('Failed to initialize Web Worker, falling back to main-thread processing:', err);
      workerInstance = null;
    }
  }

  return workerInstance;
}

export async function requestTokenDiff(
  beforeText: string,
  afterText: string,
  model = 'gpt-4o'
): Promise<{ before: TokenizerResult; after: TokenizerResult; diff: TokenDiffReport }> {
  const worker = getWorker();

  if (worker) {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    const payload: TokenizeWorkerRequest = {
      id,
      type: 'diff',
      beforeText,
      afterText,
      model,
    };

    return new Promise((resolve, reject) => {
      pendingRequests.set(id, { resolve, reject });
      worker.postMessage(payload);
    });
  }

  // Graceful fallback to in-thread calculation (e.g. during SSR or in test runners without Web Worker API)
  const [before, after] = await Promise.all([
    browserCountTokens(beforeText, model),
    browserCountTokens(afterText, model),
  ]);

  const diff = computeDiff(before, after, {
    beforeLabel: 'Before',
    afterLabel: 'After',
  });

  return { before, after, diff };
}
