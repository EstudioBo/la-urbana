import { Hashtag, EnlaceExterno, EnlaceInterno, Figura, PostInstagram, PostsInstagram } from '../bloques'
import imgBurger from '../../../assets/images/urbana-style/antollo-galego-burger.webp?adaptable'
import imgChefs from '../../../assets/images/urbana-style/antollo-galego-chefs.webp?adaptable'

export default function AntolloGalego() {
  return (
    <>
      <Figura
        img={imgBurger}
        alt="Burger Antollo Galego con queso fundido y pimentón sobre un plato de madera"
        primera
      />

      <p>
        Antes de darle el primer bocado, había que resolver un par de incógnitas. ¿Quién estaba
        detrás de nuestra nueva burger de autor? ¿Y qué ingredientes llevaría?
      </p>
      <p>
        Así empezó el lanzamiento de <strong>Antollo Galego</strong>, la creación de Kike Piñeiro y
        Eloy Cancela, chefs de{' '}
        <strong><EnlaceExterno href="https://ahortadoobradoiro.com/">A Horta d’Obradoiro</EnlaceExterno>, en Santiago de Compostela</strong>. Una
        receta con mucho sabor a Galicia que presentamos en otoño de 2025 entre pistas, sorteos y una
        cata a ciegas.
      </p>

      <h2>Primero, adivinar quién cocinaba</h2>
      <p>
        Empezamos guardándonos los nombres y lanzando un reto en nuestras redes: descubrir qué chefs
        firmarían la siguiente incorporación a nuestra <EnlaceInterno to="/carta">carta de Burgers de Autor</EnlaceInterno>.
      </p>
      <p>
        El premio tenía sentido: sorteamos cinco bonos dobles para probarla antes que nadie. Después
        desvelamos a Kike y Eloy, pero todavía quedaba algo por descubrir. Tocaba adivinar los
        ingredientes, con otra oportunidad de ganar bonos dobles.
      </p>
      <p>La presentación fue llegando por partes. Primero los autores; después, la receta.</p>

      <Figura
        img={imgChefs}
        alt="Eloy Cancela y Kike Piñeiro, chefs de A Horta d’Obradoiro, con la burger Antollo Galego"
      />

      <PostsInstagram>
        <PostInstagram codigo="DPeUz2FDLcZ" pie="Sorteo: adivina el chef" />
        <PostInstagram codigo="DQCbOeKDDlI" pie="Sorteo" />
      </PostsInstagram>

      <h2>Galicia entre dos panes</h2>
      <p>
        Kike y Eloy crearon para La Urbana una combinación de <strong>carne gallega de vaca madurada,
        smash de rixóns, queso <EnlaceExterno href="https://www.arzua-ulloa.org/">Arzúa-Ulloa</EnlaceExterno> y cremoso de{' '}
        <EnlaceExterno href="https://grelosdegalicia.org/es">grelo</EnlaceExterno></strong>, en pan tradicional espolvoreado
        con pimentón.
      </p>
      <p>
        Producto gallego y sabores reconocibles, llevados al terreno de nuestras burgers de autor. El
        nombre le iba como un guante: Antollo Galego.
      </p>
      <p>
        Y la presentamos con una frase que lo decía todo: <em>«Non é unha burger. É unha declaración
        de amor».</em>
      </p>

      <PostsInstagram>
        <PostInstagram codigo="DQttyQDkSL2" pie="Sorteo: adivina los ingredientes" />
        <PostInstagram codigo="DQr297XDd9z" />
      </PostsInstagram>

      <h2>Una cata a ciegas en As Cancelas</h2>
      <p>
        La presentación también salió de las redes. Junto al Centro Comercial{' '}
        <EnlaceInterno to="/la-urbana-style/apertura-santiago-as-cancelas">As Cancelas</EnlaceInterno>, organizamos una <strong>cata a ciegas gratuita en Santiago de Compostela el 30 de
        octubre</strong>.
      </p>
      <p>
        Abrimos las inscripciones para que los participantes pudiesen acudir con un acompañante y
        estar entre los primeros en probar la nueva receta. Esta vez, las pistas se buscaban dando
        bocados.
      </p>

      <PostsInstagram>
        <PostInstagram codigo="DP10hjaiP8a" pie="Acción en As Cancelas" />
        <PostInstagram codigo="DPvz3pnjV2C" />
      </PostsInstagram>

      <p>
        Después, Antollo Galego se incorporó a la carta de nuestras hamburgueserías de <strong>Lugo,
        Santiago de Compostela y Vigo</strong>. Una nueva firma, una nueva receta y otra forma de
        compartir nuestro gusto por lo de aquí. Al puro <Hashtag>LaUrbanaStyle</Hashtag>.
      </p>
      <p>
        <EnlaceExterno href="https://www.diariodesantiago.es/tendencias/la-urbana-se-une-a-horta-dobradoiro-para-elevar-la-burger-a-la-alta-cocina/">
          Diario de Santiago también contó nuestra colaboración con A Horta d’Obradoiro
        </EnlaceExterno>.
      </p>
    </>
  )
}
