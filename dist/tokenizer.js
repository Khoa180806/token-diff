import { getEncoding } from 'js-tiktoken';
import { resolveEncodingForModel } from './models.js';
export * from './models.js';
// Cache encoder instances for performance
const encoderCache = new Map();
function getCachedEncoder(encoding) {
    let encoder = encoderCache.get(encoding);
    if (!encoder) {
        encoder = getEncoding(encoding);
        encoderCache.set(encoding, encoder);
    }
    return encoder;
}
export function countTokens(text, modelOrEncoding = 'gpt-4o') {
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
//# sourceMappingURL=tokenizer.js.map