import { travelCards } from "../../data/travelcard"
import { useState } from "react"
import { Link } from "react-router"
import "../../SASS/items/destinationMegaMenu.scss"


interface DestinationMegaMenuProps {
    isOpen: boolean;
}

function getContinent(location: string): string {
    const loc = location.toLowerCase();
    if (loc.includes("france") || loc.includes("italie") || loc.includes("espagne")) return "Europe";
    if (loc.includes("égypte") || loc.includes("maroc") || loc.includes("afrique du sud")) return "Afrique";
    if (loc.includes("usa") || loc.includes("mexique") || loc.includes("canada")) return "Amérique";
    if (loc.includes("thailande") || loc.includes("japon") || loc.includes("chine")) return "Asie";
    if (loc.includes("australie") || loc.includes("nouvelle zelande")) return "Océanie";
    return "Autre";
}

function DestinationMegaMenu({ isOpen }: DestinationMegaMenuProps) {

    const [activeContinent, setActiveContinent] = useState<string>("Tous")

    const continents = ["Tous", "Europe", "Afrique", "Amérique", "Asie", "Océanie"];

    const filtered = travelCards.filter((card) => {
        if (activeContinent === "Tous") return true;
        return getContinent(card.location) === activeContinent;
    });

    if (!isOpen) return null;

    return (
        <div className="mega-menu">
            <div className="tags">
                {continents.map(c => (
                    <button
                        key={c}
                        onClick={() => setActiveContinent(c)}
                        className={c === activeContinent ? "active" : ""}
                    >
                        {c}

                    </button>
                ))}
            </div>
            <div className="destinations-grid">
                {filtered.slice(0, 6).map(card => (
                    <Link key={card.id} to="/destination" className="dest-card-mini">
                        <img src={card.imageUrl} alt={card.title} />
                        <span>{card.title}</span>
                    </Link>
                ))}
            </div>
            <Link to="/destination" className="view-all-btn">
                Voir toutes les destinations →
            </Link>
        </div>
    )
}

export default DestinationMegaMenu