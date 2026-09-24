# T01 — Token Diff

**Canonical name:** Token Diff
**ID:** T01
**Status:** In Development (Prototype Ready) | **Level:** 1★

## Purpose & Strategic Position

Token Diff is the measurement infrastructure for the entire AI Developer Tool Ecosystem.
Its core purpose is to deterministically measure prompt token deltas, tool response compression efficiency, and context window footprint across AI agent workflows.

## Applicable Decisions

- **D-001 — Tool-first**: Standalone utility before shared platform infrastructure.
- **D-003 — Canonical naming**: Registered as `Token Diff` (ID: `T01`).
- **D-008 — Compact-response-first**: Returns bounded tabular summary for CLI and standard structured envelope for agents.
- **D-011 — Benchmark threshold**: Measurement tool utilized to verify >=20% token reduction in downstream tools.
- **D-019 — Solo-builder planning baseline**: Built within the 1-2 week time-box.
- **D-021 — 1★ competitor gate is per tool**: Pre-code review verified against Langfuse, Helicone, and PromptLayer.

## Architecture & Code Boundaries

- Language & Runtime: TypeScript 5.6 / Node.js >= 18 (ESM)
- Tokenizer: Pure JavaScript `js-tiktoken` (zero native binaries, zero WASM dependencies)
- Contract:
  - `src/types.ts`: Core data structures (`TokenDiffReport`, `TokenCountReport`, `ApiEnvelope`, `ApiErrorResponse`).
  - `src/errors.ts`: Standard error codes (`INVALID_INPUT`, `NOT_FOUND`, `PERMISSION_DENIED`, `INTERNAL_ERROR`, `UNSUPPORTED_OPERATION`) with deterministic exit codes.
  - `src/tokenizer.ts`: Model resolution and BPE token counting with in-memory encoder cache.
  - `src/diff.ts`: Delta and percentage calculations with division-by-zero protection.
  - `src/formatter.ts`: Dual-mode formatting (human-readable aligned table vs. JSON envelope).
  - `src/cli.ts`: Commander-based CLI handling `diff`, `count`, and standard input stream (`-`).

## Agent Working Rules

1. **Test-First & Incremental**: Always write or update tests in `test/` before modifying implementation logic.
2. **Compact Envelope Output**: When integrating with multi-agent orchestration, always invoke with `--json`.
3. **Deterministic Error Handling**: Use standard exit codes (0: success, 1: internal error, 2: invalid input, 3: not found, 4: permission denied).
4. **Local Source Privacy**: Never transmit input text or prompt content to external network endpoints.
