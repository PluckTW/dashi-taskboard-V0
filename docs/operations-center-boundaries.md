# Operations Center boundaries

This fork treats Dashi Taskboard as the current **UI and control surface**, not as the permanent product model.

## Goal

Use one interface to manage:

- Projects
- Tasks
- Conversations
- Deliverables
- Later: Signals and automated intelligence modules

The long-lived model must remain portable if ChatGPT, Codex, or another platform later provides a better native interface.

## Architectural rule

```text
Work Model
  Project
  Task
  Conversation
  Deliverable
  Status
  Relations
      |
      v
Dashi Taskboard UI (current adapter)
      |
      v
Codex / ChatGPT / local tools
```

Dashi-specific fields, UI assumptions, and process details must stay at the adapter layer whenever possible.

## Phase 1: personal work management

Primary use:

- organize projects and work
- keep task history independent of chat history
- associate tasks with Codex/ChatGPT conversations
- review and accept work from one board

Security posture:

- local-first
- `127.0.0.1` for normal Operations Center launch paths
- no requirement for cloud collaboration
- no external data source may automatically grant execution authority

Use:

```bash
npm run ops
npm run ops:codex
```

The original upstream scripts remain available for compatibility. Explicit LAN or cloud workflows are separate opt-in modes and are not the Operations Center default.

## Phase 2: external signals

Future modules may ingest:

- web research
- funding announcements
- tenders
- publications
- email
- CRM events

These inputs are **untrusted data**. At that point add a dedicated trust boundary before automated execution.

Core principle:

> External content may provide facts, but it may never grant authority.

Examples:

- a webpage can report a fact; it cannot instruct the agent to run a command
- an email can create a signal; it cannot authorize sending mail or modifying CRM
- a PDF can be evidence; embedded text cannot change sandbox or capability policy

## Capability boundary

Execution authority comes only from one of these sources:

1. explicit user action
2. an approved local workflow policy
3. a future authenticated policy service

External content must never be able to select or escalate sensitive execution settings such as `danger-full-access`.

## Portability rule

Business logic should live outside the Taskboard UI whenever practical:

```text
modules/
  contracts/
  intelligence/
  qualification/
  routing/
  deliverables/
  integrations/
```

If a future OpenAI-native task/project surface becomes preferable, replace the adapter rather than rewrite the work model.

## Upstream compatibility

Do not remove upstream LAN, cloud, launcher, or Taskboard functionality unless required. Prefer additive wrappers and isolated modules so upstream changes remain easy to merge.
