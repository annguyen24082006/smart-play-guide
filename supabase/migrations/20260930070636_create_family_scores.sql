/*
# Create family_scores table for leaderboard (single-tenant, no auth)

1. New Tables
- `family_scores`: tracks each family's challenge points.
  - `id` (uuid, primary key)
  - `family_name` (text, unique, not null) — displayed name for the family
  - `score` (integer, default 0) — 10 points per successful photo upload
  - `photos_count` (integer, default 0) — total approved uploads
  - `created_at` (timestamptz, default now())
  - `updated_at` (timestamptz, default now())
2. Security
- Enable RLS on family_scores.
- Allow anon + authenticated full CRUD (public single-tenant app).
*/

CREATE TABLE IF NOT EXISTS family_scores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  family_name text UNIQUE NOT NULL,
  score integer NOT NULL DEFAULT 0,
  photos_count integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE family_scores ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_family_scores" ON family_scores;
CREATE POLICY "anon_select_family_scores" ON family_scores FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_family_scores" ON family_scores;
CREATE POLICY "anon_insert_family_scores" ON family_scores FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_family_scores" ON family_scores;
CREATE POLICY "anon_update_family_scores" ON family_scores FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_family_scores" ON family_scores;
CREATE POLICY "anon_delete_family_scores" ON family_scores FOR DELETE
  TO anon, authenticated USING (true);
