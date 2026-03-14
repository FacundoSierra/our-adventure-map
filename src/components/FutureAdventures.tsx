import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import type { FutureAdventure } from '@/data/adventures';

interface FutureAdventuresProps {
  adventures: FutureAdventure[];
}

const FutureAdventures = ({ adventures }: FutureAdventuresProps) => {
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose/10 border border-rose/15 mb-5"
          >
            <Sparkles size={14} className="text-rose" />
            <span className="text-xs text-rose-light tracking-widest uppercase font-medium">Por vivir</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-display text-cream mb-3 tracking-tight">
            Próximas
            <br />
            <span className="text-gold italic">Aventuras</span>
          </h2>
          <p className="text-muted-foreground/50 text-sm">
            Destinos que nos esperan ✈️
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {adventures.map((adv, i) => (
            <motion.div
              key={adv.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/30 p-5 cursor-pointer transition-all duration-300 hover:border-rose/20 group"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }}
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-display text-lg text-cream group-hover:text-gold transition-colors duration-300 leading-tight">
                  {adv.name}
                </h3>
                <div className="flex gap-1 shrink-0 ml-3">
                  {Array.from({ length: adv.hearts }).map((_, j) => (
                    <Heart
                      key={j}
                      size={13}
                      className="text-rose"
                      fill="currentColor"
                    />
                  ))}
                  {Array.from({ length: 3 - adv.hearts }).map((_, j) => (
                    <Heart
                      key={`e-${j}`}
                      size={13}
                      className="text-muted-foreground/20"
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-foreground/50 leading-relaxed">
                {adv.note}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FutureAdventures;
