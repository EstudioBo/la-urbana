import { Hashtag, EnlaceExterno, Figura, Galeria, PostInstagram, PostsInstagram } from '../bloques'
import imgMesaDetalle from '../../../assets/images/urbana-style/leandro-barea-mesa-detalle.webp'
import imgMesa from '../../../assets/images/urbana-style/leandro-barea-mesa.webp'
import imgManteles from '../../../assets/images/urbana-style/leandro-barea-manteles.webp'

export default function LeandroBarea() {
  return (
    <>
      <Figura
        img={imgMesaDetalle}
        alt="Dos manteles rosas ilustrados por Leandro Barea sobre una mesa de La Urbana"
        encuadre="50% 55%"
        primera
      />

      <p>
        Hay quien viene a La Urbana y se lleva una burger para el camino. Esta vez también había
        motivos para llevarse el mantel.
      </p>
      <p>
        Colaboramos con{' '}
        <EnlaceExterno href="https://www.elprogreso.es/articulo/lugo/leandro-barea/202407271236341775148.html">el artista lucense</EnlaceExterno>{' '}
        <strong><EnlaceExterno href="https://www.bazarleandro.com/">Leandro Barea</EnlaceExterno></strong> para poner su ilustración sobre
        nuestras mesas. Una edición limitada que convirtió ese papel que acompaña cada comida en
        una pieza para mirar, disfrutar y guardar.
      </p>

      <h2>Arte de Lugo, entre burgers</h2>
      <p>
        El humor y la ironía de Barea encontraron sitio entre nuestras burgers. Un mantel rosa, con
        su ilustración y su firma, que invitaba a detenerse un momento antes del primer bocado.
      </p>
      <p>
        Para nosotros, esta colaboración es otra manera de dar espacio al talento gallego. De acercar
        el trabajo de un creador de Lugo a quienes se sientan a comer en La Urbana y hacer que forme
        parte de la experiencia.
      </p>

      <Galeria
        fotos={[
          { img: imgManteles, alt: 'Manteles de Leandro Barea con un personaje que lanza una flecha y la firma La Urbana Burger Bar por Leandro Barea', alta: true },
          { img: imgMesa, alt: 'Mesa de La Urbana preparada con los manteles rosas de Leandro Barea', alta: true },
        ]}
      />

      <h2>El reto: salir con el mantel intacto</h2>
      <p>
        Había un pequeño problema: comer una burger y mantener el mantel impecable requiere cierta
        habilidad.
      </p>
      <p>
        Así que llevamos ese dilema a nuestras redes. Si conseguías no liarla, podías llevarte la
        ilustración a casa. También invitamos a compartir el resultado y etiquetarnos: queríamos ver
        quién era capaz de terminar la comida sin dejar huella.
      </p>
      <p>
        Barea lo puso difícil para querer mancharlo. Nuestras burgers lo pusieron difícil para evitarlo.
      </p>

      <PostsInstagram>
        <PostInstagram codigo="DVwLpsFjdEA" />
        <PostInstagram codigo="DWBtveDDDH_" />
      </PostsInstagram>

      <p>
        <strong>Así entendemos <Hashtag>LaUrbanaStyle</Hashtag>:</strong> burgers, creatividad y
        colaboraciones que llevan un poco de lo que somos a cada mesa.
      </p>
      <p>
        La iniciativa también apareció en{' '}
        <EnlaceExterno href="https://www.diariodesantiago.es/tendencias/la-urbana-acerca-el-arte-a-la-mesa-con-un-mantel-ilustrado-por-el-lucense-leandro-barea/">
          Diario de Santiago
        </EnlaceExterno>.
      </p>
    </>
  )
}
