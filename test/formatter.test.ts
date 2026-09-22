import { describe, it, expect } from 'vitest';
import { formatJson, formatHuman } from '../src/formatter.js';
import { TokenDiffReport } from '../src/types.js';

describe('Formatter module', () => {
  const sampleReport: TokenDiffReport = {
    schema_version: '1.0',
    model: 'gpt-4o',
    encoding: 'o200k_base',
    before: {
      label: 'before',
      token_count: 1200,
      char_count: 4800,
      line_count: 120,
    },
    after: {
      label: 'after',
      token_count: 840,
      char_count: 3360,
      line_count: 85,
    },
    diff: {
      token_delta: -360,
      token_delta_pct: -30.0,
      char_delta: -1440,
      char_delta_pct: -30.0,
    },
    summary: 'Reduced by 360 tokens (-30.00%) from 1200 to 840',
  };

  it('formatJson wraps report inside valid envelope structure', () => {
    const jsonStr = formatJson(sampleReport, 25);
    const parsed = JSON.parse(jsonStr);

    expect(parsed.data).toBeDefined();
    expect(parsed.data.schema_version).toBe('1.0');
    expect(parsed.data.before.token_count).toBe(1200);
    expect(parsed.data.after.token_count).toBe(840);
    expect(parsed.data.diff.token_delta).toBe(-360);

    expect(parsed.metadata).toBeDefined();
    expect(parsed.metadata.schema_version).toBe('1.0');
    expect(parsed.metadata.source).toBe('token-diff');
    expect(parsed.metadata.duration_ms).toBe(25);
    expect(parsed.metadata.truncated).toBe(false);
    expect(parsed.metadata.next_cursor).toBeNull();
  });

  it('formatHuman outputs readable table with summary line', () => {
    const output = formatHuman(sampleReport);

    expect(output).toContain('Token Diff');
    expect(output).toContain('gpt-4o');
    expect(output).toContain('1200');
    expect(output).toContain('840');
    expect(output).toContain('-360');
    expect(output).toContain(sampleReport.summary);
  });
});
