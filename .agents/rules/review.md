# Self-Review & Implementation Quality Checklist

Before finalizing any task, declaring completion, or submitting code changes, AI agents and developers MUST execute a self-review by asking and answering the following 7 core reflection questions:

## 1. Architectural & Domain Alignment (CENTS & Add-ons)
* **Question:** Is this feature using the plugin architecture (`App\Addon\AddonInterface`) if it introduces new metrics, integrations, or data sources?
* **Question:** Does the business logic strictly serve the Human-in-the-Loop pipeline or Threat Intelligence ROI without adding non-essential bloat?

## 2. Code Quality & Thin Controllers
* **Question:** Is the controller kept thin (only handling HTTP request parsing and response mapping), or did business logic / direct QueryBuilder construction leak into the controller?
* **Question:** Are side-effects (notifications, emails, scrapers, vector indexing) decoupled into Symfony Messenger async messages or domain events?

## 3. Multi-Tenancy & Memory State Isolation
* **Question:** Is global multi-tenancy enforced through Doctrine's `TenantFilter` without relying on manual `WHERE agency_id = X`?
* **Question:** If handling a webhook, API endpoint, or CLI command, did I ensure that Doctrine SQLFilters do not leak memory state across requests under FrankenPHP worker mode?

## 4. End-User Technical Obfuscation & Anti-AI-Slop GUI Integrity
* **Question:** Are all internal technical concepts (Apify, pgvector, ORM, FrankenPHP, LLM prompt chaining) hidden behind friendly business terms in user-facing UI elements, dashboard labels, and notifications? (Only permitted in Admin dashboard).
* **Question:** Does the generated UI avoid AI slop (no fake sparkles ✨, no decorative placeholder bezier curves, no nested card bloat, no unformatted strings)?


## 5. Defensive Database Migrations
* **Question:** If database schema changes were made, is the migration 100% additive and zero-downtime for existing production data?
* **Question:** Did I avoid adding non-default `NOT NULL` columns to existing populated tables? Are DDL statements defensive (`IF EXISTS`)?

## 6. Real-Time Push & Performance (No Polling)
* **Question:** If UI updates are required, did I use Mercure SSE streams (`EventSource`) or optimistic UI updates instead of client-side `setInterval` polling loops?
* **Question:** Is standard REST payload unwrapping using the standard envelope (`{"status": string, "message": string, "data": mixed}`)?

## 7. Mandatory Verification (NO TEST, NO MERGE)
* **Question:** Did I write dedicated automated tests (PHPUnit for backend, Vitest/RTL for frontend) covering this new logic or bug fix?
* **Question:** Did I run all verification commands (`npm run type-check`, `npm run lint`, and `bin/phpunit`) and confirm concrete, empirical green results before reporting completion?
