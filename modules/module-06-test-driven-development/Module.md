# Module 6: Test-Driven Development (TDD) (1 Hour)

## Focus
- Prompt Codex to generate unit tests from function signatures or human-readable requirements.
- Improve test coverage by asking Codex to identify gaps and produce missing assertions.

## Labs structure (1–2 hours each)
> Each lab includes a small React UI for entering requirements and reviewing generated tests, plus a simple Node/Express backend that returns mocked test files and coverage hints.

### Lab 6.1 – Test Generator (labs/test-generator)
- Deliverables: React form with inputs for the function name, description, and edge cases; Node/Express endpoint emits unit test suggestions (Jest for React service, Mocha for backend) and explains the assertion logic.
- Learning: experiment with prompt templates to request parameterized tests, snapshot checks, and asynchronous assertions.

### Lab 6.2 – Coverage Improvement Sprint (labs/coverage-improvement)
- Deliverables: Minimal Node service that exposes one uncovered route; React UI submits the current coverage stats, and the backend responds with a Codex-generated list of missing tests plus stub code.
- Learning: interpret coverage reports, convert gaps into targeted prompts, and keep the React/Express starter code tiny (a single component + one router).

### Exercise note
Record how each lab keeps file counts low but demonstrates the full TDD loop: requirement ? prompt ? generated tests ? coverage review.
