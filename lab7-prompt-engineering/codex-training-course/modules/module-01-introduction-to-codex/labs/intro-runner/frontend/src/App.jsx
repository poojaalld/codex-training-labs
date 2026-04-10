import { useState } from "react";

const API_URL = "http://localhost:5301/api/execute";

export default function App() {
  const [prompt, setPrompt] = useState("Build a Python function that greets a doctor.");
  const [status, setStatus] = useState("idle");
  const [payload, setPayload] = useState(null);

  const handleRun = async (event) => {
    event.preventDefault();

    setStatus("loading");
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
      });

      if (!response.ok) {
        throw new Error("Backend responded with " + response.status);
      }

      const data = await response.json();
      setPayload(data);
      setStatus("success");
    } catch (error) {
      setPayload({ success: false, error: error.message });
      setStatus("error");
    }
  };

  return (
    <div className="shell">
      <header>
        <h1>Prompt Runner Demo</h1>
        <p>Run a Codex-style prompt and inspect the generated code, log, and simulated result.</p>
      </header>

      <form onSubmit={handleRun}>
        <label>
          Prompt
          <textarea
            value={prompt}
            onChange={(event) => setPrompt(event.target.value)}
            rows={4}
          />
        </label>
        <button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Running…" : "Run Prompt"}
        </button>
      </form>

      {payload && (
        <section className="result">
          <h2>Pipeline Response</h2>

          {payload.success === false ? (
            <p className="error">{payload.error ?? "Runner failed."}</p>
          ) : (
            <>
              <p>{payload.message ?? "Prompt executed"}</p>
              <p>
                <strong>Status:</strong> {payload.runStatus}
              </p>
              <p>
                <strong>Run result:</strong> {payload.runResult}
              </p>
              <h3>Generated code snippet</h3>
              <pre>{payload.generatedCode}</pre>
              <h3>Log</h3>
              <ul>
                {(payload.log ?? []).map((entry, index) => (
                  <li key={index}>{entry}</li>
                ))}
              </ul>
            </>
          )}
        </section>
      )}
    </div>
  );
}
