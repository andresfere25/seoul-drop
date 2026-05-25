import PromoBar from '@/components/PromoBar'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import CategoryGrid from '@/components/CategoryGrid'
import FeaturedProducts from '@/components/FeaturedProducts'
import WhySeoulDrop from '@/components/WhySeoulDrop'
import Testimonials from '@/components/Testimonials'
import Newsletter from '@/components/Newsletter'
import Footer from '@/components/Footer'

export default function HomePage() {
  return (
    <>
      <PromoBar />
      <Navbar />
      <main>
        <Hero />
        <CategoryGrid />
        <FeaturedProducts />
        <WhySeoulDrop />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}
