# Product Specification

## Core Experience

The command centre is designed for an internal analyst managing a prioritised queue of property management incidents.

The analyst should be able to:

1. See the current operational load.
2. Identify SLA risk quickly.
3. Open a ticket and understand the full context.
4. Confirm or correct AI triage.
5. Assign ownership.
6. Respond to the requester.
7. Update status, priority, category, and assignee.
8. Preserve a clear activity history.

## Information Architecture

### Sidebar

- Assigned to me
- Total incidents
- New
- Open / assigned
- In progress
- Pending / waiting
- Resolved
- Closed
- User app entry point

### Top Bar

- Search
- Date range filters
- Current operator identity

### Metrics

- Open tickets
- P1 critical
- P2 high
- P3 medium
- P4 low

### Queue

- SLA at risk
- Within SLA
- Priority filter
- Ticket cards with channel, requester, property, priority, and SLA state

### Ticket Detail

- Ticket title and ID
- Priority chip
- SLA chip
- Assignment action
- Channel
- Requester
- Property
- Contract
- Status
- Assignee
- Priority
- Category
- Activity timeline
- Reply box
- AI triage panel

## Status Model

- New
- Open / assigned
- In progress
- Pending / waiting
- Resolved
- Closed

## Priority Model

| Priority | Incident Type | First Response Target |
| --- | --- | --- |
| P1 | Critical: security, flooding, blocked access, severe damage | 15 minutes |
| P2 | High: essential service affected or habitability impacted | 1 business hour |
| P3 | Medium: relevant operational issue | 2 business hours |
| P4 | Low: administrative query | 4 business hours |

## Data Model

### Ticket

- id
- title
- requester
- requester role
- document type
- document number
- property
- property id
- contract
- contract id
- source channel
- created date
- priority
- status
- assignee
- SLA state
- category
- AI confidence
- summary
- missing information
- next action
- messages
- attachments metadata

### Entity

- person
- role
- document type
- document number
- properties
- contracts

## AI Triage Behaviour

The AI layer should not close a ticket or send a customer-facing response without human confirmation.

It can suggest:

- short summary
- category
- severity
- missing data
- recommended next action
- suggested owner

## Acceptance Criteria

- An analyst can identify overdue or at-risk tickets in under 10 seconds.
- Every ticket can be linked to a person, property, and contract.
- The analyst can update owner, status, category, and priority.
- Priority changes recalculate SLA state.
- The ticket timeline preserves visible activity.
- The user app surface can show incident status without exposing internal notes.
- Product validation data is synthetic or sanitised.

## Future Enhancements

- Real email ingestion
- WhatsApp Business API integration
- CRM integration
- Provider assignment workflow
- Investor notification preferences
- Cost approval workflow
- Rent collection module
- Monthly investor reporting
- Analytics dashboard
