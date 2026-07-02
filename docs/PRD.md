# PRD: Property Management Incident Command Centre

## 1. Summary

Build a first version of an internal incident command centre for PropHero's Property Management operation.

The MVP centralises incident intake, triage, assignment, SLA tracking, communication, and operational visibility across the property management lifecycle.

## 2. Problem

Property management creates recurring operational complexity after a property is acquired and rented. Incidents may arrive through multiple channels and often require coordination between investors, tenants, property managers, customer support, providers, and internal backoffice teams.

If these workflows remain spread across email, WhatsApp, CRM notes, spreadsheets, and manual follow-ups, PropHero may struggle to scale without higher cost, slower response, weaker traceability, and lower investor confidence.

## 3. Users

### Primary Users

- Customer Success analysts
- Property Managers
- Operations leads

### Secondary Users

- Investors
- Tenants
- Providers
- Sales and account teams

## 4. Goals

- Centralise incident work into one operational view.
- Create a shared ticket model linked to person, role, property, and contract.
- Make SLA risk visible and actionable.
- Reduce manual classification and copy/paste work.
- Give teams a foundation for investor-facing transparency.
- Validate whether AI-assisted triage improves speed and consistency.

## 5. Non-Goals

- Full rent collection module.
- Automated monthly investor reporting.
- Provider marketplace.
- Accounting reconciliation.
- Fully autonomous AI resolution.
- Production-grade CRM or ERP replacement.

## 6. MVP Scope

### Intake

- Manual ticket creation
- Email-originated ticket concept
- WhatsApp-originated ticket concept
- In-app request concept
- CRM-originated ticket concept

### Ticket Model

- Ticket ID
- Title
- Requester
- Role
- Property
- Contract
- Channel
- Created time
- Priority
- Status
- SLA
- Category
- Assignee
- Attachments
- Activity history

### Workflow

- View queue by SLA risk
- Filter by priority
- Search tickets, properties, and people
- Assign ticket
- Change status
- Change priority
- Change category
- Reply to requester
- Add timeline activity

### AI Assistance

- Summarise inbound request
- Suggest category
- Suggest priority
- Detect missing information
- Recommend next action
- Keep analyst in control

## 7. Success Metrics

- Time to first response by priority
- SLA compliance by priority
- Percentage of tickets with assigned owner
- Percentage of tickets linked to property and contract
- Ticket reopen rate
- Average time to resolution
- Manual touches per ticket
- Internal user satisfaction

## 8. Key Risks

- Building software before clarifying operational ownership.
- Automating inconsistent workflows too early.
- Poor data quality around property, contract, and requester identity.
- Over-reliance on AI recommendations without human validation.
- Publishing investor-facing status before internal status is reliable.

## 9. Product Principles

- Centralise first, automate second.
- Make ownership and SLA visible.
- Keep AI as a copilot in the first release.
- Prefer narrow operational value over broad platform scope.
- Design for traceability because trust depends on explainability.

## 10. Open Questions

- Which intake channel accounts for the highest incident volume today?
- What are the current SLA commitments, if any?
- Which roles are authorised to close or reopen tickets?
- What is the source of truth for property and contract data?
- What minimum status should be visible to investors?
- Which categories map to cost, risk, or churn?
