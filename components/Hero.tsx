'use client'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, MapPin, Truck } from 'lucide-react'

const TRUST_PILLS = [
  { icon: ShieldCheck, label: '100% originales' },
  { icon: MapPin, label: 'Comprados en Seúl' },
  { icon: Truck, label: 'Envíos a todo Colombia' },
]

const BRANDS = ['COSRX', 'Laneige', 'ANUA', 'Artbox', 'Samyang', 'Kakao Friends']

export default function Hero() {
  return (
    <section style={{
      background: 'linear-gradient(160deg, #FAF7F2 0%, #F0EBE0 60%, #FFE8F0 100%)',
      padding: 'clamp(4rem, 8vw, 6rem) 1.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Blobs decorativos */}
      <div style={{
        position: 'absolute', top: '-80px', right: '-80px',
        width: '420px', height: '420px',
        background: 'radial-gradient(circle, rgba(255,107,157,0.18) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-100px', left: '-100px',
        width: '500px', height: '500px',
        background: 'radial-gradient(circle, rgba(184,230,217,0.35) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '40%', left: '55%',
        width: '200px', height: '200px',
        background: 'radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '860px', margin: '0 auto', position: 'relative', textAlign: 'center' }}>

        {/* Badge superior */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'rgba(255,107,157,0.1)',
          border: '1px solid rgba(255,107,157,0.22)',
          borderRadius: '100px',
          padding: '7px 18px',
          fontSize: '13px',
          color: '#FF6B9D',
          fontWeight: 600,
          marginBottom: '2rem',
          letterSpacing: '0.2px',
        }}>
          <span style={{ fontSize: '15px' }}>🇰🇷</span>
          Directo desde Seúl — Productos auténticos garantizados
        </div>

        {/* Titular */}
        <h1 style={{
          fontSize: 'clamp(2.4rem, 6.5vw, 4.2rem)',
          fontWeight: 900,
          lineHeight: 1.08,
          letterSpacing: '-2.5px',
          marginBottom: '1.5rem',
          color: '#1A1A1A',
        }}>
          Lo mejor de Corea,<br />
          <span style={{
            background: 'linear-gradient(135deg, #FF6B9D 0%, #E85A8C 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>llegando a Colombia</span>
        </h1>

        {/* Subtítulo */}
        <p style={{
          fontSize: 'clamp(1rem, 2vw, 1.15rem)',
          color: '#6B6B6B',
          lineHeight: 1.7,
          maxWidth: '560px',
          margin: '0 auto 2.5rem',
          fontWeight: 400,
        }}>
          K-Beauty, K-Pop, Stationery y Snacks comprados
          en tiendas oficiales de Seúl como Olive Young, Artbox y Synnara.
          Cero réplicas. Cero intermediarios.
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem' }}>
          <Link href="/tienda" style={{
            background: 'linear-gradient(135deg, #FF6B9D, #E85A8C)',
            color: 'white',
            padding: '14px 32px',
            borderRadius: '12px',
            fontWeight: 700, fontSize: '16px',
            textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            boxShadow: '0 4px 20px rgba(255,107,157,0.35)',
            transition: 'transform 0.18s, box-shadow 0.18s',
          }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(255,107,157,0.45)' }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,107,157,0.35)' }}
          >
            Ver catálogo completo
            <ArrowRight size={18} strokeWidth={2.2} />
          </Link>

          <Link href="#categorias" style={{
            background: 'white',
            border: '1.5px solid rgba(26,26,26,0.12)',
            color: '#1A1A1A',
            padding: '14px 32px',
            borderRadius: '12px',
            fontWeight: 600, fontSize: '16px',
            textDecoration: 'none',
            transition: 'border-color 0.18s, box-shadow 0.18s',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF6B9D'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,107,157,0.12)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(26,26,26,0.12)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)' }}
          >
            Explorar categorías
          </Link>
        </div>

        {/* Trust pills */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: '1rem',
          flexWrap: 'wrap', marginBottom: '3rem',
        }}>
          {TRUST_PILLS.map(({ icon: Icon, label }) => (
            <div key={label} style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: 'white',
              border: '1px solid rgba(26,26,26,0.08)',
              borderRadius: '100px',
              padding: '7px 16px',
              fontSize: '13px',
              color: '#3A3A3A',
              fontWeight: 500,
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            }}>
              <Icon size={14} color="#FF6B9D" strokeWidth={2} />
              {label}
            </div>
          ))}
        </div>

        {/* Marcas */}
        <div>
          <p style={{ fontSize: '12px', color: '#9B9B9B', marginBottom: '12px', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>
            Marcas que tenemos
          </p>
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            {BRANDS.map(brand => (
              <span key={brand} style={{
                background: 'rgba(26,26,26,0.05)',
                borderRadius: '8px',
                padding: '5px 14px',
                fontSize: '13px',
                fontWeight: 600,
                color: '#6B6B6B',
                letterSpacing: '-0.2px',
              }}>{brand}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
