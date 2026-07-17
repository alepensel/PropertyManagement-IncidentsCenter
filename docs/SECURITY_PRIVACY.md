# Security And Privacy

## Data Position

The prototype uses synthetic and sanitised data. It does not contain real tenant, investor, property, contract, payment, or provider records.

The application is intended for product exploration, training, and business-case demonstration. It should not be used as a live operational system without production-grade security, privacy, legal, compliance, and engineering review.

## Usage Boundary

The current build is a frontend prototype. It does not require real user accounts and should not process real customer, tenant, owner, property, contract, payment, provider, or incident data.

Any company names, product references, workflows, or business scenarios are used only for contextual demonstration. All trademarks and brand assets remain the property of their respective owners.

## Secrets And Credentials

The application does not require:

- API keys
- environment variables
- database credentials
- authentication secrets
- third-party service tokens

The deployed Vercel project is a static frontend build.

## Privacy Considerations For Production

A production implementation would need stronger controls around:

- personal data minimisation
- role-based access
- audit history
- customer communication logs
- attachment handling
- data retention
- AI prompt and output logging
- human approval for sensitive customer-facing actions

## AI Governance

The AI layer should be treated as decision support. Recommended safeguards:

- confidence thresholds
- explainable recommendations
- human approval before escalation or customer-facing communication
- audit logs for AI-generated summaries and suggested actions
- monitoring for classification drift

## Operational Risk

Incident management affects customer trust directly. The product should avoid fully autonomous resolution or communication until the workflow has enough historical data, quality controls, and business confidence.
