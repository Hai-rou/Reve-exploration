// Interface pour typer les cartes de voyage
export interface TravelCard {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  location: string;
}

export const travelCards: TravelCard[] = [
  // États-Unis - Ouest
  {
    id: 1,
    title: "Monument Valley",
    description: "Paysages emblématiques du Far West avec ses formations rocheuses spectaculaires à la frontière Utah-Arizona.",
    imageUrl: "/image/monument-valley1.webp",
    location: "Utah/Arizona, USA",
  },
  {
    id: 2,
    title: "Monument Valley - Mesa",
    description: "Les majestueuses mesas de Monument Valley, symboles du cinéma western américain.",
    imageUrl: "/image/monument-valley2.webp",
    location: "Utah/Arizona, USA",
  },
  {
    id: 3,
    title: "Waterpocket Fold",
    description: "Formation géologique unique dans le parc national de Capitol Reef, Utah.",
    imageUrl: "/image/waterpocket_fold.webp",
    location: "Utah, USA",
  },
  {
    id: 4,
    title: "Mission Mormone",
    description: "Architecture historique mormone dans les paysages désertiques de l'Utah.",
    imageUrl: "/image/mormon-mission-utah-usa.webp",
    location: "Utah, USA",
  },
  
  // États-Unis - Villes
  {
    id: 5,
    title: "Las Vegas",
    description: "La ville du divertissement et des lumières scintillantes au cœur du désert du Nevada.",
    imageUrl: "/image/las-vegas.webp",
    location: "Nevada, USA",
  },
  {
    id: 6,
    title: "New York",
    description: "La Big Apple, métropole emblématique aux gratte-ciels iconiques et à l'énergie inégalée.",
    imageUrl: "/image/new_york.webp",
    location: "New York, USA",
  },
  {
    id: 7,
    title: "Universal Studios Orlando",
    description: "Parc à thème magique du monde des sorciers à Orlando, Floride.",
    imageUrl: "/image/wizarding-orlando.webp",
    location: "Floride, USA",
  },
  
  // Égypte Antique
  {
    id: 8,
    title: "Temple d'Horus - Edfou",
    description: "Le temple le mieux conservé d'Égypte, dédié au dieu faucon Horus.",
    imageUrl: "/image/temple_horus.webp",
    location: "Edfou, Égypte",
  },
  {
    id: 9,
    title: "Naos du Temple d'Horus",
    description: "Le sanctuaire sacré au cœur du temple d'Horus à Edfou.",
    imageUrl: "/image/naos-horus.webp",
    location: "Edfou, Égypte",
  },
  
  // Égypte Antique (suite)
  {
    id: 10,
    title: "Temple d'Horus - Colonnes",
    description: "Les majestueuses colonnes du temple d'Horus, témoins de la grandeur pharaonique.",
    imageUrl: "/image/temple-horus2.webp",
    location: "Edfou, Égypte",
  },
  {
    id: 11,
    title: "Temple d'Horus - Relief",
    description: "Hiéroglyphes et reliefs sculptés dans la pierre du temple d'Horus.",
    imageUrl: "/image/temple-horus3.webp",
    location: "Edfou, Égypte",
  },
  {
    id: 12,
    title: "Temple d'Horus - Cour",
    description: "La grande cour du temple d'Horus avec ses colonnades impressionnantes.",
    imageUrl: "/image/temple-horus4.webp",
    location: "Edfou, Égypte",
  },
  
  // Mexique
  {
    id: 13,
    title: "Mexique",
    description: "Découvrez la culture vibrante et les traditions millénaires du Mexique.",
    imageUrl: "/image/flag-mexico.webp",
    location: "Mexique",
  },
  
  // Californie
  {
    id: 14,
    title: "Yermo Coffee",
    description: "Pause café dans le désert de Mojave à Yermo, Californie.",
    imageUrl: "/image/coffee-yermo.webp",
    location: "Californie, USA",
  },
  
  // Destination florale
  {
    id: 15,
    title: "Las Flores",
    description: "Champs de fleurs colorés et paysages bucoliques.",
    imageUrl: "/image/las_flores.webp",
    location: "Las Flores",
  }
];