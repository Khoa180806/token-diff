# Configuration Reference

Technical reference guide for CLI options, runtime configuration flags, environment variables, and model parameter mappings. This document details all configurable properties across the CLI and web application runtimes.

---

## 1. Zero-Secret Architecture

`token-diff` is designed as a 100% offline, local compute engine (source: `src/tokenizer.ts`).

- **No API Keys**: Does not require `OPENAI_API_KEY` or third-party credentials.
- **No Network Endpoints**: Does not configure HTTP backends or external telemetry.
- **No Database Credentials**: Requires zero database connection strings or stateful persistence.

---

## 2. CLI Options & Parameters

Command-line parameters accepted across subcommands (source: `src/cli.ts#L86-L160`):

| Option Flag | Shorthand | Default Value | Applicable Subcommands | Description |
|---|:---:|:---:|:---:|---|
| `--model <model>` | `-m` | `gpt-4o` | `diff`, `count` | Target model name or explicit encoding string. |
| `--json` | `-j` | `false` | `diff`, `count` | Serializes machine-readable JSON ApiEnvelope to stdout. |
| `--help` | `-h` | - | All | Displays command-line help manual. |
| `--version` | `-V` | - | Root | Emits package semantic version (`1.0.0`). |

---

## 3. Supported Models & Encoding Matrix

You can pass either the colloquial model name or the underlying encoding name directly to `--model` (source: `src/models.ts#L4-L34`):

| Canonical Encoding | Associated Supported Models | BPE Vocabulary Family |
|---|---|---|
| `o200k_base` | `gpt-4o`, `gpt-4o-mini`, `chatgpt-4o-latest`, `o1`, `o1-mini`, `o1-preview` | OpenAI modern 200k token dictionary |
| `cl100k_base` | `gpt-4`, `gpt-4-turbo`, `gpt-4-32k`, `gpt-3.5-turbo`, `text-embedding-ada-002`, `text-embedding-3-small`, `text-embedding-3-large` | OpenAI ChatGPT / GPT-4 dictionary |
| `p50k_base` | `text-davinci-003`, `text-davinci-002` | Legacy Davinci text completions |
| `r50k_base` | `davinci` | Original GPT-3 dictionary |

### Prefix Detection Rule
If an unrecognized model name begins with `gpt-4o` or `o1`, it automatically resolves to `o200k_base`. If it begins with `gpt-4` or `gpt-3.5`, it automatically resolves to `cl100k_base` (source: `src/models.ts#L56-L61`).

---

## 4. Standard Environment Variables (Node.js)

| Variable | Type | Default | Description |
|---|:---:|:---:|---|
| `NODE_ENV` | `string` | `development` | In `web/`, controls Next.js production optimization vs dev server mode. |
| `PORT` | `number` | `3000` | In `web/`, specifies the local web development or preview port. |
| `FORCE_COLOR` | `string` | System default | When set to `0`, disables ANSI color escape codes in `picocolors`. |
