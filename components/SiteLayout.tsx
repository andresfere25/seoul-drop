import PromoBar from './PromoBar'
import Navbar from './Navbar'
import Footer from './Footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PromoBar />
      <Navbar />
      <main style={{ minHeight: '70vh', background: '#FAF7F2' }}>{children}</main>
      <Footer />
    </>
  )
}

export function PageHeader({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div style={{ background: '#1A1A1A', padding: 'clamp(2.5rem,5vw,4rem) 1.5rem' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        {eyebrow && (
          <p style={{ fontSize: '12px', color: '#FF6B9D', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '10px' }}>
            {eyebrow}
          </p>
        )}
        <h1 style={{ fontSize: 'clamp(2rem,5vw,3rem)', fontWeight: 900, color: 'white', letterSpacing: '-2px', lineHeight: 1.05, marginBottom: subtitle ? '12px' : 0 }}>
          {title}
        </h1>
        {subtitle && (
          <p style={{ color: '#999', fontSize: 'clamp(0.95rem,2vw,1.1rem)', lineHeight: 1.6, maxWidth: '600px' }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  )
}
