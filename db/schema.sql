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
  og_image        TEXT NOT NULL DEFAULT '',
  favicon        TEXT NOT NULL DEFAULT '/favicon.svg',
  audio          JSONB NOT NULL DEFAULT '{}'::jsonb,
  gift_address   JSONB NOT NULL DEFAULT '{}'::jsonb,
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
-- Seed data default (uid: rizal-rema-2026)
-- Sumber data tunggal: config/config.js
-- Terapkan dengan: npm run seed
-- ============================================================