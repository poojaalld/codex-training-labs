# Module 2: Prompt Engineering for Code (1 Hour)

## Focus
- Writing effective prompts that produce predictable code (clear intent, constraints, examples).
- Few-shot prompting programs and how to share minimal context for fast iterations.
- Debugging prompts by analyzing outputs, partial completions, and tokens.
- Context control strategies, token budgeting, and setting the right temperature/stop sequences.

## Labs structure (1–2 hours each)
> Each starter project uses a pared-down React dashboard talking to a Node/Express helper service so students can tweak prompts and immediately inspect the generated code.

### Lab 2.1 – REST API Prompt Generator (labs/prompt-engineering-api)
- Deliverables: React form for describing the REST endpoint, request/response contract, and a few-shot section; Node/Express endpoint simulates generation and returns a stubbed Express router plus docs.
- Learning: compare prompt variants (verbose vs. structured), inspect the few-shot context, and note how clarity reduces iterations.

### Lab 2.2 – Prompt Debugger Playground (labs/prompt-debugger)
- Deliverables: React timeline of prompt edits, token usage, and returned code; Node/Express backend returns multiple candidate completions and metadata for the UI to inspect.
- Learning: capture prompt history, see how temperature/stop sequences impact repeats, and practice “spot the bad prompt” to fix it before sending it to the agent.

## Exercises (for the lab deliverables)
1. Convert a given pseudocode snippet into working JavaScript by refining the prompt step-by-step.
2. Improve a poorly worded prompt into a precise request and document the before/after results in the lab README.
3. Have Codex generate unit tests for a small helper function by describing input/expected pairs in the React UI and verifying the output in Node.
