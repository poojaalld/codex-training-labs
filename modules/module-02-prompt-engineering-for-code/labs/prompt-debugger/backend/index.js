const express = require('express');
const cors = require('cors');

const app = express();
const port = 5204;

app.use(cors());
app.use(express.json());

const templates = [
  {
    label: 'concise',
    temperature: 0.2,
    tokens: 48,
    success: true,
    render(prompt) {
      return unction handler(req, res) {\n  // concise route for \n  res.send({ status: 'ok' });\n};
    }
  },
  {
    label: 'verbose',
    temperature: 0.7,
    tokens: 112,
    success: true,
    render(prompt) {
      return sync function handler(req, res) {\n  // verbose helper for \n  const data = await fetchFromService();\n  res.status(200).send(data);\n};
    }
  },
  {
    label: 'fail-safe',
    temperature: 0.4,
    tokens: 62,
    success: false,
    render(prompt) {
      return if (!req.body.prompt) {\n  return res.status(400).send({ error: 'missing prompt' });\n};
    }
  }
];

app.post('/debug', (req, res) => {
  const { prompt = 'default prompt', temperature = 0.5 } = req.body || {};
  const candidates = templates.map((template) => ({
    label: template.label,
    temperature: template.temperature,
    tokens: template.tokens,
    success: template.success,
    completion: template.render(prompt)
  }));

  res.json({
    prompt,
    candidates,
    metadata: {
      requestedTemperature: temperature,
      generatedAt: new Date().toISOString()
    }
  });
});

app.listen(port, () => {
  console.log(prompt-debugger backend listening on http://localhost:);
});
