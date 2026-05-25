import Link from 'next/link'
import { ArrowRight, Plane, Heart, Package, ShieldCheck } from 'lucide-react'
import SiteLayout, { PageHeader } from '@/components/SiteLayout'
import SmartImage from '@/components/SmartImage'
import { img, IMG } from '@/lib/images'

export const metadata = {
  title: 'Sobre Nosotros — Seoul Drop',
  description: 'La historia de Seoul Drop: dos hermanos conectando Corea y Colombia.',
}

const VALUES = [
  { Icon: Plane, color: '#FF6B9D', bg: 'linear-gradient(135deg,#FFE4F0,#FFCCE4)', title: 'Compra en persona', desc: 'Nada de catálogos ni intermediarios. Vamos a la tienda, lo tocamos, lo compramos.' },
  { Icon: ShieldCheck, color: '#2ECC71', bg: 'linear-gradient(135deg,#D4F5E4,#A8E6C0)', title: 'Originalidad real', desc: 'Cada producto con su sello, lote y fecha. Si no es original, te devolvemos el dinero.' },
  { Icon: Package, color: '#4ECDC4', bg: 'linear-gradient(135deg,#D4F5EE,#A8E6D8)', title: 'Empaque con cariño', desc: 'Embalamos como si fuera para nosotros. Tu pedido llega impecable a cualquier rincón de Colombia.' },
  { Icon: Heart, color: '#9B59B6', bg: 'linear-gradient(135deg,#F0E4FF,#DEC0FF)', title: 'Cercanía total', desc: 'Te hablamos por WhatsApp como un amigo. Pedidos especiales, dudas, lo que necesites.' },
]

export default function SobreNosotrosPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Nuestra historia"
        title="Dos hermanos, un océano y el amor por Corea"
        subtitle="Seoul Drop nació de una idea simple: acercar lo mejor de Corea a Colombia, sin réplicas y sin intermediarios."
      />

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(2.5rem,5vw,4rem) 1.5rem' }}>

        {/* Historia con imagen */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px,1fr))', gap: '2.5rem', alignItems: 'center', marginBottom: '4rem' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(1.5rem,3.5vw,2rem)', fontWeight: 900, color: '#1A1A1A', letterSpacing: '-1px', marginBottom: '1rem', lineHeight: 1.15 }}>
              Todo empezó con un encargo
            </h2>
            <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.75, marginBottom: '1rem' }}>
              Uno de nosotros vive en <strong>Seúl</strong>; el otro en <strong>Colombia</strong>. Todo comenzó cuando amigos y conocidos empezaron a pedirnos cremas coreanas, álbumes de K-Pop y esos snacks virales que no se conseguían acá.
            </p>
            <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.75, marginBottom: '1rem' }}>
              Lo que era un favor entre amigos se volvió una misión: <strong>traer Corea a Colombia con productos 100% auténticos</strong>, comprados en persona en las tiendas oficiales de Seúl como Olive Young, Artbox y Synnara.
            </p>
            <p style={{ fontSize: '15px', color: '#555', lineHeight: 1.75 }}>
              Hoy Seoul Drop es ese puente. No vendemos productos: vendemos la experiencia de tener un pedacito de Seúl en tu casa.
            </p>
          </div>
          <div style={{ position: 'relative', height: '360px', borderRadius: '24px', overflow: 'hidden', background: 'linear-gradient(135deg,#FFE4F0,#FFCCE4)', boxShadow: '0 20px 50px rgba(26,26,26,0.14)' }}>
            <SmartImage src={img(IMG.seoul[0], 800)} alt="Seúl, Corea del Sur" />
          </div>
        </div>

        {/* Valores */}
        <h2 style={{ fontSize: 'clamp(1.5rem,3.5vw,2rem)', fontWeight: 900, color: '#1A1A1A', letterSpacing: '-1px', marginBottom: '1.75rem', textAlign: 'center' }}>
          Lo que nos hace diferentes
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: '1.25rem', marginBottom: '4rem' }}>
          {VALUES.map(({ Icon, color, bg, title, desc }) => (
            <div key={title} style={{ background: 'white', border: '1.5px solid #F0ECE4', borderRadius: '18px', padding: '1.5rem' }}>
              <div style={{ width: 52, height: 52, background: bg, borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Icon size={24} color={color} strokeWidth={1.8} />
              </div>
              <h3 style={{ fontWeight: 800, fontSize: '16px', color: '#1A1A1A', marginBottom: '6px', letterSpacing: '-0.3px' }}>{title}</h3>
              <p style={{ fontSize: '13.5px', color: '#777', lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div style={{ background: '#1A1A1A', borderRadius: '24px', padding: 'clamp(2rem,4vw,3rem)', display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '2rem', marginBottom: '4rem', textAlign: 'center' }}>
          {[
            { value: '100%', label: 'Productos originales' },
            { value: '5', label: 'Categorías de Corea' },
            { value: 'Seúl', label: 'Compras en persona' },
            { value: 'Colombia', label: 'Envíos nacionales' },
          ].map(({ value, label }) => (
            <div key={label}>
              <div style={{ fontSize: 'clamp(1.6rem,4vw,2.2rem)', fontWeight: 900, color: '#FF6B9D', letterSpacing: '-1px' }}>{value}</div>
              <div style={{ fontSize: '13px', color: '#888', marginTop: '4px' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.4rem,3vw,1.9rem)', fontWeight: 900, color: '#1A1A1A', letterSpacing: '-1px', marginBottom: '1rem' }}>
            ¿Listo para recibir Seúl en tu casa?
          </h2>
          <Link href="/tienda" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'linear-gradient(135deg,#FF6B9D,#E85A8C)', color: 'white',
            padding: '14px 32px', borderRadius: '12px', fontSize: '16px', fontWeight: 700,
            textDecoration: 'none', boxShadow: '0 4px 20px rgba(255,107,157,0.35)',
          }}>
            Explorar la tienda
            <ArrowRight size={18} strokeWidth={2.2} />
          </Link>
        </div>
      </div>
    </SiteLayout>
  )
}
