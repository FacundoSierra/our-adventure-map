import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import type { TimelineEvent } from '@/data/adventures';

interface TimelineProps {
  events: TimelineEvent[];
}

const Timeline = ({ events }: TimelineProps) => {
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
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/15 mb-5"
          >
            <Sparkles size={14} className="text-gold" />
            <span className="text-xs text-gold tracking-widest uppercase font-medium">Nuestra historia</span>
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-display text-cream mb-3 tracking-tight">
            Cada momento,
            <br />
            <span className="text-gold italic">guardado para siempre</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, hsl(var(--gold) / 0.3), hsl(var(--rose) / 0.2), hsl(var(--gold) / 0.05))' }} />

          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.1, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex items-start mb-8 md:mb-12 ${
                i % 2 === 0
                  ? 'md:flex-row md:text-right'
                  : 'md:flex-row-reverse md:text-left'
              } flex-row`}
            >
              {/* Dot with glow */}
              <div className="absolute left-5 md:left-1/2 -translate-x-1/2 z-10">
                <div className="w-3 h-3 rounded-full gradient-gold" />
                <div className="absolute inset-0 w-3 h-3 rounded-full gradient-gold animate-pulse-glow" />
              </div>

              <div
                className={`ml-12 md:ml-0 md:w-[44%] ${
                  i % 2 === 0 ? 'md:mr-auto md:pr-10' : 'md:ml-auto md:pl-10'
                }`}
              >
                <motion.div 
                  whileHover={{ y: -2 }}
                  className="bg-card/60 backdrop-blur-sm rounded-2xl border border-border/40 p-5 transition-all duration-300 hover:border-gold/20 hover:shadow-lg"
                  style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.15)' }}
                >
                  <span className="text-2xl mb-2 block">{event.emoji}</span>
                  <p className="text-[11px] text-gold/80 mb-1.5 font-medium tracking-widest uppercase">
                    {new Date(event.date).toLocaleDateString('es-ES', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </p>
                  <h3 className="font-display text-lg text-cream mb-1.5 leading-snug">
                    {event.title}
                  </h3>
                  <p className="text-sm text-foreground/55 leading-relaxed">
                    {event.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
