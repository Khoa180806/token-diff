# API & CLI Contract Reference

Comprehensive specifications for the programmatic TypeScript/JavaScript SDK and the command-line CLI transport interface.

---

## 1. Programmatic TypeScript SDK Reference

The library can be imported directly into Node.js applications, CI test scripts, or agent harnesses (source: `src/index.ts`, `src/types.ts`).

### Package Export
```typescript
import {
  countTokens,
  computeDiff,
  resolveEncodingForModel,
  formatJson,
  formatHuman,
  formatCountJson,
  formatCountHuman,
  type TokenizerResult,
  type TokenDiffReport,
  type TokenCountReport,
  type ApiEnvelope,
  type SupportedEncoding,
} from 'ai-token-diff';
```

---

### Function: `countTokens(text, modelOrEncoding?)`
Tokenizes a given string and calculates exact token counts, character lengths, and line counts (source: `src/tokenizer.ts#L79-L94`).

- **Parameters**:
  - `text` (`string`): Target text string to tokenize.
  - `modelOrEncoding` (`string`, optional, default: `'gpt-4o'`): OpenAI model name or explicit encoding name.
- **Returns**: `TokenizerResult`
  ```typescript
  interface TokenizerResult {
    tokenCount: number;
    tokens: number[];
    charCount: number;
    lineCount: number;
    encoding: SupportedEncoding;
    model: string;
  }
  ```

---

### Function: `computeDiff(before, after, options?)`
Computes token differences, character differences, and percentage deltas between two `TokenizerResult` instances (source: `src/diff.ts#L37-L84`).

- **Parameters**:
  - `before` (`TokenizerResult`): Baseline tokenization result.
  - `after` (`TokenizerResult`): Comparison tokenization result.
  - `options` (`DiffOptions`, optional):
    - `beforeLabel?: string` (default: `'before'`)
    - `afterLabel?: string` (default: `'after'`)
    - `schemaVersion?: string` (default: `'1.0'`)
- **Returns**: `TokenDiffReport`
  ```typescript
  interface TokenDiffReport {
    schema_version: string;
    model: string;
    encoding: string;
    before: {
      label: string;
      token_count: number;
      char_count: number;
      line_count: number;
    };
    after: {
      label: string;
      token_count: number;
      char_count: number;
      line_count: number;
    };
    diff: {
      token_delta: number;      // after - before (negative means reduction)
      token_delta_pct: number;  // rounded to 2 decimal places
      char_delta: number;
      char_delta_pct: number;
    };
    summary: string;
  }
  ```

---

### Function: `resolveEncodingForModel(modelOrEncoding)`
Resolves a given model name or encoding string into one of the 4 supported canonical encodings (source: `src/models.ts#L36-L65`).

- **Supported Encodings**: `'o200k_base' | 'cl100k_base' | 'p50k_base' | 'r50k_base'`.
- **Throws**: `TokenDiffError` with code `'UNSUPPORTED_OPERATION'` if unrecognized.

---

## 2. Standardized API Transport Envelope (`--json`)

When invoked with `--json`, output is wrapped in a standardized transport envelope matching the AI Developer Tool Ecosystem specification (source: `src/formatter.ts#L4-L32`, `src/types.ts#L51-L54`).

### Success Envelope Schema
```typescript
interface ApiEnvelope<T> {
  data: T;
  metadata: {
    schema_version: string; // "1.0"
    source: "token-diff";
    duration_ms: number;   // Execution duration in milliseconds
    truncated: boolean;    // false
    next_cursor: string | null; // null
  };
}
```

### Success Envelope Example (`td diff file1.txt file2.txt --json`)
```json
{
  "data": {
    "schema_version": "1.0",
    "model": "gpt-4o",
    "encoding": "o200k_base",
    "before": {
      "label": "file1.txt",
      "token_count": 1240,
      "char_count": 4820,
      "line_count": 115
    },
    "after": {
      "label": "file2.txt",
      "token_count": 892,
      "char_count": 3410,
      "line_count": 82
    },
    "diff": {
      "token_delta": -348,
      "token_delta_pct": -28.06,
      "char_delta": -1410,
      "char_delta_pct": -29.25
    },
    "summary": "Reduced by 348 tokens (-28.06%) from 1240 to 892 (chars: 4820 → 3410, -29.25%)"
  },
  "metadata": {
    "schema_version": "1.0",
    "source": "token-diff",
    "duration_ms": 14,
    "truncated": false,
    "next_cursor": null
  }
}
```

---

## 3. Error Envelope & Deterministic Exit Codes

All errors map deterministically to standardized POSIX exit codes (source: `src/errors.ts#L3-L13`, `src/cli.ts#L66-L84`).

| Exit Code | Error Code Constant | Scenario / Trigger Condition |
|:---:|---|---|
| `0` | `EXIT_SUCCESS` | Command completed successfully; output emitted to `stdout`. |
| `1` | `INTERNAL_ERROR` | Unhandled runtime failure or pipe stream read error. |
| `2` | `INVALID_INPUT` / `UNSUPPORTED_OPERATION` | Invalid CLI arguments, unknown model, or `-` used for both inputs. |
| `3` | `NOT_FOUND` | Specified file does not exist (when strict checking applied). |
| `4` | `PERMISSION_DENIED` | File system read permission denied on target input file. |

### Error Envelope Example (`--json` mode)
```json
{
  "error": {
    "code": "PERMISSION_DENIED",
    "message": "Permission denied: /root/secret_prompt.txt",
    "details": {
      "path": "/root/secret_prompt.txt"
    }
  },
  "metadata": {
    "schema_version": "1.0",
    "source": "token-diff"
  }
}
```
