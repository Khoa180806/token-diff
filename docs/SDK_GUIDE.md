# TypeScript & JavaScript SDK Integration Guide

This guide describes how to integrate and use `token-diff` (`ai-token-diff`) programmatically as a Node.js library in TypeScript or JavaScript applications, agent orchestration pipelines, and testing frameworks.

---

## 1. Installation

Install the package as a local dependency in your project:

```bash
# npm
npm install ai-token-diff

# pnpm
pnpm add ai-token-diff

# yarn
yarn add ai-token-diff
```

---

## 2. Exports Overview

`ai-token-diff` ships with complete ESM and TypeScript type definitions:

```typescript
import {
  // Tokenizer primitives
  countTokens,
  resolveModelEncoding,

  // Diff calculation
  computeDiff,

  // Formatters
  formatHuman,
  formatJson,
  formatCountHuman,
  formatCountJson,

  // Type definitions
  EncodingResult,
  TokenDiffReport,
  TokenCountReport,
  ApiEnvelope,
  SupportedEncoding,
} from 'ai-token-diff';
```

---

## 3. Quick Start

### Basic Token Counting
```typescript
import { countTokens } from 'ai-token-diff';

const result = countTokens('Hello world! How are you today?', 'gpt-4o');

console.log(`Tokens: ${result.token_count}`); // 7
console.log(`Characters: ${result.char_count}`); // 31
console.log(`Lines: ${result.line_count}`); // 1
```

### Computing Prompt Diffs
```typescript
import { countTokens, computeDiff, formatHuman, formatJson } from 'ai-token-diff';

// 1. Tokenize baseline and optimized prompts
const baseline = countTokens('Please write a Python function to calculate fibonacci numbers.', 'gpt-4o');
const optimized = countTokens('Write Python fibonacci function.', 'gpt-4o');

// 2. Compute diff metrics
const report = computeDiff(baseline, optimized, {
  beforeLabel: 'baseline_prompt',
  afterLabel: 'optimized_prompt',
});

console.log(`Saved ${Math.abs(report.diff.token_delta)} tokens (${report.diff.token_delta_pct}%)`);

// 3. Render human-readable ANSI table
console.log(formatHuman(report));

// 4. Render machine-readable JSON envelope
const jsonEnvelope = formatJson(report, /* durationMs */ 12);
console.log(jsonEnvelope);
```

---

## 4. Key TypeScript Types

### `EncodingResult`
Returned by `countTokens()`:
```typescript
export interface EncodingResult {
  token_count: number;
  char_count: number;
  line_count: number;
  model: string;
  encoding: SupportedEncoding;
}
```

### `TokenDiffReport`
Calculated by `computeDiff()`:
```typescript
export interface TokenDiffReport {
  schema_version: '1.0';
  model: string;
  encoding: SupportedEncoding;
  before: {
    label: string;
    token_count: number;
    char_count: number;
    line_count: number;
  };
  after: {
    label: string;
    token_count: number;
    char_count: number;
    line_count: number;
  };
  diff: {
    token_delta: number;      // after - before (negative means token reduction)
    token_delta_pct: number;  // relative % change rounded to 2 decimals
    char_delta: number;
    char_delta_pct: number;
  };
  summary: string;
}
```

### `ApiEnvelope<T>`
Standardized integration wrapper conforming to the [AI Developer Tool Ecosystem Docs](https://github.com/Khoa180806/AI_Developer_Tool_Ecosystem/tree/master/docs):
```typescript
export interface ApiEnvelope<T> {
  data: T;
  metadata: {
    schema_version: string;
    source: 'token-diff';
    duration_ms: number;
    truncated: boolean;
    next_cursor: string | null;
  };
}
```

---

## 5. Practical Implementation Recipes

### Recipe 1: Pre-Flight Context Budget Assertion
Ensure that a generated context payload stays within strict model limits before making an expensive LLM API call:

```typescript
import { countTokens } from 'ai-token-diff';

export function assertTokenBudget(systemPrompt: string, userMessage: string, maxTokens = 8000): void {
  const combined = `${systemPrompt}\n\n${userMessage}`;
  const { token_count } = countTokens(combined, 'gpt-4o');

  if (token_count > maxTokens) {
    throw new Error(
      `Context budget exceeded! Expected <= ${maxTokens} tokens, but payload has ${token_count} tokens.`
    );
  }
}
```

### Recipe 2: Automated CI/CD Regression Test (Vitest / Jest)
Verify that prompt compression utilities consistently reduce tokens by at least 25%:

```typescript
import { describe, it, expect } from 'vitest';
import { countTokens, computeDiff } from 'ai-token-diff';
import { compressContext } from './my-compressor';

describe('Context Compressor', () => {
  it('achieves at least 25% token reduction on raw log output', () => {
    const rawLogs = '... raw verbose logs ...';
    const compressedLogs = compressContext(rawLogs);

    const before = countTokens(rawLogs, 'gpt-4o');
    const after = countTokens(compressedLogs, 'gpt-4o');
    const report = computeDiff(before, after);

    // Delta percentage should be <= -25.0%
    expect(report.diff.token_delta_pct).toBeLessThanOrEqual(-25.0);
  });
});
```

### Recipe 3: High-Throughput Batch Tokenization
`ai-token-diff` maintains an internal in-memory encoder cache. Reusing the same model across batch iterations executes in sub-millisecond speeds:

```typescript
import { countTokens } from 'ai-token-diff';

const documents: string[] = loadLargeBatchOfDocs();

const totalTokens = documents.reduce((acc, doc) => {
  // First iteration initializes the BPE cache (~50ms)
  // All subsequent iterations execute in <0.2ms
  return acc + countTokens(doc, 'gpt-4o').token_count;
}, 0);

console.log(`Processed ${documents.length} docs with ${totalTokens} total tokens.`);
```

---

## 6. Error Handling

`ai-token-diff` throws standard JavaScript `Error` objects with informative messages for invalid arguments:

```typescript
import { countTokens } from 'ai-token-diff';

try {
  // Throws Error: Unsupported model or encoding: invalid-model
  countTokens('Test text', 'invalid-model');
} catch (err: unknown) {
  if (err instanceof Error) {
    console.error(`Tokenization failed: ${err.message}`);
  }
}
```
