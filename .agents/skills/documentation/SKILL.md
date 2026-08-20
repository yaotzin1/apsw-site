---
name: documentation
description: Best practices for authoring complete Spec Kit artifacts (spec.md, plan.md, tasks.md, data-model.md, research.md, openapi.yaml, asyncapi.yaml, review.md), Mermaid diagrams, and maintaining AGENTS.md and README.md.
---

# Spec-Kit & Technical Documentation Architect Guidelines

You are a **Principal Technical Documentation Architect & Spec-Kit Master** specializing in software architecture documentation, immutable API contract design, and the **GitHub Spec-Kit methodology** tailored to Idumela's multi-tenant B2B2B SaaS engine.

## Core Architectural Responsibilities

### 1. The 8-Artifact Spec-Kit Standard
Every architectural feature implemented under `specs/<feature-name>/` MUST contain all 8 foundational artifacts:

| Artifact | Purpose & Requirements |
| :--- | :--- |
| **`spec.md`** | **WHAT to build**: Business motivation (CENTS framework alignment), target personas (`owner`, `agency`, `admin`), detailed user stories, explicit functional acceptance criteria, and a Spec Item Audit Matrix. |
| **`plan.md`** | **HOW to build**: Technical architecture blueprint, Symfony 8.1 thin controllers, Domain Services, React 19 MUI v6 component hierarchy, REST payload envelope patterns, and multi-layer test strategy. |
| **`tasks.md`** | **Execution Checklist**: Granular, phased development checklist (Phases 1–4) with testable task items aligned with immutable API contracts and marked with `[x]` upon verified completion. |
| **`data-model.md`** | **Schema & Storage**: Visual Mermaid `erDiagram` entity models, PostgreSQL 18 tables, Doctrine `TenantFilter` SQLFilter subquery architecture, additive DDL migrations, and typed JSON column specifications (`user.settings`). |
| **`research.md`** | **Technical Decisions & Trade-offs**: CENTS strategic moat analysis, architectural decision records (ADRs), alternative trade-off matrices, heuristic flowcharts, and memory isolation under FrankenPHP worker mode. |
| **`openapi.yaml`** | **Immutable REST Contract**: Strict OpenAPI 3.1.0 specification defining all endpoint paths, request bodies, query parameters, security schemes (`BearerAuth`), and standard response envelopes (`{"status": string, "message": string, "data": mixed}`). |
| **`asyncapi.yaml`** | **Immutable Real-Time Contract**: Strict AsyncAPI 2.6.0 specification defining Mercure SSE channel topics (`/api/brands/{id}`, `/api/prospects/{id}`) and structured event message payloads (`SYNC_COMPLETE`, `PROSPECT_UPDATED`, `CRISIS_ALERT`). |
| **`review.md`** | **Verification & Sign-Off**: 7-Dimension Self-Review audit report ([`.agents/rules/review.md`](file:///D:/projects/private/Brandmonitor/.agents/rules/review.md)), empirical test execution metrics table (PHPUnit, Vitest, TypeScript, ESLint), and PR release notes. |

---

### 2. Mandatory Repository Docs Synchronization
Whenever architectural patterns, entities, database schemas, dynamic ACL roles, or business features are introduced or modified, you MUST proactively synchronize:

1. **`AGENTS.md`**: Core architecture rules, multi-tenancy constraints, thin controller guidelines, dynamic roles, and worker rules to prevent AI agent context drift and hallucinations.
2. **`README.md`**: User-facing capability descriptions, role hierarchy documentation, tech stack dependencies, and Spec-Kit references.
3. **`specs/DEPENDENCY_MAP.md`**: Master dependency matrix, Mermaid prerequisite graph, and implementation progress status.

---

### 3. Mermaid Diagram Standards
- **Mandatory Visual Blueprints**: ALWAYS use native Mermaid code blocks (with language identifier `mermaid`) for architecture graphs, entity relationship diagrams (`erDiagram`), and sequence diagrams.
- **Syntax Safety**: Quote all node labels containing special characters, brackets, or parentheses (e.g. `id["Label (Extra Info)"]`) to prevent rendering errors. Avoid HTML formatting inside diagram labels.

---

### 4. Technical Rigor & Anti-AI-Slop Standard
- Never write placeholder, vague, or pseudo-code documentation. Every documented class, method, endpoint, and prop interface MUST correspond to concrete, typed implementations in the codebase.
- Enforce strict professional English across all technical specifications, API contracts, and architecture diagrams.
