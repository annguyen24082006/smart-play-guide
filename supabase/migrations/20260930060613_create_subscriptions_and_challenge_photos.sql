/*
# Create email subscriptions and challenge photos tables (single-tenant, no auth)

1. New Tables
- `email_subscriptions`: stores visitor email addresses who want to be notified
  about new posts and challenge material prep.
  - `id` (uuid, primary key)
  - `email` (text, unique, not null)
  - `created_at` (timestamptz, default now())
- `challenge_photos`: stores user-submitted photos for the 14-day challenge.
  - `id` (uuid, primary key)
  - `day_number` (integer, 1-14, not null)
  - `participant_name` (text, not null)
  - `photo_url` (text, not null)
  - `caption` (text, nullable)
  - `created_at` (timestamptz, default now())
2. Security
- Enable RLS on both tables.
- Allow anon + authenticated CRUD because this is a public/shared single-tenant app.
- All data is intentionally public.
*/

CREATE TABLE IF NOT EXISTS email_subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE email_subscriptions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_subscriptions" ON email_subscriptions;
CREATE POLICY "anon_select_subscriptions" ON email_subscriptions FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_subscriptions" ON email_subscriptions;
CREATE POLICY "anon_insert_subscriptions" ON email_subscriptions FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_subscriptions" ON email_subscriptions;
CREATE POLICY "anon_delete_subscriptions" ON email_subscriptions FOR DELETE
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS challenge_photos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  day_number integer NOT NULL CHECK (day_number >= 1 AND day_number <= 14),
  participant_name text NOT NULL,
  photo_url text NOT NULL,
  caption text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE challenge_photos ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_photos" ON challenge_photos;
CREATE POLICY "anon_select_photos" ON challenge_photos FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_photos" ON challenge_photos;
CREATE POLICY "anon_insert_photos" ON challenge_photos FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_photos" ON challenge_photos;
CREATE POLICY "anon_update_photos" ON challenge_photos FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_photos" ON challenge_photos;
CREATE POLICY "anon_delete_photos" ON challenge_photos FOR DELETE
  TO anon, authenticated USING (true);
