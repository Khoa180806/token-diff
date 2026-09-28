# ADR-002: Smart Input Fallback for Seamless String & File Diffs

## Status
Accepted

## Date
2026-09-23

## Context
When developers or agents optimize prompts or review context size changes, input text can originate from several sources:
1. Files stored on disk (e.g. `system_prompt.txt`, `README.md`, source code files).
2. Ephemeral inline prompt strings passed directly in the terminal (e.g. `td diff "Please do X" "Do X"`).
3. Piped data from upstream shell utilities (e.g. `git diff | td count -`).

Initial CLI designs required users to distinguish input types explicitly or create temporary scratch files on disk. This created unnecessary friction in daily workflows.

## Decision
Implement a **Smart Input Detection** strategy in `src/cli.ts`:
- Check if an input argument points to an existing file on disk using `fs.existsSync(arg)`.
- If the file exists, read its contents as UTF-8.
- If the file does not exist, seamlessly fallback to treating the string argument as literal text content, emitting a non-blocking diagnostic warning to `stderr`:
  `[WARN] File not found, treating input as raw text: "..."`
- If the argument is `-`, resolve it from standard input (`process.stdin`).

## Alternatives Considered

### 1. Explicit CLI Flags (`--before-file`, `--before-string`, `--after-file`, `--after-string`)
- **Pros**: Zero ambiguity in input resolution.
- **Cons**: Extremely verbose CLI syntax; hurts developer ergonomics and makes quick ad-hoc prompt comparisons cumbersome.
- **Rejected**: Clutters CLI UX for a common, low-risk operation.

### 2. Strict File-Only Requirement
- **Pros**: Simple mental model; standard Unix file utility behavior.
- **Cons**: Forces developers to save temporary `.txt` files to disk whenever they want to compare two prompt variations, polluting working directories and requiring cleanup.
- **Rejected**: Inhibits rapid prompt engineering iteration.

### 3. Silent String Fallback (No Warning)
- **Pros**: Completely clean stdout/stderr.
- **Cons**: If a developer mistypes a real file name (e.g. `td diff prompt_v1.txt promtp_v2.txt`), the tool would silently tokenize the literal 13 characters of the filename instead of reporting an error, leading to misleading token counts.
- **Rejected**: Poses an unacceptable correctness hazard.

## Consequences

- **Superior Ergonomics**: Users can compare files against files, strings against strings, or files against strings without learning specialized flags.
- **Safety Against Typos**: The non-blocking warning on `stderr` alerts users if an intended file was mistyped, while keeping `stdout` completely clean for automation and pipe redirection.
- **Agent Friendly**: AI agents can pass multi-line string prompts directly into the CLI tool call without filesystem gymnastics.
