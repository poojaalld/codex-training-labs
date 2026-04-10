import { useState } from 'react';

const presets = [
  'Describe a GET /patients endpoint that returns patient visit summaries.',
  'Add a required x-config-key header so the route only responds when the header is present.',
  'Return structured errors for missing IDs and make the call idempotent.'
];

export default function App() {
  const [prompt, setPrompt] = useState(presets[0]);
  const [fewShot, setFewShot] = useState('Include schema and example payload.');
  const [metadata, setMetadata] = useState(null);
  const [timeline, setTimeline] = useState([]);
  const [router, setRouter] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const response = await fetch('/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, fewShot: fewShot.split('\n') })
    });
    const data = await response.json();
    setRouter(data.response.router);
    setMetadata(data.response.metadata);
    setTimeline((prev) => [
      { prompt: data.prompt, details: data.response.docs, router: data.response.router },
      ...prev
    ]);
    setLoading(false);
  };

  const pickPreset = (value) => {
    setPrompt(value);
  };

  return (
    <div className= app-shell>
      <header>
        <h1>Lab 2.1 · REST API Prompt Generator</h1>
        <p>Describe the endpoint, add few-shot context, and observe how the backend stub evolves.</p>
      </header>

      <section className=form-card>
        <form onSubmit={handleSubmit}>
          <label>
            Prompt (describe endpoint + constraints)
            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={3} />
          </label>

          <label>
            Few-shot notes
            <textarea value={fewShot} onChange={(e) => setFewShot(e.target.value)} rows={3} />
          </label>

          <div className=preset-row>
            {presets.map((value) => (
              <button type=button key={value} onClick={() => pickPreset(value)}>
                {value.slice(0, 25)}...
              </button>
            ))}
          </div>

          <button type=submit disabled={loading}>{loading ? 'Running...' : 'Generate Stub'}</button>
        </form>
      </section>

      <section className=results>
        <div className=panel>
          <h2>Latest Router</h2>
          <pre>{router}</pre>
        </div>
        <div className=panel>
          <h2>Metadata</h2>
          <pre>{JSON.stringify(metadata, null, 2)}</pre>
        </div>
        <div className=panel>
          <h2>Prompt Timeline</h2>
          <ul>
            {timeline.map((entry, index) => (
              <li key={${entry.prompt}-}>
                <strong>{entry.prompt}</strong>
                <p>{entry.details}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
