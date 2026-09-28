# ADR-001: Pure JavaScript Tokenizer Selection (`js-tiktoken`)

## Status
Accepted

## Date
2026-09-22

## Context
`token-diff` is designed as a foundational measurement CLI tool and TypeScript SDK within the AI Developer Tool Ecosystem. A critical technical requirement is calculating exact OpenAI BPE token counts locally without requiring network calls or third-party cloud API keys.

The primary target persona (ICP-1) is a TypeScript/JavaScript developer or AI agent running in diverse environments: Windows workstations, macOS laptops, Linux servers, CI/CD containers (Alpine/Ubuntu), and ephemeral serverless workers.

We needed to select a tokenization implementation capable of handling `o200k_base` (GPT-4o, o1), `cl100k_base` (GPT-4), `p50k_base`, and `r50k_base`.

## Decision
Adopt **`js-tiktoken`**, a pure JavaScript implementation of the Byte Pair Encoding (BPE) algorithm with zero native bindings or WebAssembly requirements.

## Alternatives Considered

### 1. Official OpenAI `tiktoken` (Rust core via Node-API / `node-pre-gyp`)
- **Pros**: Raw execution speed is marginally faster on very large documents (>10MB).
- **Cons**: Requires native C++ build tools (Visual Studio C++ build tools on Windows, `python`, `make`, `gcc` on Linux/Alpine).
- **Rejected**: Frequently breaks `npm install` on Windows and lightweight Docker containers due to missing compiler toolchains. The maintenance overhead and installation failure rate outweigh minor speed advantages.

### 2. WebAssembly (`tiktoken-wasm` / `wasm-pack`)
- **Pros**: Faster than pure JS while avoiding native C++ compilers.
- **Cons**: Requires asynchronous WASM module instantiation, complex file path resolution for `.wasm` assets across different bundlers (Webpack, Vite, Rollup), and special runtime permissions in serverless/worker runtimes.
- **Rejected**: Breaks the synchronous, lightweight CLI and library ergonomics.

### 3. Remote OpenAI API Calls (`/v1/embeddings` or `/v1/chat/completions`)
- **Pros**: Official source of truth from provider.
- **Cons**: Requires network access, API keys, incurs billing costs, encounters rate limits, and leaks proprietary user prompt/code to external servers.
- **Rejected**: Directly violates D-009 (Local-First Source Privacy).

## Consequences

- **Universal Portability**: `npm install -g ai-token-diff` works out of the box on Windows, macOS, Linux, and Alpine Docker with zero build prerequisites.
- **Synchronous Execution**: Token counting executes synchronously with zero async bootstrapping latency.
- **Performance**: Execution latency remains <15ms for typical documents (<10,000 tokens), which is completely negligible in agent workflows.
- **Memory Optimization**: Loading BPE dictionaries into memory uses ~11MB RAM, easily accommodated within Node's default limits.
