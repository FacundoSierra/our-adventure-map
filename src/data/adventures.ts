export type PlaceCategory = 'visited' | 'dreamed' | 'special';

export interface Place {
  id: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  category: PlaceCategory;
  date?: string;
  note?: string;
  emoji?: string;
  photos?: string[];
  surpriseMessage?: string;
  isFavorite?: boolean;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  emoji: string;
  placeId?: string;
}

export interface FutureAdventure {
  id: string;
  name: string;
  note: string;
  hearts: 1 | 2 | 3;
  image?: string;
  lat: number;
  lng: number;
}

// Fecha en que empezó la relación
export const RELATIONSHIP_START = '2020-06-15';

export const samplePlaces: Place[] = [
  {
    id: '1',
    name: 'París',
    country: 'Francia',
    lat: 48.8566,
    lng: 2.3522,
    category: 'visited',
    date: '2021-09-10',
    note: 'Nuestra primera escapada juntos. Cenamos bajo la Torre Eiffel y fue mágico.',
    emoji: '🗼',
    surpriseMessage: 'Aquí supe que quería recorrer el mundo contigo ❤️',
    isFavorite: true,
  },
  {
    id: '2',
    name: 'Roma',
    country: 'Italia',
    lat: 41.9028,
    lng: 12.4964,
    category: 'visited',
    date: '2022-05-20',
    note: 'Tiramos una moneda en la Fontana di Trevi y pedimos volver juntos.',
    emoji: '🏛️',
  },
  {
    id: '3',
    name: 'Barcelona',
    country: 'España',
    lat: 41.3874,
    lng: 2.1686,
    category: 'special',
    date: '2020-12-31',
    note: 'Nuestro primer Año Nuevo juntos. Bailamos en la playa hasta el amanecer.',
    emoji: '🎆',
    surpriseMessage: 'La mejor Nochevieja de mi vida fue contigo 🥂',
  },
  {
    id: '4',
    name: 'Tokio',
    country: 'Japón',
    lat: 35.6762,
    lng: 139.6503,
    category: 'dreamed',
    note: 'Algún día pasearemos por Shibuya juntos 🌸',
    emoji: '🗾',
  },
  {
    id: '5',
    name: 'Santorini',
    country: 'Grecia',
    lat: 36.3932,
    lng: 25.4615,
    category: 'dreamed',
    note: 'Ver el atardecer más bonito del mundo, juntos.',
    emoji: '🌅',
  },
  {
    id: '6',
    name: 'Ámsterdam',
    country: 'Países Bajos',
    lat: 52.3676,
    lng: 4.9041,
    category: 'visited',
    date: '2023-03-14',
    note: 'Bicicletas, tulipanes y muchas risas.',
    emoji: '🌷',
  },
  {
    id: '7',
    name: 'Lisboa',
    country: 'Portugal',
    lat: 38.7223,
    lng: -9.1393,
    category: 'visited',
    date: '2022-11-05',
    note: 'Los pasteles de Belém más ricos del mundo.',
    emoji: '🍮',
  },
  {
    id: '8',
    name: 'Nueva York',
    country: 'Estados Unidos',
    lat: 40.7128,
    lng: -74.006,
    category: 'dreamed',
    note: 'Central Park en otoño, ¡tiene que ser increíble!',
    emoji: '🗽',
  },
];

export const sampleTimeline: TimelineEvent[] = [
  {
    id: 't1',
    date: '2020-06-15',
    title: 'Nos conocimos',
    description: 'El día que todo empezó. Una mirada, una sonrisa, y el resto es historia.',
    emoji: '💫',
  },
  {
    id: 't2',
    date: '2020-12-31',
    title: 'Primer Año Nuevo juntos',
    description: 'Barcelona, la playa, las uvas y nuestro primer brindis como pareja.',
    emoji: '🎆',
    placeId: '3',
  },
  {
    id: 't3',
    date: '2021-06-15',
    title: 'Primer aniversario',
    description: 'Un año juntos. Solo el primero de muchos.',
    emoji: '🎂',
  },
  {
    id: 't4',
    date: '2021-09-10',
    title: 'Primer viaje juntos: París',
    description: 'La ciudad del amor para nuestra primera aventura internacional.',
    emoji: '🗼',
    placeId: '1',
  },
  {
    id: 't5',
    date: '2022-05-20',
    title: 'Roma: La ciudad eterna',
    description: 'Gelato, historia y amor en cada esquina.',
    emoji: '🏛️',
    placeId: '2',
  },
  {
    id: 't6',
    date: '2023-03-14',
    title: 'Ámsterdam en primavera',
    description: 'Pedaleando entre canales y tulipanes.',
    emoji: '🌷',
    placeId: '6',
  },
];

export const sampleFutureAdventures: FutureAdventure[] = [
  {
    id: 'f1',
    name: 'Tokio, Japón',
    note: 'Perdernos por las calles de Shibuya y comer ramen auténtico.',
    hearts: 3,
    lat: 35.6762,
    lng: 139.6503,
  },
  {
    id: 'f2',
    name: 'Santorini, Grecia',
    note: 'El atardecer más romántico del mundo nos espera.',
    hearts: 3,
    lat: 36.3932,
    lng: 25.4615,
  },
  {
    id: 'f3',
    name: 'Nueva York, USA',
    note: 'Broadway, Central Park, pizza neoyorquina.',
    hearts: 2,
    lat: 40.7128,
    lng: -74.006,
  },
  {
    id: 'f4',
    name: 'Bali, Indonesia',
    note: 'Templos, arrozales y paz interior juntos.',
    hearts: 2,
    lat: -8.3405,
    lng: 115.092,
  },
];

export const romanticQuotes = [
  "Contigo el mundo es más bonito ✨",
  "Cada viaje contigo es mi viaje favorito 💛",
  "No necesito un mapa, solo necesito tu mano 🗺️❤️",
  "El mejor destino eres tú 🌍",
  "Nuestras aventuras apenas empiezan 🌅",
];
