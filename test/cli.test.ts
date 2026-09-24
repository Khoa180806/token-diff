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

  it('exits with code 3 (NOT_FOUND) when file does not exist', async () => {
    const nonExistentPath = path.join(fixtureDir, 'does-not-exist.txt');
    const existingPath = path.join(fixtureDir, 'fileA.txt');

    const result = await runCli(['diff', existingPath, nonExistentPath]);
    expect(result.exitCode).toBe(3);
    expect(result.stderr).toContain('NOT_FOUND');
  });

  it('outputs ApiError envelope when file does not exist and --json flag is passed', async () => {
    const nonExistentPath = path.join(fixtureDir, 'does-not-exist.txt');
    const existingPath = path.join(fixtureDir, 'fileA.txt');

    const result = await runCli(['diff', existingPath, nonExistentPath, '--json']);
    expect(result.exitCode).toBe(3);
    const parsed = JSON.parse(result.stdout);
    expect(parsed.error).toBeDefined();
    expect(parsed.error.code).toBe('NOT_FOUND');
    expect(parsed.metadata).toBeDefined();
    expect(parsed.metadata.source).toBe('token-diff');
  });

  it('exits with code 2 (INVALID_INPUT) when both diff inputs are stdin (-)', async () => {
    const result = await runCli(['diff', '-', '-']);
    expect(result.exitCode).toBe(2);
    expect(result.stderr).toContain('INVALID_INPUT');
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
