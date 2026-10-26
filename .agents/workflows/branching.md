# Workflow: Feature Branching & Mandatory Pull Request (PR) SOP

## Purpose
Maintain code stability, auditability, and zero-downtime releases by enforcing **MANDATORY GitHub Pull Requests (PR)** for all code changes. Direct commits or local merging into `main` are strictly prohibited.

---

## Core Rules
1. **`main` is Protected Trunk:** The `main` branch MUST remain stable, passing, and production-ready at all times.
2. **MANDATORY Pull Request (PR MUST):** EVERY feature, bug fix, refactoring, or workflow update MUST be submitted via a GitHub Pull Request. Direct local merges into `main` are STRICTLY FORBIDDEN.
3. **Short-Lived Topic Branches:** Create focused topic branches off `main` (`feat/*`, `fix/*`, `refactor/*`, `chore/*`). Merge PRs promptly to prevent branch drift.
4. **Automated CI Gate (STRICT MUST HAVE):** Pull Requests trigger GitHub Actions CI. A PR MUST NOT be merged under any circumstances until ALL GitHub Actions CI checks (`Verify site`, `Track declared` in `.github/workflows/ci.yml`) have completed with a 100% green (`pass`) status. Merging while checks are `pending` or `failing` is STRICTLY PROHIBITED.

---

## Standard Workflow Steps

### Step 1: Sync `main` & Create Topic Branch
Always start from the latest commit on `main`:
```bash
git checkout main
git pull origin main
git checkout -b feat/short-descriptive-name
```

#### Branch Naming Standard:
* `feat/<feature-description>` – New section, copy or behaviour on the site
* `fix/<bug-description>` – Bug fixes and patch resolution
* `refactor/<scope>` – Internal code refactoring or structural cleanup
* `chore/<task-name>` – Maintenance, configuration, or dependency updates

---

### Step 2: Implement & Run Local Verification
1. Develop your feature or bug fix on the topic branch.
2. Run mandatory local verification steps (`.agents/workflows/verification.md`):
   ```bash
   npm run verify
   ```
3. Every commit message ends with a `Track: content|fix|chore` trailer (and `Workflow-Change: <why>`
   when it touches `workflow.ai.yml`, `scripts/`, `.githooks/`, `.github/workflows/` or `package.json`).
   The commit-msg hook installed by `npm run hooks:install` checks it.

---

### Step 3: Push Topic Branch to GitHub
Push your topic branch to GitHub:
```bash
git push -u origin feat/short-descriptive-name
```

---

### Step 4: Open & Merge GitHub Pull Request (MANDATORY RICH DESCRIPTIONS)
1. Execute `gh pr create` with a **FULL, RICH MULTI-SECTION DESCRIPTION**:
   ```bash
   gh pr create --title "feat(scope): concise title" --body "## Summary of Changes
- Detailed breakdown of implemented features and architectural rationale.

## Impact
- **Page / i18n / contact.php / discovery files:** what changed for a visitor, in which language keys, and which of agent.json, llms*.txt, sitemap.xml and the JSON-LD followed.

## Verification & Quality Assurance
- [x] npm run verify (all checks green)
- [x] Manual checks from .agents/workflows/verification.md (both languages, both themes, 375px, keyboard)
- [x] Self-review checklist verified against .agents/rules/review.md"
   ```
2. Verify that GitHub Actions CI pipeline passes all checks on the PR.
3. Review the code diff on GitHub and merge the PR (or run `gh pr merge --auto --delete-branch`).
4. Switch back to `main` locally, pull the updated trunk, and delete the local topic branch:
   ```bash
   git checkout main
   git pull origin main
   git branch -d feat/short-descriptive-name
   ```
