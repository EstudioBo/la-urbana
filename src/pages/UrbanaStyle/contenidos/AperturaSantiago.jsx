import { Hashtag, EnlaceExterno, EnlaceInterno, Figura, Galeria, PostInstagram, PostsInstagram } from '../bloques'
import imgInterior from '../../../assets/images/urbana-style/apertura-santiago-interior-mural.webp?adaptable'
import imgInterior2 from '../../../assets/images/urbana-style/apertura-santiago-interior-mural-2.webp?adaptable'
import imgFachada from '../../../assets/images/urbana-style/apertura-santiago-fachada.webp?adaptable'
import imgGalicianStyle from '../../../assets/images/urbana-style/apertura-santiago-galician-style-burger.webp?adaptable'
import imgNeonBurger from '../../../assets/images/urbana-style/apertura-santiago-neon-burger.webp?adaptable'
import imgPostureo from '../../../assets/images/urbana-style/apertura-santiago-neon-postureo-friendly.webp?adaptable'
import imgMesas from '../../../assets/images/urbana-style/apertura-santiago-mesas.webp?adaptable'
import imgPuroChef from '../../../assets/images/urbana-style/apertura-santiago-neon-puro-chef.webp?adaptable'

export default function AperturaSantiago() {
  return (
    <>
      <Figura
        img={imgInterior}
        alt="Interior de La Urbana en As Cancelas, con lámparas de mimbre, un mural de formas verdes y el neón Puro Chef"
        primera
      />

      <p>
        El 15 de mayo de 2024 abrimos <EnlaceInterno to="/reservar">nuestra hamburguesería en Santiago de Compostela</EnlaceInterno>, en el{' '}
        <EnlaceExterno href="https://www.ascancelas.es/">Centro Comercial As Cancelas</EnlaceExterno>. Llegamos con nuestras burgers artesanas,{' '}
        <EnlaceInterno to="/carta">recetas de autor firmadas por chefs gallegos</EnlaceInterno> y unas cuantas sorpresas para celebrar el estreno. Aunque esta historia empezó
        antes, buscando a alguien.
      </p>

      <h2>Ana, esto empezó contigo</h2>
      <p>
        Una clienta llamada Ana nos había dejado una reseña en Tripadvisor contando que viajaba de
        Santiago a Lugo solo para comer nuestras burgers. Eso había que agradecérselo. Y ahora
        teníamos una buena noticia para ella: ya no necesitaba hacer tantos kilómetros.
      </p>
      <p>
        Nos pusimos a buscarla y pedimos ayuda en nuestras redes. Pero Ana no apareció. Así que
        cambiamos de plan: las diez primeras Anas que viniesen a la inauguración y acreditasen su
        nombre tendrían una burger gratis. No encontramos a nuestra Ana, pero el homenaje seguía en pie.
      </p>

      <PostsInstagram>
        <PostInstagram codigo="C5y1i74LWYf" />
        <PostInstagram codigo="C6GgGIYKptB" />
        <PostInstagram codigo="C6thFLGN8pd" />
      </PostsInstagram>

      <h2>Diez cajas verdes por Compostela</h2>
      <p>
        La mañana de la apertura, nuestro hombrecillo verde salió a esconder diez cajas verdes por
        Santiago. Llovía, claro. Pero había burgers en juego y unas gotas no iban a parar la misión.
      </p>
      <p>
        Dentro de cada caja estaban las instrucciones para conseguir una burger gratis en nuestro
        nuevo local. <Hashtag>EncuentraLaCajaVerde</Hashtag> llegaba a Compostela y la celebración
        empezaba en la calle.
      </p>

      <Galeria
        fotos={[
          { img: imgNeonBurger, alt: 'Neón verde con forma de hamburguesa en el escaparate de La Urbana As Cancelas', alta: true },
          { img: imgFachada, alt: 'Escaparate de La Urbana en As Cancelas con mesas y sillas de colores delante' },
          { img: imgGalicianStyle, alt: 'Neón Galician Style Burguer sobre tres carteles de campaña de La Urbana' },
        ]}
      />

      <h2>Los primeros tenían premio. Y después había más</h2>
      <p>
        A las 13:30 abrimos las puertas de La Urbana en As Cancelas. Las primeras 50 personas en
        llegar recibieron un vale para disfrutar de una burger artesana gratis ese mismo mediodía.
      </p>
      <p>
        Para quienes llegasen después también preparamos una sorpresa: 160 tarjetas de rasca y gana
        con premios de burgers, entrantes y postres para canjear en una próxima visita. Una buena
        excusa para volver.
      </p>

      <PostsInstagram>
        <PostInstagram codigo="C7CUH0Qtrxi" />
        <PostInstagram codigo="C66lm2fL9ua" />
      </PostsInstagram>

      <Galeria
        fotos={[
          { img: imgPuroChef, alt: 'Letras Puro Chef iluminadas en verde bajo lámparas de mimbre', alta: true },
          { img: imgPostureo, alt: 'Neón Postureo Friendly sobre una pared forrada de periódicos' },
          { img: imgMesas, alt: 'Mesas y sillas de rejilla de La Urbana As Cancelas' },
        ]}
      />

      <Figura
        img={imgInterior2}
        alt="Comedor de La Urbana As Cancelas con banco corrido, estanterías iluminadas y el neón Puro Chef"
      />

      <p>
        Así estrenamos La Urbana en Santiago: buscando a Ana, escondiendo cajas por la ciudad y
        compartiendo nuestras burgers desde el primer día. Todo, al más puro <Hashtag>LaUrbanaStyle</Hashtag>.
      </p>
      <p>
        <EnlaceExterno href="https://www.extradigital.es/la-campana-de-apertura-de-la-urbana-burguer-sorprende-a-los-compostelanos-galicia/">
          ExtraDigital también contó las acciones con las que celebramos nuestra llegada a Compostela
        </EnlaceExterno>.
      </p>
    </>
  )
}
