# Design system — La Urbana

Fuente única de verdad: `src/styles/globals.css`. Todo lo de abajo ya está aplicado en el código; esto es solo la referencia.

## Colores

| Variable | Valor | Uso |
|---|---|---|
| `--color-black` | `#0a0a0a` | Negro de marca |
| `--color-green` | `#3ba548` | Verde de marca |
| `--color-green-dark` | `#0a2e0a` | Verde muy oscuro (fondos, botón reservar) |
| `--color-green-neon` | `#00ff88` | Acento neón, exclusivo de Urbana Kids |
| `--color-orange` | `#f09b18` | Naranja de marca |
| `--color-orange-light` | `#f7c147` | Naranja claro (gradiente Nosotros) |
| `--color-orange-dark` | `#c45a00` | Naranja oscuro (pestaña activa Reservar) |
| `--color-white` | `#ffffff` | — |
| `--color-gray` | `#888888` | — |

**Sin variable, a propósito** — son shades de un solo gradiente concreto, no se repiten:
`#307829`/`#265821` (SeccionViral), `#4db85c` (SeccionViral), `#4ec563`/`#1a9a35`/`#0d5018` (Reservar).

## Tipografía

| Variable | Fuentes |
|---|---|
| `--font-display` | blenny, Arial Black, Segoe UI Black |
| `--font-script` | Popfine, Segoe Print, Bradley Hand |
| `--font-title` | Revelstoke |
| `--font-body` | neue-haas-grotesk-display, Helvetica Neue |

## Radios

| Variable | Valor |
|---|---|
| `--radius-sm` | `8px` |
| `--radius-md` | `1rem` (16px) |
| `--radius-lg` | `24px` |
| `--radius-xl` | `40px` |
| `--radius-pill` | `300px` |
| `--radius-circle` | `50%` |

## Spacing

Escala en `padding`/`margin`/`gap`. Los valores en `%`/`vw` y las funciones `calc()` complejas se dejaron fuera a propósito (son fluidos/responsive, no espaciado fijo).

| Token | Valor (px) |
|---|---|
| `--space-0` | 0 |
| `--space-1` | 2 |
| `--space-2` | 4 |
| `--space-3` | 8 |
| `--space-4` | 12 |
| `--space-5` | 16 |
| `--space-6` | 20 |
| `--space-7` | 24 |
| `--space-8` | 32 |
| `--space-9` | 40 |
| `--space-10` | 48 |
| `--space-11` | 64 |
| `--space-12` | 96 |
| `--space-13` | 112 |
| `--space-14` | 128 |

## Márgenes de página

| Variable | Valor |
|---|---|
| `--margen-pagina` | `8%` (`5%` en ≤640px) |

Margen lateral de la web: es el del navbar (logo e iconos). Las secciones nuevas lo usan en su `padding` izquierdo y derecho para alinearse con él. Las páginas anteriores a esta variable (home, carta, nosotros…) mantienen sus márgenes propios.

## Sombras

| Variable | Valor |
|---|---|
| `--shadow-sm` | `0 2px 8px rgba(0,0,0,0.25)` |
| `--shadow-md` | `0 4px 16px rgba(0,0,0,0.18)` |
| `--shadow-lg` | `0 8px 24px rgba(0,0,0,0.45)` |
| `--shadow-xl` | `0 24px 64px rgba(0,0,0,0.3)` |

**Excepciones, sin tokenizar** (efectos de glow con color propio, no elevación genérica):
- `SeccionTeam.module.css` — hover de las cards del equipo: `0 8px 32px rgba(0,0,0,0.35)`
- `UrbanaKids.module.css` — glow neón del sello y del lightbox (usa `#00B74F`/`rgba(0,183,79,…)` con transparencia, no convertible a `var()` sin una variable adicional en formato RGB)

## Efectos de aparición

Se reutilizan en toda la web; no inventar variantes nuevas para lo mismo.

| Efecto | Cómo es | Dónde se usa |
|---|---|---|
| **Sello** (`stamp`) | Cae desde grande (`scale(2.5)`), rebota (`0.92` → `1.05`) y queda en `scale(1)` con su giro. `1.2s cubic-bezier(0.22, 1, 0.36, 1)`. Llamativo: para elementos sueltos, no junto a otras animaciones | Pegatina U de la home (`Home.module.css`), sello 2015 (`SeccionOrigen`), cards de chefs (`SeccionTeam`) |
| **Aparición suave de foto** | `opacity 0 → 1` y `scale(1.06) → 1` con su giro, `0.7s ease-out` | Fotos de las tarjetas de Nuestro Origen (`apareceFoto`) |
| **Subida** | `opacity 0 → 1` y `translateY(16px) → 0`, `0.6s ease-out` | Textos de las tarjetas de Nuestro Origen |
| **Punto** | `opacity 0 → 1` y `scale(0.6) → 1`, `0.3s ease-out` | Puntos verdes del camino de Nuestro Origen |

Cuando ya hay algo en movimiento (como la línea del camino), usar las versiones suaves.

Con `prefers-reduced-motion: reduce` todo aparece directamente, sin animación.

Cómo se aplican en la página Nuestro Origen (camino, tarjetas y editor): [nuestro-origen.md](nuestro-origen.md).
