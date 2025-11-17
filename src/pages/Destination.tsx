import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import WorldMap from "../components/Items/worldmap";
import { travelCards, type TravelCard } from "../data/travelcard";
import "../SASS/pages/destination.scss";

function Destination() {
    const heroRef = useRef<HTMLDivElement | null>(null);
    const [search, setSearch] = useState("");
    const [region, setRegion] = useState<string>("Tous");

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
        gsap.registerPlugin(ScrollTrigger);
        if (!heroRef.current) return;
        const ctx = gsap.context(() => {
            const progressEl = heroRef.current!.querySelector<HTMLElement>(".left-rail .rail-progress");
            if (!progressEl) return;
            gsap.fromTo(
                progressEl,
                { height: 0 },
                {
                    height: "100%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top+=120",
                        end: "bottom top+=120",
                        scrub: true,
                    },
                }
            );
        }, heroRef);
        return () => ctx.revert();
    }, []);

    return (
        <div className="destination">
            {/* Hero */}
            <div className="dest-hero" ref={heroRef}>
                <div className="left-rail" aria-hidden="true">
                    <div className="rail-track" />
                    <div className="rail-progress" />
                </div>
                <h1>Choisissez votre destination</h1>
                <p>Explorez la carte, filtrez par région et trouvez l’inspiration.</p>
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

            {/* Carte + header */}
            <section className="world">
                <div className="world-header">
                    <h1>Carte interactive</h1>
                    <p>Zoomez, cliquez sur un point, ou recherchez une destination.</p>
                </div>
                <div className="map-wrapper">
                    <div className="map-inner">
                        <WorldMap showSearch={true} height="520px" borderRadius="18px" />
                    </div>
                </div>
            </section>

            {/* Filtres rapides */}
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
                        <article className="dest-card" key={card.id} data-location={card.location}>
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