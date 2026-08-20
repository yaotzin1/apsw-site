# Workflow: Spec-Driven Feature Development (Spec-Kit SOP)

## Purpose
Execute version-controlled, spec-driven development using the Spec-Kit 6-step lifecycle. All artifacts are committed to Git under `specs/<feature-name>/`.

---

## Stage-by-Stage Step Guide

### Step 1: `/speckit.specify`
* Create directory `specs/<feature-name>/`.
* Write `specs/<feature-name>/spec.md` containing:
  - User Stories & Business Motivation (CENTS alignment)
  - Functional Requirements & Acceptance Criteria
  - Target Persona (Admin, Agency, Owner)
  - Out of Scope items

### Step 2: `/speckit.clarify` (Optional)
* Identify underspecified behavior, permission boundaries, or dynamic options.
* Ask clarification questions and update `specs/<feature-name>/spec.md`.

### Step 3: `/speckit.plan`
* Write `specs/<feature-name>/plan.md` detailing architecture, REST envelope contracts, thin controller delegators, and Mercure SSE topics.
* Write `specs/<feature-name>/data-model.md` detailing Doctrine ORM entities, attributes, relations, and migration plan (additive/non-destructive).
* Write `specs/<feature-name>/research.md` documenting tech choices and plugin hooks (`AddonInterface`).

### Step 4: `/speckit.tasks`
* Write `specs/<feature-name>/tasks.md` listing tasks in dependency order:
  - [ ] Task 1: Create Entity & Migration (`doctrine:migrations:migrate -n`)
  - [ ] Task 2: Implement Domain Service / Add-on
  - [ ] Task 3: Build Thin Controller & Router
  - [ ] Task 4: Build React / MUI Components & Dynamic Tab
  - [ ] Task 5: Write PHPUnit & Vitest Tests

### Step 5: `/speckit.analyze` (Optional)
* Audit `tasks.md` for:
  - Multi-tenancy leaks (`TenantFilter`)
  - End-user technical term exposure in UI
  - Defensive migration SQL

### Step 6: `/speckit.implement`
* Create a feature branch (`.agents/workflows/branching.md`).
* Execute tasks from `tasks.md` sequentially.
* Execute `.agents/workflows/verification.md` (`npm run type-check`, `npm run lint`, `bin/phpunit`).
* Merge branch into `main` (Trunk).
