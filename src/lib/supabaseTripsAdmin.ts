import { supabase } from './supabase';

export type TripRow = {
  id: string;
  title: string;
  subtitle?: string;
  media_url?: string;
  media_alt?: string;
  badge?: string;
  cta_label?: string;
};

export async function listTripsAdmin(): Promise<TripRow[]> {
  if (!supabase) return [];
  const { data, error } = await supabase.from('trips').select('id,title,subtitle,media_url,media_alt,badge,cta_label').order('title');
  if (error) return [];
  return data as TripRow[];
}

export async function updateTripAdmin(id: string, patch: Partial<TripRow>) {
  if (!supabase) throw new Error('Supabase non configuré');
  const { error } = await supabase.from('trips').update(patch).eq('id', id);
  if (error) throw new Error(error.message);
}

export async function deleteTripAdmin(id: string) {
  if (!supabase) throw new Error('Supabase non configuré');
  const { error } = await supabase.from('trips').delete().eq('id', id);
  if (error) throw new Error(error.message);
}

export async function createTripAdmin(data: Partial<TripRow>) {
  if (!supabase) throw new Error('Supabase non configuré');
  const { error } = await supabase.from('trips').insert(data);
  if (error) throw new Error(error.message);
}
