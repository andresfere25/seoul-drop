'use client'
import Link from 'next/link'
import { ArrowUpRight, Plus } from 'lucide-react'
import { type Product, formatCOP } from '@/lib/data'
import { useCart } from '@/lib/cart'
export default function FeaturedProducts({ products }: { products: Product[] }) {
  const { addItem } = useCart()
  return <section className="kaya-section kaya-edit"><div className="kaya-section-heading"><div><p className="kaya-eyebrow">THE KAYA EDIT / 001</p><h2>Pocas piezas. Bien elegidas.</h2></div><Link href="/tienda">Ver la seleccion <ArrowUpRight size={17} /></Link></div><p className="kaya-reference-note">Referencias para explorar. Precios orientativos; disponibilidad y fotos de producto por confirmar.</p><div className="kaya-products">{products.slice(0, 4).map((p, i) => <article className="kaya-product" key={p.id}><Link href={`/producto/${p.slug}`} className="kaya-product-art" style={{ background: ['#f6e6eb','#dcece6','#e9e9ee','#f1e4e7'][i % 4] }}>{p.image ? <img src={p.image} alt={p.name} loading="lazy" /> : <div className="kaya-product-type"><span>{p.category === 'kpop' ? 'ALBUM /' : 'SKIN /'}</span><strong>{p.brand}</strong><small>IMAGEN PENDIENTE</small></div>}<span className="kaya-reference-label">Referencia</span></Link><div className="kaya-product-meta"><span>{p.brand}</span><button onClick={() => addItem(p)} title={`Agregar ${p.name} al carrito de referencia`} aria-label={`Agregar ${p.name}`}><Plus size={18} /></button></div><Link className="kaya-product-name" href={`/producto/${p.slug}`}>{p.name}</Link><p>{formatCOP(p.price)}</p></article>)}</div></section>
}
