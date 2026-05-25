import { notFound } from 'next/navigation'
import { getBySlug, getRelated } from '@/lib/products'
import ProductDetail from './ProductDetail'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getBySlug(slug)
  if (!product) return { title: 'Producto no encontrado — Seoul Drop' }
  return {
    title: `${product.name} — Seoul Drop`,
    description: product.description,
  }
}

export default async function ProductoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getBySlug(slug)
  if (!product) notFound()
  const related = await getRelated(product)
  return <ProductDetail product={product} related={related} />
}
