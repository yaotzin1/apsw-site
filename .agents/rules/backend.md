# Backend Guidelines (Symfony 8.1 & PHP 8.5.8+)

## 1. Symfony & PHP Requirements
* Minimum PHP version: **8.5.8+**. Core Symfony packages: **8.1.***.
* Use strict PHP features: `declare(strict_types=1);`, enums, typed properties, constructor promotion, readonly classes.
* **WARNING:** Do NOT mark Doctrine entity primary keys (`$id`) or proxy-hydrated properties (`$createdAt`) as `readonly`, as this crashes PHP Reflection property accessors in Doctrine.

## 2. Multi-Tenancy & FrankenPHP Worker State
* **Doctrine SQLFilter:** Enforce tenant isolation globally via `TenantFilter`. Never write manual `WHERE agency_id = X` in repositories.
* **FrankenPHP Memory State:** Under worker mode, state stays in memory across requests. `kernel.reset` clears the `EntityManager` between requests, but Doctrine SQLFilters preserve active state!
* **Webhook Isolation:** Webhooks MUST explicitly call `$filters->disable('tenant_filter')` in subscribers to purge leaked state from previous requests. An early return is NOT enough.

## 3. Clean Three-Layer Architecture & Mandatory Avoidance of `EntityManagerInterface` in Controllers
* **Strict Three-Layer Architecture:**
  1. **Presentation Layer (`api/src/Controller/`):** HTTP Request mapping, parameter validation/deserialization, delegating to Domain Services, and returning standard JSON envelope responses (`{"status": string, "message": string, "data": mixed}`).
  2. **Application / Domain Layer (`api/src/Service/`):** Business logic, transaction orchestration, state transitions, AI integrations, email dispatches, and EntityManager operations.
  3. **Infrastructure / Persistence Layer (`api/src/Repository/`, `api/src/Entity/`):** Doctrine ORM Entities, Repositories, `TenantFilter` SQLFilter multi-tenancy enforcement.
* **STRICT PROHIBITION OF `EntityManagerInterface` IN CONTROLLERS:**
  - Controllers MUST NEVER inject `EntityManagerInterface` (`$em`) or execute ORM operations (`$em->flush()`, `$em->persist()`, `$em->remove()`, `$em->clear()`).
  - Persistence operations, entity mutations, `$em` transaction control, and raw QueryBuilder logic belong strictly inside Domain Services (`api/src/Service/`) or Repositories (`api/src/Repository/`).
* **Event-Based Architecture:** Dispatch Symfony Messenger messages or domain events for side-effects (scrapers, dispatches, notifications, indexing) rather than writing procedural loops in controllers.
* **Global Exception Handling:** Exception handling MUST be handled centrally via `ExceptionSubscriber` instead of writing try-catches inside controllers.

## 4. Database Concurrency & Queues
* Use `SELECT ... FOR UPDATE SKIP LOCKED` inside transactions for fetching and locking pending items (e.g., `GoogleReviewRepository::findNextPendingForUpdate()`).
* Background tasks MUST be processed asynchronously via Symfony Messenger workers running in the dedicated `idumela_messenger` Docker container.

## 5. REST API Payload Standard
* All REST endpoints MUST return a standard envelope schema:
  `{"status": string, "message": string, "data": mixed}`
* Frontend `apiClient.ts` automatically unwraps this envelope.

## 6. Real-Time Push (Mercure - NO Client Polling)
* Background workers push JSON updates directly via Symfony's `HubInterface`.
* Schema for real-time notifications: `{"type": string, "title": string, "message": string, "timestamp": string, "metadata": array}`.
* Supported event types: `SYNC_COMPLETE`, `PROSPECT_UPDATED`, `REVIEW_UPDATED`, `CRISIS_ALERT`.
* Topic URL: dynamically generated using `($_ENV['DEFAULT_URI'] ?? 'https://idumela.com')`.
* Client-side `setInterval` polling is STRICTLY FORBIDDEN. Use `EventSource` Mercure push streams.
