import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { X, Heart } from 'lucide-react';
import type { RelationshipEvent } from '@/data/adventures';

interface EventFormProps {
  defaults?: Partial<RelationshipEvent>;
  editing: boolean;
  onSubmit: (data: Omit<RelationshipEvent, 'id'>) => void;
  onClose: () => void;
}

const EventForm = ({ defaults, editing, onSubmit, onClose }: EventFormProps) => {
  const [title, setTitle] = useState(defaults?.title || '');
  const [date, setDate] = useState(defaults?.date || '');
  const [description, setDescription] = useState(defaults?.description || '');
  const [emoji, setEmoji] = useState(defaults?.emoji || '💫');
  const [type, setType] = useState<'custom' | 'milestone'>(defaults?.type === 'milestone' ? 'milestone' : 'custom');

  useEffect(() => {
    setTitle(defaults?.title || '');
    setDate(defaults?.date || '');
    setDescription(defaults?.description || '');
    setEmoji(defaults?.emoji || '💫');
    setType(defaults?.type === 'milestone' ? 'milestone' : 'custom');
  }, [defaults]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !date) return;
    onSubmit({ title: title.trim(), date, description: description.trim(), emoji, type });
  };

  const inputClass = "w-full bg-muted/40 border border-border/40 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all";

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1200] flex items-center justify-center p-4"
    >
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        className="relative w-full max-w-md bg-card/98 backdrop-blur-2xl rounded-3xl border border-border/40 p-6 shadow-2xl"
      >
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <X size={16} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl gradient-pink-blue flex items-center justify-center">
            <Heart size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-display text-lg text-cream">{editing ? 'Editar evento' : 'Nuevo evento'}</h3>
            <p className="text-xs text-muted-foreground">Añade un momento especial a vuestra historia</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Type selector */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setType('custom')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                type === 'custom'
                  ? 'gradient-pink-blue text-white border-transparent shadow-lg'
                  : 'bg-muted/30 border-border/40 text-muted-foreground hover:border-primary/30'
              }`}
            >
              ⭐ Evento
            </button>
            <button
              type="button"
              onClick={() => setType('milestone')}
              className={`flex-1 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                type === 'milestone'
                  ? 'gradient-pink-blue text-white border-transparent shadow-lg'
                  : 'bg-muted/30 border-border/40 text-muted-foreground hover:border-primary/30'
              }`}
            >
              ❤️ Hito
            </button>
          </div>

          <input className={inputClass} placeholder="Título del evento *" value={title} onChange={e => setTitle(e.target.value)} required />
          
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <input className={inputClass} type="date" value={date} onChange={e => setDate(e.target.value)} required />
            </div>
            <input className={inputClass} placeholder="Emoji" value={emoji} onChange={e => setEmoji(e.target.value)} maxLength={2} />
          </div>

          <textarea
            className={`${inputClass} resize-none`}
            placeholder="Descripción (opcional)"
            rows={3}
            value={description}
            onChange={e => setDescription(e.target.value)}
          />

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl gradient-pink-blue text-white font-semibold text-sm shadow-lg hover:opacity-90 transition-opacity"
          >
            {editing ? 'Guardar cambios' : 'Añadir evento'}
          </button>
        </form>
      </motion.div>
    </motion.div>,
    document.body
  );
};

export default EventForm;
