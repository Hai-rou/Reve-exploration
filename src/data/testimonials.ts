// Interface pour typer les témoignages
export interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar?: string;
  date: string;
  trip: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Marie Dubois",
    location: "Paris, France",
    rating: 5,
    comment: "Un voyage au Costa Rica absolument magique ! L'accompagnement personnalisé de Rêves d'exploration a fait toute la différence. Chaque détail était parfait.",
    avatar: "/avatars/marie.jpg",
    date: "Octobre 2024",
    trip: "Costa Rica - 15 jours"
  },
  {
    id: 2,
    name: "Pierre Martin",
    location: "Lyon, France",
    rating: 5,
    comment: "Notre road trip dans l'Ouest américain était un rêve devenu réalité. Les conseils d'itinéraire étaient parfaits, nous avons découvert des endroits incroyables !",
    avatar: "/avatars/pierre.jpg",
    date: "Septembre 2024",
    trip: "Ouest US - 21 jours"
  },
  {
    id: 3,
    name: "Sophie Lemaire",
    location: "Bordeaux, France",
    rating: 5,
    comment: "Le Pérou avec Rêves d'exploration : une expérience inoubliable ! L'organisation était impeccable et le carnet de voyage très utile.",
    avatar: "/avatars/sophie.jpg",
    date: "Août 2024",
    trip: "Pérou - 18 jours"
  },
  {
    id: 4,
    name: "Thomas Dupont",
    location: "Nantes, France",
    rating: 5,
    comment: "Service exceptionnel ! L'équipe nous a accompagnés de A à Z pour notre voyage en Corse. Transparence totale sur les tarifs, je recommande vivement !",
    avatar: "/avatars/thomas.jpg",
    date: "Juillet 2024",
    trip: "Corse - 10 jours"
  }
];