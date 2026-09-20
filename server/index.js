import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDb } from './db.js';
import { seedDatabase } from './seed.js';

import bookingsRouter from './routes/bookings.js';
import menuRouter from './routes/menu.js';
import testimonialsRouter from './routes/testimonials.js';
import settingsRouter from './routes/settings.js';
import eventsRouter from './routes/events.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5050;


// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/bookings', bookingsRouter);
app.use('/api/menu', menuRouter);
app.use('/api/testimonials', testimonialsRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/events', eventsRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Aura & Bean Cafe API Service',
    database: 'PostgreSQL (aurabean_db)',
    timestamp: new Date().toISOString()
  });
});

// DB initialization flag for serverless environments
let dbInitialized = false;
export async function ensureDbReady() {
  if (!dbInitialized) {
    try {
      await initDb();
      await seedDatabase();
      dbInitialized = true;
    } catch (e) {
      console.error('DB initialization error:', e.message);
    }
  }
}

// Middleware to ensure DB is initialized on cold starts
app.use(async (req, res, next) => {
  if (!dbInitialized && req.path.startsWith('/api')) {
    await ensureDbReady();
  }
  next();
});

// Start Server & Initialize Database (when running as standalone server)
async function startServer() {
  try {
    await ensureDbReady();

    app.listen(PORT, () => {
      console.log(`================================================`);
      console.log(`🚀 Aura & Bean Cafe Backend API Server Running`);
      console.log(`📡 URL: http://localhost:${PORT}`);
      console.log(`🐘 Database: PostgreSQL (${process.env.PGDATABASE || 'aurabean_db'})`);
      console.log(`================================================`);
    });
  } catch (err) {
    console.error('Fatal: Failed to start backend server:', err);
    process.exit(1);
  }
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;
