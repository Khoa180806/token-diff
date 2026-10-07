# Bug Report Template

Please use this template when reporting an issue or unexpected behavior in `token-diff`.

---

## 1. Description
A clear and concise description of the bug.

## 2. Environment Information
- **OS**: (e.g. Windows 11 / Ubuntu 22.04 / macOS Sequoia)
- **Node.js Version**: (`node --version`)
- **Package Version**: (`npx ai-token-diff --version` or `dist/cli.js`)
- **Terminal Shell**: (e.g. PowerShell, Bash, Zsh)

## 3. Steps to Reproduce
1. Execute command:
   ```bash
   td diff <before_input> <after_input> --model <model_name>
   ```
2. Observed output:
   ```text
   [Paste stdout / stderr output here]
   ```
3. Process Exit Code: (`echo $?` or `$LASTEXITCODE`)

## 4. Expected Behavior
A concise description of what you expected to happen (e.g. expected token count X instead of Y).

## 5. Input Payloads (if shareable)
```text
[Paste sample input text or prompt excerpt here]
```
