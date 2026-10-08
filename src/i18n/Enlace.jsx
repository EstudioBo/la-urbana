import { Link, Navigate } from 'react-router-dom'
import { useIdioma } from './idioma'
import { localizar } from './rutas'

// Enlace interno: `to` es la ruta en castellano y lleva a la misma página en el idioma en el que se está
export default function Enlace({ to, ...props }) {
  const idioma = useIdioma()
  return <Link to={localizar(to, idioma)} {...props} />
}

export function Redirigir({ to }) {
  const idioma = useIdioma()
  return <Navigate to={localizar(to, idioma)} replace />
}
