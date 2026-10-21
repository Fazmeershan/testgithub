import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { validateEnquiry } from './validate.js';
import { notify } from './mailer.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, 'data');
const CLIENT_DIST = path.join(__dirname, '..', 'client', 'dist');
const PORT = Number(process.env.PORT) || 5000;
const isProd = process.env.NODE_ENV === 'production';

const app = express();
app.disable('x-powered-by');
app.set('trust proxy', 1);
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        'default-src': ["'self'"],
        'style-src': ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
        'font-src': ["'self'", 'https://fonts.gstatic.com'],
        'img-src': ["'self'", 'data:'],
      },
    },
  })
);
app.use(express.json({ limit: '20kb' }));

app.get('/api/health', (_req, res) => res.json({ ok: true }));

// Portfolio entries come from data/portfolio.json. Add only verified,
// management-approved entries there (see README).
app.get('/api/portfolio', async (_req, res) => {
  try {
    const raw = await fs.readFile(path.join(DATA_DIR, 'portfolio.json'), 'utf8');
    res.json(JSON.parse(raw));
  } catch (err) {
    console.error('Failed to read portfolio:', err.message);
    res.json([]);
  }
});

const enquiryLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 5,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: { ok: false, error: 'rate_limited' },
});

app.post('/api/enquiries', enquiryLimiter, async (req, res) => {
  const body = req.body || {};

  // Honeypot: real visitors never see or fill this field.
  if (body.website) return res.status(200).json({ ok: true });

  const { errors, data } = validateEnquiry(body);
  if (errors) return res.status(400).json({ ok: false, error: 'validation', fields: errors });

  const enquiry = { id: crypto.randomUUID(), receivedAt: new Date().toISOString(), ...data };
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.appendFile(path.join(DATA_DIR, 'enquiries.jsonl'), JSON.stringify(enquiry) + '\n');
  } catch (err) {
    console.error('Failed to store enquiry:', err);
    return res.status(500).json({ ok: false, error: 'server' });
  }

  notify(enquiry).catch((err) => console.error('Failed to send notification email:', err.message));
  res.status(201).json({ ok: true });
});

app.use('/api', (_req, res) => res.status(404).json({ ok: false, error: 'not_found' }));

if (isProd) {
  app.use(express.static(CLIENT_DIST, { maxAge: '7d', index: false }));
  app.get('*', (_req, res) => res.sendFile(path.join(CLIENT_DIST, 'index.html')));
}

app.listen(PORT, () => {
  console.log(`Dawodia Holding server listening on http://localhost:${PORT}`);
});
