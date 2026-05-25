export default function PromoBar() {
  return (
    <div style={{
      background: '#1A1A1A',
      color: 'white',
      textAlign: 'center',
      padding: '10px 1.5rem',
      fontSize: '13px',
      fontWeight: 500,
      letterSpacing: '0.1px',
    }}>
      <span style={{ opacity: 0.7 }}>🇰🇷</span>
      {' '}Envío gratis en compras mayores a{' '}
      <strong style={{ color: '#FF6B9D' }}>$150.000</strong>
      {' '}·{' '}
      <span style={{ opacity: 0.8 }}>Pago con Nequi, PSE y tarjetas</span>
      {' '}·{' '}
      <strong style={{ color: '#B8E6D9' }}>100% productos originales</strong>
    </div>
  )
}
