import { motion } from 'framer-motion';
import type { TimelineEvent } from '@/data/adventures';

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline = ({ events }: TimelineProps) => {
  return (
    <div className="min-h-screen bg-background pt-16 md:pt-20 pb-24 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display text-cream mb-2">
            Nuestra Historia
          </h2>
          <p className="text-muted-foreground">
            Cada momento juntos, guardado para siempre
          </p>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-gold/40 via-rose/30 to-gold/10" />

          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className={`relative flex items-start mb-10 ${
                i % 2 === 0
                  ? 'md:flex-row md:text-right'
                  : 'md:flex-row-reverse md:text-left'
              } flex-row`}
            >
              {/* Dot */}
              <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full gradient-gold z-10 animate-pulse-glow" />

              {/* Content */}
              <div
                className={`ml-14 md:ml-0 md:w-[45%] ${
                  i % 2 === 0 ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                }`}
              >
                <div className="card-romantic">
                  <span className="text-2xl mb-2 block">{event.emoji}</span>
                  <p className="text-xs text-gold mb-1 font-medium">
                    {new Date(event.date).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <h3 className="font-display text-lg text-cream mb-1">
                    {event.title}
                  </h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
