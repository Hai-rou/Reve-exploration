export type RegionKey =
  | "USA Ouest"
  | "Égypte"
  | "Mexique";

// Mois 1-12
export const monthLabelsFr = [
  "Jan", "Fév", "Mar", "Avr", "Mai", "Juin",
  "Juil", "Août", "Sep", "Oct", "Nov", "Déc"
];

export const seasonality: Record<RegionKey, number[]> = {
  // Climat doux et sec: printemps et début automne
  "USA Ouest": [4, 5, 6, 9, 10],
  // Plus doux: automne à printemps
  "Égypte": [10, 11, 12, 1, 2, 3, 4],
  // Saison sèche (Yucatán et zones touristiques)
  "Mexique": [11, 12, 1, 2, 3, 4],
};

// Déterminer la région pour une carte en fonction de son libellé location
export function getRegionKey(location: string): RegionKey | null {
  const loc = location.toLowerCase();
  if (loc.includes("égypte") || loc.includes("egypte") || loc.includes("edfou")) return "Égypte";
  if (loc.includes("mexique") || loc.includes("yucat")) return "Mexique";
  // USA Ouest: Utah, Arizona, Nevada, Californie, etc.
  if (
    loc.includes("usa") ||
    loc.includes("états-unis") ||
    loc.includes("etats-unis") ||
    loc.includes("utah") ||
    loc.includes("arizona") ||
    loc.includes("nevada") ||
    loc.includes("californie")
  ) {
    return "USA Ouest";
  }
  return null;
}
