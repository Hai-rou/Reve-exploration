import type { Trip } from "../types/trip";

export const signatureTripWestCoast: Trip = {
  mediaUrl: "/image/sunset-7133867.jpg",
  mediaAlt: "Voyage signature - Ouest Américain",
  badge: "Voyage signature",
  title: "Ouest Américain – 12 jours",
  subtitle: "De San Francisco à Los Angeles via les parcs mythiques",
  facts: [
    { icon: "⏱️", text: "12 jours / 11 nuits" },
    { icon: "🌤️", text: "Meilleure période: Avril – Octobre" },
    { icon: "💸", text: "Budget: €€€ (moyen à confort)" },
    { icon: "🚗", text: "Style: Road‑trip en liberté" },
  ],
  highlights: [
    "San Francisco",
    "Yosemite",
    "Death Valley",
    "Grand Canyon",
    "Route 66",
    "Las Vegas",
    "Los Angeles",
  ],
  itinerary: [
    { side: "left", title: "J1–J2 • San Francisco", subtitle: "Golden Gate, Alcatraz, Fisherman’s Wharf", modalTitle: "San Francisco – Mise en jambes", modalText: "Balades à vélo sur le Golden Gate, visite d’Alcatraz et couchers de soleil sur les quais." },
    { side: "right", title: "J3 • Yosemite", subtitle: "Vallée de Yosemite, El Capitan & Half Dome", modalTitle: "Yosemite – Nature grandiose", modalText: "Points de vue mythiques et randonnées faciles pour s’immerger dans la vallée." },
    { side: "left", title: "J4 • Mammoth Lakes → Death Valley", subtitle: "Badwater Basin, Zabriskie Point au coucher du soleil", modalTitle: "Death Valley – Déserts lunaires", modalText: "Paysages surréalistes, points de vue flamboyants au coucher du soleil." },
    { side: "right", title: "J5 • Las Vegas", subtitle: "Shows, néons et rooftops panoramiques", modalTitle: "Las Vegas – Vibes & spectacles", modalText: "Ambiance unique, lumières et spectacles. Idées rooftops selon vos envies." },
    { side: "left", title: "J6–J7 • Grand Canyon", subtitle: "Rim Trail, lever de soleil sur Mather Point", modalTitle: "Grand Canyon – Moments suspendus", modalText: "Levers/ouchers de soleil, points de vue et balades accessibles au bord du rim." },
    { side: "right", title: "J8 • Route 66", subtitle: "Williams, Seligman & diners vintage", modalTitle: "Route 66 – Americana", modalText: "Arrêts vintage et diners typiques sur la plus iconique des routes." },
    { side: "left", title: "J9–J10 • Los Angeles", subtitle: "Santa Monica, Venice, Hollywood & Griffith Observatory", modalTitle: "Los Angeles – Côte & cinéma", modalText: "Plages iconiques, quartiers bohème et panoramas au Griffith Observatory." },
    { side: "right", title: "J11–J12 • Plage & départ", subtitle: "Derniers instants au bord du Pacifique", modalTitle: "Relax & départ", modalText: "Dernier bain de soleil, shopping souvenir et retour en douceur." },
  ],
  travelAdvice: [
    { icon: "☀️", label: "Climat & saisons", text: "Très chaud en été dans les déserts. Prévoir des couches en montagne." },
    { icon: "🎒", label: "À emporter", text: "Crème solaire, chapeau, bonnes chaussures de marche, gourde réutilisable." },
    { icon: "🚗", label: "Permis de conduire", text: "Permis français valide suffit. Pensez à prendre la carte bancaire du conducteur." },
    { icon: "💳", label: "Budget sur place", text: "~80-120$/jour/pers pour repas + essence + activités." },
  ],
  practicalDetails: [
    { icon: "🛣️", label: "Kilométrage total", text: "~3 200 km sur 12 jours" },
    { icon: "⏰", label: "Temps de conduite", text: "3 à 5h/jour en moyenne, trajets flexibles" },
    { icon: "✨", label: "Flexibilité", text: "Programme 100% adaptable selon vos envies et rythme" },
    { icon: "📞", label: "Support", text: "Assistance francophone 24/7 pendant tout le voyage" },
  ],
  includes: [
    "Vols internationaux aller/retour",
    "Location de voiture complète",
    "Hébergements 3–4★ bien situés",
    "Road‑book personnalisé et appli de voyage",
  ],
  note: "Ce programme est 100% personnalisable selon vos envies (rythme, étapes, budget).",
  ctaLabel: "Demander ce voyage",
};

