// Cliente Supabase — só é criado se as variáveis de ambiente existirem.
// Sem elas, o ranking fica desligado e o resto do app funciona normal.
import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase: SupabaseClient | null =
  url && key
    ? createClient(url, key, {
        auth: { persistSession: true, autoRefreshToken: true },
      })
    : null

export const rankingEnabled = !!supabase
