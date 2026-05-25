// ── Banco de imágenes lifestyle (Unsplash, libres de uso) ──
// Se usan con SmartImage: si una falla, se muestra el gradiente de fondo.

const BASE = 'https://images.unsplash.com/'

/** Construye la URL con parámetros de optimización */
export function img(id: string, w = 900) {
  return `${BASE}${id}?auto=format&fit=crop&w=${w}&q=80`
}

// Pools por tema
export const IMG = {
  beautyModel: [
    'photo-1593260853607-d0e0f639bdab',
    'photo-1627561037197-f41503b0a7d4',
    'photo-1542996966-2e31c00bae31',
    'photo-1602416429875-abd90ba0c9a3',
  ],
  skincare: [
    'photo-1573461160327-b450ce3d8e7f',
    'photo-1555820585-c5ae44394b79',
    'photo-1580870069867-74c57ee1bb07',
    'photo-1598440947619-2c35fc9aa908',
    'photo-1542833807-ad5af0977050',
  ],
  kpop: [
    'photo-1514525253161-7a46d19cd819',
    'photo-1522158637959-30385a09e0da',
    'photo-1450044804117-534ccd6e6a3a',
    'photo-1470229538611-16ba8c7ffbd7',
  ],
  seoul: [
    'photo-1538485399081-7191377e8241',
    'photo-1532649097480-b67d52743b69',
    'photo-1546874177-9e664107314e',
    'photo-1570191913384-7b4ff11716e7',
  ],
  snacks: [
    'photo-1661366394743-fe30fe478ef7',
    'photo-1563998957248-b59e18407396',
  ],
  stationery: [
    'photo-1507831228884-93d43e81a99d',
    'photo-1526566942522-80916a974d73',
    'photo-1513127971914-6a8656fc9718',
    'photo-1531347094902-936c323cccbe',
  ],
  tech: [
    'photo-1572569511254-d8f925fe2cbb',
    'photo-1590658268037-6bf12165a8df',
    'photo-1606220588913-b3aacb4d2f46',
    'photo-1600294037681-c80b4cb5b434',
  ],
  unboxing: [
    'photo-1512909006721-3d6018887383',
    'photo-1544639044-4f142ceb6a2b',
    'photo-1545844568-98bb15133ec0',
  ],
}

// Imagen representativa por categoría de producto
const CATEGORY_POOL: Record<string, string[]> = {
  kbeauty: [...IMG.skincare, ...IMG.beautyModel],
  kpop: IMG.kpop,
  stationery: IMG.stationery,
  snacks: IMG.snacks,
  tech: IMG.tech,
}

/** Devuelve una imagen de producto rotando dentro de su categoría */
export function getProductImage(category: string, index: number, w = 700) {
  const pool = CATEGORY_POOL[category] || IMG.skincare
  return img(pool[index % pool.length], w)
}

// Imagen para tarjetas de categoría
export const CATEGORY_IMAGE: Record<string, string> = {
  kbeauty: img(IMG.beautyModel[0], 600),
  kpop: img(IMG.kpop[3], 600),
  stationery: img(IMG.stationery[0], 600),
  snacks: img(IMG.snacks[0], 600),
  tech: img(IMG.tech[0], 600),
}

// Slides del carrusel lifestyle
export const CAROUSEL_SLIDES = [
  {
    image: img(IMG.beautyModel[0], 1600),
    tag: 'K-Beauty',
    title: 'Tu ritual de belleza coreano',
    subtitle: 'COSRX, ANUA, Beauty of Joseon y Laneige — directo de Olive Young',
    href: '/tienda?cat=kbeauty',
    color: '#FF6B9D',
  },
  {
    image: img(IMG.kpop[1], 1600),
    tag: 'K-Pop',
    title: 'Álbumes y merch oficial',
    subtitle: 'BTS, BLACKPINK, NewJeans y más — con photocards incluidas',
    href: '/tienda?cat=kpop',
    color: '#9B59B6',
  },
  {
    image: img(IMG.snacks[0], 1600),
    tag: 'Snacks',
    title: 'Los snacks más virales de Corea',
    subtitle: 'Buldak, Pepero, Choco Pie y Honey Butter Chips',
    href: '/tienda?cat=snacks',
    color: '#F39C12',
  },
  {
    image: img(IMG.seoul[0], 1600),
    tag: 'Directo de Seúl',
    title: 'Comprado en persona en Corea',
    subtitle: 'Nuestro equipo selecciona cada producto en tiendas oficiales',
    href: '/tienda',
    color: '#4ECDC4',
  },
]

// Story "De Seúl a tu casa"
export const STORY_IMAGES = {
  seoul: img(IMG.seoul[1], 800),
  pick: img(IMG.skincare[1], 800),
  unbox: img(IMG.unboxing[0], 800),
}
