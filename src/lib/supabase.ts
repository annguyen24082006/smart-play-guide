import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ||
  'https://lyqhjtfwufuchlttipax.supabase.co';

const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'sb_publishable_myyEWjZZMj7cJZfUiSK2sg_aHlHAhD7';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
