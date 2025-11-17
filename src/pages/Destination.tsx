import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import WorldMap from "../components/Items/worldmap";
import SignatureTrip from "../components/Items/SignatureTrip";
import type { Trip } from "../types/trip";
import { signatureTripWestCoast, tripEgyptNile, tripMexicoYucatan } from "../data/trips";
import { travelCards, type TravelCard } from "../data/travelcard";
import "../SASS/pages/destination.scss";

function Destination() {
    const pageRef = useRef<HTMLDivElement | null>(null);
    const heroRef = useRef<HTMLDivElement | null>(null);
    const progressRef = useRef<HTMLDivElement | null>(null);
    const [search, setSearch] = useState("");
    const [region, setRegion] = useState<string>("Tous");
    const [openTrip, setOpenTrip] = useState<Trip | null>(null);

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
        if (!heroRef.current || !progressRef.current) return;
        gsap.registerPlugin(ScrollTrigger);
        let cleanup: (() => void) | undefined;

        try {
            const ctx = gsap.context(() => {
                gsap.fromTo(
                    progressRef.current!,
                    { scaleY: 0 },
                    {
                        scaleY: 1,
                        ease: "none",
                        scrollTrigger: {
                            start: 0,
                            end: "max",
                            scrub: true,
                        },
                    }
                );

                ScrollTrigger.create({
                    trigger: heroRef.current!,
                    start: "top top+=20",
                    end: "bottom top+=120",
                    onUpdate: (self) => {
                        heroRef.current?.classList.toggle("scrolled", self.progress > 0.05);
                    },
                });
            }, heroRef);
            cleanup = () => ctx.revert();
        } catch {
            const el = progressRef.current!;
            const onScroll = () => {
                const doc = document.documentElement;
                const max = doc.scrollHeight - doc.clientHeight;
                const p = max > 0 ? window.scrollY / max : 0;
                el.style.transform = `translateX(-50%) scaleY(${p})`;
            };
            onScroll();
            window.addEventListener("scroll", onScroll, { passive: true });
            cleanup = () => window.removeEventListener("scroll", onScroll);
        }

        return () => {
            cleanup && cleanup();
        };
    }, []);

    // Empêche le scroll de la page quand la modal est ouverte
    useEffect(() => {
        const body = document.body;
        if (openTrip) {
            body.classList.add("no-scroll");
        } else {
            body.classList.remove("no-scroll");
        }
        return () => body.classList.remove("no-scroll");
    }, [openTrip]);

    return (
        <div className="destination" ref={pageRef}>
            {/* Hero */}
            <header className="dest-hero" ref={heroRef}>
                <div className="left-rail" aria-hidden="true">
                    <div className="rail-track" />
                    <div className="rail-progress" ref={progressRef} />
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
            </header>

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
                        <article
                            className="dest-card"
                            key={card.id}
                            data-location={card.location}
                            role="button"
                            tabIndex={0}
                            onClick={() => setOpenTrip(getTripForLocation(card.location))}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    e.preventDefault();
                                    setOpenTrip(getTripForLocation(card.location));
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

            {/* CTA */}
            <section className="dest-cta">
                <h2>Besoin d’un conseil ?</h2>
                <p>Parlez à un conseiller pour bâtir votre itinéraire idéal.</p>
                <button className="btn-primary">Prendre un rendez‑vous</button>
            </section>
        </div>
    );
}

function getTripForLocation(location: string): Trip {
    const loc = location.toLowerCase();
    if (loc.includes("égypte") || loc.includes("edfou")) return tripEgyptNile;
    if (loc.includes("mexique")) return tripMexicoYucatan;
    if (loc.includes("usa") || loc.includes("états-unis") || loc.includes("utah") || loc.includes("nevada") || loc.includes("californie") || loc.includes("new york") || loc.includes("floride")) {
        return signatureTripWestCoast;
    }
    // Fallback
    return signatureTripWestCoast;
}

export default Destination;