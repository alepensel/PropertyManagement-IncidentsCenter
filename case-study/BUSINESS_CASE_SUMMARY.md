# Business Case Summary

## Context

PropHero operates an end-to-end real estate investment journey: sourcing, purchase, refurbishment, furnishing, rental management, divestment, and digital follow-up.

The business promise is delegated investing. Investors should be able to own real estate exposure without managing day-to-day operational complexity.

## Problem

The post-acquisition property management phase is where trust is either reinforced or damaged month after month.

As the managed portfolio grows, every asset adds operational complexity: incidents, rent questions, tenant needs, providers, investor updates, documents, SLAs, costs, and reporting.

If this work remains dispersed across manual tools, PropHero risks:

- higher headcount growth
- more errors
- poor SLA visibility
- slower response times
- weaker auditability
- lower investor trust

## Strategic Choice

The business has three options:

1. Continue with manual operations.
2. Adopt an off-the-shelf system.
3. Build a minimal proprietary incident core and integrate channels around it.

The recommendation is to build a narrow proprietary incident core because incident management is close to PropHero's differentiated service experience and creates the data foundation for future AI, rent operations, and reporting.

## Prioritisation

Incidents come first, rent management second, and reporting third.

This is not because incidents are the only important area. It is because incidents are the best first wedge:

- visible pain
- high frequency
- contained MVP scope
- clear operational ownership
- strong link to investor trust
- useful data foundation for later modules

## AI Use Case

The first AI use case is triage assistance, not autonomous resolution.

The copilot helps analysts by:

- summarising the inbound message
- suggesting category
- suggesting priority
- detecting missing information
- recommending next action

This creates immediate operational value while keeping humans in control of sensitive decisions.

## Production Path

1. Validate with internal users.
2. Confirm the workflow covers real operational tasks.
3. Finalise the data model for person, role, property, contract, ticket, SLA, and status.
4. Connect minimum viable channels.
5. Launch a controlled pilot.
6. Measure before/after impact.
7. Connect real data through APIs.

## What The Project Demonstrates

- Business problem framing
- MVP prioritisation
- Service blueprint thinking
- Product and operations alignment
- AI use-case selection
- Prototype execution
- Practical roadmap design
- Awareness of privacy and production constraints
