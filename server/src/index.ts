import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
import { config, isProduction } from './utils/config';
import pool, { testConnection, isDbConnected } from './database/pool';
import { runMigrations } from './database/migrate';
import publicRoutes from './routes/publicRoutes';
import adminRoutes from './routes/adminRoutes';
import chatRoutes from './routes/chatRoutes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';

const app = express();

// --- Security headers ---
app.use(helmet({
  contentSecurityPolicy: false, // Let frontend handle CSP
  crossOriginEmbedderPolicy: false,
}));

// --- CORS ---
app.use(cors({
  origin: config.clientUrl,
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// --- Body parsing ---
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// --- Session ---
const isDbConfigured = !config.databaseUrl.includes('[YOUR_SUPABASE_DB_PASSWORD]');
const sessionStore = isDbConfigured
  ? new (connectPgSimple(session))({
      pool: pool,
      tableName: 'session',
      createTableIfMissing: true,
      errorLog: (err) => console.warn('Session store warning:', err.message),
    })
  : undefined;

app.use(session({
  store: sessionStore,
  secret: config.sessionSecret,
  resave: false,
  saveUninitialized: false,
  name: 'ahm.sid',
  cookie: {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? 'none' : 'lax',
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
}));

// Trust proxy in production (for Vercel, Railway, etc.)
if (isProduction) {
  app.set('trust proxy', 1);
}

// --- Routes ---
// Health check
app.get('/api/health', (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      database: isDbConnected() ? 'connected_postgresql' : 'active_local_fallback',
      timestamp: new Date().toISOString(),
    },
  });
});

// Public routes
app.use('/api/enquiries', publicRoutes);
app.use('/api/chat', chatRoutes);

// Admin routes
app.use('/api/admin', adminRoutes);

// --- Error handling ---
app.use('/api/*', notFoundHandler);
app.use(errorHandler);

// --- Start server ---
async function start() {
  let dbStatus = 'Not connected (Awaiting Supabase DB password in .env)';

  if (isDbConfigured) {
    try {
      await testConnection();
      await runMigrations();
      dbStatus = 'Connected (PostgreSQL / Supabase)';
    } catch (error) {
      console.warn('⚠️ Database connection warning:', (error as Error).message);
      dbStatus = 'Connection failed (Check DATABASE_URL credentials)';
    }
  } else {
    console.log('ℹ️ Note: Set your Supabase database password in .env to connect to PostgreSQL.');
  }

  app.listen(config.port, () => {
    console.log(`\n✓ Afzal Husein Backend running on port ${config.port}`);
    console.log(`  Environment: ${config.nodeEnv}`);
    console.log(`  Database: ${dbStatus}`);
    console.log(`  Gemini AI: ${config.geminiApiKey ? 'API Key Configured' : 'Knowledge Base Fallback (Awaiting GEMINI_API_KEY)'}`);
    console.log(`  Client URL: ${config.clientUrl}`);
    console.log(`  API Base: http://localhost:${config.port}/api\n`);
  });
}

start();

export default app;
