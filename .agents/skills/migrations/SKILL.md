---
name: migrations
description: Best practices and defensive strategies for writing, reviewing, and applying Doctrine database migrations in dev and production environments.
---

# Doctrine Migrations & Database Versioning

As an AI agent working on the Idumela project, you must adhere to the following rules and best practices when handling database schema changes and Doctrine migrations.

## 1. Production is Additive & Defensive (Never Drop)
- **Zero Data Loss:** In production or staging environments, **YOU MUST NOT** drop the database or run destructive commands. Any schema changes must be additive (e.g., adding columns) or handled through careful, multi-step migrations (e.g., adding a new column, backfilling data, dropping the old column in a later release).
- **Defensive DDL (IF EXISTS):** When editing or creating migrations that drop objects, use defensive SQL statements to prevent failures on fresh installs or slightly out-of-sync environments.
  - *Instead of:* `$this->addSql('DROP TABLE embeddings');`
  - *Use:* `$this->addSql('DROP TABLE IF EXISTS embeddings');`
- **Nullable vs NOT NULL:** If adding a `NOT NULL` column to an existing table, provide a `DEFAULT` value or split the migration into two steps (add nullable, backfill data, make NOT NULL) so that the deployment does not crash on existing rows.

## 2. Local Dev Database Reset Protocol
- **Aggressive Resolution (Local Only):** You are authorized to fix broken migration chains locally by completely dropping the database (`php bin/console doctrine:schema:drop --full-database --force`), running fresh migrations (`doctrine:migrations:migrate -n`), and re-seeding data (`idumela:setup-admin`).
- **Do NOT** execute the above drop commands outside of the `dev` environment.

## 3. Migration Generation & Review
- **Generating:** When making entity changes, generate a new migration using `docker exec idumela_api php bin/console make:migration`.
- **Reviewing:** NEVER blindly commit a generated migration. Always review the `up()` and `down()` methods.
  - Ensure it doesn't accidentally drop essential tables or columns due to renaming.
  - Doctrine generates deterministic hashed foreign keys (e.g., `FK_794381C664D218E`). These are safe and identical across all environments, so you can safely drop or alter them by name.

## 4. Multi-Tenant Considerations
- The architecture uses Doctrine's `TenantFilter` via subqueries over the `brand_agency` table.
- When writing raw SQL or migrations that manually insert or update tenant-scoped data, be aware that you are bypassing the ORM's SQL filters. Ensure that multi-tenant isolation is maintained at the database level if writing complex custom queries.

## 5. PostgreSQL specifics
- The project uses PostgreSQL 16/18.
- For `vector` types (via `symfony/ai-store`), ensure the `vector` type mapping is correctly maintained in `doctrine.yaml` so DBAL doesn't throw unknown type errors during schema diffs.
