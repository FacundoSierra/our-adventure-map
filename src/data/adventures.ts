export type DestinationType = 'visited' | 'wishlist';

export interface Destination {
  id: string;
  city: string;
  country: string;
  type: DestinationType;
  lat: number;
  lng: number;
  date?: string;
  note?: string;
  emoji?: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  emoji: string;
}

export const RELATIONSHIP_START = '2020-06-15';

export const defaultDestinations: Destination[] = [
  {
    id: '1', city: 'París', country: 'Francia', type: 'visited',
    lat: 48.8566, lng: 2.3522, date: '2021-09-10',
    note: 'Nuestra primera escapada juntos. Cenamos bajo la Torre Eiffel.', emoji: '🗼',
  },
  {
    id: '2', city: 'Roma', country: 'Italia', type: 'visited',
    lat: 41.9028, lng: 12.4964, date: '2022-05-20',
    note: 'Tiramos una moneda en la Fontana di Trevi.', emoji: '🏛️',
  },
  {
    id: '3', city: 'Barcelona', country: 'España', type: 'visited',
    lat: 41.3874, lng: 2.1686, date: '2020-12-31',
    note: 'Nuestro primer Año Nuevo juntos.', emoji: '🎆',
  },
  {
    id: '4', city: 'Ámsterdam', country: 'Países Bajos', type: 'visited',
    lat: 52.3676, lng: 4.9041, date: '2023-03-14',
    note: 'Bicicletas, tulipanes y muchas risas.', emoji: '🌷',
  },
  {
    id: '5', city: 'Lisboa', country: 'Portugal', type: 'visited',
    lat: 38.7223, lng: -9.1393, date: '2022-11-05',
    note: 'Los pasteles de Belém más ricos del mundo.', emoji: '🍮',
  },
  {
    id: '6', city: 'Tokio', country: 'Japón', type: 'wishlist',
    lat: 35.6762, lng: 139.6503,
    note: 'Algún día pasearemos por Shibuya juntos 🌸', emoji: '🗾',
  },
  {
    id: '7', city: 'Santorini', country: 'Grecia', type: 'wishlist',
    lat: 36.3932, lng: 25.4615,
    note: 'Ver el atardecer más bonito del mundo, juntos.', emoji: '🌅',
  },
  {
    id: '8', city: 'Nueva York', country: 'Estados Unidos', type: 'wishlist',
    lat: 40.7128, lng: -74.006,
    note: 'Central Park en otoño, ¡tiene que ser increíble!', emoji: '🗽',
  },
  {
    id: '9', city: 'Bali', country: 'Indonesia', type: 'wishlist',
    lat: -8.3405, lng: 115.092,
    note: 'Templos, arrozales y paz interior juntos.', emoji: '🌴',
  },
];

export const sampleTimeline: TimelineEvent[] = [
  { id: 't1', date: '2020-06-15', title: 'Nos conocimos', description: 'El día que todo empezó.', emoji: '💫' },
  { id: 't2', date: '2020-12-31', title: 'Primer Año Nuevo juntos', description: 'Barcelona, la playa y nuestro primer brindis.', emoji: '🎆' },
  { id: 't3', date: '2021-06-15', title: 'Primer aniversario', description: 'Un año juntos. Solo el primero de muchos.', emoji: '🎂' },
  { id: 't4', date: '2021-09-10', title: 'Primer viaje: París', description: 'La ciudad del amor para nuestra primera aventura.', emoji: '🗼' },
  { id: 't5', date: '2022-05-20', title: 'Roma: La ciudad eterna', description: 'Gelato, historia y amor en cada esquina.', emoji: '🏛️' },
  { id: 't6', date: '2023-03-14', title: 'Ámsterdam en primavera', description: 'Pedaleando entre canales y tulipanes.', emoji: '🌷' },
];

export const romanticQuotes = [
  "Contigo el mundo es más bonito ✨",
  "Cada viaje contigo es mi viaje favorito 💛",
  "No necesito un mapa, solo necesito tu mano 🗺️❤️",
  "El mejor destino eres tú 🌍",
  "Nuestras aventuras apenas empiezan 🌅",
];
