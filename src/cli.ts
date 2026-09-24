#!/usr/bin/env node
import { Command } from 'commander';
import * as fs from 'node:fs';
import { countTokens } from './tokenizer.js';
import { computeDiff } from './diff.js';
import { formatHuman, formatJson, formatCountHuman, formatCountJson } from './formatter.js';
import { TokenDiffError, createError } from './errors.js';
import { TokenCountReport } from './types.js';

const program = new Command();

program
  .name('token-diff')
  .description('Compare token usage between two inputs or count tokens')
  .version('0.1.0')
  .exitOverride((err) => {
    if (err.code === 'commander.helpDisplayed' || err.code === 'commander.version') {
      process.exit(0);
    }
    // Invalid argument or unknown command maps to exit code 2 (INVALID_INPUT)
    process.exit(2);
  });

function readInputContent(sourcePath: string): string {
  if (sourcePath === '-') {
    try {
      return fs.readFileSync(0, 'utf-8');
    } catch (error) {
      const err = error as NodeJS.ErrnoException;
      throw createError('INTERNAL_ERROR', `Failed to read from stdin: ${err.message}`);
    }
  }

  try {
    let isFile = false;
    try {
      if (fs.existsSync(sourcePath) && fs.statSync(sourcePath).isFile()) {
        isFile = true;
      }
    } catch {
      // If stat/exists throws (e.g., path too long, invalid characters), treat as raw text
    }

    if (!isFile) {
      const cleanStr = sourcePath.replace(/\r?\n/g, ' ');
      const displayStr = cleanStr.length > 40 ? cleanStr.substring(0, 37) + '...' : cleanStr;
      process.stderr.write(`[WARN] File not found, treating input as raw text: "${displayStr}"\n`);
      return sourcePath; // Smart Input: treat as raw text
    }
    return fs.readFileSync(sourcePath, 'utf-8');
  } catch (error) {
    if (error instanceof TokenDiffError) {
      throw error;
    }
    const err = error as NodeJS.ErrnoException;
    if (err.code === 'EACCES') {
      throw createError('PERMISSION_DENIED', `Permission denied: ${sourcePath}`, { path: sourcePath });
    }
    throw createError('INTERNAL_ERROR', `Failed to read file ${sourcePath}: ${err.message}`, {
      path: sourcePath,
    });
  }
}

function handleCliError(error: unknown, json?: boolean): never {
  if (error instanceof TokenDiffError) {
    if (json) {
      process.stdout.write(JSON.stringify(error.toEnvelope(), null, 2) + '\n');
    } else {
      process.stderr.write(`Error [${error.code}]: ${error.message}\n`);
    }
    process.exit(error.exitCode);
  }

  const unexpectedError = error as Error;
  if (json) {
    const fallbackError = createError('INTERNAL_ERROR', unexpectedError.message);
    process.stdout.write(JSON.stringify(fallbackError.toEnvelope(), null, 2) + '\n');
  } else {
    process.stderr.write(`Error: ${unexpectedError.message}\n`);
  }
  process.exit(1);
}

program
  .command('diff')
  .description('Compare token usage between two inputs (supports stdin with -)')
  .argument('<before>', 'Path to original/before file (or - for stdin)')
  .argument('<after>', 'Path to modified/after file (or - for stdin)')
  .option('-m, --model <model>', 'Model name or encoding to use', 'gpt-4o')
  .option('--json', 'Output machine-readable JSON envelope')
  .action((beforePath: string, afterPath: string, options: { model: string; json?: boolean }) => {
    const startTime = Date.now();
    try {
      if (beforePath === '-' && afterPath === '-') {
        throw createError('INVALID_INPUT', 'Cannot read both before and after inputs from stdin (-)');
      }

      const beforeContent = readInputContent(beforePath);
      const afterContent = readInputContent(afterPath);

      const beforeResult = countTokens(beforeContent, options.model);
      const afterResult = countTokens(afterContent, options.model);

      const report = computeDiff(beforeResult, afterResult, {
        beforeLabel: beforePath === '-' ? 'stdin' : beforePath,
        afterLabel: afterPath === '-' ? 'stdin' : afterPath,
      });

      const durationMs = Date.now() - startTime;

      if (options.json) {
        process.stdout.write(formatJson(report, durationMs) + '\n');
      } else {
        process.stdout.write(formatHuman(report) + '\n');
      }
      process.exit(0);
    } catch (error) {
      handleCliError(error, options.json);
    }
  });

program
  .command('count')
  .description('Count tokens for a single file or stdin (-)')
  .argument('<file>', 'Path to file or - for stdin')
  .option('-m, --model <model>', 'Model name or encoding to use', 'gpt-4o')
  .option('--json', 'Output machine-readable JSON envelope')
  .action((filePath: string, options: { model: string; json?: boolean }) => {
    const startTime = Date.now();
    try {
      const content = readInputContent(filePath);
      const result = countTokens(content, options.model);

      const report: TokenCountReport = {
        schema_version: '1.0',
        model: result.model,
        encoding: result.encoding,
        stats: {
          label: filePath === '-' ? 'stdin' : filePath,
          token_count: result.tokenCount,
          char_count: result.charCount,
          line_count: result.lineCount,
        },
      };

      const durationMs = Date.now() - startTime;

      if (options.json) {
        process.stdout.write(formatCountJson(report, durationMs) + '\n');
      } else {
        process.stdout.write(formatCountHuman(report) + '\n');
      }
      process.exit(0);
    } catch (error) {
      handleCliError(error, options.json);
    }
  });

program.parse(process.argv);
