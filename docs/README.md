# token-diff Documentation

Welcome to the technical documentation directory for `token-diff` (`ai-token-diff`).

This folder contains deep-dive architectural specifications, developer integration guides, benchmark results, and architecture decision records (ADRs).

---

## Documentation Index

| Document | Target Audience | Summary |
|---|---|---|
| [**Architecture & Design**](ARCHITECTURE.md) | Core engineers, architects | Explains the 4-stage pipeline, in-memory BPE vocabulary cache, and zero-WASM functional core. |
| [**CLI Command Reference**](CLI_REFERENCE.md) | CLI users, DevOps, CI engineers | Complete reference for `td diff`, `td count`, smart input fallback, stdin streams, and `jq` scripting. |
| [**TypeScript / JS SDK Guide**](SDK_GUIDE.md) | Node.js / TypeScript developers | Programmatic usage, type definitions (`TokenDiffReport`, `ApiEnvelope`), and practical code recipes. |
| [**Benchmarks & Profiling**](BENCHMARKS.md) | Performance engineers, evaluators | Cold start latency (~80ms), execution benchmarks (<15ms), memory footprint (<40MB), and comparisons. |
| [**Contributing Guide**](CONTRIBUTING.md) | Open-source contributors | Development environment setup, Vitest test suite, TDD workflow, and Conventional Commits guidelines. |
| [**Architecture Decision Records (ADRs)**](decisions/) | Everyone | Historical context, trade-offs, and rationale behind foundational technical choices. |

---

## Architecture Decision Records (ADRs)

- [**ADR-001: Pure JavaScript Tokenizer Selection**](decisions/ADR-001-pure-js-tokenizer.md) — Why we chose `js-tiktoken` over native C++ addons (`node-pre-gyp`) and WebAssembly.
- [**ADR-002: Smart Input Fallback**](decisions/ADR-002-smart-input-fallback.md) — Automatic detection between disk files and inline prompt strings with stderr warnings.
- [**ADR-003: Standardized API Transport Envelope**](decisions/ADR-003-api-transport-envelope.md) — Uniform JSON transport envelope (`data` + `metadata`) for AI Agent Control Planes.
