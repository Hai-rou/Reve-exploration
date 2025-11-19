import { useEffect, useMemo, useState } from "react";
import "../SASS/pages/admin.scss";

type TripDoc = {
  _id: string;
  mediaUrl: string;
  mediaAlt?: string;
  title: string;
  subtitle?: string;
};

type MediaFile = { name: string; url: string };

export default function Admin() {
  const [trips, setTrips] = useState<TripDoc[]>([]);
  const [editing, setEditing] = useState<Record<string, TripDoc>>({});
  const [media, setMedia] = useState<MediaFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function loadTrips() {
    const r = await fetch("/api/trips", { credentials: "include" });
    if (!r.ok) return;
    const j = await r.json();
    setTrips(j);
  }
  async function loadMedia() {
    const r = await fetch("/api/media", { credentials: "include" });
    if (!r.ok) return;
    const j = await r.json();
    setMedia(j);
  }

  useEffect(() => {
    loadTrips();
    loadMedia();
  }, []);

  function onEdit(id: string, patch: Partial<TripDoc>) {
    setEditing((s) => ({ ...s, [id]: { ...(s[id] || trips.find(t => t._id === id)!), ...patch } }));
  }

  async function saveTrip(id: string) {
    setErr(null);
    const body = editing[id];
    if (!body) return;
    const r = await fetch(`/api/trips/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
    });
    if (!r.ok) {
      const j = await r.json().catch(() => ({}));
      setErr(j.error || "Échec mise à jour");
      return;
    }
    setEditing((s) => { const n = { ...s }; delete n[id]; return n; });
    loadTrips();
  }

  async function deleteTrip(id: string) {
    if (!confirm("Supprimer ce trip ?")) return;
    await fetch(`/api/trips/${id}`, { method: "DELETE", credentials: "include" });
    loadTrips();
  }

  async function uploadFile(file: File) {
    setUploading(true); setErr(null);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const r = await fetch("/api/media/upload", { method: "POST", credentials: "include", body: fd });
      if (!r.ok) throw new Error("Upload échoué");
      await loadMedia();
    } catch (e: any) {
      setErr(e.message);
    } finally { setUploading(false); }
  }

  const rows = useMemo(() => trips.map((t) => editing[t._id] || t), [trips, editing]);

  return (
    <div className="admin">
      <h1>Admin</h1>
      {err && <div className="form-error" role="alert">{err}</div>}

      <section>
        <h2>Images</h2>
        <div className="upload">
          <input type="file" accept="image/*" onChange={(e) => e.target.files && uploadFile(e.target.files[0])} />
          {uploading && <span>Envoi...</span>}
        </div>
        <div className="media-grid">
          {media.map((m) => (
            <figure key={m.name}>
              <img src={m.url} alt={m.name} />
              <figcaption>{m.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section>
        <h2>Trips</h2>
        <div className="trips">
          {rows.map((t) => (
            <div key={t._id} className="trip-row">
              <input value={t.title} onChange={(e) => onEdit(t._id, { title: e.target.value })} />
              <input value={t.subtitle || ""} onChange={(e) => onEdit(t._id, { subtitle: e.target.value })} />
              <input value={t.mediaUrl} onChange={(e) => onEdit(t._id, { mediaUrl: e.target.value })} />
              <button onClick={() => saveTrip(t._id)}>Sauver</button>
              <button className="danger" onClick={() => deleteTrip(t._id)}>Supprimer</button>
            </div>
          ))}
          {rows.length === 0 && <div>Aucun trip encore en base.</div>}
        </div>
      </section>
    </div>
  );
}