export const tripEgyptNile: Trip = {
  mediaUrl: "/image/temple_horus.webp",
  mediaAlt: "Égypte – Croisière sur le Nil",
  badge: "Voyage signature",
  title: "Égypte Antique – 10 jours",
  subtitle: "Le Nil, Edfou, Louxor et la Vallée des Rois",
  facts: [
    { icon: "⏱️", text: "10 jours / 9 nuits" },
    { icon: "🌤️", text: "Meilleure période: Octobre – Avril" },
    { icon: "🚢", text: "Style: Croisière + visites guidées" },
  ],
  highlights: ["Le Caire", "Edfou", "Louxor", "Vallée des Rois", "Abou Simbel"],
  itinerary: [
    { side: "left", title: "J1–J2 • Le Caire", subtitle: "Pyramides, Sphinx & Musée égyptien", modalTitle: "Le Caire", modalText: "Visite des pyramides de Gizeh et du Sphinx, immersion au musée." },
    { side: "right", title: "J3–J5 • Croisière", subtitle: "Assouan → Edfou → Louxor", modalTitle: "Le Nil", modalText: "Temples et paysages depuis le fleuve mythique." },
    { side: "left", title: "J6 • Edfou", subtitle: "Temple d’Horus", modalTitle: "Edfou", modalText: "Temple remarquablement conservé dédié au dieu faucon." },
    { side: "right", title: "J7–J8 • Louxor", subtitle: "Karnak & Vallée des Rois", modalTitle: "Louxor", modalText: "Sites incontournables et tombeaux pharaoniques." },
    { side: "left", title: "J9–J10 • Le Caire", subtitle: "Bazars & quartiers historiques", modalTitle: "Retour au Caire", modalText: "Derniers achats et flâneries avant le départ." },
  ],
  travelAdvice: [
    { icon: "☀️", label: "Climat & saisons", text: "Climat sec et chaud. Prévoir vêtements légers et couvrants pour les visites." },
    { icon: "🎒", label: "À emporter", text: "Chapeau, lunettes de soleil, crème solaire, écharpe pour les temples." },
    { icon: "🛂", label: "Visa & documents", text: "Visa obligatoire (à l'arrivée ou e-visa). Passeport valide 6 mois." },
    { icon: "💳", label: "Budget sur place", text: "~30-50$/jour/pers pour extras, souvenirs et pourboires." },
  ],
  practicalDetails: [
    { icon: "🚢", label: "Distance croisière", text: "~250 km sur le Nil entre Assouan et Louxor" },
    { icon: "⏰", label: "Rythme des visites", text: "Visites guidées le matin, navigation l'après-midi" },
    { icon: "✨", label: "Flexibilité", text: "Extensions possibles : Abou Simbel, Mer Rouge, Alexandrie" },
    { icon: "📞", label: "Support", text: "Guide francophone et assistance locale 24/7" },
  ],
  includes: ["Vols A/R", "Hôtels + Croisière", "Guides francophones", "Transferts"],
  note: "Personnalisable: extensions à Abou Simbel / Mer Rouge.",
  ctaLabel: "Demander ce voyage",
};

export const tripMexicoYucatan: Trip = {
  mediaUrl: "/image/flag-mexico.webp",
  mediaAlt: "Mexique – Yucatán & Caraïbes",
  badge: "Voyage signature",
  title: "Mexique – 12 jours",
  subtitle: "Yucatán, cités mayas et plages caribéennes",
  facts: [
    { icon: "⏱️", text: "12 jours / 11 nuits" },
    { icon: "🌤️", text: "Meilleure période: Novembre – Mai" },
    { icon: "🚗", text: "Style: Road‑trip + farniente" },
  ],
  highlights: ["Chichén Itzá", "Cenotes", "Tulum", "Valladolid", "Isla Mujeres"],
  itinerary: [
    { side: "left", title: "J1–J2 • Cancún", subtitle: "Arrivée et plage", modalTitle: "Cancún", modalText: "Mise en route et détente." },
    { side: "right", title: "J3–J4 • Valladolid", subtitle: "Cenotes & ville coloniale", modalTitle: "Valladolid", modalText: "Eaux turquoise et ruelles colorées." },
    { side: "left", title: "J5 • Chichén Itzá", subtitle: "Site maya majeur", modalTitle: "Chichén Itzá", modalText: "Pyramide de Kukulcán et histoire maya." },
    { side: "right", title: "J6–J8 • Tulum", subtitle: "Plages & ruines", modalTitle: "Tulum", modalText: "Mer des Caraïbes et site archéologique." },
    { side: "left", title: "J9–J12 • Isla Mujeres", subtitle: "Repos & snorkeling", modalTitle: "Isla Mujeres", modalText: "Eaux claires et ambiance bohème." },
  ],
  travelAdvice: [
    { icon: "☀️", label: "Climat & saisons", text: "Tropical humide. Éviter septembre-octobre (ouragan). Nov-mai idéal." },
    { icon: "🎒", label: "À emporter", text: "Maillot, anti-moustique, chaussures d'eau pour cenotes, crème solaire bio." },
    { icon: "🚗", label: "Permis de conduire", text: "Permis français suffit. Permis international recommandé pour certaines agences." },
    { icon: "💳", label: "Budget sur place", text: "~50-80$/jour/pers pour repas, activités et essence." },
  ],
  practicalDetails: [
    { icon: "🛣️", label: "Kilométrage total", text: "~800 km sur 12 jours" },
    { icon: "⏰", label: "Temps de conduite", text: "1 à 3h/jour, routes en bon état" },
    { icon: "✨", label: "Flexibilité", text: "Extensions possibles : Holbox, Bacalar, réserve Sian Ka'an" },
    { icon: "📞", label: "Support", text: "Assistance francophone et numéros d'urgence locaux" },
  ],
  includes: ["Vols A/R", "Hôtels 3–4★", "Location voiture", "Assurance de base"],
  note: "Personnalisable: Holbox, Bacalar, Sian Ka'an.",
  ctaLabel: "Demander ce voyage",
};

export const trips: Trip[] = [signatureTripWestCoast, tripEgyptNile, tripMexicoYucatan];

// Mapping simple par région/pays pour la page Destinations
export const tripByLocation: Record<string, Trip> = {
  USA: signatureTripWestCoast,
  "États-Unis": signatureTripWestCoast,
  "Californie": signatureTripWestCoast,
  "Utah": signatureTripWestCoast,
  "Nevada": signatureTripWestCoast,
  "New York": signatureTripWestCoast,
  "Floride": signatureTripWestCoast,
  "Égypte": tripEgyptNile,
  "Edfou": tripEgyptNile,
  "Mexique": tripMexicoYucatan,
};
