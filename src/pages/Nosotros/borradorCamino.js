// Borrador del modo edición del camino (solo en desarrollo, /nosotros?editar-camino): se guarda en el navegador
// para no perder los cambios al recargar. Hay uno por versión: 'escritorio' y 'movil'.
const CLAVES = {
  escritorio: 'la-urbana:borrador-camino',
  movil: 'la-urbana:borrador-camino-movil',
}

export const editandoCamino = import.meta.env.DEV && new URLSearchParams(window.location.search).has('editar-camino')

// Los primeros borradores guardaban cada tarjeta como un bloque { x, y, ancho }: se separa en texto y foto
// como se colocaban entonces (pares con el texto a la izquierda, impares a la derecha).
const separar = (f, i) => ('texto' in f ? f : i % 2 === 0
  ? { texto: { x: f.x, y: f.y, ancho: 400 }, foto: { x: f.x + f.ancho - 230, y: f.y + 36 } }
  : { foto: { x: f.x, y: f.y + 36 }, texto: { x: f.x + f.ancho - 400, y: f.y, ancho: 400 } })

export function leerBorrador(version) {
  if (!editandoCamino || !CLAVES[version]) return null
  const guardado = localStorage.getItem(CLAVES[version])
  if (!guardado) return null
  // Los primeros borradores guardaban solo el trazado, como texto.
  if (guardado.startsWith('M')) return { camino: guardado }
  try {
    const borrador = JSON.parse(guardado)
    return borrador.filas ? { ...borrador, filas: borrador.filas.map(separar) } : borrador
  } catch {
    return null
  }
}

export function guardarBorrador(version, cambios) {
  localStorage.setItem(CLAVES[version], JSON.stringify({ ...leerBorrador(version), ...cambios }))
}

export function descartarBorrador(version) {
  localStorage.removeItem(CLAVES[version])
}
