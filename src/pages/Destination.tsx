import { useEffect, useMemo, useState } from "react";


import SignatureTrip from "../components/Items/SignatureTrip";
import type { Trip } from "../types/trip";
import { signatureTripWestCoast, tripEgyptNile, tripMexicoYucatan } from "../data/trips";
import { fetchTripsSupabase } from "../lib/supabaseTrips";
import { travelCards, type TravelCard } from "../data/travelcard";
import "../SASS/pages/destination.scss";
import Carousel from "../components/Items/Carousel";

function Destination() {

    const [search, setSearch] = useState("");
    const [region, setRegion] = useState<string>("Tous");
    const [openTrip, setOpenTrip] = useState<Trip | null>(null);
    const [apiTrips, setApiTrips] = useState<Trip[] | null>(null);

    const regions = ["Tous", "USA", "Égypte", "Mexique"];

    const filtered: TravelCard[] = useMemo(() => {
        const q = search.trim().toLowerCase();
        return travelCards.filter((c) => {
            const matchesText = !q || c.title.toLowerCase().includes(q) || c.location.toLowerCase().includes(q);
            const matchesRegion = region === "Tous" || c.location.toLowerCase().includes(region.toLowerCase());
            return matchesText && matchesRegion;
        });
    }, [search, region]);

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

    function getTripForLocationApiAware(location: string): Trip {
        const loc = location.toLowerCase();
        const fromApi = (name: string) => apiTrips?.find(t => t.title.toLowerCase().includes(name)) as Trip | undefined;
        if (loc.includes("égypte")) return fromApi("égypte") || tripEgyptNile;
        if (loc.includes("mexique")) return fromApi("mexique") || tripMexicoYucatan;
        if (loc.includes("usa") || loc.includes("états-unis") || loc.includes("utah") || loc.includes("nevada") || loc.includes("californie") || loc.includes("new york") || loc.includes("floride")) {
            return fromApi("usa") || signatureTripWestCoast;
        }
        return signatureTripWestCoast;
    }
    

    return (
        <div className="destination">
            {/* Carrousel des destinations */}
            <section className="carrousel">
                <Carousel
                    slides={[
                        {
                            image: "/image/sunset-7133867.jpg",
                            title: "Ouest Américain – 12 jours",
                            subtitle: "De San Francisco à Los Angeles via les parcs mythiques",
                            ctaLabel: "Voir les destinations",
                            href: "/destinations",
                        },
                        {
                            image: "/image/temple_horus.webp",
                            title: "Égypte Antique – 10 jours",
                            subtitle: "Le Nil, Edfou, Louxor et la Vallée des Rois",
                            ctaLabel: "Voir les destinations",
                            href: "/destinations",
                        },
                        {
                            image: "/image/flag-mexico.webp",
                            title: "Mexique – 12 jours",
                            subtitle: "Yucatán, cités mayas et plages caribéennes",
                            ctaLabel: "Voir les destinations",
                            href: "/destinations",
                        },
                    ]}
                    autoPlayMs={6000}
                />
            </section>

            {/* Hero */}
            <div className="dest-hero">
                <h1>Choisissez votre destination</h1>
                <p>Filtrez par région et trouvez l’inspiration.</p>
                <div className="dest-search">
                    <input
                        type="text"
                        placeholder="Rechercher un pays, une ville, un parc..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        aria-label="Rechercher une destination"
                    />
                </div>
            </div>
            
            {/* Filtres rapides */}
            <section className="all-dest">
                <div className="filters">
                    {regions.map((r) => {
                        const active = region === r;
                        return (
                            <button
                                key={r}
                                className={`chip ${active ? "active" : ""}`}
                                onClick={() => setRegion(r)}
                                aria-pressed={active}
                            >
                                {r}
                            </button>
                        );
                    })}
                </div>

                {/* Grille des destinations */}
                <section className="dest-grid" aria-live="polite">
                    {filtered.length === 0 ? (
                        <div className="empty">Aucun résultat. Essayez d’autres filtres ou mots‑clés.</div>
                    ) : (
                        filtered.map((card) => (
                            <article
                                className="dest-card"
                                key={card.id}
                                data-location={card.location}
                                role="button"
                                tabIndex={0}
                                onClick={() => setOpenTrip(getTripForLocationApiAware(card.location))}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" || e.key === " ") {
                                        e.preventDefault();
                                        setOpenTrip(getTripForLocationApiAware(card.location));
                                    }
                                }}
                            >
                                <div className="media">
                                    <img src={card.imageUrl} alt={card.title} loading="lazy" />
                                    <span className="badge">{card.location}</span>
                                </div>
                                <div className="body">
                                    <h3>{card.title}</h3>
                                    <p>{card.description}</p>
                                </div>
                            </article>
                        ))
                    )}
                </section>

                {openTrip && (
                    <div
                        className="trip-modal-backdrop"
                        role="dialog"
                        aria-modal="true"
                        aria-label={`Détails voyage: ${openTrip.title}`}
                        onClick={(e) => {
                            if (e.target === e.currentTarget) setOpenTrip(null);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === "Escape") setOpenTrip(null);
                        }}
                    >
                        <div className="trip-modal">
                            <button className="modal-close" aria-label="Fermer" onClick={() => setOpenTrip(null)}>
                                ×
                            </button>
                            <SignatureTrip data={openTrip} />
                        </div>
                    </div>
                )}
            </section>
            

            {/* CTA */}
            <section className="dest-cta">
                <h2>Besoin d’un conseil ?</h2>
                <p>Parlez à un conseiller pour bâtir votre itinéraire idéal.</p>
                <button className="btn-primary">Prendre un rendez‑vous</button>
            </section>
        </div>
    );
}

export default Destination;