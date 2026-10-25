# AGENTS.md — apsw-site

The operating rules for every agent working on the APSW website (https://apsw.pl).
`workflow.ai.yml` outranks this file; the cycle section below is generated from it.

## 1. What this repository is

One static, bilingual (EN/PL) marketing page plus one PHP endpoint. No framework, no bundler, no
runtime dependencies: the files committed are the files served.

| Path | Holds |
| :--- | :--- |
| `index.html` | the whole page, its JSON-LD, and every visible string tagged with a `data-i18n*` key |
| `js/i18n.js` | `APSW_TRANSLATIONS` (`en` and `pl`) and the language switcher |
| `js/app.js`, `js/spec-kit-flow.js`, `js/estimator.js` | theme, navigation, contact form, interactive sections |
| `css/` | `design-system.css` (tokens), `components.css`, `responsive.css` |
| `contact.php` | the only server code: POST-only contact handler with honeypots, time trap, rate limit |
| `agent.json`, `llms.txt`, `llms-full.txt`, `sitemap.xml`, `robots.txt` | machine-readable discovery files |
| `Dockerfile`, `docker-compose.yml`, `.htaccess` | Apache + PHP 8.2 hosting |
| `scripts/` | the checks and generators; dependency-free Node |
| `.agents/` | rules, skills and workflows (some inherited from another project, see the cycle file) |

## 2. Commands

```bash
npm run hooks:install   # once per clone: points core.hooksPath at .githooks
npm run verify          # every gate: skills, generated docs, workflow claims, site integrity
npm run sync            # regenerate AGENTS.md cycle block, GEMINI.md, .claude/skills
php -S 127.0.0.1:8088   # serve the site with a working contact.php
```

There is nothing to install. `npm run verify` is the gate, and a change is not done until it passes.

## 3. The rules that are easiest to skip

**Every visible string needs an `en` and a `pl` key.** Add the `data-i18n` attribute in
`index.html` and the key in both dictionaries in `js/i18n.js`. `scripts/check-site.mjs` fails on a
key missing from either language, but it cannot see a literal that has no key at all.

**Markup in a translation needs an `*_html` key on a `data-i18n-html` element.** The switcher sets
`textContent` for `data-i18n`, so a `<strong>` in a plain key shows up as literal text, and an element
whose children are markup loses them on the first language switch.

**Do not invent metrics.** A number, client name, certification or outcome added to the page, the
JSON-LD or the llms files must be one the owner can source. Ask rather than guess.

**Keep the discovery files in step.** When the offer on the page changes, `agent.json`,
`llms.txt`, `llms-full.txt` and the JSON-LD change in the same pull request.

**Every commit declares its track.** A `Track: content|fix|chore` trailer; a commit that touches
`workflow.ai.yml`, `scripts/`, `.githooks/`, `.github/workflows/` or `package.json` also carries
`Workflow-Change: <why>`.

<!-- BEGIN GENERATED: ai-workflow-cycle (scripts/sync-agent-docs.mjs) -->

> Generated from `workflow.ai.yml`. Do not edit by hand: run `npm run sync`.
> Deliverables per track, the stage and skill tables, and every rule with what enforces it are in `.agents/rules/workflow_cycle.md`.

### Precedence

**workflow.ai.yml is the supreme instruction source for every agent working in this repository. Where any other document disagrees with it, this file wins, and the other document is a defect to be fixed rather than a rule to be followed.**

1. workflow.ai.yml - supreme. Tracks, stages, the skill registry, quality gates and architectural rules are defined here and nowhere else.
2. .agents/rules/** , .agents/workflows/** and .agents/skills/** - binding detail where they describe this site. Several were inherited from a Symfony + React project; where they describe api/, web/, Doctrine, Mercure, MUI, PHPUnit or Playwright, they do not apply here (see `inherited_guidance`).
3. AGENTS.md - loaded automatically by AGENTS.md-aware agents. Its cycle section is generated from this file; never hand-edit the generated block.
4. GEMINI.md - generated, carries no rule of its own, and imports AGENTS.md.
5. CLAUDE.md - Claude Code entry point. Imports AGENTS.md and may add tool-specific notes, never overrides.

On conflict: Stop. Correct the subordinate document, run `npm run sync`, then continue. Never settle a conflict by following the subordinate text.

### Enforced or guidance

Every statement in this cycle is **enforced** (a hook, a CI job or a script fails when it is broken)
or **guidance** (nothing fails when you do not). The gates, the required checks, the `Track:` trailer
and every rule with a named script are enforced. The stages and every rule marked "review" are
guidance, and exactly as strong as your honesty about following them.

### Tracks: pick one before starting

Every commit carries a `Track:` trailer naming one of these. When the work turns out bigger than its
track, move up to the larger track and do the stages it adds. Never move down to skip them.

| Track | When | Stages |
| :--- | :--- | :--- |
| `content` | Anything a visitor or a crawler would notice: new or changed copy, a section, markup, styling, script behaviour, or the machine-readable files (agent.json, llms*.txt, sitemap.xml, JSON-LD). | 1. Plan<br>2. Implement<br>3. Verify<br>4. Review and ship |
| `fix` | Restores behaviour or content that is already on the site: a broken anchor, a missing translation, a layout bug, a contact form failure. No new section, no new claim. | 2. Implement<br>3. Verify<br>4. Review and ship |
| `chore` | Agent instructions, scripts, hooks, CI, Docker, README and other files a visitor never receives. | 3. Verify<br>4. Review and ship |

### Blocking gates before a commit

A real git hook: run `npm run hooks:install` once per clone. `npm run verify` runs the same
gates, and CI runs them on every pull request and push to main.

- **Skills Syntax & Security Validation** — `node scripts/validate-skills.mjs`
- **Claude Code Skill Pointer Sync** — `node scripts/sync-claude-skills.mjs --check`
- **Operating Cycle Mirrored Into AGENTS.md** — `node scripts/sync-agent-docs.mjs --check`
- **Workflow Claims Match the Repository** — `node scripts/check-workflow.mjs`
- **Site Integrity (i18n keys, anchors, JSON, sitemap, contact.php)** — `node scripts/check-site.mjs`
- **Commit Declares Its Track** — `node scripts/check-track.mjs`

### Architectural rules

One line each. The reason and what enforces it are in `.agents/rules/workflow_cycle.md`.

- Every visible string exists in both languages.
- Translated markup uses an *_html key on a data-i18n-html element.
- No runtime dependencies and no build step.
- contact.php is the only server code, and it keeps every defence it has: POST only, the two honeypot fields, the two-second time trap on form_rendered_at, the per-IP rate limit, and length validation.
- No HTML sink receives untrusted input.
- Machine-readable files stay valid and agree with the page.
- Every in-page link lands somewhere.
- No invented metrics in new copy.

<!-- END GENERATED: ai-workflow-cycle -->

## 4. Skills and procedures

Canonical skills live in `.agents/skills/<name>/SKILL.md`; Claude Code reads generated pointers in
`.claude/skills/` (underscores become hyphens). Procedures: `.agents/workflows/verification.md` and
`.agents/workflows/branching.md`. After editing anything under `.agents/skills/` or
`workflow.ai.yml`, run `npm run sync`.
