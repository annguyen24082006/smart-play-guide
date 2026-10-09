import { createClient } from '@supabase/supabase-js';

// Thêm /rest/v1 vào URL để khớp với Data API v2 của Supabase
const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://lyqhjtfwufuchlttipax.supabase.co/rest/v1/';

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_myyEWjZZMj7cJZfUiSK2sg_aHlHAhD7';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
