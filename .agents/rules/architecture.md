# Architecture & Core Philosophy Guidelines

## 1. Fastlane & CENTS Framework
* **Control:** Cross-tenant data leaks are fatal; data isolation occurs at the framework level via Doctrine `TenantFilter`. No third-party SaaS for core queues or real-time sockets (using FrankenPHP Mercure and DB locks).
* **Entry:** High technological moat using stealth scrapers, async webhook polling, and multi-tier AI prompt-chaining.
* **Need:** Focus strictly on the "Human-in-the-Loop" Google Review Approval pipeline and Threat Intelligence outreach that generates direct ROI.
* **Time (Zero-Ops):** Decouple revenue from human hours. All long-running scrapers, AI prompt tasks, and email dispatches are offloaded asynchronously to background Messenger workers.
* **Scale:** B2B2B architecture (Admin -> Agency -> Owner -> Brand). Professional English codebase, UI, and database schema for global market reach.

## 2. Monorepo Structure
* `/api`: Backend REST API built with Symfony 8.1 and PHP 8.5.8+.
* `/web`: Frontend SPA built with React, Vite, TypeScript, and Material UI.

## 3. B2B2B Hierarchy & Multi-Tenancy
* **Hierarchy:** `Admin` -> `Agency` -> `Owner` (`User`) -> `Brand` (formerly Location).
* An `Owner` can manage their `Brand` directly without an `Agency`. An `Agency` acts as a management layer for zero to many `Brand`s (ManyToMany via `brand_agency`).
* Multi-tenancy is enforced globally via Doctrine's `TenantFilter` (SQLFilter) using subqueries over `brand_agency`.
* Navigation trees are fetched in single DB roundtrips using QueryBuilder eager joins and hydrated via `HierarchyHydrator`.

## 4. Add-on Extensibility
* The system is modular via `App\Addon\AddonInterface`.
* New data sources, metrics, integrations (e.g. TripAdvisor, Booking.com), or Threat Intelligence algorithms **must** be implemented as Add-ons in `api/src/Addon/`.
* Core code provides hooks (`hookReviewOperation`, `hookAnalytics`, etc.); Add-ons inject and handle custom workflows.

## 5. Technical Obfuscation in UI
* Never expose internal technical terms (e.g., Apify, pgvector, ORM, FrankenPHP, Webhooks, LLM models) to non-technical users in user-facing UI dashboards or notifications.
* Abstract behind business-friendly terms (e.g. "Smart Context Engine" instead of "pgvector", "Background Data Sync" instead of "Apify").
* Technical transparency is permitted only in the Admin dashboard.

## 6. Trunk-Based Development & Mandatory Pull Requests (PR MUST)
* **`main` is Protected Trunk:** The `main` branch must always remain stable, passing, and deployment-ready.
* **MANDATORY GitHub Pull Requests (PR MUST):** ALL new features (`feat/*`), bug fixes (`fix/*`), refactoring (`refactor/*`), and maintenance (`chore/*`) MUST be pushed as short-lived topic branches and merged via **GitHub Pull Requests (PR)**. Direct local merging or pushing directly into `main` is STRICTLY PROHIBITED. See [`.agents/workflows/branching.md`](file:///D:/projects/private/Brandmonitor/.agents/workflows/branching.md).
* **ALL CHECKS GREEN CI GATE:** A Pull Request MUST NOT be merged under any circumstances until ALL GitHub Actions CI checks (tests, lints, type-checks, production builds) have finished with a 100% green (`pass`) status. Never merge while checks are `pending` or failing.
