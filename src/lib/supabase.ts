import { createClient } from '@supabase/supabase-js'

// REPLACE THESE WITH YOUR PROJECT CREDENTIALS IF YOU DON'T HAVE A .ENV YET
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://YOUR_PROJECT_ID.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_ANON_KEY'

if (!import.meta.env.VITE_SUPABASE_URL) {
    console.warn('⚠️ Supabase URL not found. Using placeholder.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
