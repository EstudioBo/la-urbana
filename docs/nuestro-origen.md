# Página Nuestro Origen (`/nosotros`)

Manual de la página: cómo está hecha y cómo cambiarla. Los colores, tipografías, espaciados y efectos que usa son los del [design system](design-system.md).

Código en `src/pages/Nosotros/`. Fotos en `src/assets/images/origen/`.

## Estructura

1. **Hero** (150svh): título "Da nosa terra á túa / burger", texto de introducción y la foto de la vaca.
2. **Ingredientes:** fondo degradado verde (`--color-green` → `--color-green-dark`) con el camino y las 9 tarjetas.
3. **Carta:** el mismo slider de la home (`SeccionCarta`), justo donde acaba el camino.
4. **Footer** de la home.

SEO: título "Nuestro Origen" y su descripción en el `<Seo>` de `Nosotros.jsx`. El `<h1>` va con `lang="gl"` porque está en gallego.

## Hero

- **Foto de fondo:** `fondo-nuestro-origen.webp` (1200×1800). `colocarVaca()` en `Nosotros.jsx` calcula su tamaño y posición para que la vaca empiece justo debajo del título (en móvil, debajo del texto) y el texto nunca quede sobre la hierba. Usa estas medidas de la foto, en fracciones de su alto/ancho: `VACA_ARRIBA` (dónde empieza la vaca), `HORIZONTE` (línea del horizonte) y `VACA_CENTRO_X`. **Si se cambia la foto, hay que volver a medir esos tres valores.**
- **Franja de hierba:** `fondo-borde-cesped.webp` es el borde del horizonte recortado de la misma foto (filas 1230–1305, `BORDE_CESPED`), con el cielo transparente. Va encima de la línea para que el camino salga de detrás de las briznas. Si se cambia la foto de fondo, hay que volver a recortarla.
- **Final del hero:** degradado a verde (`.hero::after`) para enlazar con el bloque de ingredientes.
- **Solape:** el lienzo del camino sube por encima del final del hero para que su `y = 0` coincida con el horizonte de la foto. Se calcula solo.

## Camino e ingredientes

