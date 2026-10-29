import { Pool } from 'pg';
import { config } from '../utils/config';

const isRemoteDb =
  config.databaseUrl.includes('supabase.co') ||
  config.databaseUrl.includes('pooler.supabase.com') ||
  config.databaseUrl.includes('sslmode=require') ||
  config.nodeEnv === 'production';

export const pool = new Pool({
  connectionString: config.databaseUrl,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
  ssl: isRemoteDb ? { rejectUnauthorized: false } : false,
});

pool.on('error', (err) => {
  console.error('Unexpected database pool error:', err.message);
});

let dbConnected = false;

export function setDbConnected(status: boolean) {
  dbConnected = status;
}

export function isDbConnected(): boolean {
  return dbConnected;
}

export async function testConnection(): Promise<void> {
  try {
    const client = await pool.connect();
    await client.query('SELECT NOW()');
    client.release();
    dbConnected = true;
    console.log('✓ Database connected successfully');
  } catch (error) {
    dbConnected = false;
    console.error('✗ Database connection failed:', (error as Error).message);
    throw error;
  }
}

export async function query(text: string, params?: unknown[]) {
  return pool.query(text, params);
}

export default pool;
