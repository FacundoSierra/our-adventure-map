

## Plan: Mapa claro y fijo

### Problema actual
- El mapa usa tiles oscuros (`dark_all` de CartoDB) y un filtro CSS que lo oscurece aún más (`brightness(0.5) saturate(0.2) hue-rotate(200deg)`).
- El fondo del contenedor Leaflet es casi negro (`hsl(225 20% 5%)`).

### Cambios

1. **Cambiar tile layer** en `AdventureMap.tsx`: Reemplazar `dark_all` por un estilo claro como `voyager` de CartoDB (`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`), que es limpio y elegante.

2. **Eliminar filtro oscuro** en `index.css`: Quitar el `filter: brightness(0.5) saturate(0.2) hue-rotate(200deg)` del `.leaflet-tile-pane`.

3. **Actualizar fondo del contenedor** en `index.css`: Cambiar el background de `.leaflet-container` a un tono claro (ej. `#f5f3f0`).

4. **Ajustar controles de zoom** en `index.css`: Actualizar los colores de los botones de zoom para que se vean bien sobre fondo claro (fondo blanco/claro, texto oscuro).

5. **Ajustar popup styles** en `index.css`: Mantener popups oscuros para contraste elegante, o ajustar para que combinen con el mapa claro.

6. **Ajustar colores de marcadores** en `AdventureMap.tsx`: Verificar que los pines rosa y azul se vean bien sobre el mapa claro (probablemente se verán mejor).

