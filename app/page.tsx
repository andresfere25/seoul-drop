import PromoBar from '@/components/PromoBar'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import CategoryGrid from '@/components/CategoryGrid'
import FeaturedProducts from '@/components/FeaturedProducts'
import Footer from '@/components/Footer'
import { getFeatured } from '@/lib/products'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const featured = await getFeatured()
  return (
    <>
      <PromoBar />
      <Navbar />
      <main>
        <Hero />
        <CategoryGrid />
        <FeaturedProducts products={featured} />
        <section className="kaya-story"><p className="kaya-eyebrow">DE SEÚL A TU DÍA A DÍA</p><h2>No queremos tenerlo todo.<br />Queremos encontrar lo tuyo.</h2><p>Kaya conecta el cuidado personal y la cultura coreana con una selección pensada para Colombia. Estamos preparando nuestro primer capítulo.</p><a className="kaya-button" href="https://wa.me/573209464352?text=Hola%20Kaya%2C%20quiero%20conocer%20el%20primer%20lanzamiento">Hablemos de tu próximo favorito</a></section>
      </main>
      <Footer />
    </>
  )
}
