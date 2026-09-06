import { Pool } from "pg";

const globalForDb = globalThis;

function getSslConfig(connectionString) {
  if (/sslmode=require|sslmode=verify-full|sslmode=verify-ca/i.test(connectionString)) {
    return { rejectUnauthorized: false };
  }
  return false;
}

if (!globalForDb.__pgPool) {
  const connectionString = process.env.DATABASE_URL;
  globalForDb.__pgPool = new Pool({
    connectionString,
    ssl: connectionString ? getSslConfig(connectionString) : false,
  });
}

export const pool = globalForDb.__pgPool;

export async function query(text, params) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } catch (error) {
    if (error.code === "ECONNREFUSED" || error.code === "ENOTFOUND") {
      throw new Error("Database connection failed");
    }
    throw error;
  } finally {
    client.release();
  }
}
