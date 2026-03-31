import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart } from 'lucide-react';

interface LoveLetterProps {
  onClose: () => void;
  startOpen?: boolean;
}

const LoveLetter = ({ onClose, startOpen = false }: LoveLetterProps) => {
  const [isOpen, setIsOpen] = useState(startOpen);

  return (
    <motion.div
      className="fixed inset-0 z-[2000] flex flex-col items-center justify-center overflow-hidden p-4"
      style={{
        background: 'radial-gradient(ellipse at 50% 30%, hsl(340 30% 12%), hsl(225 25% 8%) 60%, hsl(225 20% 5%))',
      }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.07]"
          style={{ background: 'radial-gradient(circle, hsl(var(--pink)), transparent 65%)' }} />
        <div className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.04]"
          style={{ background: 'radial-gradient(circle, hsl(var(--blue)), transparent 65%)' }} />
      </div>

      {/* Stars */}
      {Array.from({ length: 20 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-[2px] h-[2px] rounded-full bg-cream/20"
          style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
          animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1, 0.5] }}
          transition={{ duration: 3 + Math.random() * 4, delay: Math.random() * 5, repeat: Infinity }}
        />
      ))}

      <AnimatePresence mode="wait">
        {!isOpen ? (
          /* ── ENVELOPE ── */
          <motion.div
            key="envelope"
            className="flex flex-col items-center gap-6 cursor-pointer select-none"
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ scale: 0.6, opacity: 0, rotate: -8, y: -40 }}
            transition={{ type: 'spring', damping: 20, stiffness: 200, exit: { duration: 0.35 } }}
            whileHover={{ scale: 1.04, y: -8 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setIsOpen(true)}
          >
            {/* Envelope body */}
            <div
              className="relative"
              style={{ width: '288px', height: '208px' }}
            >
              {/* Body base */}
              <div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: 'linear-gradient(135deg, hsl(215 55% 22%), hsl(215 50% 17%))',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px hsl(215 50% 35% / 0.4), inset 0 1px 0 hsl(215 70% 55% / 0.15)',
                }}
              />

              {/* Left fold */}
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath: 'polygon(0 0, 0 100%, 52% 55%)',
                    background: 'hsl(215 45% 15%)',
                  }}
                />
              </div>

              {/* Right fold */}
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath: 'polygon(100% 0, 100% 100%, 48% 55%)',
                    background: 'hsl(215 48% 18%)',
                  }}
                />
              </div>

              {/* Bottom fold */}
              <div
                className="absolute inset-0 rounded-2xl overflow-hidden"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath: 'polygon(0 100%, 100% 100%, 50% 44%)',
                    background: 'hsl(215 50% 19%)',
                  }}
                />
              </div>

              {/* Top flap */}
              <div
                className="absolute inset-0 rounded-t-2xl overflow-hidden"
              >
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath: 'polygon(0 0, 100% 0, 50% 58%)',
                    background: 'linear-gradient(180deg, hsl(215 60% 28%), hsl(215 52% 22%))',
                  }}
                />
              </div>

              {/* Flap crease line */}
              <div
                className="absolute"
                style={{
                  top: '58%',
                  left: 0,
                  right: 0,
                  height: '1px',
                  background: 'hsl(340 50% 35% / 0.5)',
                }}
              />

              {/* Heart seal */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 z-10">
                <div
                  className="w-12 h-12 rounded-full gradient-pink-blue flex items-center justify-center"
                  style={{ boxShadow: '0 0 20px hsl(var(--blue) / 0.6)' }}
                >
                  <Heart size={22} className="text-white" fill="white" />
                </div>
              </div>

              {/* Shimmer line at bottom */}
              <div
                className="absolute bottom-0 left-6 right-6 h-px shimmer opacity-30 rounded-full"
              />
            </div>

            {/* Hint */}
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="text-sm text-foreground/50 tracking-widest font-light"
            >
              Toca para abrir 
            </motion.p>
          </motion.div>
        ) : (
          /* ── LETTER ── */
          <motion.div
            key="letter"
            className="w-full max-w-lg mx-auto"
            initial={{ y: 80, opacity: 0, scale: 0.92 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 22, stiffness: 200, delay: 0.1 }}
          >
            <div
              className="rounded-3xl overflow-hidden shadow-2xl"
              style={{ border: '1px solid hsl(340 40% 60% / 0.2)', maxHeight: '88vh', overflowY: 'auto' }}
            >
              {/* Header */}
              <div
                className="px-8 py-10 text-center relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg, hsl(340 50% 20%), hsl(340 40% 15%))' }}
              >
                {/* Glow */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{ background: 'radial-gradient(ellipse at 50% 0%, hsl(var(--pink-light)), transparent 70%)' }}
                />
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 12, stiffness: 100, delay: 0.3 }}
                  className="text-5xl mb-4 relative z-10"
                >
                  
                </motion.div>
                <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                  className="font-display text-3xl text-cream mb-2 relative z-10 tracking-tight"
                >
                  Cuatro Años Juntos
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-xs tracking-[0.25em] uppercase text-foreground/40 relative z-10"
                >
                  2 de Abril, 2026
                </motion.p>
                {/* Decorative line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="w-16 h-px mx-auto mt-5 shimmer opacity-60 relative z-10"
                />
              </div>

              {/* Letter body */}
              <div
                className="px-8 py-8"
                style={{ background: '#fdf6f0', color: '#2d1a1a' }}
              >
                {/* Salutation */}
                <p
                  className="font-display text-xl italic mb-6"
                  style={{ color: '#7a3040' }}
                >
                  Mi amor,
                </p>

                {/* Paragraphs */}
                <div className="space-y-5 text-sm leading-relaxed" style={{ color: '#3d2020' }}>
                  <p>
                    ya llegaron nuestros queridos y ansiados 4 añitos, esta vez la carta va a ser digital.
                    Que puedo decirte que no te haya dicho ya no? Sinceramente estos 4 años han sido los mejores años de mi vida,
                    he vivido tantos cosas a tu lado y tan buenas que aunque tenga poca memoria me pone feliz cada vez que hecho la vista atrás
                    y recuerdo todas las cosas que hemos vivido, como los increíbles viajes que hemos hecho, los eventos a los que hemos asistido,
                    las noches de fiesta, las tardes de mantita y peli que hacemos que nos encanta, las mañanas que nos despertamos juntos
                    (haciendo yo los honores por supuesto).. y podría seguir así con todas las cosas que hemos vivido,
                    todas igual de importantes e igual de bonitas.
                  </p>

                  <p>
                    Una de las cosas que escucho mucho hoy en dia es que las relaciones se vuelven monótonas, que después de los primeros
                    meses ya no es lo mismo, que el enamoramiento de los primeros meses se pierde etc.. Y debemos de ser unos raros
                    porque nosotros cada dia que pasa estamos mejor, la relación es mas bonita, cada vez estoy mas enamorado de ti,
                    cada vez tengo mas ganas de formar un hogar y una familia contigo, cada día que pasa quiero y tengo más, más y más contigo.
                  </p>

                  <p>
                    Quiero que sepas que nunca pero nunca tiraré esto que tenemos y siempre lucharé por lo nuestro,
                    soy un afortunado de tenerte y quiero que así sea el resto de mi vida.
                  </p>

                  <p className="font-medium" style={{ color: '#5a1a2a' }}>
                    Estoy supero orgulloso de ti y de la relación que tenemos, Feliz aniversario amor,
                    te dejo con lo que llevo preparando todo este tiempo,{' '}
                    <span className="font-bold uppercase tracking-wide">
                      TE AMO CON LOCURA Y CON TODO MI SER Y MI ALMA.
                    </span>
                  </p>
                </div>

                {/* Signature */}
                <div className="mt-8 text-right">
                  <div className="inline-flex flex-col items-end gap-1">
                    <p className="font-display italic text-base" style={{ color: '#7a3040' }}>
                      Con todo mi amor
                    </p>
                    <Heart size={18} fill="#c0385a" color="#c0385a" />
                  </div>
                </div>

                {/* Decorative bottom border */}
                <div
                  className="mt-8 h-px w-full rounded-full opacity-20"
                  style={{ background: 'linear-gradient(90deg, transparent, #c0385a, transparent)' }}
                />
              </div>

              {/* Footer / CTA */}
              <div
                className="px-8 py-6 text-center"
                style={{ background: 'hsl(340 30% 12%)' }}
              >
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onClose}
                  className="group relative px-10 py-4 rounded-full overflow-hidden font-semibold text-base tracking-wide glow-pink"
                >
                  <div className="absolute inset-0 gradient-pink-blue opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative z-10 text-white flex items-center gap-2">
                    Empezar nuestra aventura
                    <motion.span
                      animate={{ scale: [1, 1.25, 1] }}
                      transition={{ duration: 1.4, repeat: Infinity }}
                    >
                      <Heart size={17} fill="currentColor" />
                    </motion.span>
                  </span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default LoveLetter;
