import { describe, it, expect } from 'vitest';
import { countTokens, resolveEncodingForModel } from '../src/tokenizer.js';
import { TokenDiffError } from '../src/errors.js';

describe('Tokenizer module', () => {
  it('resolves known models to proper encodings', () => {
    expect(resolveEncodingForModel('gpt-4o')).toBe('o200k_base');
    expect(resolveEncodingForModel('gpt-4o-mini')).toBe('o200k_base');
    expect(resolveEncodingForModel('gpt-4')).toBe('cl100k_base');
    expect(resolveEncodingForModel('gpt-3.5-turbo')).toBe('cl100k_base');
  });

  it('throws TokenDiffError UNSUPPORTED_OPERATION for unknown model', () => {
    expect(() => resolveEncodingForModel('non-existent-model-xyz')).toThrowError(TokenDiffError);
    try {
      resolveEncodingForModel('non-existent-model-xyz');
    } catch (err: any) {
      expect(err.code).toBe('UNSUPPORTED_OPERATION');
    }
  });

  it('correctly counts tokens for simple text (Hello world)', () => {
    const res = countTokens('Hello world', 'gpt-4o');
    expect(res.tokenCount).toBe(2);
    expect(res.charCount).toBe(11);
    expect(res.lineCount).toBe(1);
    expect(res.tokens.length).toBe(2);
    expect(res.encoding).toBe('o200k_base');
  });

  it('handles multiline strings and calculates line count', () => {
    const text = 'Line 1\nLine 2\nLine 3';
    const res = countTokens(text, 'gpt-4');
    expect(res.lineCount).toBe(3);
    expect(res.charCount).toBe(text.length);
    expect(res.tokenCount).toBeGreaterThan(0);
  });

  it('handles empty string gracefully', () => {
    const res = countTokens('', 'gpt-4o');
    expect(res.tokenCount).toBe(0);
    expect(res.tokens).toEqual([]);
    expect(res.charCount).toBe(0);
    expect(res.lineCount).toBe(0);
  });
});
