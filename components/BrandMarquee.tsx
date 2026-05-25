const BRANDS = [
  'COSRX', 'Laneige', 'Beauty of Joseon', 'ANUA', 'Some By Mi',
  'Olive Young', 'Artbox', 'Kakao Friends', 'Samyang', 'Nongshim',
  'HYBE', 'YG', 'JYP', 'Samsung', 'Numbuzin', 'Round Lab',
]

export default function BrandMarquee() {
  // Duplicamos la lista para un scroll infinito sin cortes
  const loop = [...BRANDS, ...BRANDS]

  return (
    <section style={{
      background: '#1A1A1A',
      padding: '1.5rem 0',
      overflow: 'hidden',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div className="marquee-track" style={{
        display: 'flex', alignItems: 'center', gap: '3rem',
        whiteSpace: 'nowrap', width: 'max-content',
      }}>
        {loop.map((brand, i) => (
          <span key={i} style={{
            fontSize: '17px', fontWeight: 700, letterSpacing: '-0.3px',
            color: 'rgba(255,255,255,0.4)', flexShrink: 0,
          }}>
            {brand}
            <span style={{ color: '#FF6B9D', marginLeft: '3rem' }}>✦</span>
          </span>
        ))}
      </div>

      <style>{`
        .marquee-track {
          animation: marquee 38s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>
    </section>
  )
}
