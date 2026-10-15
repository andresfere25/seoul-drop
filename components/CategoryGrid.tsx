import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
const collections = [
  { name: 'El ritual diario', category: 'Skincare', href: '/tienda?cat=kbeauty', image: 'photo-1598440947619-2c35fc9aa908', note: 'Menos pasos. Una selección con criterio.' },
  { name: 'En modo fandom', category: 'K-pop', href: '/tienda?cat=kpop', image: 'photo-1514525253161-7a46d19cd819', note: 'Álbumes y objetos para tu colección.' },
  { name: 'Un episodio más', category: 'K-dramas', href: '/pedido-especial', image: 'photo-1532649097480-b67d52743b69', note: 'Cuéntanos que estás buscando.' },
]
export default function CategoryGrid() {
  return <section id="categorias" className="kaya-section"><div className="kaya-section-heading"><div><p className="kaya-eyebrow">TRES FORMAS DE VIVIR COREA</p><h2>Encuentra tu universo.</h2></div><p>Una selección pequeña.<br />Una conexión muy personal.</p></div><div className="kaya-collections">{collections.map((c, i) => <Link href={c.href} key={c.name} className="kaya-collection"><div className="kaya-collection-photo"><img src={`https://images.unsplash.com/${c.image}?auto=format&fit=crop&w=850&q=85`} alt={c.category} loading="lazy" /><span>0{i + 1} / {c.category}</span></div><div className="kaya-collection-title"><h3>{c.name}</h3><ArrowUpRight size={23} /></div><p>{c.note}</p></Link>)}</div></section>
}
