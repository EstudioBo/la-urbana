// Fecha en formato dd.mm.aaaa; sin fecha muestra xx.xx.xxxx
export function Fecha({ fecha, className }) {
  if (!fecha) return <span className={className}>xx.xx.xxxx</span>
  const [anio, mes, dia] = fecha.split('-')
  return <time className={className} dateTime={fecha}>{`${dia}.${mes}.${anio}`}</time>
}
