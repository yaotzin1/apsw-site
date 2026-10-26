# Claude Code entry point

**`workflow.ai.yml` outranks this file and every other document in the repository.** It defines the
tracks, the stages, the skill registry, the quality gates and the architectural rules. Where anything
here disagrees with it, the YAML wins, and the disagreeing text is a defect to fix.

The operating rules are in `AGENTS.md`, shared with every other agent. The line below imports it.

@AGENTS.md

**Enforced versus guidance.** Only what the cycle marks as enforced will stop you. The stages and
every rule enforced by "review" depend on you, so say in your report which stages you ran and which
checks you did by hand.

## Claude Code specifics

**Skills.** The entries under `.claude/skills/` are pointers to `.agents/skills/<name>/SKILL.md`.
Read the canonical file. Several skills were written for a Symfony + React project; the scope line in
`.agents/rules/workflow_cycle.md` says which parts apply here. After editing a skill, run `npm run sync`.

**Hooks.** Run `npm run hooks:install` once in a fresh clone so the gates block a commit.

## The traps in this repository

- **The language switcher overwrites content.** `setLanguage()` in `js/i18n.js` sets `textContent`
  for every `data-i18n` element and `innerHTML` for every `data-i18n-html` element on load and on
  every switch. Text you type directly into such an element is replaced; markup inside a
  `data-i18n` element is destroyed. Translated markup goes in a key ending in `_html`, on a
  `data-i18n-html` element, in both `en` and `pl`.

- **The HTML in index.html is the English fallback, not the source.** Visitors with `pl` saved, or
  `?lang=pl`, never see it. Change the key in `js/i18n.js` as well, or the edit is invisible to them
  and reverts for everyone on the first switch.

- **There is no build step.** Do not add a bundler, a framework, an npm dependency or a CDN script.
  `package.json` exists only to run the checks, and `check-site.mjs` fails if it gains dependencies
  or if `index.html` loads a script from another origin.

- **contact.php is the only server code, and its defences are silent.** Honeypot hits, a submit
  under two seconds and spam keywords all return `success: true` without sending anything, on
  purpose. A form that "works" in a test that fills fields instantly may be dropping the message.
  The two hidden fields and `form_rendered_at` in the form must keep their names. Its header comment
  mentions a CSRF nonce; there is none, so do not describe one in copy.

- **innerHTML is only for strings this repository wrote.** `js/app.js` puts the server's
  `result.message` into `innerHTML`; it is our own `contact.php` text today. Anything a visitor or a
  third party controls goes through `textContent`.

- **The checks cannot see a missing translation that has no key.** Read the diff of `index.html`
  for any new visible text without a `data-i18n*` attribute.

## Local environment

```bash
npm run verify                      # all gates; php -l runs when php is on PATH
node scripts/check-site.mjs         # just the site checks
php -S 127.0.0.1:8088               # site plus contact.php at http://127.0.0.1:8088/
docker compose up -d                # Apache + PHP 8.2 at http://localhost:8090/
```

Node 22 or newer. Check both languages, both themes and a 375px viewport in a browser before
reporting a content change complete.
