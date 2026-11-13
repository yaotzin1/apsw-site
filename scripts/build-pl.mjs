/**
 * Generates pl/index.html: the Polish page, with every translated string already in the HTML so a
 * crawler that does not run JavaScript indexes Polish text at https://apswlabs.com/pl/.
 *
 *   node scripts/build-pl.mjs          write pl/index.html
 *   node scripts/build-pl.mjs --check  exit 1 when pl/index.html differs from what index.html and
 *                                      js/i18n.js would produce now (run by check-site.mjs)
 *
 * Pure Node, no dependencies. index.html stays the English source; js/i18n.js stays the one place
 * the Polish strings live. The generated file is committed and served as it is, so the site still
 * has no build step on the server. Run `npm run build:pl` after editing either source file.
 *
 * What it does to a copy of index.html:
 *   - applies every data-i18n, data-i18n-html, -placeholder, -title, -alt and -aria key from pl,
 *     with the same textContent / innerHTML / attribute semantics as setLanguage() in js/i18n.js
 *   - sets <html lang="pl">, the Polish title and description, og and twitter tags, canonical
 *     https://apswlabs.com/pl/, og:locale and its alternate
 *   - makes relative src, href and action values root-relative, because the page now lives one
 *     level down (assets/x.svg becomes /assets/x.svg; #anchors stay as they are)
 *   - marks the PL switcher button active
 */

import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = path.join(ROOT_DIR, 'index.html');
const TARGET = path.join(ROOT_DIR, 'pl', 'index.html');
const ORIGIN = 'https://apswlabs.com';

function loadDictionary() {
    const context = {
        window: {}, localStorage: { getItem: () => null, setItem() {} },
        navigator: { language: 'en' }, location: { search: '', pathname: '/' },
        document: { addEventListener() {}, querySelectorAll: () => [], documentElement: {} },
    };
    vm.createContext(context);
    vm.runInContext(`${fs.readFileSync(path.join(ROOT_DIR, 'js', 'i18n.js'), 'utf8')}\n;globalThis.__T = APSW_TRANSLATIONS;`, context);
    return context.__T.pl;
}

const lookup = (dict, key) => key.split('.').reduce((node, part) => (node == null ? undefined : node[part]), dict);
const escText = (value) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const escAttr = (value) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

const OPEN_TAG = /^<([a-zA-Z][\w-]*)((?:"[^"]*"|'[^']*'|[^'">])*)>/;
const ATTRIBUTE_KEYS = { 'data-i18n-placeholder': 'placeholder', 'data-i18n-title': 'title', 'data-i18n-alt': 'alt', 'data-i18n-aria': 'aria-label' };

function getAttr(attrs, name) {
    const match = attrs.match(new RegExp(`(?:^|\\s)${name}="([^"]*)"`));
    return match ? match[1] : null;
}

function setAttr(attrs, name, value) {
    const pattern = new RegExp(`(^|\\s)${name}="[^"]*"`);
    const attribute = `${name}="${escAttr(value)}"`;
    return pattern.test(attrs) ? attrs.replace(pattern, (_, lead) => `${lead}${attribute}`) : `${attrs} ${attribute}`;
}

/** Index just after the closing tag that matches an element opened at `from` (already past its open tag). */
function closeOf(html, name, from) {
    const re = new RegExp(`<(/?)${name}\\b[^>]*>`, 'gi');
    re.lastIndex = from;
    let depth = 1;
    for (let match = re.exec(html); match; match = re.exec(html)) {
        depth += match[1] ? -1 : 1;
        if (depth === 0) return { innerEnd: match.index, end: re.lastIndex };
    }
    throw new Error(`no closing </${name}> after offset ${from}`);
}

