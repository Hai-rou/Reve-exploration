// Base: si non défini -> même origine. On retire les slash finaux pour normaliser.
const RAW_BASE = import.meta.env.VITE_API_BASE?.trim() || "";
const BASE = RAW_BASE.replace(/\/+$/, "");

function buildUrl(path: string): string {
  // Absolu HTTP(s) déjà complet
  if (/^https?:\/\//i.test(path)) return path;
  if (BASE) {
    if (path.startsWith("/")) return BASE + path;
    return BASE + "/" + path;
  }
  // Même origine
  if (path.startsWith("/")) return path;
  return "/" + path;
}

function isFormData(body: any): body is FormData {
  return typeof FormData !== "undefined" && body instanceof FormData;
}

export async function apiFetch(path: string, options: RequestInit = {}) {
  const url = buildUrl(path);
  const headers = new Headers(options.headers || {});
  // Ajout Accept JSON par défaut si rien fourni
  if (!headers.has("Accept")) headers.set("Accept", "application/json");
  // Content-Type auto uniquement si body présent ET pas FormData ET pas déjà défini
  if (options.body && !isFormData(options.body) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  const res = await fetch(url, {
    credentials: "include",
    ...options,
    headers,
  });
  return res;
}

export async function apiJson<T = any>(path: string, options: RequestInit = {}) {
  const r = await apiFetch(path, options);
  if (!r.ok) {
    let detail: any = null;
    const ct = r.headers.get("Content-Type") || "";
    try {
      if (ct.includes("application/json")) detail = await r.json();
      else detail = await r.text();
    } catch {}
    const msg = typeof detail === "string" ? detail : detail?.error || JSON.stringify(detail) || "Erreur";
    throw new Error(`Erreur API ${r.status}: ${msg}`);
  }
  return r.json() as Promise<T>;
}
