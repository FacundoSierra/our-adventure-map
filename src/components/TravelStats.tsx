import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Globe, Building2, Plane, Sparkles, BookHeart, Heart, MapPin } from 'lucide-react';
import type { Destination } from '@/data/adventures';
import { RELATIONSHIP_START, surpriseMessages } from '@/data/adventures';

interface TravelStatsProps {
  destinations: Destination[];
}

const StatCard = ({ icon, value, label, delay, color }: { icon: React.ReactNode; value: number; label: string; delay: number; color?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ y: -4, scale: 1.03 }}
    className="glass-card-hover p-5 md:p-6 text-center"
  >
    <div className="mb-3 flex justify-center" style={{ color: color || 'hsl(var(--primary))' }}>{icon}</div>
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: delay + 0.2, type: 'spring', damping: 12 }}
      className="text-3xl md:text-4xl font-display text-cream block mb-1.5"
    >
      {value}
    </motion.span>
    <span className="text-[10px] text-muted-foreground/60 tracking-wider uppercase font-medium">{label}</span>
  </motion.div>
);

const TravelStats = ({ destinations }: TravelStatsProps) => {
  const [timeTogether, setTimeTogether] = useState({ years: 0, months: 0, days: 0 });
  const [showSurprise, setShowSurprise] = useState(false);
  const [surpriseMsg] = useState(() => surpriseMessages[Math.floor(Math.random() * surpriseMessages.length)]);

  useEffect(() => {
    const calc = () => {
      const start = new Date(RELATIONSHIP_START);
      const now = new Date();
      let years = now.getFullYear() - start.getFullYear();
      let months = now.getMonth() - start.getMonth();
      let days = now.getDate() - start.getDate();
      if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
      if (months < 0) { years--; months += 12; }
      setTimeTogether({ years, months, days });
    };
    calc();
    const interval = setInterval(calc, 60000);
    return () => clearInterval(interval);
  }, []);

  const visited = destinations.filter(d => d.type === 'visited');
  const countries = new Set(visited.map(d => d.country)).size;
  const wishlist = destinations.filter(d => d.type === 'wishlist').length;
  const memories = destinations.filter(d => d.note).length;
  const totalDays = Math.floor((Date.now() - new Date(RELATIONSHIP_START).getTime()) / 86400000);

  const stats = [
    { icon: <Globe size={24} />, value: countries, label: 'Países', color: 'hsl(var(--blue))' },
    { icon: <Building2 size={24} />, value: visited.length, label: 'Ciudades', color: 'hsl(var(--blue-light))' },
    { icon: <Plane size={24} />, value: visited.length, label: 'Viajes', color: 'hsl(var(--secondary))' },
    { icon: <MapPin size={24} />, value: wishlist, label: 'Por visitar', color: 'hsl(var(--pink))' },
    { icon: <BookHeart size={24} />, value: memories, label: 'Recuerdos', color: 'hsl(var(--pink-light))' },
    { icon: <Sparkles size={24} />, value: destinations.length, label: 'Aventuras', color: 'hsl(var(--purple))' },
  ];

  return (
    <div className="min-h-screen bg-background pt-8 md:pt-16 pb-28 px-4">
      <div className="max-w-2xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12">
          <div className="section-badge">
            <Sparkles size={14} className="text-primary" />
            <span className="text-xs text-primary tracking-widest uppercase font-medium">Estadísticas</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display text-cream mb-3 tracking-tight">
            Nuestros <span className="text-pink-accent italic">Números</span>
          </h2>
          <p className="text-muted-foreground/50 text-sm">La historia contada en datos ✨</p>
        </motion.div>

        {/* Time together — premium card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-primary/12 p-8 md:p-10 text-center mb-10 cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, hsl(225 18% 12%) 0%, hsl(340 20% 12%) 50%, hsl(225 18% 11%) 100%)',
          }}
          onClick={() => setShowSurprise(!showSurprise)}
        >
          <div className="absolute inset-0 glow-premium opacity-50" />
          <div className="absolute inset-0 opacity-[0.04]" style={{ background: 'radial-gradient(circle at 50% 0%, hsl(var(--pink)), transparent 60%)' }} />
          
          <Heart className="text-primary mx-auto mb-4 relative z-10 animate-gentle-bounce" size={28} fill="currentColor" />
          <p className="text-[10px] text-primary/60 mb-6 font-semibold uppercase tracking-[0.25em] relative z-10">Tiempo juntos</p>
          
          <div className="flex items-center justify-center gap-6 md:gap-12 relative z-10 mb-4">
            {[
              { val: timeTogether.years, unit: 'años' },
              { val: timeTogether.months, unit: 'meses' },
              { val: timeTogether.days, unit: 'días' },
            ].map((t, i) => (
              <motion.div key={t.unit} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.15 }} className="text-center">
                <span className="text-5xl md:text-6xl font-display text-cream block leading-none">{t.val}</span>
                <span className="text-[9px] text-muted-foreground/40 uppercase tracking-[0.2em] mt-2 block font-medium">{t.unit}</span>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 1 }}
            className="text-xs text-muted-foreground relative z-10"
          >
            {totalDays.toLocaleString()} días exactos 💕
          </motion.p>

          {/* Surprise message */}
          {showSurprise && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 px-4 py-3 rounded-xl bg-primary/10 border border-primary/15 relative z-10"
            >
              <p className="text-sm text-primary/80 italic font-display">{surpriseMsg}</p>
            </motion.div>
          )}
        </motion.div>

        {/* Stats grid */}
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
