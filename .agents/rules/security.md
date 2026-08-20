# Security & ACL Guidelines

## 1. JWT Authentication
* Lexik JWT tokens must be stored strictly in **HTTP-only cookies** for security.

## 2. ACL Capabilities & System Roles
* Capabilities must use standard uppercase strings: `CAN_PUBLISH_RESPONSE`, `CAN_VIEW_COMPETITOR_METRICS`, `CAN_MANAGE_BILLING`, `CAN_MANAGE_BRANDS`.
* Dynamic system roles ending in `_DYNAMIC` (e.g. `ROLE_OWNER_DYNAMIC`, `ROLE_AGENCY_ADMIN_DYNAMIC`) are core system constructs; administrative deletion is strictly prohibited in both frontend (`AclDashboard.tsx`) and backend (`AdminAclController`).
* Dynamic roles are merged inside `User::getRoles()` and injected into JWT payloads by `JWTCreatedListener`.

## 3. Onboarding Security
* Single-use onboarding tokens (`onboardingToken`) secure viral agency onboarding (`/api/register/agency/{token}`).
* Unauthenticated endpoints validate token integrity, set trial expiration (14 days), assign `ROLE_AGENCY_ADMIN_DYNAMIC`, and invalidate the token immediately upon registration.
