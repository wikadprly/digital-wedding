import { fileURLToPath } from "node:url";
import path from "node:path";
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

  await client.query(`
    CREATE TABLE IF NOT EXISTS wishes (
      id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      invitation_uid  TEXT NOT NULL,
      name            TEXT NOT NULL,
      message         TEXT NOT NULL,
      attendance      TEXT NOT NULL DEFAULT 'ATTENDING'
                      CHECK (attendance IN ('ATTENDING', 'NOT_ATTENDING', 'MAYBE')),
      edit_token      UUID NOT NULL DEFAULT gen_random_uuid(),
      created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
      CONSTRAINT wishes_invitation_name_key UNIQUE (invitation_uid, name)
    );
  `);

  await client.query(`
    CREATE INDEX IF NOT EXISTS wishes_invitation_created_idx
      ON wishes (invitation_uid, created_at DESC);
  `);

  console.log("Database ready: tabel `wishes` sudah ada.");
  await client.end();
}

main().catch((error) => {
  console.error("Seed error:", error.message);
  process.exit(1);
});