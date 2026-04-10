Module 1 - Lab 1.2 - Live Prompt Run Demo

Overview
--------
This lab walks through a live prompt-runner experience: a React UI posts a natural-language request to a Node/Express backend, the backend simulates Codex generating code and running a tiny pipeline, and the UI displays the generated logs.

Prerequisites
-------------
1. Node.js 18+ and npm installed.

Setup
-----
1. Launch the backend from the repo root:
   ```
   cd modules/module-01-introduction-to-codex/labs/intro-runner/backend
   npm install
   npm start
   ```
   The runner backend listens on http://localhost:5301/exe.

2. In a second terminal, start the frontend:
   ```
   cd modules/module-01-introduction-to-codex/labs/intro-runner/frontend
   npm install
   npm run dev
   ```
   The React UI opens on http://localhost:5174 and talks to the backend.

How to use
----------
1. Paste a description such as "Generate a helper that formats a patient summary" and click Run Prompt.
2. Watch the UI show logs for each step: the generated snippet, the execution result, and the runner status.
3. Tweak `server.js` to return different statuses (review/done) based on prompt length or keywords to simulate a multi-stage workflow.

Learning outcome
----------------
- Observe how natural language is turned into code plus metadata and logs.
- Capture the natural-language -> code -> execution cycle referenced in Module 1.
- Extend the UI to show a fake deploy step or parallel log streams before moving on to Module 2 labs.
