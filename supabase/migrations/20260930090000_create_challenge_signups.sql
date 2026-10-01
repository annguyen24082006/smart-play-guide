/*
# challenge_signups: gia đình đăng ký nhận thông báo challenge hằng ngày
- family_name, email, phone (Zalo/SĐT), notify_ok (đồng ý nhận thông báo)
- RLS: anon chỉ được INSERT. Đội ngũ xem dữ liệu trong Supabase Dashboard.
*/
CREATE TABLE IF NOT EXISTS challenge_signups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  family_name text NOT NULL,
  email text,
  phone text,
  notify_ok boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);
ALTER TABLE challenge_signups ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "anon_insert_signups" ON challenge_signups;
CREATE POLICY "anon_insert_signups" ON challenge_signups FOR INSERT
  TO anon, authenticated WITH CHECK (true);
