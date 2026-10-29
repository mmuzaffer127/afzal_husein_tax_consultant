import dotenv from 'dotenv';
import path from 'path';

import fs from 'fs';

const rootEnv = path.resolve(__dirname, '../../../.env');
const serverEnv = path.resolve(__dirname, '../../.env');

if (fs.existsSync(rootEnv)) {
  dotenv.config({ path: rootEnv });
}
if (fs.existsSync(serverEnv)) {
  dotenv.config({ path: serverEnv, override: true });
}

interface Config {
  port: number;
  nodeEnv: string;
  databaseUrl: string;
  sessionSecret: string;
  clientUrl: string;
  initialAdminEmail: string;
  initialAdminPassword: string;
  geminiApiKey: string | undefined;
  supabaseUrl: string | undefined;
  supabaseAnonKey: string | undefined;
  supabaseServiceRoleKey: string | undefined;
}

function getEnv(key: string, fallback?: string): string {
  const value = process.env[key] || fallback;
  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
  return value;
}

export const config: Config = {
  port: parseInt(process.env.PORT || '5000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  databaseUrl: getEnv('DATABASE_URL', 'postgresql://localhost:5432/afzal_husein_db'),
  sessionSecret: getEnv('SESSION_SECRET', 'dev-secret-change-in-production'),
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  initialAdminEmail: process.env.INITIAL_ADMIN_EMAIL || '',
  initialAdminPassword: process.env.INITIAL_ADMIN_PASSWORD || '',
  geminiApiKey: process.env.GEMINI_API_KEY,
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseAnonKey: process.env.SUPABASE_ANON_KEY,
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY,
};

export const isProduction = config.nodeEnv === 'production';
