import { describe, it, expect } from 'vitest';
import { computeDiff } from '../src/diff.js';
import { TokenizerResult } from '../src/types.js';

describe('Diff module', () => {
  const mockBefore: TokenizerResult = {
    tokenCount: 1000,
    tokens: new Array(1000).fill(1),
    charCount: 4000,
    lineCount: 100,
    encoding: 'cl100k_base',
    model: 'gpt-4',
  };

  const mockAfter: TokenizerResult = {
    tokenCount: 750,
    tokens: new Array(750).fill(1),
    charCount: 3000,
    lineCount: 70,
    encoding: 'cl100k_base',
    model: 'gpt-4',
  };

  it('calculates token reduction accurately', () => {
    const report = computeDiff(mockBefore, mockAfter);

    expect(report.schema_version).toBe('1.0');
    expect(report.model).toBe('gpt-4');
    expect(report.encoding).toBe('cl100k_base');
    expect(report.before.token_count).toBe(1000);
    expect(report.after.token_count).toBe(750);
    expect(report.diff.token_delta).toBe(-250);
    expect(report.diff.token_delta_pct).toBe(-25.0);
    expect(report.diff.char_delta).toBe(-1000);
    expect(report.diff.char_delta_pct).toBe(-25.0);
    expect(report.summary).toContain('-25%');
    expect(report.summary).toContain('1000');
    expect(report.summary).toContain('750');
  });

  it('calculates token increase accurately', () => {
    const report = computeDiff(mockAfter, mockBefore);

    expect(report.diff.token_delta).toBe(250);
    expect(report.diff.token_delta_pct).toBe(33.33);
    expect(report.summary).toContain('+33.33%');
  });

  it('handles zero change when before and after have identical token counts', () => {
    const report = computeDiff(mockBefore, mockBefore);

    expect(report.diff.token_delta).toBe(0);
    expect(report.diff.token_delta_pct).toBe(0);
    expect(report.summary.toLowerCase()).toContain('no change');
  });

  it('handles before having 0 tokens without dividing by zero', () => {
    const emptyBefore: TokenizerResult = {
      tokenCount: 0,
      tokens: [],
      charCount: 0,
      lineCount: 0,
      encoding: 'o200k_base',
      model: 'gpt-4o',
    };

    const someAfter: TokenizerResult = {
      tokenCount: 50,
      tokens: new Array(50).fill(1),
      charCount: 200,
      lineCount: 5,
      encoding: 'o200k_base',
      model: 'gpt-4o',
    };

    const report = computeDiff(emptyBefore, someAfter);
    expect(report.diff.token_delta).toBe(50);
    expect(report.diff.token_delta_pct).toBe(100);
    expect(Number.isFinite(report.diff.token_delta_pct)).toBe(true);
  });

  it('respects custom before and after labels', () => {
    const report = computeDiff(mockBefore, mockAfter, {
      beforeLabel: 'original-prompt',
      afterLabel: 'compressed-prompt',
    });

    expect(report.before.label).toBe('original-prompt');
    expect(report.after.label).toBe('compressed-prompt');
  });
});
