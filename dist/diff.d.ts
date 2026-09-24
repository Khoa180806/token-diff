import { TokenizerResult, TokenDiffReport } from './types.js';
export interface DiffOptions {
    beforeLabel?: string;
    afterLabel?: string;
    schemaVersion?: string;
}
export declare function computeDiff(before: TokenizerResult, after: TokenizerResult, options?: DiffOptions): TokenDiffReport;
//# sourceMappingURL=diff.d.ts.map