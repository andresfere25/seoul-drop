import { ShieldCheck, RefreshCw, AlertCircle, CheckCircle2, XCircle } from 'lucide-react'
import SiteLayout, { PageHeader } from '@/components/SiteLayout'

export const metadata = {
  title: 'Devoluciones y garantía — Seoul Drop',
  description: 'Política de devoluciones y garantía de originalidad de Seoul Drop.',
}

const ACCEPT = [
  'Productos sellados y sin abrir, dentro de los 5 días tras recibirlos',
  'Productos defectuosos o dañados durante el envío',
  'Productos que no correspondan a lo que pediste',
  'Cualquier producto que resulte no ser original (garantía total)',
]

const NO_ACCEPT = [
  'Productos de skincare o cosmética ya abiertos o usados (por higiene)',
  'Snacks y alimentos abiertos o consumidos parcialmente',
  'Pedidos especiales personalizados, salvo defecto de fábrica',
  'Productos devueltos después de 5 días sin justificación',
]

export default function DevolucionesPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Devoluciones"
        title="Tu compra, 100% protegida"
        subtitle="Compra con confianza: si algo no está bien, lo resolvemos."
      />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(2.5rem,5vw,4rem) 1.5rem' }}>

        {/* Garantía destacada */}
        <div style={{ background: 'linear-gradient(135deg,#1A1A1A,#2A2A2A)', borderRadius: '22px', padding: 'clamp(2rem,4vw,2.5rem)', marginBottom: '3rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          <div style={{ width: 56, height: 56, background: 'rgba(46,204,113,0.15)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <ShieldCheck size={28} color="#2ECC71" strokeWidth={2} />
          </div>
          <div style={{ flex: 1, minWidth: '240px' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'white', letterSpacing: '-0.5px', marginBottom: '8px' }}>
              Garantía de originalidad
            </h2>
            <p style={{ color: '#aaa', fontSize: '15px', lineHeight: 1.65 }}>
              Si recibes un producto que no sea 100% original, te devolvemos el dinero completo, sin preguntas y sin necesidad de devolverlo. Es nuestra promesa más importante.
            </p>
          </div>
        </div>

        {/* Aceptamos / No aceptamos */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          <div style={{ background: 'white', border: '1.5px solid #F0ECE4', borderRadius: '18px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
              <CheckCircle2 size={22} color="#2ECC71" />
              <h3 style={{ fontWeight: 800, fontSize: '16px', color: '#1A1A1A' }}>Sí aceptamos</h3>
            </div>
            {ACCEPT.map(t => (
              <div key={t} style={{ display: 'flex', gap: '10px', marginBottom: '12px', alignItems: 'flex-start' }}>
                <CheckCircle2 size={16} color="#2ECC71" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '13.5px', color: '#555', lineHeight: 1.55 }}>{t}</span>
              </div>
            ))}
          </div>
          <div style={{ background: 'white', border: '1.5px solid #F0ECE4', borderRadius: '18px', padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.25rem' }}>
              <XCircle size={22} color="#E74C3C" />
              <h3 style={{ fontWeight: 800, fontSize: '16px', color: '#1A1A1A' }}>No aplican</h3>
            </div>
            {NO_ACCEPT.map(t => (
              <div key={t} style={{ display: 'flex', gap: '10px', marginBottom: '12px', alignItems: 'flex-start' }}>
                <XCircle size={16} color="#E74C3C" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '13.5px', color: '#555', lineHeight: 1.55 }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Proceso */}
        <h2 style={{ fontSize: 'clamp(1.4rem,3vw,1.8rem)', fontWeight: 900, color: '#1A1A1A', letterSpacing: '-1px', marginBottom: '1.25rem' }}>
          ¿Cómo solicito una devolución?
        </h2>
        <div style={{ background: 'white', border: '1.5px solid #F0ECE4', borderRadius: '18px', padding: '1.5rem' }}>
          {[
            'Escríbenos por WhatsApp dentro de los 5 días tras recibir tu pedido.',
            'Cuéntanos qué pasó y envíanos una foto del producto.',
            'Coordinamos la recogida o el reembolso según el caso.',
            'Recibes tu dinero o el cambio en máximo 5 días hábiles.',
          ].map((step, i) => (
            <div key={i} style={{ display: 'flex', gap: '14px', marginBottom: i < 3 ? '1rem' : 0, alignItems: 'center' }}>
              <div style={{ width: 30, height: 30, borderRadius: '50%', background: '#FF6B9D', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '13px', flexShrink: 0 }}>{i + 1}</div>
              <span style={{ fontSize: '14px', color: '#555', lineHeight: 1.5 }}>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </SiteLayout>
  )
}
