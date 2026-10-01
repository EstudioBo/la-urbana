import { EnlaceExterno, EnlaceInterno, Figura, Galeria, PostInstagram, PostsInstagram } from '../bloques'
import imgBurger from '../../../assets/images/urbana-style/indomita-burger.webp'
import imgMartin from '../../../assets/images/urbana-style/indomita-martin-vazquez.webp'
import imgMartinRisa from '../../../assets/images/urbana-style/indomita-martin-vazquez-risa.webp'

export default function Indomita() {
  return (
    <>
      <Figura
        img={imgBurger}
        alt="Burger Urbana Indómita con tomates cherry confitados y albahaca sobre un plato blanco"
        primera
      />

      <p>
        <strong>Martín Vázquez, chef de <EnlaceExterno href="https://indomitobistro.es/">Indómito Bistró</EnlaceExterno>, en Santiago de Compostela</strong>, firma
        nuestra nueva burger de autor: <strong>Urbana Indómita</strong>. Una receta que combina vaca
        vieja, <EnlaceExterno href="https://pementodeherbon.com/">pimiento de Padrón</EnlaceExterno>, tomate confitado y albahaca fresca para darle sabor gallego al verano.
      </p>
      <p>
        El 17 de julio de 2026 la estrenamos en nuestra <EnlaceInterno to="/carta">sección de Burgers de Autor</EnlaceInterno> y la llevamos a
        nuestras hamburgueserías de Lugo, Santiago y Vigo.
      </p>

      <h2>Padrón, vaca vieja y un toque de albahaca</h2>
      <p>
        Indómita lleva <strong>200 gramos de vaca vieja, crema fundente de queso, tomate cherry
        confitado y pimiento de Padrón tatemado con ajo tostado</strong>, acompañados de albahaca
        fresca y pan crujiente gallego.
      </p>
      <p>
        El pimiento de Padrón tiene aquí un papel protagonista. Junto al tomate confitado y la
        albahaca, da forma a esa combinación veraniega que Martín creó para La Urbana. Una nueva
        manera de llevar ingredientes de aquí a una burger con firma propia.
      </p>

      <PostsInstagram>
        <PostInstagram codigo="Da4-lJJtx6e" />
        <PostInstagram codigo="DbA9I_JM8Wp" />
      </PostsInstagram>

      <h2>Una burger y su autor, delante de la cámara</h2>
      <p>
        Presentamos Indómita en nuestras redes junto a Martín, mostrando la receta y los ingredientes
        que la componen. Y también quisimos conocer un poco más a quien estaba detrás: teníamos unas
        cuantas preguntas y él tenía las respuestas.
      </p>
      <p>
        Porque nuestras Burgers de Autor también van de eso: dar a conocer a los cocineros con los que
        colaboramos y acercar su cocina a quienes se sientan en nuestras mesas.
      </p>

      <Galeria
        fotos={[
          { img: imgMartin, alt: 'Martín Vázquez, chef de Indómito, sonriendo con la burger Urbana Indómita en las manos', encuadre: '50% 30%' },
          { img: imgMartinRisa, alt: 'Martín Vázquez riendo con la burger Urbana Indómita en un plato' },
        ]}
      />

      <h2>Para probarla en compañía</h2>
      <p>
        El lanzamiento incluyó un sorteo de <strong>un menú doble de Urbana Indómita</strong>. Para
        participar, había que mencionar a la persona con la que compartirías el estreno. La parte
        difícil, elegir acompañante.
      </p>
      <p>
        Así llegó Indómita a La Urbana: una colaboración con un chef de Santiago, una receta muy de
        verano y tres ciudades en las que darle el primer bocado.
      </p>

      <PostsInstagram>
        <PostInstagram codigo="DbsKePftKSv" pie="Entrevista a Martín Vázquez" />
        <PostInstagram codigo="DbIq2xvjCVJ" />
      </PostsInstagram>
    </>
  )
}
