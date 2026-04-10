Module 2 · Lab 2.3 — Prompt Refinement for Pseudocode

Overview
--------
This lab guides learners through taking a pseudocode description and turning it into working JavaScript by intentionally refining the prompt in successive iterations. Each refinement adds constraints (ordering, transformations, helper functions) so that the generated snippet marches closer to the target solution.

Prerequisites
-------------
1. Node.js 18+ and npm installed.
2. Familiarity with the Module 2 prompt-engineering-api starter (React frontend + Express backend).

Lab structure
-------------
1. Launch the lab environment (use the prompt-engineering-api starter) so the React UI posts prompts to the Node backend as learners type.
2. Start with this pseudocode:
   -  Sort an array of patient visit records by admission date then return the first three summaries.
3. Send the first prompt (e.g., Generate a function that sorts the array.) and capture the partial stub that comes back.
4. Refine the prompt twice more:
   - Prompt 2: Sort by admissionDate descending and limit to three entries.
   - Prompt 3: Introduce formatVisit to convert each record into a patient/date object before returning it.
5. After every iteration, note how the returned snippet changes and why the added instructions help slot the code closer to the goal.

Deliverables
------------
- Update frontend/README.txt (or this README) with the prompt history: the exact text you used, the simulated response from the backend, and a sentence explaining how it improved the result.
- Adjust backend/index.js (or whichever helper service you have) to simulate the three stages above: you can hard-code responses keyed by keywords such as formatVisit to return progressively richer stubs.
- Capture the final JS snippet, highlight the helper function, and explain how each refinement narrowed the scope from a generic sort to the fully formatted summary list.

Verification
------------
1. Run npm run dev in the frontend folder (or whichever script spins up the UI) and make sure each prompt is shown in the timeline/log.
2. Use the CLI or UI log to compare the three generated outputs and confirm they align with the prompts you sent.
3. Document the prompt -> code path in this README so future learners can see one worked example of the refinement cycle.
