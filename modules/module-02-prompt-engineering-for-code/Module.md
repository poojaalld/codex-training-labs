# Module 2: Prompt Engineering for Code (1 Hour)

## Focus
- Writing effective prompts that produce predictable code (clear intent, constraints, examples).
- Few-shot prompting programs and how to share minimal context for fast iterations.
- Debugging prompts by analyzing outputs, partial completions, and tokens.
- Context control strategies, token budgeting, and setting the right temperature/stop sequences.

## Labs structure (1-2 hours each)
> Each starter project uses a pared-down React dashboard talking to a Node/Express helper service so students can tweak prompts and immediately inspect the generated code.

### Lab 2.1 - REST API Prompt Generator (labs/prompt-engineering-api)
- Deliverables: React form for describing the REST endpoint, request/response contract, and a few-shot section; Node/Express endpoint simulates generation and returns a stubbed Express router plus docs.
- Learning: compare prompt variants (verbose vs. structured), inspect the few-shot context, and note how clarity reduces iterations.

### Lab 2.2 - Prompt Debugger Playground (labs/prompt-debugger)
- Deliverables: React timeline of prompt edits, token usage, and returned code; Node/Express backend returns multiple candidate completions and metadata for the UI to inspect.
- Learning: capture prompt history, see how temperature/stop sequences impact repeats, and practice 'spot the bad prompt' to fix it before sending it to the agent.

### Lab 2.3 - Prompt Refinement for Pseudocode (labs/prompt-refinement)
- Deliverables: A README capturing three prompt refinements plus a backend that simulates each stage of the pseudocode-to-JavaScript transformation.
- Learning: practice documenting the “prompt → code” trajectory, highlight helper introductions, and show how each refinement narrows the generated stub.

## Exercises (for the lab deliverables)
1. Convert a given pseudocode snippet into working JavaScript by refining the prompt step-by-step.
2. Improve a poorly worded prompt into a precise request and document the before/after results in the lab README.
3. Have Codex generate unit tests for a small helper function by describing input/expected pairs in the React UI and verifying the output in Node.

### Exercise 1 focus: pseudocode -> JavaScript

Use the labs/prompt-engineering-api starter (see frontend/src/App.jsx and backend/index.js) to orchestrate the prompt refinement cycle:

- Code base: the React frontend lets learners type prompts and preview the generated router stub, while the Node backend (backend/index.js) simulates Codex responses for the provided instruction.
- Pseudocode sample: start with a description like  Sort an array of patient visit records by admission date then return the top three. Convert that into JavaScript via three iterations:
  1. Prompt 1: Write a function that sorts the given array. (partial output; possibly generic sort).
  2. Prompt 2: Sort by the admissionDate property in descending order then return the first three entries. (adds specificity, still no formatting).
  3. Prompt 3: Add helper formatVisit that converts each record into a patient/date object and include that in the returned array. (full answer with helper).
- Files to touch: update frontend/README.txt to document the prompt history, show the final pseudo prompt, and explain why each refinement worked; adjust backend/index.js to detect the new instructions and return the incremental code snippets that reflect each prompt.
- Verification: after each prompt, render the simulated output in frontend/src/App.jsx (mock it if necessary) and capture the log so learners can compare the steps within the UI timeline.
