# PropHero Incident Command Centre

Interactive product prototype for an AI-assisted property management incident command centre.

The project demonstrates how PropHero could centralise tenant, owner, property, contract, and service-provider incidents into one operational workspace, with AI support for triage, prioritisation, SLA control, and next-best-action guidance.

Live environment: https://alepensel-businesscase-prophero.vercel.app/

## Prototype And Rights Notice

This repository contains an independent business-case prototype created by Ale Pensel for product exploration, training, and demonstration purposes.

It is not a commercial product, not a production system, and not intended to process real operational data. Any company names, product references, workflows, or business scenarios are used only for contextual demonstration. All trademarks and brand assets remain the property of their respective owners.

All rights are reserved. This project may not be copied, reused, redistributed, sublicensed, sold, or claimed by others without explicit written permission from Ale Pensel.

## Product Context

PropHero helps investors buy and manage real estate assets. After acquisition, operational trust depends on how quickly and transparently incidents are handled: maintenance issues, tenant requests, rent operations, provider coordination, and owner communication.

The prototype focuses on the highest-friction operational area: incident management. It shows how a single command centre can reduce fragmented workflows across email, WhatsApp, app messages, spreadsheets, and CRM notes.

## Product Capabilities

- Omnichannel incident inbox with tickets from email, WhatsApp, app, and CRM-originated channels
- SLA-based queue prioritisation across P1, P2, P3, and P4 incidents
- Ticket detail with requester, property, contract, category, assignee, priority, status, and timeline
- AI triage panel with summary, confidence, suggested category, priority, next action, missing information, and escalation recommendation
- Internal operations workflow for assignment, status change, reply, category change, and SLA recalculation
- User app flow for creating and tracking incidents from a tenant or investor-facing experience
- Browser-based state persistence for continuity during product walkthroughs

## Why This Matters

The business case is not only about a better support inbox. It is about creating an operating layer for property management that improves:

- **Speed:** teams can identify urgent cases faster
- **Control:** SLA, ownership, and status become visible across the managed portfolio
- **Trust:** investors and tenants get a more consistent operational experience
- **Scalability:** PropHero can manage more properties without growing headcount linearly
- **Data quality:** every incident becomes structured operational data for future automation

## Tech Stack

- **Frontend:** React 19
- **Build system:** Vite
- **Mobile app surface:** React Native-style primitives through `react-native-web`
- **State:** local React state with browser persistence
- **Styling:** custom CSS system aligned with the PropHero visual direction
- **Deployment:** Vercel static deployment from GitHub

This is a frontend prototype designed for product validation. It does not require a backend, database, authentication provider, or environment variables.

## Repository Structure

```text
src/
  App.jsx                         Application shell and state orchestration
  components/
    Backoffice.jsx                Operations command centre
    MobileApp.jsx                 User app surface
    BrandAssets.jsx               Inline PropHero brand marks
    IconSprite.jsx                Shared UI icon system
  data/
    incidentData.js               Sanitised entities and incident records
  lib/
    domain.js                     SLA, filtering, metrics, and ticket logic
docs/
  ARCHITECTURE.md                 Product and technical architecture
  DISCOVERY.md                    Discovery plan and service blueprint approach
  MEASUREMENT_PLAN.md             Metrics, pilot design, and decision criteria
  PRODUCT_DECISIONS.md            Key product decisions and trade-offs
  PRODUCT_SPEC.md                 Functional product specification
  PRD.md                          Product requirements document
  ROADMAP.md                      MVP, production, and scale roadmap
  SECURITY_PRIVACY.md             Data, privacy, and security position
case-study/
  BUSINESS_CASE_SUMMARY.md        Business case rationale and production path
presentation/
  README.md                       Presentation narrative and slide flow
  Prophero - Property management business case - Alejandro Pensel.pdf
                                  Business-case presentation artifact
```

## Current Scope

The current version is focused on frontend workflow validation, information architecture, operating model, and AI-assisted triage behaviour. Backend persistence, production authentication, real integrations, and automated provider dispatch are intentionally outside the current scope.
