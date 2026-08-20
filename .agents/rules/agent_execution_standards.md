# Mandatory Agent Execution Standards & Skill Discipline

All AI agents working on this repository MUST strictly apply all specialized skills (`.agents/skills/`), system rules (`.agents/rules/`), and architectural directives across every session without exception:

## 1. Full Skill Matrix Enforcement
- **QA & E2E Testing (`qa`)**: Always write Playwright E2E suites (`web/e2e/`), Vitest RTL tests, and PHPUnit backend tests for every code change. Run verification commands (`npm run type-check`, `npm run lint`, `bin/phpunit`) before completing tasks.
- **Security & Audit (`security_guard`)**: HttpOnly JWT cookies, constant-time verification (`hash_equals()`), ACL capability checks, protection of `_DYNAMIC` system roles from deletion, and Doctrine `TenantFilter` state isolation.
- **Frontend Design Excellence (`pixel`)**: Fluid widescreen MUI layouts, global MUI Theme design tokens, conveyor-belt optimistic UI, dynamic tab rendering (`AddonTabRenderer.tsx`), and technical obfuscation for end-user UIs.
- **Event-Driven Backend (`event_driven` & `code_quality`)**: Thin controllers delegating to domain services or Symfony Messenger async workers (`idumela_messenger`), with real-time Mercure SSE push (`HubInterface`).
- **Database & Unit Economics (`sql_master` & `devops`)**: Concurrent row locking (`SELECT ... FOR UPDATE`), eager joins, zero-downtime additive migrations, and Hetzner PaaS cost optimization.

## 2. Mandatory Pre-Completion Self-Review (STRICT MUST HAVE)
- **Self-Review Against `.agents/rules/review.md` is a MUST**: Before declaring any task complete, committing code, or creating a PR, AI agents MUST execute a mandatory self-review evaluating their work against the 7 core dimensions of `.agents/rules/review.md`.
- **Post Self-Review as GitHub PR Comment (ALWAYS)**: For every created Pull Request, AI agents MUST automatically post the formatted 7-dimension Self-Review Audit Report as an official comment on the GitHub PR (`gh pr comment <pr_id> --body "..."`).
  1. *Architectural Alignment*: CENTS framework & `AddonInterface` usage.
  2. *Thin Controllers*: HTTP mapping only; business logic in services; side-effects in Symfony Messenger.
  3. *Multi-Tenancy & Memory Isolation*: `TenantFilter` enforcement & FrankenPHP worker state purging.
  4. *Technical Obfuscation*: Technical terms hidden behind friendly business terminology in user UI.
  5. *Defensive Migrations*: Additive DDL, zero-downtime, safe column defaults.
  6. *Real-Time Push*: Mercure SSE streams & optimistic UI instead of polling loops.
  7. *Empirical Verification*: 100% test coverage with clean passes (`npm run type-check`, `npm run lint`, `bin/phpunit`).

## 3. Documentation & Visual Standards
- **Mermaid Diagrams**: ALWAYS use native Mermaid fenced code blocks (` ```mermaid `) for all architectural blueprints, sequence diagrams, and flowcharts in specs and markdown documentation.
- **Spec Kit Methodology**: Specifications in `specs/` must contain `spec.md`, `plan.md`, `tasks.md`, and update `specs/DEPENDENCY_MAP.md`.
