# Workflow: Production CI/CD & Mandatory PR Deployment Protocol

## Purpose
Manage feature branching, GitHub Pull Requests (PRs), CI pipeline runs, and Coolify zero-downtime deployment triggers.

---

## Step 1: Create Feature Branch off `main`
Follow `.agents/workflows/branching.md`:
1. Create a short-lived topic branch off updated `main`:
   ```bash
   git checkout main && git pull origin main
   git checkout -b feat/your-feature-name
   ```

---

## Step 2: Pre-Commit Verification
1. Run local verification suite (`.agents/workflows/verification.md`).
2. Verify working tree status:
   ```bash
   git status
   ```

---

## Step 3: Push Topic Branch & Open Mandatory Pull Request
1. Stage and commit changes:
   ```bash
   git add .
   git commit -m "feat(module): descriptive summary of changes"
   ```
2. Push topic branch to remote:
   ```bash
   git push -u origin feat/your-feature-name
   ```
3. **MANDATORY PR CREATION:** Open a Pull Request on GitHub (`https://github.com/yaotzin1/Brandmonitor/pull/new/feat/your-feature-name`) or run `gh pr create`.
4. Direct local merging into `main` is STRICTLY PROHIBITED.

---

## Step 4: Monitor GitHub Actions CI Pipeline & Merge PR
1. GitHub Actions workflow ([`.github/workflows/deploy.yml`](file:///D:/projects/private/Brandmonitor/.github/workflows/deploy.yml)) automatically triggers on PR creation and updates.
2. Pipeline steps:
   - PostgreSQL 18 `pgvector` container startup.
   - JWT keypair generation (`lexik:jwt:generate-keypair --skip-if-exists`).
   - Database migrations execution (`doctrine:migrations:migrate -n --env=test`).
   - Execution of `bin/phpunit`.
   - Frontend `npm ci` & `npm run type-check`.
3. Once CI checks pass green, merge the Pull Request on GitHub (or `gh pr merge`).
4. Pull updated `main` locally:
   ```bash
   git checkout main && git pull origin main && git branch -d feat/your-feature-name
   ```

---

## Step 5: Zero-Downtime Deployment & Worker Reset
1. Upon PR merge to `main`, GitHub Actions triggers a Coolify webhook to deploy updated containers on Hetzner Cloud.
2. Messenger workers restart gracefully via `messenger:stop` signal to flush worker RAM without dropping active jobs.
