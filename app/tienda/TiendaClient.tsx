'use client'
import { useState, useMemo } from 'react'
import Link from 'next/link'
import { ShoppingBag, Star, Search, SlidersHorizontal, X } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PromoBar from '@/components/PromoBar'
import { CATEGORIES, formatCOP, type Category, type Product } from '@/lib/data'
import { getProductImage } from '@/lib/images'
import { useCart } from '@/lib/cart'
import SmartImage from '@/components/SmartImage'

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevancia' },
  { value: 'price-asc', label: 'Precio: menor a mayor' },
  { value: 'price-desc', label: 'Precio: mayor a menor' },
  { value: 'rating', label: 'Mejor valorados' },
  { value: 'new', label: 'Nuevos primero' },
]

export default function TiendaClient({ products }: { products: Product[] }) {
  const { addItem } = useCart()
  const [activeCategory, setActiveCategory] = useState<Category | 'all'>('all')
  const [sort, setSort] = useState('relevance')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    let list = [...products]
    if (activeCategory !== 'all') list = list.filter(p => p.category === activeCategory)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tags.some(t => t.includes(q))
      )
    }
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating)
    else if (sort === 'new') list.sort((a, b) => (b.new ? 1 : 0) - (a.new ? 1 : 0))
    return list
  }, [activeCategory, sort, search, products])

  // Conteos por categoría según los productos cargados
  const countFor = (slug: string) => slug === 'all' ? products.length : products.filter(p => p.category === slug).length

  return (
    <>
      <PromoBar />
      <Navbar />
      <main style={{ minHeight: '80vh', background: '#FAF7F2' }}>

        {/* Header */}
        <div style={{ background: '#1A1A1A', padding: 'clamp(2.5rem,5vw,4rem) 1.5rem' }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <p style={{ fontSize: '12px', color: '#FF6B9D', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '10px' }}>
              Catálogo completo
            </p>
            <h1 style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: 900, color: 'white', letterSpacing: '-2px', lineHeight: 1.05, marginBottom: '8px' }}>
              Tienda Seoul Drop
            </h1>
            <p style={{ color: '#888', fontSize: '15px' }}>
              {products.length} productos importados directamente desde Seúl
            </p>
          </div>
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>

          {/* Search + Sort bar */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '1.75rem', flexWrap: 'wrap' }}>
            <div style={{ flex: '1 1 260px', position: 'relative' }}>
              <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#AAA', pointerEvents: 'none' }} />
              <input
                type="text"
                placeholder="Buscar productos, marcas..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: '100%', padding: '12px 14px 12px 42px',
                  borderRadius: '12px', border: '1.5px solid #E8E4DC',
                  fontSize: '14px', outline: 'none', background: 'white',
                  color: '#1A1A1A', transition: 'border-color 0.18s',
                }}
                onFocus={e => (e.target.style.borderColor = '#FF6B9D')}
                onBlur={e => (e.target.style.borderColor = '#E8E4DC')}
              />
              {search && (
                <button onClick={() => setSearch('')} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#AAA', display: 'flex' }}>
                  <X size={16} />
                </button>
              )}
            </div>
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <SlidersHorizontal size={14} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#888', pointerEvents: 'none' }} />
              <select value={sort} onChange={e => setSort(e.target.value)} style={{
                padding: '12px 14px 12px 38px',
                borderRadius: '12px', border: '1.5px solid #E8E4DC',
                fontSize: '14px', outline: 'none', background: 'white',
                color: '#1A1A1A', cursor: 'pointer', appearance: 'none',
                paddingRight: '36px',
              }}>
                {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            </div>
          </div>

          {/* Category tabs */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '4px' }}>
            {[{ slug: 'all', name: 'Todos' }, ...CATEGORIES].map(({ slug, name }) => {
              const active = activeCategory === slug
              return (
                <button key={slug} onClick={() => setActiveCategory(slug as Category | 'all')} style={{
                  padding: '9px 18px',
                  borderRadius: '100px',
                  border: active ? 'none' : '1.5px solid #E8E4DC',
                  background: active ? '#FF6B9D' : 'white',
                  color: active ? 'white' : '#3A3A3A',
                  fontSize: '13px', fontWeight: 600,
                  cursor: 'pointer', whiteSpace: 'nowrap',
                  transition: 'all 0.18s',
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}>
                  {name}
                  <span style={{
                    background: active ? 'rgba(255,255,255,0.25)' : '#F0ECE4',
                    color: active ? 'white' : '#888',
                    borderRadius: '100px', padding: '1px 7px', fontSize: '11px', fontWeight: 700,
                  }}>{countFor(slug)}</span>
                </button>
              )
            })}
          </div>

          {/* Results count */}
          <p style={{ fontSize: '14px', color: '#888', marginBottom: '1.5rem' }}>
            {filtered.length} {filtered.length === 1 ? 'producto' : 'productos'} encontrados
            {search && <> para <strong style={{ color: '#1A1A1A' }}>&ldquo;{search}&rdquo;</strong></>}
          </p>

          {/* Grid */}
          {filtered.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
              gap: '1.25rem',
            }}>
              {filtered.map((product, idx) => (
                <Link key={product.id} href={`/producto/${product.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    background: 'white',
                    border: '1.5px solid #F0ECE4',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    transition: 'transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease',
                    cursor: 'pointer', height: '100%',
                  }}
                    onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 12px 36px rgba(0,0,0,0.09)'; el.style.borderColor = '#FF6B9D' }}
                    onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; el.style.borderColor = '#F0ECE4' }}
                  >
                    <div style={{ background: product.gradient, height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                      <span style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(0,0,0,0.18)', letterSpacing: '1px', textTransform: 'uppercase' }}>{product.brand}</span>
                      <SmartImage src={product.image || getProductImage(product.category, idx)} alt={product.name} />
                      {product.badges[0] && (
                        <span style={{ position: 'absolute', top: '12px', left: '12px', background: product.badgeColor, color: 'white', padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 700 }}>
                          {product.badges[0]}
                        </span>
                      )}
                      {product.stock <= 5 && (
                        <span style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(0,0,0,0.65)', color: 'white', padding: '4px 10px', borderRadius: '8px', fontSize: '11px', fontWeight: 600 }}>
                          ¡Últimas {product.stock}!
                        </span>
                      )}
                    </div>
                    <div style={{ padding: '1rem' }}>
                      <p style={{ fontSize: '11px', color: '#FF6B9D', fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>{product.brand}</p>
                      <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#1A1A1A', marginBottom: '8px', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {product.name}
                      </h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '12px' }}>
                        <Star size={12} fill="#F39C12" color="#F39C12" />
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#1A1A1A' }}>{product.rating}</span>
                        <span style={{ fontSize: '12px', color: '#AAA' }}>({product.reviews.toLocaleString('es-CO')})</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <span style={{ fontWeight: 800, fontSize: '16px', color: '#1A1A1A' }}>{formatCOP(product.price)}</span>
                          {product.originalPrice && (
                            <span style={{ fontSize: '12px', color: '#AAA', textDecoration: 'line-through', marginLeft: '5px' }}>{formatCOP(product.originalPrice)}</span>
                          )}
                        </div>
                        <button style={{
                          background: '#1A1A1A', color: 'white', border: 'none',
                          borderRadius: '10px', padding: '8px 13px', fontSize: '12px',
                          fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px',
                          transition: 'background 0.18s',
                        }}
                          onMouseEnter={e => (e.currentTarget.style.background = '#FF6B9D')}
                          onMouseLeave={e => (e.currentTarget.style.background = '#1A1A1A')}
                          onClick={ev => { ev.preventDefault(); addItem(product) }}
                        >
                          <ShoppingBag size={13} strokeWidth={2} />
                          Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '5rem 1.5rem', color: '#888' }}>
              <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</p>
              <p style={{ fontSize: '18px', fontWeight: 600, color: '#1A1A1A', marginBottom: '8px' }}>No encontramos productos</p>
              <p style={{ fontSize: '14px', marginBottom: '1.5rem' }}>Intenta con otro término o explora todas las categorías</p>
              <button onClick={() => { setSearch(''); setActiveCategory('all') }} style={{ background: '#FF6B9D', color: 'white', border: 'none', borderRadius: '10px', padding: '12px 24px', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>
                Ver todos los productos
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
