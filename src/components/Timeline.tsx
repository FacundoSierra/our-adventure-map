import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Plus, Edit2, Trash2, Plane, Heart, PartyPopper, Star } from 'lucide-react';
import type { TimelineEvent, RelationshipEvent } from '@/data/adventures';
import EventForm from './EventForm';

interface TimelineProps {
  events: TimelineEvent[];
  onAddEvent: (event: Omit<RelationshipEvent, 'id' | 'type'>) => void;
  onUpdateEvent: (id: string, data: Partial<RelationshipEvent>) => void;
  onRemoveEvent: (id: string) => void;
}

const eventStyles: Record<string, { color: string; icon: React.ReactNode; label: string }> = {
  trip: { color: 'hsl(215 70% 55%)', icon: <Plane size={11} />, label: 'Viaje' },
  milestone: { color: 'hsl(340 65% 60%)', icon: <Heart size={11} />, label: 'Hito' },
  anniversary: { color: 'hsl(40 70% 60%)', icon: <PartyPopper size={11} />, label: 'Aniversario' },
  custom: { color: 'hsl(280 50% 60%)', icon: <Star size={11} />, label: 'Evento' },
};

function getStyle(event: TimelineEvent) {
  if (event.source === 'trip') return eventStyles.trip;
  if (event.eventType === 'anniversary') return eventStyles.anniversary;
  if (event.eventType === 'milestone') return eventStyles.milestone;
  return eventStyles.custom;
}

const Timeline = ({ events, onAddEvent, onUpdateEvent, onRemoveEvent }: TimelineProps) => {
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<TimelineEvent | null>(null);

  const handleEdit = (event: TimelineEvent) => {
    if (event.source === 'trip') return;
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

  // Group events by year
  const eventsByYear = events.reduce((acc, event) => {
    const year = event.date.substring(0, 4);
    if (!acc[year]) acc[year] = [];
    acc[year].push(event);
    return acc;
  }, {} as Record<string, TimelineEvent[]>);

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
            className="section-badge"
          >
            <Sparkles size={14} className="text-primary" />
            <span className="text-xs text-primary tracking-widest uppercase font-medium">Nuestra historia</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-display text-cream mb-3 tracking-tight">
            Cada momento,
            <br />
            <span className="text-pink-accent italic">guardado para siempre</span>
          </h2>
          <p className="text-muted-foreground/50 text-sm mb-6 max-w-md mx-auto">
            Los viajes realizados aparecen automáticamente · Los eventos se pueden editar y borrar
          </p>

          {/* Legend */}
          <div className="flex items-center justify-center gap-4 mb-6 flex-wrap">
            {Object.entries(eventStyles).map(([key, val]) => (
              <div key={key} className="flex items-center gap-1.5 text-xs text-muted-foreground/60">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: val.color }} />
                {val.label}
              </div>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setEditingEvent(null); setShowForm(true); }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full gradient-pink-blue text-white text-sm font-medium shadow-lg glow-pink transition-all duration-300"
          >
            <Plus size={16} />
            Añadir evento
          </motion.button>
        </motion.div>

        {events.length === 0 ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 text-muted-foreground/40">
            <Heart size={44} className="mx-auto mb-4 opacity-20" />
            <p className="text-sm font-display">Vuestra historia aparecerá aquí</p>
            <p className="text-xs mt-2 text-muted-foreground/30">Añade eventos o viajes realizados para construirla</p>
          </motion.div>
        ) : (
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px"
              style={{ background: 'linear-gradient(to bottom, hsl(var(--pink) / 0.25), hsl(var(--blue) / 0.15), hsl(var(--pink) / 0.05))' }} />

            {Object.entries(eventsByYear).map(([year, yearEvents]) => (
              <div key={year}>
                {/* Year label */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative flex items-center mb-6"
                >
                  <div className="absolute left-5 md:left-1/2 -translate-x-1/2 z-10">
                    <div className="w-10 h-10 rounded-full gradient-pink-blue flex items-center justify-center shadow-lg">
                      <span className="text-white text-xs font-bold">{year}</span>
                    </div>
                  </div>
                </motion.div>

                {yearEvents.map((event, i) => {
                  const style = getStyle(event);
                  const globalIndex = events.indexOf(event);
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ delay: i * 0.04, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className={`relative flex items-start mb-8 md:mb-10 ${
                        globalIndex % 2 === 0 ? 'md:flex-row md:text-right' : 'md:flex-row-reverse md:text-left'
                      } flex-row`}
                    >
                      {/* Dot */}
                      <div className="absolute left-5 md:left-1/2 -translate-x-1/2 z-10">
                        <div className="w-3.5 h-3.5 rounded-full border-2 border-card" style={{ background: style.color }} />
                        <div className="absolute inset-0 w-3.5 h-3.5 rounded-full animate-pulse-glow" style={{ background: style.color, opacity: 0.4 }} />
                      </div>

                      {/* Card */}
                      <div className={`ml-12 md:ml-0 md:w-[44%] ${globalIndex % 2 === 0 ? 'md:mr-auto md:pr-10' : 'md:ml-auto md:pl-10'}`}>
                        <motion.div
                          whileHover={{ y: -3, scale: 1.01 }}
                          className="group glass-card-hover p-5 relative"
                          style={{ boxShadow: `0 4px 24px rgba(0,0,0,0.15), 0 0 0 1px ${style.color}10` }}
                        >
                          {/* Edit/delete — events only */}
                          {event.source === 'event' && (
                            <div className={`absolute top-3 ${globalIndex % 2 === 0 ? 'md:left-3 right-3' : 'right-3'} flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                              <button onClick={() => handleEdit(event)} className="w-7 h-7 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-secondary transition-colors">
                                <Edit2 size={12} />
                              </button>
                              <button onClick={() => handleDelete(event)} className="w-7 h-7 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors">
                                <Trash2 size={12} />
                              </button>
                            </div>
                          )}

                          <div className="flex items-center gap-2.5 mb-3">
                            <span className="text-2xl">{event.emoji}</span>
                            <span className="flex items-center gap-1.5 text-[10px] px-2.5 py-1 rounded-full font-semibold tracking-wider uppercase" style={{ background: style.color + '15', color: style.color }}>
                              {style.icon} {style.label}
                            </span>
                          </div>
                          <p className="text-[11px] mb-2 font-medium tracking-widest uppercase" style={{ color: style.color + 'cc' }}>
                            {new Date(event.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}
                          </p>
                          <h3 className="font-display text-lg text-cream mb-1.5 leading-snug">{event.title}</h3>
                          <p className="text-sm text-foreground/50 leading-relaxed">{event.description}</p>
                        </motion.div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
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
