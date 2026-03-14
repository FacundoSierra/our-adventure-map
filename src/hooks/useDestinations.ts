import { useState, useCallback } from 'react';
import type { Destination } from '@/data/adventures';
import { defaultDestinations } from '@/data/adventures';

const STORAGE_KEY = 'travel-destinations';

function loadDestinations(): Destination[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return defaultDestinations;
}

function saveDestinations(destinations: Destination[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(destinations));
}

export function useDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>(loadDestinations);

  const add = useCallback((dest: Omit<Destination, 'id'>) => {
    setDestinations(prev => {
      const next = [...prev, { ...dest, id: crypto.randomUUID() }];
      saveDestinations(next);
      return next;
    });
  }, []);

  const update = useCallback((id: string, data: Partial<Destination>) => {
    setDestinations(prev => {
      const next = prev.map(d => d.id === id ? { ...d, ...data } : d);
      saveDestinations(next);
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setDestinations(prev => {
      const next = prev.filter(d => d.id !== id);
      saveDestinations(next);
      return next;
    });
  }, []);

  return { destinations, add, update, remove };
}
