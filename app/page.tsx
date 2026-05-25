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
        <BrandMarquee />
        <LifestyleCarousel />
        <CategoryGrid />
        <FeaturedProducts products={featured} />
        <StorySection />
        <WhySeoulDrop />
        <Testimonials />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}
