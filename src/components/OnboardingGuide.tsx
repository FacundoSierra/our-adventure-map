import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Heart,
  MapPin,
  PlusCircle,
  Palette,
  BookHeart,
  Pencil,
  Sparkles,
  Globe,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

interface OnboardingGuideProps {
  onClose: () => void;
}

interface Step {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  title: string;
  titleAccent?: string;
  description: string;
  detail?: string;
}

const steps: Step[] = [
  {
    icon: <Heart size={32} fill="currentColor" />,
    iconBg: 'from-pink-500/80 to-rose-400/80',
    label: 'Bienvenida',
    title: 'Nuestra historia',
    titleAccent: 'en el mapa',
    description:
      'Este es nuestro mapa de aventuras: un lugar íntimo donde cada viaje compartido queda guardado para siempre.',
    detail: 'Hecho con amor, para que nunca olvidemos lo lejos que hemos llegado juntos.',
  },
  {
    icon: <Globe size={32} />,
    iconBg: 'from-blue-500/80 to-cyan-400/80',
    label: 'El mapa',
    title: 'Exploramos',
    titleAccent: 'el mundo',
    description:
      'El mapa es interactivo. Toca cualquier país para hacer zoom y ver las ciudades que hemos visitado dentro de él.',
    detail: 'Cada marcador es un recuerdo. Cuantos más veamos, más aventuras hemos vivido.',
  },
  {
    icon: <PlusCircle size={32} />,
    iconBg: 'from-violet-500/80 to-purple-400/80',
    label: 'Añadir destinos',
    title: 'Guardamos',
    titleAccent: 'nuestros viajes',
    description:
      'Podemos añadir un nuevo destino pulsando el botón "+" en la pantalla, o tocando directamente sobre el mapa para elegir la ubicación.',
    detail: 'Rellenamos el nombre del lugar, la fecha y una nota especial del viaje.',
  },
  {
    icon: <Palette size={32} />,
    iconBg: 'from-pink-400/80 to-blue-500/80',
    label: 'Tipos de destinos',
    title: 'Visitados',
    titleAccent: 'y por visitar',
    description:
      'Los destinos visitados aparecen en azul. Los que tenemos pendientes, en rosa. Así siempre sabemos lo que queda por descubrir.',
    detail: 'Podemos cambiar el tipo de un destino cuando lo visitemos.',
  },
  {
    icon: <BookHeart size={32} />,
    iconBg: 'from-rose-400/80 to-pink-600/80',
    label: 'Nuestra historia',
    title: 'La línea',
    titleAccent: 'del tiempo',
    description:
      'En la sección "Historia" encontramos todos nuestros viajes ordenados cronológicamente, junto con hitos de nuestra relación.',
    detail: 'Los aniversarios y momentos especiales se añaden automáticamente.',
  },
  {
    icon: <Pencil size={32} />,
    iconBg: 'from-amber-400/80 to-orange-400/80',
    label: 'Edición',
    title: 'Editamos o',
    titleAccent: 'eliminamos',
    description:
      'Podemos tocar cualquier destino del mapa o la historia para editarlo: cambiar el nombre, la fecha, la nota o el tipo.',
    detail: 'También podemos eliminarlo si nos hemos equivocado. Sin miedo.',
  },
  {
    icon: <Sparkles size={32} />,
    iconBg: 'from-pink-500/80 to-violet-500/80',
    label: 'A volar',
    title: 'Ahora empieza',
    titleAccent: 'nuestra aventura',
    description:
      'Ya tenemos todo lo que necesitamos. Este mapa es nuestro, llenémoslo de colores, recuerdos y sueños por cumplir.',
    detail: undefined,
  },
];

const TOTAL = steps.length;

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 60 : -60,
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir > 0 ? -60 : 60,
    opacity: 0,
  }),
};

