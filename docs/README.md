# token-diff Technical Documentation

Comprehensive architectural specifications, developer integration guides, operations, and technical decision records for `token-diff` (`ai-token-diff`).

---

## Documentation Index

### 01. Overview
- [**Project Overview**](01-overview/project-overview.md) — Problem statement, target user personas, core capabilities, and technology stack.
- [**Project Structure**](01-overview/project-structure.md) — Directory layout, module boundaries, package relationships, and component roles.
- [**Getting Started**](01-overview/getting-started.md) — Prerequisites, installation methods, local execution, and test commands.
- [**Development Workflow**](01-overview/development-workflow.md) — Trunk-based branching (`main`), Conventional Commits specification, TDD cycle, and PR checklist.

### 02. Technical Architecture & Specifications
- [**System Architecture**](02-technical/architecture.md) — 4-stage pipeline, in-memory BPE caching, component diagrams, and performance SLAs.
- [**Core Business Flows**](02-technical/business-flow.md) — Detailed Mermaid sequence diagrams for CLI diffing, Smart Input fallback, stdin pipes, and Web Workers.
- [**API & CLI Reference**](02-technical/api-reference.md) — Programmatic TypeScript SDK contracts, `ApiEnvelope<T>` schema, and deterministic exit codes.
- [**Technical Decisions**](02-technical/tech-decisions.md) — Architectural Decision Records covering pure-JS tokenization, smart input fallback, envelope format, and branching.

### 03. Product & Evolution
- [**Changelog**](03-product/changelog.md) — Chronological release history and feature deliverables grouped by version.
- [**Product Roadmap**](03-product/roadmap.md) — Shipped features, active in-progress deliverables, and upcoming milestones.

### 04. Operations & Configuration
- [**Deployment & CI/CD**](04-operations/deployment.md) — GitHub Actions CI matrix, npm packaging rules, and Vercel web deployment steps.
- [**Configuration Reference**](04-operations/configuration.md) — CLI option flags, model-to-encoding matrix, and zero-secret security policy.

### 05. Templates
- [**Bug Report Template**](05-templates/bug-report.md) — Standardized issue report format for reproducing bugs and regressions.
- [**ADR Template**](05-templates/adr-template.md) — Template for recording future architectural and design decisions.

### 06. Frontend & UI Design
- [**Web UI Architecture**](06-design/ui-notes.md) — Next.js 16 App Router, dark mode design tokens, `shadcn/ui` components, and Web Worker offloading.

### 07. Notes & Limitations
- [**Known Issues & Technical Notes**](07-notes/known-issues.md) — Tracked technical limitations, memory considerations, and active TODO items.
