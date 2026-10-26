# Workflow: Mandatory Verification

## Purpose
Run the automated checks before committing or reporting a task complete, then the manual checks no
script can make. The gate list itself lives in `workflow.ai.yml` (`quality_gates`); this file is the
procedure around it.

## Step 1: Run the gate
```bash
npm run verify
```
It runs, in order:
1. `node scripts/validate-skills.mjs` — skill frontmatter, structure and secret / injection scan
2. `node scripts/sync-claude-skills.mjs --check` — `.claude/skills` pointers match `.agents/skills`
3. `node scripts/sync-agent-docs.mjs --check` — `AGENTS.md`, `GEMINI.md` and the cycle file match `workflow.ai.yml`
4. `node scripts/check-workflow.mjs` — what `workflow.ai.yml` claims about the repository is true
5. `node scripts/check-site.mjs` — every `data-i18n*` key exists in `en` and `pl`, the dictionaries
   match, `*_html` keys carry the markup, every `href="#id"` lands, `agent.json` and the JSON-LD parse,
   `sitemap.xml` is well-formed, no third-party scripts or dependencies, no banned JS APIs,
   `contact.php` keeps its defences, and `php -l contact.php` when PHP is installed

Report the actual output. A failing check is read from its own message first; after three failed
attempts at the same check, the approach is wrong, not the check.

## Step 2: Manual checks (no script makes these)
- [ ] Both languages: switch EN → PL → EN; no English left in PL, no literal tags, no lost markup
- [ ] Both themes: light and dark, contrast still readable
- [ ] 375px viewport: no horizontal scroll, nav usable
- [ ] Keyboard: Tab through the changed section, focus is visible
- [ ] Contact form (when touched): serve with `php -S 127.0.0.1:8088`, wait more than two seconds, submit, read the JSON response
- [ ] New copy: every number, client and claim is one the owner can source

## Step 3: Self-review
Answer the questions in `.agents/rules/review.md` that apply to the change and put the answers in
the pull request body.
