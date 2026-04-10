# Module 1: Introduction to Codex (1 Hour)

## Focus
- What Codex is today and how it evolved from Copilot/new AI agents.
- Differences between Codex and Copilot in CLI/IDE/cloud workflows.
- Real-world use cases: debugging, automation, refactoring, and clinical decision support systems (CDSS).
- Architecture overview (CLI, IDE, cloud) plus multi-language generation examples in Python, JavaScript, and Java.

## Labs structure (each lab targets ~1–2 hours)
> Starter code for every lab lives in this module's labs/ subfolders and pairs a tiny React frontend with a minimal Node/Express backend so we can focus on prompting rather than plumbing.

### Lab 1.1 – Prompt-to-Function Starter (labs/intro-prompt-ui)
- Deliverables: React page with a single textarea plus a submit button; a Node/Express POST endpoint that echoes the prompt and returns a simple generated function stub plus metadata.
- Learning: observe Codex turn natural language into a working function, then compare results to Copilot’s quick sketches and document how options/temperature affect the output.

### Lab 1.2 – Live Prompt Run Demo (labs/intro-runner)
- Deliverables: lightweight React UI that runs a “build a simple Python function” prompt against the Node backend, stores the generated code, and visualizes a run result (success/failure) with logs.
- Learning: demonstrate the first prompt cycle, how to iterate on an instruction, and capture outputs for later debugging.

### Module recap
Capture the live-demo steps in this Module.md so future lab builds can reference the “natural-language ? code” flow together with the CLI/IDE/cloud architecture overview.
