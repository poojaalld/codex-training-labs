const express = require('express');
const cors = require('cors');

const app = express();
const port = Number(process.env.PORT) || 5203;

app.use(cors());
app.use(express.json());

const baseResponse = {
  router: `const router = require('express').Router();
router.get('/patients', (req, res) => {
  res.status(200).send({ message: 'List of patient visits' });
});
module.exports = router;
`,
  docs: 'GET /patients returns summaries of the requested records.',
  metadata: { status: 'basic stub', version: '0.1' }
};

const variants = [
  {
    keywords: ['headers'],
    router: `const router = require('express').Router();
router.get('/patients', (req, res) => {
  const apiKey = req.headers['x-config-key'];
  const status = apiKey ? 200 : 401;
  res.status(status).send({ message: 'Headers protected list' });
});
module.exports = router;
`,
    docs: 'GET /patients requires x-config-key header for access and returns 401 if missing.',
    metadata: { status: 'headers', version: '0.2' }
  },
  {
    keywords: ['idempotent'],
    router: `const router = require('express').Router();
router.post('/patients/sync', (req, res) => {
  res.status(204).end();
});
module.exports = router;
`,
    docs: 'POST /patients/sync performs an idempotent sync and always returns 204.',
    metadata: { status: 'idempotent', version: '0.3' }
  },
  {
    keywords: ['error', 'status'],
    router: `const router = require('express').Router();
router.get('/patients/:id', (req, res) => {
  if (!req.params.id) {
    return res.status(400).send({ error: 'Missing id' });
  }
  res.status(200).send({ patientId: req.params.id, status: 'ok' });
});
module.exports = router;
`,
    docs: 'GET /patients/:id validates the id param and returns structured status/error responses.',
    metadata: { status: 'error-aware', version: '0.4' }
  }
];

app.post('/generate', (req, res) => {
  const payload = req.body || {};
  const prompt = (payload.prompt || 'baseline').toLowerCase();
  const matchingVariant = variants.find((variant) =>
    variant.keywords.some((keyword) => prompt.includes(keyword))
  );

  return res.json({
    prompt: payload.prompt,
    fewShot: payload.fewShot || [],
    response: matchingVariant || baseResponse
  });
});

const server = app.listen(port, () => {
  console.log(`prompt-engineering-api backend running at http://localhost:${port}`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use. Stop the other process or set PORT to try again.`);
  } else {
    console.error('Server error:', error);
  }
  process.exit(1);
});
