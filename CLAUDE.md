# La Urbana — instrucciones del proyecto

## Datos básicos

- Web de La Urbana Burger Bar: cinco locales: tres en Lugo (Bispo Aguirre, Praza de Augas Férreas y C.C. As Termas), uno en Vigo y uno en Santiago. React + Vite.
- **Hosting:** Netlify. La versión de pruebas está en `la-urbana.netlify.app`, el repositorio en `github.com/EstudioBo/la-urbana`. Las reglas de Netlify van en `public/_headers` y `public/_redirects`.
- **Despliegue:** Netlify publica automáticamente cada push a `main`. Un push es publicar, así que no se hace sin confirmación expresa de Sara.
- **Dominio final:** `www.laurbanaburgerbar.com` (todavía apunta a la web antigua).
- **`public/_headers` lleva `X-Robots-Tag: noindex` a propósito** mientras la web no esté aprobada. No se quita hasta el día del lanzamiento, y ese día es obligatorio quitarlo.

## Comandos

- `npm run dev` (puerto 5174). El servidor de desarrollo lo arranca Sara en su terminal.
- `npm run build` y `npm run lint` (sin errores ni avisos antes de comitear).

## Contenido

- Carta: `src/pages/Carta/cartaData.js`
- Alérgenos: `src/pages/Alergenos/tablaAlergenos.js`
- Posts de #LaUrbanaStyle: `src/pages/UrbanaStyle/posts.js` y `src/pages/UrbanaStyle/contenidos/`
- Textos de la interfaz: `src/i18n/locales/es/translation.json` y `en/translation.json`. **Todo texto nuevo va en los dos idiomas.**

## Idiomas (castellano e inglés británico)

- El idioma sale de la URL: `/carta` en castellano, `/en/menu` en inglés. Las equivalencias de rutas están en `src/i18n/rutas.js` (tabla `PAGINAS`). **Una página nueva se añade ahí y en `App.jsx`**.
- Los enlaces internos se escriben con la ruta en castellano usando `Enlace` (`src/i18n/Enlace.jsx`), que la traduce sola. No usar `Link` con rutas fijas.
- Textos de contenido (carta, alérgenos, Nuestro Origen, horarios, Team…): cada texto va como `{ es: '…', en: '…' }` en su archivo de datos y se lee con `tx()`. Lo que es igual en los dos idiomas puede ir como cadena simple.
- **Nunca se traducen** los nombres de las burgers, locales y chefs, ni lo que está en gallego.
- Posts: cada entrada de `posts.js` lleva `slug: { es, en }` y sus textos en `es` y `en`. El contenido en inglés va en `contenidos/en/`. Un post nuevo se escribe también en inglés.
- El sitemap lo genera el build (`scripts/prerender.js`), con las dos versiones de cada página. No hay que tocarlo a mano.

## Tareas en Notion

Las tareas pendientes del proyecto están en la base de datos de Notion **"Pendientes urbana previos a lanzamiento"**:

- URL: https://app.notion.com/p/3edc4138bea8806f8462da840b264a47
- Data source: `collection://3edc4138-bea8-80b4-9dd8-000b101139fe`

**Al empezar cada conversación nueva**, antes de ponerte con lo que pida Sara:

1. Lee la base de datos de Notion.
2. Identifica a qué tarea o tareas pertenece la petición y díselo a Sara en una línea, con el nombre de la tarea. Si no encaja con ninguna, díselo también y pregúntale si hay que crear una.
3. Abre la tarea y sigue los pasos que tiene dentro.
4. Si esa tarea tiene pendiente algo de "Bloqueado por", avísale antes de empezar.

**Al terminar el trabajo**, proponle actualizar la tarea en Notion: el Estado y, si hace falta, notas en el contenido. No lo cambies sin que ella lo confirme.

Las propiedades de las tareas se cambian siempre con `update_properties`, en una llamada aparte de la del contenido. Después hay que comprobarlo con fetch.

## Documentación del proyecto

- **Design system:** variables en `src/styles/globals.css`, uso documentado en `docs/design-system.md`. Léelo antes de tocar estilos: usa las variables existentes y no metas valores sueltos de color, espaciado, radio o sombra.
- **Nuestro Origen:** `docs/nuestro-origen.md`. Léelo antes de tocar la página `/nosotros` o el camino animado.
