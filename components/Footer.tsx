import Link from 'next/link'
import { ArrowUpRight, MessageCircle } from 'lucide-react'
export default function Footer() {
  return <footer className="kaya-footer"><div><Link href="/" className="kaya-footer-logo">Kaya.</Link><p>Tu conexión con Corea.<br />Desde Colombia, con criterio.</p></div><nav aria-label="Colecciones"><Link href="/tienda?cat=kbeauty">Skincare</Link><Link href="/tienda?cat=kpop">K-pop</Link><Link href="/pedido-especial">K-dramas y encargos</Link></nav><nav aria-label="Información"><Link href="/sobre-nosotros">Nuestra historia</Link><Link href="/ayuda">Preguntas frecuentes</Link><a href="https://wa.me/573209464352"><MessageCircle size={15} /> +57 320 946 4352 <ArrowUpRight size={14} /></a></nav><div className="kaya-footer-bottom"><span>Kaya / Colombia · Seúl</span><span>Primera selección en preparación. Sin pagos en línea por ahora.</span></div></footer>
}
