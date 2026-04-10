Module 2 · Lab 2.1 — REST API Prompt Generator

Overview
--------
This lab introduces a simple React form that describes a REST endpoint alongside a Node/Express backend that simulates Codex-generated routers. Learners tune the prompt, few-shot context, and constraints to see how the returned stub changes.

Prerequisites
-------------
1. Node.js 18+ and npm installed.
2. Familiarity with React basics and how Express handles JSON payloads.

Getting started
---------------
1. In one terminal run the backend:
   `
   cd modules/module-02-prompt-engineering-for-code/labs/prompt-engineering-api/backend
   npm install
   npm start
   `
   The server listens on http://localhost:5203/generate and echoes structured router stubs.

2. In a second terminal run the frontend:
   `
   cd modules/module-02-prompt-engineering-for-code/labs/prompt-engineering-api/frontend
   npm install
   npm run dev
   `
   The React app opens on http://localhost:5175 and lets you edit the prompt, few-shot examples, and request a new stub.

3. Tweak the  endpoint description, add constraints (middleware, status codes), and rerun the prompt to watch how the backend response shifts from a basic router to a richer contract.

Deliverables
------------
- Observe how clarity in the description and few-shot section modifies the returned 
outer, docs, and metadata fields. Document at least three prompt variants (e.g., general description, required headers, and advanced error handling) and their outputs in this README.
- Extend ackend/index.js to simulate those variants by matching on keywords such as headers / idempotent and returning the appropriate stub.
- Update rontend/src/App.jsx as needed so the UI reflects the mocked metadata and logs the returned router text in the timeline.
