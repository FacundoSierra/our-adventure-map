import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Destination } from '@/data/adventures';

function mapRow(d: Record<string, unknown>): Destination {
  return {
    id: d.id as string,
    city: d.city as string,
    country: d.country as string,
    type: d.type as Destination['type'],
    lat: d.lat as number,
    lng: d.lng as number,
    date: (d.date as string | null) ?? undefined,
    note: (d.note as string | null) ?? undefined,
    emoji: (d.emoji as string | null) ?? undefined,
    images: (d.images as string[] | null) ?? [],
    coverImage: (d.cover_image as string | null) ?? undefined,
  };
}

export function useDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from('destinations')
        .select('*')
        .order('created_at', { ascending: true });
      if (!error && data) setDestinations(data.map(mapRow));
      setLoading(false);
    };
    fetch();
  }, []);

  const add = useCallback(async (dest: Omit<Destination, 'id'>): Promise<Destination | null> => {
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
        images: dest.images ?? [],
        cover_image: dest.coverImage ?? null,
      })
      .select()
      .single();
    if (!error && data) {
      const newDest = mapRow(data);
      setDestinations(prev => [...prev, newDest]);
      return newDest;
    }
    return null;
  }, []);

  const update = useCallback(async (id: string, updates: Partial<Destination>): Promise<void> => {
    const dbUpdates: Record<string, unknown> = {};
    if (updates.city !== undefined) dbUpdates.city = updates.city;
    if (updates.country !== undefined) dbUpdates.country = updates.country;
    if (updates.type !== undefined) dbUpdates.type = updates.type;
    if (updates.lat !== undefined) dbUpdates.lat = updates.lat;
    if (updates.lng !== undefined) dbUpdates.lng = updates.lng;
    if ('date' in updates) dbUpdates.date = updates.date ?? null;
    if ('note' in updates) dbUpdates.note = updates.note ?? null;
    if ('emoji' in updates) dbUpdates.emoji = updates.emoji ?? null;
    if ('images' in updates) dbUpdates.images = updates.images ?? [];
    if ('coverImage' in updates) dbUpdates.cover_image = updates.coverImage ?? null;

    const { error } = await supabase.from('destinations').update(dbUpdates).eq('id', id);
    if (!error) {
      setDestinations(prev => prev.map(d => d.id === id ? { ...d, ...updates } : d));
    }
  }, []);

  const remove = useCallback(async (id: string): Promise<void> => {
    const { error } = await supabase.from('destinations').delete().eq('id', id);
    if (!error) setDestinations(prev => prev.filter(d => d.id !== id));
  }, []);

  return { destinations, add, update, remove, loading };
}
