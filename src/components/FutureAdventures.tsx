import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import type { FutureAdventure } from '@/data/adventures';

interface FutureAdventuresProps {
  adventures: FutureAdventure[];
}

const FutureAdventures = ({ adventures }: FutureAdventuresProps) => {
  return (
    <div className="min-h-screen bg-background pt-16 md:pt-20 pb-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display text-cream mb-2">
            Próximas Aventuras
          </h2>
          <p className="text-muted-foreground">
            Destinos que nos esperan en el futuro ✈️
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adventures.map((adv, i) => (
            <motion.div
              key={adv.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="card-romantic group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-display text-xl text-cream group-hover:text-gold transition-colors">
                  {adv.name}
                </h3>
                <div className="flex gap-0.5">
                  {Array.from({ length: adv.hearts }).map((_, j) => (
                    <Heart
                      key={j}
                      size={14}
                      className="text-rose"
                      fill="currentColor"
                    />
                  ))}
                  {Array.from({ length: 3 - adv.hearts }).map((_, j) => (
                    <Heart
                      key={`e-${j}`}
                      size={14}
                      className="text-muted-foreground/30"
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-foreground/70 leading-relaxed">
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
