# System Architecture & Technical Design

This document details the architectural design, internal components, data flows, and design principles of `token-diff` (`ai-token-diff`).

---

## 1. High-Level Design Principles

`token-diff` is designed as a foundational measurement primitive within the [AI Developer Tool Ecosystem](https://github.com/Khoa180806/AI_Developer_Tool_Ecosystem/tree/master/docs). Its architecture adheres to four core principles:

1. **Deterministic Accuracy**: Given the same input text and tokenizer encoding, the calculated token counts, deltas, and percentage statistics are 100% reproducible across operating systems.
2. **Zero-WASM, Pure In-Memory Execution**: Relies strictly on `js-tiktoken` without requiring WebAssembly (`.wasm`) or native C++ addons (`node-gyp`). It executes purely in RAM without writing temporary files to disk.
3. **Functional Core, Imperative Shell**: Pure mathematical calculations (tokenization, delta computation, percentage derivations) are decoupled from file system access and stream I/O.
4. **Agent-First Extensibility**: Designed equally for human developers reading tabular terminal reports and autonomous AI agents consuming standardized API transport envelopes.

---

## 2. 4-Stage Processing Pipeline

The execution flow of `token-diff` follows a strict 4-stage pipeline:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                            4-STAGE PIPELINE                                 │
│                                                                             │
│  [File / Prompt / Stdin]                                                    │
│           │                                                                 │
│           ▼                                                                 │
│  [ Stage 1: Input Resolver ]                                                │
│           │                                                                 │
│           ├─── Reads file path (UTF-8)                                      │
│           ├─── Consumes stdin pipe ('-')                                    │
│           └─── Fallback to raw text string with non-blocking [WARN]         │
│           │                                                                 │
│           ▼                                                                 │
│  [ Stage 2: Tokenizer Engine ]                                              │
│           │                                                                 │
│           ├─── Model name to encoding resolution (e.g. gpt-4o -> o200k_base)│
│           ├─── In-memory BPE encoder cache                                  │
│           └─── Produces EncodingResult (tokens, chars, lines)               │
│           │                                                                 │
│           ▼                                                                 │
│  [ Stage 3: Diff Engine ]                                                   │
│           │                                                                 │
│           ├─── Computes exact token delta: (after - before)                 │
│           ├─── Computes relative delta percentage (%) with zero-div safety │
│           └─── Generates TokenDiffReport data artifact                      │
│           │                                                                 │
│           ▼                                                                 │
│  [ Stage 4: Output Formatters ]                                             │
│           │                                                                 │
│           ├─── formatHuman: Aligned table with picocolors ANSI tinting      │
│           └─── formatJson: Standard v1.0 API Envelope for AI agents         │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### Stage 1: Input Resolver (`src/cli.ts`)

The Input Resolver abstracts data acquisition from diverse input media into a normalized UTF-8 string:
- **Disk File**: Checks `fs.existsSync(filePath)` and reads the file content as UTF-8 via `fs.readFileSync(filePath, 'utf-8')`.
- **Standard Input (`-`)**: Reads the complete stream from `process.stdin` into memory via chunk concatenation.
- **Smart Input Fallback**: If an argument is provided that does not exist on disk, `token-diff` safely treats it as a raw text string, emitting a non-blocking diagnostic warning to `stderr` (`[WARN] File not found, treating input as raw text: "..."`). This enables seamless comparison of inline prompts without requiring temporary disk files.
- **Stream Invariant**: A single invocation cannot pass `-` for both `<before>` and `<after>`, preventing circular stream contention (exits with code `2`).

---

### Stage 2: Tokenizer Engine (`src/tokenizer.ts`)

The Tokenizer Engine translates normalized text into token sequences using OpenAI's Byte Pair Encoding (BPE) vocabularies via `js-tiktoken`.

#### In-Memory Vocabulary Cache
Loading BPE vocabularies (e.g., `o200k_base` with 200,000 token entries) takes tens of milliseconds on first initialization. `token-diff` maintains a module-scoped in-memory cache:

```typescript
const encoderCache = new Map<SupportedEncoding, Tiktoken>();
```

- When `countTokens()` is invoked repeatedly within a process (e.g., in SDK mode or multi-turn agent loops), the initialized encoder is reused immediately.
- Subsequent tokenization cycles execute in sub-millisecond ranges (<1ms).

#### Encoding Resolution
The engine resolves either standard model identifiers or direct encoding strings:
- `gpt-4o`, `gpt-4o-mini`, `o1`, `o1-mini` $\rightarrow$ `o200k_base`
- `gpt-4`, `gpt-4-turbo`, `gpt-3.5-turbo`, `text-embedding-ada-002` $\rightarrow$ `cl100k_base`
- `text-davinci-003`, `text-davinci-002` $\rightarrow$ `p50k_base`
- `davinci` $\rightarrow$ `r50k_base`

---

### Stage 3: Diff Engine (`src/diff.ts`)

The Diff Engine receives two `EncodingResult` structures and derives structural comparison metrics:

$$\Delta_{\text{tokens}} = N_{\text{after}} - N_{\text{before}}$$

$$\Delta_{\text{chars}} = C_{\text{after}} - C_{\text{before}}$$

$$\Delta_{\text{lines}} = L_{\text{after}} - L_{\text{before}}$$

#### Zero Division-by-Zero Safety
When evaluating an empty initial prompt or baseline file ($N_{\text{before}} = 0$):
- Standard percentage calculation $\frac{\Delta}{N_{\text{before}}} \times 100$ would evaluate to `NaN` or `Infinity`.
- The engine guarantees mathematical safety:
  ```typescript
  const token_delta_pct = before.token_count === 0
    ? (after.token_count === 0 ? 0 : 100)
    : Math.round(((after.token_count - before.token_count) / before.token_count) * 10000) / 100;
  ```
- Produces clean, bounded floating-point numbers rounded to two decimal places.

---

### Stage 4: Output Formatters (`src/formatter.ts`)

The formatters decouple presentation from calculation logic:

1. **Human Formatter (`formatHuman`, `formatCountHuman`)**:
   - Calculates dynamic column widths (`colTarget = Math.max(16, Math.min(30, maxLabelLen))`) to prevent text wrapping.
   - Truncates overflowing labels gracefully with an ellipsis (`...`).
   - Uses `picocolors` for ANSI color rendering:
     - **Bold Cyan**: Table headers and section banners.
     - **Vibrant Green**: Token and character savings (negative deltas).
     - **Vibrant Red**: Context expansion / token increases (positive deltas).
     - **Dim Gray**: Dashed partition rules and metadata.
2. **JSON Envelope Formatter (`formatJson`, `formatCountJson`)**:
   - Wraps reports inside the standardized `ApiEnvelope<T>` matching the [ecosystem integration specification](https://github.com/Khoa180806/AI_Developer_Tool_Ecosystem/tree/master/docs).
   - Injects runtime execution latency (`duration_ms`), schema version (`1.0`), and pagination metadata.

---

## 3. Component & Directory Layout

```
src/
├── types.ts          # Immutable interfaces & schema contracts (Report, Envelope, Errors)
├── errors.ts         # Standard error definitions & exit code constants
├── tokenizer.ts      # BPE token counting & in-memory vocabulary cache
├── diff.ts           # Delta mathematics & statistical percentage derivations
├── formatter.ts      # Terminal tabular formatter & JSON envelope generator
└── cli.ts            # Commander CLI orchestration, file I/O & stdin reader
```

### Module Boundaries
- `types.ts` has zero dependencies and defines all data shapes.
- `tokenizer.ts` depends only on `js-tiktoken` and `types.ts`.
- `diff.ts` is purely functional and has zero I/O dependencies.
- `formatter.ts` depends only on `picocolors` and `types.ts`.
- `cli.ts` coordinates I/O, error handling, and argument resolution.

---

## 4. Deterministic Error Architecture

All error conditions map to exact numeric process exit codes:

| Code | Constant | Meaning / Trigger Scenario |
|:---:|---|---|
| `0` | `EXIT_SUCCESS` | Command completed successfully; output emitted to `stdout`. |
| `1` | `INTERNAL_ERROR` | Unexpected runtime error or corrupted stream pipe. |
| `2` | `INVALID_INPUT` / `UNSUPPORTED_OPERATION` | Invalid arguments, unsupported model name, or `-` used for both inputs. |
| `3` | `NOT_FOUND` | Specified file path does not exist (when strict validation applies). |
| `4` | `PERMISSION_DENIED` | Insufficient file system permissions to read input path. |

When `--json` is enabled, error diagnostics are serialized directly to `stdout` in structured envelope format rather than unstructured stack traces.

---

## 5. Security & Privacy Model

- **100% Local Execution**: All token counting and diff operations run strictly in-process.
- **Zero Telemetry / Zero Network Calls**: No prompt text, file metadata, or metrics are ever sent over a network.
- **Memory Clearance**: In-memory buffers are garbage collected after CLI execution terminates; no scratch or temporary files are persisted.
