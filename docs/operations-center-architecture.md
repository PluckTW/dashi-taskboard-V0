# Pluck AI Operations Center Architecture

## Goal

Extend Codex Taskboard into a modular AI Operations Center without coupling business-specific logic to the taskboard core.

The taskboard remains the system of record for work. Domain modules detect signals, qualify them, invoke AI capabilities, and produce reviewable deliverables.

## Design principles

1. **Core stays generic** — avoid embedding Faculty, Tender, Funding, CRM, or market-specific rules into taskboard internals.
2. **Modules are replaceable** — each capability should be callable independently and should communicate through explicit contracts.
3. **Task is the durable object** — conversations, agent runs, and model choices are execution details.
4. **Human review is a gate** — AI may advance work to review, but irreversible business actions require explicit approval.
5. **Evidence travels with the task** — every commercial recommendation should retain its source URLs, timestamps, confidence, and reasoning summary.
6. **Model-agnostic routing** — GPT, Codex, Gemini, Claude, or future agents should be interchangeable behind a routing layer.
7. **Local-first, cloud-ready** — preserve the current local SQLite workflow while keeping module state portable to Cloudflare/D1 or future storage.

## High-level flow

```text
External Signals
    ↓
Signal Intake
    ↓
Normalization
    ↓
Qualification Engine
    ↓
Task Creation / Update
    ↓
Agent Router
    ↓
Domain Module Execution
    ↓
Human Review
    ↓
Deliverable / Business Action
    ↓
Outcome Feedback
```

## Core layers

### 00 — Taskboard Core
Existing Codex Taskboard capabilities: projects, issues, statuses, comments, attachments, CLI, API, UI, and review lifecycle.

### 01 — Signal Intake
Responsible for ingesting raw external events from sources such as web, RSS, email, APIs, manual entry, CRM, or scheduled scrapers.

### 02 — Intelligence Modules
Domain-specific modules such as:
- Faculty Watcher
- Tender Finder
- Government Funding Intelligence
- Publication Watcher
- Competitor Watcher

### 03 — Qualification Engine
Scores and filters signals using configurable rules such as relevance, confidence, commercial fit, account priority, geography, product fit, urgency, and expected value.

### 04 — Agent Router
Selects the appropriate model, agent, skill, or workflow for a task. Routing decisions must not be hard-coded into domain modules.

### 05 — Human Review
Provides accept, reject, deepen-research, reassign, and promote-to-action decisions.

### 06 — Deliverables
Produces normalized outputs such as:
- Early Lead
- Account Brief
- Market Alert
- Weekly Brief
- Campaign Recommendation
- BD Recommendation

### 07 — Integrations
Adapters for Google Sheets, Google Drive, Microsoft Teams, Salesforce, email, and future systems.

## Initial implementation order

1. Foundation contracts and module registry
2. Faculty Watcher adapter
3. Tender Finder adapter
4. Government Funding Intelligence adapter
5. Shared Signal Inbox / Early Leads aggregation
6. Qualification scoring
7. Dashboard adaptation
8. External integrations

## Upstream strategy

The fork should remain easy to compare with and update from `chuspeeism/dashi-taskboard`.

- Keep upstream-derived core files minimally modified.
- Prefer additive modules and adapters.
- Use feature branches and PRs for all functional changes.
- Document intentional divergence.
- Keep Apache 2.0 attribution and license requirements intact.
