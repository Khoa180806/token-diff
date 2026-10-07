# Project Structure

Detailed directory layout, package hierarchy, and architectural responsibilities for each module in the repository.

---

## 1. High-Level Directory Tree

```
token-diff/
├── .github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions CI matrix (Node 18/20/22 on Ubuntu/Windows)
├── assets/                    # Visual documentation diagrams, terminal demos, logo
├── dist/                      # Compiled production distribution for npm (tsc output)
├── docs/                      # Technical documentation suite
├── src/                       # Core TypeScript engine, CLI entrypoint, SDK logic
│   ├── cli.ts                 # CLI orchestration, I/O handling, and process exit codes
│   ├── diff.ts                # Mathematical diff engine and percentage calculations
│   ├── errors.ts              # Typed error taxonomy and exit code mappings
│   ├── formatter.ts           # Terminal tabular renderer and JSON envelope serializer
│   ├── index.ts               # Programmatic SDK root re-export entrypoint
│   ├── models.ts              # Model-to-encoding lookup table and prefix resolver
│   ├── tokenizer.ts           # Token counting engine and in-memory BPE cache
│   └── types.ts               # Immutable interfaces and schema contracts
├── test/                      # Vitest test suite for core CLI and SDK
│   ├── cli.test.ts            # Integration tests for CLI arguments and stderr warnings
│   ├── diff.test.ts           # Unit tests for delta calculations and zero-division safety
│   ├── formatter.test.ts      # Tests for terminal table alignment and JSON envelope shapes
│   └── tokenizer.test.ts      # Unit tests for token counting accuracy across models
├── web/                       # Next.js 16 Web Playground
│   ├── public/                # Static web assets
│   ├── src/
│   │   ├── app/               # Next.js App Router (layout.tsx, page.tsx, globals.css)
│   │   ├── components/ui/     # shadcn/ui components (button, card, tabs, badge, etc.)
│   │   ├── hooks/             # Custom React hooks (useTokenDiff.ts with debounce)
│   │   └── lib/
│   │       ├── tokenizer/     # Web Worker, client, and dynamic rank loaders
│   │       │   ├── browserTokenizer.ts  # In-browser tokenizer using Tiktoken lite
│   │       │   ├── client.ts            # Promise-based client with main-thread fallback
│   │       │   ├── ranks.ts             # Dynamic import map for lazy BPE dictionaries
│   │       │   └── worker.ts            # Dedicated Web Worker message handler
│   │       └── utils.ts       # Tailwind class merger (cn)
│   ├── test/                  # Web parity and hook test suites
│   │   ├── parity.test.ts     # 20 parity tests asserting browser == core token counts
│   │   └── useTokenDiff.test.ts # React testing-library tests for debounced hook
│   ├── next.config.ts         # Next.js config with externalDir and Turbopack
│   ├── package.json           # Isolated web dependencies
│   ├── tsconfig.json          # Web TypeScript config with @/ and @core/ aliases
│   └── vitest.config.ts       # Vitest config with JSDOM environment
├── package.json               # Root npm package metadata and binary declarations
├── tsconfig.json              # Root TypeScript build configuration
└── vitest.config.ts           # Root test configuration scoped to test/
```

---

## 2. Module Boundaries & Responsibilities

| Module Path | Primary Responsibility | Key Export / Entry | Runtime Dependencies |
|---|---|---|---|
| `src/models.ts` | Mapping models to BPE encodings | `resolveEncodingForModel` | None (pure TS) |
| `src/tokenizer.ts` | In-memory token counting and encoder caching | `countTokens` | `js-tiktoken`, `src/models.ts` |
| `src/diff.ts` | Calculating mathematical differences | `computeDiff` | Pure functional (zero I/O) |
| `src/formatter.ts` | Rendering tables and JSON envelopes | `formatHuman`, `formatJson` | `picocolors` |
| `src/cli.ts` | CLI command parsing, smart input, stdin | `token-diff`, `td` bin | `commander`, `node:fs` |
| `src/errors.ts` | Standard error class and exit codes | `TokenDiffError` | None |
| `web/src/lib/tokenizer/ranks.ts` | Code-splitting BPE dictionary files | `loadRankForEncoding` | Dynamic imports |
| `web/src/lib/tokenizer/worker.ts`| Offloading token calculations to Web Worker | Background worker thread | `js-tiktoken/lite` |
| `web/src/hooks/useTokenDiff.ts` | React state and debounce management | `useTokenDiff` | React 19 |
