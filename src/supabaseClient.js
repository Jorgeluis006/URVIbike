import { createClient } from '@supabase/supabase-js'

// Configuración de Supabase
// 1) En producción (Vercel) se leen desde variables de entorno
// 2) En local, puedes crear un archivo .env.local con VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://yxboexkmzxgsredujakp.supabase.co'
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4Ym9leGttenhnc3JlZHVqYWtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MzYzMjQsImV4cCI6MjA3NjIxMjMyNH0.HoYEXnNYW5N8bmKVkZycpn-ccYpT8QMGu5du0wc0JMY'

if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
	// Aviso para el entorno local; en Vercel ya estarán definidas
	console.warn('[Supabase] Usando valores por defecto del repositorio. Se recomienda moverlos a variables de entorno (.env.local y Vercel).')
}

export const supabase = createClient(supabaseUrl, supabaseKey)
