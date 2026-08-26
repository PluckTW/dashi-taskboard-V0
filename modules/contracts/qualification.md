# Qualification Contract v0.1

Qualification converts a Signal into a decision-ready assessment. It must remain explainable and reviewable.

## Shape

```yaml
contract: pluck.qualification/v0.1
signal_id: string
qualified_at: ISO-8601 datetime
status: qualified | watch | rejected | needs_research
scores:
  relevance: 0-100
  confidence: 0-100
  urgency: 0-100
  account_fit: 0-100
  product_fit: 0-100
  expected_value: 0-100
priority: critical | high | medium | low
reasons:
  - string
missing_information:
  - string
recommended_next_action: string
review_required: boolean
metadata: {}
```

## Rules

- Scores must be accompanied by concise reasons.
- `confidence` describes evidence quality, not commercial attractiveness.
- Missing information must be explicit rather than silently guessed.
- A high score never bypasses a configured human review gate.
- Qualification rules should be configurable by geography, market, product line, and workflow.
