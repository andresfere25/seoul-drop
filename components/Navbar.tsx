'use client'
import Link from 'next/link'
import { useState } from 'react'
import { ShoppingBag, User, Menu, X, Search } from 'lucide-react'
import { useCart } from '@/lib/cart'

const NAV_LINKS = [
  { href: '/tienda', label: 'Tienda' },
  { href: '/tienda?cat=kbeauty', label: 'K-Beauty' },
  { href: '/tienda?cat=kpop', label: 'K-Pop' },
  { href: '/tienda?cat=snacks', label: 'Snacks' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { count, open } = useCart()

  return (
    <header style={{
      background: 'rgba(250,247,242,0.93)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(26,26,26,0.07)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1.5rem',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>

        {/* Logo */}
        <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
          <div style={{
            width: 36, height: 36,
            background: 'linear-gradient(135deg, #FF6B9D, #E85A8C)',
            borderRadius: '9px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 900, fontSize: '13px', color: 'white', letterSpacing: '-0.5px',
            boxShadow: '0 2px 8px rgba(255,107,157,0.35)',
          }}>SD</div>
          <span style={{ fontWeight: 800, fontSize: '18px', color: '#1A1A1A', letterSpacing: '-0.5px' }}>
            Seoul Drop
          </span>
        </Link>

        {/* Nav desktop */}
        <nav style={{ display: 'flex', gap: '1.75rem', alignItems: 'center' }} className="nav-desktop">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} style={{
              color: '#6B6B6B', textDecoration: 'none',
              fontSize: '14px', fontWeight: 500,
              transition: 'color 0.18s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = '#FF6B9D')}
              onMouseLeave={e => (e.currentTarget.style.color = '#6B6B6B')}
            >{label}</Link>
          ))}
        </nav>

        {/* Acciones */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Link href="/tienda" aria-label="Buscar" style={{
            color: '#6B6B6B', display: 'flex', alignItems: 'center',
            padding: '8px', borderRadius: '8px', textDecoration: 'none',
            transition: 'color 0.18s, background 0.18s',
          }}
            className="icon-btn"
            onMouseEnter={e => { e.currentTarget.style.color = '#FF6B9D'; e.currentTarget.style.background = 'rgba(255,107,157,0.08)' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#6B6B6B'; e.currentTarget.style.background = 'transparent' }}
          >
            <Search size={20} strokeWidth={1.8} />
          </Link>

          <Link href="/cuenta" aria-label="Mi cuenta" style={{
            color: '#6B6B6B', display: 'flex', alignItems: 'center',
            padding: '8px', borderRadius: '8px', textDecoration: 'none',
            transition: 'color 0.18s, background 0.18s',
          }}
            onMouseEnter={e => { e.currentTarget.style.color = '#FF6B9D'; e.currentTarget.style.background = 'rgba(255,107,157,0.08)' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#6B6B6B'; e.currentTarget.style.background = 'transparent' }}
          >
            <User size={20} strokeWidth={1.8} />
          </Link>

          <button onClick={open} aria-label="Abrir carrito" style={{
            position: 'relative',
            background: '#FF6B9D',
            color: 'white',
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '9px 16px',
            borderRadius: '10px',
            border: 'none', cursor: 'pointer',
            fontSize: '14px',
            fontWeight: 600,
            transition: 'opacity 0.18s',
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <ShoppingBag size={16} strokeWidth={2} />
            <span className="btn-label">Carrito</span>
            {count > 0 && (
              <span style={{
                position: 'absolute', top: '-6px', right: '-6px',
                background: '#1A1A1A', color: 'white',
                minWidth: '20px', height: '20px', borderRadius: '100px',
                fontSize: '11px', fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '0 5px', border: '2px solid #FAF7F2',
              }}>
                {count}
              </span>
            )}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menú"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: '#1A1A1A', display: 'none', padding: '8px',
              borderRadius: '8px',
            }}
            className="mobile-menu-btn"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          background: 'rgba(250,247,242,0.98)',
          borderTop: '1px solid rgba(26,26,26,0.07)',
          padding: '1rem 1.5rem 1.5rem',
        }}>
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)} style={{
              display: 'block',
              color: '#1A1A1A',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: 500,
              padding: '12px 0',
              borderBottom: '1px solid rgba(26,26,26,0.06)',
            }}>
              {label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .btn-label { display: none; }
        }
      `}</style>
    </header>
  )
}
