# Project Overview

High-performance token usage measurement and context diff infrastructure designed for LLM workflows, autonomous agent loops, and prompt engineering pipelines.

---

## 1. Problem Statement

Modern Large Language Models (LLMs) charge fees and enforce hard context window limits based on sub-word **Byte Pair Encoding (BPE) tokens**, not words, characters, or line counts. 

Standard Unix utilities (`wc -l`, `wc -c`, `diff`) fail to measure token impacts:
- A 10-character edit may save or consume anywhere between 1 and 8 tokens depending on model dictionary prefixes.
- Different model generations (`gpt-4o` vs. `gpt-4` vs. `davinci`) use entirely distinct token vocabularies (`o200k_base` vs. `cl100k_base` vs. `r50k_base`).
- Traditional cloud tokenizer APIs require network calls, rate limits, and transmitting sensitive proprietary prompt code across the WAN.

`token-diff` solves this by delivering 100% offline, deterministic BPE token counting and delta reporting with zero native dependencies (source: `src/tokenizer.ts`, `docs/ARCHITECTURE.md`).

---

## 2. Target Users & Personas

- **AI Engineers & Prompt Engineers**: Quantifying prompt compression savings and optimizing system instructions against token budgets.
- **Autonomous Agent Developers**: Bounding multi-turn agent tool call outputs and asserting context consumption before dispatching expensive API requests.
- **DevOps & CI/CD Engineers**: Establishing regression gates that fail builds if prompts expand beyond allocated token thresholds.
- **Open-Source Contributors**: Building lightweight tools that run cross-platform without requiring C++ compilation tools (`node-gyp`).

---

## 3. Key Features

- **100% Local & Air-Gapped**: Runs entirely in-process with zero network requests and zero API key requirements (source: `src/tokenizer.ts`).
- **Zero-WASM, Pure JS Portability**: Built on `js-tiktoken` without requiring WebAssembly (`.wasm`) or native C++ addons (source: `package.json`).
- **Smart Input Detection**: Transparently accepts file paths, raw prompt strings, or stdin pipe streams (`-`) with stderr safety warnings (source: `src/cli.ts#L48`).
- **Standardized API Transport Envelopes**: Emits structured JSON (`--json`) with runtime execution latency, schema versions, and error envelopes matching AI agent transport specifications (source: `src/formatter.ts`).
- **In-Memory Vocabulary Cache**: Reuses loaded BPE encoders across calls, keeping warm execution latency under 15ms (source: `docs/BENCHMARKS.md`).
- **Interactive Web Playground**: Client-side Next.js playground utilizing Web Workers to offload token counting without freezing the browser (source: `web/src/app/page.tsx`).

---

## 4. Technology Stack

### Core Engine & CLI
- **Language**: TypeScript 5.6+ (Strict mode) (source: `package.json`)
- **Runtime**: Node.js >= 18.0.0 (source: `package.json`)
- **Tokenizer Core**: `js-tiktoken` (pure JavaScript BPE) (source: `package.json`)
- **CLI Framework**: `commander` 12.1+ (source: `package.json`)
- **Terminal Styling**: `picocolors` 1.1+ (source: `package.json`)
- **Test Framework**: `vitest` 2.1+ (source: `package.json`)

### Web Playground (`web/`)
- **Framework**: Next.js 16 (App Router with Turbopack) (source: `web/package.json`)
- **UI & Styling**: React 19, Tailwind CSS v4, `shadcn/ui` (source: `web/package.json`)
- **Execution Offloading**: Web Workers with `js-tiktoken/lite` dynamic rank loaders (source: `web/src/lib/tokenizer/worker.ts`)
