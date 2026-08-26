# Conversation contract

A Conversation is an execution or thinking thread associated with a Project and optionally one or more Tasks.

It is not the durable unit of work. Tasks remain durable even when conversations are replaced, split, archived, or moved between platforms.

## Required fields

```yaml
id: string
provider: chatgpt | codex | gemini | claude | other
external_ref: string
created_at: timestamp
```

## Optional fields

```yaml
title: string
project_id: string | null
task_ids: string[]
workspace_ref: string | null
model: string | null
status: active | closed | archived
last_activity_at: timestamp | null
metadata: object
```

## Rules

1. A Task may reference multiple Conversations.
2. A Conversation may support multiple related Tasks when appropriate.
3. Conversation titles and provider IDs are adapter metadata, not business identity.
4. Closing a Conversation must never implicitly close its Tasks.
5. Migration to a future native OpenAI project/task interface should require only adapter remapping.
