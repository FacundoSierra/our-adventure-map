import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Building2, Plane, Sparkles, BookHeart, Heart } from 'lucide-react';
import type { Place } from '@/data/adventures';
import { RELATIONSHIP_START } from '@/data/adventures';

interface TravelStatsProps {
  places: Place[];
}

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
  const cities = visited.length;
  const dreamed = places.filter((p) => p.category === 'dreamed').length;
  const memories = places.filter((p) => p.note).length;

  const stats = [
    { icon: <Globe size={24} />, value: countries, label: 'Países visitados' },
    { icon: <Building2 size={24} />, value: cities, label: 'Ciudades visitadas' },
    { icon: <Plane size={24} />, value: visited.length, label: 'Viajes juntos' },
    { icon: <Sparkles size={24} />, value: dreamed, label: 'Destinos soñados' },
    { icon: <BookHeart size={24} />, value: memories, label: 'Recuerdos guardados' },
  ];

  return (
    <div className="min-h-screen bg-background pt-16 md:pt-20 pb-24 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-display text-cream mb-2">
            Nuestros Números
          </h2>
          <p className="text-muted-foreground">La historia en datos ✨</p>
        </motion.div>

        {/* Time together */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="card-romantic text-center mb-10 glow-gold"
        >
          <Heart className="text-rose mx-auto mb-3" size={28} fill="currentColor" />
          <p className="text-sm text-gold mb-4 font-medium uppercase tracking-widest">
            Tiempo juntos
          </p>
          <div className="flex items-center justify-center gap-6 md:gap-10">
            {[
              { val: timeTogether.years, unit: 'años' },
              { val: timeTogether.months, unit: 'meses' },
              { val: timeTogether.days, unit: 'días' },
            ].map((t) => (
              <div key={t.unit} className="text-center">
                <span className="text-4xl md:text-5xl font-display text-cream block">
                  {t.val}
                </span>
                <span className="text-xs text-muted-foreground uppercase tracking-wider">
                  {t.unit}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="card-romantic text-center"
            >
              <div className="text-gold mb-2 flex justify-center">{stat.icon}</div>
              <span className="text-3xl font-display text-cream block mb-1">
                {stat.value}
              </span>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TravelStats;
