

## Plan: Mapa siempre visible con secciones como paneles overlay

### Concepto
El mapa ocupa toda la pantalla siempre. Las secciones (Historia, Stats, Álbum) se abren como paneles/modales superpuestos sobre el mapa, en lugar de reemplazarlo. La navegación se mantiene visible sobre el mapa.

### Cambios

1. **`src/pages/Index.tsx`**: El mapa siempre se renderiza (no condicionalmente). Las otras secciones se muestran como paneles overlay (con `AnimatePresence`) encima del mapa cuando se seleccionan. La sección "map" simplemente no muestra ningún panel.

2. **`src/components/NavigationBar.tsx`**: Mantener la barra de navegación flotante sobre el mapa con `z-index` alto. Estilizarla como una barra flotante semi-transparente.

3. **Paneles overlay**: Timeline, Stats y Album se envuelven en un contenedor con fondo semi-transparente (`bg-card/90 backdrop-blur-xl`) que se desliza desde un lateral o desde abajo, ocupando parte de la pantalla pero dejando el mapa visible detrás.

4. **`src/components/AdventureMap.tsx`**: Ajustar la altura a `h-screen` completo (sin restar la navbar, ya que la navbar flota encima).

