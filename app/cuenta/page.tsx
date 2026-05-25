import Link from 'next/link'
import { User, Package, Heart, Bell, ArrowRight } from 'lucide-react'
import SiteLayout, { PageHeader } from '@/components/SiteLayout'

export const metadata = {
  title: 'Mi cuenta — Seoul Drop',
  description: 'Tu cuenta de Seoul Drop.',
}

const FEATURES = [
  { Icon: Package, title: 'Historial de pedidos', desc: 'Revisa y rastrea todas tus compras de Corea.' },
  { Icon: Heart, title: 'Lista de deseos', desc: 'Guarda tus productos favoritos para después.' },
  { Icon: Bell, title: 'Alertas de stock', desc: 'Te avisamos cuando vuelva lo que buscas.' },
]

export default function CuentaPage() {
  return (
    <SiteLayout>
      <PageHeader eyebrow="Mi cuenta" title="Tu espacio en Seoul Drop" />
      <div style={{ maxWidth: '700px', margin: '0 auto', padding: 'clamp(2.5rem,5vw,4rem) 1.5rem', textAlign: 'center' }}>
        <div style={{ width: 84, height: 84, borderRadius: '50%', background: 'linear-gradient(135deg,#FFE4F0,#FFCCE4)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
          <User size={38} color="#FF6B9D" strokeWidth={1.6} />
        </div>
        <h2 style={{ fontSize: 'clamp(1.5rem,3.5vw,2rem)', fontWeight: 900, color: '#1A1A1A', letterSpacing: '-1px', marginBottom: '10px' }}>
          Las cuentas llegan pronto
        </h2>
        <p style={{ fontSize: '15px', color: '#777', lineHeight: 1.65, marginBottom: '2.5rem', maxWidth: '460px', margin: '0 auto 2.5rem' }}>
          Estamos preparando tu espacio personal. Por ahora, puedes comprar sin cuenta y coordinar todo por WhatsApp. ¡Muy pronto tendrás todo esto!
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px,1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
          {FEATURES.map(({ Icon, title, desc }) => (
            <div key={title} style={{ background: 'white', border: '1.5px solid #F0ECE4', borderRadius: '16px', padding: '1.5rem' }}>
              <Icon size={24} color="#FF6B9D" strokeWidth={1.7} style={{ marginBottom: '10px' }} />
              <h3 style={{ fontWeight: 700, fontSize: '14px', color: '#1A1A1A', marginBottom: '5px' }}>{title}</h3>
              <p style={{ fontSize: '12.5px', color: '#888', lineHeight: 1.5 }}>{desc}</p>
            </div>
          ))}
        </div>

        <Link href="/tienda" style={{
          display: 'inline-flex', alignItems: 'center', gap: '8px',
          background: 'linear-gradient(135deg,#FF6B9D,#E85A8C)', color: 'white',
          padding: '14px 30px', borderRadius: '12px', fontSize: '15px', fontWeight: 700,
          textDecoration: 'none', boxShadow: '0 4px 18px rgba(255,107,157,0.3)',
        }}>
          Ir a la tienda
          <ArrowRight size={17} strokeWidth={2.2} />
        </Link>
      </div>
    </SiteLayout>
  )
}
