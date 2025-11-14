import { useMemo, useState } from "react";
import { travelCards, type TravelCard } from "../data/travelcard";
import { getRegionKey, monthLabelsFr, seasonality } from "../data/seasonality";
import "../SASS/pages/homepage.scss";

function Homepage() {
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  // Grouper les cartes par spécialité réelle
  const specialtyDestinations = {
    "États-Unis - Ouest": travelCards.filter(card => 
      card.location.includes("Utah") || 
      card.location.includes("Arizona") || 
      card.location.includes("Nevada") ||
      card.location.includes("Californie")
    ),
    "États-Unis - Villes": travelCards.filter(card => 
      card.location.includes("New York") || 
      card.location.includes("Floride")
    ),
    "Égypte Antique": travelCards.filter(card => card.location.includes("Égypte")),
    "Mexique": travelCards.filter(card => card.location === "Mexique" || card.location === "Las Flores")
  };

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

      {/* Section nos spécialités */}
      <section className="specialties-section">
        <div className="specialties-header">
          <h2>Nos Destinations Spécialisées</h2>
          <p>Découvrez nos expertises régionales pour des voyages authentiques et sur-mesure</p>
        </div>
        
        {Object.entries(specialtyDestinations).map(([specialty, cards]) => (
          cards.length > 0 && (
            <div key={specialty} className="specialty-group">
              <h3 className="specialty-title">{specialty}</h3>
              <div className="specialty-cards">
                {cards.map((card: TravelCard) => (
                  <article 
                    key={card.id} 
                    className="card"
                    data-location={card.location}
                  >
                    <div className="card-image">
                      <img src={card.imageUrl} alt={card.title} />
                      <div className="card-overlay">
                        <span className="location-badge">{card.location}</span>
                      </div>
                    </div>
                    <div className="card-content">
                      <h4>{card.title}</h4>
                      <p>{card.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )
        ))}
      </section>
      
      {/* Section découverte rapide */}
      <section className="quick-discovery">
        <h2>✈️ Inspirations Voyage</h2>
        <div className="travel-cards-grid">
          {travelCards.slice(0, 6).map((card: TravelCard) => (
            <article 
              key={`quick-${card.id}`} 
              className="quick-card"
              data-location={card.location}
            >
              <img src={card.imageUrl} alt={card.title} loading="lazy" />
              <div className="quick-card-content">
                <h5>{card.title}</h5>
                <span className="location">{card.location}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Homepage;