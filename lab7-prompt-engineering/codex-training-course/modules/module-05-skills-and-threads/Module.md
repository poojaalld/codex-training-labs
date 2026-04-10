# Module 5: Skills and Threads (1 Hour)

## Focus
- How Codex skills encapsulate specialized capabilities (data analysis, testing, deployment) and how to call them.
- Threads for parallel execution of tasks, branching prompts, and merging results.
- Practical patterns for orchestrating multi-skill workflows across a worktree.

## Labs structure (1–2 hours each)
> The labs start from a minimal React dashboard that visualizes the status of skills/threads, with a Node/Express backend simulating the orchestration logic.

### Lab 5.1 – Skill Builder Dashboard (labs/skill-builder)
- Deliverables: React page with panels for “Create Skill” (name, description, inputs) and “Invoke Skill” (simulate running on stub data); Node/Express backend returns fake execution traces that Codex would produce.
- Learning: practice writing prompts that define skill boundaries, inputs/outputs, sample calling code, and verifying that the skill stays focused on a single responsibility.

### Lab 5.2 – Parallel Threads Workbench (labs/threads-workbench)
- Deliverables: React timeline showing two or three concurrent threads (text summary, current status); Node/Express backend exposes endpoints to start/stop threads and return aggregate results.
- Learning: demonstrate how to decompose a large task into parallel subtasks, inspect intermediate thread outputs, and reconcile them back into a single response.

### Lab wrap-up
Note in Module.md how each lab keeps file count low (a few React components + one Express router) yet illustrates the notion of skill definitions and thread orchestration.
