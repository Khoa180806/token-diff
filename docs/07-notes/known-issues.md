# Known Issues & Technical Limitations

Operational limitations, technical trade-offs, and tracked debt based on actual codebase state. This document details current system boundaries and architectural constraints.

---

## 1. Resolved Historical Holds

### NPM Registry Publication (Resolved)
- **Status**: Resolved (Published v0.1.1 on npm as `ai-token-diff`).
- **Resolution**: Package is now live and installable via `npm install -g ai-token-diff` or runnable via `npx ai-token-diff` (source: `package.json`).

### Web UI Implementation & Bilingual Localization (Resolved)
- **Status**: Resolved (Shipped in v0.2.0).
- **Resolution**: Next.js 16 Web Playground is fully operational with English/Vietnamese toggles and CI validation in `.github/workflows/ci.yml` (source: `web/src/app/page.tsx`).

---

## 2. Current Technical Limitations

### Model Vocabulary Scope
- **Limitation**: `token-diff` currently supports OpenAI BPE tokenizers (`o200k_base`, `cl100k_base`, `p50k_base`, `r50k_base`).
- **Impact**: Anthropic Claude, Google Gemini, and Meta Llama 3 SentencePiece tokenizers are not natively bundled.
- **Mitigation / Next Step**: Multi-model tokenizer adapters are scheduled for Milestone 1 in the product roadmap (source: `docs/03-product/roadmap.md`).

### Initial Rank Dictionary Load Latency in Browsers
- **Observation**: The `o200k_base` vocabulary file is approximately 2.5MB in size. On slow connections, the first tokenization call on the web playground experiences a 1–2 second network download delay before caching in memory.
- **Mitigation**: Rank files are lazily loaded on-demand via dynamic `import()` in `web/src/lib/tokenizer/ranks.ts`, ensuring other encodings (`cl100k_base`, `p50k_base`) are not downloaded until requested. Subsequent requests are instant.
- **Source**: `web/src/lib/tokenizer/ranks.ts`.

### Single Stream Stdin Limitation
- **Observation**: Standard input (`-`) can only be consumed by one input argument at a time in `td diff` (e.g. `cat file.txt | td diff baseline.txt -`).
- **Behavior**: Passing `-` for both `<before>` and `<after>` triggers `TokenDiffError("INVALID_INPUT")` with exit code 2.
- **Source**: `src/cli.ts#L96-L98`.

### Payload Memory Ceiling for Very Large Files
- **Observation**: Processing monolithic documents exceeding 100MB in a single CLI invocation can approach default V8 heap limits.
- **Context**: LLM context windows currently top out at 128K–2M tokens (<10MB text), so this does not affect prompt optimization workflows. Streaming chunk tokenization is planned for future batch workloads.