Línea que se va dibujando al hacer scroll desde la hierba del hero hasta la carta. Al llegar a cada punto verde aparece su tarjeta (texto con **subida** y foto con **aparición suave**, ver [Efectos de aparición](design-system.md#efectos-de-aparición) en el design system).

### Archivos

| Archivo | Qué hay | Cómo se cambia |
|---|---|---|
| `Nosotros.jsx` → `INGREDIENTES` | Contenido de cada tarjeta: título, texto, productor y enlace, "Lo/La encuentras en", burgers, nota, foto y su `alt` | A mano |
| `Nosotros.jsx` → `BURGERS_PENDIENTES` | Los "Burger xxx" provisionales de las tarjetas que aún no tienen burgers reales | A mano (o poner la lista real en `burgers` de cada ingrediente) |
| `caminoEscritorio.js` | Versión escritorio: trazado (`CAMINO`), posición/tamaño/giro/alineación de textos y fotos (`FILAS`) y puntos verdes (`NODOS`). Lienzo de 1440 unidades de ancho | Con el editor (no a mano) |
| `caminoMovil.js` | Lo mismo para móvil. Lienzo de 390 unidades de ancho | Con el editor (no a mano) |
| `Nosotros.module.css` | Estilos: `.fijo` = escritorio, `.fijoMovil` = móvil. Tamaños de letra, grosor de línea (`.trazo`), colores (`.stopVerde`, `.stopNaranja`) | A mano |
| `useCaminoDibujado.js` | Dibujo de la línea al hacer scroll (GSAP ScrollTrigger) y aparición de tarjetas | No hace falta tocarlo |
| `editorCamino.js`, `borradorCamino.js`, `scripts/vite-guardar-camino.js` | El editor visual, su borrador y el guardado. Solo en desarrollo, no entran en el build | No hace falta tocarlo |

### Versiones según el ancho

- **Escritorio (1024px o más)** y **móvil (768px o menos):** trazado fijo, cada uno en su archivo. Son independientes: lo que cambies en uno no afecta al otro. Todo el lienzo escala con el ancho de la pantalla; `y = 0` es el horizonte del hero.
- **Tablet (769 a 1023px):** no tiene trazado propio. El camino se calcula solo, pegado a los márgenes, con las tarjetas en columna.
- **Límite conocido:** el tamaño de letra tiene mínimos y máximos (`clamp`), así que no escala exactamente igual que el lienzo. En escritorio, entre 1024 y ~1280px, el texto queda proporcionalmente más grande que en 1440 y algunos bloques pueden chocar con la tarjeta siguiente o con la línea. En móvil, entre 360 y 430px, apenas varía.

### Cómo se relacionan tarjetas y puntos

- La tarjeta 1 de `INGREDIENTES` es la fila 1 de `FILAS` y se muestra cuando la línea llega al punto 1 de `NODOS`; la 2 con el 2, y así.
- `NODOS` tiene **un punto más** que tarjetas: el último es el final del camino, sobre la carta.
- El orden importa: hay que mantener las tres listas en el mismo orden.
- El alto del lienzo (y dónde empieza la carta) sale solo del último punto del camino.

### Cambios habituales

- **Textos, títulos, enlaces o burgers:** en `INGREDIENTES`. Si el texto crece, el bloque crece hacia abajo: revisar en el editor, en las dos versiones, que no choque con la foto siguiente ni con la línea.
- **Cambiar una foto:** WebP de 200KB o menos en `src/assets/images/origen/`, cambiar su `import` al principio de `Nosotros.jsx` y poner su `width`/`height` reales. Se muestra recortada a 3:4 (`object-fit: cover`), así que conviene que lo importante esté centrado.
- **Mover o redimensionar tarjetas, puntos o el camino:** con el editor (abajo).
- **Añadir un ingrediente:** añadirlo en `INGREDIENTES` en su posición, añadir una entrada en `RITMO` (giro de la tarjeta para tablet), y en **los dos** archivos del camino una fila nueva en `FILAS` (copiando otra y cambiando `y`) y un punto nuevo en `NODOS`. Después, colocarlo con el editor en escritorio y en móvil y guardar las dos versiones.
- **Quitar un ingrediente:** quitarlo de `INGREDIENTES`, `RITMO` y de `FILAS` y `NODOS` en los dos archivos (la misma posición en todos). Recolocar y guardar.
- **Colores de la línea:** degradado de `--color-green` a `--color-orange` (`.stopVerde`, `.stopNaranja`). **Grosor:** `.trazo` (escritorio) y `.caminoMovil .trazo` (móvil).
- **Tamaño de letra de las tarjetas:** `.fijo .nombre`, `.fijo .texto`… (escritorio) y `.fijoMovil …` (móvil). Si se cambia, revisar la colocación en el editor.

### Editor visual (solo en desarrollo)

1. Arrancar el servidor en una terminal propia (si lo arranca Claude, la app puede pararlo sola): `npm run dev`.
2. Abrir `localhost:5174/nosotros?editar-camino`. Se edita la versión del ancho en el que estés. Para móvil, en Chrome: F12 → Ctrl+Shift+M y un móvil de 375–390px.

- **Camino:** arrastrar los puntos blancos y sus tiradores. **Alt+clic** sobre la línea añade un punto; **Suprimir** borra el seleccionado; **Ctrl+Z** deshace; **+ Punto al final** alarga el camino. Con el camino seleccionado, textos y fotos se atenúan y no se pueden tocar; se vuelve a ellos pulsando fuera del camino o con **Esc**.
- **Alejar:** reduce la vista al 75% para llegar a los puntos que quedan fuera de los bordes. Dos líneas rojas discontinuas marcan dónde acaba la pantalla: lo que queda fuera no se ve en la web. Solo cambia la vista, no lo que se guarda, y se mantiene al guardar o recargar.
- **Textos, fotos y puntos verdes:** se arrastran. Círculo encima = girar (**Mayúsculas**: de 15 en 15°). Barra a la derecha del texto = ancho. Barra a la derecha de la foto = tamaño (mantiene la proporción 3:4). Botón bajo el texto = alinear a izquierda/derecha. Los puntos verdes se ajustan solos al punto más cercano de la línea.
- **Guardar:** los cambios se van guardando solos en el navegador (borrador). **Guardar en el proyecto** los escribe en `caminoEscritorio.js` o `caminoMovil.js`. Si el servidor está caído, el botón avisa ("No guardado: el servidor no responde") y el borrador sigue en el navegador: arrancar el servidor, recargar y volver a guardar.
- **Descartar cambios** borra el borrador y vuelve a lo último guardado en el proyecto. Ojo: lo que no se haya guardado se pierde.
- Mientras exista borrador, manda sobre el archivo: si se cambia `caminoMovil.js` o `caminoEscritorio.js` por otra vía, no se verá en ese navegador hasta guardar o descartar.
- El guardado solo acepta peticiones desde este equipo (no por ngrok). Nada del editor entra en el build de producción.

### Revisión antes de publicar

- Móvil: 360, 375–390 y 430px. Escritorio: 1024, 1280, 1440 y 1920px. Tablet: ~820px.
- Que la línea no pase por encima de ningún texto, que ningún texto o foto se monte con otro y que cada tarjeta aparezca al llegar a su punto.
- `npm run build`: no debe aparecer nada de `editar-camino` en `dist`.
