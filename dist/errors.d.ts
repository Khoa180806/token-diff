import { ErrorCode, ApiErrorResponse } from './types.js';
export declare const ERROR_EXIT_CODES: Record<ErrorCode, number>;
export declare class TokenDiffError extends Error {
    readonly code: ErrorCode;
    readonly exitCode: number;
    readonly details?: Record<string, unknown>;
    constructor(code: ErrorCode, message: string, details?: Record<string, unknown>);
    toEnvelope(schemaVersion?: string): ApiErrorResponse;
}
export declare function createError(code: ErrorCode, message: string, details?: Record<string, unknown>): TokenDiffError;
//# sourceMappingURL=errors.d.ts.map