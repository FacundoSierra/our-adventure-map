import { motion } from 'framer-motion';
import { Star, Sparkles, Heart } from 'lucide-react';
import type { Destination } from '@/data/adventures';
import { romanticQuotes } from '@/data/adventures';

interface MemoryAlbumProps {
  destinations: Destination[];
}

const MemoryAlbum = ({ destinations }: MemoryAlbumProps) => {
  const visited = destinations.filter(d => d.type === 'visited');
  const wishlist = destinations.filter(d => d.type === 'wishlist');
  const randomQuote = romanticQuotes[Math.floor(Math.random() * romanticQuotes.length)];

  return (
    <div className="min-h-screen bg-background pt-8 md:pt-16 pb-28 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-display text-cream mb-3 tracking-tight">
            Álbum de <span className="text-pink-accent italic">Recuerdos</span>
          </h2>
          <p className="text-muted-foreground/60 text-sm">Nuestro diario de aventuras juntos 📖</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.6 }} className="text-center mb-12">
          <div className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-primary/5 border border-primary/10">
            <Sparkles className="text-primary/60" size={14} />
            <span className="text-sm text-pink-light/70 italic font-display">{randomQuote}</span>
          </div>
        </motion.div>

        {/* Visited */}
        {visited.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-secondary mb-4 px-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary" /> Lugares visitados
            </h3>
            <div className="space-y-3">
              {visited.map((dest, i) => (
                <motion.div
                  key={dest.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -2 }}
                  className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/30 p-5 md:p-6 transition-all duration-300 hover:border-secondary/20"
                  style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-2xl shrink-0">
                      {dest.emoji || '📍'}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-lg md:text-xl text-cream leading-tight truncate">
                        {dest.city}<span className="text-muted-foreground font-body text-sm">, {dest.country}</span>
                      </h3>
                      {dest.date && (
                        <p className="text-[11px] text-secondary/60 mb-2.5 tracking-widest uppercase font-medium">
                          {new Date(dest.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' })}
                        </p>
                      )}
                      {dest.note && <p className="text-sm text-foreground/55 leading-relaxed">{dest.note}</p>}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Wishlist */}
        {wishlist.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-primary mb-4 px-1 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" /> Queremos visitar
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {wishlist.map((dest, i) => (
                <motion.div
                  key={dest.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/30 p-5 cursor-pointer transition-all duration-300 hover:border-primary/20 group"
                  style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }}
                >
                  <div className="flex items-start gap-3 mb-2">
                    <span className="text-xl">{dest.emoji || '💭'}</span>
                    <h4 className="font-display text-lg text-cream group-hover:text-primary transition-colors duration-300 leading-tight">
                      {dest.city}, {dest.country}
                    </h4>
                  </div>
                  {dest.note && <p className="text-sm text-foreground/50 leading-relaxed pl-8">{dest.note}</p>}
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MemoryAlbum;
