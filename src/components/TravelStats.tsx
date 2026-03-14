import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Building2, Plane, Sparkles, BookHeart, Heart } from 'lucide-react';
import type { Place } from '@/data/adventures';
import { RELATIONSHIP_START } from '@/data/adventures';

interface TravelStatsProps {
  places: Place[];
}

const StatCard = ({ icon, value, label, delay }: { icon: React.ReactNode; value: number; label: string; delay: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -3, scale: 1.02 }}
    className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border/30 p-5 text-center transition-all duration-300 hover:border-gold/20"
    style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.1)' }}
  >
    <div className="text-gold/70 mb-3 flex justify-center">{icon}</div>
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: delay + 0.2, type: 'spring', damping: 12 }}
      className="text-3xl md:text-4xl font-display text-cream block mb-1"
    >
      {value}
    </motion.span>
    <span className="text-[11px] text-muted-foreground/70 tracking-wider uppercase">{label}</span>
  </motion.div>
);

const TravelStats = ({ places }: TravelStatsProps) => {
  const [timeTogether, setTimeTogether] = useState({ years: 0, months: 0, days: 0 });

  useEffect(() => {
    const calc = () => {
      const start = new Date(RELATIONSHIP_START);
      const now = new Date();
      let years = now.getFullYear() - start.getFullYear();
      let months = now.getMonth() - start.getMonth();
      let days = now.getDate() - start.getDate();
      if (days < 0) {
        months--;
        days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
      }
      if (months < 0) {
        years--;
        months += 12;
      }
      setTimeTogether({ years, months, days });
    };
    calc();
    const interval = setInterval(calc, 60000);
    return () => clearInterval(interval);
  }, []);

  const visited = places.filter((p) => p.category === 'visited');
  const countries = new Set(visited.map((p) => p.country)).size;
  const dreamed = places.filter((p) => p.category === 'dreamed').length;
  const memories = places.filter((p) => p.note).length;

  const stats = [
    { icon: <Globe size={22} />, value: countries, label: 'Países' },
    { icon: <Building2 size={22} />, value: visited.length, label: 'Ciudades' },
    { icon: <Plane size={22} />, value: visited.length, label: 'Viajes' },
    { icon: <Sparkles size={22} />, value: dreamed, label: 'Soñados' },
    { icon: <BookHeart size={22} />, value: memories, label: 'Recuerdos' },
  ];

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
            Nuestros <span className="text-gold italic">Números</span>
          </h2>
          <p className="text-muted-foreground/60 text-sm">La historia contada en datos ✨</p>
        </motion.div>

        {/* Time together - hero card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-gold/15 p-8 md:p-10 text-center mb-10"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--card)) 0%, hsl(240 8% 16%) 100%)',
            boxShadow: '0 0 60px hsl(var(--gold) / 0.08), 0 20px 60px rgba(0,0,0,0.2)',
          }}
        >
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ background: 'radial-gradient(circle at 50% 0%, hsl(var(--gold)), transparent 60%)' }} />
          
          <Heart className="text-rose mx-auto mb-4 relative z-10" size={26} fill="currentColor" />
          <p className="text-[11px] text-gold/70 mb-6 font-medium uppercase tracking-[0.2em] relative z-10">
            Tiempo juntos
          </p>
          <div className="flex items-center justify-center gap-8 md:gap-14 relative z-10">
            {[
              { val: timeTogether.years, unit: 'años' },
              { val: timeTogether.months, unit: 'meses' },
              { val: timeTogether.days, unit: 'días' },
            ].map((t, i) => (
              <motion.div
                key={t.unit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.15 }}
                className="text-center"
              >
                <span className="text-5xl md:text-6xl font-display text-cream block leading-none">
                  {t.val}
                </span>
                <span className="text-[10px] text-muted-foreground/50 uppercase tracking-[0.15em] mt-2 block">
                  {t.unit}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} delay={0.3 + i * 0.08} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelStats;
