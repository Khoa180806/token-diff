import pc from 'picocolors';
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
    lines.push(pc.bold(pc.cyan('=== Token Count Report ===')));
    lines.push(`File:  ${pc.bold(report.stats.label)}`);
    lines.push(`Model: ${pc.bold(report.model)} ${pc.dim(`(${report.encoding})`)}`);
    lines.push('');
    lines.push(`Tokens: ${pc.bold(pc.green(String(report.stats.token_count)))}`);
    lines.push(`Chars:  ${report.stats.char_count}`);
    lines.push(`Lines:  ${report.stats.line_count}`);
    return lines.join('\n');
}
function formatCell(str, width) {
    const clean = String(str).replace(/\r?\n/g, ' ').trim();
    if (clean.length <= width) {
        return clean.padEnd(width);
    }
    return (clean.substring(0, width - 3) + '...').padEnd(width);
}
export function formatHuman(report) {
    const lines = [];
    lines.push(pc.bold(pc.cyan('=== Token Diff Report ===')));
    lines.push(`Model: ${pc.bold(report.model)} ${pc.dim(`(${report.encoding})`)}`);
    lines.push('');
    const cleanBefore = report.before.label.replace(/\r?\n/g, ' ').trim();
    const cleanAfter = report.after.label.replace(/\r?\n/g, ' ').trim();
    const colTarget = Math.max(16, Math.min(30, Math.max(cleanBefore.length, cleanAfter.length, 6)));
    const colTokens = 16;
    const colChars = 16;
    const colLines = 8;
    // Header row
    lines.push(pc.bold(`${formatCell('Target', colTarget)} ${formatCell('Tokens', colTokens)} ${formatCell('Chars', colChars)} ${formatCell('Lines', colLines)}`));
    lines.push(pc.dim('-'.repeat(colTarget + colTokens + colChars + colLines + 3)));
    // Data rows
    lines.push(`${formatCell(report.before.label, colTarget)} ${formatCell(report.before.token_count, colTokens)} ${formatCell(report.before.char_count, colChars)} ${formatCell(report.before.line_count, colLines)}`);
    lines.push(`${formatCell(report.after.label, colTarget)} ${formatCell(report.after.token_count, colTokens)} ${formatCell(report.after.char_count, colChars)} ${formatCell(report.after.line_count, colLines)}`);
    lines.push(pc.dim('-'.repeat(colTarget + colTokens + colChars + colLines + 3)));
    // Diff row
    const tokenSign = report.diff.token_delta > 0 ? '+' : '';
    const tokenDeltaStr = `${tokenSign}${report.diff.token_delta} (${tokenSign}${report.diff.token_delta_pct}%)`;
    let paddedTokenDiff = formatCell(tokenDeltaStr, colTokens);
    if (report.diff.token_delta < 0) {
        paddedTokenDiff = pc.green(paddedTokenDiff);
    }
    else if (report.diff.token_delta > 0) {
        paddedTokenDiff = pc.red(paddedTokenDiff);
    }
    else {
        paddedTokenDiff = pc.dim(paddedTokenDiff);
    }
    const charSign = report.diff.char_delta > 0 ? '+' : '';
    const charDeltaStr = `${charSign}${report.diff.char_delta} (${charSign}${report.diff.char_delta_pct}%)`;
    let paddedCharDiff = formatCell(charDeltaStr, colChars);
    if (report.diff.char_delta < 0) {
        paddedCharDiff = pc.green(paddedCharDiff);
    }
    else if (report.diff.char_delta > 0) {
        paddedCharDiff = pc.red(paddedCharDiff);
    }
    else {
        paddedCharDiff = pc.dim(paddedCharDiff);
    }
    const lineDelta = report.after.line_count - report.before.line_count;
    const lineSign = lineDelta > 0 ? '+' : '';
    const lineDeltaStr = `${lineSign}${lineDelta}`;
    const paddedLineDiff = formatCell(lineDeltaStr, colLines);
    lines.push(`${pc.bold(formatCell('Diff', colTarget))} ${paddedTokenDiff} ${paddedCharDiff} ${paddedLineDiff}`);
    lines.push('');
    let coloredSummary = report.summary;
    if (report.diff.token_delta < 0) {
        coloredSummary = pc.green(report.summary);
    }
    else if (report.diff.token_delta > 0) {
        coloredSummary = pc.red(report.summary);
    }
    lines.push(`${pc.bold('Summary:')} ${coloredSummary}`);
    return lines.join('\n');
}
//# sourceMappingURL=formatter.js.map