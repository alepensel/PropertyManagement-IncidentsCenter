# Architecture

## Current Prototype Architecture

The current prototype is a static front-end application designed for portfolio demonstration and product validation.

```text
Browser
  index.html
  src/styles.css
  src/app.js
  assets/

Static build
  scripts/build-static.mjs
  dist/

Local preview
  server.js
```

The prototype uses synthetic in-memory data and browser storage. It does not connect to production systems, databases, CRMs, email providers, WhatsApp, or PropHero internal tools.

## Proposed Production Architecture

```text
Input Channels
  App form
  Email
  WhatsApp Business API
  CRM/manual internal entry

Ticket Ingestion Layer
  Normalise message
  Attach source metadata
  Create ticket UUID
  Store attachments

Entity Resolution
  Match person
  Match role
  Match property
  Match contract
  Flag uncertain matches

Incident Core
  Category
  Priority
  SLA
  Status
  Owner
  Timeline
  Audit log

AI Triage Copilot
  Summarise
  Classify
  Suggest priority
  Detect missing data
  Recommend next action

Backoffice UI
  Queue
  Detail view
  Assignment
  Reply
  Escalation

Investor / Tenant Visibility
  Status
  Next step
  Expected timing
  Closed / resolved history
```

## Integration Principles

- Do not connect directly to production databases from the prototype.
- Use APIs or controlled service layers for real integrations.
- Keep customer-facing status separate from internal operational notes.
- Store an audit trail for SLA, ownership, and status changes.
- Treat AI outputs as recommendations until confidence and process maturity improve.

## Data Sources Needed For Production

- Person and role registry
- Property registry
- Contract registry
- Channel message metadata
- Attachment storage
- SLA policy table
- User and permission model
- Notification preferences

## AI Control Model

AI should operate as a copilot:

- Human validates P1/P2 severity.
- Human confirms customer-facing replies.
- Human can override category and owner.
- Low-confidence matches are flagged instead of auto-linked.

## Security And Privacy Considerations

- Avoid storing personal documents in the ticket body.
- Mask sensitive identifiers in logs.
- Control access by role and property portfolio.
- Separate internal notes from user-visible communication.
- Apply retention rules for attachments.
- Track who changed status, priority, owner, and SLA.
