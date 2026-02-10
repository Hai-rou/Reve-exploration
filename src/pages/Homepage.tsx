import { useEffect, useMemo, useState } from "react";
import { travelCards, type TravelCard } from "../data/travelcard";
import { getRegionKey, monthLabelsFr, seasonality } from "../data/seasonality";
import "../SASS/pages/homepage.scss";
import SignatureTrip from "../components/Items/SignatureTrip";
import { signatureTripWestCoast } from "../data/trips";
import { fetchTripsSupabase } from "../lib/supabaseTrips";
import type { Trip } from "../types/trip";
import { Link } from "react-router";

function Homepage() {
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [apiTrips, setApiTrips] = useState<Trip[] | null>(null);

  useEffect(() => {
    (async () => {
      const supa = await fetchTripsSupabase();
      if (supa) { setApiTrips(supa); return; }
      if (import.meta.env.VITE_USE_LOCAL_API === '1') {
        fetch('/api/trips')
          .then(r => r.ok ? r.json() : null)
          .then(d => setApiTrips(d))
          .catch(() => setApiTrips(null));
      }
    })();
  }, []);
  // (Section spécialités retirée pour le moment)

  // Cartes idéales pour le mois sélectionné
  const monthCards = useMemo(() => {
    return travelCards.filter((card) => {
      const key = getRegionKey(card.location);
      if (!key) return false;
      return seasonality[key].includes(selectedMonth);
    });
  }, [selectedMonth]);

  return (
    <div className="homepage">
      {/* Introduction */}
      <section className="introduction">
        <h1>Bienvenue sur Rêve d'Exploration</h1>
        <p>Votre portail vers des aventures inoubliables à travers le monde. Explorez nos destinations de rêve, planifiez votre voyage idéal et laissez-vous inspirer par nos suggestions personnalisées.</p>
        <p>Découvrez des lieux uniques, des cultures fascinantes et des expériences mémorables pour chaque type de voyageur.</p>
        <div className="etapes">
          <div className="etape">
            <p>Laissez libre cours à votre imagination et vos envies.</p>
          </div>
          <div className="etape">
            <p>Planifiez votre voyage idéal avec nos outils intuitifs.</p>
          </div>
          <div className="etape">
            <p>Laissez-vous inspirer par nos suggestions personnalisées.</p>
          </div>
          <div className="etape">
            <p>Découvrez des lieux uniques et des cultures fascinantes.</p>
          </div>
          <div className="etape">
            <p>Vivez des expériences mémorables pour chaque type de voyageur.</p>
          </div>
        </div>
      </section>
      {/* Section Quand partir ? */}
      <section className="when-to-go">
        <div className="when-header">
          <h2>Quand partir ?</h2>
          <p>Choisissez un mois pour voir les destinations idéales.</p>
        </div>
        <div className="month-chips" role="tablist" aria-label="Sélecteur de mois">
          {monthLabelsFr.map((label, idx) => {
            const m = idx + 1;
            const active = selectedMonth === m;
            return (
              <button
                key={m}
                role="tab"
                aria-selected={active}
                className={`month-chip ${active ? "active" : ""}`}
                onClick={() => setSelectedMonth(m)}
              >
                {label}
              </button>
            );
          })}
        </div>
        <div className="specialty-cards">
          {monthCards.length > 0 ? (
            monthCards.slice(0, 8).map((card: TravelCard) => (
              <article 
                key={`month-${card.id}`} 
                className="card"
                data-location={card.location}
              >
                <div className="card-image">
                  <img src={card.imageUrl} alt={card.title} loading="lazy" />
                  <div className="card-overlay">
                    <span className="location-badge">{card.location}</span>
                  </div>
                </div>
                <div className="card-content">
                  <h4>{card.title}</h4>
                  <p>{card.description}</p>
                </div>
              </article>
            ))
          ) : (
            <div className="empty-state">Aucune destination idéale ce mois-ci. Essayez un autre mois.</div>
          )}
        </div>
      </section>

      <div className="section-sep" aria-hidden="true" />

      {/* Voyage signature */}
      <section className="travel-together">
        <SignatureTrip data={(apiTrips?.find(t => t.title.toLowerCase().includes("usa")) as Trip) || signatureTripWestCoast} />
      </section>
      {/* Pourquoi nous choisir */}
      <section className="why-us">
        <h2>Pourquoi nous choisir ?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-emoji">🌍</div>
            <h3>Expertise mondiale</h3>
            <p>Réseau d’experts locaux et 10+ ans d’expériences réussies.</p>
          </div>
          <div className="feature-card">
            <div className="feature-emoji">🧭</div>
            <h3>Voyages sur‑mesure</h3>
            <p>Itinéraires personnalisés selon vos envies et votre rythme.</p>
          </div>
          <div className="feature-card">
            <div className="feature-emoji">🛡️</div>
            <h3>Sérénité totale</h3>
            <p>Assistance 24/7, assurances et partenaires de confiance.</p>
          </div>
          <div className="feature-card">
            <div className="feature-emoji">💰</div>
            <h3>Prix maîtrisés</h3>
            <p>Tarifs négociés et paiement échelonné possible.</p>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="testimonials">
        <h2>Ils sont partis avec nous</h2>
        <div className="testi-grid">
          <blockquote className="testi">
            <p>“Voyage incroyable, organisation parfaite du début à la fin.”</p>
            <cite>— Chloé, Égypte</cite>
          </blockquote>
          <blockquote className="testi">
            <p>“Road‑trip USA inoubliable, étapes et hôtels au top.”</p>
            <cite>— Karim, Ouest américain</cite>
          </blockquote>
          <blockquote className="testi">
            <p>“Mexique authentique, conseils précieux et super suivi.”</p>
            <cite>— Aïcha, Yucatán</cite>
          </blockquote>
        </div>
      </section>

      {/* Prendre rendez‑vous */}
      <section className="cta-booking">
        <h2>Parlons de votre projet de voyage</h2>
        <p>On construit votre itinéraire idéal en 20 minutes.</p>
        <Link to="/contact" className="btn-primary">Prendre un rendez‑vous</Link>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <h2>Recevez nos idées et bons plans</h2>
        <p>1 email / mois. Désinscription en un clic.</p>
        <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Votre email" aria-label="Email" required />
          <button type="submit" className="btn-primary">S’inscrire</button>
        </form>
      </section>

      {/* FAQ express */}
      <section className="faq">
        <h2>Questions fréquentes</h2>
        <div className="faq-list">
          <details>
            <summary>Comment se passe la personnalisation du voyage ?</summary>
            <p>Envoyer moi un SMS ou un mail ici <Link to="/contact" className="btn-primary">Contact</Link>.</p>
          </details>
          <details>
            <summary>Proposez‑vous une assistance 24/7 ?</summary>
            <p>Oui, assistance dédiée pendant toute la durée de votre séjour.</p>
          </details>
          <details>
            <summary>Peut‑on payer en plusieurs fois ?</summary>
            <p>Oui, je propose des solutions pour faciliter le paiement selon le montant et les dates.</p>
          </details>
        </div>
      </section>
    </div>
  );
}

export default Homepage;