import { supabase } from './supabase';

const BUCKET_NAME = 'media';

/**
 * Upload un fichier dans le bucket Supabase Storage
 * @param file - Fichier à uploader
 * @param folder - Dossier cible (ex: 'trips')
 * @returns URL publique du fichier
 */
export async function uploadMedia(file: File, folder = 'trips'): Promise<string> {
  if (!supabase) throw new Error('Supabase non configuré');
  
  const timestamp = Date.now();
  const sanitized = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const path = `${folder}/${timestamp}_${sanitized}`;
  
  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false
    });
  
  if (error) throw new Error(`Upload échoué: ${error.message}`);
  
  // Récupère l'URL publique
  const { data } = supabase.storage.from(BUCKET_NAME).getPublicUrl(path);
  return data.publicUrl;
}

/**
 * Supprime un fichier du bucket
 * @param url - URL publique complète du fichier
 */
export async function deleteMedia(url: string): Promise<void> {
  if (!supabase) throw new Error('Supabase non configuré');
  
  // Extrait le chemin depuis l'URL publique
  const match = url.match(/\/storage\/v1\/object\/public\/media\/(.+)$/);
  if (!match) throw new Error('URL invalide');
  
  const path = match[1];
  const { error } = await supabase.storage.from(BUCKET_NAME).remove([path]);
  if (error) throw new Error(`Suppression échouée: ${error.message}`);
}

/**
 * Liste tous les fichiers d'un dossier
 * @param folder - Dossier à lister
 */
export async function listMedia(folder = 'trips') {
  if (!supabase) throw new Error('Supabase non configuré');
  
  const { data, error } = await supabase.storage.from(BUCKET_NAME).list(folder, {
    sortBy: { column: 'created_at', order: 'desc' }
  });
  
  if (error) throw new Error(`Listage échoué: ${error.message}`);
  return data;
}
