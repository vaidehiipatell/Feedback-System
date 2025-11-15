import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import connectDB from './config/db.js';
import feedbackRoutes from './routes/feedbackRoutes.js';

dotenv.config();

const app = express();

// Security & middleware
app.use(helmet());
app.use(express.json({ limit: '1mb' }));

// CORS: permissive in development, allowlist in production
if (process.env.NODE_ENV !== 'production') {
  app.use(cors({ origin: true, credentials: true }));
} else {
  const allowedOrigins = (process.env.CORS_ORIGIN || '*')
    .split(',')
    .map(o => o.trim())
    .filter(Boolean);
  const localhostRegex = /^https?:\/\/(localhost|127\.0\.0\.1)(:\\d+)?$/;
  const corsOptions = {
    origin: (origin, cb) => {
      const isLocal = !!origin && localhostRegex.test(origin);
      if (!origin || isLocal || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
        return cb(null, true);
      }
      return cb(new Error('Not allowed by CORS'));
    },
    credentials: true,
  };
  app.options('*', cors(corsOptions));
  app.use(cors(corsOptions));
}

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', env: process.env.NODE_ENV || 'development' });
});

// Routes
app.use('/api', feedbackRoutes);

// Global error handler
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  const code = err.status || 500;
  res.status(code).json({ success: false, message: err.message || 'Server Error' });
});

const BASE_PORT = Number(process.env.PORT) || 5000;

function startServer(startPort, attemptsLeft = 5) {
  if (attemptsLeft <= 0) {
    console.error('Could not bind to a free port. Exiting.');
    process.exit(1);
  }
  const server = app
    .listen(startPort, () => console.log(`Server running on port ${startPort}`))
    .on('error', (err) => {
      if (err && err.code === 'EADDRINUSE') {
        const nextPort = startPort + 1;
        console.warn(`Port ${startPort} in use, trying ${nextPort}...`);
        startServer(nextPort, attemptsLeft - 1);
      } else {
        console.error('Server error:', err);
        process.exit(1);
      }
    });
  return server;
}

// Start server after DB connection
connectDB()
  .then(() => {
    startServer(BASE_PORT);
  })
  .catch((err) => {
    console.error('Failed to connect DB', err);
    process.exit(1);
  });

export default app;
