export function formatJson(report, durationMs = 0) {
    const envelope = {
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
export function formatCountJson(report, durationMs = 0) {
    const envelope = {
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
export function formatCountHuman(report) {
    const lines = [];
    lines.push('=== Token Count Report ===');
    lines.push(`File: ${report.stats.label}`);
    lines.push(`Model: ${report.model} (${report.encoding})`);
    lines.push('');
    lines.push(`Tokens: ${report.stats.token_count}`);
    lines.push(`Chars:  ${report.stats.char_count}`);
    lines.push(`Lines:  ${report.stats.line_count}`);
    return lines.join('\n');
}
export function formatHuman(report) {
    const lines = [];
    lines.push('=== Token Diff Report ===');
    lines.push(`Model: ${report.model} (${report.encoding})`);
    lines.push('');
    const colTarget = 14;
    const colTokens = 12;
    const colChars = 12;
    const colLines = 10;
    const pad = (str, width) => String(str).padEnd(width);
    const padNum = (num, width) => String(num).padStart(width);
    // Header row
    lines.push(`${pad('Target', colTarget)} ${pad('Tokens', colTokens)} ${pad('Chars', colChars)} ${pad('Lines', colLines)}`);
    lines.push('-'.repeat(colTarget + colTokens + colChars + colLines + 3));
    // Data rows
    lines.push(`${pad(report.before.label, colTarget)} ${padNum(report.before.token_count, colTokens)} ${padNum(report.before.char_count, colChars)} ${padNum(report.before.line_count, colLines)}`);
    lines.push(`${pad(report.after.label, colTarget)} ${padNum(report.after.token_count, colTokens)} ${padNum(report.after.char_count, colChars)} ${padNum(report.after.line_count, colLines)}`);
    lines.push('-'.repeat(colTarget + colTokens + colChars + colLines + 3));
    // Diff row
    const tokenSign = report.diff.token_delta > 0 ? '+' : '';
    const tokenDeltaStr = `${tokenSign}${report.diff.token_delta} (${tokenSign}${report.diff.token_delta_pct}%)`;
    const charSign = report.diff.char_delta > 0 ? '+' : '';
    const charDeltaStr = `${charSign}${report.diff.char_delta} (${charSign}${report.diff.char_delta_pct}%)`;
    const lineDelta = report.after.line_count - report.before.line_count;
    const lineSign = lineDelta > 0 ? '+' : '';
    const lineDeltaStr = `${lineSign}${lineDelta}`;
    lines.push(`${pad('Diff', colTarget)} ${pad(tokenDeltaStr, colTokens)} ${pad(charDeltaStr, colChars)} ${pad(lineDeltaStr, colLines)}`);
    lines.push('');
    lines.push(`Summary: ${report.summary}`);
    return lines.join('\n');
}
//# sourceMappingURL=formatter.js.map