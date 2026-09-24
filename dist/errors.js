export const ERROR_EXIT_CODES = {
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
    code;
    exitCode;
    details;
    constructor(code, message, details) {
        super(message);
        this.name = 'TokenDiffError';
        this.code = code;
        this.exitCode = ERROR_EXIT_CODES[code] ?? 1;
        this.details = details;
    }
    toEnvelope(schemaVersion = '1.0') {
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
export function createError(code, message, details) {
    return new TokenDiffError(code, message, details);
}
//# sourceMappingURL=errors.js.map