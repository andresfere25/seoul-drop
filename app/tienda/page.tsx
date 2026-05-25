import { getCatalog } from '@/lib/products'
import TiendaClient from './TiendaClient'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Tienda — Seoul Drop',
  description: 'Catálogo completo de productos coreanos: K-Beauty, K-Pop, Stationery, Snacks y Tech.',
}

export default async function TiendaPage() {
  const products = await getCatalog()
  return <TiendaClient products={products} />
}
