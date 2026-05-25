// =====================================================================
// Data layer del catálogo — Supabase con fallback automático a estático.
// Si Supabase no está configurado, la tabla no existe o está vacía,
// usa los 30 productos de lib/data.ts. La tienda NUNCA se rompe.
// =====================================================================
import { createClient } from '@supabase/supabase-js'
import { PRODUCTS as STATIC_PRODUCTS, type Product, type Category } from './data'

type Row = {
  id: string
  slug: string
  name: string
  brand: string
  category: string
  price: number
  original_price: number | null
  description: string | null
  full_description: string | null
  badges: string[] | null
  badge_color: string | null
  rating: number | string | null
  reviews: number | null
  stock: number | null
  tags: string[] | null
  gradient: string | null
  image_url: string | null
  featured: boolean | null
  is_new: boolean | null
}

function getClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key) return null
  try {
    return createClient(url, key)
  } catch {
    return null
  }
}

function mapRow(r: Row): Product {
  return {
    id: r.id,
    slug: r.slug,
    name: r.name,
    brand: r.brand,
    category: r.category as Category,
    price: r.price,
    originalPrice: r.original_price ?? undefined,
    description: r.description ?? '',
    fullDescription: r.full_description ?? '',
    badges: r.badges ?? [],
    badgeColor: r.badge_color ?? '',
    rating: typeof r.rating === 'string' ? parseFloat(r.rating) : (r.rating ?? 0),
    reviews: r.reviews ?? 0,
    stock: r.stock ?? 0,
    tags: r.tags ?? [],
    gradient: r.gradient ?? 'linear-gradient(135deg,#FFE4F0,#FFCCE4)',
    featured: !!r.featured,
    new: !!r.is_new,
    image: r.image_url ?? undefined,
  }
}

/** Devuelve todo el catálogo. Supabase si está disponible, si no, estático. */
export async function getCatalog(): Promise<Product[]> {
  const supabase = getClient()
  if (!supabase) return STATIC_PRODUCTS
  try {
    const { data, error } = await supabase
      .from('catalog_products')
      .select('*')
      .order('sort_order', { ascending: true })
    if (error || !data || data.length === 0) return STATIC_PRODUCTS
    return (data as Row[]).map(mapRow)
  } catch {
    return STATIC_PRODUCTS
  }
}

export async function getFeatured(): Promise<Product[]> {
  const all = await getCatalog()
  const featured = all.filter(p => p.featured)
  return featured.length > 0 ? featured : all.slice(0, 8)
}

export async function getBySlug(slug: string): Promise<Product | undefined> {
  const all = await getCatalog()
  return all.find(p => p.slug === slug)
}

export async function getRelated(product: Product, limit = 4): Promise<Product[]> {
  const all = await getCatalog()
  return all.filter(p => p.category === product.category && p.id !== product.id).slice(0, limit)
}
