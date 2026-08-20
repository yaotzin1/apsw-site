# Workflow: Database Migration Standard Operating Procedure

## Purpose
Ensure zero-downtime, non-destructive schema migrations for local development and production environments.

## Step 1: Entity Modification & Schema Diff
1. Update or create the target Doctrine ORM entity under `api/src/Entity/`.
2. Ensure properties do NOT mark primary keys or hydrator fields as `readonly`.
3. Generate the migration file using Symfony console:
   ```bash
   docker-compose -f docker-compose.yml -f docker-compose.dev.yml exec api php bin/console make:migration
   ```

## Step 2: Migration File Safety Review
Open the generated file under `api/migrations/Version*.php` and inspect `up()` and `down()`:
- [ ] **No `DROP TABLE` or `DROP COLUMN` without deprecation:** Ensure existing production columns/tables are not dropped.
- [ ] **No non-default `NOT NULL` on populated tables:** If adding a column to an existing table, specify a `DEFAULT` value or implement the 3-phase Expand/Backfill/Enforce pattern.
- [ ] **Defensive DDL:** Ensure statements use `IF EXISTS` / `IF NOT EXISTS` constructs.
- [ ] **Deterministic Foreign Keys:** Verify foreign key constraints match Doctrine's deterministic hashes (`FK_*`).

## Step 3: Local Dev Test Execution
1. Run the migration locally:
   ```bash
   docker-compose -f docker-compose.yml -f docker-compose.dev.yml exec api php bin/console doctrine:migrations:migrate -n
   ```
2. Verify schema validity:
   ```bash
   docker-compose -f docker-compose.yml -f docker-compose.dev.yml exec api php bin/console doctrine:schema:validate
   ```

## Step 4: Verification & Test Coverage
1. Write or update PHPUnit tests in `api/tests/` to verify entity persistence and query performance.
2. Run the test suite:
   ```bash
   docker-compose -f docker-compose.yml -f docker-compose.dev.yml exec api bin/phpunit
   ```
