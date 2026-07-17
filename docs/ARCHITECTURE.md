# Architecture

## Overview

The prototype is organised around two connected product surfaces:

- **Operations command centre:** the internal workspace used by CX, property management, and operations teams to triage and manage incidents.
- **User app surface:** the customer-facing flow used to report an issue and understand its status.

Both surfaces run in the same React application so the product flow can show the full loop: a user creates or views an incident, and the backoffice receives, prioritises, and manages it.

## Application Layers

```text
React application
  App shell
    View switching
    Local state
    Demo persistence
  Backoffice surface
    Inbox
    Metrics
    Ticket detail
    AI triage panel
  Mobile app surface
    Home
    Contact flow
    Incident creation
    Status confirmation
  Domain logic
    SLA calculation
    Priority sorting
    Filtering
    Metrics
  Demo data
    Tickets
    Properties
    Requesters
    Contracts
```

## Frontend Stack

The web command centre is implemented in React and bundled with Vite. This keeps the prototype fast, portable, and easy to deploy on Vercel.

The mobile-facing experience uses React Native style primitives through `react-native-web`. For a production app, this creates a natural path toward an Expo or React Native implementation while preserving the same product model and component thinking.

## State Model

The prototype uses local React state for ticket operations:

- creating tickets
- selecting tickets
- assigning ownership
- changing priority
- changing category
- changing status
- adding timeline replies
- recalculating SLA state

Browser persistence is used to preserve state during product walkthroughs. A production version would replace this with API-backed persistence.

## Domain Logic

Core product behaviour is centralised in `src/lib/domain.js`:

- SLA thresholds by priority
- queue filtering
- triage sorting
- operational metrics
- requester, property, and contract matching
- category-to-priority defaults
- ticket ID generation

Keeping this logic outside UI components makes the prototype easier to review and gives a clear foundation for backend service boundaries later.

## AI Triage Model

The AI panel represents the intended decision-support layer for operations teams. It is designed as an analyst copilot, not as an autonomous workflow engine.

The prototype shows the target outputs:

- concise incident summary
- confidence level
- recommended category
- recommended priority
- next best action
- missing information
- escalation guidance

In production, this layer would connect to a controlled AI workflow with structured inputs, audit logs, confidence thresholds, and human approval for sensitive actions.

## Production Architecture Direction

A production implementation would likely evolve into:

- React web app for operations
- React Native or Expo app for users
- API layer for tickets, users, properties, contracts, and providers
- database-backed incident records and audit history
- integrations with email, WhatsApp, CRM, and property management systems
- AI service for classification, summarisation, routing, and suggested replies
- role-based permissions for CX, operations, property managers, and administrators

## Deployment

The current prototype is deployed as a static Vercel application from GitHub. This is appropriate for the current scope because there are no server-side dependencies or secrets.
