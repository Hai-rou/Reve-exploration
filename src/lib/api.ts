const BASE = import.meta.env.VITE_API_BASE || ""; // vide = même origine

export async function apiFetch(path: string, options: RequestInit = {}) {
  const url = path.startsWith("/") ? BASE + path : BASE + "/" + path;
  const res = await fetch(url, {
    credentials: "include",
    ...options,
    headers: {
      "Content-Type": options.body ? "application/json" : undefined,
      ...(options.headers || {}),
    },
  });
  return res;
}

export async function apiJson<T = any>(path: string, options: RequestInit = {}) {
  const r = await apiFetch(path, options);
  if (!r.ok) throw new Error(`Erreur API ${r.status}`);
  return r.json() as Promise<T>;
}
