import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, MapPin } from 'lucide-react';
import type { Destination, DestinationType } from '@/data/adventures';

interface DestinationFormProps {
  defaults: Partial<Destination>;
  editing: boolean;
  onSubmit: (data: Omit<Destination, 'id'>) => void;
  onClose: () => void;
}

const DestinationForm = ({ defaults, editing, onSubmit, onClose }: DestinationFormProps) => {
  const [city, setCity] = useState(defaults.city || '');
  const [country, setCountry] = useState(defaults.country || '');
  const [type, setType] = useState<DestinationType>(defaults.type || 'visited');
  const [date, setDate] = useState(defaults.date || '');
  const [note, setNote] = useState(defaults.note || '');
  const [emoji, setEmoji] = useState(defaults.emoji || '');
  const lat = defaults.lat || 0;
  const lng = defaults.lng || 0;

  useEffect(() => {
    setCity(defaults.city || '');
    setCountry(defaults.country || '');
    setType(defaults.type || 'visited');
    setDate(defaults.date || '');
    setNote(defaults.note || '');
    setEmoji(defaults.emoji || '');
  }, [defaults]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim() || !country.trim()) return;
    onSubmit({
      city: city.trim(),
      country: country.trim(),
      type,
      lat,
      lng,
      date: date || undefined,
      note: note || undefined,
      emoji: emoji || undefined,
    });
  };

  const inputClass = "w-full bg-muted/40 border border-border/40 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 z-[1002] flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
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
            <MapPin size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-display text-lg text-cream">{editing ? 'Editar destino' : 'Nuevo destino'}</h3>
            <p className="text-xs text-muted-foreground">
              {lat && lng ? `${lat.toFixed(2)}, ${lng.toFixed(2)}` : 'Completa la información'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <input className={inputClass} placeholder="Ciudad *" value={city} onChange={e => setCity(e.target.value)} required />
            <input className={inputClass} placeholder="País *" value={country} onChange={e => setCountry(e.target.value)} required />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setType('visited')}
              className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all border ${
                type === 'visited'
                  ? 'bg-secondary/15 border-secondary/40 text-secondary'
                  : 'bg-muted/20 border-border/30 text-muted-foreground hover:border-secondary/20'
              }`}
            >
              📍 Visitado
            </button>
            <button
              type="button"
              onClick={() => setType('wishlist')}
              className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all border ${
                type === 'wishlist'
                  ? 'bg-primary/15 border-primary/40 text-primary'
                  : 'bg-muted/20 border-border/30 text-muted-foreground hover:border-primary/20'
              }`}
            >
              💭 Queremos ir
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2">
              <input className={inputClass} type="date" value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <input className={inputClass} placeholder="Emoji" value={emoji} onChange={e => setEmoji(e.target.value)} maxLength={2} />
          </div>

          <textarea
            className={`${inputClass} resize-none`}
            placeholder="Nota o recuerdo (opcional)"
            rows={3}
            value={note}
            onChange={e => setNote(e.target.value)}
          />

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl gradient-pink-blue text-white font-semibold text-sm shadow-lg hover:opacity-90 transition-opacity"
          >
            {editing ? 'Guardar cambios' : 'Añadir destino'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default DestinationForm;
