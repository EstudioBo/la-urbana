import { Hashtag, EnlaceExterno, EnlaceInterno, Figura, PostInstagram, PostsInstagram } from '../../bloques'
import imgCartel from '../../../../assets/images/urbana-style/xoan-forneas-ferido-meigas-dentro.webp'

export default function XoanForneas() {
  return (
    <>
      <p>
        You&apos;ve been stood up on a date. The day&apos;s not going great. But it can still get better: an{' '}
        <EnlaceInterno to="/la-urbana-style/antollo-galego">Antollo Galego</EnlaceInterno>, and let&apos;s see what happens.
      </p>
      <p>
        That&apos;s how Xoán Fórneas&apos;s character ends up at La Urbana in <span lang="gl">‘Meigas dentro’</span>, the fifth
        episode of <strong lang="gl">Ferido: O Microdrama</strong>, the video series released alongside{' '}
        <EnlaceExterno href="https://music.apple.com/es/album/ferido-single/1851582689">his first single as O Xoán</EnlaceExterno>. And we sneaked into the story with one of our burgers.
      </p>
      <p>
        The Lugo-born actor and musician made this Galician-language web series as a curtain-raiser
        for <em lang="gl">Ferido</em>,{' '}
        <EnlaceExterno href="https://www.elprogreso.es/articulo/a-chaira/xoan-forneas-lanza-primer-single-videoclip-rodado-castro-rei/202511261238061926977.html">his electronic pop debut</EnlaceExterno> (in Spanish). Short episodes mixing heartbreak, humour and the unexpected.
        Ours has a failed date, a stop for food and some <span lang="gl">meigas</span> (witches) you&apos;d better keep an
        eye on.
      </p>
      <p>
        We love that La Urbana is also a place where things like this happen. Working with local
        artists, making room for their stories and sharing a way of seeing Galicia: creative,
        contemporary and with a personality all its own. This time, hand in hand with Xoán and as part
        of his fiction.
      </p>
      <p>The burger&apos;s called Antollo Galego. What happens next, you&apos;ll have to watch for yourself.</p>

      <PostsInstagram>
        <Figura
          img={imgCartel}
          alt="Poster for Ferido: O Microdrama, episode 5, Meigas dentro, showing three older women sitting down"
          entera
        />
        <PostInstagram codigo="DRXrOqTjNkF" />
      </PostsInstagram>

      <p><Hashtag>LaUrbanaStyle</Hashtag></p>
    </>
  )
}
