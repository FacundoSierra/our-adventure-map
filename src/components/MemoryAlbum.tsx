import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, Quote, Camera, MapPin, ChevronDown } from 'lucide-react';
import type { Destination } from '@/data/adventures';
import { romanticQuotes } from '@/data/adventures';

interface MemoryAlbumProps {
  destinations: Destination[];
  onOpenLightbox: (images: string[], index: number) => void;
}

const MemoryAlbum = ({ destinations, onOpenLightbox }: MemoryAlbumProps) => {
  const visited = destinations.filter(d => d.type === 'visited');
  const wishlist = destinations.filter(d => d.type === 'wishlist');
  const [randomQuote] = useState(() => romanticQuotes[Math.floor(Math.random() * romanticQuotes.length)]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-background pt-8 md:pt-16 pb-28 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12">
          <div className="section-badge">
            <Sparkles size={14} className="text-primary" />
            <span className="text-xs text-primary tracking-widest uppercase font-medium">Recuerdos</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-display text-cream mb-3 tracking-tight">
            Álbum de <span className="text-pink-accent italic">Recuerdos</span>
          </h2>
          <p className="text-muted-foreground/50 text-sm">Nuestro diario de aventuras juntos 📖</p>
        </motion.div>

        {/* Romantic quote */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl glass-card">
            <Quote className="text-primary/40 shrink-0" size={16} />
            <span className="text-sm text-primary/60 italic font-display">{randomQuote}</span>
          </div>
        </motion.div>

        {/* Visited */}
        {visited.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-secondary/80 mb-5 px-1 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-secondary" /> Nuestros viajes
            </h3>
            <div className="space-y-5">
              {visited.map((dest, i) => {
                const hasImages = dest.images && dest.images.length > 0;
                const isExpanded = expandedId === dest.id;

                return (
                  <motion.div
                    key={dest.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{ delay: i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden rounded-3xl border border-border/20 cursor-pointer"
                    style={{ background: 'hsl(var(--card) / 0.7)', backdropFilter: 'blur(12px)' }}
                    onClick={() => setExpandedId(isExpanded ? null : dest.id)}
                  >
                    {/* Cover photo — magazine style */}
                    <div className="relative w-full overflow-hidden" style={{ height: dest.coverImage ? '280px' : undefined }}>
                      {dest.coverImage ? (
                        <>
                          <img
                            src={dest.coverImage}
                            alt=""
                            className="w-full h-full object-cover"
                            style={{ objectPosition: 'center 30%' }}
                          />
                          {/* Gradient overlay — stronger at bottom for text readability */}
                          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.12) 40%, rgba(0,0,0,0.72) 100%)' }} />

                          {/* Text overlaid on photo */}
                          <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
                            <div className="flex items-end justify-between gap-3">
                              <div>
                                <h3 className="font-display text-2xl text-white leading-tight mb-0.5 drop-shadow-lg">
                                  {dest.city}
                                </h3>
                                <div className="flex items-center gap-2">
                                  <MapPin size={11} className="text-white/60" />
                                  <span className="text-white/70 text-xs font-medium">{dest.country}</span>
                                  {dest.date && (
                                    <>
                                      <span className="text-white/30 text-xs">·</span>
                                      <span className="text-white/50 text-xs">
                                        {new Date(dest.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' })}
                                      </span>
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2 shrink-0">
                                {hasImages && dest.images!.length > 1 && (
                                  <div className="flex items-center gap-1 bg-black/40 backdrop-blur-sm rounded-lg px-2.5 py-1.5 text-white/80 text-[11px]">
                                    <Camera size={11} />
                                    <span>{dest.images!.length}</span>
                                  </div>
                                )}
                                <motion.div
                                  animate={{ rotate: isExpanded ? 180 : 0 }}
                                  transition={{ duration: 0.25 }}
                                  className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center"
                                >
                                  <ChevronDown size={14} className="text-white/70" />
                                </motion.div>
                              </div>
                            </div>
                            {dest.note && (
                              <p className="text-white/55 text-xs leading-relaxed mt-2 line-clamp-2">{dest.note}</p>
                            )}
                          </div>
                        </>
                      ) : (
                        /* No cover image — classic card style */
                        <div className="p-5">
                          <div className="flex items-start gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-2xl shrink-0 border border-secondary/10">
                              {dest.emoji || '📍'}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-display text-lg text-cream leading-tight truncate">{dest.city}</h3>
                                <span className="text-muted-foreground/40 text-sm">{dest.country}</span>
                              </div>
                              {dest.date && (
                                <p className="text-[11px] text-secondary/50 mb-2 tracking-widest uppercase font-medium">
                                  {new Date(dest.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' })}
                                </p>
                              )}
                              {dest.note && <p className="text-sm text-foreground/50 leading-relaxed">{dest.note}</p>}
                            </div>
                            <motion.div
                              animate={{ rotate: isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.25 }}
                              className="w-7 h-7 rounded-full bg-muted/60 flex items-center justify-center shrink-0 mt-1"
                            >
                              <ChevronDown size={14} className="text-muted-foreground" />
                            </motion.div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Expanded photo grid */}
                    <AnimatePresence>
                      {isExpanded && hasImages && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: 'easeOut' }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 pt-3 border-t border-border/20">
                            <div className="grid grid-cols-4 gap-1.5">
                              {dest.images!.map((url, idx) => (
                                <motion.button
                                  key={url}
                                  initial={{ opacity: 0, scale: 0.85 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  transition={{ delay: idx * 0.04 }}
                                  whileHover={{ scale: 1.05 }}
                                  onClick={e => {
                                    e.stopPropagation();
                                    onOpenLightbox(dest.images!, idx);
                                  }}
                                  className="aspect-square rounded-xl overflow-hidden border-2 transition-colors"
                                  style={{
                                    borderColor: url === dest.coverImage
                                      ? 'hsl(var(--secondary))'
                                      : 'transparent',
                                  }}
                                >
                                  <img
                                    src={url}
                                    alt=""
                                    className="w-full h-full object-cover"
                                    style={{ objectPosition: 'center 20%' }}
                                  />
                                </motion.button>
                              ))}
                            </div>
                            <p className="text-[10px] text-muted-foreground/30 mt-2 text-center">
                              Toca una foto para verla · La marcada es la portada
                            </p>
                          </div>
                        </motion.div>
                      )}

                      {isExpanded && !hasImages && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pt-4 border-t border-border/20 flex items-center gap-2 text-muted-foreground/30 text-xs">
                            <Camera size={13} />
                            <span>Sin fotos todavía — edita el destino para añadirlas</span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Wishlist */}
        {wishlist.length > 0 && (
          <div className="mb-10">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-primary/80 mb-5 px-1 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-primary" /> Queremos visitar
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {wishlist.map((dest, i) => (
                <motion.div
                  key={dest.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="relative overflow-hidden glass-card-hover p-5 cursor-pointer group rounded-2xl"
                  style={{ minHeight: '120px' }}
                >
                  {dest.coverImage && (
                    <>
                      <img src={dest.coverImage} alt="" className="absolute inset-0 w-full h-full object-cover opacity-15 group-hover:opacity-20 transition-opacity" style={{ objectPosition: 'center 30%' }} />
                      <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-card/40" />
                    </>
                  )}
                  <div className="relative z-10">
                    <div className="flex items-start gap-3 mb-2">
                      <span className="text-xl">{dest.emoji || '💭'}</span>
                      <h4 className="font-display text-lg text-cream group-hover:text-primary transition-colors duration-300 leading-tight">
                        {dest.city}, {dest.country}
                      </h4>
                    </div>
                    {dest.note && <p className="text-sm text-foreground/40 leading-relaxed pl-8">{dest.note}</p>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Empty state */}
        {visited.length === 0 && wishlist.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 text-muted-foreground/40">
            <Heart size={44} className="mx-auto mb-4 opacity-20" />
            <p className="text-sm font-display">Vuestros recuerdos aparecerán aquí</p>
            <p className="text-xs mt-2 text-muted-foreground/30">Añade viajes desde el mapa para empezar</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MemoryAlbum;
