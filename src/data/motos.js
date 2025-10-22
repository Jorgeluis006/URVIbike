// Puedes usar imágenes locales (carpeta /img) o imágenes alojadas en Google Drive (enlace público).
// Para Google Drive, convierte tu enlace compartido a un enlace directo con la función driveDirectLink.
// Ejemplo de uso:
//   imagen: driveDirectLink('https://drive.google.com/file/d/FILE_ID/view?usp=sharing')
//   o
//   imagen: driveDirectLink('https://drive.google.com/open?id=FILE_ID')

const baseImg = '/img'

function driveDirectLink(url) {
  try {
    // Casos típicos: /file/d/{ID}/view o ...?id={ID}
    const fileIdMatch = url.match(/\/d\/([^/]+)/)
    let id = fileIdMatch && fileIdMatch[1]
    if (!id) {
      const u = new URL(url)
      id = u.searchParams.get('id')
    }
    return id ? `https://drive.google.com/uc?export=view&id=${id}` : url
  } catch {
    return url
  }
}

const modelos = [
  // BICICLETAS
  {
    id: 'bici1',
    nombre: 'Urban E-Bike Pro',
    categoria: 'bicicleta',
    autonomia: 120,
    velocidadMax: 25,
    potencia: 0.25,
    precio: '€1.299',
    descripcion: 'Bicicleta eléctrica urbana con diseño elegante y batería de larga duración. Perfecta para desplazamientos diarios.',
    imagen: `${baseImg}/DSC07612.png`,
    galeria: [
      `${baseImg}/DSC07612.png`,
      `${baseImg}/05AG.png`,
      `${baseImg}/DSC091630202.png`,
      `${baseImg}/01AZU.png`,
    ],
  },
  {
    id: 'bici2',
    nombre: 'Mountain E-Bike X200',
    categoria: 'bicicleta',
    autonomia: 100,
    velocidadMax: 25,
    potencia: 0.5,
    precio: '€1.899',
    descripcion: 'Bicicleta eléctrica de montaña con suspensión completa y motor potente para terrenos difíciles.',
    imagen: `${baseImg}/05AG.png`,
    galeria: [
      `${baseImg}/05AG.png`,
      `${baseImg}/DSC07612.png`,
      `${baseImg}/01AZU.png`,
      `${baseImg}/DSC091630202.png`,
    ],
  },
  {
    id: 'bici3',
    nombre: 'City Cruiser E-Bike',
    categoria: 'bicicleta',
    autonomia: 90,
    velocidadMax: 25,
    potencia: 0.25,
    precio: '€999',
    descripcion: 'Bicicleta eléctrica cómoda y práctica para la ciudad. Con cesta delantera y diseño retro.',
    imagen: `${baseImg}/DSC091630202.png`,
    galeria: [
      `${baseImg}/DSC091630202.png`,
      `${baseImg}/DSC07612.png`,
      `${baseImg}/05AG.png`,
      `${baseImg}/01AZU.png`,
    ],
  },
  {
    id: 'bici4',
    nombre: 'Folding E-Bike Compact',
    categoria: 'bicicleta',
    autonomia: 60,
    velocidadMax: 25,
    potencia: 0.25,
    precio: '€799',
    descripcion: 'Bicicleta eléctrica plegable ideal para combinar con transporte público. Compacta y ligera.',
    imagen: `${baseImg}/DSC07612.png`,
    galeria: [
      `${baseImg}/DSC07612.png`,
      `${baseImg}/05AG.png`,
      `${baseImg}/DSC091630202.png`,
      `${baseImg}/01AZU.png`,
    ],
  },

  // SCOOTERS
  {
    id: 'scoot1',
    nombre: 'Thunder S500',
    categoria: 'scooter',
    autonomia: 150,
    velocidadMax: 120,
    potencia: 15,
    precio: '€7.990',
    descripcion: 'Scooter eléctrico de alta potencia con gran autonomía. Ideal para largas distancias urbanas.',
    imagen: `${baseImg}/01AZU.png`,
    galeria: [
      `${baseImg}/01AZU.png`,
      `${baseImg}/DSC091630202.png`,
      `${baseImg}/05AG.png`,
      `${baseImg}/DSC07612.png`,
    ],
  },
  {
    id: 'scoot2',
    nombre: 'Swift E-Scooter',
    categoria: 'scooter',
    autonomia: 80,
    velocidadMax: 90,
    potencia: 8,
    precio: '€4.990',
    descripcion: 'Scooter eléctrico urbano ágil y económico. Perfecto para movilidad diaria en la ciudad.',
    imagen: `${baseImg}/01AZU.png`,
    galeria: [
      `${baseImg}/01AZU.png`,
      `${baseImg}/DSC07612.png`,
      `${baseImg}/05AG.png`,
      `${baseImg}/DSC091630202.png`,
    ],
  },
  {
    id: 'scoot3',
    nombre: 'Volt Maxi Pro',
    categoria: 'scooter',
    autonomia: 180,
    velocidadMax: 140,
    potencia: 20,
    precio: '€9.990',
    descripcion: 'Scooter eléctrico premium con máxima potencia y autonomía extendida. Para los más exigentes.',
    imagen: `${baseImg}/01AZU.png`,
    galeria: [
      `${baseImg}/01AZU.png`,
      `${baseImg}/05AG.png`,
      `${baseImg}/DSC091630202.png`,
      `${baseImg}/DSC07612.png`,
    ],
  },
  {
    id: 'scoot4',
    nombre: 'City Zoom E-Scooter',
    categoria: 'scooter',
    autonomia: 60,
    velocidadMax: 70,
    potencia: 5,
    precio: '€3.490',
    descripcion: 'Scooter eléctrico compacto y económico. Ideal para trayectos cortos y estacionamiento fácil.',
    imagen: `${baseImg}/01AZU.png`,
    galeria: [
      `${baseImg}/01AZU.png`,
      `${baseImg}/DSC091630202.png`,
      `${baseImg}/DSC07612.png`,
      `${baseImg}/05AG.png`,
    ],
  },
]

