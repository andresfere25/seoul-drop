'use client'
import Link from 'next/link'
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCart, FREE_SHIPPING_THRESHOLD } from '@/lib/cart'
import { formatCOP } from '@/lib/data'
import { getProductImage } from '@/lib/images'
import SmartImage from './SmartImage'

export default function CartDrawer() {
  const { items, isOpen, close, subtotal, shipping, total, updateQty, removeItem, count } = useCart()

  const remaining = FREE_SHIPPING_THRESHOLD - subtotal
  const progress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100)

  return (
    <>
      {/* Overlay */}
      <div
        onClick={close}
        style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(0,0,0,0.45)',
          backdropFilter: 'blur(2px)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 0.3s ease',
        }}
      />

      {/* Panel */}
      <aside style={{
        position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 101,
        width: 'min(420px, 100vw)',
        background: 'white',
        boxShadow: '-10px 0 40px rgba(0,0,0,0.18)',
        transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.32s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem', borderBottom: '1px solid #F0ECE4' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShoppingBag size={20} color="#FF6B9D" strokeWidth={2} />
            <h2 style={{ fontSize: '17px', fontWeight: 800, color: '#1A1A1A', letterSpacing: '-0.3px' }}>
              Tu carrito {count > 0 && <span style={{ color: '#888', fontWeight: 600 }}>({count})</span>}
            </h2>
          </div>
          <button onClick={close} aria-label="Cerrar" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#888', display: 'flex', padding: '4px' }}>
            <X size={22} />
          </button>
        </div>

        {items.length === 0 ? (
          /* Vacío */
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem', textAlign: 'center' }}>
            <div style={{ width: 72, height: 72, borderRadius: '50%', background: '#FAF7F2', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.25rem' }}>
              <ShoppingBag size={30} color="#CCC" strokeWidth={1.5} />
            </div>
            <p style={{ fontSize: '16px', fontWeight: 700, color: '#1A1A1A', marginBottom: '6px' }}>Tu carrito está vacío</p>
            <p style={{ fontSize: '14px', color: '#999', marginBottom: '1.5rem' }}>Agrega productos de Seúl que te encanten</p>
            <Link href="/tienda" onClick={close} style={{ background: '#FF6B9D', color: 'white', padding: '12px 24px', borderRadius: '10px', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>
              Explorar tienda
            </Link>
          </div>
        ) : (
          <>
            {/* Barra de envío gratis */}
            <div style={{ padding: '1rem 1.5rem', background: '#FAF7F2', borderBottom: '1px solid #F0ECE4' }}>
              {shipping === 0 ? (
                <p style={{ fontSize: '13px', fontWeight: 600, color: '#2ECC71' }}>✓ ¡Tienes envío gratis!</p>
              ) : (
                <p style={{ fontSize: '13px', color: '#6B6B6B' }}>
                  Te faltan <strong style={{ color: '#FF6B9D' }}>{formatCOP(remaining)}</strong> para envío gratis
                </p>
              )}
              <div style={{ height: '6px', background: '#E8E4DC', borderRadius: '100px', marginTop: '8px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${progress}%`, background: 'linear-gradient(90deg,#FF6B9D,#E85A8C)', borderRadius: '100px', transition: 'width 0.4s ease' }} />
              </div>
            </div>

            {/* Lista */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1rem 1.5rem' }}>
              {items.map(({ product, qty }, idx) => (
                <div key={product.id} style={{ display: 'flex', gap: '12px', paddingBottom: '1rem', marginBottom: '1rem', borderBottom: '1px solid #F5F2EC' }}>
                  {/* Imagen */}
                  <Link href={`/producto/${product.slug}`} onClick={close} style={{ flexShrink: 0 }}>
                    <div style={{ position: 'relative', width: 72, height: 72, borderRadius: '12px', overflow: 'hidden', background: product.gradient }}>
                      <SmartImage src={getProductImage(product.category, idx)} alt={product.name} />
                    </div>
                  </Link>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '10px', color: '#FF6B9D', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{product.brand}</p>
                    <Link href={`/producto/${product.slug}`} onClick={close} style={{ textDecoration: 'none' }}>
                      <h3 style={{ fontSize: '13px', fontWeight: 600, color: '#1A1A1A', lineHeight: 1.35, marginBottom: '6px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {product.name}
                      </h3>
                    </Link>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      {/* Qty stepper */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0', border: '1px solid #E8E4DC', borderRadius: '8px', overflow: 'hidden' }}>
                        <button onClick={() => updateQty(product.id, qty - 1)} aria-label="Restar" style={qtyBtn}>
                          <Minus size={13} />
                        </button>
                        <span style={{ fontSize: '13px', fontWeight: 700, color: '#1A1A1A', minWidth: '28px', textAlign: 'center' }}>{qty}</span>
                        <button onClick={() => updateQty(product.id, qty + 1)} aria-label="Sumar" disabled={qty >= product.stock} style={{ ...qtyBtn, opacity: qty >= product.stock ? 0.35 : 1 }}>
                          <Plus size={13} />
                        </button>
                      </div>
                      <span style={{ fontSize: '14px', fontWeight: 800, color: '#1A1A1A' }}>{formatCOP(product.price * qty)}</span>
                    </div>
                  </div>

                  {/* Eliminar */}
                  <button onClick={() => removeItem(product.id)} aria-label="Eliminar" style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#CCC', alignSelf: 'flex-start', padding: '2px', display: 'flex' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#E74C3C')}
                    onMouseLeave={e => (e.currentTarget.style.color = '#CCC')}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div style={{ borderTop: '1px solid #F0ECE4', padding: '1.25rem 1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#6B6B6B', marginBottom: '6px' }}>
                <span>Subtotal</span>
                <span style={{ fontWeight: 600, color: '#1A1A1A' }}>{formatCOP(subtotal)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#6B6B6B', marginBottom: '12px' }}>
                <span>Envío</span>
                <span style={{ fontWeight: 600, color: shipping === 0 ? '#2ECC71' : '#1A1A1A' }}>{shipping === 0 ? 'Gratis' : formatCOP(shipping)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '17px', fontWeight: 800, color: '#1A1A1A', marginBottom: '1rem', paddingTop: '12px', borderTop: '1px solid #F5F2EC' }}>
                <span>Total</span>
                <span>{formatCOP(total)}</span>
              </div>
              <Link href="/carrito" onClick={close} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                background: 'linear-gradient(135deg,#FF6B9D,#E85A8C)', color: 'white',
                padding: '15px', borderRadius: '12px', fontSize: '15px', fontWeight: 700,
                textDecoration: 'none', boxShadow: '0 4px 16px rgba(255,107,157,0.3)',
              }}>
                Finalizar compra
                <ArrowRight size={17} strokeWidth={2.2} />
              </Link>
            </div>
          </>
        )}
      </aside>
    </>
  )
}

const qtyBtn: React.CSSProperties = {
  background: 'white', border: 'none', cursor: 'pointer',
  width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: '#1A1A1A',
}
