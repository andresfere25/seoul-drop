'use client'
import Link from 'next/link'
import { Camera, Play, MessageCircle, Mail, MapPin } from 'lucide-react'

const SHOP_LINKS = [
  { label: 'K-Beauty', href: '/tienda?cat=kbeauty' },
  { label: 'K-Pop', href: '/tienda?cat=kpop' },
  { label: 'Stationery', href: '/tienda?cat=stationery' },
  { label: 'Snacks', href: '/tienda?cat=snacks' },
  { label: 'Tech', href: '/tienda?cat=tech' },
]

const HELP_LINKS = [
  { label: 'Cómo comprar', href: '/ayuda' },
  { label: 'Envíos y tiempos', href: '/envios' },
  { label: 'Devoluciones', href: '/devoluciones' },
  { label: 'Pedido especial', href: '/pedido-especial' },
]

const SOCIAL = [
  { Icon: Camera, label: 'Instagram', href: '#' },
  { Icon: Play, label: 'TikTok', href: '#' },
  { Icon: MessageCircle, label: 'WhatsApp', href: '#' },
]

function FooterLink({ label, href }: { label: string; href: string }) {
  return (
    <div style={{ marginBottom: '8px' }}>
      <Link href={href} style={{ color: '#888', textDecoration: 'none', fontSize: '13px', transition: 'color 0.18s' }}
        onMouseEnter={e => (e.currentTarget.style.color = '#FF6B9D')}
        onMouseLeave={e => (e.currentTarget.style.color = '#888')}
      >
        {label}
      </Link>
    </div>
  )
}

export default function Footer() {
  return (
    <footer style={{ background: '#111111', color: '#6B6B6B', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3.5rem 1.5rem 2rem' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '2.5rem',
          marginBottom: '3.5rem',
        }}>

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '9px', marginBottom: '1.25rem' }}>
              <div style={{
                width: 34, height: 34,
                background: 'linear-gradient(135deg, #FF6B9D, #E85A8C)',
                borderRadius: '9px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 900, fontSize: '12px', color: 'white',
                boxShadow: '0 2px 8px rgba(255,107,157,0.3)',
              }}>SD</div>
              <span style={{ fontWeight: 800, color: 'white', fontSize: '17px', letterSpacing: '-0.5px' }}>Seoul Drop</span>
            </div>
            <p style={{ fontSize: '13px', lineHeight: 1.65, maxWidth: '220px' }}>
              Productos coreanos auténticos comprados directamente en Seúl, llegando a toda Colombia.
            </p>
            <div style={{ display: 'flex', gap: '10px', marginTop: '1.25rem' }}>
              {SOCIAL.map(({ Icon, label, href }) => (
                <a key={label} href={href} aria-label={label} style={{
                  width: 36, height: 36,
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: '10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#888', textDecoration: 'none',
                  transition: 'color 0.18s, background 0.18s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#FF6B9D'; e.currentTarget.style.background = 'rgba(255,107,157,0.12)' }}
                  onMouseLeave={e => { e.currentTarget.style.color = '#888'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)' }}
                >
                  <Icon size={16} strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>

          {/* Tienda */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, marginBottom: '1.25rem', fontSize: '14px', letterSpacing: '-0.2px' }}>Tienda</h4>
            {SHOP_LINKS.map(link => <FooterLink key={link.label} {...link} />)}
          </div>

          {/* Ayuda */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, marginBottom: '1.25rem', fontSize: '14px', letterSpacing: '-0.2px' }}>Ayuda</h4>
            {HELP_LINKS.map(link => <FooterLink key={link.label} {...link} />)}
          </div>

          {/* Contacto */}
          <div>
            <h4 style={{ color: 'white', fontWeight: 700, marginBottom: '1.25rem', fontSize: '14px', letterSpacing: '-0.2px' }}>Contacto</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <a href="#" style={{ display: 'flex', alignItems: 'center', gap: '9px', color: '#888', textDecoration: 'none', fontSize: '13px', transition: 'color 0.18s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#FF6B9D')}
                onMouseLeave={e => (e.currentTarget.style.color = '#888')}
              >
                <MessageCircle size={14} strokeWidth={1.8} />
                WhatsApp
              </a>
              <a href="mailto:hola@seouldrop.co" style={{ display: 'flex', alignItems: 'center', gap: '9px', color: '#888', textDecoration: 'none', fontSize: '13px', transition: 'color 0.18s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#FF6B9D')}
                onMouseLeave={e => (e.currentTarget.style.color = '#888')}
              >
                <Mail size={14} strokeWidth={1.8} />
                hola@seouldrop.co
              </a>
              <div style={{ display: 'flex', alignItems: 'center', gap: '9px', fontSize: '13px' }}>
                <MapPin size={14} strokeWidth={1.8} color="#888" />
                Colombia · Seúl
              </div>
            </div>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
        }}>
          <p style={{ fontSize: '12px' }}>© 2026 Seoul Drop S.A.S. — Colombia</p>
          <p style={{ fontSize: '12px' }}>Hecho con amor por dos hermanos y mucho café coreano ☕</p>
        </div>
      </div>
    </footer>
  )
}
