import Link from 'next/link'
import { Search, ShoppingBag, CreditCard, Truck, MessageCircle } from 'lucide-react'
import SiteLayout, { PageHeader } from '@/components/SiteLayout'
import FaqAccordion, { type Faq } from '@/components/FaqAccordion'

export const metadata = {
  title: 'Cómo comprar y preguntas frecuentes — Seoul Drop',
  description: 'Aprende a comprar en Seoul Drop y resuelve tus dudas.',
}

const STEPS = [
  { Icon: Search, title: '1. Explora', desc: 'Navega el catálogo o busca tu producto coreano favorito por categoría.' },
  { Icon: ShoppingBag, title: '2. Agrega al carrito', desc: 'Elige tus productos y la cantidad. Vemos el total y el envío al instante.' },
  { Icon: CreditCard, title: '3. Finaliza el pedido', desc: 'Confirma por WhatsApp y coordina tu pago con Nequi, PSE o transferencia.' },
  { Icon: Truck, title: '4. Recíbelo', desc: 'Empacamos y enviamos por Servientrega a todo Colombia con seguimiento.' },
]

const FAQS: Faq[] = [
  { q: '¿Los productos son originales?', a: 'Sí, 100%. Compramos en persona en tiendas oficiales de Seúl como Olive Young, Artbox y Synnara. Cada producto conserva su sello, lote y empaque original. Si recibes algo que no sea original, te devolvemos el dinero completo.' },
  { q: '¿Cómo pago mi pedido?', a: 'Por ahora coordinamos el pago por WhatsApp con Nequi, PSE o transferencia bancaria. Muy pronto habilitaremos pago con tarjeta directamente en la web mediante Wompi.' },
  { q: '¿Cuánto demora el envío?', a: 'Si el producto está en stock en Colombia, despachamos en 1-2 días hábiles y llega en 2-5 días según tu ciudad. Para pedidos especiales que traemos desde Seúl, el tiempo es de 2 a 4 semanas.' },
  { q: '¿Hacen envíos a toda Colombia?', a: 'Sí, llegamos a todo el país a través de Servientrega. Recibes un número de guía para hacer seguimiento en tiempo real.' },
  { q: '¿El envío tiene costo?', a: 'El envío es gratis en compras superiores a $150.000. Para pedidos menores, el costo es de $15.000 a cualquier parte de Colombia.' },
  { q: '¿Puedo pedir algo que no esté en el catálogo?', a: '¡Claro! Es una de nuestras especialidades. Escríbenos por WhatsApp o usa nuestra página de Pedido Especial y lo conseguimos en el próximo viaje a Seúl.' },
  { q: '¿Puedo devolver un producto?', a: 'Aceptamos devoluciones de productos sellados y sin abrir dentro de los 5 días tras recibirlos. Los productos de skincare y snacks, por higiene, solo se devuelven si llegan defectuosos o no son originales.' },
]

export default function AyudaPage() {
  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Centro de ayuda"
        title="Cómo comprar en Seoul Drop"
        subtitle="Comprar productos coreanos auténticos nunca fue tan fácil. Te explicamos paso a paso."
      />

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(2.5rem,5vw,4rem) 1.5rem' }}>

        {/* Pasos */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px,1fr))', gap: '1.25rem', marginBottom: '4rem' }}>
          {STEPS.map(({ Icon, title, desc }) => (
            <div key={title} style={{ background: 'white', border: '1.5px solid #F0ECE4', borderRadius: '18px', padding: '1.5rem' }}>
              <div style={{ width: 48, height: 48, background: 'rgba(255,107,157,0.1)', borderRadius: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                <Icon size={22} color="#FF6B9D" strokeWidth={1.8} />
              </div>
              <h3 style={{ fontWeight: 800, fontSize: '15px', color: '#1A1A1A', marginBottom: '6px' }}>{title}</h3>
              <p style={{ fontSize: '13px', color: '#777', lineHeight: 1.55 }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <h2 style={{ fontSize: 'clamp(1.5rem,3.5vw,2rem)', fontWeight: 900, color: '#1A1A1A', letterSpacing: '-1px', marginBottom: '1.5rem' }}>
          Preguntas frecuentes
        </h2>
        <FaqAccordion items={FAQS} />

        {/* Contacto */}
        <div style={{ marginTop: '3rem', background: 'linear-gradient(135deg,#FF6B9D,#E85A8C)', borderRadius: '20px', padding: 'clamp(2rem,4vw,2.5rem)', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 900, color: 'white', letterSpacing: '-0.5px', marginBottom: '8px' }}>
            ¿Aún tienes dudas?
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px', marginBottom: '1.5rem' }}>
            Escríbenos por WhatsApp y te respondemos como un amigo.
          </p>
          <a href="#" style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'white', color: '#1A1A1A', padding: '13px 28px', borderRadius: '12px',
            fontSize: '15px', fontWeight: 700, textDecoration: 'none',
          }}>
            <MessageCircle size={17} strokeWidth={2} />
            Hablar por WhatsApp
          </a>
        </div>
      </div>
    </SiteLayout>
  )
}
