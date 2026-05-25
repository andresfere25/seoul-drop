'use client'
import Link from 'next/link'
import { ShoppingBag, Star, ArrowRight } from 'lucide-react'
import { getFeaturedProducts, formatCOP } from '@/lib/data'
import { getProductImage } from '@/lib/images'
import SmartImage from './SmartImage'

const PRODUCTS = getFeaturedProducts()

export default function FeaturedProducts() {
  return (
    <section style={{ padding: 'clamp(3rem,6vw,5rem) 1.5rem', background: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <p style={{ fontSize: '12px', color: '#FF6B9D', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '8px' }}>
              Más vendidos
            </p>
            <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.4rem)', fontWeight: 900, color: '#1A1A1A', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
              Los favoritos del momento
            </h2>
            <p style={{ color: '#888', marginTop: '8px', fontSize: '15px' }}>
              Lo que más piden nuestros clientes colombianos
            </p>
          </div>
          <Link href="/tienda" style={{
            color: '#FF6B9D', fontWeight: 600, fontSize: '14px',
            textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px',
            transition: 'gap 0.18s',
          }}
            onMouseEnter={e => (e.currentTarget.style.gap = '8px')}
            onMouseLeave={e => (e.currentTarget.style.gap = '5px')}
          >
            Ver todo el catálogo
            <ArrowRight size={16} strokeWidth={2.2} />
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '1.5rem',
        }}>
          {PRODUCTS.map((product, idx) => (
            <div key={product.id} style={{ position: 'relative' }}>
              <Link href={`/producto/${product.slug}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'white',
                  border: '1.5px solid #F0ECE4',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  transition: 'transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease',
                  cursor: 'pointer',
                }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.transform = 'translateY(-4px)'
                    el.style.boxShadow = '0 12px 36px rgba(0,0,0,0.09)'
                    el.style.borderColor = '#FF6B9D'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.transform = 'translateY(0)'
                    el.style.boxShadow = 'none'
                    el.style.borderColor = '#F0ECE4'
                  }}
                >
                  {/* Imagen placeholder */}
                  <div style={{
                    background: product.gradient,
                    height: '220px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative',
                  }}>
                    <span style={{ fontSize: '12px', fontWeight: 700, color: 'rgba(0,0,0,0.2)', letterSpacing: '1px', textTransform: 'uppercase' }}>
                      {product.brand}
                    </span>
                    <SmartImage src={getProductImage(product.category, idx)} alt={product.name} />
                    {product.badges[0] && (
                      <span style={{
                        position: 'absolute', top: '14px', left: '14px',
                        background: product.badgeColor, color: 'white',
                        padding: '4px 11px', borderRadius: '8px',
                        fontSize: '11px', fontWeight: 700, letterSpacing: '0.3px',
                      }}>
                        {product.badges[0]}
                      </span>
                    )}
                    {product.originalPrice && (
                      <span style={{
                        position: 'absolute', top: '14px', right: '14px',
                        background: '#1A1A1A', color: 'white',
                        padding: '4px 10px', borderRadius: '8px',
                        fontSize: '11px', fontWeight: 700,
                      }}>
                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div style={{ padding: '1.1rem' }}>
                    <p style={{ fontSize: '11px', color: '#FF6B9D', fontWeight: 700, marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                      {product.brand}
                    </p>
                    <h3 style={{
                      fontSize: '14px', fontWeight: 600, color: '#1A1A1A',
                      marginBottom: '8px', lineHeight: 1.4,
                      display: '-webkit-box', WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical', overflow: 'hidden',
                    }}>
                      {product.name}
                    </h3>

                    {/* Rating */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px', marginBottom: '12px' }}>
                      <Star size={12} fill="#F39C12" color="#F39C12" />
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#1A1A1A' }}>{product.rating}</span>
                      <span style={{ fontSize: '12px', color: '#AAA' }}>({product.reviews.toLocaleString('es-CO')})</span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <span style={{ fontWeight: 800, fontSize: '17px', color: '#1A1A1A' }}>
                          {formatCOP(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span style={{ fontSize: '13px', color: '#AAA', textDecoration: 'line-through', marginLeft: '6px' }}>
                            {formatCOP(product.originalPrice)}
                          </span>
                        )}
                      </div>
                      <button style={{
                        background: '#1A1A1A', color: 'white',
                        border: 'none', borderRadius: '10px',
                        padding: '9px 14px', fontSize: '12px',
                        fontWeight: 600, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', gap: '5px',
                        transition: 'background 0.18s',
                      }}
                        onMouseEnter={e => (e.currentTarget.style.background = '#FF6B9D')}
                        onMouseLeave={e => (e.currentTarget.style.background = '#1A1A1A')}
                        onClick={ev => ev.preventDefault()}
                      >
                        <ShoppingBag size={13} strokeWidth={2} />
                        Agregar
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
