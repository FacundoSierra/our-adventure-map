import { motion } from 'framer-motion';
import { Star, Sparkles, Heart } from 'lucide-react';
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
    <div className="min-h-screen bg-background pt-8 md:pt-16 pb-28 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-display text-cream mb-3 tracking-tight">
            Álbum de <span className="text-gold italic">Recuerdos</span>
          </h2>
          <p className="text-muted-foreground/60 text-sm">
            Nuestro diario de aventuras juntos 📖
          </p>
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-gold/5 border border-gold/10">
            <Sparkles className="text-gold/60" size={14} />
            <span className="text-sm text-gold-light/70 italic font-display">
              {randomQuote}
            </span>
          </div>
        </motion.div>

        <div className="space-y-4">
          {memorablePlaces.map((place, i) => (
            <motion.div
              key={place.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-30px' }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -2 }}
              className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/30 p-5 md:p-6 transition-all duration-300 hover:border-gold/20"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center text-2xl shrink-0">
                  {place.emoji || '📍'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display text-lg md:text-xl text-cream leading-tight truncate">
                      {place.name}
                      <span className="text-muted-foreground font-body text-sm">, {place.country}</span>
                    </h3>
                    {place.isFavorite && (
                      <Star className="text-gold shrink-0" size={15} fill="currentColor" />
                    )}
                  </div>
                  {place.date && (
                    <p className="text-[11px] text-gold/60 mb-2.5 tracking-widest uppercase font-medium">
                      {new Date(place.date).toLocaleDateString('es-ES', {
                        year: 'numeric',
                        month: 'long',
                      })}
                    </p>
                  )}
                  {place.note && (
                    <p className="text-sm text-foreground/55 leading-relaxed mb-3">
                      {place.note}
                    </p>
                  )}
                  {place.surpriseMessage && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      className="flex items-start gap-2.5 p-3.5 rounded-xl bg-muted/40 border border-gold/10"
                    >
                      <Heart className="text-rose shrink-0 mt-0.5" size={13} fill="currentColor" />
                      <p className="text-sm text-gold-light/80 italic leading-relaxed">
                        {place.surpriseMessage}
                      </p>
                    </motion.div>
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
