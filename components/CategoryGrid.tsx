'use client'
import Link from 'next/link'
import { Sparkles, Music2, BookOpen, Flame, Headphones, ArrowUpRight } from 'lucide-react'
import { CATEGORIES } from '@/lib/data'
import { CATEGORY_IMAGE } from '@/lib/images'
import SmartImage from './SmartImage'

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
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1.25rem',
        }}>
          {CATEGORIES.map(({ slug, name, icon, desc, count, color, bg }) => {
            const Icon = ICONS[icon as keyof typeof ICONS]
            return (
              <Link key={slug} href={`/tienda?cat=${slug}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  position: 'relative',
                  borderRadius: '22px',
                  overflow: 'hidden',
                  height: '280px',
                  cursor: 'pointer',
                  background: bg,
                  transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.transform = 'translateY(-6px)'
                    el.style.boxShadow = '0 20px 44px rgba(0,0,0,0.16)'
                    const im = el.querySelector('img') as HTMLImageElement | null
                    if (im) im.style.transform = 'scale(1.08)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLDivElement
                    el.style.transform = 'translateY(0)'
                    el.style.boxShadow = 'none'
                    const im = el.querySelector('img') as HTMLImageElement | null
                    if (im) im.style.transform = 'scale(1)'
                  }}
                >
                  <SmartImage src={CATEGORY_IMAGE[slug]} alt={name} style={{ transition: 'transform 0.5s ease' }} />

                  {/* Overlay */}
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.35) 55%, rgba(0,0,0,0.78) 100%)' }} />

                  {/* Icono superior */}
                  <div style={{
                    position: 'absolute', top: '16px', left: '16px',
                    width: 44, height: 44, borderRadius: '13px',
                    background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(8px)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2,
                  }}>
                    <Icon size={22} color={color} strokeWidth={2} />
                  </div>

                  <div style={{ position: 'absolute', top: '16px', right: '16px', width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.92)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                    <ArrowUpRight size={18} color="#1A1A1A" strokeWidth={2.2} />
                  </div>

                  {/* Contenido inferior */}
                  <div style={{ position: 'absolute', bottom: '0', left: '0', right: '0', padding: '1.5rem', zIndex: 2 }}>
                    <h3 style={{ fontWeight: 800, fontSize: '20px', color: 'white', marginBottom: '4px', letterSpacing: '-0.5px' }}>
                      {name}
                    </h3>
                    <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.82)', lineHeight: 1.45, marginBottom: '10px' }}>
                      {desc}
                    </p>
                    <span style={{
                      display: 'inline-block', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)',
                      color: 'white', borderRadius: '100px', padding: '3px 12px', fontSize: '12px', fontWeight: 700,
                    }}>
                      {count} productos
                    </span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
