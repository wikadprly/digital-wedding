-- ============================================================
-- Undangan Digital — Database schema (PostgreSQL / Neon)
-- ============================================================
-- Data undangan DIKELOLA di config/config.js (statis, dibundel saat build).
-- Database ini HANYA dipakai untuk fitur ucapan & RSVP (tabel wishes).
--
-- Cara pakai di Neon:
-- 1. Buat project di https://neon.tech → copy connection string "Pooled".
-- 2. Copy isi file ini ke SQL Editor Neon lalu Run.
--    (atau via terminal:  psql "$DATABASE_URL" -f db/schema.sql)
-- ============================================================

CREATE EXTENSION IF NOT EXISTS pgcrypto;

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

CREATE INDEX IF NOT EXISTS wishes_invitation_created_idx
  ON wishes (invitation_uid, created_at DESC);

-- ------------------------------------------------------------
-- Penghitung rate limit berbasis database.
-- Key unik (mis. "wish:<uid>:ip:<ip>" atau "wish:<uid>:name:<name>").
-- Bersifat atomik (INSERT ... ON CONFLICT DO UPDATE), aman dipakai
-- lintas instance serverless tanpa state di memori.
-- ------------------------------------------------------------
CREATE TABLE IF NOT EXISTS rate_limits (
  key         TEXT PRIMARY KEY,
  count       INTEGER NOT NULL DEFAULT 1,
  reset_at    TIMESTAMPTZ NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);