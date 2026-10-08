# Project Structure

Detailed directory layout, package hierarchy, and architectural responsibilities for each module in the repository. This document outlines the physical and logical boundaries between the core CLI engine and the web application.

---

## 1. High-Level Directory Tree

```
token-diff/
├── .github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions CI matrix (Ubuntu/Windows, Node 18/20/22, Web verification)
├── assets/                    # Visual documentation diagrams, terminal demos, logo
├── dist/                      # Compiled production distribution for npm (tsc output)
├── docs/                      # Comprehensive technical documentation suite
│   ├── 01-overview/           # High-level architecture, getting started, workflow
│   ├── 02-technical/          # System design, business flows, contracts, ADRs
│   ├── 03-product/            # Changelog and development roadmap
│   ├── 04-operations/         # Deployment guides and environment configuration
│   ├── 05-templates/          # ADR and bug report markdown templates
│   ├── 06-design/             # Web UI design, layout, accessibility notes
│   └── 07-notes/              # Technical debt, limitations, known issues
├── src/                       # Core TypeScript engine, CLI entrypoint, SDK logic
│   ├── cli.ts                 # CLI orchestration, I/O handling, and process exit codes
│   ├── diff.ts                # Mathematical diff engine and percentage calculations
│   ├── errors.ts              # Typed error taxonomy and exit code mappings
│   ├── formatter.ts           # Terminal tabular renderer and JSON envelope serializer
│   ├── index.ts               # Programmatic SDK root re-export entrypoint
│   ├── models.ts              # Model-to-encoding lookup table and prefix resolver
│   ├── tokenizer.ts           # Token counting engine and in-memory BPE cache
│   └── types.ts               # Immutable interfaces and schema contracts
├── test/                      # Vitest test suite for core CLI and SDK (20 tests)
│   ├── cli.test.ts            # Integration tests for CLI arguments and stderr warnings
│   ├── diff.test.ts           # Unit tests for delta calculations and zero-division safety
│   ├── formatter.test.ts      # Tests for terminal table alignment and JSON envelope shapes
│   └── tokenizer.test.ts      # Unit tests for token counting accuracy across models
├── web/                       # Next.js 16 Web Application (Self-contained)
│   ├── public/                # Static web assets and icons
│   ├── src/
│   │   ├── app/               # Next.js App Router (layout.tsx, page.tsx, globals.css, sitemap.ts, robots.ts)
│   │   ├── components/
│   │   │   ├── playground/    # Playground UI (InputPane, ResultTabs, StatsCards, ModelSelect)
│   │   │   ├── sections/      # Landing sections (Hero, Features, CliDemo, UseCases, Footer)
│   │   │   └── ui/            # Base UI primitives (button, card, tabs, badge, textarea, select)
│   │   ├── hooks/             # Custom React hooks (useTokenDiff.ts with debounce)
│   │   └── lib/
│   │       ├── diff.ts        # Self-contained browser mathematical diff engine
│   │       ├── formatter.ts   # Browser API JSON envelope serializer
│   │       ├── models.ts      # Browser model-to-encoding mappings
│   │       ├── types.ts       # Web data contracts and report interfaces
│   │       ├── constants.ts   # Model options, copy commands, and bilingual dictionaries
│   │       ├── tokenizer/     # Web Worker, client, and dynamic rank loaders
│   │       │   ├── browserTokenizer.ts  # In-browser tokenizer using Tiktoken lite
│   │       │   ├── client.ts            # Promise-based client with worker dispatch
│   │       │   ├── ranks.ts             # Dynamic import map for lazy BPE dictionaries
│   │       │   └── worker.ts            # Dedicated Web Worker message handler
│   │       └── utils.ts       # Tailwind class merger (cn)
│   ├── test/                  # Web parity and hook test suites (22 tests)
│   │   ├── parity.test.ts     # 20 parity tests asserting browser == core token counts
│   │   └── useTokenDiff.test.ts # React testing-library tests for debounced hook
│   ├── next.config.ts         # Next.js config with Turbopack and image optimization
│   ├── package.json           # Isolated web dependencies
│   ├── tsconfig.json          # Web TypeScript configuration
│   ├── vercel.json            # Vercel deployment headers and configuration
│   └── vitest.config.ts       # Vitest configuration with JSDOM environment
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
| `web/src/lib/diff.ts` | Client mathematical diffing | `computeDiff` | None (pure TS) |
| `web/src/lib/tokenizer/ranks.ts` | Code-splitting BPE dictionary files | `loadRankForEncoding` | Dynamic imports |
| `web/src/lib/tokenizer/worker.ts`| Offloading token calculations to Web Worker | Background worker thread | `js-tiktoken/lite` |
| `web/src/hooks/useTokenDiff.ts` | React state and debounce management | `useTokenDiff` | React 19 |
