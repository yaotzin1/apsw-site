/**
 * Holds a commit to the track it declares (enforced: the commit-msg hook and the CI job "Track declared").
 *
 * The tracks in workflow.ai.yml are guidance; this is the part of them a script can check:
 *
 *   Track: content | fix | chore     required on every non-merge commit
 *   Workflow-Change: <why>           required when a commit touches `enforcement.protected_paths`
 *
 *   chore   touches none of `enforcement.site_paths`: a change a visitor receives is content or a fix
 *
 *   node scripts/check-track.mjs --commit-msg <file>     one message and the staged files (hook)
 *   node scripts/check-track.mjs --range <base>..<head>  every commit in a pull request (CI)
 *
 * It cannot judge whether a stage was done well, or stop `git commit --no-verify`; CI runs the range
 * check on the pull request for that.
 */

import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { ROOT_DIR, readWorkflow } from './lib/workflow-yaml.mjs';

/** A glob with `*` (not across a slash) and `**` (across); a trailing slash means a whole directory. */
export function globToRegExp(glob) {
    const source = glob.endsWith('/') ? `${glob}**` : glob;
    let out = '';
    for (let i = 0; i < source.length; i += 1) {
        const char = source[i];
        if (char === '*' && source[i + 1] === '*') {
            out += '.*';
            i += 1;
        } else if (char === '*') out += '[^/]*';
        else out += char.replace(/[.+?^${}()|[\]\\]/g, '\\$&');
    }
    return new RegExp(`^${out}$`);
}

export const matchesAny = (file, globs) => (globs ?? []).some((glob) => globToRegExp(glob).test(file));

/** The last `Name: value` line for each trailer name, case-insensitively. Comment lines are ignored. */
export function parseTrailers(message) {
    const trailers = new Map();
    for (const line of String(message).split(/\r?\n/)) {
        if (line.startsWith('#')) continue;
        const match = /^([A-Za-z][A-Za-z-]*):[ \t]*(.*\S)[ \t]*$/.exec(line);
        if (match) trailers.set(match[1].toLowerCase(), match[2]);
    }
    return trailers;
}

export const isMergeMessage = (message) => /^Merge /.test(String(message).trimStart());

/** One commit: its message and the files it changes. Returns the reasons it cannot be accepted. */
export function checkCommit(message, files, config) {
    if (isMergeMessage(message)) return [];
    const errors = [];
    const trailers = parseTrailers(message);
    const track = trailers.get('track');
    const few = (list) => `${list.slice(0, 3).join(', ')}${list.length > 3 ? ', ...' : ''}`;

    if (!track) errors.push(`no "Track:" trailer. Add one line to the message: Track: ${config.tracks.join(' | ')}`);
    else if (!config.tracks.includes(track)) errors.push(`"Track: ${track}" is not a track; the tracks are ${config.tracks.join(', ')}`);

    const site = files.filter((file) => matchesAny(file, config.site_paths));
    if (track === 'chore' && site.length > 0) {
        errors.push(`"Track: chore" changes what a visitor receives (${few(site)}). That is content or a fix.`);
    }

    const guarded = files.filter((file) => matchesAny(file, config.protected_paths));
    if (guarded.length > 0 && !trailers.get('workflow-change')) {
        errors.push(`changes ${few(guarded)}, which define or enforce the workflow. Add a "Workflow-Change: <why>" trailer.`);
    }
    return errors;
}

export function readConfig() {
    const enforcement = readWorkflow().enforcement ?? {};
    return {
        baseline: enforcement.baseline,
        tracks: enforcement.tracks ?? [],
        site_paths: enforcement.site_paths ?? [],
        protected_paths: enforcement.protected_paths ?? [],
    };
}

const git = (...args) => execFileSync('git', args, { cwd: ROOT_DIR, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 }).trim();
const lines = (text) => text.split('\n').filter(Boolean);

function commitsInRange(range, config) {
    const [base, head] = range.split('..');
    const exempt = config.baseline ? [config.baseline] : [];
    return lines(git('rev-list', '--no-merges', '--reverse', head, '--not', base, ...exempt)).map((sha) => ({
        sha,
        message: git('log', '-1', '--format=%B', sha),
        files: lines(git('diff-tree', '--no-commit-id', '--name-only', '-r', '--root', sha)),
    }));
}

function report(heading, errors) {
    console.error(heading);
    for (const error of errors) console.error(`  - ${error}`);
    console.error('See `tracks` and `enforcement` in workflow.ai.yml.');
}

function main(argv) {
    const config = readConfig();
    const flag = (name) => {
        const at = argv.indexOf(name);
        return at === -1 ? null : argv[at + 1];
    };

    const messageFile = flag('--commit-msg');
    if (messageFile) {
        const errors = checkCommit(fs.readFileSync(messageFile, 'utf8'), lines(git('diff', '--cached', '--name-only')), config);
        if (errors.length > 0) {
            report('commit-msg: this commit does not match the track it declares.', errors);
            return 1;
        }
        return 0;
    }

    const range = flag('--range');
    if (range && range.includes('..')) {
        const commits = commitsInRange(range, config);
        const errors = commits.flatMap((commit) => checkCommit(commit.message, commit.files, config).map((error) => `${commit.sha.slice(0, 7)}: ${error}`));
        if (errors.length > 0) {
            report(`${commits.length} commit(s) in ${range} do not match the tracks they declare.`, errors);
            return 1;
        }
        console.log(`${commits.length} commit(s) in ${range} declare a track and match it`);
        return 0;
    }

    console.error('usage: check-track.mjs --commit-msg <file> | --range <base>..<head>');
    return 2;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
    try {
        process.exit(main(process.argv.slice(2)));
    } catch (error) {
        console.error(`check-track: ${error.message}`);
        process.exit(1);
    }
}
