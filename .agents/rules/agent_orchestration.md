# Agent Orchestration Guidelines

## 1. Multi-Agent Delegation Strategy
To preserve context window efficiency and accelerate complex features, primary agents SHOULD delegate specialized subtasks to subagents via `invoke_subagent`.

### Standard Subagent Types:
* **`research` (Read-Only):** Use for broad codebase analysis, searching logs, or reading documentation without cluttering the primary conversation context.
* **`self` (Full Capability):** Inherits full agent capabilities for heavy refactoring or parallel code generation.
* **Custom Subagents (`define_subagent`):** Dynamically defined for specialized domain roles (e.g., `Backend Developer`, `Database Migration Auditor`, `Frontend Component Builder`).

---

## 2. Workspace Modes for Subagents
When invoking a subagent, select the appropriate `Workspace` mode:
* **`inherit` (Default):** Operates directly in the main working directory.
* **`branch` (Isolated):** Creates a separate branched workspace directory. Ideal for running parallel test suites, experimental refactoring, or risky schema updates without polluting the main working directory.
* **`share` (Shared Git Worktree):** Shares the repository directory allowing independent git branching without storage duplication.

---

## 3. Reactive Inter-Agent Messaging (No Polling)
* Agents communicate asynchronously via `send_message(Recipient, Message)`.
* **Zero Polling Rule:** The parent agent MUST NOT poll or loop `manage_subagents` waiting for updates. The system automatically notifies and wakes up the parent when a subagent finishes or sends a message.

---

## 4. Spec-Kit Parallel Task Execution
During Stage 6 (`/speckit.implement`), tasks from `specs/<feature>/tasks.md` can be parallelized:
* **Subagent A (Backend):** Implements Doctrine entities, repository queries, and thin controller endpoints.
* **Subagent B (Frontend):** Implements React components, MUI forms, and `AddonTabRenderer` entries.
* **Subagent C (Test Engineer):** Writes PHPUnit integration tests (`api/tests/`) and Vitest specs (`web/src/__tests__/`).

---

## 5. Registry & Routing Merge Synthesis
* When parent orchestrator merges outputs from branched workspaces, shared files (such as `router.tsx`, `AddonTabRenderer.tsx`, `services.yaml`, or `security.yaml`) may contain registry collisions.
* The parent orchestrator MUST inspect and manually synthesize the combined file state to ensure all imports, routes, services, and dynamic tabs are registered correctly before executing verification commands.

---

## 6. True Multi-Agent Parallelism Engine
* **Concurrent Spawning:** Passing multiple subagent definitions in a single `invoke_subagent` array launches all subagents simultaneously in background tasks.
* **Workspace Isolation:** All writing subagents MUST use `Workspace: "branch"` (or `share`) to isolate file mutations into separate workspace directories, preventing concurrent file overwrites.
* **Non-Blocking Orchestration:** The parent orchestrator remains non-blocking while parallel subagents execute, relying on system event wakeups to handle post-execution synthesis and verification.
