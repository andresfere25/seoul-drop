export type Category = 'kbeauty' | 'kpop' | 'stationery' | 'snacks' | 'tech'

export type Product = {
  id: string
  slug: string
  name: string
  brand: string
  category: Category
  price: number
  originalPrice?: number
  description: string
  fullDescription: string
  badges: string[]
  badgeColor: string
  rating: number
  reviews: number
  stock: number
  tags: string[]
  gradient: string
  featured: boolean
  new: boolean
}

export const CATEGORIES = [
  { slug: 'kbeauty',    name: 'K-Beauty',    icon: 'Sparkles',  desc: 'COSRX, ANUA, Laneige y más',            count: 10, color: '#FF6B9D', bg: 'linear-gradient(135deg,#FFE4F0,#FFCCE4)' },
  { slug: 'kpop',       name: 'K-Pop',        icon: 'Music2',    desc: 'Álbumes, photocards y merch oficial',   count: 6,  color: '#9B59B6', bg: 'linear-gradient(135deg,#F0E4FF,#DEC0FF)' },
  { slug: 'stationery', name: 'Stationery',   icon: 'BookOpen',  desc: 'Papelería kawaii de Artbox y Daiso',    count: 5,  color: '#4ECDC4', bg: 'linear-gradient(135deg,#D4F5EE,#A8E6D8)' },
  { slug: 'snacks',     name: 'Snacks',        icon: 'Flame',     desc: 'Buldak, Pepero y snacks virales',       count: 7,  color: '#F39C12', bg: 'linear-gradient(135deg,#FFE8CC,#FFD0A0)' },
  { slug: 'tech',       name: 'Tech',          icon: 'Headphones',desc: 'Accesorios Samsung y gadgets',         count: 2,  color: '#2ECC71', bg: 'linear-gradient(135deg,#D4F5E4,#A8E6C0)' },
]

