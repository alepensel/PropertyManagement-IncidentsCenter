# Product Requirements Document

## Product

PropHero Incident Command Centre

## Objective

Create a unified operational workspace for managing property management incidents across channels, properties, contracts, requesters, and internal teams.

The product should help operations teams identify urgent issues faster, assign clear ownership, protect SLA commitments, and use AI as a decision-support layer for triage and next action.

## Problem

Property management incidents are operationally expensive when they are handled across fragmented tools such as email, WhatsApp, app messages, spreadsheets, CRM notes, and individual team knowledge.

This fragmentation creates:

- slow first response
- unclear ownership
- inconsistent prioritisation
- weak traceability
- poor visibility for operations leads
- higher risk of investor and tenant dissatisfaction

## Opportunity

A focused incident command centre can become the system of record for property issues. It can structure inbound requests, connect each incident to the right property and contract context, and help teams manage urgency, ownership, and resolution.

AI should support the analyst by reducing cognitive load and improving consistency. It should not remove human control from customer-impacting decisions.

## Target Users

- CX analysts handling inbound tenant or investor issues
- property managers coordinating operational decisions and providers
- operations leads monitoring workload, SLA risk, and incident quality
- tenants or investors reporting and tracking incidents through the app

## Core User Stories

- As an operations analyst, I want to see all incidents in one prioritised queue so I can handle the most urgent cases first.
- As an operations analyst, I want AI to summarise the incident and suggest priority, category, and missing information so I can triage faster.
- As a property manager, I want requester, property, and contract context in the ticket so I can make better decisions without searching across tools.
- As an operations lead, I want visibility into overdue and high-priority incidents so I can manage operational risk.
- As a customer, I want to report an issue from the app and receive clear confirmation that the request has been created.

## Functional Requirements

### Incident Intake

- Support incidents from multiple channels: email, WhatsApp, app, and CRM-originated records.
- Display channel origin clearly in the queue and ticket detail.
- Capture requester, property, contract, category, priority, status, assignee, SLA state, and timeline.

### Queue Management

- Show assigned and total incident views.
- Separate incidents at SLA risk from incidents within SLA.
- Sort tickets by priority and SLA urgency.
- Provide priority, search, and date filters.

### Ticket Management

- Select a ticket from the queue.
- View complete operational context.
- Change status, assignee, priority, and category.
- Recalculate SLA state when priority changes.
- Add operational replies to the timeline.
- Assign a ticket to the active analyst.

### AI Assistance

- Show incident summary.
- Show confidence score.
- Suggest category and priority.
- Identify next recommended action.
- List missing information.
- Recommend escalation when required.

### User App Flow

- Let a user access the app surface.
- Create an incident from a guided flow.
- Confirm the created incident.
- Allow the created incident to be selected in the backoffice.

## Non-Functional Requirements

- The interface must remain usable on desktop-sized operational workspaces.
- The app surface should follow a mobile-first interaction model.
- The prototype must deploy as a static Vercel application.
- No production credentials or external services are required.
- Product validation data must be synthetic or sanitised.

## Success Metrics

Recommended production metrics:

- time to first response
- time to resolution
- percentage of tickets assigned within SLA
- percentage of P1 and P2 incidents escalated correctly
- reopen rate
- manual touches per incident
- tickets handled per operations team member
- customer satisfaction after closure

## Out Of Scope

- production authentication
- real customer data
- live CRM, email, WhatsApp, or provider integrations
- payment or rent operations
- automated provider dispatch
- autonomous AI communication with customers
- legal or regulated communication workflows

## Product Principles

- Prioritise operational clarity over feature breadth.
- Keep ownership, SLA, and next action explicit.
- Use AI to support analysts, not replace human judgement.
- Turn every incident into structured operational data.
- Build the narrowest workflow that can validate operational value.
