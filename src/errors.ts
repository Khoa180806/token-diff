import { ErrorCode, ApiErrorResponse } from './types.js';

export const ERROR_EXIT_CODES: Record<ErrorCode, number> = {
  INVALID_INPUT: 2,
  UNSUPPORTED_OPERATION: 2,
  NOT_FOUND: 3,
  PERMISSION_DENIED: 4,
  DEPENDENCY_UNAVAILABLE: 5,
  TIMEOUT: 6,
  RATE_LIMITED: 7,
  INTERNAL_ERROR: 1,
  SCHEMA_VERSION_UNSUPPORTED: 2,
};

export class TokenDiffError extends Error {
  public readonly code: ErrorCode;
  public readonly exitCode: number;
  public readonly details?: Record<string, unknown>;

  constructor(code: ErrorCode, message: string, details?: Record<string, unknown>) {
    super(message);
    this.name = 'TokenDiffError';
    this.code = code;
    this.exitCode = ERROR_EXIT_CODES[code] ?? 1;
    this.details = details;
  }

  public toEnvelope(schemaVersion = '1.0'): ApiErrorResponse {
    return {
      error: {
        code: this.code,
        message: this.message,
        ...(this.details ? { details: this.details } : {}),
      },
      metadata: {
        schema_version: schemaVersion,
        source: 'token-diff',
      },
    };
  }
}

export function createError(
  code: ErrorCode,
  message: string,
  details?: Record<string, unknown>
): TokenDiffError {
  return new TokenDiffError(code, message, details);
}
