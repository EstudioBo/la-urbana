// Foto importada con `?adaptable` (ver vite.config.js): el navegador elige la anchura según `sizes`, y
// width/height reservan su hueco mientras carga. Una foto más estrecha que alguna anchura sale repetida: se quita
export default function Imagen({ imagen, sizes, alt = '', ...props }) {
  const anchuras = new Set()
  const srcSet = imagen.srcset
    ?.split(', ')
    .filter((entrada) => {
      const ancho = entrada.split(' ').pop()
      if (anchuras.has(ancho)) return false
      anchuras.add(ancho)
      return true
    })
    .join(', ')

  return (
    <img
      src={imagen.src}
      srcSet={srcSet}
      sizes={srcSet ? sizes : undefined}
      width={imagen.w}
      height={imagen.h}
      alt={alt}
      {...props}
    />
  )
}
