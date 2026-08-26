# Signal Contract v0.1

A Signal is an observed external or internal event that may justify creating or updating work.

## Required fields

```yaml
contract: pluck.signal/v0.1
id: string
source_type: string
source_ref: string
observed_at: ISO-8601 datetime
title: string
summary: string
```

## Recommended fields

```yaml
entity:
  type: person | organization | institution | opportunity | regulation | publication | event | unknown
  name: string
  identifiers: {}

geography:
  country: string
  region: string

signal_type: faculty_move | tender | funding | publication | competitor | regulatory | crm | manual | other

product_context:
  products: []
  applications: []

commercial:
  relevance_score: 0-100
  confidence_score: 0-100
  urgency_score: 0-100

 evidence:
  - url: string
    publisher: string
    published_at: ISO-8601 datetime | null
    excerpt: string | null

metadata: {}
```

## Rules

- `source_ref` must let an operator recover the original observation.
- Scores are optional during intake and may be added by Qualification Engine.
- A Signal is not automatically a Lead.
- Duplicate Signals should be linkable to the same entity or task rather than silently discarded.
- Evidence must remain attached through downstream processing.
