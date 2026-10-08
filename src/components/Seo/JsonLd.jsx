import { Helmet } from 'react-helmet-async'

export default function JsonLd({ schema }) {
  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', ...schema })}</script>
    </Helmet>
  )
}
