import type { ApiEnvelope, TokenDiffReport } from '@core/types';

/**
 * Standardized API transport envelope JSON formatter for browser playground.
 * Zero external CLI/terminal dependencies.
 */
export function formatJson(report: TokenDiffReport, durationMs = 0): string {
  const envelope: ApiEnvelope<TokenDiffReport> = {
    data: report,
    metadata: {
      schema_version: report.schema_version,
      source: 'token-diff',
      duration_ms: durationMs,
      truncated: false,
      next_cursor: null,
    },
  };

  return JSON.stringify(envelope, null, 2);
}
