# Project contract

A Project is the durable container for related work. It must not depend on one chat product, one model, or one Taskboard implementation.

## Required fields

```yaml
id: string
name: string
status: active | paused | archived
created_at: timestamp
updated_at: timestamp
```

## Optional fields

```yaml
goal: string
summary: string
workspace_ref: string | null
labels: string[]
owner_ref: string | null
metadata: object
```

## Relations

A Project may contain:

- Tasks
- Conversations
- Deliverables
- Signals (future phase)

## Portability rule

Taskboard project IDs, ChatGPT project IDs, Codex project IDs, local paths, and cloud IDs are adapter references. They must not become the canonical Project identity.
