import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.POSTGRES_URL) {
  throw new Error('POSTGRES_URL environment variable is not set');
}

// Configure postgres client for Supabase connection pooler in serverless (Vercel)
export const client = postgres(process.env.POSTGRES_URL, {
  // Supabase pooler uses PgBouncer in transaction mode - prepare MUST be false
  prepare: false,
  // Limit connections per serverless function
  max: 1,
  // Close idle connections quickly in serverless environment
  idle_timeout: 20,
  // Connection lifetime
  max_lifetime: 60 * 30, // 30 minutes
});

export const db = drizzle(client, { schema });
