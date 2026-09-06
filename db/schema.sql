-- ============================================================
-- Undangan Digital — Database schema (PostgreSQL)
-- Apply: psql "$DATABASE_URL" -f db/schema.sql
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS invitations (
  uid            TEXT PRIMARY KEY,
  title          TEXT NOT NULL DEFAULT '',
  description    TEXT NOT NULL DEFAULT '',
  groom_name     TEXT NOT NULL DEFAULT '',
  bride_name     TEXT NOT NULL DEFAULT '',
  parent_groom   TEXT NOT NULL DEFAULT '',
  parent_bride   TEXT NOT NULL DEFAULT '',
  wedding_date   DATE,
  time           TEXT,
  location       TEXT,
  address        TEXT,
  maps_url       TEXT,
  maps_embed     TEXT,
  og_image       TEXT NOT NULL DEFAULT '',
  favicon        TEXT NOT NULL DEFAULT '/favicon.svg',
  audio          JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS wishes (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invitation_uid  TEXT NOT NULL REFERENCES invitations(uid) ON DELETE CASCADE,
  name            TEXT NOT NULL,
  message         TEXT NOT NULL,
  attendance      TEXT NOT NULL DEFAULT 'ATTENDING'
                  CHECK (attendance IN ('ATTENDING', 'NOT_ATTENDING', 'MAYBE')),
  edit_token      UUID NOT NULL DEFAULT gen_random_uuid(),
  created_at      TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT wishes_invitation_name_key UNIQUE (invitation_uid, name)
);

CREATE INDEX IF NOT EXISTS wishes_invitation_created_idx
  ON wishes (invitation_uid, created_at DESC);

CREATE TABLE IF NOT EXISTS agenda (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invitation_uid  TEXT NOT NULL REFERENCES invitations(uid) ON DELETE CASCADE,
  title           TEXT NOT NULL DEFAULT '',
  date            DATE,
  start_time      TEXT,
  end_time        TEXT,
  location        TEXT,
  address         TEXT,
  order_index     INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS banks (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  invitation_uid  TEXT NOT NULL REFERENCES invitations(uid) ON DELETE CASCADE,
  bank            TEXT NOT NULL DEFAULT '',
  account_number  TEXT NOT NULL DEFAULT '',
  account_name    TEXT NOT NULL DEFAULT '',
  order_index     INTEGER NOT NULL DEFAULT 0
);

-- ============================================================
-- Seed data untuk undangan default (uid: rizal-rema-2026)
-- ============================================================

INSERT INTO invitations (
  uid, title, description, groom_name, bride_name, parent_groom, parent_bride,
  wedding_date, time, location, address, maps_url, maps_embed,
  og_image, favicon, audio
)
VALUES (
  'rizal-rema-2026',
  'Pernikahan Rizal & Rema',
  'Kami akan menikah dan mengundang Anda untuk turut merayakan momen istimewa ini.',
  'Rizal', 'Rema',
  'Bapak Rizal & Ibu Rizal',
  'Bapak Rema & Ibu Rema',
  '2026-10-09',
  '10:00 - 13:00 WIB',
  'Tempat Pernikahan Rizal & Rema',
  'Alamat Pernikahan Rizal & Rema',
  'https://goo.gl/maps/qG9TGTTYi42X5KG47',
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.0000000000005!2d106.8270733147699!3d-6.175392995514422!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f4f1b6d7b1e7%3A0x2e69f4f1b6d7b1e7!2sMonumen%20Nasional!5e0!3m2!1sid!2sid!4v1633666820004!5m2!1sid!2sid',
  '',
  '/favicon.svg',
  '{"src": "/audio/i-wanna-grow-old.mp3", "title": "I Wanna Grow Old", "autoplay": true, "loop": true}'::jsonb
)
ON CONFLICT (uid) DO NOTHING;

INSERT INTO agenda (invitation_uid, title, date, start_time, end_time, location, address, order_index)
VALUES
  ('rizal-rema-2026', 'Akad Nikah', '2026-10-09', '10:00', '11:00',
   'Tempat Pernikahan Rizal & Rema', 'Alamat Pernikahan Rizal & Rema', 0),
  ('rizal-rema-2026', 'Resepsi Nikah', '2026-10-09', '11:00', '13:00',
   'Tempat Pernikahan Rizal & Rema', 'Alamat Pernikahan Rizal & Rema', 1)
ON CONFLICT DO NOTHING;

INSERT INTO banks (invitation_uid, bank, account_number, account_name, order_index)
VALUES
  ('rizal-rema-2026', 'Bank Central Asia', '1234567890', 'FULAN', 0),
  ('rizal-rema-2026', 'Bank Mandiri', '0987654321', 'FULANA', 1)
ON CONFLICT DO NOTHING;