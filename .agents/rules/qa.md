# QA & Playwright E2E Testing Guidelines

## 1. QA Philosophy & E2E Scope
Automated Quality Assurance (QA) uses **Playwright** to validate core user journeys across modern browsers (Chromium, WebKit, Firefox). Unit tests verify logic; Playwright verifies user experience.

### Mandatory E2E Test Scenarios:
1. **Viral Onboarding & Agency Claim Flow:** Validate token click (`/register/agency/{token}`), password setup, auto-login, and dashboard redirect.
2. **Prospect Claim & Payment Setup:** Validate prospect claim token (`/api/claim/{token}`), owner account creation, and Stripe/TPay setup intent dialogs.
3. **Conveyor Belt UX (Review Approval Pipeline):** Validate high-speed Approve/Reject optimistic UI state changes and DOM updates.
4. **Multi-Tenant Context & ACL Dashboard:** Validate Brand switcher (`TenantContext`), brand header isolation (`X-Brand-Id`), and dynamic role access limits (`AclDashboard.tsx`).

---

## 2. Playwright Test Structure & Conventions
* **Location:** All Playwright specs live in `web/e2e/*.spec.ts`.
* **Config:** Configuration lives in `web/playwright.config.ts`.
* **Execution Script:** `npm run test:e2e` inside `web/`.
* **Headless Default:** Playwright tests must run headless in CI and container environments (`fullyParallel: true`, `headless: true`).
* **Trace & Screenshots:** Store failure artifacts (trace zip, failure screenshots) in `web/test-results/` for inspection without committing binary assets to Git.

---

## 3. Playwright Coding Standards
* **Selector Priority:** Use user-visible, resilient selectors (`page.getByRole()`, `page.getByLabel()`, `page.getByText()`, or `data-testid`). Avoid brittle XPath or deep CSS chains (`div > div > span`).
* **Network Mocking & Interception:** Use `page.route()` to mock third-party external integrations (e.g. Stripe setup intents, Apify scrapers) during frontend E2E execution.
* **No Hardcoded Sleep:** NEVER use `page.waitForTimeout(5000)`. Always wait for state assertions, locators, or network events (`page.waitForResponse()`, `expect(locator).toBeVisible()`).
