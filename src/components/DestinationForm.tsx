import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, MapPin, Search, Loader2 } from 'lucide-react';
import type { Destination, DestinationType } from '@/data/adventures';
import { geocodeCity, searchCities } from '@/lib/geocode';
import ImageUploader, { type CoverSource } from './ImageUploader';

const MAX_IMAGES = 10;

export interface ImageSubmitData {
  keptUrls: string[];
  removedUrls: string[];
  newFiles: File[];
  cover: CoverSource;
}

interface DestinationFormProps {
  defaults: Partial<Destination>;
  editing: boolean;
  onSubmit: (data: Omit<Destination, 'id'>, imageData: ImageSubmitData) => void;
  onClose: () => void;
}

const DestinationForm = ({ defaults, editing, onSubmit, onClose }: DestinationFormProps) => {
  const [city, setCity] = useState(defaults.city || '');
  const [country, setCountry] = useState(defaults.country || '');
  const [type, setType] = useState<DestinationType>(defaults.type || 'visited');
  const [date, setDate] = useState(defaults.date || '');
  const [note, setNote] = useState(defaults.note || '');
  const [emoji, setEmoji] = useState(defaults.emoji || '');
  const [lat, setLat] = useState(defaults.lat || 0);
  const [lng, setLng] = useState(defaults.lng || 0);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Array<{ city: string; country: string; lat: number; lng: number }>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [geocoding, setGeocoding] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  // Image state
  const [existingImages, setExistingImages] = useState<string[]>(defaults.images ?? []);
  const [removedUrls, setRemovedUrls] = useState<string[]>([]);
  const [pendingFiles, setPendingFiles] = useState<File[]>([]);
  const [pendingPreviews, setPendingPreviews] = useState<string[]>([]);
  const [cover, setCover] = useState<CoverSource>(
    defaults.coverImage ? { type: 'existing', url: defaults.coverImage } : null,
  );

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      pendingPreviews.forEach(p => URL.revokeObjectURL(p));
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setCity(defaults.city || '');
    setCountry(defaults.country || '');
    setType(defaults.type || 'visited');
    setDate(defaults.date || '');
    setNote(defaults.note || '');
    setEmoji(defaults.emoji || '');
    setLat(defaults.lat || 0);
    setLng(defaults.lng || 0);
    setExistingImages(defaults.images ?? []);
    setRemovedUrls([]);
    setPendingFiles([]);
    setPendingPreviews(prev => { prev.forEach(p => URL.revokeObjectURL(p)); return []; });
    setCover(defaults.coverImage ? { type: 'existing', url: defaults.coverImage } : null);
  }, [defaults]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.length < 2) { setSuggestions([]); setShowSuggestions(false); return; }
    debounceRef.current = setTimeout(async () => {
      const results = await searchCities(value);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    }, 400);
  };

  const handleSelectSuggestion = (s: { city: string; country: string; lat: number; lng: number }) => {
    setCity(s.city); setCountry(s.country); setLat(s.lat); setLng(s.lng);
    setSearchQuery(''); setSuggestions([]); setShowSuggestions(false);
  };

  // Image handlers
  const handleAddFiles = (files: FileList) => {
    const remaining = MAX_IMAGES - existingImages.length - pendingFiles.length;
    const toAdd = Array.from(files).slice(0, remaining);
    const previews = toAdd.map(f => URL.createObjectURL(f));
    setPendingFiles(prev => [...prev, ...toAdd]);
    setPendingPreviews(prev => [...prev, ...previews]);
  };

  const handleRemoveExisting = (url: string) => {
    setExistingImages(prev => prev.filter(u => u !== url));
    setRemovedUrls(prev => [...prev, url]);
    if (cover?.type === 'existing' && cover.url === url) setCover(null);
  };

  const handleRemovePending = (idx: number) => {
    URL.revokeObjectURL(pendingPreviews[idx]);
    setPendingFiles(prev => prev.filter((_, i) => i !== idx));
    setPendingPreviews(prev => prev.filter((_, i) => i !== idx));
    if (cover?.type === 'pending') {
      if (cover.idx === idx) setCover(null);
      else if (cover.idx > idx) setCover({ type: 'pending', idx: cover.idx - 1 });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!city.trim() || !country.trim()) return;

    let finalLat = lat;
    let finalLng = lng;
    if (!finalLat && !finalLng) {
      setGeocoding(true);
      const result = await geocodeCity(city.trim(), country.trim());
      setGeocoding(false);
      if (result) { finalLat = result.lat; finalLng = result.lng; }
    }

    onSubmit(
      {
        city: city.trim(),
        country: country.trim(),
        type,
        lat: finalLat,
        lng: finalLng,
        date: date || undefined,
        note: note || undefined,
        emoji: emoji || undefined,
      },
      {
        keptUrls: existingImages,
        removedUrls,
        newFiles: pendingFiles,
        cover,
      },
    );
  };

  const inputClass =
    'w-full bg-muted/40 border border-border/40 rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/30 transition-all';

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
        className="relative w-full max-w-md bg-card/98 backdrop-blur-2xl rounded-3xl border border-border/40 p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl gradient-pink-blue flex items-center justify-center">
            <MapPin size={20} className="text-white" />
          </div>
          <div>
            <h3 className="font-display text-lg text-cream">{editing ? 'Editar destino' : 'Nuevo destino'}</h3>
            <p className="text-xs text-muted-foreground">
              {lat && lng ? `📍 ${lat.toFixed(2)}, ${lng.toFixed(2)}` : 'Busca o escribe la ciudad'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* City search */}
          <div className="relative">
            <div className="relative">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
              <input
                className={`${inputClass} pl-9`}
                placeholder="Buscar ciudad..."
                value={searchQuery}
                onChange={e => handleSearchChange(e.target.value)}
              />
            </div>
            {showSuggestions && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-card/98 backdrop-blur-xl border border-border/40 rounded-xl overflow-hidden shadow-xl z-10">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelectSuggestion(s)}
                    className="w-full text-left px-4 py-2.5 text-sm hover:bg-muted/40 transition-colors flex items-center gap-2"
                  >
                    <MapPin size={12} className="text-primary shrink-0" />
                    <span className="text-cream">{s.city}</span>
                    <span className="text-muted-foreground text-xs">{s.country}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

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

          {/* Divider */}
          <div className="border-t border-border/30" />

          {/* Image uploader */}
          <ImageUploader
            existingImages={existingImages}
            pendingPreviews={pendingPreviews}
            cover={cover}
            onAddFiles={handleAddFiles}
            onRemoveExisting={handleRemoveExisting}
            onRemovePending={handleRemovePending}
            onSetCover={setCover}
            maxImages={MAX_IMAGES}
          />

          <button
            type="submit"
            disabled={geocoding}
            className="w-full py-3.5 rounded-xl gradient-pink-blue text-white font-semibold text-sm shadow-lg hover:opacity-90 transition-opacity disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {geocoding && <Loader2 size={16} className="animate-spin" />}
            {editing ? 'Guardar cambios' : 'Añadir destino'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default DestinationForm;
