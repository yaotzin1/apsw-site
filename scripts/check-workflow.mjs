/**
 * Checks that what `workflow.ai.yml` says about this repository is true, so the file cannot describe
 * a gate, a skill or an enforcer that does not exist.
 *
 *   node scripts/check-workflow.mjs
 *
 * - the skill registry names exactly the directories under .agents/skills, at the paths it gives
 * - every gate command appears in the pre-commit (or commit-msg) hook and in the CI workflow
 * - every required check is the name of a job in the CI workflow
 * - every backticked path in a rule's `enforced_by`, and every stage's `guidance`, exists
 * - every file an agent loads is under the smallest `max_chars` among the agents that load it
 * - package.json agrees with `project` (engines.node, no dependencies, the verify script)
 * - every `inherited_guidance` file starts with its banner
 */

import fs from 'node:fs';
import path from 'node:path';
import { ROOT_DIR, readWorkflow } from './lib/workflow-yaml.mjs';

const workflow = readWorkflow();
const problems = [];
const read = (relative) => fs.readFileSync(path.join(ROOT_DIR, relative), 'utf8');
const exists = (relative) => fs.existsSync(path.join(ROOT_DIR, relative));

// Skills
const skillsDir = workflow.skills?.directory ?? '.agents/skills';
const onDisk = fs.readdirSync(path.join(ROOT_DIR, skillsDir), { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => e.name).sort();
const registry = workflow.skills?.registry ?? [];
const registered = registry.map((skill) => skill.name).sort();
for (const name of onDisk.filter((n) => !registered.includes(n))) problems.push(`skill ${name} exists in ${skillsDir} but is not in skills.registry`);
for (const name of registered.filter((n) => !onDisk.includes(n))) problems.push(`skills.registry names ${name}, which has no directory in ${skillsDir}`);
for (const skill of registry) if (!exists(skill.path)) problems.push(`skills.registry path does not exist: ${skill.path}`);
const knownSkills = new Set(registered);
for (const stage of workflow.stages ?? []) {
    for (const lead of stage.lead_skills ?? []) if (!knownSkills.has(lead)) problems.push(`stage ${stage.id} is led by unknown skill ${lead}`);
    if (stage.guidance && !exists(stage.guidance)) problems.push(`stage ${stage.id} guidance does not exist: ${stage.guidance}`);
}
const stageIds = new Set((workflow.stages ?? []).map((stage) => stage.id));
for (const track of workflow.tracks ?? []) for (const id of track.stages ?? []) if (!stageIds.has(id)) problems.push(`track ${track.id} names unknown stage ${id}`);
const enforcedTracks = workflow.enforcement?.tracks ?? [];
const declaredTracks = (workflow.tracks ?? []).map((track) => track.id);
if (enforcedTracks.join() !== declaredTracks.join()) problems.push(`enforcement.tracks (${enforcedTracks}) differs from tracks (${declaredTracks})`);

// Gates, hooks and CI
const gates = workflow.quality_gates ?? {};
const hookPath = gates.local_hook?.path;
const msgHookPath = gates.local_hook?.commit_msg_path;
const ciPath = workflow.ci?.workflow;
for (const file of [hookPath, msgHookPath, ciPath]) if (!file || !exists(file)) problems.push(`missing: ${file}`);
const hook = hookPath && exists(hookPath) ? read(hookPath) : '';
const msgHook = msgHookPath && exists(msgHookPath) ? read(msgHookPath) : '';
const ci = ciPath && exists(ciPath) ? read(ciPath) : '';
const verifyScript = exists('package.json') ? JSON.parse(read('package.json')).scripts?.verify ?? '' : '';
for (const gate of gates.pre_commit ?? []) {
    if (!hook.includes(gate.command)) problems.push(`pre-commit gate "${gate.name}" (${gate.command}) is not in ${hookPath}`);
    if (!ci.includes(gate.command) && !(ci.includes('npm run verify') && verifyScript.includes(gate.command))) problems.push(`pre-commit gate "${gate.name}" (${gate.command}) is not run by ${ciPath}`);
}
for (const gate of gates.commit_msg ?? []) {
    if (!msgHook.includes(gate.command)) problems.push(`commit-msg gate "${gate.name}" (${gate.command}) is not in ${msgHookPath}`);
    if (!ci.includes(gate.command)) problems.push(`commit-msg gate "${gate.name}" (${gate.command}) is not run by ${ciPath}`);
}
const jobNames = [...ci.matchAll(/^ {4}name:\s*(.+?)\s*$/gm)].map((m) => m[1].replace(/^["']|["']$/g, ''));
for (const check of workflow.ci?.required_checks ?? []) if (!jobNames.includes(check)) problems.push(`required check "${check}" is not a job name in ${ciPath} (jobs: ${jobNames.join(', ')})`);

// Enforcers named in rules
for (const entry of workflow.architectural_rules ?? []) {
    for (const match of String(entry.enforced_by).matchAll(/`([^`]+)`/g)) {
        const candidate = match[1].split(' ')[0];
        if (/[/.]/.test(candidate) && !exists(candidate)) problems.push(`rule enforcer does not exist: ${candidate}`);
    }
    if (!/`[^`]+`|review/.test(String(entry.enforced_by))) problems.push(`rule has neither a named enforcer nor "review": ${String(entry.rule).slice(0, 60)}`);
}

// Agent file size limits
const limits = new Map();
for (const agent of workflow.agents ?? []) {
    if (!agent.max_chars) continue;
    for (const pattern of agent.loads ?? []) {
        const files = pattern.includes('*')
            ? fs.readdirSync(path.join(ROOT_DIR, path.dirname(pattern))).filter((name) => name.endsWith(path.extname(pattern))).map((name) => `${path.dirname(pattern)}/${name}`)
            : [pattern];
        for (const file of files) limits.set(file, Math.min(limits.get(file) ?? Infinity, agent.max_chars));
    }
}
for (const [file, limit] of limits) {
    if (!exists(file)) continue;
    const size = read(file).length;
    if (size > limit) problems.push(`${file} is ${size} characters; an agent that loads it reads at most ${limit}`);
}

// Project facts
const project = workflow.project ?? {};
if (!exists('package.json')) problems.push('package.json is missing');
else {
    const manifest = JSON.parse(read('package.json'));
    if (manifest.engines?.node !== project.runtime?.node) problems.push(`package.json engines.node (${manifest.engines?.node}) differs from project.runtime.node (${project.runtime?.node})`);
    const deps = Object.keys(manifest.dependencies ?? {}).length + Object.keys(manifest.devDependencies ?? {}).length;
    if (deps !== project.runtime_dependencies) problems.push(`package.json declares ${deps} dependencies; project.runtime_dependencies says ${project.runtime_dependencies}`);
    if (!manifest.private) problems.push('package.json must be private: true');
}
const dockerfile = exists('Dockerfile') ? read('Dockerfile') : '';
if (project.runtime?.php && !dockerfile.includes(`php:${project.runtime.php}`)) problems.push(`Dockerfile does not use php:${project.runtime.php}`);
for (const file of project.machine_readable ?? []) if (!exists(file)) problems.push(`project.machine_readable lists ${file}, which does not exist`);

// Inherited files
const banner = workflow.inherited_guidance?.banner;
for (const file of workflow.inherited_guidance?.files ?? []) {
    if (!exists(file)) problems.push(`inherited_guidance lists ${file}, which does not exist`);
    else if (banner && !read(file).split('\n').slice(0, 6).join('\n').includes(banner)) problems.push(`${file} does not start with the banner "${banner}"`);
}

if (problems.length > 0) {
    console.error('workflow.ai.yml claims something the repository does not do:');
    for (const problem of problems) console.error(`  - ${problem}`);
    process.exit(1);
}
console.log(`workflow.ai.yml matches the repository (${registry.length} skills, ${(gates.pre_commit ?? []).length + (gates.commit_msg ?? []).length} gates, ${(workflow.ci?.required_checks ?? []).length} required checks, ${(workflow.architectural_rules ?? []).length} rules)`);
