# token-diff Documentation

Welcome to the technical documentation directory for `token-diff` (`ai-token-diff`).

This folder contains deep-dive architectural specifications, developer integration guides, benchmark results, and references to overarching ecosystem standards.

---

## Documentation Index

| Document | Target Audience | Summary |
|---|---|---|
| [**Architecture & Design**](ARCHITECTURE.md) | Core engineers, architects | Explains the 4-stage pipeline, in-memory BPE vocabulary cache, and zero-WASM functional core. |
| [**CLI Command Reference**](CLI_REFERENCE.md) | CLI users, DevOps, CI engineers | Complete reference for `td diff`, `td count`, smart input fallback, stdin streams, and `jq` scripting. |
| [**TypeScript / JS SDK Guide**](SDK_GUIDE.md) | Node.js / TypeScript developers | Programmatic usage, type definitions (`TokenDiffReport`, `ApiEnvelope`), and practical code recipes. |
| [**Benchmarks & Profiling**](BENCHMARKS.md) | Performance engineers, evaluators | Cold start latency (~80ms), execution benchmarks (<15ms), memory footprint (<40MB), and comparisons. |
| [**Contributing Guide**](CONTRIBUTING.md) | Open-source contributors | Development environment setup, Vitest test suite, TDD workflow, and Conventional Commits guidelines. |
| [**AI Developer Tool Ecosystem Docs**](https://github.com/Khoa180806/AI_Developer_Tool_Ecosystem/tree/master/docs) | Architects & System Integrators | Global tool registry, binding decisions (D-001 to D-023), transport envelopes, and integration specs. |

---

## Ecosystem Architecture & Decisions

`token-diff` is an integral component of the broader **AI Developer Tool Ecosystem**. All formal architectural decisions (such as D-023 establishing `token-diff` as a canonical 1★ primitive), global schema contracts, lifecycle gates, and inter-tool workflows are maintained in the primary ecosystem documentation:

👉 **[Explore AI Developer Tool Ecosystem Documentation](https://github.com/Khoa180806/AI_Developer_Tool_Ecosystem/tree/master/docs)**
