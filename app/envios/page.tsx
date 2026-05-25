import { Truck, Clock, MapPin, PackageCheck, Plane } from 'lucide-react'
import SiteLayout, { PageHeader } from '@/components/SiteLayout'

export const metadata = {
  title: 'Envíos y tiempos de entrega — Seoul Drop',
  description: 'Información de envíos de Seoul Drop a todo Colombia.',
}

const CARDS = [
  { Icon: Truck, color: '#FF6B9D', title: 'Cobertura nacional', desc: 'Enviamos a todo Colombia a través de Servientrega, desde Leticia hasta La Guajira.' },
  { Icon: Clock, color: '#4ECDC4', title: 'Productos en stock', desc: 'Despacho en 1-2 días hábiles. Entrega de 2 a 5 días hábiles según tu ciudad.' },
  { Icon: Plane, color: '#9B59B6', title: 'Pedidos especiales', desc: 'Si lo traemos desde Seúl, el tiempo total es de 2 a 4 semanas. Te mantenemos al tanto.' },
  { Icon: PackageCheck, color: '#2ECC71', title: 'Seguimiento en vivo', desc: 'Recibes un número de guía para rastrear tu pedido en tiempo real hasta tu puerta.' },
]

const RATES = [
  { zone: 'Bogotá y ciudades principales', time: '2-3 días hábiles', cost: '$15.000' },
  { zone: 'Ciudades intermedias', time: '3-4 días hábiles', cost: '$15.000' },
  { zone: 'Zonas rurales y especiales', time: '4-7 días hábiles', cost: '$18.000' },
  { zone: 'Compras sobre $150.000', time: 'Según destino', cost: 'GRATIS' },
]

export default function EnviosPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Envíos"
        title="Llevamos Seúl a tu puerta"
        subtitle="Enviamos a todo Colombia con empaque seguro y seguimiento en tiempo real."
      />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(2.5rem,5vw,4rem) 1.5rem' }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
          {CARDS.map(({ Icon, color, title, desc }) => (
            <div key={title} style={{ background: 'white', border: '1.5px solid #F0ECE4', borderRadius: '18px', padding: '1.5rem' }}>
              <Icon size={26} color={color} strokeWidth={1.8} style={{ marginBottom: '1rem' }} />
              <h3 style={{ fontWeight: 800, fontSize: '16px', color: '#1A1A1A', marginBottom: '6px' }}>{title}</h3>
              <p style={{ fontSize: '13.5px', color: '#777', lineHeight: 1.6 }}>{desc}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 'clamp(1.4rem,3vw,1.8rem)', fontWeight: 900, color: '#1A1A1A', letterSpacing: '-1px', marginBottom: '1.25rem' }}>
          Tarifas y tiempos
        </h2>
        <div style={{ background: 'white', border: '1.5px solid #F0ECE4', borderRadius: '18px', overflow: 'hidden' }}>
          {RATES.map((r, i) => (
            <div key={r.zone} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', padding: '1.1rem 1.5rem', borderBottom: i < RATES.length - 1 ? '1px solid #F5F2EC' : 'none', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <MapPin size={16} color="#FF6B9D" />
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 700, color: '#1A1A1A' }}>{r.zone}</p>
                  <p style={{ fontSize: '12px', color: '#999' }}>{r.time}</p>
                </div>
              </div>
              <span style={{ fontSize: '15px', fontWeight: 800, color: r.cost === 'GRATIS' ? '#2ECC71' : '#1A1A1A' }}>{r.cost}</span>
            </div>
          ))}
        </div>

        <p style={{ marginTop: '1.5rem', fontSize: '13px', color: '#999', lineHeight: 1.6 }}>
          * Los tiempos de pedidos especiales dependen de la disponibilidad en Seúl y la fecha del próximo viaje de nuestro equipo. Siempre confirmamos el tiempo estimado antes de procesar tu pedido.
        </p>
      </div>
    </SiteLayout>
  )
}
