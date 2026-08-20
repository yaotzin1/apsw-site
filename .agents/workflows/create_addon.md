# Workflow: Creating a New PHP Add-on Component

## Purpose
Guide the implementation of new integrations, analytics modules, scrapers, or Threat Intelligence algorithms using the PHP Add-on architecture (`App\Addon\AddonInterface`).

## Step 1: Create Backend Add-on Class
1. Create a new class under `api/src/Addon/` (e.g., `api/src/Addon/TripAdvisorAddon.php`).
2. Implement `App\Addon\AddonInterface`.
3. Implement required methods:
   - `getKey(): string` (unique identifier, e.g., `'tripadvisor'`)
   - `getName(): string` (display name, e.g., `'TripAdvisor Reviews'`)
   - `getDescription(): string`
   - `isEnabledForBrand(Brand $brand): bool`
   - `hookReviewOperation(...)`, `hookAnalytics(...)` as needed.
4. Verify Symfony Dependency Injection automatically tags it via autowiring in `services.yaml`.

## Step 2: Configure Add-on Pricing & Settings
1. Save brand-level configurations in `brand.addonConfigs` JSON column.
2. Store external pricing/plan variables on `IntegrationConnector`.

## Step 3: Frontend Dynamic Tab Registration
1. Verify the backend endpoint `GET /api/brands/{id}/addons-tabs` automatically includes the new add-on tab key when enabled.
2. Create corresponding frontend tab component in `web/src/components/BrandWorkspace/Tabs/` if custom UI is needed.
3. Register the tab renderer case in `web/src/components/AddonTabRenderer.tsx`.
4. DO NOT hardcode dynamic add-on tabs into primary dashboard routes.

## Step 4: Unit Testing & Verification
1. Create unit tests for the add-on in `api/tests/Unit/Addon/`.
2. Run test suite:
   ```bash
   docker-compose -f docker-compose.yml -f docker-compose.dev.yml exec api bin/phpunit
   ```
