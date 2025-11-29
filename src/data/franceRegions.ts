export interface RegionOffer {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  duration: string;
  season: string;
  badge?: string;
  highlights: string[];
  activities: string[];
  bestPeriod: string[];
  weather: {
    spring: string;
    summer: string;
    autumn: string;
    winter: string;
  };
  images: string[];
}

export const franceRegionsData: Record<string, RegionOffer> = {
  'FR-A': {
    id: 'FR-A',
    name: 'Alsace',
    tagline: 'Entre vignes et montagnes',
    description: 'Découvrez l\'Alsace authentique : villages pittoresques, route des vins, gastronomie exceptionnelle et marchés de Noël féériques.',
    price: 690,
    originalPrice: 890,
    discount: 22,
    duration: '4 jours / 3 nuits',
    season: 'Toute l\'année',
    badge: 'Coup de cœur',
    highlights: [
      'Route des Vins d\'Alsace',
      'Strasbourg et la Petite France',
      'Château du Haut-Kœnigsbourg',
      'Dégustation de vins locaux'
    ],
    activities: ['Œnotourisme', 'Randonnée', 'Gastronomie', 'Culture'],
    bestPeriod: ['Avril-Juin', 'Septembre-Octobre', 'Décembre'],
    weather: {
      spring: '12-18°C - Floraison des vignes',
      summer: '20-28°C - Idéal pour la randonnée',
      autumn: '10-18°C - Vendanges et couleurs',
      winter: '0-5°C - Marchés de Noël magiques'
    },
    images: ['alsace1.jpg', 'alsace2.jpg', 'alsace3.jpg']
  },
  'FR-B': {
    id: 'FR-B',
    name: 'Aquitaine',
    tagline: 'Entre océan et vignobles',
    description: 'Surf sur les plus belles plages d\'Europe, vignobles de Bordeaux, gastronomie raffinée et douceur de vivre.',
    price: 750,
    originalPrice: 950,
    discount: 21,
    duration: '5 jours / 4 nuits',
    season: 'Mars à Octobre',
    badge: 'Best-seller',
    highlights: [
      'Dune du Pilat',
      'Vignobles de Bordeaux',
      'Surf à Hossegor',
      'Bassin d\'Arcachon'
    ],
    activities: ['Surf', 'Œnotourisme', 'Plage', 'Vélo'],
    bestPeriod: ['Mai-Juin', 'Septembre'],
    weather: {
      spring: '14-20°C - Doux et agréable',
      summer: '22-28°C - Idéal pour la plage',
      autumn: '16-22°C - Vendanges',
      winter: '8-14°C - Hors saison'
    },
    images: ['aquitaine1.jpg', 'aquitaine2.jpg', 'aquitaine3.jpg']
  },
  'FR-C': {
    id: 'FR-C',
    name: 'Auvergne',
    tagline: 'Volcans et nature préservée',
    description: 'Explorez les volcans d\'Auvergne, randonnées panoramiques, thermalisme et patrimoine médiéval.',
    price: 580,
    originalPrice: 720,
    discount: 19,
    duration: '4 jours / 3 nuits',
    season: 'Avril à Octobre',
    badge: 'Nature',
    highlights: [
      'Puy de Dôme',
      'Vulcania',
      'Villages médiévaux',
      'Stations thermales'
    ],
    activities: ['Randonnée', 'Thermalisme', 'Patrimoine', 'Nature'],
    bestPeriod: ['Mai-Juin', 'Septembre'],
    weather: {
      spring: '8-16°C - Réveil de la nature',
      summer: '16-24°C - Parfait pour la randonnée',
      autumn: '10-18°C - Couleurs d\'automne',
      winter: '0-8°C - Ski possible'
    },
    images: ['auvergne1.jpg', 'auvergne2.jpg', 'auvergne3.jpg']
  },
  'FR-D': {
    id: 'FR-D',
    name: 'Bourgogne',
    tagline: 'Terre de grands crus',
    description: 'Patrimoine UNESCO, Route des Grands Crus, gastronomie d\'excellence et art roman.',
    price: 820,
    originalPrice: 1020,
    discount: 20,
    duration: '4 jours / 3 nuits',
    season: 'Toute l\'année',
    badge: 'Prestige',
    highlights: [
      'Route des Grands Crus',
      'Hospices de Beaune',
      'Abbaye de Cluny',
      'Dijon et son patrimoine'
    ],
    activities: ['Œnotourisme', 'Gastronomie', 'Culture', 'Patrimoine'],
    bestPeriod: ['Avril-Juin', 'Septembre-Octobre'],
    weather: {
      spring: '10-18°C - Floraison',
      summer: '18-26°C - Vignes verdoyantes',
      autumn: '12-20°C - Vendanges',
      winter: '2-8°C - Dégustation au coin du feu'
    },
    images: ['bourgogne1.jpg', 'bourgogne2.jpg', 'bourgogne3.jpg']
  },
  'FR-E': {
    id: 'FR-E',
    name: 'Bretagne',
    tagline: 'Terre de légendes maritimes',
    description: 'Côtes sauvages, mégalithes mystérieux, crêpes et cidre, festivals traditionnels.',
    price: 640,
    originalPrice: 800,
    discount: 20,
    duration: '5 jours / 4 nuits',
    season: 'Avril à Septembre',
    badge: 'Authentique',
    highlights: [
      'Saint-Malo',
      'Alignements de Carnac',
      'Côte de Granit Rose',
      'Mont-Saint-Michel'
    ],
    activities: ['Randonnée côtière', 'Culture celte', 'Voile', 'Gastronomie'],
    bestPeriod: ['Mai-Juin', 'Septembre'],
    weather: {
      spring: '10-16°C - Floraison des ajoncs',
      summer: '16-22°C - Idéal sans chaleur',
      autumn: '12-18°C - Lumières dorées',
      winter: '6-12°C - Tempêtes spectaculaires'
    },
    images: ['bretagne1.jpg', 'bretagne2.jpg', 'bretagne3.jpg']
  },
  'FR-F': {
    id: 'FR-F',
    name: 'Centre',
    tagline: 'Jardins de la Renaissance',
    description: 'Châteaux de la Loire, jardins remarquables, histoire royale et douceur angevine.',
    price: 720,
    originalPrice: 900,
    discount: 20,
    duration: '4 jours / 3 nuits',
    season: 'Toute l\'année',
    badge: 'Romantique',
    highlights: [
      'Châteaux de Chambord',
      'Chenonceau',
      'Amboise',
      'Jardins de Villandry'
    ],
    activities: ['Patrimoine', 'Jardins', 'Vélo', 'Œnotourisme'],
    bestPeriod: ['Avril-Juin', 'Septembre-Octobre'],
    weather: {
      spring: '12-18°C - Floraison des jardins',
      summer: '18-26°C - Son et lumière',
      autumn: '12-20°C - Couleurs automnales',
      winter: '4-10°C - Châteaux intimistes'
    },
    images: ['centre1.jpg', 'centre2.jpg', 'centre3.jpg']
  },
  'FR-G': {
    id: 'FR-G',
    name: 'Champagne-Ardenne',
    tagline: 'Bulles et patrimoine',
    description: 'Caves de Champagne, cathédrales gothiques, nature préservée des Ardennes.',
    price: 780,
    originalPrice: 980,
    discount: 20,
    duration: '3 jours / 2 nuits',
    season: 'Toute l\'année',
    badge: 'Prestige',
    highlights: [
      'Caves de Champagne',
      'Cathédrale de Reims',
      'Épernay',
      'Lac du Der'
    ],
    activities: ['Œnotourisme', 'Patrimoine UNESCO', 'Nature', 'Gastronomie'],
    bestPeriod: ['Avril-Juin', 'Septembre-Octobre'],
    weather: {
      spring: '10-16°C - Réveil des vignes',
      summer: '16-24°C - Festivals',
      autumn: '10-18°C - Vendanges',
      winter: '2-8°C - Dégustations'
    },
    images: ['champagne1.jpg', 'champagne2.jpg', 'champagne3.jpg']
  },
  'FR-H': {
    id: 'FR-H',
    name: 'Corse',
    tagline: 'Île de beauté sauvage',
    description: 'Plages paradisiaques, montagnes majestueuses, sentiers de randonnée légendaires.',
    price: 950,
    originalPrice: 1200,
    discount: 21,
    duration: '7 jours / 6 nuits',
    season: 'Mai à Octobre',
    badge: 'Exclusif',
    highlights: [
      'Calanques de Piana',
      'GR20',
      'Bonifacio',
      'Plages de Palombaggia'
    ],
    activities: ['Randonnée', 'Plage', 'Plongée', 'Gastronomie'],
    bestPeriod: ['Mai-Juin', 'Septembre'],
    weather: {
      spring: '14-20°C - Nature en fleurs',
      summer: '24-32°C - Plages idéales',
      autumn: '18-26°C - Douceur persistante',
      winter: '10-16°C - Randonnée côtière'
    },
    images: ['corse1.jpg', 'corse2.jpg', 'corse3.jpg']
  },
  'FR-I': {
    id: 'FR-I',
    name: 'Franche-Comté',
    tagline: 'Montagnes et horlogerie',
    description: 'Massif du Jura, lacs glaciaires, savoir-faire horloger, gastronomie montagnarde.',
    price: 620,
    originalPrice: 780,
    discount: 21,
    duration: '4 jours / 3 nuits',
    season: 'Toute l\'année',
    badge: 'Nature',
    highlights: [
      'Cascades du Hérisson',
      'Besançon',
      'Lac de Saint-Point',
      'Route des Sapins'
    ],
    activities: ['Randonnée', 'Ski', 'VTT', 'Patrimoine'],
    bestPeriod: ['Juin-Août', 'Décembre-Mars'],
    weather: {
      spring: '8-16°C - Fonte des neiges',
      summer: '16-26°C - Fraîcheur montagnarde',
      autumn: '10-18°C - Couleurs flamboyantes',
      winter: '-2-6°C - Ski de fond'
    },
    images: ['franche-comte1.jpg', 'franche-comte2.jpg', 'franche-comte3.jpg']
  },
  'FR-K': {
    id: 'FR-K',
    name: 'Languedoc-Roussillon',
    tagline: 'Méditerranée authentique',
    description: 'Plages sauvages, cités médiévales, vignobles ensoleillés, Camargue sauvage.',
    price: 710,
    originalPrice: 890,
    discount: 20,
    duration: '5 jours / 4 nuits',
    season: 'Avril à Octobre',
    badge: 'Soleil',
    highlights: [
      'Carcassonne',
      'Pont du Gard',
      'Montpellier',
      'Plages du Cap d\'Agde'
    ],
    activities: ['Plage', 'Patrimoine', 'Œnotourisme', 'Nature'],
    bestPeriod: ['Mai-Juin', 'Septembre'],
    weather: {
      spring: '14-20°C - Douceur méditerranéenne',
      summer: '24-32°C - Soleil garanti',
      autumn: '16-24°C - Arrière-saison',
      winter: '8-14°C - Hiver doux'
    },
    images: ['languedoc1.jpg', 'languedoc2.jpg', 'languedoc3.jpg']
  },
  'FR-L': {
    id: 'FR-L',
    name: 'Limousin',
    tagline: 'Nature et authenticité',
    description: 'Plateaux verdoyants, lacs paisibles, porcelaine de Limoges, patrimoine rural.',
    price: 540,
    originalPrice: 680,
    discount: 21,
    duration: '4 jours / 3 nuits',
    season: 'Mai à Septembre',
    badge: 'Tranquillité',
    highlights: [
      'Limoges et sa porcelaine',
      'Lac de Vassivière',
      'Villages de caractère',
      'Gorges de la Vézère'
    ],
    activities: ['Randonnée', 'Pêche', 'Artisanat', 'Nature'],
    bestPeriod: ['Juin-Août'],
    weather: {
      spring: '10-18°C - Verdure éclatante',
      summer: '18-26°C - Idéal pour les lacs',
      autumn: '12-20°C - Calme automnal',
      winter: '2-10°C - Hiver tranquille'
    },
    images: ['limousin1.jpg', 'limousin2.jpg', 'limousin3.jpg']
  },
  'FR-M': {
    id: 'FR-M',
    name: 'Lorraine',
    tagline: 'Histoire et nature',
    description: 'Patrimoine militaire, Place Stanislas, parcs naturels, gastronomie réconfortante.',
    price: 590,
    originalPrice: 740,
    discount: 20,
    duration: '3 jours / 2 nuits',
    season: 'Toute l\'année',
    badge: 'Culture',
    highlights: [
      'Place Stanislas Nancy',
      'Verdun',
      'Parc de la Seille',
      'Centre Pompidou-Metz'
    ],
    activities: ['Culture', 'Histoire', 'Randonnée', 'Gastronomie'],
    bestPeriod: ['Avril-Juin', 'Septembre-Octobre'],
    weather: {
      spring: '10-16°C - Renouveau printanier',
      summer: '16-24°C - Agréable',
      autumn: '10-18°C - Couleurs d\'automne',
      winter: '0-6°C - Marchés de Noël'
    },
    images: ['lorraine1.jpg', 'lorraine2.jpg', 'lorraine3.jpg']
  },
  'FR-N': {
    id: 'FR-N',
    name: 'Midi-Pyrénées',
    tagline: 'Entre Pyrénées et Toulouse',
    description: 'Sommets pyrénéens, ville rose de Toulouse, bastides médiévales, gastronomie du Sud-Ouest.',
    price: 680,
    originalPrice: 850,
    discount: 20,
    duration: '5 jours / 4 nuits',
    season: 'Toute l\'année',
    badge: 'Varié',
    highlights: [
      'Toulouse',
      'Pic du Midi',
      'Rocamadour',
      'Lourdes'
    ],
    activities: ['Randonnée', 'Ski', 'Culture', 'Gastronomie'],
    bestPeriod: ['Mai-Juin', 'Septembre-Octobre'],
    weather: {
      spring: '12-20°C - Floraison',
      summer: '20-30°C - Chaud et ensoleillé',
      autumn: '14-22°C - Douceur',
      winter: '4-12°C - Ski en montagne'
    },
    images: ['midi-pyrenees1.jpg', 'midi-pyrenees2.jpg', 'midi-pyrenees3.jpg']
  },
  'FR-O': {
    id: 'FR-O',
    name: 'Nord-Pas-de-Calais',
    tagline: 'Convivialité du Nord',
    description: 'Braderies, beffrois, plages de la Côte d\'Opale, gastronomie généreuse.',
    price: 520,
    originalPrice: 650,
    discount: 20,
    duration: '3 jours / 2 nuits',
    season: 'Toute l\'année',
    badge: 'Convivial',
    highlights: [
      'Lille',
      'Côte d\'Opale',
      'Beffrois UNESCO',
      'Braderie de Lille'
    ],
    activities: ['Culture', 'Plage', 'Gastronomie', 'Shopping'],
    bestPeriod: ['Mai-Septembre'],
    weather: {
      spring: '10-16°C - Variable',
      summer: '16-22°C - Doux',
      autumn: '12-18°C - Braderies',
      winter: '4-10°C - Marchés de Noël'
    },
    images: ['nord1.jpg', 'nord2.jpg', 'nord3.jpg']
  },
  'FR-P': {
    id: 'FR-P',
    name: 'Basse-Normandie',
    tagline: 'Plages du Débarquement',
    description: 'Histoire du D-Day, Mont-Saint-Michel, cidre et Calvados, côtes sauvages.',
    price: 670,
    originalPrice: 840,
    discount: 20,
    duration: '4 jours / 3 nuits',
    season: 'Avril à Octobre',
    badge: 'Histoire',
    highlights: [
      'Mont-Saint-Michel',
      'Plages du Débarquement',
      'Honfleur',
      'Route du Cidre'
    ],
    activities: ['Histoire', 'Patrimoine', 'Gastronomie', 'Plage'],
    bestPeriod: ['Mai-Juin', 'Septembre'],
    weather: {
      spring: '10-16°C - Floraison des pommiers',
      summer: '16-22°C - Agréable',
      autumn: '12-18°C - Lumières automnales',
      winter: '6-10°C - Hors saison'
    },
    images: ['normandie1.jpg', 'normandie2.jpg', 'normandie3.jpg']
  },
  'FR-Q': {
    id: 'FR-Q',
    name: 'Haute-Normandie',
    tagline: 'Falaises et impressionnisme',
    description: 'Falaises d\'Étretat, Rouen médiévale, patrimoine impressionniste, Seine maritime.',
    price: 650,
    originalPrice: 810,
    discount: 20,
    duration: '3 jours / 2 nuits',
    season: 'Avril à Octobre',
    badge: 'Artistique',
    highlights: [
      'Falaises d\'Étretat',
      'Rouen',
      'Giverny',
      'Côte fleurie'
    ],
    activities: ['Patrimoine', 'Art', 'Randonnée', 'Plage'],
    bestPeriod: ['Mai-Juin', 'Septembre'],
    weather: {
      spring: '10-16°C - Jardins en fleurs',
      summer: '16-22°C - Douceur',
      autumn: '12-18°C - Couleurs',
      winter: '6-10°C - Tempêtes côtières'
    },
    images: ['haute-normandie1.jpg', 'haute-normandie2.jpg', 'haute-normandie3.jpg']
  },
  'FR-R': {
    id: 'FR-R',
    name: 'Pays de la Loire',
    tagline: 'Douceur angevine',
    description: 'Châteaux, vignobles de Nantes, côtes atlantiques, Terra Botanica.',
    price: 630,
    originalPrice: 790,
    discount: 20,
    duration: '4 jours / 3 nuits',
    season: 'Avril à Octobre',
    badge: 'Famille',
    highlights: [
      'Nantes',
      'Puy du Fou',
      'Île de Noirmoutier',
      'Angers'
    ],
    activities: ['Patrimoine', 'Plage', 'Parcs', 'Œnotourisme'],
    bestPeriod: ['Mai-Septembre'],
    weather: {
      spring: '12-18°C - Douceur printanière',
      summer: '18-26°C - Idéal',
      autumn: '14-20°C - Arrière-saison',
      winter: '6-12°C - Hiver doux'
    },
    images: ['pays-loire1.jpg', 'pays-loire2.jpg', 'pays-loire3.jpg']
  },
  'FR-S': {
    id: 'FR-S',
    name: 'Picardie',
    tagline: 'Cathédrales et champs de bataille',
    description: 'Cathédrale d\'Amiens, Baie de Somme, mémorial de la Grande Guerre.',
    price: 560,
    originalPrice: 700,
    discount: 20,
    duration: '3 jours / 2 nuits',
    season: 'Avril à Octobre',
    badge: 'Mémoire',
    highlights: [
      'Cathédrale d\'Amiens',
      'Baie de Somme',
      'Château de Pierrefonds',
      'Historial de Péronne'
    ],
    activities: ['Patrimoine', 'Nature', 'Histoire', 'Ornithologie'],
    bestPeriod: ['Mai-Septembre'],
    weather: {
      spring: '10-16°C - Réveil de la nature',
      summer: '16-24°C - Agréable',
      autumn: '12-18°C - Migration des oiseaux',
      winter: '4-10°C - Calme hivernal'
    },
    images: ['picardie1.jpg', 'picardie2.jpg', 'picardie3.jpg']
  },
  'FR-T': {
    id: 'FR-T',
    name: 'Poitou-Charentes',
    tagline: 'Soleil de l\'Atlantique',
    description: 'Île de Ré, cognac, Futuroscope, marais poitevin, patrimoine roman.',
    price: 660,
    originalPrice: 825,
    discount: 20,
    duration: '5 jours / 4 nuits',
    season: 'Avril à Octobre',
    badge: 'Famille',
    highlights: [
      'Île de Ré',
      'Futuroscope',
      'La Rochelle',
      'Marais Poitevin'
    ],
    activities: ['Plage', 'Vélo', 'Parcs', 'Patrimoine'],
    bestPeriod: ['Mai-Juin', 'Septembre'],
    weather: {
      spring: '12-18°C - Douceur océanique',
      summer: '20-28°C - Ensoleillé',
      autumn: '14-22°C - Idéal',
      winter: '8-14°C - Hiver doux'
    },
    images: ['poitou1.jpg', 'poitou2.jpg', 'poitou3.jpg']
  },
  'FR-U': {
    id: 'FR-U',
    name: 'Provence-Alpes-Côte d\'Azur',
    tagline: 'Méditerranée de rêve',
    description: 'Côte d\'Azur, champs de lavande, villages perchés, gastronomie méditerranéenne.',
    price: 890,
    originalPrice: 1120,
    discount: 21,
    duration: '7 jours / 6 nuits',
    season: 'Toute l\'année',
    badge: 'Best-seller',
    highlights: [
      'Nice et Monaco',
      'Gorges du Verdon',
      'Lavande en Provence',
      'Calanques de Marseille'
    ],
    activities: ['Plage', 'Randonnée', 'Culture', 'Gastronomie'],
    bestPeriod: ['Mai-Juin', 'Septembre-Octobre'],
    weather: {
      spring: '14-20°C - Floraison',
      summer: '24-32°C - Soleil garanti',
      autumn: '16-24°C - Douceur',
      winter: '10-16°C - Hiver doux'
    },
    images: ['paca1.jpg', 'paca2.jpg', 'paca3.jpg']
  },
  'FR-V': {
    id: 'FR-V',
    name: 'Rhône-Alpes',
    tagline: 'Montagnes majestueuses',
    description: 'Alpes, Mont-Blanc, lacs alpins, Lyon gastronomique, sports d\'hiver.',
    price: 780,
    originalPrice: 980,
    discount: 20,
    duration: '5 jours / 4 nuits',
    season: 'Toute l\'année',
    badge: 'Sport & Nature',
    highlights: [
      'Chamonix Mont-Blanc',
      'Annecy',
      'Lyon',
      'Lac Léman'
    ],
    activities: ['Ski', 'Randonnée', 'Alpinisme', 'Gastronomie'],
    bestPeriod: ['Décembre-Mars', 'Juin-Septembre'],
    weather: {
      spring: '10-18°C - Fonte des neiges',
      summer: '18-28°C - Idéal randonnée',
      autumn: '12-20°C - Couleurs automnales',
      winter: '-4-8°C - Ski parfait'
    },
    images: ['rhone-alpes1.jpg', 'rhone-alpes2.jpg', 'rhone-alpes3.jpg']
  }
};
