# Workflow: Playwright E2E QA Testing SOP

## Purpose
Guide the creation, execution, and debugging of Playwright end-to-end (E2E) automated browser test suites.

---

## Step 1: Write E2E Test Spec
1. Create a spec file under `web/e2e/<feature-name>.spec.ts`.
2. Structure test cases using Playwright `@playwright/test`:
   ```typescript
   import { test, expect } from '@playwright/test';

   test.describe('Claim & Onboarding Flow', () => {
     test('user can complete agency registration via onboarding token', async ({ page }) => {
       await page.goto('/register/agency/valid_test_token');
       await expect(page.getByRole('heading', { name: /agency registration/i })).toBeVisible();
       await page.getByLabel(/password/i).fill('SecurePass123!');
       await page.getByRole('button', { name: /complete setup/i }).click();
       await expect(page).toHaveURL('/');
     });
   });
   ```

---

## Step 2: Run Playwright Tests Locally
1. Navigate to `/web`:
   ```bash
   cd web
   npx playwright test
   ```
2. Run in UI mode for interactive debugging:
   ```bash
   npx playwright test --ui
   ```

---

## Step 3: Debug & Inspect Failure Artifacts
1. If a test fails, inspect HTML reports and traces:
   ```bash
   npx playwright show-report
   npx playwright show-trace test-results/<folder>/trace.zip
   ```
2. Fix selector issues or API route mocks (`page.route()`).

---

## Step 4: Verification & CI Integration
1. Run the full verification suite (`.agents/workflows/verification.md`).
2. Verify that `web/test-results/` artifacts are git-ignored.
