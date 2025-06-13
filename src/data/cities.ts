
export interface CityData {
  name: string;
  suggestions: string[];
  parkingPrefix: string;
}

export const citiesData: Record<string, CityData> = {
  paris: {
    name: 'Paris',
    suggestions: [
      'Champs-Élysées',
      'Louvre Museum',
      'Tour Eiffel',
      'Notre-Dame',
      'Arc de Triomphe',
      'Montmartre',
      'Quartier Latin',
      'Aéroport Charles de Gaulle'
    ],
    parkingPrefix: 'Parking Vélib Métropole'
  },
  lyon: {
    name: 'Lyon',
    suggestions: [
      'Vieux Lyon',
      'Place Bellecour',
      'Parc de la Tête d\'Or',
      'Musée des Confluences',
      'Basilique Notre-Dame de Fourvière',
      'Presqu\'île',
      'Part-Dieu',
      'Aéroport Lyon-Saint Exupéry'
    ],
    parkingPrefix: 'Parking LPA'
  },
  marseille: {
    name: 'Marseille',
    suggestions: [
      'Vieux-Port',
      'Notre-Dame de la Garde',
      'Calanques',
      'Le Panier',
      'Canebière',
      'MuCEM',
      'Château d\'If',
      'Aéroport Marseille Provence'
    ],
    parkingPrefix: 'Parking Marseille'
  },
  toulouse: {
    name: 'Toulouse',
    suggestions: [
      'Capitole',
      'Basilique Saint-Sernin',
      'Cité de l\'Espace',
      'Musée des Augustins',
      'Pont Neuf',
      'Jardin des Plantes',
      'Canal du Midi',
      'Aéroport Toulouse-Blagnac'
    ],
    parkingPrefix: 'Parking Tisséo'
  },
  nice: {
    name: 'Nice',
    suggestions: [
      'Promenade des Anglais',
      'Vieux Nice',
      'Musée Matisse',
      'Colline du Château',
      'Place Masséna',
      'Cours Saleya',
      'Palais Lascaris',
      'Aéroport Nice Côte d\'Azur'
    ],
    parkingPrefix: 'Parking Nice'
  },
  nantes: {
    name: 'Nantes',
    suggestions: [
      'Château des Ducs de Bretagne',
      'Machines de l\'île',
      'Cathédrale Saint-Pierre',
      'Île de Versailles',
      'Lieu Unique',
      'Jardin des Plantes',
      'Passage Pommeraye',
      'Aéroport Nantes Atlantique'
    ],
    parkingPrefix: 'Parking TAN'
  },
  montpellier: {
    name: 'Montpellier',
    suggestions: [
      'Place de la Comédie',
      'Cathédrale Saint-Pierre',
      'Musée Fabre',
      'Antigone',
      'Promenade du Peyrou',
      'Jardin des Plantes',
      'Odysseum',
      'Aéroport Montpellier'
    ],
    parkingPrefix: 'Parking TaM'
  },
  strasbourg: {
    name: 'Strasbourg',
    suggestions: [
      'Cathédrale Notre-Dame',
      'Petite France',
      'Parlement Européen',
      'Barrage Vauban',
      'Palais Rohan',
      'Place Kléber',
      'Ponts Couverts',
      'Aéroport de Strasbourg'
    ],
    parkingPrefix: 'Parking CTS'
  },
  bordeaux: {
    name: 'Bordeaux',
    suggestions: [
      'Place de la Bourse',
      'Cathédrale Saint-André',
      'Cité du Vin',
      'Grand Théâtre',
      'Jardin Public',
      'Pont de Pierre',
      'Basilique Saint-Michel',
      'Aéroport de Bordeaux'
    ],
    parkingPrefix: 'Parking TBM'
  },
  lille: {
    name: 'Lille',
    suggestions: [
      'Grand Place',
      'Vieux Lille',
      'Palais des Beaux-Arts',
      'Citadelle',
      'Beffroi',
      'Hospice Comtesse',
      'Zoo de Lille',
      'Aéroport de Lille'
    ],
    parkingPrefix: 'Parking Ilevia'
  }
};
