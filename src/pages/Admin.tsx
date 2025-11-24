import { useEffect, useState } from "react";
import "../SASS/pages/admin.scss";
import { supabase, getCurrentUserWithRole } from "../lib/supabase";
import type { TripRow } from "../lib/supabaseTripsAdmin";
import { listTripsAdmin, createTripAdmin, updateTripAdmin, deleteTripAdmin } from "../lib/supabaseTripsAdmin";
import { uploadMedia } from "../lib/supabaseStorage";

export default function Admin() {
  const [rows, setRows] = useState<TripRow[]>([]);
  const [drafts, setDrafts] = useState<Record<string, Partial<TripRow>>>({});
  const [newTrip, setNewTrip] = useState<Partial<TripRow>>({ title: "", subtitle: "", media_url: "" });
  const [err, setErr] = useState<string | null>(null);
  const [role, setRole] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    (async () => {
      const me = await getCurrentUserWithRole();
      setRole(me?.role);
      const data = await listTripsAdmin();
      setRows(data);
      setLoading(false);
    })();
  }, []);

  function onEdit(id: number, patch: Partial<TripRow>) {
    setDrafts((d) => ({ ...d, [id]: { ...(d[id] || rows.find(r => r.id === id) || {}), ...patch } }));
  }

  async function save(id: number) {
    setErr(null);
    try {
      const patch = drafts[id];
      if (!patch) return;
      await updateTripAdmin(id, patch);
      setDrafts((d) => { const n = { ...d }; delete n[id]; return n; });
      setRows(await listTripsAdmin());
    } catch (e: any) {
      setErr(e.message);
    }
  }

  async function remove(id: number) {
    if (!confirm("Supprimer ce trip ?")) return;
    try {
      await deleteTripAdmin(id);
      setRows(await listTripsAdmin());
    } catch (e: any) { setErr(e.message); }
  }

  async function create() {
    setErr(null);
    try {
      if (!newTrip.title) throw new Error("Titre requis");
      await createTripAdmin(newTrip);
      setNewTrip({ title: "", subtitle: "", media_url: "" });
      setRows(await listTripsAdmin());
    } catch (e: any) { setErr(e.message); }
  }

  async function handleFileUpload(file: File) {
    setUploading(true);
    setErr(null);
    try {
      const url = await uploadMedia(file, 'trips');
      setNewTrip(t => ({ ...t, media_url: url }));
    } catch (e: any) {
      setErr(e.message);
    } finally {
      setUploading(false);
    }
  }

  if (!supabase) return <div>Supabase non configuré.</div>;
  if (loading) return <div>Chargement...</div>;
  if (role?.toLowerCase() !== 'admin') return <div>Accès refusé (admin requis).</div>;

  return (
    <div className="admin">
      <h1>Admin Trips</h1>
      {err && <div className="form-error" role="alert">{err}</div>}
      <section>
        <h2>Créer</h2>
        <div className="trip-row new">
          <input placeholder="Titre" value={newTrip.title || ''} onChange={e => setNewTrip(t => ({ ...t, title: e.target.value }))} />
          <input placeholder="Sous-titre" value={newTrip.subtitle || ''} onChange={e => setNewTrip(t => ({ ...t, subtitle: e.target.value }))} />
          <input placeholder="URL media" value={newTrip.media_url || ''} onChange={e => setNewTrip(t => ({ ...t, media_url: e.target.value }))} />
          <label className="file-upload">
            📤 Upload
            <input type="file" accept="image/*" onChange={e => e.target.files && handleFileUpload(e.target.files[0])} style={{ display: 'none' }} />
          </label>
          {uploading && <span>Upload...</span>}
          <button onClick={create} disabled={uploading}>Ajouter</button>
        </div>
      </section>
      <section>
        <h2>Liste</h2>
        <div className="trips">
          {rows.map(r => {
            const draft = drafts[r.id] || r;
            return (
              <div key={r.id} className="trip-row">
                <input value={draft.title || ''} onChange={e => onEdit(r.id, { title: e.target.value })} />
                <input value={draft.subtitle || ''} onChange={e => onEdit(r.id, { subtitle: e.target.value })} />
                <input value={draft.media_url || ''} onChange={e => onEdit(r.id, { media_url: e.target.value })} />
                <button onClick={() => save(r.id)} disabled={!drafts[r.id]}>Sauver</button>
                <button className="danger" onClick={() => remove(r.id)}>Supprimer</button>
              </div>
            );
          })}
          {rows.length === 0 && <div>Aucun trip.</div>}
        </div>
      </section>
    </div>
  );
}
