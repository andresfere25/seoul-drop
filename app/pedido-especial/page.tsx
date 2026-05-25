'use client'
import { useState } from 'react'
import { Send, Sparkles, Search, Plane, PackageCheck } from 'lucide-react'
import SiteLayout, { PageHeader } from '@/components/SiteLayout'

const STEPS = [
  { Icon: Search, title: 'Cuéntanos qué buscas', desc: 'El producto, la marca, el grupo de K-Pop... lo que sea de Corea.' },
  { Icon: Plane, title: 'Lo buscamos en Seúl', desc: 'Nuestro equipo lo ubica en tiendas oficiales y te cotiza.' },
  { Icon: PackageCheck, title: 'Te llega a casa', desc: 'Lo traemos en el próximo viaje y te lo enviamos a todo Colombia.' },
]

export default function PedidoEspecialPage() {
  const [form, setForm] = useState({ nombre: '', producto: '', detalles: '', contacto: '' })

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const msg = `¡Hola Seoul Drop! 🇰🇷 Quiero un *pedido especial*:\n\n👤 Nombre: ${form.nombre}\n🎁 Producto: ${form.producto}\n📝 Detalles: ${form.detalles || '—'}\n📱 Contacto: ${form.contacto}`
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank')
  }

  const input: React.CSSProperties = {
    width: '100%', padding: '13px 16px', borderRadius: '12px',
    border: '1.5px solid #E8E4DC', fontSize: '14px', outline: 'none',
    background: 'white', color: '#1A1A1A', fontFamily: 'inherit',
  }
  const label: React.CSSProperties = { display: 'block', fontSize: '13px', fontWeight: 700, color: '#1A1A1A', marginBottom: '7px' }

  return (
    <SiteLayout>
      <PageHeader
        eyebrow="Pedido especial"
        title="¿No lo encuentras? Lo traemos de Seúl"
        subtitle="Si existe en Corea, te lo conseguimos. Cuéntanos qué buscas y lo traemos en el próximo viaje."
      />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(2.5rem,5vw,4rem) 1.5rem' }}>

        {/* Pasos */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px,1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
          {STEPS.map(({ Icon, title, desc }) => (
            <div key={title} style={{ background: 'white', border: '1.5px solid #F0ECE4', borderRadius: '18px', padding: '1.5rem', textAlign: 'center' }}>
              <div style={{ width: 56, height: 56, background: 'linear-gradient(135deg,#FFE4F0,#FFCCE4)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <Icon size={24} color="#FF6B9D" strokeWidth={1.8} />
              </div>
              <h3 style={{ fontWeight: 800, fontSize: '15px', color: '#1A1A1A', marginBottom: '6px' }}>{title}</h3>
              <p style={{ fontSize: '13px', color: '#777', lineHeight: 1.55 }}>{desc}</p>
            </div>
          ))}
        </div>

        {/* Formulario */}
        <div style={{ background: 'white', border: '1.5px solid #F0ECE4', borderRadius: '22px', padding: 'clamp(1.5rem,4vw,2.5rem)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
            <Sparkles size={22} color="#FF6B9D" />
            <h2 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#1A1A1A', letterSpacing: '-0.5px' }}>Cuéntanos tu pedido</h2>
          </div>

          <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={label}>Tu nombre *</label>
              <input style={input} required value={form.nombre} onChange={e => setForm({ ...form, nombre: e.target.value })} placeholder="Ej: María Gómez" />
            </div>
            <div>
              <label style={label}>¿Qué producto quieres? *</label>
              <input style={input} required value={form.producto} onChange={e => setForm({ ...form, producto: e.target.value })} placeholder="Ej: Álbum de SEVENTEEN, crema X, snack Y..." />
            </div>
            <div>
              <label style={label}>Detalles adicionales</label>
              <textarea style={{ ...input, minHeight: '90px', resize: 'vertical' }} value={form.detalles} onChange={e => setForm({ ...form, detalles: e.target.value })} placeholder="Versión, color, tamaño, cantidad, presupuesto..." />
            </div>
            <div>
              <label style={label}>Tu WhatsApp o correo *</label>
              <input style={input} required value={form.contacto} onChange={e => setForm({ ...form, contacto: e.target.value })} placeholder="Ej: 300 123 4567" />
            </div>
            <button type="submit" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              background: 'linear-gradient(135deg,#FF6B9D,#E85A8C)', color: 'white', border: 'none',
              padding: '15px', borderRadius: '12px', fontSize: '15px', fontWeight: 700, cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(255,107,157,0.3)',
            }}>
              <Send size={17} strokeWidth={2} />
              Enviar pedido por WhatsApp
            </button>
            <p style={{ fontSize: '12px', color: '#AAA', textAlign: 'center' }}>
              Te responderemos con la cotización y el tiempo estimado de entrega.
            </p>
          </form>
        </div>
      </div>
    </SiteLayout>
  )
}
