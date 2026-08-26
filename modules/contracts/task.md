# Task contract

A Task is the durable unit of work in the Operations Center.

The current Dashi issue/task object is an adapter implementation of this contract, not the permanent canonical model.

## Required fields

```yaml
id: string
project_id: string
objective: string
status: backlog | todo | in_progress | in_review | done | blocked | canceled
created_at: timestamp
updated_at: timestamp
```

## Optional fields

```yaml
description: string
priority: none | low | medium | high | urgent
conversation_ids: string[]
deliverable_ids: string[]
labels: string[]
assignee_ref: string | null
due_at: timestamp | null
source_ref: string | null
metadata: object
```

## Rules

1. A Task persists independently of any single Conversation.
2. A Task may accumulate multiple Conversations and Deliverables over its lifetime.
3. `done` represents accepted completion, not merely agent execution completion.
4. Provider-specific thread IDs, model names, worktrees, branches, and UI fields belong in adapter metadata.
5. Future external Signals may create or update Tasks only through an explicit workflow policy.
