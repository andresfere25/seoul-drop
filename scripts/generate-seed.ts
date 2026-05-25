// Genera supabase/02-seed.sql a partir de los productos en lib/data.ts
// Uso: npx tsx scripts/generate-seed.ts
import { PRODUCTS } from '../lib/data'
import { writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Dollar-quoting evita problemas con apóstrofes/acentos del español
function dq(v: string | undefined | null): string {
  if (v == null) return 'NULL'
  return `$txt$${v}$txt$`
}
function arr(items: string[]): string {
  if (!items || items.length === 0) return `'{}'`
  const inner = items.map(t => `"${t.replace(/"/g, '\\"')}"`).join(',')
  return `'{${inner}}'`
}
function num(v: number | undefined | null): string {
  return v == null ? 'NULL' : String(v)
}
function bool(v: boolean): string {
  return v ? 'true' : 'false'
}

const rows = PRODUCTS.map((p, i) => {
  return `  (${dq(p.id)}, ${dq(p.slug)}, ${dq(p.name)}, ${dq(p.brand)}, ${dq(p.category)}, ` +
    `${num(p.price)}, ${num(p.originalPrice)}, ${dq(p.description)}, ${dq(p.fullDescription)}, ` +
    `${arr(p.badges)}, ${dq(p.badgeColor || null)}, ${num(p.rating)}, ${num(p.reviews)}, ${num(p.stock)}, ` +
    `${arr(p.tags)}, ${dq(p.gradient)}, ${bool(p.featured)}, ${bool(p.new)}, ${i})`
}).join(',\n')

const sql = `-- =====================================================================
-- Seoul Drop · Seed de catálogo (30 productos demo)
-- Generado automáticamente desde lib/data.ts — NO editar a mano.
-- Ejecutar DESPUÉS de 01-catalog.sql en el SQL Editor de Supabase.
-- =====================================================================

insert into public.catalog_products
  (id, slug, name, brand, category, price, original_price, description, full_description,
   badges, badge_color, rating, reviews, stock, tags, gradient, featured, is_new, sort_order)
values
${rows}
on conflict (id) do update set
  slug = excluded.slug,
  name = excluded.name,
  brand = excluded.brand,
  category = excluded.category,
  price = excluded.price,
  original_price = excluded.original_price,
  description = excluded.description,
  full_description = excluded.full_description,
  badges = excluded.badges,
  badge_color = excluded.badge_color,
  rating = excluded.rating,
  reviews = excluded.reviews,
  stock = excluded.stock,
  tags = excluded.tags,
  gradient = excluded.gradient,
  featured = excluded.featured,
  is_new = excluded.is_new,
  sort_order = excluded.sort_order;
`

const outPath = join(__dirname, '..', 'supabase', '02-seed.sql')
mkdirSync(dirname(outPath), { recursive: true })
writeFileSync(outPath, sql, 'utf8')
console.log(`✓ Generado ${outPath} con ${PRODUCTS.length} productos`)
