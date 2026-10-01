/*
# Create challenge-photos storage bucket (retry, policies idempotent)

1. Storage
- Create public bucket "challenge-photos" for user-uploaded challenge photos.
- Set public read and write access via storage policies.
*/

INSERT INTO storage.buckets (id, name, public)
VALUES ('challenge-photos', 'challenge-photos', true)
ON CONFLICT (id) DO NOTHING;

DO $$
BEGIN
  -- Drop existing policies if they exist, then create fresh
  BEGIN DROP POLICY IF EXISTS "Public read access for challenge-photos" ON storage.objects; END;
  BEGIN DROP POLICY IF EXISTS "Public upload access for challenge-photos" ON storage.objects; END;
  BEGIN DROP POLICY IF EXISTS "Public delete access for challenge-photos" ON storage.objects; END;
END$$;

CREATE POLICY "Public read access for challenge-photos"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'challenge-photos');

CREATE POLICY "Public upload access for challenge-photos"
ON storage.objects FOR INSERT
TO anon, authenticated
WITH CHECK (bucket_id = 'challenge-photos');

CREATE POLICY "Public delete access for challenge-photos"
ON storage.objects FOR DELETE
TO anon, authenticated
USING (bucket_id = 'challenge-photos');
