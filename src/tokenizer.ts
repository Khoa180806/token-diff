import { getEncoding, TiktokenEncoding } from 'js-tiktoken';
import { SupportedEncoding, TokenizerResult } from './types.js';
import { resolveEncodingForModel } from './models.js';

export * from './models.js';

// Cache encoder instances for performance
const encoderCache = new Map<SupportedEncoding, ReturnType<typeof getEncoding>>();

function getCachedEncoder(encoding: SupportedEncoding) {
  let encoder = encoderCache.get(encoding);
  if (!encoder) {
    encoder = getEncoding(encoding as TiktokenEncoding);
    encoderCache.set(encoding, encoder);
  }
  return encoder;
}

export function countTokens(text: string, modelOrEncoding = 'gpt-4o'): TokenizerResult {
  const encoding = resolveEncodingForModel(modelOrEncoding);
  const encoder = getCachedEncoder(encoding);

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
