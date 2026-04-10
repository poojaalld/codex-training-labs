Module 1 · Lab 1.2 — Live Prompt Run Demo

Overview
--------
This lab leads participants through a ”prompt runner” experience: a React UI sends a request to a Node/Express backend, which simulates Codex generating code and executing a simple pipeline, then returns the run log.

Prerequisites
-------------
1. Node.js 18+ and npm installed.

Setup
-----
1. Launch backend:
   ```
   cd lab7-prompt-engineering/codex-training-course/modules/module-01-introduction-to-codex/labs/intro-runner/backend
   npm install
   npm start
   ```
   The runner backend listens on http://localhost:5301/exe.

2. Start the frontend:
   ```
   cd .../frontend
   npm install
   npm run dev
   ```
   Visit http://localhost:5174 to access the runner UI.

How to use
----------
1. Paste a description such as “Generate a helper that formats a patient summary” and click “Run Prompt”.
2. The UI shows logs from each step: the generated code snippet, run result, and runner status.
3. Modify `server.js` to return different run statuses (review/done) based on prompt length to simulate a multi-stage pipeline.

Learning outcome
----------------
- Observe how a single prompt results in a code snippet plus metadata/logs.
- Capture the “natural-language → code → execution” cycle that will be referenced in Module 1’s live demo.
- Extend the UI to show a fake “deploy” step or parallel logs before moving to Module 2 labs.
