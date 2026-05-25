'use client'
import Link from 'next/link'
import { Plus, Minus, Trash2, ShoppingBag, ArrowLeft, ShieldCheck, Truck, MessageCircle, Lock } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import PromoBar from '@/components/PromoBar'
import SmartImage from '@/components/SmartImage'
import { useCart, FREE_SHIPPING_THRESHOLD } from '@/lib/cart'
import { formatCOP } from '@/lib/data'
import { getProductImage } from '@/lib/images'

export default function CarritoPage() {
  const { items, subtotal, shipping, total, count, updateQty, removeItem, clear } = useCart()

  const remaining = FREE_SHIPPING_THRESHOLD - subtotal

  function checkoutWhatsApp() {
    const lines = items.map(i => `• ${i.qty}× ${i.product.name} — ${formatCOP(i.product.price * i.qty)}`).join('\n')
    const msg = `¡Hola Seoul Drop! 🇰🇷 Quiero hacer este pedido:\n\n${lines}\n\nSubtotal: ${formatCOP(subtotal)}\nEnvío: ${shipping === 0 ? 'Gratis' : formatCOP(shipping)}\n*Total: ${formatCOP(total)}*`
    window.open(`https://wa.me/?text=${encodeURIComponent(msg)}`, '_blank')
  }

  return (
    <>
      <PromoBar />
      <Navbar />
      <main style={{ background: '#FAF7F2', minHeight: '80vh' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(1.5rem,3vw,2.5rem) 1.5rem 4rem' }}>

          <Link href="/tienda" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#888', fontSize: '13px', textDecoration: 'none', marginBottom: '1.5rem' }}
            onMouseEnter={e => (e.currentTarget.style.color = '#FF6B9D')}
            onMouseLeave={e => (e.currentTarget.style.color = '#888')}
          >
            <ArrowLeft size={14} />
            Seguir comprando
          </Link>

          <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.6rem)', fontWeight: 900, color: '#1A1A1A', letterSpacing: '-1.5px', marginBottom: '2rem' }}>
            Tu carrito {count > 0 && <span style={{ color: '#888', fontWeight: 600, fontSize: '0.6em' }}>({count} {count === 1 ? 'producto' : 'productos'})</span>}
          </h1>

          {items.length === 0 ? (
            <div style={{ background: 'white', borderRadius: '22px', padding: '4rem 2rem', textAlign: 'center', border: '1.5px solid #F0ECE4' }}>
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#FAF7F2', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                <ShoppingBag size={34} color="#CCC" strokeWidth={1.5} />
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#1A1A1A', marginBottom: '8px' }}>Tu carrito está vacío</h2>
              <p style={{ fontSize: '15px', color: '#999', marginBottom: '1.75rem' }}>Descubre los productos coreanos más buscados en Colombia</p>
              <Link href="/tienda" style={{ background: 'linear-gradient(135deg,#FF6B9D,#E85A8C)', color: 'white', padding: '14px 32px', borderRadius: '12px', fontSize: '15px', fontWeight: 700, textDecoration: 'none', boxShadow: '0 4px 16px rgba(255,107,157,0.3)' }}>
                Explorar tienda
              </Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 360px', gap: '2rem', alignItems: 'start' }} className="cart-grid">

              {/* Lista de items */}
              <div style={{ background: 'white', borderRadius: '22px', border: '1.5px solid #F0ECE4', overflow: 'hidden' }}>
                {items.map(({ product, qty }, idx) => (
                  <div key={product.id} style={{ display: 'flex', gap: '16px', padding: '1.25rem', borderBottom: idx < items.length - 1 ? '1px solid #F5F2EC' : 'none' }}>
                    <Link href={`/producto/${product.slug}`} style={{ flexShrink: 0 }}>
                      <div style={{ position: 'relative', width: 96, height: 96, borderRadius: '14px', overflow: 'hidden', background: product.gradient }}>
                        <SmartImage src={getProductImage(product.category, idx)} alt={product.name} />
                      </div>
                    </Link>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontSize: '11px', color: '#FF6B9D', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '2px' }}>{product.brand}</p>
                      <Link href={`/producto/${product.slug}`} style={{ textDecoration: 'none' }}>
                        <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#1A1A1A', lineHeight: 1.4, marginBottom: '4px' }}>{product.name}</h3>
                      </Link>
                      <p style={{ fontSize: '13px', color: '#999', marginBottom: '12px' }}>{formatCOP(product.price)} c/u</p>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #E8E4DC', borderRadius: '10px', overflow: 'hidden' }}>
                          <button onClick={() => updateQty(product.id, qty - 1)} aria-label="Restar" style={stepBtn}><Minus size={15} /></button>
                          <span style={{ fontSize: '14px', fontWeight: 700, color: '#1A1A1A', minWidth: '34px', textAlign: 'center' }}>{qty}</span>
                          <button onClick={() => updateQty(product.id, qty + 1)} aria-label="Sumar" disabled={qty >= product.stock} style={{ ...stepBtn, opacity: qty >= product.stock ? 0.35 : 1 }}><Plus size={15} /></button>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <span style={{ fontSize: '16px', fontWeight: 800, color: '#1A1A1A' }}>{formatCOP(product.price * qty)}</span>
                          <button onClick={() => removeItem(product.id)} aria-label="Eliminar" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#CCC', display: 'flex', padding: '4px' }}
                            onMouseEnter={e => (e.currentTarget.style.color = '#E74C3C')}
                            onMouseLeave={e => (e.currentTarget.style.color = '#CCC')}
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <div style={{ padding: '1rem 1.25rem', background: '#FAF7F2' }}>
                  <button onClick={clear} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#999', fontSize: '13px', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Trash2 size={14} /> Vaciar carrito
                  </button>
                </div>
              </div>

              {/* Resumen */}
              <div style={{ position: 'sticky', top: '88px' }}>
                <div style={{ background: 'white', borderRadius: '22px', border: '1.5px solid #F0ECE4', padding: '1.5rem' }}>
                  <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#1A1A1A', marginBottom: '1.25rem' }}>Resumen del pedido</h2>

                  {shipping > 0 && (
                    <div style={{ background: '#FFF4F8', borderRadius: '12px', padding: '12px 14px', marginBottom: '1.25rem', fontSize: '13px', color: '#6B6B6B' }}>
                      Agrega <strong style={{ color: '#FF6B9D' }}>{formatCOP(remaining)}</strong> más y tu envío es <strong style={{ color: '#FF6B9D' }}>gratis</strong> 🎉
                    </div>
                  )}

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#6B6B6B', marginBottom: '10px' }}>
                    <span>Subtotal ({count})</span>
                    <span style={{ fontWeight: 600, color: '#1A1A1A' }}>{formatCOP(subtotal)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#6B6B6B', marginBottom: '14px' }}>
                    <span>Envío</span>
                    <span style={{ fontWeight: 600, color: shipping === 0 ? '#2ECC71' : '#1A1A1A' }}>{shipping === 0 ? 'Gratis' : formatCOP(shipping)}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '19px', fontWeight: 900, color: '#1A1A1A', paddingTop: '14px', borderTop: '1px solid #F0ECE4', marginBottom: '1.25rem' }}>
                    <span>Total</span>
                    <span>{formatCOP(total)}</span>
                  </div>

                  <button onClick={checkoutWhatsApp} style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                    background: 'linear-gradient(135deg,#FF6B9D,#E85A8C)', color: 'white', border: 'none',
                    padding: '15px', borderRadius: '12px', fontSize: '15px', fontWeight: 700, cursor: 'pointer',
                    boxShadow: '0 4px 16px rgba(255,107,157,0.3)', marginBottom: '10px',
                  }}>
                    <MessageCircle size={18} strokeWidth={2} />
                    Finalizar por WhatsApp
                  </button>
                  <p style={{ fontSize: '11px', color: '#AAA', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                    <Lock size={11} /> Pago seguro · Nequi, PSE y tarjetas próximamente
                  </p>

                  <div style={{ marginTop: '1.5rem', paddingTop: '1.25rem', borderTop: '1px solid #F5F2EC', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {[
                      { Icon: ShieldCheck, text: '100% productos originales' },
                      { Icon: Truck, text: 'Envío a todo Colombia' },
                    ].map(({ Icon, text }) => (
                      <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '9px', fontSize: '13px', color: '#777' }}>
                        <Icon size={15} color="#4ECDC4" strokeWidth={2} /> {text}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />

      <style>{`
        @media (max-width: 860px) {
          .cart-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  )
}

const stepBtn: React.CSSProperties = {
  background: 'white', border: 'none', cursor: 'pointer',
  width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1A1A1A',
}
