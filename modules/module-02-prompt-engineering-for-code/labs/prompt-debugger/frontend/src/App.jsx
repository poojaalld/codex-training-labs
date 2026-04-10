import { useState } from 'react';

export default function App() {
  const [prompt, setPrompt] = useState('Document how to normalize the patient visit array.');
  const [temperature, setTemperature] = useState(0.5);
  const [history, setHistory] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [metadata, setMetadata] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await fetch('/debug', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, temperature })
    });
    const data = await response.json();
    setCandidates(data.candidates);
    setMetadata(data.metadata);
    setHistory((prev) => [
      { prompt: data.prompt, metadata: data.metadata, candidates: data.candidates },
      ...prev
    ]);
    setLoading(false);
  };

  return (
    <div className= app-shell>
      <header>
        <h1>Lab 2.2 · Prompt Debugger Playground</h1>
        <p>Track prompt edits, request metadata, and compare returned completions.</p>
      </header>

      <section className=form-card>
        <form onSubmit={handleSubmit}>
          <label>
            Prompt
            <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} rows={3} />
          </label>

          <label>
            Temperature ({temperature})
            <input
              type=range
              min=0
              max=1
              step=0.1
              value={temperature}
              onChange={(event) => setTemperature(Number(event.target.value))}
            />
          </label>

          <button type=submit disabled={loading}>
            {loading ? 'Requesting...' : 'Generate Candidates'}
          </button>
        </form>
      </section>

      <section className=panel>
        <h2>Latest Candidates</h2>
        {candidates.map((candidate) => (
          <article key={candidate.label}>
            <header>
              <strong>{candidate.label}</strong>
              <span>temp {candidate.temperature} · {candidate.tokens} tokens · {candidate.success ? 'success' : 'issue'}</span>
            </header>
            <pre>{candidate.completion}</pre>
          </article>
        ))}
      </section>

      <section className=panel>
        <h2>Metadata</h2>
        <pre>{metadata ? JSON.stringify(metadata, null, 2) : 'Send a request to see metadata.'}</pre>
      </section>

      <section className=panel timeline>
        <h2>Prompt Timeline</h2>
        {history.map((entry, index) => (
          <div key={${entry.prompt}-}>
            <p><strong>{entry.prompt}</strong></p>
            <p>{entry.metadata?.generatedAt}</p>
            <ul>
              {entry.candidates?.map((candidate) => (
                <li key={candidate.label}>
                  {candidate.label}: {candidate.tokens} tokens, temp {candidate.temperature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}
