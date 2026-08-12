// Datos replicados de SeccionDirecciones.jsx (RESTAURANTES) en formato schema.org.
// Si cambian direcciones, teléfonos u horarios ahí, actualizar también aquí.

const SITE_URL = 'https://www.laurbanaburgerbar.com'

export const RESTAURANTS_SCHEMA = [
  {
    '@type': 'Restaurant',
    name: 'La Urbana Burger Bar - Bispo Aguirre',
    url: `${SITE_URL}/reservar`,
    telephone: '+34982145502',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rúa Bispo Aguirre, 34',
      addressLocality: 'Lugo',
      addressCountry: 'ES',
    },
    servesCuisine: ['Hamburguesas', 'Cocina gallega'],
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '09:30', closes: '23:59' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday'], opens: '10:00', closes: '23:59' },
    ],
  },
  {
    '@type': 'Restaurant',
    name: 'La Urbana Burger Bar - Praza de Augas Férreas',
    url: `${SITE_URL}/reservar`,
    telephone: '+34982808425',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rúa Cánovas del Castillo, 2',
      addressLocality: 'Lugo',
      addressCountry: 'ES',
    },
    servesCuisine: ['Hamburguesas', 'Cocina gallega'],
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '09:30', closes: '23:59' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday'], opens: '10:00', closes: '23:59' },
    ],
  },
  {
    '@type': 'Restaurant',
    name: 'La Urbana Burger Bar - C.C. As Termas',
    url: `${SITE_URL}/reservar`,
    telephone: '+34982812895',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Infanta Elena, 213',
      addressLocality: 'Lugo',
      addressCountry: 'ES',
    },
    servesCuisine: ['Hamburguesas', 'Cocina gallega'],
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], opens: '09:30', closes: '23:59' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday'], opens: '12:30', closes: '23:30' },
    ],
  },
  {
    '@type': 'Restaurant',
    name: 'La Urbana Burger Bar - Vigo',
    url: `${SITE_URL}/reservar`,
    telephone: '+34986595689',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Rúa Rosalía de Castro, 48',
      addressLocality: 'Vigo',
      addressCountry: 'ES',
    },
    servesCuisine: ['Hamburguesas', 'Cocina gallega'],
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], opens: '13:30', closes: '16:30' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '20:30', closes: '23:59' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Friday', 'Saturday'], opens: '20:00', closes: '23:59' },
    ],
  },
  {
    '@type': 'Restaurant',
    name: 'La Urbana Burger Bar - Santiago de Compostela',
    url: `${SITE_URL}/reservar`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. do Camiño Francés, 3',
      addressLocality: 'Santiago de Compostela',
      addressCountry: 'ES',
    },
    servesCuisine: ['Hamburguesas', 'Cocina gallega'],
    openingHoursSpecification: [
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'], opens: '13:00', closes: '23:00' },
      { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Friday', 'Saturday'], opens: '13:00', closes: '23:30' },
    ],
  },
]
