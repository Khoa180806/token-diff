# Known Issues & Technical Limitations

Operational limitations, technical trade-offs, and tracked TODO items based on actual codebase state.

---

## 1. Operational & Release Holds

### NPM Registry Publication Hold
- **Issue**: Package publication (`npm publish`) is pending the resolution of an account authentication hold on npmjs.com.
- **Current Workaround**: Users can run the CLI directly via `npx` from GitHub or clone the repository and run `npm run build` locally.
- **Source**: Project task notes (`tasks/todo.md`).

---

## 2. Technical Limitations

### Initial Rank Dictionary Load Latency in Browsers
- **Observation**: The `o200k_base` vocabulary file is approximately 2.5MB in size. On slow 3G network connections, the first tokenization call on the web playground experiences a 1–2 second network download delay before caching in memory.
- **Mitigation**: Rank files are lazily loaded on-demand via dynamic `import()` in `web/src/lib/tokenizer/ranks.ts`, ensuring other encodings (`cl100k_base`, `p50k_base`) are not downloaded until requested.
- **Source**: `web/src/lib/tokenizer/ranks.ts`.

### Single File Stdin Limitation
- **Observation**: Standard input (`-`) can only be used for one input stream at a time in `td diff` (e.g. `cat file.txt | td diff baseline.txt -`).
- **Behavior**: Passing `-` for both `<before>` and `<after>` triggers `TokenDiffError("INVALID_INPUT")` with exit code 2.
- **Source**: `src/cli.ts#L96-L98`.

### Windows CRLF Git Warnings
- **Observation**: Git may warn that `LF will be replaced by CRLF` when touching `.ts` or `.md` files on Windows developer environments.
- **Impact**: Harmless warning; code formatting and tokenization handle both `\r\n` and `\n` line breaks identically in memory.
- **Source**: `src/tokenizer.ts#L84`.

---

## 3. Tracked Code TODOs & Technical Debt

- [ ] **Web Playground UI Completion**: Implement UI component hierarchy (`web/src/components/playground/`) and connect to `useTokenDiff` hook (source: `web/PLAN.md#L118-L125`).
- [ ] **Dual Language UI Localization**: Add Vietnamese language toggle strings for web headers and buttons (source: `web/PLAN.md#L155`).
- [ ] **Vercel CI Integration**: Add web build verification step into root `.github/workflows/ci.yml` (source: `web/PLAN.md#L132`).
