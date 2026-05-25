import { Star } from 'lucide-react'

const REVIEWS = [
  {
    name: 'Valentina Rojas',
    city: 'Bogotá',
    avatar: 'VR',
    color: '#FF6B9D',
    product: 'COSRX Snail Mucin Essence',
    rating: 5,
    text: 'No podía creer que llegó sellado y con el empaque original de Olive Young. El sérum es exactamente como lo describen en TikTok. Mi piel nunca había estado tan hidratada. ¡Ya pedí el segundo!',
  },
  {
    name: 'Santiago Méndez',
    city: 'Medellín',
    avatar: 'SM',
    color: '#9B59B6',
    product: 'BTS Proof Album',
    rating: 5,
    text: 'Compré el álbum de BTS para el cumpleaños de mi hermana y quedó llorando de felicidad. El álbum llegó en perfectas condiciones, con la photocard de Jin que ella quería. 100% recomendado.',
  },
  {
    name: 'Luisa Fernanda Castro',
    city: 'Cali',
    avatar: 'LC',
    color: '#4ECDC4',
    product: 'Buldak Ramen Pack',
    rating: 5,
    text: 'Los Buldak llegaron en tiempo récord y bien embalados. El precio es mejor que lo que venden en otros lados. Ya los pedí tres veces este mes. El carbonara es mi favorito.',
  },
  {
    name: 'Andrés Felipe Torres',
    city: 'Barranquilla',
    avatar: 'AT',
    color: '#F39C12',
    product: 'Artbox Washi Tape Set',
    rating: 5,
    text: 'Soy bullet journalist y los washi tapes de Artbox no los consigo en ningún almacén de Colombia. Con Seoul Drop llegaron exactamente como los de las fotos. Ya tengo mi colección completa.',
  },
  {
    name: 'Mariana Ospina',
    city: 'Pereira',
    avatar: 'MO',
    color: '#2ECC71',
    product: 'Beauty of Joseon Serum',
    rating: 5,
    text: 'El sérum de Beauty of Joseon me lo recomendó una dermatóloga. Pensé que iba a ser difícil conseguirlo en Colombia pero Seoul Drop lo tiene. Llegó rápido y original. Mi piel está cambiada.',
  },
  {
    name: 'Camila Jiménez',
    city: 'Bucaramanga',
    avatar: 'CJ',
    color: '#E74C3C',
    product: 'NewJeans Get Up Album',
    rating: 5,
    text: 'Pensé que nunca iba a conseguir el álbum Bunny Beach Bag de NewJeans en Colombia. Seoul Drop lo importó directo. Llegó con la bolsa, la photocard de Hanni y todo. Increíble.',
  },
]

export default function Testimonials() {
  return (
    <section style={{ padding: 'clamp(3rem,6vw,5rem) 1.5rem', background: '#FAF7F2' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontSize: '12px', color: '#FF6B9D', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '12px' }}>
            Testimonios
          </p>
          <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.4rem)', fontWeight: 900, color: '#1A1A1A', letterSpacing: '-1.5px', lineHeight: 1.1 }}>
            Lo que dicen nuestros clientes
          </h2>
          <p style={{ color: '#888', marginTop: '10px', fontSize: '15px' }}>
            Colombianos que ya reciben Seúl en su puerta
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.25rem',
        }}>
          {REVIEWS.map(({ name, city, avatar, color, product, rating, text }) => (
            <div key={name} style={{
              background: 'white',
              border: '1.5px solid #F0ECE4',
              borderRadius: '20px',
              padding: '1.5rem',
            }}>
              {/* Stars */}
              <div style={{ display: 'flex', gap: '3px', marginBottom: '14px' }}>
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} size={14} fill="#F39C12" color="#F39C12" />
                ))}
              </div>

              {/* Review text */}
              <p style={{ fontSize: '14px', color: '#3A3A3A', lineHeight: 1.65, marginBottom: '16px' }}>
                &ldquo;{text}&rdquo;
              </p>

              {/* Product */}
              <p style={{ fontSize: '12px', color: '#FF6B9D', fontWeight: 600, marginBottom: '14px' }}>
                Compró: {product}
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: 40, height: 40,
                  background: `${color}20`,
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: '13px', color,
                  flexShrink: 0,
                }}>
                  {avatar}
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: 700, color: '#1A1A1A' }}>{name}</p>
                  <p style={{ fontSize: '12px', color: '#888' }}>{city}, Colombia</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
