# Technical Decisions

Architectural decision records capturing key trade-offs, rationale, and consequences throughout the evolution of `token-diff`.

---

## 1. Decision 01: Pure JavaScript Tokenizer Selection

- **Status**: Accepted (Implemented in v0.1.0)
- **Source**: `src/tokenizer.ts`, commit history `ADR-001`

### Context
Token counting for OpenAI models requires Byte Pair Encoding (BPE). The official `tiktoken` library is written in Rust with Python bindings, while npm alternatives often rely on native C++ addons (`node-pre-gyp`) or WebAssembly binaries (`.wasm`).

### Decision
Use `js-tiktoken` (pure JavaScript) instead of native C++ bindings or WebAssembly modules.

### Alternatives Considered
1. **Official Rust Tiktoken bindings (`node-tiktoken`)**: Requires pre-compiled native binaries or `node-gyp` with Python/C++ build tools installed on the user's host OS.
2. **WebAssembly (`tiktoken-wasm`)**: Introduces asynchronous `.wasm` asset streaming, custom packaging rules, and bundler incompatibilities.
3. **OpenAI Remote API `/v1/responses`**: Adds 150–400ms network round-trip latency, charges against rate limits, and requires transmitting private prompt code across the WAN.

### Consequences
- **Positive**: 100% universal portability across Windows, macOS, Linux, Alpine Docker, and browser runtimes without build tool failures.
- **Positive**: Zero network dependency and zero data privacy risk.
- **Trade-off**: Native Rust can process 100MB payloads 3x faster, but LLM agent contexts operate under 100K tokens (<500KB text) where JS execution latency (<15ms) is negligible compared to model generation time (1,000–5,000ms).

---

## 2. Decision 02: Smart Input Fallback Mechanism

- **Status**: Accepted (Implemented in v0.1.1)
- **Source**: `src/cli.ts#L35-L51`, commit history `ADR-002`

### Context
Developers frequently wish to compare raw prompt strings directly in terminal commands (e.g. `td diff "Prompt A" "Prompt B"`). Requiring users to first save strings to temporary disk files introduces disk I/O friction and script clutter.

### Decision
Implement a non-blocking fallback in `readInputContent()`: check if the argument exists as a file on disk; if not, treat the argument as literal raw string text and emit an explicit `[WARN]` to `stderr`.

### Alternatives Considered
1. **Strict File-Only**: Fail with `NOT_FOUND` exit code 3 if argument is not a file. Rejected due to poor CLI developer ergonomics for quick prompt experiments.
2. **Explicit Flag (`--text`)**: Require `--text` flag when inputs are strings. Rejected as overly verbose for daily terminal usage.
3. **Silent Fallback**: Fall back to raw text without any warning. Rejected because typos in file paths (e.g., `prompt_v1.txt` mistyped as `promt_v1.txt`) would silently tokenize the literal path string rather than reading the file content.

### Consequences
- **Positive**: Enables instant inline string comparison directly from command line or agent tool calls.
- **Positive**: The `[WARN]` to `stderr` prevents mistyped file names from going unnoticed while preserving clean `stdout` for pipes and `--json` parsing.

---

## 3. Decision 03: Standardized API Transport Envelope Specification

- **Status**: Accepted (Implemented in v0.1.0)
- **Source**: `src/formatter.ts`, `src/types.ts`

### Context
Autonomous AI agents require structured tool responses with bounded metadata (schema version, runtime duration, error envelopes) rather than ad-hoc JSON objects or human tabular text.

### Decision
Standardize all `--json` outputs under the canonical envelope shape `ApiEnvelope<T>` containing separate `data` and `metadata` top-level keys.

### Alternatives Considered
1. **Flat JSON Object**: Emitting raw statistics at the root level (`{ token_delta: -5, ... }`). Rejected because it lacks standard metadata for agent orchestration frameworks.
2. **Stdout/Stderr Hybrid**: Outputting metadata to stderr and payload to stdout. Rejected because agents prefer consuming a single structured stream.

### Consequences
- **Positive**: Full compliance with standardized AI agent tool transport specifications.
- **Positive**: Enables automated assertions in CI/CD using `jq` (e.g. `jq '.data.diff.token_delta'`).

---

## 4. Decision 04: Single Canonical Branch Architecture (`main`)

- **Status**: Accepted (Implemented in v0.1.2)
- **Source**: Git repository refactoring commit `9c09b8b`

### Context
The repository previously tracked both `master` and `main` branches on remote origin, requiring dual push operations (`git push origin master; git push origin master:main`) and increasing deployment complexity on Vercel.

### Decision
Consolidate remote tracking to a single canonical branch `main`. Set `main` as the default branch on GitHub and delete the legacy `master` remote branch.

### Alternatives Considered
1. **Keep Dual Branches**: Continue syncing both `master` and `main`. Rejected due to risk of divergence and double build triggers.

### Consequences
- **Positive**: Streamlined single-command push workflow (`git push origin main`).
- **Positive**: Deterministic CI triggers and singular production branch binding for Vercel.
