# Workflow: Subagent Orchestration & Parallel Execution SOP

## Purpose
Orchestrate multiple specialized subagents for parallel research, task execution, and automated testing.

---

## Step 1: Subagent Definition & Invocation
1. Identify subtasks that can run independently (e.g. codebase research, test execution, component building).
2. Launch subagents using `invoke_subagent`:
   - Specify `TypeName` (`research`, `self`, or custom name).
   - Specify `Role` (e.g., `'Database Researcher'`, `'Frontend Tester'`).
   - Choose `Workspace` mode (`inherit`, `branch`, or `share`).
   - Provide a clear, actionable `Prompt`.

---

## Step 2: Parallel Task Distribution
When implementing features from `specs/<feature>/tasks.md`:
* **Task Allocation:**
  - Launch Subagent 1 (`branch` workspace): Implement PHP backend entity and service.
  - Launch Subagent 2 (`branch` workspace): Implement React frontend workspace component.
* **Non-Blocking Parent Turn:** After dispatching subagents, end the parent turn or proceed with independent tasks.

---

## Step 3: Reactive Result Synthesis
1. When subagents complete their tasks, the system automatically wakes up the parent agent with full transcript notifications.
2. Review subagent outputs and merge changes from branched workspaces. If structural conflicts exist in shared registry or routing files (e.g., simultaneous updates to `router.tsx`, `AddonTabRenderer.tsx`, or `services.yaml`), manually synthesize the final file state before committing the merge.
3. Execute final verification (`.agents/workflows/verification.md`) across the combined codebase.