const categorias = [
  {
    id: 'bicicletas',
    nombre: 'Bicicletas',
    descripcion: 'Bicicletas eléctricas urbanas',
    imagen: `${baseImg}/DSC07612.png`,
  },
  {
    id: 'scooters',
    nombre: 'Scooters',
    descripcion: 'Scooters eléctricos potentes',
    imagen: `${baseImg}/Patinetas06.jpg`,
  },
]

const caracteristicas = [
  { titulo: 'Cero emisiones', descripcion: 'Movilidad limpia para ciudades sostenibles.' },
  { titulo: 'Bajo mantenimiento', descripcion: 'Menos piezas móviles y costes reducidos.' },
  { titulo: 'Carga rápida', descripcion: 'Hasta el 80% en menos de una hora en modelos compatibles.' },
  { titulo: 'Conectividad', descripcion: 'Apps móviles para estado de batería y rutas.' },
]

// Contenido para la portada/hero
const hero = {
  titulo: 'Energía eléctrica. Emoción pura.',
  subtitulo: 'Rendimiento, eficiencia y tecnología para moverte sin límites.',
  // Puedes usar una imagen local o de Drive
  // imagen: `${baseImg}/hero.jpg`,
  imagen: `${baseImg}/carrusel1 (1).jpg`,
  carrusel: [
    `${baseImg}/carrusel1 (1).jpg`,

    `${baseImg}/carrusel1 (2).png`,
    `${baseImg}/carrusel1 (3).png`,
    `${baseImg}/carrusel1 (4).png`,
    `${baseImg}/carrusel1 (5).png`,
    `${baseImg}/carrusel1 (6).png`,
    `${baseImg}/carrusel1 (7).png`,
    `${baseImg}/carrusel1 (8).png`,
    `${baseImg}/carrusel1 (9).png`,
    `${baseImg}/carrusel1 (10).png`,
  ],
}

export default { modelos, caracteristicas, hero, categorias }

// Export opcional si quieres usarla en otros componentes
export { driveDirectLink }
