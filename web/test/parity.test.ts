import { describe, it, expect } from 'vitest';
import { countTokens as coreCountTokens } from 'ai-token-diff';
// Sẽ import browser tokenize implementation từ @/lib/tokenizer/browserTokenizer
import { browserCountTokens } from '@/lib/tokenizer/browserTokenizer';

describe('Tokenizer Parity: Web Browser Tokenizer vs Core Tokenizer', () => {
  const testCases = [
    {
      name: 'Empty string',
      text: '',
    },
    {
      name: 'Short plain English prompt',
      text: 'You are a helpful and concise software engineer.',
    },
    {
      name: 'Multiline complex markdown and code snippet',
      text: `# Fibonacci Implementation
\`\`\`typescript
function fib(n: number): number {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}
\`\`\`
Optimized with recursion.`,
    },
    {
      name: 'Vietnamese unicode text with diacritics',
      text: 'Đo lường mức tiêu thụ token và so sánh độ lệch context cho các luồng LLM.',
    },
    {
      name: 'Punctuation, emoji and whitespace symbols',
      text: '🚀 Hello, world! 💻 #testing @ai_token_diff { [ ( ) ] } \t \n\n 12345',
    },
  ];

  const encodingsToTest = [
    { encoding: 'o200k_base', model: 'gpt-4o' },
    { encoding: 'cl100k_base', model: 'gpt-4' },
    { encoding: 'p50k_base', model: 'text-davinci-003' },
    { encoding: 'r50k_base', model: 'davinci' },
  ];

  for (const { encoding, model } of encodingsToTest) {
    describe(`Encoding fidelity: ${encoding} (${model})`, () => {
      for (const tc of testCases) {
        it(`produces exact same token count and metadata for: ${tc.name}`, async () => {
          const expected = coreCountTokens(tc.text, model);
          const actual = await browserCountTokens(tc.text, model);

          expect(actual.tokenCount).toBe(expected.tokenCount);
          expect(actual.charCount).toBe(expected.charCount);
          expect(actual.lineCount).toBe(expected.lineCount);
          expect(actual.encoding).toBe(expected.encoding);
          expect(actual.tokens).toEqual(expected.tokens);
        });
      }
    });
  }
});
