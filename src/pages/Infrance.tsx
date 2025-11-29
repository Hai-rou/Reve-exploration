import '../SASS/pages/infrance.scss'
import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { franceRegionsData } from '../data/franceRegions'

function Infrance() {
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
    const mapContainerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        // Charger et injecter le SVG
        fetch('/france.svg')
            .then(res => res.text())
            .then(svgContent => {
                if (mapContainerRef.current) {
                    mapContainerRef.current.innerHTML = svgContent
                    
                    const svgElement = mapContainerRef.current.querySelector('svg')
                    if (!svgElement) return

                    // Ajouter une classe pour le style
                    svgElement.classList.add('france-map-svg')

                    // Animation d'entrée
                    gsap.from(svgElement, {
                        opacity: 0,
                        scale: 0.9,
                        duration: 1,
                        ease: 'power3.out'
                    })

                    // Récupérer toutes les régions (paths)
                    const regions = svgElement.querySelectorAll('path')

                    regions.forEach((region) => {
                        const regionId = region.id

                        // Style initial
                        gsap.set(region, {
                            fill: '#e8f4f8',
                            stroke: '#2c3e50',
                            strokeWidth: 1.5,
                            transformOrigin: 'center'
                        })

                        // Animation au survol
                        const handleMouseEnter = () => {
                            gsap.to(region, {
                                fill: '#ffd700',
                                scale: 1.05,
                                duration: 0.3,
                                ease: 'power2.out'
                            })
                        }

                        const handleMouseLeave = () => {
                            if (selectedRegion !== regionId) {
                                gsap.to(region, {
                                    fill: '#e8f4f8',
                                    scale: 1,
                                    duration: 0.3,
                                    ease: 'power2.out'
                                })
                            }
                        }

                        const handleClick = () => {
                            handleRegionClick(regionId, svgElement)
                        }

                        region.addEventListener('mouseenter', handleMouseEnter)
                        region.addEventListener('mouseleave', handleMouseLeave)
                        region.addEventListener('click', handleClick)

                        // Style du curseur
                        region.style.cursor = 'pointer'
                    })
                }
            })
            .catch(err => console.error('Erreur de chargement de la carte:', err))
    }, [])

    useEffect(() => {
        // Mettre à jour les styles quand selectedRegion change
        if (mapContainerRef.current) {
            const svgElement = mapContainerRef.current.querySelector('svg')
            if (svgElement) {
                const regions = svgElement.querySelectorAll('path')
                regions.forEach((region) => {
                    if (region.id === selectedRegion) {
                        gsap.to(region, {
                            fill: '#ff6b6b',
                            scale: 1.08,
                            opacity: 1,
                            duration: 0.4,
                            ease: 'back.out(1.7)'
                        })
                    } else {
                        gsap.to(region, {
                            fill: '#e8f4f8',
                            opacity: selectedRegion ? 0.6 : 1,
                            scale: 1,
                            duration: 0.3
                        })
                    }
                })
            }
        }
    }, [selectedRegion])

    const handleRegionClick = (regionId: string, svgElement: SVGSVGElement) => {
        setSelectedRegion(regionId)
        
        const regions = svgElement.querySelectorAll('path')
        
        regions.forEach((region) => {
            if (region.id === regionId) {
                gsap.to(region, {
                    fill: '#ff6b6b',
                    scale: 1.08,
                    duration: 0.4,
                    ease: 'back.out(1.7)'
                })
            } else {
                gsap.to(region, {
                    fill: '#e8f4f8',
                    opacity: 0.6,
                    scale: 1,
                    duration: 0.3
                })
            }
        })
    }

    const currentRegion = selectedRegion ? franceRegionsData[selectedRegion] : null

    return (
        <section className="infrance">
            <h1>Voyages en France</h1>
            <p>Découvrez nos offres exclusives pour explorer les merveilles de notre pays.</p>
            <div className="region-info">
                <div className='region-offre'>
                    <div className="offre-header">
                        <h2>Découvrez nos offres</h2>
                        <p className="offre-subtitle">
                            {currentRegion ? currentRegion.name : 'Sélectionnez une région sur la carte'}
                        </p>
                        {currentRegion && (
                            <p className="offre-tagline">{currentRegion.tagline}</p>
                        )}
                    </div>

                    {currentRegion ? (
                        <div className="offre-content">
                            <div className="offre-card">
                                <div className="offre-image">
                                    <div className="image-placeholder">
                                        <span>📸</span>
                                    </div>
                                    {currentRegion.badge && (
                                        <span className="offre-badge">{currentRegion.badge}</span>
                                    )}
                                    {currentRegion.discount && (
                                        <span className="offre-discount">-{currentRegion.discount}%</span>
                                    )}
                                </div>
                                <div className="offre-details">
                                    <h3>Séjour découverte</h3>
                                    <p className="offre-description">
                                        {currentRegion.description}
                                    </p>
                                    
                                    <div className="offre-highlights">
                                        <h4>Points forts</h4>
                                        <ul>
                                            {currentRegion.highlights.map((highlight, index) => (
                                                <li key={index}>
                                                    <span className="check-icon">✓</span>
                                                    {highlight}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="offre-features">
                                        <div className="feature">
                                            <span className="icon">📅</span>
                                            <span>{currentRegion.duration}</span>
                                        </div>
                                        <div className="feature">
                                            <span className="icon">🌤️</span>
                                            <span>{currentRegion.season}</span>
                                        </div>
                                        <div className="feature">
                                            <span className="icon">🎯</span>
                                            <span>{currentRegion.activities[0]}</span>
                                        </div>
                                    </div>

                                    <div className="offre-price">
                                        <div className="price-container">
                                            {currentRegion.originalPrice && (
                                                <span className="price-original">{currentRegion.originalPrice}€</span>
                                            )}
                                            <span className="price-value">{currentRegion.price}€</span>
                                        </div>
                                        <span className="price-person">par personne</span>
                                    </div>
                                    <button className="offre-btn">
                                        Réserver maintenant
                                    </button>
                                </div>
                            </div>

                            <div className="offre-extra-info">
                                <div className="info-section">
                                    <h4>🎨 Activités</h4>
                                    <div className="activities-tags">
                                        {currentRegion.activities.map((activity, index) => (
                                            <span key={index} className="activity-tag">{activity}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="info-section">
                                    <h4>📅 Meilleure période</h4>
                                    <div className="best-period">
                                        {currentRegion.bestPeriod.map((period, index) => (
                                            <span key={index} className="period-badge">{period}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className="info-section">
                                    <h4>🌡️ Climat</h4>
                                    <div className="weather-grid">
                                        <div className="weather-item">
                                            <span className="season">🌸 Printemps</span>
                                            <span className="temp">{currentRegion.weather.spring}</span>
                                        </div>
                                        <div className="weather-item">
                                            <span className="season">☀️ Été</span>
                                            <span className="temp">{currentRegion.weather.summer}</span>
                                        </div>
                                        <div className="weather-item">
                                            <span className="season">🍂 Automne</span>
                                            <span className="temp">{currentRegion.weather.autumn}</span>
                                        </div>
                                        <div className="weather-item">
                                            <span className="season">❄️ Hiver</span>
                                            <span className="temp">{currentRegion.weather.winter}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="offre-placeholder">
                            <div className="placeholder-icon">🗺️</div>
                            <p>Cliquez sur une région pour découvrir nos offres de voyage</p>
                        </div>
                    )}
                </div>
                <div className="france-map">
                    <div ref={mapContainerRef} className="map-container"></div>

                    {currentRegion && (
                        <div className="region-details">
                            <h3>{currentRegion.name}</h3>
                            <p>{currentRegion.tagline}</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Section Pourquoi choisir la France */}
            <section className="why-france">
                <h2>Pourquoi voyager en France ?</h2>
                <div className="why-grid">
                    <div className="why-card">
                        <div className="why-icon">🏰</div>
                        <h3>Patrimoine exceptionnel</h3>
                        <p>Plus de 45 sites classés au patrimoine mondial de l'UNESCO, des châteaux majestueux aux cathédrales gothiques.</p>
                    </div>
                    <div className="why-card">
                        <div className="why-icon">🍷</div>
                        <h3>Gastronomie raffinée</h3>
                        <p>Découvrez les terroirs français, leurs vins d'exception et une cuisine reconnue mondialement.</p>
                    </div>
                    <div className="why-card">
                        <div className="why-icon">🏔️</div>
                        <h3>Diversité des paysages</h3>
                        <p>Des plages méditerranéennes aux sommets alpins, en passant par les vallées verdoyantes et les volcans d'Auvergne.</p>
                    </div>
                    <div className="why-card">
                        <div className="why-icon">🎨</div>
                        <h3>Culture et art de vivre</h3>
                        <p>Musées prestigieux, festivals renommés et un art de vivre unique qui inspire le monde entier.</p>
                    </div>
                </div>
            </section>

            {/* Section Nos formules */}
            <section className="formulas-section">
                <h2>Nos formules de voyage</h2>
                <p className="formulas-subtitle">Des séjours adaptés à toutes vos envies</p>
                <div className="formulas-grid">
                    <div className="formula-card">
                        <div className="formula-header">
                            <span className="formula-icon">🎒</span>
                            <h3>Aventure & Nature</h3>
                        </div>
                        <ul className="formula-features">
                            <li>✓ Randonnées guidées</li>
                            <li>✓ Activités outdoor</li>
                            <li>✓ Hébergements authentiques</li>
                            <li>✓ Petits groupes (8-12 pers.)</li>
                        </ul>
                        <div className="formula-price">À partir de 590€</div>
                    </div>
                    <div className="formula-card featured">
                        <span className="formula-badge">Le plus populaire</span>
                        <div className="formula-header">
                            <span className="formula-icon">👨‍👩‍👧‍👦</span>
                            <h3>Famille</h3>
                        </div>
                        <ul className="formula-features">
                            <li>✓ Activités adaptées aux enfants</li>
                            <li>✓ Hébergements familiaux</li>
                            <li>✓ Repas inclus</li>
                            <li>✓ Rythme adapté</li>
                        </ul>
                        <div className="formula-price">À partir de 750€</div>
                    </div>
                    <div className="formula-card">
                        <div className="formula-header">
                            <span className="formula-icon">💎</span>
                            <h3>Prestige</h3>
                        </div>
                        <ul className="formula-features">
                            <li>✓ Hôtels 4-5 étoiles</li>
                            <li>✓ Restaurants gastronomiques</li>
                            <li>✓ Guide privé</li>
                            <li>✓ Expériences exclusives</li>
                        </ul>
                        <div className="formula-price">À partir de 1200€</div>
                    </div>
                </div>
            </section>

            {/* Section Témoignages */}
            <section className="testimonials-section">
                <h2>Ils ont voyagé avec nous</h2>
                <div className="testimonials-grid">
                    <div className="testimonial-card">
                        <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                        <p className="testimonial-text">
                            "Un séjour inoubliable en Provence ! L'organisation était parfaite, les guides passionnants et les paysages à couper le souffle."
                        </p>
                        <div className="testimonial-author">
                            <strong>Marie D.</strong>
                            <span>Voyage en Provence - Août 2024</span>
                        </div>
                    </div>
                    <div className="testimonial-card">
                        <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                        <p className="testimonial-text">
                            "Les châteaux de la Loire en famille : nos enfants étaient émerveillés ! Un voyage culturel accessible et ludique."
                        </p>
                        <div className="testimonial-author">
                            <strong>Thomas L.</strong>
                            <span>Circuit Châteaux de la Loire - Juillet 2024</span>
                        </div>
                    </div>
                    <div className="testimonial-card">
                        <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                        <p className="testimonial-text">
                            "La Corse est un paradis ! Entre randonnées et plages de rêve, nous avons découvert une île magnifique. Merci pour cette organisation impeccable."
                        </p>
                        <div className="testimonial-author">
                            <strong>Sophie & Marc</strong>
                            <span>Découverte de la Corse - Septembre 2024</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section CTA */}
            <section className="cta-section">
                <div className="cta-content">
                    <h2>Prêt à découvrir la France ?</h2>
                    <p>Nos conseillers sont à votre écoute pour créer le voyage qui vous ressemble</p>
                    <div className="cta-buttons">
                        <button className="cta-btn primary">Demander un devis</button>
                        <button className="cta-btn secondary">Nous contacter</button>
                    </div>
                    <div className="cta-info">
                        <div className="info-item">
                            <span className="info-icon">📞</span>
                            <span>01 23 45 67 89</span>
                        </div>
                        <div className="info-item">
                            <span className="info-icon">✉️</span>
                            <span>contact@reve-exploration.fr</span>
                        </div>
                    </div>
                </div>
            </section>
        </section>

        
    )
}

export default Infrance;