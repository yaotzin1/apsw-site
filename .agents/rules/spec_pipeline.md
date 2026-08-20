# Spec-Driven Development Pipeline (Spec-Kit Framework)

All non-trivial feature implementations MUST follow the version-controlled 6-stage **Spec-Kit Pipeline**. Feature specifications and planning artifacts are tracked in Git under `specs/<feature-name>/` (or `.ai/spec/<feature-name>/`).

## The 6 Stages of Spec-Driven Feature Development

### 1. Stage 1: Specify (`/speckit.specify`)
* **Output:** `specs/<feature-name>/spec.md`
* **Purpose:** Define **WHAT** to build in a technology-agnostic specification document. Captures user stories, business goals, acceptance criteria, and non-functional requirements.

### 2. Stage 2: Clarify (`/speckit.clarify` - Optional)
* **Output:** Updates `specs/<feature-name>/spec.md`
* **Purpose:** Identify underspecified requirements, ambiguities, and edge cases. Ask targeted clarification questions and encode resolutions back into `spec.md`.

### 3. Stage 3: Plan (`/speckit.plan`)
* **Outputs:** 
  - `specs/<feature-name>/plan.md` (Architecture, endpoint design, execution plan)
  - `specs/<feature-name>/data-model.md` (Doctrine entities, schema diffs, JSON payload schemas)
  - `specs/<feature-name>/research.md` (Technical trade-offs, third-party library research)
* **Purpose:** Design **HOW** to build the feature, detailing exact technical patterns, multi-tenancy controls (`TenantFilter`), and API contracts.

### 4. Stage 4: Generate Tasks (`/speckit.tasks`)
* **Output:** `specs/<feature-name>/tasks.md`
* **Purpose:** Break down `plan.md` into an ordered, dependency-aware, actionable task list (e.g., Task 1: Entity & Migration, Task 2: Service Layer, Task 3: Controller & Endpoint, Task 4: Frontend Component, Task 5: PHPUnit/Vitest Tests).

### 5. Stage 5: Analyze (`/speckit.analyze` - Optional)
* **Output:** Updates `specs/<feature-name>/tasks.md` or `plan.md`
* **Purpose:** Review generated tasks against risk factors, zero-downtime DB migration rules, multi-tenancy leaks, and security permissions before writing code.

### 6. Stage 6: Implement (`/speckit.implement`)
* **Output:** Functional code changes + test coverage
* **Purpose:** Execute tasks sequentially from `tasks.md`, referencing `spec.md`, `plan.md`, and `data-model.md`. Execute verification checks (`.agents/workflows/verification.md`) before completion.
