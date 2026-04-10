Module 1 · Lab 1.1 — Prompt-to-Function Starter

Overview
--------
This lab demonstrates how a Codex-style service turns a single natural-language prompt into a callable function stub.
The frontend presents a textarea and submit button (React + Vite) while the backend is a tiny Express server that returns a hard-coded function based on keywords.

Prerequisites
-------------
1. Node.js 18+ installed.
2. `npm` on your PATH.

How to run
----------
1. In a terminal:
   ```
   cd lab7-prompt-engineering/codex-training-course/modules/module-01-introduction-to-codex/labs/intro-prompt-ui/backend
   npm install
   npm start
   ```
   This starts the Express server on http://localhost:5201.

2. Open a second terminal:
   ```
   cd .../frontend
   npm install
   npm run dev
   ```
   The React UI runs on http://localhost:5173 and automatically talks to the backend.

3. Type a prompt (e.g., “build a sum helper”) and submit. The backend returns a pseudo-Codex response containing `generatedCode`, a `functionName`, and metadata.

What to explore
---------------
- Observe how prompt keywords (“sum”, “greeting”) affect the returned stub.
- Compare this with how GitHub Copilot might insert inline completions when the same prompt is typed directly in an editor.
- Extend `backend/index.js` to detect new keywords or return multiple suggestions to feel like a prompt playground.
