# Testing & Code Verification Guidelines

## 1. Strict Testing Enforcement (NO TEST, NO MERGE)
* You MUST write automated unit/integration tests for **every single** new feature, bug fix, refactoring, or architectural change.
* Code changes submitted without test coverage are considered incomplete and will be rejected.

## 2. Backend Testing (PHPUnit)
* Unit tests for domain logic, services, commands, add-ons, and message handlers live in `api/tests/Unit/`.
* Functional/Integration tests for controllers, security roles, and multi-tenancy live in `api/tests/Controller/` or `api/tests/Integration/`.
* Tests must extend Symfony's `WebTestCase`.

## 3. Frontend Testing (Vitest & React Testing Library)
* React components, custom hooks, context providers, and optimistic UI state machines must have test coverage under `web/src/__tests__/`.

## 4. End-to-End QA Testing (Playwright)
* Critical user journeys (agency onboarding, prospect claims, conveyor belt UX, dynamic role switching) MUST have end-to-end browser test coverage using **Playwright** under `web/e2e/*.spec.ts`.
* See [`.agents/rules/qa.md`](file:///D:/projects/private/Brandmonitor/.agents/rules/qa.md) and [`.agents/workflows/qa_e2e.md`](file:///D:/projects/private/Brandmonitor/.agents/workflows/qa_e2e.md).

## 5. Pre-Submission Verification Rule
Before reporting any task completed, you MUST execute and verify:
1. `npm run type-check` (in `/web`)
2. `npm run lint` (in `/web`)
3. `bin/phpunit` (in `/api` or Docker container)
4. Playwright E2E specs for modified user flows (`npx playwright test` in `/web`)
