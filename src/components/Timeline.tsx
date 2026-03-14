import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Plus, Edit2, Trash2, Plane, Heart } from 'lucide-react';
import type { TimelineEvent, RelationshipEvent } from '@/data/adventures';
import EventForm from './EventForm';

interface TimelineProps {
  events: TimelineEvent[];
  onAddEvent: (event: Omit<RelationshipEvent, 'id' | 'type'>) => void;
  onUpdateEvent: (id: string, data: Partial<RelationshipEvent>) => void;
  onRemoveEvent: (id: string) => void;
}

const sourceColor = (source: TimelineEvent['source']) =>
  source === 'trip' ? 'hsl(215 70% 55%)' : 'hsl(340 65% 60%)';

const Timeline = ({ events, onAddEvent, onUpdateEvent, onRemoveEvent }: TimelineProps) => {
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<TimelineEvent | null>(null);

  const handleEdit = (event: TimelineEvent) => {
    if (event.source === 'trip') return; // Trips se editan desde el mapa
    setEditingEvent(event);
    setShowForm(true);
  };

  const handleDelete = (event: TimelineEvent) => {
    if (event.source === 'trip') return;
    onRemoveEvent(event.id);
  };

  const handleSubmit = (data: Omit<RelationshipEvent, 'id' | 'type'>) => {
    if (editingEvent) {
      onUpdateEvent(editingEvent.id, data);
    } else {
      onAddEvent(data);
    }
    setShowForm(false);
    setEditingEvent(null);
  };

  return (
    <div className="min-h-screen bg-background pt-8 md:pt-16 pb-28 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/15 mb-5"
          >
            <Sparkles size={14} className="text-primary" />
            <span className="text-xs text-primary tracking-widest uppercase font-medium">Nuestra historia</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-display text-cream mb-3 tracking-tight">
            Cada momento,
            <br />
            <span className="text-pink-accent italic">guardado para siempre</span>
          </h2>
          <p className="text-muted-foreground/60 text-sm mb-6">
            Los viajes realizados aparecen automáticamente · Los eventos se pueden editar y borrar
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setEditingEvent(null); setShowForm(true); }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/90 text-primary-foreground text-sm font-medium shadow-lg hover:bg-primary transition-colors"
          >
            <Plus size={16} />
            Añadir evento
          </motion.button>
        </motion.div>

        {events.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 text-muted-foreground/50">
            <Heart size={40} className="mx-auto mb-4 opacity-30" />
            <p className="text-sm">Vuestra historia aparecerá aquí</p>
            <p className="text-xs mt-1">Añade eventos o viajes realizados para construirla</p>
          </motion.div>
        ) : (
          <div className="relative">
            <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(to bottom, hsl(var(--pink) / 0.3), hsl(var(--blue) / 0.2), hsl(var(--pink) / 0.05))' }} />

            {events.map((event, i) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ delay: i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className={`relative flex items-start mb-8 md:mb-12 ${
                  i % 2 === 0 ? 'md:flex-row md:text-right' : 'md:flex-row-reverse md:text-left'
                } flex-row`}
              >
                <div className="absolute left-5 md:left-1/2 -translate-x-1/2 z-10">
                  <div className="w-3 h-3 rounded-full" style={{ background: sourceColor(event.source) }} />
                  <div className="absolute inset-0 w-3 h-3 rounded-full animate-pulse-glow" style={{ background: sourceColor(event.source) }} />
                </div>

                <div className={`ml-12 md:ml-0 md:w-[44%] ${i % 2 === 0 ? 'md:mr-auto md:pr-10' : 'md:ml-auto md:pl-10'}`}>
                  <motion.div
                    whileHover={{ y: -2 }}
                    className="group bg-card/60 backdrop-blur-sm rounded-2xl border border-border/40 p-5 transition-all duration-300 hover:border-primary/20 hover:shadow-lg relative"
                    style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}
                  >
                    {/* Edit/delete buttons — events only (trips are edited from the map) */}
                    {event.source === 'event' && (
                      <div className={`absolute top-3 ${i % 2 === 0 ? 'md:left-3 right-3' : 'right-3'} flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity`}>
                        <button onClick={() => handleEdit(event)} className="w-6 h-6 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-secondary transition-colors">
                          <Edit2 size={11} />
                        </button>
                        <button onClick={() => handleDelete(event)} className="w-6 h-6 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors">
                          <Trash2 size={11} />
                        </button>
                      </div>
                    )}

                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-2xl">{event.emoji}</span>
                      <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: sourceColor(event.source) + '20', color: sourceColor(event.source) }}>
                        {event.source === 'trip' ? <><Plane size={10} /> Viaje</> : <><Heart size={10} /> Evento</>}
                      </span>
                    </div>
                    <p className="text-[11px] text-primary/80 mb-1.5 font-medium tracking-widest uppercase">
                      {new Date(event.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <h3 className="font-display text-lg text-cream mb-1.5 leading-snug">{event.title}</h3>
                    <p className="text-sm text-foreground/55 leading-relaxed">{event.description}</p>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <EventForm
            defaults={editingEvent ? { title: editingEvent.title, date: editingEvent.date, description: editingEvent.description, emoji: editingEvent.emoji } : undefined}
            editing={!!editingEvent}
            onSubmit={handleSubmit}
            onClose={() => { setShowForm(false); setEditingEvent(null); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Timeline;
