'use client'
import Link from 'next/link'
import { ArrowRight, ShieldCheck, MapPin, Truck, Star } from 'lucide-react'
import SmartImage from './SmartImage'
import { IMG, img } from '@/lib/images'

const TRUST_PILLS = [
  { icon: ShieldCheck, label: '100% originales' },
  { icon: MapPin, label: 'Comprados en Seúl' },
  { icon: Truck, label: 'Envíos a todo Colombia' },
]

export default function Hero() {
  return (
    <section style={{
      background: 'linear-gradient(160deg, #FAF7F2 0%, #F0EBE0 55%, #FFE8F0 100%)',
      padding: 'clamp(3rem, 6vw, 5rem) 1.5rem',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Blobs decorativos */}
      <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '420px', height: '420px', background: 'radial-gradient(circle, rgba(255,107,157,0.16) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '-100px', left: '-100px', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(184,230,217,0.32) 0%, transparent 70%)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div style={{
        maxWidth: '1200px', margin: '0 auto', position: 'relative',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 'clamp(2rem, 5vw, 4rem)', alignItems: 'center',
      }}>

        {/* Columna texto */}
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,107,157,0.1)', border: '1px solid rgba(255,107,157,0.22)',
            borderRadius: '100px', padding: '7px 18px', fontSize: '13px',
            color: '#FF6B9D', fontWeight: 600, marginBottom: '1.75rem', letterSpacing: '0.2px',
          }}>
            <span style={{ fontSize: '15px' }}>🇰🇷</span>
            Directo desde Seúl — Productos auténticos garantizados
          </div>

          <h1 style={{ fontSize: 'clamp(2.3rem, 5.5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.08, letterSpacing: '-2.5px', marginBottom: '1.25rem', color: '#1A1A1A' }}>
            Lo mejor de Corea,<br />
            <span style={{ background: 'linear-gradient(135deg, #FF6B9D 0%, #E85A8C 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              llegando a Colombia
            </span>
          </h1>

          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.12rem)', color: '#6B6B6B', lineHeight: 1.7, maxWidth: '500px', marginBottom: '2rem', fontWeight: 400 }}>
            K-Beauty, K-Pop, Stationery y Snacks comprados en tiendas oficiales de Seúl
            como Olive Young, Artbox y Synnara. Cero réplicas. Cero intermediarios.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '2rem' }}>
            <Link href="/tienda" style={{
              background: 'linear-gradient(135deg, #FF6B9D, #E85A8C)', color: 'white',
              padding: '14px 32px', borderRadius: '12px', fontWeight: 700, fontSize: '16px',
              textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px',
              boxShadow: '0 4px 20px rgba(255,107,157,0.35)', transition: 'transform 0.18s, box-shadow 0.18s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 28px rgba(255,107,157,0.45)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(255,107,157,0.35)' }}
            >
              Ver catálogo completo
              <ArrowRight size={18} strokeWidth={2.2} />
            </Link>
            <Link href="#categorias" style={{
              background: 'white', border: '1.5px solid rgba(26,26,26,0.12)', color: '#1A1A1A',
              padding: '14px 32px', borderRadius: '12px', fontWeight: 600, fontSize: '16px',
              textDecoration: 'none', transition: 'border-color 0.18s, box-shadow 0.18s', boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = '#FF6B9D'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(255,107,157,0.12)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(26,26,26,0.12)'; e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)' }}
            >
              Explorar categorías
            </Link>
          </div>

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {TRUST_PILLS.map(({ icon: Icon, label }) => (
              <div key={label} style={{
                display: 'flex', alignItems: 'center', gap: '6px', background: 'white',
                border: '1px solid rgba(26,26,26,0.08)', borderRadius: '100px', padding: '7px 14px',
                fontSize: '13px', color: '#3A3A3A', fontWeight: 500, boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              }}>
                <Icon size={14} color="#FF6B9D" strokeWidth={2} />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Columna collage de imágenes */}
        <div style={{ position: 'relative', height: 'clamp(360px, 50vw, 480px)' }}>
          {/* Imagen principal */}
          <div style={{
            position: 'absolute', top: '0', right: '0', width: '68%', height: '78%',
            borderRadius: '24px', overflow: 'hidden', background: 'linear-gradient(135deg,#FFE4F0,#FFCCE4)',
            boxShadow: '0 24px 60px rgba(26,26,26,0.18)',
          }}>
            <SmartImage src={img(IMG.beautyModel[1], 800)} alt="Modelo K-Beauty" />
          </div>

          {/* Imagen secundaria (flatlay) */}
          <div style={{
            position: 'absolute', bottom: '0', left: '0', width: '52%', height: '50%',
            borderRadius: '20px', overflow: 'hidden', background: 'linear-gradient(135deg,#D4F5EE,#A8E6D8)',
            boxShadow: '0 18px 44px rgba(26,26,26,0.16)', border: '4px solid #FAF7F2',
          }}>
            <SmartImage src={img(IMG.skincare[3], 600)} alt="Productos de skincare coreano" />
          </div>

          {/* Tarjeta flotante rating */}
          <div style={{
            position: 'absolute', top: '12%', left: '-2%',
            background: 'white', borderRadius: '16px', padding: '12px 16px',
            boxShadow: '0 12px 32px rgba(26,26,26,0.16)', zIndex: 3,
            display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <div style={{ display: 'flex', gap: '1px' }}>
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} fill="#F39C12" color="#F39C12" />)}
            </div>
            <div>
              <p style={{ fontSize: '13px', fontWeight: 800, color: '#1A1A1A', lineHeight: 1.1 }}>+1.200 reseñas</p>
              <p style={{ fontSize: '11px', color: '#999' }}>de clientes felices</p>
            </div>
          </div>

          {/* Pill flotante envío */}
          <div style={{
            position: 'absolute', bottom: '14%', right: '-2%',
            background: '#1A1A1A', color: 'white', borderRadius: '14px', padding: '10px 16px',
            boxShadow: '0 12px 32px rgba(26,26,26,0.2)', zIndex: 3,
          }}>
            <p style={{ fontSize: '12px', fontWeight: 700, lineHeight: 1.2 }}>🚚 Envío gratis</p>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.6)' }}>desde $150.000</p>
          </div>
        </div>
      </div>
    </section>
  )
}
