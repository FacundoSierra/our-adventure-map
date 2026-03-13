import { motion } from 'framer-motion';
import { Star, Sparkles } from 'lucide-react';
import type { Place } from '@/data/adventures';
import { romanticQuotes } from '@/data/adventures';

interface MemoryAlbumProps {
  places: Place[];
}

const MemoryAlbum = ({ places }: MemoryAlbumProps) => {
  const memorablePlaces = places.filter(
    (p) => p.category === 'visited' || p.category === 'special'
  );

  const randomQuote = romanticQuotes[Math.floor(Math.random() * romanticQuotes.length)];

  return (
    <div className="min-h-screen bg-background pt-16 md:pt-20 pb-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display text-cream mb-2">
            Álbum de Recuerdos
          </h2>
          <p className="text-muted-foreground">
            Nuestro diario de aventuras juntos 📖
          </p>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-muted border border-gold/10">
            <Sparkles className="text-gold" size={16} />
            <span className="text-sm text-gold-light italic font-display">
              {randomQuote}
            </span>
          </div>
        </motion.div>

        <div className="space-y-6">
          {memorablePlaces.map((place, i) => (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card-romantic"
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl">{place.emoji || '📍'}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display text-xl text-cream">
                      {place.name}, {place.country}
                    </h3>
                    {place.isFavorite && (
                      <Star
                        className="text-gold"
                        size={16}
                        fill="currentColor"
                      />
                    )}
                  </div>
                  {place.date && (
                    <p className="text-xs text-gold mb-2">
                      {new Date(place.date).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                      })}
                    </p>
                  )}
                  {place.note && (
                    <p className="text-sm text-foreground/70 leading-relaxed mb-3">
                      {place.note}
                    </p>
                  )}
                  {place.surpriseMessage && (
                    <div className="flex items-start gap-2 p-3 rounded-xl bg-muted border border-gold/15">
                      <Sparkles className="text-gold shrink-0 mt-0.5" size={14} />
                      <p className="text-sm text-gold-light italic">
                        {place.surpriseMessage}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MemoryAlbum;
