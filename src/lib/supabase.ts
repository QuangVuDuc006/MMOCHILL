import { createClient } from "@supabase/supabase-js";

// Ensure env variables exist in production or local .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-key";

// Create a single supabase client for interacting with your database
export const supabase = createClient(supabaseUrl, supabaseKey);
