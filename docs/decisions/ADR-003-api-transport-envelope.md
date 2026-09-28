# ADR-003: Standardized API Transport Envelope Architecture

## Status
Accepted

## Date
2026-09-22

## Context
In the AI Developer Tool Ecosystem, tools must function both as standalone developer utilities and as interoperable modules within autonomous AI agent control planes.

Raw JSON outputs from typical CLI tools often lack standardized metadata (such as schema versions, execution latency, and truncation status), making automated consumption by upstream orchestration agents fragile and error-prone.

We needed a uniform envelope contract that complies with ecosystem decision D-008 (compact-response-first) and the integration specification defined in `05_INTEGRATION_SPEC.md`.

## Decision
All machine-readable outputs emitted with `--json` must adhere strictly to the standardized generic envelope structure:

```json
{
  "data": { ... },
  "metadata": {
    "schema_version": "1.0",
    "source": "token-diff",
    "duration_ms": 14,
    "truncated": false,
    "next_cursor": null
  }
}
```

- **`data`**: Encapsulates the domain-specific payload (`TokenDiffReport` or `TokenCountReport`).
- **`metadata`**: Uniform envelope headers tracking schema versioning, source tool provenance, execution duration in milliseconds, and stream pagination controls.
- **Error Payloads**: Similarly formatted with `{ "error": { "code": "...", "message": "...", "details": { ... } }, "metadata": { ... } }`.

## Alternatives Considered

### 1. Bare JSON Payload (No Envelope)
- **Pros**: Slightly smaller output footprint (~80 fewer bytes).
- **Cons**: Upstream agents have no deterministic way to verify payload schema versions, detect if data was truncated, or capture execution latency without wrapping execution in external timers.
- **Rejected**: Violates ecosystem-wide integration contract D-008 and D-016.

### 2. Free-Form Key-Value Logging
- **Pros**: Easy to implement.
- **Cons**: Cannot be parsed predictably by automated tools or JSON parsers (`jq`).
- **Rejected**: Unsuitable for autonomous agent tool-calling loops.

## Consequences

- **Ecosystem Consistency**: Downstream tools (such as Context Pack T02 and Tool Result Compressor T03) consume `token-diff` reports using identical parsing logic.
- **Auditable Performance**: Execution duration is tracked automatically in `metadata.duration_ms`, allowing agent frameworks to profile context optimization overhead accurately.
- **Backward Compatibility**: Schema evolution can be negotiated cleanly using `metadata.schema_version`.
