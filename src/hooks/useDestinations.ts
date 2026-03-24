import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Destination } from '@/data/adventures';

export function useDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  // Load from DB on mount
  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .order('created_at', { ascending: true });
      if (!error && data) {
        setDestinations(data.map(d => ({
          id: d.id,
          city: d.city,
          country: d.country,
          type: d.type as Destination['type'],
          lat: d.lat,
          lng: d.lng,
          date: d.date ?? undefined,
          note: d.note ?? undefined,
          emoji: d.emoji ?? undefined,
        })));
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const add = useCallback(async (dest: Omit<Destination, 'id'>) => {
    const { data, error } = await supabase
      .from('destinations')
      .insert({
        city: dest.city,
        country: dest.country,
        type: dest.type,
        lat: dest.lat,
        lng: dest.lng,
        date: dest.date ?? null,
        note: dest.note ?? null,
        emoji: dest.emoji ?? null,
      })
      .select()
      .single();
    if (!error && data) {
      setDestinations(prev => [...prev, {
        id: data.id,
        city: data.city,
        country: data.country,
        type: data.type as Destination['type'],
        lat: data.lat,
        lng: data.lng,
        date: data.date ?? undefined,
        note: data.note ?? undefined,
        emoji: data.emoji ?? undefined,
      }]);
    }
  }, []);

  const update = useCallback(async (id: string, updates: Partial<Destination>) => {
    const dbUpdates: Record<string, any> = {};
    if (updates.city !== undefined) dbUpdates.city = updates.city;
    if (updates.country !== undefined) dbUpdates.country = updates.country;
    if (updates.type !== undefined) dbUpdates.type = updates.type;
    if (updates.lat !== undefined) dbUpdates.lat = updates.lat;
    if (updates.lng !== undefined) dbUpdates.lng = updates.lng;
    if ('date' in updates) dbUpdates.date = updates.date ?? null;
    if ('note' in updates) dbUpdates.note = updates.note ?? null;
    if ('emoji' in updates) dbUpdates.emoji = updates.emoji ?? null;

    const { error } = await supabase
      .from('destinations')
      .update(dbUpdates)
      .eq('id', id);
    if (!error) {
      setDestinations(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d));
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    const { error } = await supabase
      .from('destinations')
      .delete()
      .eq('id', id);
    if (!error) {
      setDestinations(prev => prev.filter(d => d.id !== id));
    }
  }, []);

  return { destinations, add, update, remove, loading };
}
