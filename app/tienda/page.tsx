import { getCatalog } from '@/lib/products'
import TiendaClient from './TiendaClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Tienda — Kaya',
  description: 'Seleccion de referencia de skincare y K-pop de Kaya.',
}

export default async function TiendaPage({ searchParams }: { searchParams: Promise<{ cat?: string }> }) {
  const products = await getCatalog()
  const { cat } = await searchParams
  return <TiendaClient products={products} initialCategory={cat} />
}
