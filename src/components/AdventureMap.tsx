import { useEffect, useRef, useState, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Edit2, Trash2, Plus, MapPin } from 'lucide-react';
import type { Destination, DestinationType } from '@/data/adventures';
import DestinationForm from './DestinationForm';

interface AdventureMapProps {
  destinations: Destination[];
  onAdd: (dest: Omit<Destination, 'id'>) => void;
  onUpdate: (id: string, data: Partial<Destination>) => void;
  onRemove: (id: string) => void;
}

const typeConfig: Record<DestinationType, { color: string; glow: string; label: string }> = {
  visited: { color: '#4a90d9', glow: 'rgba(74,144,217,0.4)', label: 'Visitado' },
  wishlist: { color: '#e06088', glow: 'rgba(224,96,136,0.4)', label: 'Queremos ir' },
};

const createMarkerIcon = (type: DestinationType, emoji?: string) => {
  const config = typeConfig[type];
  const size = 40;
  return L.divIcon({
    className: 'custom-marker-icon',
    html: `<div class="marker-pin marker-${type}" style="
      width: ${size}px; height: ${size}px;
      border-radius: 50%;
      background: radial-gradient(circle at 35% 35%, ${config.color}ee, ${config.color}99);
      border: 2.5px solid rgba(255,255,255,0.3);
      display: flex; align-items: center; justify-content: center;
      font-size: 18px;
      box-shadow: 0 0 18px ${config.glow}, 0 4px 14px rgba(0,0,0,0.35);
      cursor: pointer;
      transition: all 0.3s cubic-bezier(0.4,0,0.2,1);
    ">
      <span style="filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));">${emoji || (type === 'visited' ? '📍' : '💭')}</span>
    </div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

const AdventureMap = ({ destinations, onAdd, onUpdate, onRemove }: AdventureMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formDefaults, setFormDefaults] = useState<Partial<Destination>>({});
  const [editingDest, setEditingDest] = useState<Destination | null>(null);
  const [showSidebar, setShowSidebar] = useState(false);

  const clearMarkers = useCallback(() => {
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];
  }, []);

  const addMarkersToMap = useCallback((map: L.Map, dests: Destination[]) => {
    clearMarkers();
    dests.forEach((dest, i) => {
      setTimeout(() => {
        const marker = L.marker([dest.lat, dest.lng], {
          icon: createMarkerIcon(dest.type, dest.emoji),
        }).addTo(map);
        marker.on('click', () => {
          setSelectedDest(dest);
        });
        markersRef.current.push(marker);
      }, 100 + i * 150);
    });
  }, [clearMarkers]);

  useEffect(() => {
    if (!mapRef.current) return;
    
    if (mapInstance.current) {
      mapInstance.current.remove();
      mapInstance.current = null;
    }

    const map = L.map(mapRef.current, {
      center: [30, 10],
      zoom: 3,
      zoomControl: false,
      attributionControl: false,
      minZoom: 2,
      maxBounds: [[-85, -180], [85, 180]],
      maxBoundsViscosity: 1.0,
      worldCopyJump: false,
    });

    L.control.zoom({ position: 'topright' }).addTo(map);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
    }).addTo(map);

    mapInstance.current = map;

    // Click on map to add destination
    map.on('click', (e: L.LeafletMouseEvent) => {
      setFormDefaults({ lat: e.latlng.lat, lng: e.latlng.lng });
      setEditingDest(null);
      setShowForm(true);
    });

    addMarkersToMap(map, destinations);

    // Draw route lines for visited
    const visited = destinations
      .filter(d => d.type === 'visited' && d.date)
      .sort((a, b) => (a.date! > b.date! ? 1 : -1));
    if (visited.length > 1) {
      const latlngs = visited.map(d => [d.lat, d.lng] as [number, number]);
      setTimeout(() => {
        L.polyline(latlngs, {
          color: '#4a90d9',
          weight: 1.5,
          opacity: 0.25,
          dashArray: '6 10',
        }).addTo(map);
      }, destinations.length * 150 + 300);
    }

    return () => {
      map.remove();
      mapInstance.current = null;
    };
  }, [destinations, addMarkersToMap]);

  const handleAddButton = () => {
    setFormDefaults({});
    setEditingDest(null);
    setShowForm(true);
  };

  const handleEdit = (dest: Destination) => {
    setEditingDest(dest);
    setFormDefaults(dest);
    setShowForm(true);
    setSelectedDest(null);
  };

  const handleDelete = (id: string) => {
    onRemove(id);
    setSelectedDest(null);
  };

  const handleFormSubmit = (data: Omit<Destination, 'id'>) => {
    if (editingDest) {
      onUpdate(editingDest.id, data);
    } else {
      onAdd(data);
    }
    setShowForm(false);
    setEditingDest(null);
  };

  const groupedByCountry = destinations.reduce((acc, d) => {
    if (!acc[d.country]) acc[d.country] = [];
    acc[d.country].push(d);
    return acc;
  }, {} as Record<string, Destination[]>);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full" />

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="absolute top-4 left-4 z-[1000] bg-card/85 backdrop-blur-xl rounded-2xl border border-border/50 p-3.5 text-sm space-y-2.5 shadow-2xl"
      >
        {Object.entries(typeConfig).map(([key, val]) => (
          <div key={key} className="flex items-center gap-2.5">
            <span className="w-3 h-3 rounded-full" style={{ background: val.color, boxShadow: `0 0 8px ${val.glow}` }} />
            <span className="text-cream/80 text-xs tracking-wide">{val.label}</span>
          </div>
        ))}
      </motion.div>

      {/* Add button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleAddButton}
        className="absolute top-4 right-16 z-[1000] flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary/90 backdrop-blur-xl text-primary-foreground text-sm font-medium shadow-lg hover:bg-primary transition-colors"
      >
        <Plus size={16} />
        <span className="hidden md:inline">Añadir destino</span>
      </motion.button>

      {/* Sidebar toggle */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowSidebar(!showSidebar)}
        className="absolute top-[68px] right-16 z-[1000] flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card/85 backdrop-blur-xl text-foreground text-sm font-medium shadow-lg border border-border/50 hover:border-primary/30 transition-colors"
      >
        <MapPin size={16} />
        <span className="hidden md:inline">Destinos</span>
      </motion.button>

      {/* Sidebar panel */}
      <AnimatePresence>
        {showSidebar && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="absolute top-0 right-0 bottom-0 w-full md:w-[360px] z-[1001] bg-card/95 backdrop-blur-2xl border-l border-border/30 overflow-y-auto"
          >
            <div className="sticky top-0 bg-card/95 backdrop-blur-xl z-10 p-5 border-b border-border/30 flex items-center justify-between">
              <h3 className="font-display text-xl text-cream">Mis Destinos</h3>
              <button onClick={() => setShowSidebar(false)} className="w-8 h-8 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                <X size={16} />
              </button>
            </div>
            <div className="p-4 space-y-5">
              {Object.entries(groupedByCountry).map(([country, dests]) => (
                <div key={country}>
                  <h4 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-2.5 px-1">{country}</h4>
                  <div className="space-y-2">
                    {dests.map(d => (
                      <motion.div
                        key={d.id}
                        whileHover={{ x: 4 }}
                        onClick={() => {
                          setSelectedDest(d);
                          setShowSidebar(false);
                          mapInstance.current?.flyTo([d.lat, d.lng], 8, { duration: 1.2 });
                        }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/20 cursor-pointer hover:border-primary/20 transition-all group"
                      >
                        <span className="text-lg">{d.emoji || '📍'}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-cream font-medium truncate">{d.city}</p>
                          <p className="text-[11px] text-muted-foreground">{d.date ? new Date(d.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'short' }) : 'Pendiente'}</p>
                        </div>
                        <span className="w-2 h-2 rounded-full shrink-0" style={{ background: typeConfig[d.type].color }} />
                      </motion.div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected destination card */}
      <AnimatePresence>
        {selectedDest && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[999] md:hidden"
              onClick={() => setSelectedDest(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 80, scale: 0.95 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="absolute bottom-20 left-3 right-3 md:bottom-6 md:left-auto md:right-6 md:w-[380px] z-[1000] bg-card/95 backdrop-blur-xl rounded-2xl border border-border/50 p-5 shadow-2xl"
              style={{ boxShadow: `0 0 40px ${typeConfig[selectedDest.type].glow}, 0 20px 60px rgba(0,0,0,0.5)` }}
            >
              <div className="absolute top-4 right-4 flex items-center gap-1.5">
                <button onClick={() => handleEdit(selectedDest)} className="w-7 h-7 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-secondary transition-colors">
                  <Edit2 size={13} />
                </button>
                <button onClick={() => handleDelete(selectedDest.id)} className="w-7 h-7 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors">
                  <Trash2 size={13} />
                </button>
                <button onClick={() => setSelectedDest(null)} className="w-7 h-7 rounded-full bg-muted/60 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
                  <X size={14} />
                </button>
              </div>

              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl" style={{ background: typeConfig[selectedDest.type].color + '20' }}>
                  {selectedDest.emoji || '📍'}
                </div>
                <div className="flex-1 min-w-0 pr-20">
                  <h3 className="font-display text-xl text-cream leading-tight">{selectedDest.city}</h3>
                  <p className="text-muted-foreground text-sm">{selectedDest.country}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs px-3 py-1 rounded-full font-medium tracking-wide" style={{ background: typeConfig[selectedDest.type].color + '20', color: typeConfig[selectedDest.type].color }}>
                  {typeConfig[selectedDest.type].label}
                </span>
                {selectedDest.date && (
                  <span className="text-xs text-muted-foreground">
                    {new Date(selectedDest.date).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' })}
                  </span>
                )}
              </div>

              {selectedDest.note && (
                <p className="text-sm text-foreground/70 leading-relaxed">{selectedDest.note}</p>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Add/Edit form modal */}
      <AnimatePresence>
        {showForm && (
          <DestinationForm
            defaults={formDefaults}
            editing={!!editingDest}
            onSubmit={handleFormSubmit}
            onClose={() => { setShowForm(false); setEditingDest(null); }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdventureMap;
