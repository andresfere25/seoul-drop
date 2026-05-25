import PromoBar from '@/components/PromoBar'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import BrandMarquee from '@/components/BrandMarquee'
import LifestyleCarousel from '@/components/LifestyleCarousel'
import CategoryGrid from '@/components/CategoryGrid'
import FeaturedProducts from '@/components/FeaturedProducts'
import StorySection from '@/components/StorySection'
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
        <BrandMarquee />
        <LifestyleCarousel />
        <CategoryGrid />
        <FeaturedProducts />
        <StorySection />
        <WhySeoulDrop />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}
