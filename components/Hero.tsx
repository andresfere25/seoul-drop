import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export default function Hero() {
  return <section className="kaya-hero">
    <img className="kaya-hero-photo" src="https://images.unsplash.com/photo-1538485399081-7191377e8241?auto=format&fit=crop&w=2200&q=90" alt="Seúl, Corea del Sur" fetchPriority="high" />
    <div className="kaya-hero-shade" />
    <div className="kaya-hero-content"><p className="kaya-eyebrow">SEÚL, COREA DEL SUR / COLOMBIA</p><h1>Kaya<span>.</span></h1><p className="kaya-hero-subtitle">Tu ritual. Tu fandom.<br />Tu pequeño universo coreano.</p><Link className="kaya-button" href="/tienda">Explorar la selección <ArrowUpRight size={19} /></Link></div>
    <div className="kaya-hero-caption"><span>01 / UNA NUEVA CONEXIÓN</span><span>Skincare · K-pop · K-dramas</span></div>
  </section>
}
