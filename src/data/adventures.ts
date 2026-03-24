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

export interface RelationshipEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  emoji: string;
  type: 'milestone' | 'custom';
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  emoji: string;
  source: 'trip' | 'event';
  eventType?: 'milestone' | 'anniversary' | 'custom';
}

export const RELATIONSHIP_START = '2022-04-02';

/** Generate default milestone events */
export function getDefaultEvents(): RelationshipEvent[] {
  const events: RelationshipEvent[] = [
    { id: 'ms-start', date: '2023-02-01', title: 'Empezó todo', description: 'El comienzo de nuestra historia juntos.', emoji: '💫', type: 'milestone' },
    { id: 'ms-official', date: '2023-04-01', title: 'Inicio de la relación', description: 'Hicimos oficial lo nuestro.', emoji: '❤️', type: 'milestone' },
  ];

  // Generate anniversaries up to the current date
  const now = new Date();
  const currentYear = now.getFullYear();
  // Only show anniversary if Apr 2 of that year has already passed
  const lastAnniversaryYear = (now.getMonth() > 3 || (now.getMonth() === 3 && now.getDate() >= 2)) ? currentYear : currentYear - 1;

  for (let year = 2024; year <= lastAnniversaryYear; year++) {
    const num = year - 2022;
    const ordinal = num === 1 ? 'Primer' : num === 2 ? 'Segundo' : num === 3 ? 'Tercer' : num === 4 ? 'Cuarto' : `${num}º`;
    events.push({
      id: `anniversary-${year}`,
      date: `${year}-04-02`,
      title: `${ordinal} aniversario`,
      description: `${num} ${num === 1 ? 'año' : 'años'} juntos. ¡A por muchos más!`,
      emoji: '🎂',
      type: 'milestone',
    });
  }

  return events;
}

/** Determine sub-type for timeline events */
function getEventType(e: RelationshipEvent): 'milestone' | 'anniversary' | 'custom' {
  if (e.id.startsWith('anniversary-')) return 'anniversary';
  if (e.type === 'milestone') return 'milestone';
  return 'custom';
}

/** Build the full timeline merging user events and visited trips */
export function buildTimeline(destinations: Destination[], customEvents: RelationshipEvent[]): TimelineEvent[] {
  const events: TimelineEvent[] = [];

  // Add all user-managed events
  customEvents.forEach(e => {
    events.push({
      id: e.id,
      date: e.date,
      title: e.title,
      description: e.description,
      emoji: e.emoji,
      source: 'event',
      eventType: getEventType(e),
    });
  });

  // Add visited destinations as trips
  destinations
    .filter(d => d.type === 'visited' && d.date)
    .forEach(d => {
      events.push({
        id: `trip-${d.id}`,
        date: d.date!,
        title: `Viaje a ${d.city}`,
        description: d.note || `${d.city}, ${d.country}`,
        emoji: d.emoji || '✈️',
        source: 'trip',
        eventType: undefined,
      });
    });

  events.sort((a, b) => a.date.localeCompare(b.date));
  return events;
}

export const romanticQuotes = [
  "Contigo el mundo es más bonito ✨",
  "Cada viaje contigo es mi viaje favorito 💛",
  "No necesito un mapa, solo necesito tu mano 🗺️❤️",
  "El mejor destino eres tú 🌍",
  "Nuestras aventuras apenas empiezan 🌅",
  "Eres mi lugar favorito en el mundo 💕",
  "Cada kilómetro contigo vale oro ✨",
  "Tú eres mi norte, mi sur, mi este y mi oeste 🧭",
];

export const surpriseMessages = [
  "Cada pin en este mapa es un recuerdo que guardo en el corazón 💖",
  "Gracias por ser mi compañera de aventuras 🌟",
  "Lo mejor de viajar es hacerlo contigo ✈️❤️",
  "Nuestro mapa se llena, pero mi corazón más 🗺️💕",
  "Cada viaje nuevo es una nueva razón para quererte más 🌍",
];
