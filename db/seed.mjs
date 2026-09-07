import { fileURLToPath } from "node:url";
import path from "node:path";
import pg from "pg";
import config from "../config/config.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

if (typeof process.loadEnvFile === "function") {
  try {
    process.loadEnvFile(path.join(__dirname, "..", ".env"));
  } catch {}
}

const { Client } = pg;
const client = new Client({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://postgres:wikacantik@localhost:5432/digital_wedding",
});

const d = config.data;
const UID = "rizal-rema-2026";

async function main() {
  await client.connect();

  await client.query(`
    ALTER TABLE invitations
    ADD COLUMN IF NOT EXISTS gift_address JSONB NOT NULL DEFAULT '{}'::jsonb
  `);

  await client.query(
    `INSERT INTO invitations (uid, title, description, groom_name, bride_name, parent_groom, parent_bride, wedding_date, time, location, address, maps_url, maps_embed, og_image, favicon, audio, gift_address)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)
     ON CONFLICT (uid) DO UPDATE SET
       title=EXCLUDED.title, description=EXCLUDED.description, groom_name=EXCLUDED.groom_name,
       bride_name=EXCLUDED.bride_name, parent_groom=EXCLUDED.parent_groom, parent_bride=EXCLUDED.parent_bride,
       wedding_date=EXCLUDED.wedding_date, time=EXCLUDED.time, location=EXCLUDED.location,
       address=EXCLUDED.address, maps_url=EXCLUDED.maps_url, maps_embed=EXCLUDED.maps_embed,
       og_image=EXCLUDED.og_image, favicon=EXCLUDED.favicon, audio=EXCLUDED.audio,
       gift_address=EXCLUDED.gift_address`,
    [
      UID,
      d.title,
      d.description,
      d.groomName,
      d.brideName,
      d.parentGroom,
      d.parentBride,
      d.date,
      d.time,
      d.location,
      d.address,
      d.maps_url,
      d.maps_embed,
      d.ogImage || "",
      d.favicon || "/favicon.svg",
      JSON.stringify(d.audio || {}),
      JSON.stringify(d.giftAddress || {}),
    ],
  );

  await client.query("DELETE FROM agenda WHERE invitation_uid = $1", [UID]);
  for (let i = 0; i < (d.agenda || []).length; i++) {
    const a = d.agenda[i];
    await client.query(
      `INSERT INTO agenda (invitation_uid, title, date, start_time, end_time, location, address, order_index)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8)`,
      [UID, a.title, a.date, a.startTime, a.endTime, a.location, a.address, i],
    );
  }

  await client.query("DELETE FROM banks WHERE invitation_uid = $1", [UID]);
  for (let i = 0; i < (d.banks || []).length; i++) {
    const b = d.banks[i];
    await client.query(
      `INSERT INTO banks (invitation_uid, bank, account_number, account_name, order_index)
       VALUES ($1,$2,$3,$4,$5)`,
      [UID, b.bank, b.accountNumber, b.accountName, i],
    );
  }

  console.log(`Seeded invitation: ${UID}`);
  await client.end();
}

main().catch((error) => {
  console.error("Seed error:", error.message);
  process.exit(1);
});