# Operations Center Modules

This directory contains business-specific and reusable AI Operations Center capabilities.

## Rule: modules do not own the taskboard

A module may:
- receive normalized signals or tasks;
- enrich them with evidence;
- score or classify them;
- propose task mutations;
- produce structured deliverables.

A module should not:
- directly redefine core taskboard status semantics;
- hard-code UI behavior;
- assume one AI model/provider;
- perform irreversible external business actions without a review gate.

## Planned structure

```text
modules/
├─ contracts/
│  ├─ signal.md
│  ├─ qualification.md
│  ├─ deliverable.md
│  └─ module-manifest.md
├─ faculty-watcher/
├─ tender-finder/
├─ funding-intelligence/
├─ publication-watcher/
├─ competitor-watcher/
└─ early-leads/
```

## Module lifecycle

```text
raw input
  → normalize
  → enrich
  → qualify
  → propose task/deliverable
  → human review
  → action/outcome
```

## Versioning

Each module should declare:
- module id
- semantic version
- accepted input contract versions
- output contract versions
- dependencies
- required secrets/connections
- review requirements

The first implementation phase should prefer documentation and adapters over core rewrites.
