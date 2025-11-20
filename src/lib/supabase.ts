import { createClient } from '@supabase/supabase-js';

// Les variables doivent être définies dans Vite (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

// Exporte null si non configuré pour permettre un fallback vers l'API Express existante
export const supabase = (supabaseUrl && supabaseAnon)
  ? createClient(supabaseUrl, supabaseAnon, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      }
    })
  : null;

export async function supabaseLogin(email: string, password: string) {
  if (!supabase) throw new Error('Supabase non configuré');
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  return data.session;
}

export async function supabaseLogout() {
  if (!supabase) return;
  await supabase.auth.signOut();
}

export async function getCurrentUserWithRole(): Promise<{ email: string; role?: string } | null> {
  if (!supabase) return null;
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return null;
  // Récupération du profil (table profiles) si existant
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  return { email: user.email || '', role: profile?.role };
}
