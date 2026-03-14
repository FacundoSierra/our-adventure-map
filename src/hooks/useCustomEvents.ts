import { useState, useCallback } from 'react';
import type { RelationshipEvent } from '@/data/adventures';

const STORAGE_KEY = 'relationship-custom-events';

function load(): RelationshipEvent[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return [];
}

function save(events: RelationshipEvent[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

export function useCustomEvents() {
  const [events, setEvents] = useState<RelationshipEvent[]>(load);

  const add = useCallback((event: Omit<RelationshipEvent, 'id' | 'type'>) => {
    setEvents(prev => {
      const next = [...prev, { ...event, id: crypto.randomUUID(), type: 'custom' as const }];
      save(next);
      return next;
    });
  }, []);

  const update = useCallback((id: string, data: Partial<RelationshipEvent>) => {
    setEvents(prev => {
      const next = prev.map(e => e.id === id ? { ...e, ...data } : e);
      save(next);
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setEvents(prev => {
      const next = prev.filter(e => e.id !== id);
      save(next);
      return next;
    });
  }, []);

  return { events, add, update, remove };
}
