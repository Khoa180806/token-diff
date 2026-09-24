import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { spawn } from 'node:child_process';
import * as fs from 'node:fs';
import * as path from 'node:path';

const cliPath = path.resolve('dist/cli.js');
const fixtureDir = path.resolve('test/__fixtures__');

interface CliResult {
  stdout: string;
  stderr: string;
  exitCode: number | null;
}

function runCli(args: string[], stdinInput?: string): Promise<CliResult> {
  return new Promise((resolve) => {
    const child = spawn(process.execPath, [cliPath, ...args]);
    let stdout = '';
    let stderr = '';

    if (stdinInput !== undefined) {
      child.stdin.write(stdinInput);
      child.stdin.end();
    }

    child.stdout.on('data', (data) => {
      stdout += data.toString();
    });

    child.stderr.on('data', (data) => {
      stderr += data.toString();
    });

    child.on('close', (code) => {
      resolve({ stdout, stderr, exitCode: code });
    });
  });
}

describe('CLI Integration Tests - Error Paths', () => {
  beforeAll(() => {
    if (!fs.existsSync(fixtureDir)) {
      fs.mkdirSync(fixtureDir, { recursive: true });
    }
    fs.writeFileSync(path.join(fixtureDir, 'fileA.txt'), 'Hello world, original prompt.');
    fs.writeFileSync(path.join(fixtureDir, 'fileB.txt'), 'Hello world.');
  });

  afterAll(() => {
    if (fs.existsSync(fixtureDir)) {
      fs.rmSync(fixtureDir, { recursive: true, force: true });
    }
  });

  it('treats input as raw text if file does not exist (Smart Input)', async () => {
    const rawText = "This is a raw text prompt";
    const existingPath = path.join(fixtureDir, 'fileA.txt'); // "Hello world, original prompt."

    const result = await runCli(['diff', existingPath, rawText]);
    expect(result.exitCode).toBe(0);
    // 6 tokens for "Hello world, original prompt."
    // 6 tokens for "This is a raw text prompt"
    // Wait, we just need to ensure it succeeds and outputs something.
    expect(result.stdout).toContain('This is a raw text prompt');
    expect(result.stderr).toContain('[WARN] File not found, treating input as raw text: "This is a raw text prompt"');
  });

  it('outputs valid json and treats input as raw text when file does not exist and --json flag is passed', async () => {
    const rawText = "Short text";
    const existingPath = path.join(fixtureDir, 'fileA.txt');

    const result = await runCli(['diff', existingPath, rawText, '--json']);
    expect(result.exitCode).toBe(0);
    const parsed = JSON.parse(result.stdout);
    expect(parsed.data.after.label).toBe('Short text');
    expect(parsed.metadata.source).toBe('token-diff');
  });

  it('exits with code 2 (INVALID_INPUT) when both diff inputs are stdin (-)', async () => {
    const result = await runCli(['diff', '-', '-']);
    expect(result.exitCode).toBe(2);
    expect(result.stderr).toContain('INVALID_INPUT');
  });

  it('exits with code 2 when missing required arguments or invalid command is passed', async () => {
    const missingArgsResult = await runCli(['diff']);
    expect(missingArgsResult.exitCode).toBe(2);

    const unknownCmdResult = await runCli(['nonexistent-command']);
    expect(unknownCmdResult.exitCode).toBe(2);
  });

  it('exits with code 2 (UNSUPPORTED_OPERATION) when unknown model is specified', async () => {
    const fileA = path.join(fixtureDir, 'fileA.txt');
    const fileB = path.join(fixtureDir, 'fileB.txt');

    const result = await runCli(['diff', fileA, fileB, '--model', 'unknown-model-xyz']);
    expect(result.exitCode).toBe(2);
    expect(result.stderr).toContain('UNSUPPORTED_OPERATION');
  });

  it('outputs ApiError envelope with UNSUPPORTED_OPERATION when unknown model with --json is used', async () => {
    const fileA = path.join(fixtureDir, 'fileA.txt');

    const result = await runCli(['count', fileA, '--model', 'unknown-model-xyz', '--json']);
    expect(result.exitCode).toBe(2);
    const parsed = JSON.parse(result.stdout);
    expect(parsed.error.code).toBe('UNSUPPORTED_OPERATION');
    expect(parsed.metadata.source).toBe('token-diff');
  });
});
