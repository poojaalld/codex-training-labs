import express from "express";
import cors from "cors";

const PORT = 5201;
const app = express();

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

const stubResolver = (prompt) => {
  const normalized = (prompt ?? "").toLowerCase();
  if (normalized.includes("sum")) {
    return {
      name: "calculateSum",
      code: "function calculateSum(a, b) {\n  return a + b;\n}"
    };
  }

  if (normalized.includes("greeting")) {
    return {
      name: "sayGreeting",
      code: "function sayGreeting(name) {\n  return `Hello, ${name}!`;\n}"
    };
  }

  return {
    name: "placeholderFunction",
    code: "function placeholderFunction() {\n  // replace this stub with your generated logic\n}"
  };
};

app.post("/api/generate", (req, res) => {
  const { prompt } = req.body ?? {};
  const timestamp = new Date().toISOString();
  const generated = stubResolver(prompt);

  res.json({
    success: true,
    message: "Function stub generated from your prompt.",
    prompt: prompt ?? "",
    generatedCode: generated.code,
    functionName: generated.name,
    metadata: {
      language: "javascript",
      generatedAt: timestamp
    }
  });
});

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    status: "ready"
  });
});

app.listen(PORT, () => {
  console.log(`Intro prompt UI backend listening on http://localhost:${PORT}`);
});
