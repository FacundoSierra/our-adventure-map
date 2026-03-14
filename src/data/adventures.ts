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
}

export const RELATIONSHIP_START = '2023-02-01';

/** Generate default milestone events (called once on first load) */
export function getDefaultEvents(): RelationshipEvent[] {
  const events: RelationshipEvent[] = [
    { id: 'ms-1', date: '2023-02-01', title: 'Empezó todo', description: 'El inicio de nuestra historia juntos.', emoji: '💫', type: 'milestone' },
    { id: 'ms-2', date: '2023-04-01', title: 'Inicio de la relación', description: 'Oficialmente juntos.', emoji: '💕', type: 'milestone' },
  ];

  // Generate anniversaries up to current year + 1
  const currentYear = new Date().getFullYear();
  for (let year = 2024; year <= currentYear + 1; year++) {
    const num = year - 2023;
    const ordinal = num === 1 ? 'Primer' : num === 2 ? 'Segundo' : num === 3 ? 'Tercer' : `${num}º`;
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

/** Build the full timeline merging user events and visited trips */
export function buildTimeline(destinations: Destination[], customEvents: RelationshipEvent[]): TimelineEvent[] {
  const events: TimelineEvent[] = [];

  // Add all user-managed events
  customEvents.forEach(e => {
    events.push({ id: e.id, date: e.date, title: e.title, description: e.description, emoji: e.emoji, source: 'event' });
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
];
