# Changelog

All notable changes to `token-diff` (`ai-token-diff`) documented chronologically from git history.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/) and follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased] - Web Playground Phase

### Added
- Scaffolded modern Next.js 16 Web Playground in `web/` using React 19, Tailwind CSS v4, and `shadcn/ui` (`792286c`, `fbab546`).
- Integrated Web Worker thread (`web/src/lib/tokenizer/worker.ts`) and dynamic BPE rank loaders (`ranks.ts`) using `js-tiktoken/lite` (`05aaafa`).
- Created 20 browser-to-core tokenizer parity tests verifying identical token counts across 4 encodings (`a42db68`).
- Implemented React hook `useTokenDiff` with 200ms debounce and derived loading state (`48d2a5f`, `65e9185`).

### Changed
- Refactored model mappings out of `tokenizer.ts` into pure `src/models.ts` for safe isomorphic reuse in browsers (`b72c0f2`).
- Consolidated Git repository to track a single canonical `main` branch (`9c09b8b`).

---

## [0.1.1] - 2026-09-24

### Added
- **Concise Shorthand Command `td`**: Registered `td` alongside `token-diff` and `ai-token-diff` in `package.json` (`200c9a0`).
- **Smart Input Detection**: Transparent fallback that treats arguments as literal raw string prompts when file paths do not exist on disk (`f1afdb8`).
- **Safety Warnings**: Non-blocking `[WARN]` emitted to `stderr` when Smart Input falls back to raw text (`2abeecb`).
- **ANSI Terminal Colorization**: Applied `picocolors` highlighting for headers (cyan), savings (green), and expansions (red) (`06f2e5f`).
- **Automated CI/CD**: Matrix testing workflow on GitHub Actions across Node.js 18, 20, 22 on Ubuntu and Windows (`80a06c7`).

### Fixed
- Fixed tabular column alignment and dynamic ellipsis truncation for long file paths in `formatHuman` (`c605080`).

---

## [0.1.0] - 2026-09-22

### Added
- **Core BPE Tokenizer Engine**: In-memory token counting supporting `o200k_base`, `cl100k_base`, `p50k_base`, and `r50k_base` (`018855c`).
- **Diff Calculation Engine**: Exact net token deltas, character deltas, line counts, and percentage reduction/increase (`5f2fe92`).
- **Standardized API Transport Envelope**: Structured JSON serialization (`--json`) conforming to `ApiEnvelope<T>` with execution duration (`141f5c5`).
- **CLI Commands**: Implemented `diff` and `count` subcommands with commander (`3b9d95d`, `095be9f`).
- **Standard Input Streaming**: Ingestion of piped data via hyphen argument (`-`) (`dbf64b6`).
- **Deterministic Error Taxonomy**: Mapped POSIX exit codes 0 through 4 with typed `TokenDiffError` (`961d2fa`, `8488466`).
- **Vitest Test Suite**: 20 comprehensive unit and integration tests across tokenizer, diff, formatter, and CLI error paths.
