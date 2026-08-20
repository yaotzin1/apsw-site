# Database & Migration Guidelines

## 1. Environment Safety & Production Lock
* **Dev Environment:** Developers and AI agents are authorized to resolve corrupt schemas locally by dropping the database (`php bin/console doctrine:schema:drop --full-database --force`), running fresh migrations (`doctrine:migrations:migrate -n`), and re-seeding data (`idumela:setup-admin`).
* **Production/Staging (PRODUCTION LOCK):** Absolutely NO destructive commands (`schema:drop`, `database:drop`, `TRUNCATE`) are permitted in non-dev environments. All production schema changes MUST be zero-downtime, non-destructive, and additive.

## 2. Safe Production Migration Patterns for Populated Tables

### A. Adding `NOT NULL` Columns to Existing Tables
Do not add a `NOT NULL` column without a default value or backfill step—it will crash on existing rows.
* **Option 1 (Default value in single step):**
  ```sql
  ALTER TABLE brand ADD status VARCHAR(50) DEFAULT 'active' NOT NULL;
  ```
* **Option 2 (3-Phase Expand/Backfill/Enforce):**
  1. *Add Nullable:* `ALTER TABLE brand ADD status VARCHAR(50) DEFAULT NULL;`
  2. *Backfill:* `UPDATE brand SET status = 'active' WHERE status IS NULL;`
  3. *Enforce:* `ALTER TABLE brand ALTER COLUMN status SET NOT NULL;`

### B. Column Renaming & Structuring (Expand / Contract Pattern)
1. **Expand:** Add the new column alongside the existing column. Update backend code to write to both and read from the new column (with fallback to old).
2. **Backfill:** Copy historical data from old to new column using raw SQL.
3. **Contract:** Remove references to the old column in code, then issue a migration dropping the old column in a future release.

### C. Large Table Indexing (PostgreSQL `CONCURRENTLY`)
* For large production tables, avoid locking write operations. Use `CREATE INDEX CONCURRENTLY` in PostgreSQL by disabling automatic transaction commit in the Doctrine migration:
  ```php
  public function up(Schema $schema): void
  {
      $this->disableAutoCommit();
      $this->addSql('CREATE INDEX CONCURRENTLY idx_brand_place_id ON brand (place_id)');
  }
  ```

### D. Defensive DDL
Always use defensive SQL checks to prevent migration crashes on slightly out-of-sync environments:
* `DROP TABLE IF EXISTS ...`
* `ALTER TABLE ... ADD COLUMN IF NOT EXISTS ...`
* `DROP INDEX IF EXISTS ...`

### E. Deterministic Foreign Key Hashes
Doctrine generates deterministic foreign key names (`FK_794381C664D218E`) by hashing table and column names. These hashes are identical across all environments (`dev`, `staging`, `prod`), making `DROP FOREIGN KEY FK_...` safe to execute in production migrations.

## 3. Time-Series Analytics & Aggregation
* Historical metrics are stored in `BrandAnalyticsSnapshot` using metric keys (`rating_average`, `reviews_count`, `response_rate`, `rating_distribution`).
* `calculated_at` timestamps MUST always be truncated to midnight (`00:00:00`).
* Ingestion, approval, or rejection triggers async `ComputeAnalyticsMessage` handlers.

## 4. Vector Store Abstraction (`pgvector`)
* Semantic/vector search uses PostgreSQL `pgvector` via `symfony/ai-store`.
* All AI/Vector store operations MUST pass through the domain abstraction `App\Ai\VectorStoreInterface` (implemented by `SymfonyAiStoreAdapter`).
* Never inject `StoreInterface` directly into core services.
* In `doctrine.yaml`, map `vector` under `mapping_types` (`vector: string`) to prevent DBAL command errors during schema diffs.
