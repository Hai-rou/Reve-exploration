import "../../SASS/layouts/header.scss"
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";
import { apiFetch } from "../../lib/api";
import { supabase, supabaseLogin, supabaseLogout, getCurrentUserWithRole } from "../../lib/supabase";

function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  type Me = { email: string; role?: string } | null;
  const [me, setMe] = useState<Me>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const handleLogin = () => setIsLoginOpen(true);
  const closeLogin = () => { setIsLoginOpen(false); setErrorMsg(null); };

  useEffect(() => {
    if (isLoginOpen) emailRef.current?.focus();
  }, [isLoginOpen]);

  // Empêche le scroll de la page quand la modale est ouverte
  useEffect(() => {
    const body = document.body;
    if (isLoginOpen) {
      body.classList.add("no-scroll");
    } else {
      body.classList.remove("no-scroll");
    }
    return () => body.classList.remove("no-scroll");
  }, [isLoginOpen]);

  // Récupère la session initiale (Supabase prioritaire si configuré)
  useEffect(() => {
    (async () => {
      if (supabase) {
        try {
          const info = await getCurrentUserWithRole();
          if (info) { setMe(info); return; }
        } catch {}
      }
      // Fallback backend Express
      apiFetch("/api/auth/me")
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => d && setMe({ email: d.email, role: d.role }))
        .catch(() => {});
    })();
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);
    try {
      if (supabase) {
        await supabaseLogin(email, password);
        const info = await getCurrentUserWithRole();
        if (!info) throw new Error("Utilisateur non trouvé après connexion");
        setMe(info);
      } else {
        const res = await apiFetch("/api/auth/login", {
          method: "POST",
          body: JSON.stringify({ email, password })
        });
        if (!res.ok) {
          const j = await res.json().catch(() => ({} as any));
          throw new Error(j.error || "Échec de connexion");
        }
        const data = await res.json();
        setMe({ email: data.email, role: data.role });
        if (!data.role) {
          try {
            const meRes = await fetch("/api/auth/me", { credentials: "include" });
            if (meRes.ok) {
              const meJson = await meRes.json();
              setMe({ email: meJson.email, role: meJson.role });
            }
          } catch {}
        }
      }
      setPassword("");
      closeLogin();
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function onLogout() {
    if (supabase) {
      await supabaseLogout();
    } else {
      await apiFetch("/api/auth/logout", { method: "POST" });
    }
    setMe(null);
  }

  return (
    <header>
      <h1>Rêves D'Exploration</h1>
      <nav>
        <ul>
          <li><Link to="/">Accueil</Link></li>
          <li><Link to="/destinations">Destinations</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/about">À Propos</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          
          {me ? (
            <>
              {me.role?.toLowerCase() === "admin" && (
                <li><Link to="/admin">Admin</Link></li>
              )}
              <li className="user-email">{me.email}</li>
              <li><button className="login-button" onClick={onLogout}>Se Déconnecter</button></li>
            </>
          ) : (
            <li><button className="login-button" onClick={handleLogin}>Se Connecter</button></li>
          )}
        </ul>
      </nav>

      {isLoginOpen && createPortal(
        (
          <div
            className="modal-backdrop"
            role="dialog"
            aria-modal="true"
            aria-label="Connexion"
            onClick={(e) => { if (e.target === e.currentTarget) closeLogin(); }}
            onKeyDown={(e) => { if (e.key === "Escape") closeLogin(); }}
          >
            <div className="modal" role="document">
              <button className="modal-close" aria-label="Fermer" onClick={closeLogin}>×</button>
              <h2>Se connecter</h2>
              <form onSubmit={onSubmit}>
                <label>
                  Adresse e-mail
                  <input
                    ref={emailRef}
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
                <label>
                  Mot de passe
                  <input
                    type="password"
                    name="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
                {errorMsg && <div className="form-error" role="alert">{errorMsg}</div>}
                <button type="submit" className="btn-primary" disabled={submitting}>
                  {submitting ? "Connexion..." : "Se connecter"}
                </button>
              </form>
              <p className="modal-helper">
                Pas de compte ? <Link to="/contact" onClick={closeLogin}>Contactez-nous</Link>
              </p>
            </div>
          </div>
        ),
        document.body
      )}
    </header>
  );
}
export default Header;