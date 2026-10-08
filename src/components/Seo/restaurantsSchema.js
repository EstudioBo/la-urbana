// Datos replicados de SeccionDirecciones.jsx (RESTAURANTES) en formato schema.org.
// Si cambian direcciones, teléfonos u horarios ahí, actualizar también aquí.
// Un cierre después de medianoche se pone tal cual (closes '00:30'); a medianoche justa, '23:59'.

const LUN_SAB = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const DOM_JUE = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday']
const VIE_SAB = ['Friday', 'Saturday']

const horario = (dayOfWeek, opens, closes) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek, opens, closes })

const direccion = (streetAddress, postalCode, addressLocality) => ({
  '@type': 'PostalAddress',
  streetAddress,
  postalCode,
  addressLocality,
  addressRegion: 'Galicia',
  addressCountry: 'ES',
})

const geo = (latitude, longitude) => ({ '@type': 'GeoCoordinates', latitude, longitude })

export const RESTAURANTS_SCHEMA = [
  {
    id: 'bispo-aguirre',
    name: 'La Urbana Burger Bar - Bispo Aguirre',
    telephone: '+34982145502',
    address: direccion('Rúa Bispo Aguirre, 34', '27002', 'Lugo'),
    geo: geo(43.00737, -7.5564),
    openingHoursSpecification: [
      horario(LUN_SAB, '09:30', '23:59'),
      horario(['Sunday'], '10:00', '23:59'),
    ],
  },
  {
    id: 'augas-ferreas',
    name: 'La Urbana Burger Bar - Praza de Augas Férreas',
    telephone: '+34982808425',
    address: direccion('Rúa Cánovas del Castillo, 2', '27002', 'Lugo'),
    geo: geo(42.99769, -7.54887),
    openingHoursSpecification: [
      horario(LUN_SAB, '09:30', '23:59'),
      horario(['Sunday'], '10:00', '23:59'),
    ],
  },
  {
    id: 'as-termas',
    name: 'La Urbana Burger Bar - C.C. As Termas',
    telephone: '+34982812895',
    address: direccion('Av. Infanta Elena, 213', '27003', 'Lugo'),
    geo: geo(43.03671, -7.56975),
    openingHoursSpecification: [
      horario(LUN_SAB, '09:30', '23:59'),
      horario(['Sunday'], '12:30', '23:30'),
    ],
  },
  {
    id: 'vigo',
    name: 'La Urbana Burger Bar - Vigo',
    telephone: '+34986595689',
    address: direccion('Rúa Rosalía de Castro, 48', '36201', 'Vigo'),
    geo: geo(42.23738, -8.71252),
    openingHoursSpecification: [
      horario([...DOM_JUE, ...VIE_SAB], '13:30', '16:30'),
      horario(DOM_JUE, '20:30', '23:59'),
      horario(VIE_SAB, '20:00', '00:30'),
    ],
  },
  {
    id: 'santiago',
    name: 'La Urbana Burger Bar - Santiago de Compostela',
    telephone: '+34881939912',
    address: direccion('Av. do Camiño Francés, 3', '15703', 'Santiago de Compostela'),
    geo: geo(42.88893, -8.52608),
    openingHoursSpecification: [
      horario(DOM_JUE, '13:00', '23:00'),
      horario(VIE_SAB, '13:00', '23:30'),
    ],
  },
]
