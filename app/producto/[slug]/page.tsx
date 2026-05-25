'use client'
import { use } from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Star, ShoppingBag, ArrowLeft, ShieldCheck, Truck, RefreshCw, MessageCircle } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PromoBar from '@/components/PromoBar'
import { getProductBySlug, getRelatedProducts, formatCOP, CATEGORIES, PRODUCTS } from '@/lib/data'
import { getProductImage } from '@/lib/images'
import SmartImage from '@/components/SmartImage'

export default function ProductoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const product = getProductBySlug(slug)
  if (!product) notFound()

  const related = getRelatedProducts(product)
  const category = CATEGORIES.find(c => c.slug === product.category)
  const productIndex = PRODUCTS.findIndex(p => p.id === product.id)
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  return (
    <>
      <PromoBar />
      <Navbar />
      <main style={{ background: '#FAF7F2', minHeight: '80vh' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: 'clamp(1.5rem,3vw,2.5rem) 1.5rem' }}>

          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2rem', fontSize: '13px', color: '#888', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: '#888', textDecoration: 'none' }} onMouseEnter={e => (e.currentTarget.style.color = '#FF6B9D')} onMouseLeave={e => (e.currentTarget.style.color = '#888')}>Inicio</Link>
            <span>/</span>
            <Link href="/tienda" style={{ color: '#888', textDecoration: 'none' }} onMouseEnter={e => (e.currentTarget.style.color = '#FF6B9D')} onMouseLeave={e => (e.currentTarget.style.color = '#888')}>Tienda</Link>
            <span>/</span>
            <Link href={`/tienda?cat=${product.category}`} style={{ color: '#888', textDecoration: 'none' }} onMouseEnter={e => (e.currentTarget.style.color = '#FF6B9D')} onMouseLeave={e => (e.currentTarget.style.color = '#888')}>{category?.name}</Link>
            <span>/</span>
            <span style={{ color: '#1A1A1A', fontWeight: 500 }}>{product.name}</span>
          </div>

          {/* Producto principal */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>

            {/* Imagen */}
            <div>
              <div style={{
                background: product.gradient,
                borderRadius: '24px',
                aspectRatio: '1',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative',
                border: '1px solid rgba(0,0,0,0.06)',
              }}>
                <span style={{ fontSize: '14px', fontWeight: 800, color: 'rgba(0,0,0,0.18)', letterSpacing: '2px', textTransform: 'uppercase' }}>
                  {product.brand}
                </span>
                <SmartImage src={getProductImage(product.category, productIndex, 900)} alt={product.name} />
                {product.badges[0] && (
                  <span style={{ position: 'absolute', top: '20px', left: '20px', background: product.badgeColor, color: 'white', padding: '6px 14px', borderRadius: '10px', fontSize: '13px', fontWeight: 700 }}>
                    {product.badges[0]}
                  </span>
                )}
                {discount && (
                  <span style={{ position: 'absolute', top: '20px', right: '20px', background: '#1A1A1A', color: 'white', padding: '6px 12px', borderRadius: '10px', fontSize: '13px', fontWeight: 700 }}>
                    -{discount}%
                  </span>
                )}
                {product.stock <= 5 && (
                  <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.7)', color: 'white', padding: '8px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: 600, whiteSpace: 'nowrap' }}>
                    ⚡ Solo quedan {product.stock} unidades
                  </div>
                )}
              </div>
            </div>

            {/* Detalle */}
            <div>
              <Link href="/tienda" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#888', fontSize: '13px', textDecoration: 'none', marginBottom: '1.25rem', transition: 'color 0.18s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#FF6B9D')}
                onMouseLeave={e => (e.currentTarget.style.color = '#888')}
              >
                <ArrowLeft size={14} />
                Volver a tienda
              </Link>

              <p style={{ fontSize: '12px', color: '#FF6B9D', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>
                {product.brand}
              </p>

              <h1 style={{ fontSize: 'clamp(1.6rem,3.5vw,2.2rem)', fontWeight: 900, color: '#1A1A1A', letterSpacing: '-1px', lineHeight: 1.15, marginBottom: '1rem' }}>
                {product.name}
              </h1>

              {/* Rating */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', gap: '2px' }}>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={15} fill={i < Math.floor(product.rating) ? '#F39C12' : 'none'} color="#F39C12" strokeWidth={1.5} />
                  ))}
                </div>
                <span style={{ fontSize: '15px', fontWeight: 700, color: '#1A1A1A' }}>{product.rating}</span>
                <span style={{ fontSize: '13px', color: '#AAA' }}>({product.reviews.toLocaleString('es-CO')} reseñas)</span>
              </div>

              <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.65, marginBottom: '1.75rem' }}>
                {product.fullDescription}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '2rem' }}>
                {product.tags.map(tag => (
                  <span key={tag} style={{ background: '#F5F2EC', color: '#6B6B6B', padding: '5px 14px', borderRadius: '100px', fontSize: '12px', fontWeight: 600 }}>
                    {tag}
                  </span>
                ))}
              </div>

              {/* Precio */}
              <div style={{ marginBottom: '1.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                  <span style={{ fontSize: '2.2rem', fontWeight: 900, color: '#1A1A1A', letterSpacing: '-1px' }}>
                    {formatCOP(product.price)}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span style={{ fontSize: '1.1rem', color: '#AAA', textDecoration: 'line-through' }}>
                        {formatCOP(product.originalPrice)}
                      </span>
                      <span style={{ background: '#FF6B9D', color: 'white', padding: '3px 10px', borderRadius: '8px', fontSize: '13px', fontWeight: 700 }}>
                        -{discount}%
                      </span>
                    </>
                  )}
                </div>
                <p style={{ fontSize: '13px', color: '#888', marginTop: '6px' }}>
                  Precio en COP — envío calculado al finalizar
                </p>
              </div>

              {/* CTA */}
              <div style={{ display: 'flex', gap: '12px', marginBottom: '2rem', flexWrap: 'wrap' }}>
                <button style={{
                  flex: '1 1 180px',
                  background: 'linear-gradient(135deg, #FF6B9D, #E85A8C)',
                  color: 'white', border: 'none',
                  borderRadius: '14px', padding: '16px 24px',
                  fontSize: '16px', fontWeight: 700, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  boxShadow: '0 4px 20px rgba(255,107,157,0.35)',
                  transition: 'opacity 0.18s, transform 0.18s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.opacity = '0.9'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  <ShoppingBag size={18} strokeWidth={2} />
                  Agregar al carrito
                </button>
                <a href="#" style={{
                  flex: '1 1 160px',
                  background: '#1A1A1A', color: 'white',
                  borderRadius: '14px', padding: '16px 20px',
                  fontSize: '15px', fontWeight: 600,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  textDecoration: 'none', transition: 'opacity 0.18s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  <MessageCircle size={17} strokeWidth={1.8} />
                  Pedir por WhatsApp
                </a>
              </div>

              {/* Trust indicators */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { Icon: ShieldCheck, text: 'Producto 100% original comprado en tienda oficial' },
                  { Icon: Truck, text: 'Envío por Servientrega a todo Colombia' },
                  { Icon: RefreshCw, text: 'Devolución garantizada si no es original' },
                ].map(({ Icon, text }) => (
                  <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', color: '#555' }}>
                    <Icon size={15} color="#4ECDC4" strokeWidth={2} />
                    {text}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Productos relacionados */}
          {related.length > 0 && (
            <div>
              <h2 style={{ fontSize: 'clamp(1.4rem,3vw,1.9rem)', fontWeight: 900, color: '#1A1A1A', letterSpacing: '-1px', marginBottom: '1.5rem' }}>
                También te puede gustar
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))', gap: '1.25rem' }}>
                {related.map((p, ri) => (
                  <Link key={p.id} href={`/producto/${p.slug}`} style={{ textDecoration: 'none' }}>
                    <div style={{
                      background: 'white', border: '1.5px solid #F0ECE4', borderRadius: '18px', overflow: 'hidden',
                      transition: 'transform 0.2s, box-shadow 0.2s, border-color 0.2s', cursor: 'pointer',
                    }}
                      onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(-4px)'; el.style.boxShadow = '0 10px 30px rgba(0,0,0,0.08)'; el.style.borderColor = '#FF6B9D' }}
                      onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = 'translateY(0)'; el.style.boxShadow = 'none'; el.style.borderColor = '#F0ECE4' }}
                    >
                      <div style={{ background: p.gradient, height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                        <span style={{ fontSize: '11px', fontWeight: 700, color: 'rgba(0,0,0,0.18)', letterSpacing: '1px', textTransform: 'uppercase' }}>{p.brand}</span>
                        <SmartImage src={getProductImage(p.category, ri + 1)} alt={p.name} />
                      </div>
                      <div style={{ padding: '1rem' }}>
                        <p style={{ fontSize: '11px', color: '#FF6B9D', fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{p.brand}</p>
                        <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A', marginBottom: '10px', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.name}</h3>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontWeight: 800, fontSize: '15px', color: '#1A1A1A' }}>{formatCOP(p.price)}</span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <Star size={11} fill="#F39C12" color="#F39C12" />
                            <span style={{ fontSize: '12px', fontWeight: 700, color: '#1A1A1A' }}>{p.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
