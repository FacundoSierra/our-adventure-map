

## Plan: Mapa único sin duplicación + Navegación fija arriba

### Problemas actuales
1. El mapa Leaflet se repite horizontalmente (world wrapping) — se ve duplicado al desplazarse a izquierda/derecha.
2. La navegación (Historia, Stats, Álbum) está abajo en móvil y no siempre visible — el usuario quiere que esté fija arriba siempre.

### Cambios

1. **Eliminar duplicación del mapa (`AdventureMap.tsx`)**: Añadir `maxBounds` y `maxBoundsViscosity` al mapa Leaflet para limitar el desplazamiento horizontal y evitar que el mundo se repita. Configurar bounds aproximados de `[[-85, -180], [85, 180]]` con `maxBoundsViscosity: 1.0` y `worldCopyJump: false`.

2. **Navegación siempre fija arriba (`NavigationBar.tsx`)**: Cambiar de `fixed bottom-0 md:top-0` a `fixed top-0` siempre (tanto móvil como desktop). Eliminar las clases condicionales `md:` que lo mueven. Quitar `safe-bottom` y usar un diseño compacto horizontal fijo en la parte superior.

3. **Ajustar layout (`Index.tsx`)**: Asegurar que el mapa no quede tapado por la navbar superior — no hace falta padding ya que la navbar es semi-transparente y flota sobre el mapa.

