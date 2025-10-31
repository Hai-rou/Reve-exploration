import WorldMap from "../components/Items/worldmap";
import { travelCards, type TravelCard } from "../data/travelcard";
import "../SASS/pages/homepage.scss";

function Homepage() {
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

  return (
    <div className="homepage">
      {/* Section carte du monde interactive */}
      <section className="world">
        <WorldMap 
          showSearch={true}
          height="500px" 
          className="homepage-map"
        />
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