Module 2 · Lab 2.2 — Prompt Debugger Playground

Overview
--------
This lab presents a timeline of prompt edits together with the generated completions. The Node backend simulates multiple candidates for each history entry, letting learners compare temperature, token use, and returned code.

Prerequisites
-------------
1. Node.js 18+ and npm installed.
2. Familiarity with the Module 2 prompt-engineering-api flow and how to read completion metadata.

Getting started
---------------
1. Run the backend in the prompt-debugger folder:
   `
   cd modules/module-02-prompt-engineering-for-code/labs/prompt-debugger/backend
   npm install
   npm start
   `
   The server exposes http://localhost:5204/debug with candidate arrays.

2. Run the frontend:
   `
   cd modules/module-02-prompt-engineering-for-code/labs/prompt-debugger/frontend
   npm install
   npm run dev
   `
   The React UI opens at http://localhost:5176.

3. Type a prompt and adjust the ‘temperature’ and ‘stop’ settings to see how the backend returns variations. The form tracks every edit in a timeline.

Deliverables
------------
- Capture at least three prompt iterations in the timeline, including the full completion text and the reported metadata (token count, temperature, status).
- Extend ackend/index.js so it returns multiple candidate completions (e.g., safe, concise, verbose) along with metadata fields such as 	okens, 	emperature, and success.
- Make sure the frontend visualizes these candidates and metadata so learners can compare them side by side.
