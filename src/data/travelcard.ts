// Interface pour typer les cartes de voyage
export interface TravelCard {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  location: string;
}

export const travelCards: TravelCard[] = [
  // 1 carte par trip actif
  {
    id: 1,
    title: "Ouest Américain",
    description: "De San Francisco à Los Angeles via les parcs mythiques.",
    imageUrl: "/image/sunset-7133867.jpg",
    location: "USA",
  },
  {
    id: 2,
    title: "Égypte Antique",
    description: "Le Nil, Edfou, Louxor et la Vallée des Rois.",
    imageUrl: "/image/temple_horus.webp",
    location: "Égypte",
  },
  {
    id: 3,
    title: "Mexique – Yucatán",
    description: "Cités mayas, cenotes et plages caribéennes.",
    imageUrl: "/image/flag-mexico.webp",
    location: "Mexique",
  },
];