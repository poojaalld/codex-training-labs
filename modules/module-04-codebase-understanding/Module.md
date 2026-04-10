# Module 4: Codebase Understanding (1 Hour)

## Focus
- Strategies for reading and understanding large repositories using Codex (summaries, call graphs, etc.).
- Generating docs from code (API, README updates, inline explanations).
- Adding code on top of existing repositories by incrementally introducing modifications via prompts.

## Labs structure (1–2 hours each)
> Each lab is seeded with a mini repository (a couple of Node services and a basic React UI). Students focus on prompts for summarization and documentation rather than building the entire stack.

### Lab 4.1 – Repository Summarizer (labs/repo-summarizer)
- Deliverables: React file-picker interface that lets students upload sample code snippets or small folders; the Node/Express backend returns Codex-generated summaries (module purpose, entry points, dependencies) and highlights key files.
- Learning: build prompts that ask for high-level summaries and compare different prompt strategies (function-level vs. folder-level).

### Lab 4.2 – README + Doc Generator (labs/readme-generator)
- Deliverables: tiny Node service with a few stub modules; React UI allows students to describe features and request a generated README plus API documentation paragraphs.
- Learning: practice prompt scaffolding for documentation, tune the tone (technical vs. conversational), and validate that generated docs match code semantics.

### Module lab takeaway
Capture the summarization prompts and documentation checks in Module.md so future labs can reference the sample prompts, token budgets, and simple repo scaffolds.
