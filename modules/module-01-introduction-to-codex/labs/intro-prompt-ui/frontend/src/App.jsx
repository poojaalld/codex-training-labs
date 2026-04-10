import { useState } from "react";

const API_URL = "http://localhost:5201/api/generate";

export default function App() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState("idle");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus("loading");
    setResult(null);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const body = await response.json();
      setResult(body);
      setStatus("success");
    } catch (error) {
      setResult({ success: false, error: error.message });
      setStatus("error");
    }
  };

  return (
    <div className="shell">
      <header>
        <p>Module 1 Live Demo</p>
        <h1>Prompt to Function</h1>
        <p>
          Type a simple description and watch Codex-style logic return a
          stubbed function.
        </p>
      </header>

      <form onSubmit={handleSubmit}>
        <label>
          Prompt
          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            placeholder="e.g., Build a sum helper that adds two numbers"
          />
        </label>
        <button type="submit" disabled={!prompt.trim() || status === "loading"}>
          {status === "loading" ? "Generating…" : "Generate Function"}
        </button>
      </form>

      {status === "error" && <p className="error">Failed to fetch result.</p>}

      {result && (
        <section className="result">
          <h2>Generation Result</h2>
          <p>{result.message}</p>
          {result.generatedCode && (
            <>
              <h3>Function: {result.functionName}</h3>
              <pre>{result.generatedCode}</pre>
            </>
          )}
          {result.metadata && (
            <small>Generated at {result.metadata.generatedAt}</small>
          )}
        </section>
      )}
    </div>
  );
}
