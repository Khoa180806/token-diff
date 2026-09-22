import { getEncoding, TiktokenEncoding } from 'js-tiktoken';
import { SupportedEncoding, TokenizerResult } from './types.js';
import { createError } from './errors.js';

// Cache encoder instances để tối ưu hiệu năng
const encoderCache = new Map<SupportedEncoding, ReturnType<typeof getEncoding>>();

const MODEL_TO_ENCODING: Record<string, SupportedEncoding> = {
  // o200k_base models
  'gpt-4o': 'o200k_base',
  'gpt-4o-mini': 'o200k_base',
  'chatgpt-4o-latest': 'o200k_base',
  'o1': 'o200k_base',
  'o1-mini': 'o200k_base',
  'o1-preview': 'o200k_base',

  // cl100k_base models
  'gpt-4': 'cl100k_base',
  'gpt-4-turbo': 'cl100k_base',
  'gpt-4-32k': 'cl100k_base',
  'gpt-3.5-turbo': 'cl100k_base',
  'gpt-3.5-turbo-16k': 'cl100k_base',
  'text-embedding-ada-002': 'cl100k_base',
  'text-embedding-3-small': 'cl100k_base',
  'text-embedding-3-large': 'cl100k_base',

  // p50k_base
  'text-davinci-003': 'p50k_base',
  'text-davinci-002': 'p50k_base',

  // r50k_base
  'davinci': 'r50k_base',
};

const VALID_ENCODINGS = new Set<SupportedEncoding>([
  'cl100k_base',
  'p50k_base',
  'r50k_base',
  'o200k_base',
]);

export function resolveEncodingForModel(modelOrEncoding: string): SupportedEncoding {
  const normalized = modelOrEncoding.trim().toLowerCase();

  // Kiểm tra nếu trực tiếp truyền tên encoding
  if (VALID_ENCODINGS.has(normalized as SupportedEncoding)) {
    return normalized as SupportedEncoding;
  }

  // Kiểm tra bảng map model -> encoding
  if (MODEL_TO_ENCODING[normalized]) {
    return MODEL_TO_ENCODING[normalized];
  }

  // Tiền tố model nhận biết tự động
  if (normalized.startsWith('gpt-4o') || normalized.startsWith('o1')) {
    return 'o200k_base';
  }
  if (normalized.startsWith('gpt-4') || normalized.startsWith('gpt-3.5')) {
    return 'cl100k_base';
  }

  throw createError(
    'UNSUPPORTED_OPERATION',
    `Mô hình hoặc kiểu mã hóa '${modelOrEncoding}' không được hỗ trợ.`,
    { model: modelOrEncoding }
  );
}

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
