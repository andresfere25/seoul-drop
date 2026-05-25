import { ShieldCheck, Package, MessageCircle, Store } from 'lucide-react'

const FEATURES = [
  {
    icon: Store,
    color: '#FF6B9D',
    bg: 'linear-gradient(135deg,#FFE4F0,#FFCCE4)',
    title: 'Auténtico de Seúl',
    desc: 'Nuestro equipo compra en persona en tiendas oficiales: Olive Young, Synnara, Artbox, Lotte World Mall. Cada producto tiene su historia.',
  },
  {
    icon: Package,
    color: '#4ECDC4',
    bg: 'linear-gradient(135deg,#D4F5EE,#A8E6D8)',
    title: 'Empaque seguro',
    desc: 'Embalamos con burbuja y caja reforzada. Enviamos con Servientrega a todo Colombia con número de seguimiento.',
  },
  {
    icon: MessageCircle,
    color: '#9B59B6',
    bg: 'linear-gradient(135deg,#F0E4FF,#DEC0FF)',
    title: 'Pedidos especiales',
    desc: '¿No encontraste lo que buscas? Escríbenos por WhatsApp antes del próximo viaje a Seúl y lo conseguimos por ti.',
  },
  {
    icon: ShieldCheck,
    color: '#2ECC71',
    bg: 'linear-gradient(135deg,#D4F5E4,#A8E6C0)',
    title: 'Garantía de originalidad',
    desc: 'Si tu producto no es 100% original, te devolvemos el dinero completo sin preguntas. Así de simple y así de seguro.',
  },
]

export default function WhySeoulDrop() {
  return (
    <section style={{ padding: 'clamp(3rem,6vw,5rem) 1.5rem', background: '#1A1A1A' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '12px', color: '#FF6B9D', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
            Por qué elegirnos
          </p>
          <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.4rem)', fontWeight: 900, color: 'white', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
            No vendemos productos.<br />
            <span style={{ color: '#FF6B9D' }}>Vendemos Seúl.</span>
          </h2>
          <p style={{ color: '#888', marginTop: '12px', fontSize: '15px', maxWidth: '440px', margin: '12px auto 0' }}>
            Cada artículo tiene nombre de tienda, dirección y fecha de compra.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '1.5rem',
        }}>
          {FEATURES.map(({ icon: Icon, color, bg, title, desc }) => (
            <div key={title} style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '20px',
              padding: '2rem',
              transition: 'background 0.2s, border-color 0.2s',
            }}>
              <div style={{
                width: 60, height: 60,
                background: bg,
                borderRadius: '16px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1.25rem',
              }}>
                <Icon size={26} color={color} strokeWidth={1.8} />
              </div>
              <h3 style={{ fontWeight: 700, fontSize: '17px', color: 'white', marginBottom: '10px', letterSpacing: '-0.3px' }}>
                {title}
              </h3>
              <p style={{ color: '#888', fontSize: '14px', lineHeight: 1.65 }}>
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* Proof line */}
        <div style={{
          marginTop: '3rem',
          padding: '1.5rem 2rem',
          background: 'rgba(255,107,157,0.08)',
          border: '1px solid rgba(255,107,157,0.2)',
          borderRadius: '16px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          gap: '2rem', flexWrap: 'wrap', textAlign: 'center',
        }}>
          {[
            { value: '30+', label: 'Productos en catálogo' },
            { value: 'Olive Young', label: 'Proveedor oficial' },
            { value: 'Colombia', label: 'Envíos a todo el país' },
            { value: '100%', label: 'Originales garantizados' },
          ].map(({ value, label }) => (
            <div key={label}>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: '#FF6B9D', letterSpacing: '-0.5px' }}>{value}</div>
              <div style={{ fontSize: '12px', color: '#666', marginTop: '3px' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
