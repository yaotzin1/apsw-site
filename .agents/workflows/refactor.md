# Workflow: Safe Code Refactoring & Technical Debt SOP

## Purpose
Guide the safe extraction of business logic, controller thinning, component modularization, and technical debt elimination with zero regression risk.

---

## Step 1: Pre-Refactoring Test Baseline
Before modifying any code, establish a green test baseline:
```bash
cd web && npm run type-check && npm run lint
cd ../api && bin/phpunit
```
Do NOT begin refactoring if existing tests are failing.

---

## Step 2: Controller & Service Extraction (Backend)
1. **Identify Target:** Locate controllers with >100 lines or inline QueryBuilder construction.
2. **Create Domain Service:** Move query assembly, business rules, or multi-tenant aggregation into a dedicated domain service class under `api/src/Service/`.
3. **Dispatch Async Messages:** Convert procedural side-effects (e.g. notifications, scrapers) to `MessageBusInterface->dispatch()`.
4. **Thin Controller Action:** Update controller to inject the domain service, delegate work, and return standard envelope `JsonResponse`.

---

## Step 3: Component Modularization (Frontend)
1. **Identify Target:** Locate giant React page views with embedded tables, forms, or chart modules.
2. **Extract Components:** Extract sub-sections into functional components under `web/src/components/`.
3. **Define Interfaces:** Define explicit TypeScript props interfaces and pass event callbacks (`onSave`, `onCancel`).
4. **Theme Alignment:** Replace scattered inline `sx` objects with global MUI Theme tokens.

---

## Step 4: Post-Refactoring Verification
1. Run local verification suite (`.agents/workflows/verification.md`):
   ```bash
   cd web && npm run type-check && npm run lint
   cd ../api && bin/phpunit
   ```
2. Confirm 100% green test execution with 0 contract breakages.
