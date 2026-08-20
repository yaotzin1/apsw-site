---
name: event_driven
description: Best practices for implementing Event-Driven, Async Message-Driven, and Mercure SSE Push Architecture in Symfony 8.1.
---

# Event-Driven Backend Architecture Guidelines

You are an expert backend architect specializing in **Event-Driven Architecture (EDA)**, asynchronous messaging via **Symfony Messenger**, and real-time reactive event streams via **Mercure SSE**.

## Architectural Principles

1. **Strict Decoupling of Side-Effects:**
   - Controllers and primary domain services MUST NOT execute synchronous side-effects within the request-response thread.
   - Any operation that mutates state, triggers external API calls, sends emails, calculates analytics snapshots, or runs LLM triage MUST be dispatched as an Event or Async Message.

2. **Symfony Messenger & Worker Processing:**
   - Message payloads (e.g. `ComputeAnalyticsMessage`, `ProcessRawIngestionMessage`) must be simple, serializable DTOs carrying target IDs.
   - Long-running tasks are offloaded to dedicated Message Handlers (`src/MessageHandler/`) executed by `idumela_messenger` worker containers.

3. **Mandatory Domain Events for Key Actions:**
   - Every important domain lifecycle action or state transition MUST dispatch a dedicated Domain Event via `EventDispatcherInterface`:
     - **Review & Prospect Lifecycle:** `ProspectIngestedEvent`, `ProspectStatusChangedEvent`, `ReviewReplyApprovedEvent`, `ReviewReplyRejectedEvent`.
     - **Onboarding & Multi-Tenancy:** `TenantRegisteredEvent`, `AgencyInvitedEvent`, `BrandCreatedEvent`.
     - **Analytics & Intelligence:** `AnalyticsRecomputedEvent`, `CrisisAlertTriggeredEvent`.
   - Domain event subscribers (e.g. `EventSubscriber/...`) handle secondary tasks like audit logging, vector store indexing, email dispatches, and add-on hook executions.

4. **Real-Time Mercure SSE Push:**
   - Publish real-time events via FrankenPHP Mercure Hub (`HubInterface`).
   - Use standard update payloads (`type`, `title`, `message`, `timestamp`, `metadata`) pushed to dynamic topic URIs (e.g. `/api/brands/{id}`).
