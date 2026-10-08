import { Tiktoken } from 'js-tiktoken/lite';
import type { SupportedEncoding, TokenizerResult } from '@/lib/types';
import { resolveEncodingForModel } from '@/lib/models';
import { loadRankForEncoding } from './ranks';

// In-memory cache for Tiktoken instances in the client/worker thread
const encoderCache = new Map<SupportedEncoding, Tiktoken>();

export async function getBrowserEncoder(encoding: SupportedEncoding): Promise<Tiktoken> {
  let encoder = encoderCache.get(encoding);
  if (!encoder) {
    const rankData = await loadRankForEncoding(encoding);
    encoder = new Tiktoken(rankData);
    encoderCache.set(encoding, encoder);
  }
  return encoder;
}

export async function browserCountTokens(
  text: string,
  modelOrEncoding = 'gpt-4o'
): Promise<TokenizerResult> {
  const encoding = resolveEncodingForModel(modelOrEncoding);
  const encoder = await getBrowserEncoder(encoding);

  const tokens = text.length === 0 ? [] : Array.from(encoder.encode(text));
  const lineCount = text.length === 0 ? 0 : text.split('\n').length;

  return {
    tokenCount: tokens.length,
    tokens,
    charCount: text.length,
    lineCount,
    encoding,
    model: modelOrEncoding,
  };
}
