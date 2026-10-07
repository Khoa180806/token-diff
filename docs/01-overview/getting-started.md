# Getting Started

Step-by-step setup, execution, testing, and development guide for developers and evaluators.

---

## 1. Prerequisites

- **Node.js**: `>= 18.0.0` (tested on Node 18, 20, and 22) (source: `package.json#L57`)
- **npm**: `>= 9.0.0`
- **Git**

No native build tools, C++ compilers, Python installations, or API keys are needed (source: `docs/BENCHMARKS.md`).

---

## 2. Installation Options

### Option A: Immediate Execution via `npx` (No Install Required)
```bash
# Compare two raw prompts directly
npx ai-token-diff diff "Summarize Docker in detail" "Docker summary"

# Count tokens in a file
npx ai-token-diff count README.md
```

### Option B: Global CLI Installation
```bash
npm install -g ai-token-diff

# Run using the concise shorthand binary
td diff --help
```

### Option C: Project Dependency (TypeScript SDK)
```bash
npm install ai-token-diff
```

---

## 3. Local Development Setup

To build and run the repository from source:

```bash
# 1. Clone repository
git clone https://github.com/Khoa180806/token-diff.git
cd token-diff

# 2. Install dependencies
npm install

# 3. Compile TypeScript to dist/
npm run build

# 4. Run core test suite (20 tests)
npm test

# 5. Typecheck without emitting files
npm run lint
```

---

## 4. Running the CLI Locally

You can run the TypeScript CLI directly during development using `tsx` (source: `package.json#L29`):

```bash
# Development runner using tsx
npm run dev -- diff package.json tsconfig.json

# Or execute compiled output
node dist/cli.js diff package.json tsconfig.json --model gpt-4o

# Test JSON envelope mode
node dist/cli.js count README.md --json
```

---

## 5. Running the Web Playground Locally

The interactive web playground is located in the `web/` directory (source: `web/package.json`):

```bash
# Navigate to web application directory
cd web

# Install web dependencies
npm install

# Start Next.js development server (default port 3000)
npm run dev

# Open http://localhost:3000 in your browser

# Run web test suite (22 tests including parity & hook tests)
npm test
```
