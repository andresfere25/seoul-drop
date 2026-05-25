import SmartImage from './SmartImage'
import { STORY_IMAGES } from '@/lib/images'

const STEPS = [
  {
    num: '01',
    image: STORY_IMAGES.seoul,
    gradient: 'linear-gradient(135deg,#E8F0FF,#C4D8FF)',
    title: 'Seleccionamos en Seúl',
    desc: 'Nuestro equipo visita en persona Olive Young, Artbox, Synnara y los convenience stores para elegir cada producto.',
  },
  {
    num: '02',
    image: STORY_IMAGES.pick,
    gradient: 'linear-gradient(135deg,#FFE4F0,#FFCCE4)',
    title: 'Verificamos originalidad',
    desc: 'Revisamos sellos, lotes y fechas. Solo viajan productos 100% originales con su empaque oficial intacto.',
  },
  {
    num: '03',
    image: STORY_IMAGES.unbox,
    gradient: 'linear-gradient(135deg,#FFE8CC,#FFD0A0)',
    title: 'Llega a tu casa',
    desc: 'Empacamos con cuidado y enviamos por Servientrega a todo Colombia, con número de seguimiento en tiempo real.',
  },
]

export default function StorySection() {
  return (
    <section style={{ padding: 'clamp(3rem,6vw,5rem) 1.5rem', background: 'white' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontSize: '12px', color: '#FF6B9D', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
            Cómo funciona
          </p>
          <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.4rem)', fontWeight: 900, color: '#1A1A1A', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
            De Seúl a tu casa en 3 pasos
          </h2>
          <p style={{ color: '#888', marginTop: '10px', fontSize: '15px', maxWidth: '480px', margin: '10px auto 0' }}>
            Un proceso transparente que puedes seguir en cada etapa
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem',
        }}>
          {STEPS.map(({ num, image, gradient, title, desc }) => (
            <div key={num} style={{
              borderRadius: '22px',
              overflow: 'hidden',
              border: '1.5px solid #F0ECE4',
              background: 'white',
            }}>
              <div style={{ position: 'relative', height: '230px', background: gradient }}>
                <SmartImage src={image} alt={title} />
                <span style={{
                  position: 'absolute', top: '16px', left: '16px',
                  background: 'rgba(255,255,255,0.9)', color: '#1A1A1A',
                  width: 42, height: 42, borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 900, fontSize: '15px',
                  backdropFilter: 'blur(8px)', zIndex: 2,
                }}>{num}</span>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontWeight: 800, fontSize: '18px', color: '#1A1A1A', marginBottom: '8px', letterSpacing: '-0.4px' }}>
                  {title}
                </h3>
                <p style={{ color: '#777', fontSize: '14px', lineHeight: 1.6 }}>
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
