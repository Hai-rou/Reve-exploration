export type TripSide = "left" | "right";

export interface TripFact {
  icon?: string;
  text: string;
}

export interface TripItineraryStop {
  side: TripSide;
  title: string;
  subtitle?: string;
  modalTitle?: string;
  modalText?: string;
}

export interface TravelAdvice {
  icon: string;
  label: string;
  text: string;
}

export interface PracticalDetails {
  icon: string;
  label: string;
  text: string;
}

export interface Trip {
  mediaUrl: string;
  mediaAlt: string;
  badge?: string;
  title: string;
  subtitle?: string;
  facts: TripFact[];
  highlights: string[];
  itinerary: TripItineraryStop[];
  travelAdvice?: TravelAdvice[];
  practicalDetails?: PracticalDetails[];
  includes: string[];
  note?: string;
  ctaLabel?: string;
}
