'use client'
import Link from 'next/link'
import { Sparkles, Music2, BookOpen, Flame, Headphones } from 'lucide-react'
import { CATEGORIES } from '@/lib/data'

const ICONS = { Sparkles, Music2, BookOpen, Flame, Headphones }

export default function CategoryGrid() {
  return (
    <section id="categorias" style={{ padding: 'clamp(3rem,6vw,5rem) 1.5rem', background: '#FAF7F2' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontSize: '12px', color: '#FF6B9D', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
            Categorías
          </p>
          <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.4rem)', fontWeight: 900, color: '#1A1A1A', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
            Explora por categoría
          </h2>
          <p style={{ color: '#888', marginTop: '10px', fontSize: '15px', maxWidth: '440px', margin: '10px auto 0' }}>
            Todo comprado directamente en las mejores tiendas de Seúl
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.25rem',
        }}>
          {CATEGORIES.map(({ slug, name, icon, desc, count, color, bg }) => {
            const Icon = ICONS[icon as keyof typeof ICONS]
            return (
              <Link key={slug} href={`/tienda?cat=${slug}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '2rem 1.5rem',
                  textAlign: 'center',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  border: '1.5px solid #F0ECE4',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.transform = 'translateY(-5px)'
                    el.style.boxShadow = `0 16px 40px rgba(0,0,0,0.10)`
                    el.style.borderColor = color
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.transform = 'translateY(0)'
                    el.style.boxShadow = 'none'
                    el.style.borderColor = '#F0ECE4'
                  }}
                >
                  <div style={{
                    width: 68, height: 68,
                    background: bg,
                    borderRadius: '18px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                  }}>
                    <Icon size={28} color={color} strokeWidth={1.8} />
                  </div>
                  <h3 style={{ fontWeight: 800, fontSize: '16px', color: '#1A1A1A', marginBottom: '6px', letterSpacing: '-0.3px' }}>
                    {name}
                  </h3>
                  <p style={{ fontSize: '13px', color: '#888', lineHeight: 1.5, marginBottom: '14px' }}>
                    {desc}
                  </p>
                  <span style={{
                    display: 'inline-block',
                    background: `${color}15`,
                    color: color,
                    borderRadius: '100px',
                    padding: '3px 12px',
                    fontSize: '12px',
                    fontWeight: 700,
                  }}>
                    {count} productos
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
