# Product Decisions

## Decision 1: Build A Focused Incident Core

### Context

Property Management can be supported through manual operations, off-the-shelf tools, or a proprietary internal product layer.

Manual operations are flexible at low volume but create weak traceability and poor SLA visibility. Off-the-shelf tools can accelerate implementation but often impose a generic data model that does not naturally connect investor, property, contract, rent, incident, and portfolio context.

### Decision

Build a narrow proprietary incident core and integrate channels around it.

### Rationale

- Incident management is close to the investor trust promise.
- PropHero needs a clean operational data model for future automation.
- The first version can be narrow enough to validate in 90 days.
- The same data foundation can later support rent operations and investor reporting.

### Trade-Off

This requires more initial effort than configuring a generic tool, but it protects the long-term operating model and creates a better base for AI.

## Decision 2: Incidents Before Rent Operations And Reporting

### Context

The broader Property Management opportunity includes incidents, rent collection, and investor reporting.

### Decision

Start with incident management.

### Rationale

- Incidents are frequent and visible.
- The workflow is operationally bounded.
- The MVP can create value quickly.
- It establishes the entity model: person, role, property, contract, ticket, SLA, status, owner.
- Reporting should not be automated before the underlying data is reliable.

### Trade-Off

Rent operations may carry more direct financial impact, but it requires more sensitive data, stronger reconciliation rules, and higher operational precision. Incidents are the better first validation wedge.

## Decision 3: AI As Copilot, Not Autopilot

### Context

AI can reduce manual triage work, but property management incidents can involve habitability, security, payments, and customer trust.

### Decision

Use AI to assist the analyst, not to make final operational decisions.

### Rationale

- AI can summarise, classify, detect missing data, and suggest next actions.
- Analysts should confirm P1/P2 severity.
- Analysts should approve customer-facing messages.
- Low-confidence entity matches should be flagged, not automatically linked.

### Trade-Off

This limits immediate automation, but it builds trust and reduces the risk of incorrect escalation or communication.

## Decision 4: Make Internal State Reliable Before Investor Visibility

### Context

Investor-facing transparency only creates trust if the internal state is accurate.

### Decision

First build reliable internal ticket status, ownership, SLA, and timeline. Then expose a simplified external view.

### Rationale

- Internal notes and investor-visible status require separation.
- Investors need clarity, not operational noise.
- Publishing unreliable status can increase support contacts instead of reducing them.

### Trade-Off

The investor experience improves more gradually, but the visible experience is more trustworthy.

## Decision 5: Measure Operational Leverage, Not Only Ticket Volume

### Context

Ticket volume alone can be misleading. More tickets may mean more assets, better reporting, worse service, or lower self-service.

### Decision

Evaluate the system through operational leverage and quality metrics.

### Rationale

The product should help PropHero manage more assets without proportional headcount growth or service degradation.

Key metrics:

- Managed properties per operations team member
- SLA compliance by priority
- Time to first response
- Average time to resolution
- Ticket reopen rate
- Percentage of tickets linked to property and contract
- Percentage of incidents visible to investors with clear next step
