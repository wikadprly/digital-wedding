import { fileURLToPath } from "node:url";
import path from "node:path";
import { readFileSync } from "node:fs";
import pg from "pg";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

if (typeof process.loadEnvFile === "function") {
  try {
    process.loadEnvFile(path.join(__dirname, "..", ".env"));
  } catch {}
}

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error(
    "FATAL: DATABASE_URL is not set. Copy .env.example to .env.local and fill in your Neon connection string.",
  );
  process.exit(1);
}

const { Client } = pg;
const client = new Client({ connectionString });

async function main() {
  await client.connect();

  const schemaSql = readFileSync(path.join(__dirname, "schema.sql"), "utf-8");
  await client.query(schemaSql);

  console.log("Database ready: tabel `wishes` dan `rate_limits` sudah ada.");
  await client.end();
}

main().catch((error) => {
  console.error("Seed error:", error.message);
  process.exit(1);
});