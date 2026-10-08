import { Hashtag, EnlaceExterno, Figura, Galeria, PostInstagram, PostsInstagram } from '../../bloques'
import imgMesaDetalle from '../../../../assets/images/urbana-style/leandro-barea-mesa-detalle.webp'
import imgMesa from '../../../../assets/images/urbana-style/leandro-barea-mesa.webp'
import imgManteles from '../../../../assets/images/urbana-style/leandro-barea-manteles.webp'

export default function LeandroBarea() {
  return (
    <>
      <Figura
        img={imgMesaDetalle}
        alt="Two pink placemats illustrated by Leandro Barea on a La Urbana table"
        encuadre="50% 55%"
        primera
      />

      <p>
        Some people come to La Urbana and take a burger to go. This time, there was good reason to
        take the placemat too.
      </p>
      <p>
        We teamed up with{' '}
        <EnlaceExterno href="https://www.elprogreso.es/articulo/lugo/leandro-barea/202407271236341775148.html">Lugo-born artist</EnlaceExterno>{' '}
        <strong><EnlaceExterno href="https://www.bazarleandro.com/">Leandro Barea</EnlaceExterno></strong> to put his artwork on
        our tables. A limited edition that turned the paper that comes with every meal into something
        to look at, enjoy and keep.
      </p>

      <h2>Lugo art, served with burgers</h2>
      <p>
        Barea&apos;s humour and irony found a home among our burgers. A pink placemat, with his illustration
        and signature, inviting you to pause for a moment before the first bite.
      </p>
      <p>
        For us, this collaboration is another way of making room for Galician talent. Of bringing the
        work of a Lugo creator to everyone who sits down to eat at La Urbana, and making it part of the
        experience.
      </p>

      <Galeria
        fotos={[
          { img: imgManteles, alt: 'Leandro Barea placemats featuring a character shooting an arrow and the signature \'La Urbana Burger Bar por Leandro Barea\'', alta: true },
          { img: imgMesa, alt: 'La Urbana table set with Leandro Barea\'s pink placemats', alta: true },
        ]}
      />

      <h2>The challenge: leave with your placemat intact</h2>
      <p>
        There was one small problem: eating a burger and keeping your placemat spotless takes some
        skill.
      </p>
      <p>
        So we took the dilemma to social media. If you managed not to make a mess, you could take the
        artwork home. We also invited people to share the result and tag us: we wanted to see who
        could finish their meal without leaving a trace.
      </p>
      <p>
        Barea made it hard to want to stain it. Our burgers made it hard not to.
      </p>

      <PostsInstagram>
        <PostInstagram codigo="DVwLpsFjdEA" />
        <PostInstagram codigo="DWBtveDDDH_" />
      </PostsInstagram>

      <p>
        <strong>That&apos;s what <Hashtag>LaUrbanaStyle</Hashtag> means to us:</strong> burgers, creativity and
        collaborations that bring a little of who we are to every table.
      </p>
      <p>
        The project was also featured in{' '}
        <EnlaceExterno href="https://www.diariodesantiago.es/tendencias/la-urbana-acerca-el-arte-a-la-mesa-con-un-mantel-ilustrado-por-el-lucense-leandro-barea/">
          Diario de Santiago
        </EnlaceExterno>{' '}
        (in Spanish).
      </p>
    </>
  )
}
