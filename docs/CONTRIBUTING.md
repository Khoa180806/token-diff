# Contributing to token-diff

Thank you for your interest in contributing to `token-diff` (`ai-token-diff`)! This document provides guidelines and setup instructions for developing, testing, and submitting contributions.

---

## 1. Development Principles

1. **Test-Driven Development (TDD)**: Write or update unit/integration tests in `test/` before implementing new features or bug fixes.
2. **Deterministic Behavior**: Code must produce identical, mathematically consistent output across Windows, macOS, and Linux.
3. **Zero Native Dependencies**: Do not introduce native C++, Rust, or WebAssembly compilation dependencies that break cross-platform `npm install`.
4. **Minimal Runtime Footprint**: Keep external dependencies to a strict minimum (currently only `commander`, `js-tiktoken`, and `picocolors`).

---

## 2. Local Environment Setup

### Prerequisites
- **Node.js**: `>= 18.0.0` (tested on Node 18, 20, 22)
- **npm**: `>= 9.0.0`
- **Git**

### Installation
```bash
# 1. Clone your fork
git clone https://github.com/<your-username>/token-diff.git
cd token-diff

# 2. Install dependencies
npm install

# 3. Build TypeScript to dist/
npm run build
```

---

## 3. Scripts & Testing Workflow

All automated checks must pass before opening a Pull Request:

### Run Test Suite
We use **Vitest** for ultra-fast TypeScript testing:
```bash
# Run all unit and integration tests (20 tests)
npm test

# Run tests in watch mode during development
npm run test:watch
```

### Type Checking & Linting
Ensure strict TypeScript typing without errors:
```bash
npm run lint
```

### Build Production Artifacts
Compiles TypeScript into `dist/`:
```bash
npm run build
```

### Test Local CLI Binaries
Test the built CLI commands directly:
```bash
node dist/cli.js --help
node dist/cli.js diff package.json tsconfig.json
node dist/cli.js count README.md
```

---

## 4. Git & Commit Guidelines

We enforce the **Conventional Commits** specification:

### Commit Format
```text
<type>(<scope>): <short description in present tense>

[optional body]
```

### Allowed Types
- **`feat`**: New user-facing feature or CLI command.
- **`fix`**: Bug fix in token calculation, formatting, or CLI parsing.
- **`docs`**: Documentation updates or markdown corrections.
- **`refactor`**: Code restructuring without behavioral changes.
- **`test`**: Adding or updating test cases.
- **`chore`**: Maintenance, build configs, or dependency updates.

### Examples
- `feat(cli): add short flag -m for model selection`
- `fix(diff): prevent division by zero when baseline prompt is empty`
- `docs(sdk): add batch tokenization code recipe`
- `test(tokenizer): add test case for o1 model family`

### Atomic Commits
Keep commits focused and atomic. Avoid combining unrelated refactoring, feature work, and formatting changes into a single monolithic commit.

---

## 5. Pull Request Checklist

Before submitting a Pull Request, please verify:

- [ ] All unit and integration tests pass (`npm test`).
- [ ] TypeScript compiles cleanly without warnings (`npm run lint` and `npm run build`).
- [ ] New functionality is covered by unit tests in `test/`.
- [ ] Documentation is updated in `README.md` and relevant `docs/*.md` files.
- [ ] Commit history follows Conventional Commits.
- [ ] No temporary files, logs, or node_modules are committed.
