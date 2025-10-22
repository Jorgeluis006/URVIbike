import { createClient } from '@supabase/supabase-js'

// Configuración de Supabase
const supabaseUrl = 'https://yxboexkmzxgsredujakp.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl4Ym9leGttenhnc3JlZHVqYWtwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MzYzMjQsImV4cCI6MjA3NjIxMjMyNH0.HoYEXnNYW5N8bmKVkZycpn-ccYpT8QMGu5du0wc0JMY'

export const supabase = createClient(supabaseUrl, supabaseKey)
