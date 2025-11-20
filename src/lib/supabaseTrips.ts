import { supabase } from './supabase';
import type { Trip } from '../types/trip';

// Schéma attendu côté Supabase (table trips):
// id uuid (primary key, default gen_random_uuid())
// title text
// subtitle text
// media_url text
// media_alt text
// badge text
// facts jsonb   (array of {icon,text})
// highlights jsonb (array of string)
// itinerary jsonb (array of {side,title,subtitle,modalTitle,modalText})
// includes jsonb (array of string)
// note text
// cta_label text
// role_access text NULL (optionnel pour filtrer admin-only)

export async function fetchTripsSupabase(): Promise<Trip[] | null> {
  if (!supabase) return null;
  const { data, error } = await supabase
    .from('trips')
    .select('*')
    .order('title');
  if (error) return null;
  return (data || []).map(row => ({
    mediaUrl: row.media_url,
    mediaAlt: row.media_alt,
    badge: row.badge,
    title: row.title,
    subtitle: row.subtitle,
    facts: row.facts || [],
    highlights: row.highlights || [],
    itinerary: row.itinerary || [],
    includes: row.includes || [],
    note: row.note,
    ctaLabel: row.cta_label
  })) as Trip[];
}