export const PRODUCTS: Product[] = [
  // ── K-BEAUTY ──────────────────────────────────────────────
  {
    id: '1', slug: 'cosrx-snail-mucin-96-essence',
    name: 'Advanced Snail 96 Mucin Power Essence',
    brand: 'COSRX', category: 'kbeauty',
    price: 89000, originalPrice: 108000,
    description: 'La esencia viral de baba de caracol que repara y llena de luz. 96% de secreción filtrada.',
    fullDescription: 'Uno de los productos más vendidos en Olive Young por más de 5 años consecutivos. La secreción filtrada de caracol al 96% hidrata intensamente, repara la barrera cutánea dañada y suaviza la textura irregular. Ideal para piel sensible, piel con cicatrices de acné o cualquier persona que busque una piel visiblemente más sana.',
    badges: ['Best Seller'], badgeColor: '#FF6B9D',
    rating: 4.9, reviews: 1243, stock: 18,
    tags: ['hidratación', 'reparación', 'anti-envejecimiento', 'baba de caracol'],
    gradient: 'linear-gradient(135deg, #FFE4F0 0%, #FFCCE4 100%)',
    featured: true, new: false,
  },
  {
    id: '2', slug: 'beauty-of-joseon-glow-serum',
    name: 'Glow Deep Serum Propolis + Niacinamide',
    brand: 'Beauty of Joseon', category: 'kbeauty',
    price: 95000,
    description: 'Sérum con propóleo y niacinamida para una piel brillante y sin manchas desde la semana 1.',
    fullDescription: 'Inspirado en los rituales de belleza de la dinastía Joseon. El extracto de propóleo al 63% combinado con niacinamida al 2% unifica el tono de la piel, reduce manchas y aporta un glow natural que dura todo el día. Textura ligera, absorción inmediata. Dermatológicamente probado.',
    badges: ['Nuevo'], badgeColor: '#4ECDC4',
    rating: 4.8, reviews: 892, stock: 12,
    tags: ['manchas', 'luminosidad', 'niacinamida', 'propóleo'],
    gradient: 'linear-gradient(135deg, #FFF4E0 0%, #FFE5B4 100%)',
    featured: true, new: true,
  },
  {
    id: '3', slug: 'anua-heartleaf-77-toner',
    name: 'Heartleaf 77% Soothing Toner',
    brand: 'ANUA', category: 'kbeauty',
    price: 78000, originalPrice: 92000,
    description: 'Tónico calmante con 77% de extracto de Houttuynia Cordata para pieles reactivas y enrojecidas.',
    fullDescription: 'El tónico más recomendado en Naver Beauty para piel sensible. El 77% de extracto de Heartleaf (Houttuynia Cordata) calma el enrojecimiento, reduce la inflamación y fortalece la barrera cutánea. Sin fragancia, sin colorantes. Ideal post-rutina o como primer paso de hidratación.',
    badges: ['Agotándose'], badgeColor: '#F39C12',
    rating: 4.7, reviews: 764, stock: 5,
    tags: ['calmante', 'piel sensible', 'rojeces', 'sin fragancia'],
    gradient: 'linear-gradient(135deg, #E4FFE4 0%, #C4F0C4 100%)',
    featured: true, new: false,
  },
  {
    id: '4', slug: 'laneige-lip-sleeping-mask-berry',
    name: 'Lip Sleeping Mask Intense Care Berry',
    brand: 'Laneige', category: 'kbeauty',
    price: 65000,
    description: 'La mascarilla labial de noche más viral del mundo. Labios suaves y restaurados en una sola noche.',
    fullDescription: 'El producto icónico de Laneige que conquistó TikTok y las redes coreanas. La tecnología SleepTox™ trabaja mientras duermes: exfolia células muertas, sella la humedad y regenera los labios con manteca de murumuru y fruta de baya. Por la mañana tus labios están visiblemente más suaves y con más volumen.',
    badges: ['Viral TikTok'], badgeColor: '#9B59B6',
    rating: 4.9, reviews: 2156, stock: 25,
    tags: ['labios', 'hidratación', 'noche', 'viral'],
    gradient: 'linear-gradient(135deg, #FFE4EE 0%, #FFB8D4 100%)',
    featured: true, new: false,
  },
  {
    id: '5', slug: 'some-by-mi-aha-bha-pha-toner',
    name: 'AHA·BHA·PHA 30 Days Miracle Toner',
    brand: 'Some By Mi', category: 'kbeauty',
    price: 72000,
    description: 'El tónico de los 3 ácidos que transforma tu piel en 30 días. Poros, brillo y textura mejorados.',
    fullDescription: 'Formulado con 7 tipos de ácidos botánicos + AHA/BHA/PHA en concentración suave pero efectiva. Diseñado para una transformación progresiva: exfolia suavemente, desobstruye poros y uniformiza la textura. Recomendado para principiantes en ácidos gracias a su pH equilibrado. Más de 3 millones de unidades vendidas.',
    badges: ['Best Seller'], badgeColor: '#FF6B9D',
    rating: 4.6, reviews: 3421, stock: 22,
    tags: ['exfoliación', 'poros', 'ácidos', 'textura'],
    gradient: 'linear-gradient(135deg, #E8F4FF 0%, #C4DEFF 100%)',
    featured: false, new: false,
  },
  {
    id: '6', slug: 'isntree-hyaluronic-sun-gel',
    name: 'Hyaluronic Acid Watery Sun Gel SPF50+ PA++++',
    brand: 'Isntree', category: 'kbeauty',
    price: 88000,
    description: 'Bloqueador solar gel con ácido hialurónico. Sin residuo blanco, toque seco, hidratación todo el día.',
    fullDescription: 'El protector solar que dejó de ser una corvée. Textura gel ultrafina que se absorbe en segundos, sin residuo blanco (apto para todos los tonos de piel), sin fragancia y enriquecido con ácido hialurónico para hidratación sostenida. Ideal como último paso de rutina AM. Resistente al agua y sudor.',
    badges: ['Nuevo'], badgeColor: '#4ECDC4',
    rating: 4.8, reviews: 541, stock: 14,
    tags: ['SPF', 'solar', 'ácido hialurónico', 'toque seco'],
    gradient: 'linear-gradient(135deg, #E0F4FF 0%, #B8E4FF 100%)',
    featured: false, new: true,
  },
  {
    id: '7', slug: 'numbuzin-no3-serum',
    name: 'No.3 Skin Softening Serum',
    brand: 'Numbuzin', category: 'kbeauty',
    price: 92000, originalPrice: 112000,
    description: 'Sérum de miel fermentada y niacinamida. Piel suave como seda, brillo natural sin maquillaje.',
    fullDescription: 'La línea favorita de las influencers de belleza coreanas en 2024. El Sérum No.3 combina miel fermentada al 71% con niacinamida para una piel softer al tacto y con un glow "glass skin" desde la primera aplicación. Textura acuosa no pegajosa. Apto para pieles grasas y mixtas.',
    badges: ['Hot'], badgeColor: '#E74C3C',
    rating: 4.7, reviews: 418, stock: 9,
    tags: ['glass skin', 'miel', 'niacinamida', 'suavidad'],
    gradient: 'linear-gradient(135deg, #FFF8E0 0%, #FFE8A0 100%)',
    featured: true, new: false,
  },
  {
    id: '8', slug: 'round-lab-birch-sunscreen',
    name: 'Birch Juice Moisturizing Sunscreen SPF50+',
    brand: 'Round Lab', category: 'kbeauty',
    price: 85000,
    description: 'Protector solar con savia de abedul. Ultra hidratante, sin residuo blanco y con efecto luminoso.',
    fullDescription: 'Hecho con savia de abedul de Ullengdo Island, este protector solar es la fusión perfecta entre cuidado e hidratación. PA++++ protege de UVA y UVB, la savia de abedul hidrata en profundidad y el acabado luminoso reemplaza cualquier primer. Formulación sin alcohol, sin parabenos.',
    badges: [], badgeColor: '',
    rating: 4.7, reviews: 326, stock: 16,
    tags: ['SPF', 'abedul', 'hidratante', 'luminoso'],
    gradient: 'linear-gradient(135deg, #F0F8E8 0%, #D4EEB8 100%)',
    featured: false, new: false,
  },
  {
    id: '9', slug: 'klairs-supple-preparation-toner',
    name: 'Supple Preparation Unscented Toner',
    brand: "Dear, Klairs", category: 'kbeauty',
    price: 76000,
    description: 'El tónico preparador para pieles hipersensibles. Sin fragancia, sin alcohol. Hidratación en capas.',
    fullDescription: 'Diseñado para las pieles más sensibles del mundo. El tónico preparador de Klairs sin fragancia crea la base perfecta para los siguientes productos de la rutina. Con ácido hialurónico, centella asiatica y vitamina B5. Técnica "3-Step Patting" recomendada para una hidratación máxima.',
    badges: [], badgeColor: '',
    rating: 4.6, reviews: 512, stock: 20,
    tags: ['piel sensible', 'sin fragancia', 'hidratación', 'centella'],
    gradient: 'linear-gradient(135deg, #F8F0FF 0%, #ECD4FF 100%)',
    featured: false, new: false,
  },
  {
    id: '10', slug: 'torriden-dive-in-serum',
    name: 'DIVE-IN Low Molecule Hyaluronic Acid Serum',
    brand: 'Torriden', category: 'kbeauty',
    price: 82000,
    description: 'Sérum de ácido hialurónico de molécula pequeña que penetra 12 capas de piel. Hidratación real.',
    fullDescription: 'A diferencia del HA convencional, las moléculas pequeñas de Torriden penetran hasta las capas profundas de la dermis para una hidratación desde adentro. 5 tipos de ácido hialurónico en distintos pesos moleculares, textura en gel ultraligera y efecto plumping visible. Dermatológicamente probado en pieles acneicas.',
    badges: ['Nuevo'], badgeColor: '#4ECDC4',
    rating: 4.8, reviews: 287, stock: 11,
    tags: ['ácido hialurónico', 'hidratación profunda', 'plumping', 'acné'],
    gradient: 'linear-gradient(135deg, #E0ECFF 0%, #B4D0FF 100%)',
    featured: false, new: true,
  },

  // ── K-POP ──────────────────────────────────────────────────
  {
    id: '11', slug: 'blackpink-born-pink-album',
    name: 'Born Pink — 2nd Album (Versión Digipack B)',
    brand: 'BLACKPINK / YG', category: 'kpop',
    price: 88000,
    description: 'El segundo álbum de estudio de BLACKPINK. Incluye photobook, photocard aleatoria y póster.',
    fullDescription: 'El álbum debut más esperado de 2022. Born Pink incluye los hits "Pink Venom", "Shut Down" y "Tally". Esta versión Digipack B incluye: photobook de 104 páginas, 1 photocard aleatoria de 8 posibles, 1 póster foldado y 1 sticker sheet. Sellado original de YG Entertainment, importado directamente de Corea.',
    badges: ['Best Seller'], badgeColor: '#FF6B9D',
    rating: 4.9, reviews: 876, stock: 7,
    tags: ['BLACKPINK', 'álbum', 'photocard', 'YG'],
    gradient: 'linear-gradient(135deg, #FFD4E8 0%, #FFB0D0 100%)',
    featured: true, new: false,
  },
  {
    id: '12', slug: 'bts-proof-standard',
    name: 'Proof — Anthology Album Standard Edition',
    brand: 'BTS / HYBE', category: 'kpop',
    price: 82000,
    description: 'Álbum antología de BTS con sus mejores hits y 3 canciones nuevas. Photocard aleatoria de 7.',
    fullDescription: 'La compilación definitiva de BTS que celebra sus 9 años de carrera. 48 canciones incluyendo "Run BTS", "Yet To Come" y temas inéditos. Incluye: CD 3-disc, photobook de 232 páginas, 1 photocard aleatoria de los 7 miembros, mini-essay y sticker set. Directo del HYBE official shop en Seúl.',
    badges: ['Best Seller'], badgeColor: '#FF6B9D',
    rating: 4.9, reviews: 1102, stock: 4,
    tags: ['BTS', 'álbum', 'antología', 'HYBE'],
    gradient: 'linear-gradient(135deg, #DDE8FF 0%, #B8CCFF 100%)',
    featured: true, new: false,
  },
  {
    id: '13', slug: 'newjeans-get-up-album',
    name: 'Get Up — The 2nd EP (Bunny Beach Bag Ver.)',
    brand: 'NewJeans / ADOR', category: 'kpop',
    price: 79000,
    description: 'El EP de NewJeans con "Super Shy" y "ETA". Incluye la icónica bolsa de playa + photocard.',
    fullDescription: 'La versión más buscada del EP Get Up de NewJeans. El Bunny Beach Bag incluye la bolsa tote exclusiva, tarjeta QR para versión digital, 1 photocard aleatoria (Minji, Hanni, Danielle, Haerin o Hyein), mini photobook y pegatinas. Diseño aesthetic que se volvió viral en toda Asia.',
    badges: ['Agotándose'], badgeColor: '#F39C12',
    rating: 4.8, reviews: 634, stock: 3,
    tags: ['NewJeans', 'álbum', 'bunny', 'ADOR'],
    gradient: 'linear-gradient(135deg, #E8FFEE 0%, #C0F0CC 100%)',
    featured: true, new: false,
  },
  {
    id: '14', slug: 'aespa-drama-album',
    name: "Drama — The 4th Mini Album (Drama Ver.)",
    brand: 'aespa / SM', category: 'kpop',
    price: 76000,
    description: 'El mini álbum más exitoso de aespa con "Drama" y "Armageddon". Photocard aleatoria de 4.',
    fullDescription: 'El comeback que consolidó a aespa como uno de los grupos más importantes de cuarta generación. Drama incluye: CD, photobook de 80 páginas, 1 photocard aleatoria (Karina, Giselle, Winter o Ningning), tarjeta de puntuación y sticker lenticular. Comprado en el SM Artium de Seúl.',
    badges: ['Nuevo'], badgeColor: '#4ECDC4',
    rating: 4.7, reviews: 412, stock: 9,
    tags: ['aespa', 'álbum', 'SM', 'cuarta generación'],
    gradient: 'linear-gradient(135deg, #F0E0FF 0%, #D8B4FF 100%)',
    featured: false, new: true,
  },
  {
    id: '15', slug: 'stray-kids-rockstar-album',
    name: 'Rock-Star — The 10th Mini Album (Standard)',
    brand: 'Stray Kids / JYP', category: 'kpop',
    price: 82000,
    description: 'El álbum que rompió récords de Stray Kids. Incluye "Miroh (Rock Ver.)" y photocard aleatoria de 8.',
    fullDescription: 'Rock-Star debutó en #1 en Billboard 200, haciendo de Stray Kids el primer grupo de cuarta generación en lograrlo. Incluye: 2 CDs, photobook 112 páginas, 1 photocard aleatoria de los 8 miembros, una tarjeta de póster y sticker sheet. Versión Standard comprada en la tienda oficial JYP en Myeongdong.',
    badges: ['Best Seller'], badgeColor: '#FF6B9D',
    rating: 4.8, reviews: 589, stock: 6,
    tags: ['Stray Kids', 'álbum', 'JYP', 'rock'],
    gradient: 'linear-gradient(135deg, #F8E8D0 0%, #F0C890 100%)',
    featured: false, new: false,
  },
  {
    id: '16', slug: 'twice-ready-to-be-album',
    name: 'READY TO BE — 12th Mini Album (B Ver.)',
    brand: 'TWICE / JYP', category: 'kpop',
    price: 78000,
    description: 'El mini álbum de TWICE con "SET ME FREE" y "MOONLIGHT SUNRISE". Photocard aleatoria de 9.',
    fullDescription: 'TWICE celebra su décimo año de carrera con un álbum lleno de poder y madurez. Ready to Be incluye: CD, photobook de 88 páginas, 1 photocard aleatoria de las 9 integrantes, carta de póster y pegatinas holográficas. Importado directamente del JYP Shop online con certificado de autenticidad.',
    badges: [], badgeColor: '',
    rating: 4.7, reviews: 347, stock: 11,
    tags: ['TWICE', 'álbum', 'JYP', 'girl group'],
    gradient: 'linear-gradient(135deg, #FFE0F8 0%, #FFC0F0 100%)',
    featured: false, new: false,
  },

  // ── STATIONERY ─────────────────────────────────────────────
  {
    id: '17', slug: 'artbox-cherry-blossom-washi-set',
    name: 'Cherry Blossom Washi Tape Set x10',
    brand: 'Artbox', category: 'stationery',
    price: 32000,
    description: 'Set de 10 washi tapes de flor de cerezo. La papelería más kawaii de la tienda flagship de Artbox en Hongdae.',
    fullDescription: 'Artbox es la meca de la papelería kawaii en Corea del Sur. Este set de colección de temporada incluye 10 rollos de washi tape con motivos de flor de cerezo en diferentes anchos (10mm y 15mm). Adhesivo removible, papel de arroz japonés. Edición limitada comprada en la tienda de Hongdae.',
    badges: ['Edición Limitada'], badgeColor: '#FF6B9D',
    rating: 4.8, reviews: 234, stock: 15,
    tags: ['washi tape', 'kawaii', 'Artbox', 'flor de cerezo'],
    gradient: 'linear-gradient(135deg, #FFE4EE 0%, #FFCCE0 100%)',
    featured: false, new: false,
  },
  {
    id: '18', slug: 'kakao-friends-ryan-notebook-set',
    name: 'Ryan & Choonsik Notebook Set x2 (A5)',
    brand: 'Kakao Friends', category: 'stationery',
    price: 38000,
    description: 'Set de 2 libretas A5 de Ryan y Choonsik. Papel de 100gsm, diseño oficial de Kakao Friends.',
    fullDescription: 'Los personajes más queridos de Korea en formato libreta. Set incluye 1 libreta cuadriculada Ryan (120 páginas) y 1 libreta rayada Choonsik (120 páginas). Formato A5, papel 100gsm, tapa dura ilustrada. Diseño oficial comprado en la tienda flagship Kakao Friends en Gangnam, Seúl.',
    badges: ['Nuevo'], badgeColor: '#4ECDC4',
    rating: 4.7, reviews: 189, stock: 12,
    tags: ['Ryan', 'Kakao Friends', 'libreta', 'A5'],
    gradient: 'linear-gradient(135deg, #FFF4CC 0%, #FFE880 100%)',
    featured: false, new: true,
  },
  {
    id: '19', slug: 'bt21-sticky-notes-pack',
    name: 'BT21 Mega Sticky Notes Pack (7 bloques)',
    brand: 'Line Friends / BTS', category: 'stationery',
    price: 25000,
    description: 'Pack de 7 bloques de sticky notes con los 7 personajes BT21. Papel autoadhesivo de calidad.',
    fullDescription: 'Los iconos de BT21 (Koya, RJ, Shooky, Mang, Chimmy, Tata y Van) en 7 bloques de 50 hojas cada uno. Diferentes formas y tamaños, papel autoadhesivo de calidad premium. Comprado en la tienda oficial Line Friends del COEX Mall en Seúl. Ideal para fans o como regalo.',
    badges: [], badgeColor: '',
    rating: 4.6, reviews: 312, stock: 28,
    tags: ['BT21', 'BTS', 'sticky notes', 'Line Friends'],
    gradient: 'linear-gradient(135deg, #E0F0FF 0%, #B8D8FF 100%)',
    featured: false, new: false,
  },
  {
    id: '20', slug: 'artbox-gel-pen-set-20',
    name: 'Pastel Gel Pen Set x20 Colores',
    brand: 'Artbox', category: 'stationery',
    price: 28000,
    description: '20 bolígrafos de gel en colores pastel. Tinta suave, punta fina 0.5mm. El favorito del bullet journal coreano.',
    fullDescription: 'El set completo para bullet journaling y estudio al estilo coreano. 20 colores pasteles únicos que no se consiguen fácilmente fuera de Corea. Tinta a base de gel de secado rápido, punta de 0.5mm para escritura precisa. No mancha, no corre. Comprado en la tienda flagship Artbox de Myeongdong.',
    badges: ['Best Seller'], badgeColor: '#FF6B9D',
    rating: 4.8, reviews: 421, stock: 18,
    tags: ['bolígrafos', 'gel', 'pastel', 'bullet journal'],
    gradient: 'linear-gradient(135deg, #F0F8E0 0%, #D4EEB4 100%)',
    featured: false, new: false,
  },
  {
    id: '21', slug: 'artbox-mini-masking-tape-5pack',
    name: 'Mini Masking Tape Collection x5 (Flores y Fruta)',
    brand: 'Artbox', category: 'stationery',
    price: 22000,
    description: '5 rollos de masking tape mini con patrones de flores y frutas. 7mm de ancho, adhesivo suave.',
    fullDescription: 'Colección de temporada verano 2024 de Artbox. 5 rollos de masking tape en formato mini (7mm) con diseños ilustrados de flores y frutas tropicales. Papel de arroz japonés, adhesivo repositionable que no deja residuo. Perfecto para decorar agendas, cuadernos y packagings de regalo.',
    badges: [], badgeColor: '',
    rating: 4.5, reviews: 156, stock: 24,
    tags: ['masking tape', 'flores', 'kawaii', 'Artbox'],
    gradient: 'linear-gradient(135deg, #FFEEE0 0%, #FFD8B8 100%)',
    featured: false, new: false,
  },

  // ── SNACKS ─────────────────────────────────────────────────
  {
    id: '22', slug: 'buldak-ramen-original-5pack',
    name: 'Buldak Bokkeummyeon Ramen Pack x5 (Original)',
    brand: 'Samyang', category: 'snacks',
    price: 38000,
    description: 'El ramen más picante y viral del mundo. El clásico original que inició el Buldak challenge.',
    fullDescription: 'El ramen que conquistó TikTok, YouTube y el mundo entero. Buldak Bokkeummyeon (pollo en llamas) es el ramen seco más vendido en Corea. Salsa intensa, noodles chewy, nivel de picante extremo (4,404 unidades Scoville). Pack de 5 unidades compradas en el GS25 de Myeongdong.',
    badges: ['Viral'], badgeColor: '#E74C3C',
    rating: 4.9, reviews: 1876, stock: 35,
    tags: ['ramen', 'picante', 'viral', 'Samyang'],
    gradient: 'linear-gradient(135deg, #FFE0CC 0%, #FFB090 100%)',
    featured: true, new: false,
  },
  {
    id: '23', slug: 'buldak-ramen-queso-5pack',
    name: 'Buldak Bokkeummyeon Ramen x5 (Carbonara Queso)',
    brand: 'Samyang', category: 'snacks',
    price: 42000,
    description: 'La versión cremosa y menos picante del Buldak. Sabor a carbonara con queso. Perfecta para iniciar.',
    fullDescription: 'Para los que quieren el Buldak pero con un toque más suave. La versión Carbonara combina la salsa de pollo buldak con una crema de queso que equilibra el picante. Se volvió viral como "el ramen para principiantes del picante". Pack de 5 unidades. Nivel de picante: 2,600 Scoville.',
    badges: ['Hot'], badgeColor: '#E74C3C',
    rating: 4.8, reviews: 1234, stock: 28,
    tags: ['ramen', 'carbonara', 'queso', 'Samyang'],
    gradient: 'linear-gradient(135deg, #FFF8CC 0%, #FFE880 100%)',
    featured: false, new: false,
  },
  {
    id: '24', slug: 'pepero-chocolate-5pack',
    name: 'Pepero Chocolate Original x5 Cajas',
    brand: 'Lotte', category: 'snacks',
    price: 22000,
    description: 'Los palitos de galleta bañados en chocolate que celebran el "Día del Pepero" en Corea cada 11/11.',
    fullDescription: 'Pepero es uno de los snacks más icónicos de Corea del Sur. Los palitos crujientes de galleta cubiertos de chocolate belga han sido el regalo favorito en Corea desde 1983. Pack de 5 cajas individuales de 54g. Compradas en el CU Convenience Store de Insadong. Perfectas para regalar.',
    badges: [], badgeColor: '',
    rating: 4.7, reviews: 842, stock: 42,
    tags: ['pepero', 'chocolate', 'galleta', 'Lotte'],
    gradient: 'linear-gradient(135deg, #F0E0D0 0%, #D4B090 100%)',
    featured: false, new: false,
  },
  {
    id: '25', slug: 'orion-choco-pie-12pack',
    name: 'Choco Pie Original x12 Unidades',
    brand: 'Orion', category: 'snacks',
    price: 28000,
    description: 'El postre coreano clásico: bizcocho suave, crema de malvavisco y cobertura de chocolate.',
    fullDescription: 'El Choco Pie de Orion es tan icónico que tiene su propio museo en Corea. Tres capas de bondad: bizcocho de vainilla súper esponjoso, marshmallow de vainilla y cobertura de chocolate. 12 unidades individuales empacadas. No confundir con imitaciones: este es el original coreano, comprado en Seúl.',
    badges: ['Clásico'], badgeColor: '#9B59B6',
    rating: 4.8, reviews: 1567, stock: 38,
    tags: ['choco pie', 'chocolate', 'malvavisco', 'Orion'],
    gradient: 'linear-gradient(135deg, #E8D0C0 0%, #C4A080 100%)',
    featured: false, new: false,
  },
  {
    id: '26', slug: 'nongshim-shin-ramyun-5pack',
    name: 'Shin Ramyun Original x5 Packs',
    brand: 'Nongshim', category: 'snacks',
    price: 35000,
    description: 'El ramen coreano más famoso del mundo. Picante, sabroso y con caldoo profundo. El referente del ramen.',
    fullDescription: 'Shin Ramyun es el ramen más exportado de Corea y referente mundial del género. Caldo de res y vegetales con un nivel de picante notable pero manejable. Noodles al dente, paquete de verduras deshidratadas incluido. Se prepara en 4 minutos. 5 packs comprados en el Lotte Mart de Itaewon.',
    badges: ['Clásico'], badgeColor: '#9B59B6',
    rating: 4.8, reviews: 2134, stock: 45,
    tags: ['ramen', 'shin ramyun', 'Nongshim', 'picante'],
    gradient: 'linear-gradient(135deg, #FFD8C0 0%, #FFB080 100%)',
    featured: true, new: false,
  },
  {
    id: '27', slug: 'haitai-honey-butter-chips-3pack',
    name: 'Honey Butter Chip x3 Bolsas (60g c/u)',
    brand: 'Haitai / Crown', category: 'snacks',
    price: 34000,
    description: 'Las papas fritas que causaron escasez en Corea. Miel, mantequilla y sal. Irresistibles.',
    fullDescription: 'En 2014, los Honey Butter Chips causaron una crisis de escasez en Corea: vendían 10 veces más de lo que se podía producir. El combo de miel, mantequilla de calidad y sal de mar crea un sabor adictivo que no existe en ningún otro chip del mundo. 3 bolsas de 60g, textura crunchy perfecta.',
    badges: ['Viral'], badgeColor: '#E74C3C',
    rating: 4.9, reviews: 987, stock: 20,
    tags: ['papas', 'miel', 'mantequilla', 'Haitai'],
    gradient: 'linear-gradient(135deg, #FFF4CC 0%, #FFE480 100%)',
    featured: false, new: false,
  },
  {
    id: '28', slug: 'lotte-kancho-biscuit-6pack',
    name: 'Kancho Biscuit — Chocolate Fill x6 Cajas',
    brand: 'Lotte', category: 'snacks',
    price: 24000,
    description: 'Galletitas de cancha redondas rellenas de chocolate. El snack favorito de los niños coreanos por 40 años.',
    fullDescription: 'Kancho son las galletas redondas que toda persona que ha visitado Corea ha comido. Masa crujiente de mantequilla con relleno cremoso de cacao. 6 cajas de 42g, perfectas para picar. Compradas en el Lotte World Mall de Jamsil. El snack que más piden los colombianos que han estado en Corea.',
    badges: [], badgeColor: '',
    rating: 4.6, reviews: 534, stock: 50,
    tags: ['galletas', 'chocolate', 'Lotte', 'snack'],
    gradient: 'linear-gradient(135deg, #F4E4D0 0%, #D8B890 100%)',
    featured: false, new: false,
  },

  // ── TECH ───────────────────────────────────────────────────
  {
    id: '29', slug: 'samsung-galaxy-buds2-pro',
    name: 'Galaxy Buds2 Pro — Cancelación de Ruido ANC',
    brand: 'Samsung', category: 'tech',
    price: 380000,
    description: 'Los audífonos inalámbricos premium de Samsung con ANC de clase mundial. Comprados en el Samsung DX de Gangnam.',
    fullDescription: 'Los Galaxy Buds2 Pro son los mejores audífonos in-ear de Samsung: cancelación activa de ruido clase 1 (reducción hasta 98%), audio Hi-Fi de 24bit, Buds360 XT™ para audio inmersivo y batería de 8h con estuche (hasta 29h total). Resistentes al agua IPX7. Comprados en la tienda Samsung DX Experience de Gangnam, Seúl, con garantía original.',
    badges: ['Premium'], badgeColor: '#1A1A1A',
    rating: 4.8, reviews: 234, stock: 4,
    tags: ['Samsung', 'audífonos', 'ANC', 'inalámbrico'],
    gradient: 'linear-gradient(135deg, #D8E4F8 0%, #A8C4F0 100%)',
    featured: true, new: false,
  },
  {
    id: '30', slug: 'baseus-usbc-hub-7in1',
    name: 'Baseus USB-C Hub 7-en-1 (4K HDMI + PD 100W)',
    brand: 'Baseus', category: 'tech',
    price: 145000,
    description: 'Hub USB-C con HDMI 4K, 3×USB-A, lector SD/TF y carga rápida 100W. Plug & play, sin drivers.',
    fullDescription: 'El hub esencial para MacBook, Galaxy o cualquier portátil con USB-C. 7 puertos: 1×HDMI 4K@60Hz, 3×USB-A 3.0, 1×USB-C PD 100W, 1×SD y 1×TF. Aluminio premium, transmisión de datos a 5Gbps. Sin necesidad de drivers, compatible con Mac, Windows y Android. Comprado en el Yongsan Electronics Market de Seúl.',
    badges: ['Nuevo'], badgeColor: '#4ECDC4',
    rating: 4.7, reviews: 156, stock: 8,
    tags: ['USB-C', 'hub', 'HDMI', 'MacBook'],
    gradient: 'linear-gradient(135deg, #D4F0E8 0%, #A4DCc8 100%)',
    featured: false, new: true,
  },
]

export function formatCOP(price: number) {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(price)
}

export function getProductsByCategory(category: Category | 'all') {
  if (category === 'all') return PRODUCTS
  return PRODUCTS.filter(p => p.category === category)
}

export function getFeaturedProducts() {
  return PRODUCTS.filter(p => p.featured)
}

export function getProductBySlug(slug: string) {
  return PRODUCTS.find(p => p.slug === slug)
}

export function getProductById(id: string) {
  return PRODUCTS.find(p => p.id === id)
}

export function getRelatedProducts(product: Product, limit = 4) {
  return PRODUCTS
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, limit)
}
