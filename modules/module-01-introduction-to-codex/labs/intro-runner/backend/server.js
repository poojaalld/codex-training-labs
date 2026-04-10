import express from "express";
import cors from "cors";

const PORT = 5301;
const app = express();

app.use(cors({ origin: "http://localhost:5174" }));
app.use(express.json());

const simulateRun = (prompt) => {
  const code = `function demo() {\n  return "Result for prompt: ${prompt}";\n}`;
  const success = prompt?.length > 10;
  return {
    success,
    output: success ? "Execution succeeded" : "Execution flagged potential issues",
    details: prompt || "No prompt provided",
    generatedCode: code
  };
};

app.post("/api/execute", (req, res) => {
  const { prompt } = req.body ?? {};
  const run = simulateRun(prompt ?? "");
  res.json({
    success: true,
    action: "execute",
    prompt,
    generatedCode: run.generatedCode,
    runResult: run.output,
    runStatus: run.success ? "done" : "review",
    log: [
      `Prompt submitted at ${new Date().toISOString()}`,
      run.success ? "Code compiled in runner" : "Runner identified issues",
      `Output: ${run.output}`
    ]
  });
});

app.listen(PORT, () => {
  console.log(`Intro runner backend ready on http://localhost:${PORT}`);
});
