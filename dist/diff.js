function calculatePercentage(current, original) {
    if (original === 0) {
        return current === 0 ? 0 : 100;
    }
    const pct = ((current - original) / original) * 100;
    return Number(pct.toFixed(2));
}
function generateSummary(beforeTokens, afterTokens, delta, deltaPct, beforeChars, afterChars, charDeltaPct) {
    if (delta === 0) {
        return `No change in token count (${beforeTokens} tokens, ${beforeChars} chars)`;
    }
    const sign = delta > 0 ? '+' : '';
    const action = delta < 0 ? 'Reduced' : 'Increased';
    const absDelta = Math.abs(delta);
    return `${action} by ${absDelta} tokens (${sign}${deltaPct}%) from ${beforeTokens} to ${afterTokens} (chars: ${beforeChars} → ${afterChars}, ${charDeltaPct > 0 ? '+' : ''}${charDeltaPct}%)`;
}
export function computeDiff(before, after, options = {}) {
    const tokenDelta = after.tokenCount - before.tokenCount;
    const tokenDeltaPct = calculatePercentage(after.tokenCount, before.tokenCount);
    const charDelta = after.charCount - before.charCount;
    const charDeltaPct = calculatePercentage(after.charCount, before.charCount);
    const diffStats = {
        token_delta: tokenDelta,
        token_delta_pct: tokenDeltaPct,
        char_delta: charDelta,
        char_delta_pct: charDeltaPct,
    };
    const summary = generateSummary(before.tokenCount, after.tokenCount, tokenDelta, tokenDeltaPct, before.charCount, after.charCount, charDeltaPct);
    return {
        schema_version: options.schemaVersion ?? '1.0',
        model: after.model || before.model,
        encoding: after.encoding || before.encoding,
        before: {
            label: options.beforeLabel ?? 'before',
            token_count: before.tokenCount,
            char_count: before.charCount,
            line_count: before.lineCount,
        },
        after: {
            label: options.afterLabel ?? 'after',
            token_count: after.tokenCount,
            char_count: after.charCount,
            line_count: after.lineCount,
        },
        diff: diffStats,
        summary,
    };
}
//# sourceMappingURL=diff.js.map