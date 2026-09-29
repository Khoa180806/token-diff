# CLI Command Reference

Comprehensive user manual and command-line reference for `token-diff` (`ai-token-diff`).

---

## 1. Command Syntax & Binary Aliases

`token-diff` provides three interchangeable binary names:

- **`td`**: Concise shorthand recommended for daily interactive terminal use.
- **`token-diff`**: Canonical binary name registered in the [AI Developer Tool Ecosystem](https://github.com/Khoa180806/AI_Developer_Tool_Ecosystem/tree/master/docs).
- **`ai-token-diff`**: Full npm distribution binary name.

All commands below demonstrate the concise `td` alias.

---

## 2. Command: `td diff`

Compares token usage, character count, and line count between two inputs (`<before>` and `<after>`).

### Syntax
```bash
td diff [options] <before> <after>
```

### Arguments
- `<before>`: Baseline file path, raw prompt string, or standard input stream (`-`).
- `<after>`: Comparison file path, raw prompt string, or standard input stream (`-`).

### Options
| Option | Shorthand | Default | Description |
|---|:---:|:---:|---|
| `--model <model>` | `-m` | `gpt-4o` | Target model name or explicit encoding (`o200k_base`, `cl100k_base`, `p50k_base`, `r50k_base`). |
| `--json` | - | `false` | Emits structured JSON envelope to `stdout`. |
| `--help` | `-h` | - | Display help documentation for the command. |

---

### Input Modes

#### Mode 1: File vs. File
```bash
td diff original_prompt.txt optimized_prompt.txt
```
```text
=== Token Diff Report ===
Model: gpt-4o (o200k_base)

Target                 Tokens           Chars            Lines   
-----------------------------------------------------------------
original_prompt.txt    1240             4820             115     
optimized_prompt.txt   892              3410             82      
-----------------------------------------------------------------
Diff                   -348 (-28.06%)   -1410 (-29.25%)  -33     

Summary: Reduced by 348 tokens (-28.06%) from 1240 to 892 (chars: 4820 → 3410, -29.25%)
```

#### Mode 2: Raw Prompt String vs. Raw Prompt String (Smart Input)
Directly compare prompts without creating temporary disk files:
```bash
td diff "Please provide a detailed explanation of quicksort in TypeScript with code examples" "Explain TypeScript quicksort with code"
```

#### Mode 3: File vs. Raw String
```bash
td diff system_prompt.txt "You are a concise code review assistant."
```

#### Mode 4: Standard Input Pipe (`-`)
Stream input directly from another process using `-`:
```bash
# Compare a baseline file against output from a compressor
cat compressed.txt | td diff baseline.txt -

# Compare standard input against an inline string
echo "Summarize this article" | td diff - "Summarize briefly"
```

*Note: You cannot pass `-` for both `<before>` and `<after>` simultaneously.*

---

## 3. Command: `td count`

Counts tokens, characters, and lines for a single file, raw text string, or stdin stream.

### Syntax
```bash
td count [options] <file_or_string>
```

### Arguments
- `<file_or_string>`: File path on disk, inline text string, or `-` for stdin.

### Options
| Option | Shorthand | Default | Description |
|---|:---:|:---:|---|
| `--model <model>` | `-m` | `gpt-4o` | Target model name or explicit encoding. |
| `--json` | - | `false` | Emits structured JSON envelope to `stdout`. |
| `--help` | `-h` | - | Display help for the command. |

### Examples

#### Count File
```bash
td count README.md --model gpt-4o
```
```text
=== Token Count Report ===
File:  README.md
Model: gpt-4o (o200k_base)

Tokens: 2997
Chars:  11541
Lines:  341
```

#### Count Inline Prompt String
```bash
td count "You are a principal software engineer."
```

#### Count Standard Input Stream
```bash
git diff HEAD~1 | td count -
```

---

## 4. Machine-Readable Mode (`--json`)

When invoked with `--json`, `token-diff` outputs a standardized API transport envelope to `stdout`:

```bash
td diff prompt_v1.txt prompt_v2.txt --json
```

```json
{
  "data": {
    "schema_version": "1.0",
    "model": "gpt-4o",
    "encoding": "o200k_base",
    "before": {
      "label": "prompt_v1.txt",
      "token_count": 1240,
      "char_count": 4820,
      "line_count": 115
    },
    "after": {
      "label": "prompt_v2.txt",
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

## 5. Automation & Scripting with `jq`

### Extract Net Token Savings
```bash
TOKEN_SAVINGS=$(td diff original.txt compressed.txt --json | jq '.data.diff.token_delta')
echo "Tokens saved: $TOKEN_SAVINGS"
```

### Assert Token Budget in Shell Scripts
Fail a build if a prompt exceeds 4,000 tokens:
```bash
TOTAL_TOKENS=$(td count system_prompt.txt --json | jq '.data.stats.token_count')

if [ "$TOTAL_TOKENS" -gt 4000 ]; then
  echo "Error: Token budget exceeded! Count: $TOTAL_TOKENS (Max: 4000)" >&2
  exit 1
fi
```

### Verify Compression Benchmark in CI
Ensure that a compression utility achieves at least 20% token savings:
```bash
PCT_SAVINGS=$(cat output.txt | td diff baseline.txt - --json | jq '.data.diff.token_delta_pct')

# Verify savings is negative and <= -20.0
node -e "if ($PCT_SAVINGS > -20.0) { console.error('Failed: Savings was only $PCT_SAVINGS%'); process.exit(1); }"
```

---

## 6. Exit Codes

`token-diff` uses deterministic POSIX exit codes:

| Exit Code | Constant | Description |
|:---:|---|---|
| `0` | `EXIT_SUCCESS` | Calculation succeeded. Results emitted to `stdout`. |
| `1` | `INTERNAL_ERROR` | Unexpected error, unhandled exception, or pipe read error. |
| `2` | `INVALID_INPUT` / `UNSUPPORTED_OPERATION` | Invalid CLI arguments, unsupported model name, or both inputs set to `-`. |
| `3` | `NOT_FOUND` | Specified file does not exist on disk. |
| `4` | `PERMISSION_DENIED` | File system read permission denied. |

### Error Output Structure (`--json`)
When an error occurs in JSON mode, error details are printed to `stdout` before exiting:
```json
{
  "error": {
    "code": "NOT_FOUND",
    "message": "File not found: missing_file.txt",
    "details": {
      "path": "missing_file.txt"
    }
  },
  "metadata": {
    "schema_version": "1.0",
    "source": "token-diff"
  }
}
```
