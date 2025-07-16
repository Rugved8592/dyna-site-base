import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://abcdxyz.supabase.co'; // https://kkepqwkrsptyysrzuhwy.supabase.co
const supabaseAnonKey = 'eyJhbGciOiJIUz...'; // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtrZXBxd2tyc3B0eXlzcnp1aHd5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NjQ5NzcsImV4cCI6MjA2ODI0MDk3N30.vL0ta0_scUQTpMiIykZHUjSMUjPmK7XD5_xadVugUZM

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
