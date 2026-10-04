import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useTokenDiff } from '@/hooks/useTokenDiff';

describe('useTokenDiff hook', () => {
  it('calculates token diff correctly with initial values', async () => {
    const { result } = renderHook(() =>
      useTokenDiff({
        beforeText: 'Write a comprehensive guide on Docker containers.',
        afterText: 'Guide on Docker containers.',
        model: 'gpt-4o',
        debounceMs: 50,
      })
    );

    // Initial state
    expect(result.current.loading).toBe(true);

    // Await calculation completion (first run compiles/loads BPE rank)
    await waitFor(
      () => {
        expect(result.current.loading).toBe(false);
      },
      { timeout: 5000 }
    );

    expect(result.current.error).toBeNull();
    expect(result.current.diff).not.toBeNull();
    expect(result.current.diff?.diff.token_delta).toBeLessThan(0);
    expect(result.current.before?.tokenCount).toBeGreaterThan(0);
    expect(result.current.after?.tokenCount).toBeGreaterThan(0);
  });

  it('handles empty inputs gracefully without error', async () => {
    const { result } = renderHook(() =>
      useTokenDiff({
        beforeText: '',
        afterText: '',
        model: 'gpt-4o',
        debounceMs: 10,
      })
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeNull();
    expect(result.current.before?.tokenCount).toBe(0);
    expect(result.current.after?.tokenCount).toBe(0);
    expect(result.current.diff?.diff.token_delta).toBe(0);
  });
});
