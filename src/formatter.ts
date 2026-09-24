import pc from 'picocolors';
import { ApiEnvelope, TokenDiffReport, TokenCountReport } from './types.js';

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

export function formatCountJson(report: TokenCountReport, durationMs = 0): string {
  const envelope: ApiEnvelope<TokenCountReport> = {
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

export function formatCountHuman(report: TokenCountReport): string {
  const lines: string[] = [];

  lines.push(pc.bold(pc.cyan('=== Token Count Report ===')));
  lines.push(`File:  ${pc.bold(report.stats.label)}`);
  lines.push(`Model: ${pc.bold(report.model)} ${pc.dim(`(${report.encoding})`)}`);
  lines.push('');
  lines.push(`Tokens: ${pc.bold(pc.green(String(report.stats.token_count)))}`);
  lines.push(`Chars:  ${report.stats.char_count}`);
  lines.push(`Lines:  ${report.stats.line_count}`);

  return lines.join('\n');
}

export function formatHuman(report: TokenDiffReport): string {
  const lines: string[] = [];

  lines.push(pc.bold(pc.cyan('=== Token Diff Report ===')));
  lines.push(`Model: ${pc.bold(report.model)} ${pc.dim(`(${report.encoding})`)}`);
  lines.push('');

  const colTarget = 14;
  const colTokens = 12;
  const colChars = 12;
  const colLines = 10;

  const pad = (str: string | number, width: number) => String(str).padEnd(width);
  const padNum = (num: number, width: number) => String(num).padStart(width);

  // Header row
  lines.push(
    pc.bold(
      `${pad('Target', colTarget)} ${pad('Tokens', colTokens)} ${pad('Chars', colChars)} ${pad('Lines', colLines)}`
    )
  );
  lines.push(pc.dim('-'.repeat(colTarget + colTokens + colChars + colLines + 3)));

  // Data rows
  lines.push(
    `${pad(report.before.label, colTarget)} ${padNum(report.before.token_count, colTokens)} ${padNum(report.before.char_count, colChars)} ${padNum(report.before.line_count, colLines)}`
  );
  lines.push(
    `${pad(report.after.label, colTarget)} ${padNum(report.after.token_count, colTokens)} ${padNum(report.after.char_count, colChars)} ${padNum(report.after.line_count, colLines)}`
  );
  lines.push(pc.dim('-'.repeat(colTarget + colTokens + colChars + colLines + 3)));

  // Diff row
  const tokenSign = report.diff.token_delta > 0 ? '+' : '';
  const tokenDeltaStr = `${tokenSign}${report.diff.token_delta} (${tokenSign}${report.diff.token_delta_pct}%)`;
  let paddedTokenDiff = pad(tokenDeltaStr, colTokens);
  if (report.diff.token_delta < 0) {
    paddedTokenDiff = pc.green(paddedTokenDiff);
  } else if (report.diff.token_delta > 0) {
    paddedTokenDiff = pc.red(paddedTokenDiff);
  } else {
    paddedTokenDiff = pc.dim(paddedTokenDiff);
  }

  const charSign = report.diff.char_delta > 0 ? '+' : '';
  const charDeltaStr = `${charSign}${report.diff.char_delta} (${charSign}${report.diff.char_delta_pct}%)`;
  let paddedCharDiff = pad(charDeltaStr, colChars);
  if (report.diff.char_delta < 0) {
    paddedCharDiff = pc.green(paddedCharDiff);
  } else if (report.diff.char_delta > 0) {
    paddedCharDiff = pc.red(paddedCharDiff);
  } else {
    paddedCharDiff = pc.dim(paddedCharDiff);
  }

  const lineDelta = report.after.line_count - report.before.line_count;
  const lineSign = lineDelta > 0 ? '+' : '';
  const lineDeltaStr = `${lineSign}${lineDelta}`;
  const paddedLineDiff = pad(lineDeltaStr, colLines);

  lines.push(
    `${pc.bold(pad('Diff', colTarget))} ${paddedTokenDiff} ${paddedCharDiff} ${paddedLineDiff}`
  );
  lines.push('');

  let coloredSummary = report.summary;
  if (report.diff.token_delta < 0) {
    coloredSummary = pc.green(report.summary);
  } else if (report.diff.token_delta > 0) {
    coloredSummary = pc.red(report.summary);
  }
  lines.push(`${pc.bold('Summary:')} ${coloredSummary}`);

  return lines.join('\n');
}