function translate(html, dict) {
    let out = '';
    let i = 0;
    while (i < html.length) {
        const lt = html.indexOf('<', i);
        if (lt === -1) { out += html.slice(i); break; }
        out += html.slice(i, lt);
        i = lt;
        if (html.startsWith('<!--', i)) {
            const end = html.indexOf('-->', i) + 3;
            out += html.slice(i, end);
            i = end;
            continue;
        }
        const open = html.slice(i).match(OPEN_TAG);
        if (!open) { out += '<'; i += 1; continue; }
        const [whole, name, rawAttrs] = open;
        const lower = name.toLowerCase();
        if (lower === 'script' || lower === 'style') {
            const { end } = closeOf(html, name, i + whole.length);
            out += html.slice(i, end);
            i = end;
            continue;
        }

        let attrs = rawAttrs;
        for (const [dataAttr, target] of Object.entries(ATTRIBUTE_KEYS)) {
            const key = getAttr(attrs, dataAttr);
            const value = key ? lookup(dict, key) : undefined;
            if (typeof value === 'string') attrs = setAttr(attrs, target, value);
        }

        const textKey = getAttr(attrs, 'data-i18n');
        const htmlKey = getAttr(attrs, 'data-i18n-html');
        const textValue = textKey ? lookup(dict, textKey) : undefined;
        const htmlValue = htmlKey ? lookup(dict, htmlKey) : undefined;
        const replacement = typeof htmlValue === 'string' ? htmlValue : typeof textValue === 'string' ? escText(textValue) : null;

        const openTag = `<${name}${attrs}>`;
        if (replacement === null) {
            out += openTag;
            i += whole.length;
        } else {
            const { innerEnd, end } = closeOf(html, name, i + whole.length);
            out += `${openTag}${replacement}${html.slice(innerEnd, end)}`;
            i = end;
        }
    }
    return out;
}

function replaceOnce(html, from, to) {
    const count = html.split(from).length - 1;
    if (count !== 1) throw new Error(`expected exactly one occurrence of ${JSON.stringify(from)} in index.html, found ${count}`);
    return html.replace(from, () => to);
}

function build() {
    const dict = loadDictionary();
    let html = fs.readFileSync(SOURCE, 'utf8');
    const { page_title: title, page_description: description } = dict.meta;
    const url = `${ORIGIN}/pl/`;

    html = replaceOnce(html, '<html lang="en"', '<html lang="pl"');
    html = translate(html, dict);

    html = html.replace(/<title>[^<]*<\/title>/, () => `<title>${escText(title)}</title>`);
    html = html.replace(/(<meta name="description" content=")[^"]*(")/, (_, a, b) => `${a}${escAttr(description)}${b}`);
    html = html.replace(/(<meta property="og:title" content=")[^"]*(")/, (_, a, b) => `${a}${escAttr(title)}${b}`);
    html = html.replace(/(<meta property="og:description" content=")[^"]*(")/, (_, a, b) => `${a}${escAttr(description)}${b}`);
    html = html.replace(/(<meta name="twitter:title" content=")[^"]*(")/, (_, a, b) => `${a}${escAttr(title)}${b}`);
    html = html.replace(/(<meta name="twitter:description" content=")[^"]*(")/, (_, a, b) => `${a}${escAttr(description)}${b}`);
    html = replaceOnce(html, `<link rel="canonical" href="${ORIGIN}/">`, `<link rel="canonical" href="${url}">`);
    html = replaceOnce(html, `<meta property="og:url" content="${ORIGIN}/">`, `<meta property="og:url" content="${url}">`);
    html = replaceOnce(html, '<meta property="og:locale" content="en_US">', '<meta property="og:locale" content="pl_PL">');
    html = replaceOnce(html, '<meta property="og:locale:alternate" content="pl_PL">', '<meta property="og:locale:alternate" content="en_US">');

    html = html.replace(/(\s(?:src|href|action)=")([^"]*)(")/g, (match, lead, value, tail) => (
        /^(#|\/|[a-z][a-z0-9+.-]*:)/i.test(value) || value === '' ? match : `${lead}/${value}${tail}`
    ));

    html = replaceOnce(html, 'class="lang-btn active" data-lang="en" aria-pressed="true"', 'class="lang-btn" data-lang="en" aria-pressed="false"');
    html = replaceOnce(html, 'class="lang-btn" data-lang="pl" aria-pressed="false"', 'class="lang-btn active" data-lang="pl" aria-pressed="true"');

    return html;
}

const output = build();
if (process.argv.includes('--check')) {
    const current = fs.existsSync(TARGET) ? fs.readFileSync(TARGET, 'utf8') : null;
    if (current !== output) {
        console.error('pl/index.html is missing or out of date. Run: npm run build:pl');
        process.exit(1);
    }
    console.log('pl/index.html is up to date');
} else {
    fs.mkdirSync(path.dirname(TARGET), { recursive: true });
    fs.writeFileSync(TARGET, output);
    console.log(`wrote ${path.relative(ROOT_DIR, TARGET)} (${output.length} bytes)`);
}
