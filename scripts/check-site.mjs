/**
 * Checks the site itself: the things a visitor, a crawler or the contact form would trip over, and
 * that nothing else in this repository looks at because there is no build step and no test suite.
 *
 *   node scripts/check-site.mjs
 *
 * Pure Node, no dependencies, so it runs in the pre-commit hook and in CI before anything installs.
 * Each check prints one line; the script exits 1 if any failed. What it checks, and the rule in
 * workflow.ai.yml each one enforces:
 *
 *   agent.json             parses as JSON                                         machine-readable files
 *   JSON-LD                every application/ld+json block in index.html parses   machine-readable files
 *   sitemap.xml            well-formed, <urlset>, absolute https://apsw.pl locs  machine-readable files
 *   llms.txt, llms-full    start with a Markdown H1                               machine-readable files
 *   i18n keys              every data-i18n* key in index.html and every
 *                          APSW_I18N.t('key') in js/ resolves to a string in
 *                          both en and pl; en and pl hold the same leaf keys     every string in both languages
 *   i18n markup            data-i18n-html keys end in _html; a plain data-i18n
 *                          key holds no markup                                    *_html keys
 *   anchors                every href="#id" has a matching id; ids are unique    in-page links
 *   dependencies           package.json declares none; index.html loads no
 *                          script from another origin                             no runtime dependencies
 *   banned APIs            no eval, new Function, document.write, string timers   no HTML/script sinks
 *   contact defences       contact.php keeps POST-only, both honeypots, the time
 *                          trap, the rate limit; the form keeps the fields        contact.php defences
 *   php -l contact.php     when php is on PATH (CI installs it)                   contact.php
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SITE_ORIGIN = 'https://apsw.pl/';
const I18N_ATTRIBUTES = ['data-i18n', 'data-i18n-html', 'data-i18n-placeholder', 'data-i18n-title', 'data-i18n-aria', 'data-i18n-alt'];
const LANGUAGES = ['en', 'pl'];

const read = (relative) => fs.readFileSync(path.join(ROOT_DIR, relative), 'utf8');
const exists = (relative) => fs.existsSync(path.join(ROOT_DIR, relative));
const lineOf = (text, index) => text.slice(0, index).split('\n').length;
const list = (items, max = 8) => items.slice(0, max).join(', ') + (items.length > max ? `, ... (${items.length} in total)` : '');

const results = [];
function check(name, run) {
    try {
        const outcome = run();
        const problems = outcome?.problems ?? [];
        results.push({ name, ok: problems.length === 0, problems, note: outcome?.note, skipped: outcome?.skipped });
    } catch (error) {
        results.push({ name, ok: false, problems: [error.message] });
    }
}

// --- Machine-readable files --------------------------------------------------------------------

check('agent.json parses as JSON', () => {
    JSON.parse(read('agent.json'));
    return { problems: [] };
});

check('JSON-LD blocks in index.html parse as JSON', () => {
    const html = read('index.html');
    const blocks = [...html.matchAll(/<script\b[^>]*type\s*=\s*["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
    if (blocks.length === 0) return { problems: ['no <script type="application/ld+json"> block found'] };
    const problems = [];
    for (const block of blocks) {
        try {
            const data = JSON.parse(block[1]);
            if (!data['@context']) problems.push(`block at line ${lineOf(html, block.index)} has no @context`);
        } catch (error) {
            problems.push(`block at line ${lineOf(html, block.index)}: ${error.message}`);
        }
    }
    return { problems, note: `${blocks.length} block(s)` };
});

/** A small XML well-formedness check: one root, balanced and properly nested tags, no stray `<` or `&`. */
export function xmlProblems(xml) {
    const problems = [];
    const body = xml.replace(/^﻿/, '');
    if (!/^<\?xml\s[^?]*\?>/.test(body)) problems.push('missing <?xml ...?> declaration at the start');
    const withoutProlog = body.replace(/^<\?xml[^?]*\?>/, '').replace(/<!--[\s\S]*?-->/g, '');
    const stack = [];
    let roots = 0;
    const tag = /<(\/?)([A-Za-z_][\w:.-]*)((?:\s+[\w:.-]+\s*=\s*(?:"[^"]*"|'[^']*'))*)\s*(\/?)>/g;
    let last = 0;
    for (const match of withoutProlog.matchAll(tag)) {
        const text = withoutProlog.slice(last, match.index);
        if (/[<>]/.test(text)) problems.push(`malformed markup near: ${text.trim().slice(0, 40)}`);
        if (/&(?!(?:amp|lt|gt|quot|apos|#\d+|#x[0-9a-fA-F]+);)/.test(text)) problems.push(`unescaped & near: ${text.trim().slice(0, 40)}`);
        if (stack.length === 0 && text.trim() !== '') problems.push(`text outside the root element: ${text.trim().slice(0, 40)}`);
        last = match.index + match[0].length;

        const [, closing, name, , selfClosing] = match;
        if (closing) {
            const open = stack.pop();
            if (open !== name) problems.push(`</${name}> closes <${open ?? 'nothing'}>`);
        } else if (!selfClosing) {
            if (stack.length === 0) roots += 1;
            stack.push(name);
        } else if (stack.length === 0) {
            roots += 1;
        }
    }
    const tail = withoutProlog.slice(last);
    if (tail.trim() !== '') problems.push(`content after the root element: ${tail.trim().slice(0, 40)}`);
    if (stack.length > 0) problems.push(`unclosed: <${stack.join('>, <')}>`);
    if (roots !== 1) problems.push(`expected one root element, found ${roots}`);
    return problems;
}

check('sitemap.xml is well-formed', () => {
    const xml = read('sitemap.xml');
    const problems = xmlProblems(xml);
    if (!/<urlset\s[^>]*xmlns="http:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"/.test(xml)) problems.push('root is not <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    const locs = [...xml.matchAll(/<loc>([^<]*)<\/loc>/g)].map((m) => m[1].trim());
    if (locs.length === 0) problems.push('no <loc> entries');
    for (const loc of locs) if (!loc.startsWith(SITE_ORIGIN)) problems.push(`<loc> is not an absolute ${SITE_ORIGIN} URL: ${loc}`);
    for (const date of xml.matchAll(/<lastmod>([^<]*)<\/lastmod>/g)) {
        if (!/^\d{4}-\d{2}-\d{2}(T[\d:.+-]+Z?)?$/.test(date[1].trim())) problems.push(`<lastmod> is not a W3C date: ${date[1]}`);
    }
    return { problems, note: `${locs.length} URL(s)` };
});

check('llms.txt and llms-full.txt start with a Markdown H1', () => {
    const problems = [];
    for (const file of ['llms.txt', 'llms-full.txt']) {
        if (!exists(file)) problems.push(`${file} is missing`);
        else if (!/^# \S/.test(read(file).replace(/^﻿/, ''))) problems.push(`${file} does not start with "# "`);
    }
    return { problems };
});

// --- Translations --------------------------------------------------------------------------------

/**
 * Runs js/i18n.js in an isolated context with just enough of a browser for its top level to run,
 * and returns APSW_TRANSLATIONS. The file declares it with `const`, which a vm context does not
 * expose as a global, so a line is appended that hands it out.
 */
export function loadTranslations(source) {
    const noop = () => {};
    const element = { setAttribute: noop, getAttribute: () => null, classList: { add: noop, remove: noop } };
    const document = {
        documentElement: element,
        addEventListener: noop,
        querySelector: () => null,
        querySelectorAll: () => [],
        getElementById: () => null,
        title: '',
    };
    const storage = { getItem: () => null, setItem: noop, removeItem: noop };
    const window = {
        document,
        localStorage: storage,
        location: { href: SITE_ORIGIN, search: '' },
        history: { replaceState: noop },
        addEventListener: noop,
        dispatchEvent: noop,
        navigator: { language: 'en' },
    };
    const sandbox = { window, document, localStorage: storage, navigator: window.navigator, URL, URLSearchParams, CustomEvent: class {}, console: { log: noop, warn: noop, error: noop } };
    sandbox.globalThis = sandbox;
    const context = vm.createContext(sandbox);
    vm.runInContext(`${source}\n;globalThis.__APSW_TRANSLATIONS__ = APSW_TRANSLATIONS;`, context, { filename: 'js/i18n.js', timeout: 2000 });
    const translations = sandbox.__APSW_TRANSLATIONS__;
    if (!translations || typeof translations !== 'object') throw new Error('js/i18n.js did not define APSW_TRANSLATIONS');
    return translations;
}

/** Leaf keys as dotted paths, the way data-i18n names them. */
export function leafKeys(object, prefix = '') {
    const keys = [];
    for (const [key, value] of Object.entries(object)) {
        const dotted = prefix ? `${prefix}.${key}` : key;
        if (value !== null && typeof value === 'object' && !Array.isArray(value)) keys.push(...leafKeys(value, dotted));
        else keys.push(dotted);
    }
    return keys;
}

export function lookup(dictionary, dotted) {
    return dotted.split('.').reduce((node, part) => (node !== null && typeof node === 'object' ? node[part] : undefined), dictionary);
}

/** Every `data-i18n*="key"` in the page, with the attribute it came from and its line. */
export function usedKeys(html) {
    const used = [];
    const pattern = new RegExp(`\\s(${I18N_ATTRIBUTES.map((a) => a.replace(/-/g, '\\-')).join('|')})\\s*=\\s*["']([^"']*)["']`, 'g');
    for (const match of html.matchAll(pattern)) used.push({ attribute: match[1], key: match[2].trim(), line: lineOf(html, match.index) });
    return used;
}

let translations = null;
let i18nLoadError = null;
try {
    translations = loadTranslations(read('js/i18n.js'));
} catch (error) {
    i18nLoadError = error.message;
}

check('js/i18n.js loads and defines en and pl', () => {
    if (i18nLoadError) return { problems: [i18nLoadError] };
    const missing = LANGUAGES.filter((lang) => !translations[lang]);
    return { problems: missing.map((lang) => `APSW_TRANSLATIONS has no "${lang}" dictionary`) };
});

check('every i18n key used in index.html and js/ exists in en and pl', () => {
    if (!translations) return { problems: ['skipped: js/i18n.js did not load'] };
    const html = read('index.html');
    const used = usedKeys(html);
    const problems = [];
    for (const { attribute, key, line } of used) {
        if (key === '') {
            problems.push(`index.html:${line} ${attribute}="" is empty`);
            continue;
        }
        for (const lang of LANGUAGES) {
            const value = lookup(translations[lang] ?? {}, key);
            if (typeof value !== 'string') problems.push(`index.html:${line} ${attribute}="${key}" ${value === undefined ? 'missing' : 'is not a string'} in ${lang}`);
        }
    }

    let calls = 0;
    for (const file of fs.readdirSync(path.join(ROOT_DIR, 'js')).filter((name) => name.endsWith('.js'))) {
        const source = read(`js/${file}`);
        for (const match of source.matchAll(/APSW_I18N\.t\(\s*(['"`])([^'"`]+)\1\s*\)/g)) {
            calls += 1;
            for (const lang of LANGUAGES) {
                if (typeof lookup(translations[lang] ?? {}, match[2]) !== 'string') problems.push(`js/${file}:${lineOf(source, match.index)} t('${match[2]}') missing in ${lang}`);
            }
        }
    }
    return { problems, note: `${used.length} attribute(s), ${calls} t() call(s)` };
});

check('en and pl hold the same keys', () => {
    if (!translations) return { problems: ['skipped: js/i18n.js did not load'] };
    const [first, ...rest] = LANGUAGES;
    const reference = new Set(leafKeys(translations[first] ?? {}));
    const problems = [];
    for (const lang of rest) {
        const keys = new Set(leafKeys(translations[lang] ?? {}));
        const onlyReference = [...reference].filter((key) => !keys.has(key));
        const onlyHere = [...keys].filter((key) => !reference.has(key));
        if (onlyReference.length) problems.push(`in ${first} but not ${lang}: ${list(onlyReference)}`);
        if (onlyHere.length) problems.push(`in ${lang} but not ${first}: ${list(onlyHere)}`);
    }
    return { problems, note: `${reference.size} keys` };
});

check('translated markup uses *_html keys on data-i18n-html', () => {
    if (!translations) return { problems: ['skipped: js/i18n.js did not load'] };
    const problems = [];
    for (const { attribute, key, line } of usedKeys(read('index.html'))) {
        if (attribute === 'data-i18n-html' && !key.endsWith('_html')) problems.push(`index.html:${line} data-i18n-html="${key}" should name a key ending in _html`);
        if (attribute === 'data-i18n' || attribute === 'data-i18n-placeholder' || attribute === 'data-i18n-title' || attribute === 'data-i18n-aria' || attribute === 'data-i18n-alt') {
            for (const lang of LANGUAGES) {
                const value = lookup(translations[lang] ?? {}, key);
                // The switcher writes these with textContent or setAttribute, so a tag would be shown literally.
                if (typeof value === 'string' && /<\/?[a-z][\w-]*[\s>/]/i.test(value)) problems.push(`index.html:${line} ${attribute}="${key}" holds markup in ${lang}; use an *_html key on data-i18n-html`);
            }
        }
    }
    return { problems };
});

// --- Page structure -------------------------------------------------------------------------------

check('every in-page href="#id" has a matching id, and ids are unique', () => {
    const html = read('index.html').replace(/<!--[\s\S]*?-->/g, '');
    const ids = [...html.matchAll(/\sid\s*=\s*["']([^"']+)["']/g)].map((m) => m[1]);
    const seen = new Set();
    const duplicates = new Set();
    for (const id of ids) (seen.has(id) ? duplicates : seen).add(id);
    const problems = [...duplicates].map((id) => `id="${id}" appears more than once`);
    const targets = [...html.matchAll(/\shref\s*=\s*["']#([^"']*)["']/g)];
    for (const match of targets) {
        const id = decodeURIComponent(match[1]);
        if (id === '') continue; // href="#" is a script-handled control, not a jump
        if (!seen.has(id)) problems.push(`index.html:${lineOf(html, match.index)} href="#${id}" has no element with id="${id}"`);
    }
    return { problems, note: `${targets.length} link(s), ${seen.size} id(s)` };
});

// --- No dependencies, no sinks ------------------------------------------------------------------

check('no runtime dependencies and no third-party scripts', () => {
    const problems = [];
    if (exists('package.json')) {
        const manifest = JSON.parse(read('package.json'));
        for (const field of ['dependencies', 'devDependencies', 'peerDependencies', 'optionalDependencies', 'bundledDependencies']) {
            if (manifest[field] && Object.keys(manifest[field]).length > 0) problems.push(`package.json declares ${field}: ${Object.keys(manifest[field]).join(', ')}`);
        }
    }
    const html = read('index.html');
    for (const match of html.matchAll(/<script\b[^>]*\ssrc\s*=\s*["']([^"']+)["']/gi)) {
        if (/^(?:[a-z][\w+.-]*:)?\/\//i.test(match[1])) problems.push(`index.html:${lineOf(html, match.index)} loads a script from another origin: ${match[1]}`);
        else if (!exists(match[1].replace(/^\//, '').split(/[?#]/)[0])) problems.push(`index.html:${lineOf(html, match.index)} loads ${match[1]}, which does not exist`);
    }
    return { problems };
});

const BANNED = [
    { name: 'eval(', regex: /(?<![\w.$])eval\s*\(/ },
    { name: 'new Function', regex: /\bnew\s+Function\s*\(/ },
    { name: 'document.write', regex: /\bdocument\.write(?:ln)?\s*\(/ },
    { name: 'string timer', regex: /\bset(?:Timeout|Interval)\s*\(\s*['"`]/ },
];

check('no eval, new Function, document.write or string timers in js/', () => {
    const problems = [];
    for (const file of fs.readdirSync(path.join(ROOT_DIR, 'js')).filter((name) => name.endsWith('.js'))) {
        const source = read(`js/${file}`);
        source.split('\n').forEach((text, index) => {
            if (/^\s*(?:\/\/|\*)/.test(text)) return;
            for (const { name, regex } of BANNED) if (regex.test(text)) problems.push(`js/${file}:${index + 1} uses ${name}`);
        });
    }
    return { problems };
});

// --- Contact endpoint ---------------------------------------------------------------------------

const CONTACT_DEFENCES = [
    { name: 'POST only', regex: /\$_SERVER\[['"]REQUEST_METHOD['"]\]\s*!==\s*['"]POST['"]/ },
    { name: 'honeypot website_hp', regex: /\$_POST\[['"]website_hp['"]\]/ },
    { name: 'honeypot form_verify_token_dummy', regex: /\$_POST\[['"]form_verify_token_dummy['"]\]/ },
    { name: 'time trap on form_rendered_at', regex: /\$_POST\[['"]form_rendered_at['"]\][\s\S]*?<\s*2\b/ },
    { name: 'per-IP rate limit answering 429', regex: /\$maxSubmissionsPerWindow[\s\S]*?http_response_code\(\s*429\s*\)/ },
    { name: 'message length validation', regex: /strlen\(\$message\)/ },
];
const FORM_FIELDS = ['website_hp', 'form_verify_token_dummy', 'form_rendered_at'];

check('contact.php keeps its defences and the form keeps their fields', () => {
    const php = read('contact.php');
    const problems = CONTACT_DEFENCES.filter(({ regex }) => !regex.test(php)).map(({ name }) => `contact.php lost: ${name}`);
    const html = read('index.html');
    for (const field of FORM_FIELDS) if (!new RegExp(`\\sname\\s*=\\s*["']${field}["']`).test(html)) problems.push(`index.html form lost the ${field} field`);
    if (!/getElementById\(\s*['"]form-rendered-at['"]\s*\)/.test(read('js/app.js'))) problems.push('js/app.js no longer fills form-rendered-at, so the time trap never fires');
    return { problems };
});

check('php -l contact.php', () => {
    try {
        execFileSync('php', ['--version'], { stdio: 'ignore' });
    } catch {
        return { problems: [], skipped: true, note: 'php not on PATH; CI runs it' };
    }
    try {
        execFileSync('php', ['-l', path.join(ROOT_DIR, 'contact.php')], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] });
        return { problems: [] };
    } catch (error) {
        return { problems: [(error.stdout || error.stderr || error.message).trim()] };
    }
});

// --- Report ---------------------------------------------------------------------------------------

const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const RESET = '\x1b[0m';

console.log('check-site: apsw.pl integrity checks');
for (const result of results) {
    const label = result.skipped ? `${YELLOW}  --${RESET}` : result.ok ? `${GREEN}  ok${RESET}` : `${RED}FAIL${RESET}`;
    console.log(`${label}  ${result.name}${result.note ? ` (${result.note})` : ''}`);
    for (const problem of result.problems.slice(0, 40)) console.log(`        - ${problem}`);
    if (result.problems.length > 40) console.log(`        ... and ${result.problems.length - 40} more`);
}
const failed = results.filter((result) => !result.ok);
console.log(failed.length === 0 ? `${GREEN}check-site: all ${results.length} checks passed${RESET}` : `${RED}check-site: ${failed.length} of ${results.length} checks failed${RESET}`);
process.exit(failed.length === 0 ? 0 : 1);
