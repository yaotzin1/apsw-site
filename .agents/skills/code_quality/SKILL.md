---
name: code_quality
description: Enforce clean code guidelines, thin controllers, 3-layer architecture, service abstractions, and proactive refactoring of fat controllers.
---

# Code Quality & Architecture Guidelines

You are an expert software architect who is passionate about maintaining a clean, maintainable, and highly decoupled codebase.
Your goal is to enforce a strict **Three-Layer Architecture** (Presentation -> Application/Domain -> Infrastructure/Persistence), keep controllers thin, and ensure `EntityManagerInterface` is NEVER injected into controllers.

## Core Architecture Directives

1. **Thin Controllers & Prohibition of `EntityManagerInterface` (CRITICAL):** 
   - **NO `EntityManagerInterface` ($em) injection in controllers.** Controllers MUST NEVER call `$em->flush()`, `$em->persist()`, `$em->remove()`, `$em->clear()`, or build QueryBuilder queries.
   - Controllers act strictly as the Presentation Layer: HTTP request routing, request parameter validation/deserialization, delegating to Domain Services, and formatting JSON envelope responses.
   - **NO complex database queries or QueryBuilder construction inside controllers.**
   - **NO direct business logic implementation or state mutation inside controllers.**
   - All persistence, entity manipulation, and database query logic MUST reside in Domain Services (`api/src/Service/`) or Repositories (`api/src/Repository/`).

2. **Clean Three-Layer Architecture:**
   - **Presentation Layer (`Controller`):** Maps HTTP routes, validates input, calls Domain Services, returns JSON response.
   - **Domain / Application Layer (`Service`):** Business rules, transactions, entity mutations, `$em->flush()`, AI prompt chaining, email dispatches.
   - **Infrastructure / Persistence Layer (`Repository`, `Entity`):** Doctrine ORM schemas, SQLFilter multi-tenancy enforcement (`TenantFilter`), custom SQL/QueryBuilder queries.

3. **Single Responsibility Principle (SRP):**
   - Classes should have only one reason to change.
   - If a controller or service handles multiple domains or complex conditional flows based on user roles, refactor it into dedicated domain services.

4. **Event-Driven & Async Message-Driven Architecture (CRITICAL):**
   - **No Synchronous Side-Effects:** Controllers and domain services MUST NOT execute synchronous side-effects (e.g. background scraping, email dispatches, LLM prompt execution, analytics recalculation, or vector store indexing) within the synchronous HTTP request-response lifecycle.
   - **Domain Events & Symfony Messenger:** Always dispatch domain events (via `EventDispatcherInterface`) or asynchronous message payloads (via `MessageBusInterface`).
   - **Offload to Messenger Workers:** Heavy processing and side-effects belong inside asynchronous message handlers (`App\MessageHandler\...`) processed inside the dedicated `idumela_messenger` worker container.
   - **Real-Time Reactive Push (Mercure):** Notify the frontend of state updates using Mercure SSE (`HubInterface`) updates (`Update` events) rather than relying on client-side polling loops.

5. **FrankenPHP / Worker Mode Safety:**
   - Because objects remain in memory, avoid storing state in services. Services must be stateless.
   - Clear the entity manager (`$em->clear()`) in custom loops or background Messenger workers to avoid memory leaks.

6. **Unified Transactional Email Architecture (CRITICAL):**
   - **No Raw HTML Emails:** Raw `(new Email())->html(...)` is strictly prohibited in controllers, handlers, and services.
   - **Mandatory Master Layout:** All transactional emails MUST use `Symfony\Bridge\Twig\Mime\TemplatedEmail` and point to templates under `api/templates/emails/` extending `emails/base.html.twig`.
   - **Plaintext Fallback Requirement:** Always chain `.text(...)` with a clean plaintext version including the primary action URL.
   - **Sender Standardization:** Default from address MUST be `noreply@idumela.com` (or authorized system aliases `sales@`, `firewall@`, `system@`).

7. **Cross-Platform Path Portability (NO HARDCODED HOST PATHS):**
   - **No Host Machine Absolute Paths:** Never hardcode OS-specific paths (`C:\...`, `D:\...`, `/home/runner/...`) in application code, configs, fixtures, or tests.
   - **Dynamic Resolution:** Use `__DIR__`, `%kernel.project_dir%`, or `path.resolve(__dirname, '...')` with defensive `fs.existsSync()` checks to ensure seamless multi-platform operation across Windows local dev, Docker containers, and Linux CI/CD environments.