const OnboardingGuide = ({ onClose }: OnboardingGuideProps) => {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (next: number) => {
    setDirection(next > step ? 1 : -1);
    setStep(next);
  };

  const handleNext = () => {
    if (step < TOTAL - 1) go(step + 1);
    else onClose();
  };

  const handlePrev = () => {
    if (step > 0) go(step - 1);
  };

  const current = steps[step];
  const isLast = step === TOTAL - 1;

  return (
    <motion.div
      className="fixed inset-0 z-[2000] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-background/80 backdrop-blur-xl"
        onClick={onClose}
      />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, hsl(var(--pink)), transparent 65%)' }}
        />
        <div
          className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full opacity-[0.05]"
          style={{ background: 'radial-gradient(circle, hsl(var(--blue)), transparent 65%)' }}
        />
      </div>

      {/* Card */}
      <motion.div
        className="relative z-10 w-full max-w-sm"
        initial={{ scale: 0.92, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 20 }}
        transition={{ type: 'spring', damping: 24, stiffness: 260 }}
      >
        {/* Glass card */}
        <div
          className="rounded-3xl overflow-hidden"
          style={{
            background: 'hsl(var(--card) / 0.92)',
            border: '1px solid hsl(var(--border) / 0.4)',
            boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px hsl(var(--primary)/0.08)',
          }}
        >
          {/* Top accent bar */}
          <div className={`h-1 w-full bg-gradient-to-r ${current.iconBg}`} />

          <div className="p-7 pb-6">
            {/* Step label + skip */}
            <div className="flex items-center justify-between mb-6">
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-muted-foreground/50">
                {step + 1} / {TOTAL}
              </span>
              <button
                onClick={onClose}
                className="text-[10px] font-semibold tracking-wider uppercase text-muted-foreground/40 hover:text-muted-foreground transition-colors px-2 py-1 rounded-lg hover:bg-muted/30"
              >
                Saltar
              </button>
            </div>

            {/* Icon */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`icon-${step}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="mb-6 flex items-center"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${current.iconBg} flex items-center justify-center text-white shadow-lg`}
                  style={{ boxShadow: '0 8px 24px hsl(var(--primary)/0.25)' }}
                >
                  {current.icon}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Text */}
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={`text-${step}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.28, ease: 'easeOut' }}
              >
                <h2 className="font-display text-3xl text-foreground leading-tight mb-1">
                  {current.title}
                  {current.titleAccent && (
                    <>
                      <br />
                      <span
                        className="italic"
                        style={{
                          background: 'linear-gradient(90deg, hsl(var(--pink)), hsl(var(--blue)))',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        {current.titleAccent}
                      </span>
                    </>
                  )}
                </h2>

                <p className="text-sm text-foreground/70 leading-relaxed mt-4">
                  {current.description}
                </p>

                {current.detail && (
                  <p className="text-xs text-muted-foreground/50 leading-relaxed mt-3 italic">
                    {current.detail}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Progress dots */}
            <div className="flex items-center justify-center gap-1.5 mt-7 mb-6">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === step ? '20px' : '6px',
                    height: '6px',
                    background:
                      i === step
                        ? 'linear-gradient(90deg, hsl(var(--pink)), hsl(var(--blue)))'
                        : 'hsl(var(--muted-foreground) / 0.25)',
                  }}
                />
              ))}
            </div>

            {/* Navigation */}
            <div className="flex items-center gap-3">
              <motion.button
                onClick={handlePrev}
                disabled={step === 0}
                whileHover={step > 0 ? { scale: 1.04 } : {}}
                whileTap={step > 0 ? { scale: 0.96 } : {}}
                className="w-12 h-12 rounded-2xl flex items-center justify-center border border-border/40 text-muted-foreground transition-all duration-200 disabled:opacity-20 hover:enabled:bg-muted/40 hover:enabled:text-foreground"
              >
                <ChevronLeft size={20} />
              </motion.button>

              <motion.button
                onClick={handleNext}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex-1 h-12 rounded-2xl font-semibold text-sm tracking-wide text-white relative overflow-hidden"
                style={{
                  background: isLast
                    ? 'linear-gradient(135deg, hsl(var(--pink)), hsl(var(--blue)))'
                    : 'linear-gradient(135deg, hsl(var(--pink)/0.9), hsl(var(--blue)/0.9))',
                  boxShadow: '0 4px 20px hsl(var(--primary)/0.3)',
                }}
              >
                <div className="absolute inset-0 shimmer opacity-0 hover:opacity-100 transition-opacity duration-700" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLast ? (
                    <>
                      ¡Empezamos!
                      <Heart size={15} fill="currentColor" />
                    </>
                  ) : (
                    <>
                      Siguiente
                      <ChevronRight size={16} />
                    </>
                  )}
                </span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* MapPin watermark */}
        <div className="flex justify-center mt-4">
          <div className="flex items-center gap-1.5 text-muted-foreground/20 text-xs">
            <MapPin size={11} />
            <span className="tracking-widest uppercase font-medium text-[10px]">Our Adventure Map</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default OnboardingGuide;
