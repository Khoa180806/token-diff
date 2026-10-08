# Core Business Flows

Detailed sequence diagrams describing the primary execution flows across CLI and web runtimes. This document covers input ingestion, offline token calculation, and asynchronous browser worker orchestration.

---

## 1. Flow 1: CLI File-to-File Comparison (`td diff fileA fileB`)

Compares two local files on disk using the specified or default model tokenizer (source: `src/cli.ts#L86-L122`, `src/diff.ts`).

```mermaid
sequenceDiagram
    autonumber
    actor Dev as Developer / Terminal
    participant CLI as CLI Entrypoint (src/cli.ts)
    participant FS as Local Filesystem (node:fs)
    participant Resolver as Model Resolver (src/models.ts)
    participant Tokenizer as Tokenizer Engine (src/tokenizer.ts)
    participant Diff as Diff Engine (src/diff.ts)
    participant Formatter as Formatter (src/formatter.ts)

    Dev->>CLI: td diff prompt_v1.txt prompt_v2.txt --model gpt-4o
    activate CLI
    CLI->>FS: existsSync & statSync("prompt_v1.txt")
    FS-->>CLI: true (isFile)
    CLI->>FS: readFileSync("prompt_v1.txt", "utf-8")
    FS-->>CLI: textA

    CLI->>FS: existsSync & statSync("prompt_v2.txt")
    FS-->>CLI: true (isFile)
    CLI->>FS: readFileSync("prompt_v2.txt", "utf-8")
    FS-->>CLI: textB

    CLI->>Resolver: resolveEncodingForModel("gpt-4o")
    Resolver-->>CLI: "o200k_base"

    CLI->>Tokenizer: countTokens(textA, "gpt-4o")
    Tokenizer-->>CLI: TokenizerResult A (tokenCount, chars, lines)

    CLI->>Tokenizer: countTokens(textB, "gpt-4o")
    Tokenizer-->>CLI: TokenizerResult B (tokenCount, chars, lines)

    CLI->>Diff: computeDiff(resA, resB, { beforeLabel: "prompt_v1.txt", afterLabel: "prompt_v2.txt" })
    Diff-->>CLI: TokenDiffReport

    CLI->>Formatter: formatHuman(report)
    Formatter-->>Dev: stdout: ANSI terminal table
    CLI-->>Dev: exit(0)
    deactivate CLI
```

---

## 2. Flow 2: Smart Input Fallback Flow (`td diff "text1" "text2"`)

Automatically detects when CLI arguments are raw prompt strings rather than file paths, issuing a non-blocking stderr warning (source: `src/cli.ts#L35-L51`).

```mermaid
sequenceDiagram
    autonumber
    actor Dev as Developer / Agent
    participant CLI as CLI Entrypoint (src/cli.ts)
    participant FS as Filesystem (node:fs)
    participant Stderr as Process stderr
    participant Stdout as Process stdout
    participant Diff as Diff Engine (src/diff.ts)

    Dev->>CLI: td diff "Draft prompt" "Compressed prompt" --json
    activate CLI
    CLI->>FS: statSync("Draft prompt")
    FS-->>CLI: throws ENOENT / false
    CLI->>Stderr: write [WARN] File not found, treating input as raw text: "Draft prompt"

    CLI->>FS: statSync("Compressed prompt")
    FS-->>CLI: throws ENOENT / false
    CLI->>Stderr: write [WARN] File not found, treating input as raw text: "Compressed prompt"

    CLI->>Diff: computeDiff(count("Draft prompt"), count("Compressed prompt"))
    Diff-->>CLI: TokenDiffReport

    CLI->>Stdout: write JSON ApiEnvelope (duration_ms, schema_version)
    CLI-->>Dev: exit(0)
    deactivate CLI
```

---

## 3. Flow 3: Standard Input Streaming Flow (`cat new.txt | td diff old.txt -`)

Ingests standard input pipes via the standard Unix hyphen (`-`) symbol without writing to scratch disk files (source: `src/cli.ts#L26-L33`, `src/cli.ts#L96-L98`).

```mermaid
sequenceDiagram
    autonumber
    actor Pipeline as Shell Pipe / CI Process
    participant CLI as CLI Entrypoint (src/cli.ts)
    participant Stdin as Stdin Stream (fd 0)
    participant FS as Filesystem (node:fs)
    participant Diff as Diff Engine (src/diff.ts)

    Pipeline->>CLI: cat optimized.txt | td diff baseline.txt -
    activate CLI

    Note over CLI: Arg 1 is "baseline.txt" -> Read from disk
    CLI->>FS: readFileSync("baseline.txt")
    FS-->>CLI: baselineContent

    Note over CLI: Arg 2 is "-" -> Read from Stdin fd 0
    CLI->>Stdin: readFileSync(0, "utf-8")
    Stdin-->>CLI: pipeStreamContent

    alt Both inputs are "-"
        CLI->>CLI: throw TokenDiffError("INVALID_INPUT")
        CLI-->>Pipeline: exit(2)
    end

    CLI->>Diff: computeDiff(baselineResult, stdinResult)
    Diff-->>CLI: TokenDiffReport (afterLabel: "stdin")
    CLI-->>Pipeline: stdout: Table / JSON (exit 0)
    deactivate CLI
```

---

## 4. Flow 4: Web Browser Offloaded Diff Flow (`Web Worker`)

Executes tokenizer dictionaries in a background Web Worker on the browser, preventing UI thread blocking on large text inputs (source: `web/src/hooks/useTokenDiff.ts`, `web/src/lib/tokenizer/worker.ts`, `web/src/lib/tokenizer/client.ts`).

```mermaid
sequenceDiagram
    autonumber
    actor User as Web User
    participant Hook as useTokenDiff Hook (web/src/hooks/)
    participant Client as Worker Client (web/src/lib/)
    participant Worker as Background Web Worker (worker.ts)
    participant Ranks as Lazy Rank Loader (ranks.ts)
    participant Tiktoken as Tiktoken Lite Engine

    User->>Hook: User types in Before / After textarea
    activate Hook
    Note over Hook: Debounce timer triggers (200ms)

    Hook->>Client: requestTokenDiff(beforeText, afterText, model)
    activate Client
    Client->>Worker: postMessage({ id, type: 'diff', beforeText, afterText, model })

    activate Worker
    Worker->>Ranks: loadRankForEncoding(encoding)
    Ranks-->>Worker: Dynamic import (e.g. js-tiktoken/ranks/o200k_base.js)
    Worker->>Tiktoken: new Tiktoken(rankData).encode(text)
    Tiktoken-->>Worker: Tokens array & counts

    Worker-->>Client: postMessage({ id, success: true, before, after, diff })
    deactivate Worker

    Client-->>Hook: Promise resolves { before, after, diff }
    deactivate Client

    Hook->>User: Renders Stats Cards, Diff Delta, and Token Visuals
    deactivate Hook
```
