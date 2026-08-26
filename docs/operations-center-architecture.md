# Pluck AI Operations Center Architecture

## Primary goal

Turn Dashi Taskboard into a practical personal control surface for managing **Projects, Tasks, Conversations, and Deliverables** across ChatGPT/Codex-style work.

The immediate goal is better work management, not maximum automation.

Dashi is treated as the current UI/control adapter. The portable work model must survive if OpenAI or another platform later provides a better native project/task interface.

## Core model

```text
Project
  ├─ Task
  │   ├─ Conversation(s)
  │   └─ Deliverable(s)
  ├─ Conversation(s)
  └─ Deliverable(s)
```

### Project
Durable container for a goal, workspace, and related work.

### Task
Durable unit of work. Tasks persist even if chats are replaced, split, archived, or moved to another provider.

### Conversation
Execution/thinking thread in Codex, ChatGPT, Gemini, Claude, or another provider. Conversation identity is adapter metadata rather than the canonical work identity.

### Deliverable
Reviewable output such as a report, code change, briefing, presentation, market alert, or decision memo.

The portable contracts live under `modules/contracts/`.

## Design principles

1. **Dashi is an adapter, not the permanent system model.**
2. **Task is the durable work object.** Conversations are execution context.
3. **Projects organize work, not provider-specific chats.**
4. **Deliverables survive conversation churn.**
5. **Core stays generic.** Business-specific logic stays outside Taskboard internals.
6. **Human acceptance remains distinct from agent completion.**
7. **Local-first for normal use.** Operations Center launch paths bind to `127.0.0.1`.
8. **Preserve upstream compatibility.** Prefer additive wrappers, contracts, and adapters over invasive core rewrites.
9. **External automation is a later phase.** Security boundaries become stricter when untrusted signals begin creating work automatically.

## Phase 1 — Personal Operations Center

Primary workflows:

```text
Idea / request
    ↓
Project
    ↓
Task
    ↓
Conversation / Codex execution
    ↓
Review
    ↓
Deliverable
    ↓
Accepted / Done
```

Focus:

- project visibility
- backlog and priority management
- keeping feature/work lineage outside chat history
- linking work to one or more conversations
- reviewing outcomes from one board
- reducing dependence on conversation lists as the main navigation system

### Normal local launch

```bash
npm run ops
npm run ops:codex
```

These wrappers force `CODEX_TASKBOARD_HOST=127.0.0.1` while preserving original upstream scripts for deliberate LAN/cloud use.

## Phase 2 — Intelligence modules

After the Phase 1 workflow is useful in daily operation, add replaceable modules such as:

- Faculty Watcher
- Tender Finder
- Government Funding Intelligence
- Publication Watcher
- Competitor Watcher

These modules should communicate through contracts rather than modifying Taskboard core concepts.

## Phase 3 — External Signal Intake

Only when external sources begin creating or modifying Tasks automatically, introduce the stronger trust boundary:

```text
External source
    ↓
Untrusted Signal
    ↓
Normalize / extract facts
    ↓
Qualification policy
    ↓
Task proposal
    ↓
Approved execution authority
```

Core principle:

> External content may provide facts, but it may never grant authority.

External content must never be able to escalate sandbox settings, choose privileged capabilities, authorize outbound actions, or redefine system policy.

## Layering

```text
00 Work Model / Contracts
   Project
   Task
   Conversation
   Deliverable

01 Dashi Adapter
   projects
   issues/tasks
   statuses
   comments
   attachments
   UI
   taskctl/API

02 Execution Adapters
   Codex
   ChatGPT
   future model/agent providers

03 Optional Domain Modules
   Faculty Watcher
   Tender Finder
   Funding Intelligence
   etc.

04 Optional Integrations
   Google Drive / Sheets
   Teams
   Salesforce
   email
```

## Portability strategy

If a future OpenAI-native surface provides Projects + Tasks + Conversations + Agent review:

```text
Current
Portable Work Model → Dashi Adapter → Codex / ChatGPT

Future
Portable Work Model → OpenAI Native Adapter
```

The target is to replace the adapter, not rewrite the workflow logic.

## Upstream strategy

The fork should remain easy to compare with and update from `chuspeeism/dashi-taskboard`.

- Keep upstream-derived core files minimally modified.
- Prefer additive scripts, modules, adapters, and documentation.
- Keep original upstream launch modes available.
- Use feature branches and PRs for functional changes.
- Document intentional divergence.
- Keep Apache 2.0 attribution and license requirements intact.

## Near-term implementation order

1. Portable Project / Task / Conversation / Deliverable contracts
2. Local-first Operations Center launcher
3. Daily-use Project/Task/Conversation UX improvements
4. Conversation linking and visibility
5. Deliverable tracking
6. Only then add intelligence modules
7. External Signal trust boundary when automatic ingestion begins
