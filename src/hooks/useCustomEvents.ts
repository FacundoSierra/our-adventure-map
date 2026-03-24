import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { RelationshipEvent } from '@/data/adventures';

export function useCustomEvents() {
  const [events, setEvents] = useState<RelationshipEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await supabase
        .from('relationship_events')
        .select('*')
        .order('date', { ascending: true });
      if (!error && data) {
        setEvents(data.map(e => ({
          id: e.id,
          date: e.date,
          title: e.title,
          description: e.description,
          emoji: e.emoji,
          type: e.type as RelationshipEvent['type'],
        })));
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const add = useCallback(async (event: Omit<RelationshipEvent, 'id' | 'type'>) => {
    const { data, error } = await supabase
      .from('relationship_events')
      .insert({
        date: event.date,
        title: event.title,
        description: event.description,
        emoji: event.emoji,
        type: 'custom',
      })
      .select()
      .single();
    if (!error && data) {
      setEvents(prev => [...prev, {
        id: data.id,
        date: data.date,
        title: data.title,
        description: data.description,
        emoji: data.emoji,
        type: data.type as RelationshipEvent['type'],
      }]);
    }
  }, []);

  const update = useCallback(async (id: string, updates: Partial<RelationshipEvent>) => {
    const dbUpdates: Record<string, any> = {};
    if (updates.date !== undefined) dbUpdates.date = updates.date;
    if (updates.title !== undefined) dbUpdates.title = updates.title;
    if (updates.description !== undefined) dbUpdates.description = updates.description;
    if (updates.emoji !== undefined) dbUpdates.emoji = updates.emoji;

    const { error } = await supabase
      .from('relationship_events')
      .update(dbUpdates)
      .eq('id', id);
    if (!error) {
      setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
    }
  }, []);

  const remove = useCallback(async (id: string) => {
    const { error } = await supabase
      .from('relationship_events')
      .delete()
      .eq('id', id);
    if (!error) {
      setEvents(prev => prev.filter(e => e.id !== id));
    }
  }, []);

  return { events, add, update, remove, loading };
}
