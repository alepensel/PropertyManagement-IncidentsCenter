# Security And Privacy Checklist

This repository is intended for public portfolio use. It must not contain sensitive or proprietary information.

## Public Sharing Rules

- Use synthetic demo data only.
- Do not include real investor, tenant, provider, employee, contract, property, payment, or document data.
- Do not include API keys, tokens, cookies, credentials, private URLs, or environment files.
- Do not include screenshots from internal tools.
- Do not include proprietary datasets or exports.
- Do not include confidential strategy documents.

## Current Demo Data

The prototype uses fictional people, properties, contracts, tickets, and document identifiers. Demo identifiers use labels such as `DEMO-DNI`, `DEMO-NIE`, and synthetic property or contract IDs.

## Before Making The Repository Public

Review:

- Git history
- `.env` files
- Vercel config
- hidden files
- screenshots
- attachments
- PDFs and presentations
- commit messages
- remote URLs
- generated build artifacts

## Recommended Pre-Publication Commands

```bash
git status --short
git log --oneline --decorate -20
rg -n "api_key|apikey|secret|token|password|passwd|OPENAI|SUPABASE|VERCEL|DATABASE_URL|PRIVATE|BEGIN RSA|BEGIN OPENSSH|sk-" .
rg -n "[A-Z]{2}[0-9]{20}|[0-9]{8}[A-Z]|[XYZ][0-9]{7}[A-Z]" .
```

## Product Documentation Note

This project is safe to share publicly only if it remains a synthetic case study. The strongest public signal is the product thinking and execution approach, not exposure of private operational data.
