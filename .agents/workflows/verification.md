# Workflow: Mandatory Code Quality & Verification Suite

## Purpose
Execute mandatory automated verification checks before submitting code or completing tasks (Rule 10 & Rule 14).

## Step 1: Frontend Type-Checking
1. Navigate to `/web`:
   ```bash
   cd web
   npm run type-check
   ```
2. Confirm 0 TypeScript compilation errors (`tsc --noEmit`).

## Step 2: Frontend Linting
1. Execute ESLint in `/web`:
   ```bash
   cd web
   npm run lint
   ```
2. Confirm 0 errors. If fixable warnings exist, run `npm run lint -- --fix`.

## Step 3: Backend PHPUnit Tests
1. Execute the full PHPUnit test suite:
   ```bash
   cd api
   bin/phpunit
   ```
   *(Or inside docker dev container: `docker-compose -f docker-compose.yml -f docker-compose.dev.yml exec api bin/phpunit`)*
2. Confirm 100% green pass rate across unit and controller test suites.

## Step 4: Self-Review Reflection Checklist
Review the 7 reflection questions in `.agents/rules/review.md`:
- [ ] Architectural alignment (CENTS & Add-ons)
- [ ] Thin controllers & service extraction
- [ ] Multi-tenancy isolation & FrankenPHP memory safety
- [ ] End-user technical obfuscation
- [ ] Zero-downtime additive DB migrations
- [ ] Real-time Mercure SSE push (No polling)
- [ ] Empirical green test output
