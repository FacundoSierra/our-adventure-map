

## Plan: Arreglar paneles overlay y mejorar tarjeta de destino seleccionado

### Problema 1: Paneles no se ven
Los paneles overlay (Historia, Stats, Álbum) tienen `z-30`, pero los controles del mapa Leaflet usan `z-[1000]`. Los paneles quedan **detrás del mapa** y no se ven.

**Solución**: Subir el `z-index` del overlay de `z-30` a `z-[1050]` (por encima del mapa `z-[1000]`, por debajo de la navbar `z-[1100]`). También añadir `pb-20` para que el contenido no quede tapado por la navbar inferior.

### Problema 2: Tarjeta de destino poco visible
Cuando se hace clic en un marcador, la tarjeta aparece pequeña abajo. El usuario quiere que se vea más prominente.

**Solución**: Hacer la tarjeta más grande y centrada en pantalla (tipo modal), con mayor tamaño de texto y más padding.

### Archivos a modificar

1. **`src/pages/Index.tsx`** (línea 42): Cambiar `z-30` → `z-[1050]`, añadir `pb-20` al contenedor overlay.

2. **`src/components/AdventureMap.tsx`** (líneas 271-276): Reposicionar la tarjeta de destino seleccionado para que sea más grande y centrada — cambiar de `bottom-20` a un posicionamiento centrado tipo modal con mayor ancho y padding.

