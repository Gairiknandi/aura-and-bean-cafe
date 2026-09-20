import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const pool = new Pool({
  host: process.env.PGHOST || 'localhost',
  port: parseInt(process.env.PGPORT || '5432', 10),
  database: process.env.PGDATABASE || 'aurabean_db',
  user: process.env.PGUSER || process.env.USER || 'postgres',
  password: process.env.PGPASSWORD || undefined
});

export async function initDb() {
  try {
    const client = await pool.connect();
    try {
      const schemaPath = path.join(__dirname, 'schema.sql');
      const schemaSql = fs.readFileSync(schemaPath, 'utf8');
      await client.query(schemaSql);
      console.log('✓ PostgreSQL tables verified / initialized successfully.');
    } finally {
      client.release();
    }
  } catch (err) {
    console.error('Error initializing PostgreSQL schema:', err.message);
    throw err;
  }
}
