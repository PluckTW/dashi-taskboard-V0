# Deliverable contract

A Deliverable is a reviewable output produced by a Task or Conversation.

Examples:

- research brief
- market alert
- lead summary
- presentation
- document
- code change
- decision memo

## Required fields

```yaml
id: string
type: string
title: string
created_at: timestamp
status: draft | review | accepted | rejected | superseded
```

## Optional fields

```yaml
project_id: string | null
task_id: string | null
conversation_ids: string[]
artifact_ref: string | null
summary: string
source_refs: string[]
version: string | null
metadata: object
```

## Rules

1. Deliverables survive conversation churn.
2. A new version may supersede an older Deliverable without erasing history.
3. External storage locations such as Google Drive, GitHub, local files, or future OpenAI artifacts are adapter references.
4. Acceptance of a Deliverable may advance a Task, but the mapping is workflow policy rather than a hard-coded contract rule.
