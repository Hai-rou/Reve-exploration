import "../../SASS/layouts/header.scss"
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import { useEffect, useRef, useState } from "react";

function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [me, setMe] = useState<string | null>(null);
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

  // Récupère la session si un cookie existe
  useEffect(() => {
    fetch("/api/auth/me", { credentials: "include" })
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setMe(d?.email ?? null))
      .catch(() => {});
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setErrorMsg(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({} as any));
        throw new Error(j.error || "Échec de connexion");
      }
      const data = await res.json();
      setMe(data.email);
      setPassword("");
      closeLogin();
    } catch (err: any) {
      setErrorMsg(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  async function onLogout() {
    await fetch("/api/auth/logout", { method: "POST", credentials: "include" });
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
              <li className="user-email">{me}</li>
              <button className="login-button" onClick={onLogout}>Se Déconnecter</button>
            </>
          ) : (
            <button className="login-button" onClick={handleLogin}>Se Connecter</button>
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