'use client'
import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'

export default function Newsletter() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email.includes('@')) {
      setSent(true)
      setEmail('')
    }
  }

  return (
    <section style={{
      padding: 'clamp(3rem,6vw,5rem) 1.5rem',
      background: 'linear-gradient(135deg, #FF6B9D 0%, #E85A8C 100%)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decoración */}
      <div style={{
        position: 'absolute', top: '-60px', right: '-60px',
        width: '300px', height: '300px',
        background: 'rgba(255,255,255,0.08)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: '-80px', left: '-40px',
        width: '250px', height: '250px',
        background: 'rgba(255,255,255,0.06)',
        borderRadius: '50%', pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '580px', margin: '0 auto', textAlign: 'center', position: 'relative' }}>
        <span style={{ fontSize: '2.5rem', display: 'block', marginBottom: '1.25rem' }}>🇰🇷</span>
        <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.4rem)', fontWeight: 900, color: 'white', letterSpacing: '-1.5px', lineHeight: 1.1, marginBottom: '1rem' }}>
          Entérate antes que nadie
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: '15px', lineHeight: 1.6, marginBottom: '2rem' }}>
          Suscríbete y recibe los nuevos arrivals de Seúl, descuentos exclusivos
          y notificaciones cuando lleguen álbumes nuevos.
        </p>

        {!sent ? (
          <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <input
              type="email"
              placeholder="tu@correo.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{
                flex: '1 1 240px',
                padding: '14px 18px',
                borderRadius: '12px',
                border: 'none',
                fontSize: '15px',
                outline: 'none',
                background: 'rgba(255,255,255,0.95)',
                color: '#1A1A1A',
                minWidth: '200px',
              }}
            />
            <button type="submit" style={{
              background: '#1A1A1A', color: 'white',
              border: 'none', borderRadius: '12px',
              padding: '14px 24px', fontSize: '15px',
              fontWeight: 700, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: '8px',
              transition: 'opacity 0.18s', flexShrink: 0,
            }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              <Send size={16} strokeWidth={2} />
              Suscribirme
            </button>
          </form>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: 'white', fontSize: '16px', fontWeight: 600 }}>
            <CheckCircle size={22} strokeWidth={2} />
            ¡Listo! Te avisamos cuando lleguen novedades de Seúl.
          </div>
        )}

        <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '12px', marginTop: '14px' }}>
          Sin spam. Puedes cancelar cuando quieras.
        </p>
      </div>
    </section>
  )
}
