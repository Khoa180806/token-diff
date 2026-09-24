export type SupportedEncoding = 'cl100k_base' | 'p50k_base' | 'r50k_base' | 'o200k_base';
export interface TokenizerResult {
    tokenCount: number;
    tokens: number[];
    charCount: number;
    lineCount: number;
    encoding: SupportedEncoding;
    model: string;
}
export interface InputTokenStats {
    label: string;
    token_count: number;
    char_count: number;
    line_count: number;
}
export interface TokenDeltaStats {
    token_delta: number;
    token_delta_pct: number;
    char_delta: number;
    char_delta_pct: number;
}
export interface TokenDiffReport {
    schema_version: string;
    model: string;
    encoding: string;
    before: InputTokenStats;
    after: InputTokenStats;
    diff: TokenDeltaStats;
    summary: string;
}
export interface TokenCountReport {
    schema_version: string;
    model: string;
    encoding: string;
    stats: InputTokenStats;
}
export interface ResponseMetadata {
    schema_version: string;
    source: string;
    duration_ms: number;
    truncated: boolean;
    next_cursor: string | null;
}
export interface ApiEnvelope<T> {
    data: T;
    metadata: ResponseMetadata;
}
export type ErrorCode = 'INVALID_INPUT' | 'NOT_FOUND' | 'PERMISSION_DENIED' | 'TIMEOUT' | 'RATE_LIMITED' | 'DEPENDENCY_UNAVAILABLE' | 'INTERNAL_ERROR' | 'UNSUPPORTED_OPERATION' | 'SCHEMA_VERSION_UNSUPPORTED';
export interface ErrorDetail {
    code: ErrorCode;
    message: string;
    details?: Record<string, unknown>;
}
export interface ApiErrorResponse {
    error: ErrorDetail;
    metadata: {
        schema_version: string;
        source?: string;
    };
}
//# sourceMappingURL=types.d.ts.map