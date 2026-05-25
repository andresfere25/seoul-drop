'use client'
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import SmartImage from './SmartImage'
import { CAROUSEL_SLIDES } from '@/lib/images'

const GRADIENTS = [
  'linear-gradient(135deg,#FFE4F0,#FFCCE4)',
  'linear-gradient(135deg,#F0E4FF,#DEC0FF)',
  'linear-gradient(135deg,#FFE8CC,#FFD0A0)',
  'linear-gradient(135deg,#D4F5EE,#A8E6D8)',
]

export default function LifestyleCarousel() {
  const [active, setActive] = useState(0)
  const total = CAROUSEL_SLIDES.length

  const go = useCallback((dir: number) => {
    setActive(prev => (prev + dir + total) % total)
  }, [total])

  // Auto-play cada 5s
  useEffect(() => {
    const t = setInterval(() => setActive(prev => (prev + 1) % total), 5000)
    return () => clearInterval(t)
  }, [total])

  return (
    <section style={{ background: '#FAF7F2', padding: 'clamp(2rem,4vw,3.5rem) 1.5rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          position: 'relative',
          borderRadius: '28px',
          overflow: 'hidden',
          height: 'clamp(380px, 52vw, 520px)',
          boxShadow: '0 20px 60px rgba(26,26,26,0.14)',
        }}>
          {CAROUSEL_SLIDES.map((slide, i) => (
            <div key={slide.title} style={{
              position: 'absolute', inset: 0,
              background: GRADIENTS[i % GRADIENTS.length],
              opacity: i === active ? 1 : 0,
              transform: i === active ? 'scale(1)' : 'scale(1.05)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
              pointerEvents: i === active ? 'auto' : 'none',
            }}>
              <SmartImage src={slide.image} alt={slide.title} />
              {/* Overlay degradado para legibilidad */}
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(90deg, rgba(15,15,15,0.78) 0%, rgba(15,15,15,0.45) 45%, rgba(15,15,15,0.05) 100%)',
              }} />

              {/* Contenido */}
              <div style={{
                position: 'absolute', inset: 0,
                display: 'flex', flexDirection: 'column', justifyContent: 'center',
                padding: 'clamp(1.5rem, 5vw, 4rem)',
                maxWidth: '620px',
              }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', width: 'fit-content',
                  background: slide.color, color: 'white',
                  padding: '5px 14px', borderRadius: '100px',
                  fontSize: '12px', fontWeight: 700, letterSpacing: '0.5px',
                  textTransform: 'uppercase', marginBottom: '1rem',
                }}>{slide.tag}</span>

                <h2 style={{
                  fontSize: 'clamp(1.8rem, 4.5vw, 3rem)',
                  fontWeight: 900, color: 'white',
                  letterSpacing: '-1.5px', lineHeight: 1.05,
                  marginBottom: '0.85rem',
                  textShadow: '0 2px 20px rgba(0,0,0,0.3)',
                }}>{slide.title}</h2>

                <p style={{
                  fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
                  color: 'rgba(255,255,255,0.9)',
                  lineHeight: 1.6, marginBottom: '1.75rem',
                  maxWidth: '440px',
                  textShadow: '0 1px 10px rgba(0,0,0,0.3)',
                }}>{slide.subtitle}</p>

                <Link href={slide.href} style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px',
                  width: 'fit-content',
                  background: 'white', color: '#1A1A1A',
                  padding: '13px 26px', borderRadius: '12px',
                  fontSize: '15px', fontWeight: 700, textDecoration: 'none',
                  transition: 'transform 0.18s, box-shadow 0.18s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.25)' }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
                >
                  Ver colección
                  <ArrowRight size={17} strokeWidth={2.2} />
                </Link>
              </div>
            </div>
          ))}

          {/* Flechas */}
          <button onClick={() => go(-1)} aria-label="Anterior" style={arrowStyle('left')}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,1)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.85)')}
          >
            <ChevronLeft size={20} color="#1A1A1A" />
          </button>
          <button onClick={() => go(1)} aria-label="Siguiente" style={arrowStyle('right')}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,1)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.85)')}
          >
            <ChevronRight size={20} color="#1A1A1A" />
          </button>

          {/* Dots */}
          <div style={{
            position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', gap: '8px', zIndex: 5,
          }}>
            {CAROUSEL_SLIDES.map((_, i) => (
              <button key={i} onClick={() => setActive(i)} aria-label={`Slide ${i + 1}`} style={{
                width: i === active ? '28px' : '8px', height: '8px',
                borderRadius: '100px', border: 'none', cursor: 'pointer',
                background: i === active ? 'white' : 'rgba(255,255,255,0.5)',
                transition: 'width 0.3s, background 0.3s',
              }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function arrowStyle(side: 'left' | 'right'): React.CSSProperties {
  return {
    position: 'absolute', top: '50%', transform: 'translateY(-50%)',
    [side]: '16px',
    width: 42, height: 42, borderRadius: '50%',
    background: 'rgba(255,255,255,0.85)', border: 'none', cursor: 'pointer',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 5, transition: 'background 0.18s',
    backdropFilter: 'blur(8px)',
  }
}
