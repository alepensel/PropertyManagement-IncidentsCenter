# PropHero Incident Command Centre

Interactive product prototype for a property management incident centre, created as part of the PropHero Property Management business case.

This repository documents the product thinking behind the prototype: business context, problem framing, MVP scope, operating model, data model, AI triage approach, roadmap, and production considerations.

## Product Context

PropHero sells a delegated real estate investment experience. The investor does not only buy an asset; they trust PropHero to manage the operational complexity after acquisition.

The key risk appears after the property enters management. Incidents, rent operations, tenant communication, provider coordination, and investor reporting can become fragmented across WhatsApp, email, CRM tools, spreadsheets, and informal follow-ups.

If that workflow does not scale, PropHero risks higher operating cost, slower response times, weaker traceability, and lower investor trust.

## Prototype

The prototype demonstrates an internal command centre for property management incidents:

- Omnichannel incident inbox across WhatsApp, email, app, and CRM-originated requests
- Ticket categorisation, priority, status, SLA, assignee, requester, property, and contract context
- AI-assisted triage suggestions: summary, category, priority, missing data, and next action
- Internal workflow for assignment, response, status change, and audit-style activity history
- Investor-facing app simulation showing how incident visibility could reduce uncertainty

Live prototype:

https://alepensel-businesscase-prophero.vercel.app/

## Why Incidents First

The broader Property Management opportunity includes incidents, rent collection, and investor reporting. I prioritised incidents first because it is the fastest path to validate operational value in 90 days:

- It has clear pain, high contact frequency, and visible service risk.
- It creates the shared data foundation for person, role, property, contract, ticket, SLA, state, and owner.
- It improves traceability before automating investor reporting.
- It gives internal teams a practical workflow to validate before expanding into rent operations.

## Product Strategy

The strategic decision is not to replace every operational tool immediately. The proposal is to build a focused proprietary core for incident management, while integrating channels and existing systems where useful.

This protects three things:

- Speed: a narrow MVP can be validated quickly.
- Control: PropHero owns the operational data model.
- Trust: AI is introduced as an analyst copilot before deeper automation.

## North Star

Primary metric:

**Managed properties under Property Management**

Quality inputs:

- Managed properties per operations team member
- Percentage of managed properties with open incidents
- Percentage of rents collected on time
- SLA compliance by priority
- Ticket reopen rate

The goal is to grow managed assets without increasing headcount proportionally or degrading investor experience.

## Repository Contents

```text
docs/
  PRD.md
  PRODUCT_SPEC.md
  ARCHITECTURE.md
  ROADMAP.md
  DISCOVERY.md
  PRODUCT_DECISIONS.md
  MEASUREMENT_PLAN.md
  SECURITY_AND_PRIVACY.md
case-study/
  BUSINESS_CASE_SUMMARY.md
presentation/
  Prophero - Property management business case - Alejandro Pensel.pdf
```

## Local Preview

```bash
npm run start
```

The local server uses port `4287` by default.

## Vercel Deployment

Import this repository in Vercel and use:

- Framework preset: `Other`
- Build command: `npm run build`
- Output directory: `dist`

The prototype is static and does not require environment variables, a database, or a backend service.

## Documentation Notes

This is a portfolio case study using synthetic demo data. It is not an official PropHero production system and does not contain real customer, tenant, investor, contract, payment, or property records.

The documentation is written as a real product working package: what problem we are solving, why this scope comes first, how the workflow should operate, what data is required, what AI should and should not do, and how the first release should be validated.
