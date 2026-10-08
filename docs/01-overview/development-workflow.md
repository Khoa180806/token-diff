# Development Workflow

Branching standards, commit message conventions, Test-Driven Development (TDD), and pull request guidelines. This document outlines the engineering practices required for contributing code and documentation to the repository.

---

## 1. Branching Strategy

The repository operates on a single trunk branch model:
- **`main`**: The canonical production and development branch (source: Git repository settings).
- **Feature Branches**: Branch from `main` using descriptive naming:
  - `feat/<feature-name>` for new functionality.
  - `fix/<bug-name>` for bug fixes.
  - `docs/<doc-topic>` for documentation updates.

All changes must pass automated GitHub Actions CI before merging into `main` (source: `.github/workflows/ci.yml`).

---

## 2. Commit Message Conventions

We strictly enforce the Conventional Commits standard (source: `package.json`):

```text
<type>(<scope>): <short description in imperative present tense>
```

### Permitted Types
- **`feat`**: New user-facing feature, CLI argument, or SDK export.
- **`fix`**: Bug fix in token calculation, stream handling, or formatting.
- **`docs`**: Documentation updates or markdown corrections.
- **`refactor`**: Restructuring code without changing observable behavior.
- **`test`**: Adding or updating unit/integration tests.
- **`chore`**: Maintenance, build configs, dependencies, or tool settings.

### Examples
- `feat(cli): add short flag -m for model selection`
- `fix(diff): prevent division by zero when baseline prompt is empty`
- `refactor(core): extract model mapping into models.ts`
- `test(web): add tokenizer parity test suite (TDD RED state)`

---

## 3. Test-Driven Development (TDD) Discipline

All new features and bug fixes follow the Red-Green-Refactor cycle:

1. **Red**: Write a failing unit or integration test in `test/` (or `web/test/`) reproducing the bug or specifying the new feature before writing production code.
2. **Verify Red**: Run `npm test` to confirm the test fails for the expected reason.
3. **Green**: Implement the minimal code necessary to make the test pass.
4. **Verify Green**: Confirm that all tests pass (`npm test`).
5. **Refactor**: Clean up and optimize code while keeping tests green.
6. **Commit**: Create an atomic commit for the verified slice.

---

## 4. Pull Request Checklist

Before opening or merging a Pull Request, verify:
- [ ] All 20 root unit and integration tests pass (`npm test`).
- [ ] All 22 web tests pass (`cd web && npm test`).
- [ ] TypeScript compiles cleanly without errors or warnings (`npm run lint` and `npm run build`).
- [ ] No temporary files, logs, or node_modules are staged.
- [ ] Commits are atomic and formatted with Conventional Commits.
