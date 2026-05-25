# 🇰🇷 Seoul Drop — Documento de Contexto

> **Propósito:** Este archivo es la memoria viva del proyecto. Se carga automáticamente en cada sesión de Claude Code (vía `CLAUDE.md`). **Revisar al inicio y actualizar al final de cada sesión** para nunca perder contexto.
>
> Última actualización: **2026-05-25**

---

## 1. Qué es Seoul Drop

E-commerce que importa **productos coreanos auténticos** (K-Beauty, K-Pop, papelería, snacks, tech) comprados **en persona en Seúl** y los vende en **Colombia**. Negocio de dos hermanos: uno vive en Seúl (compras/sourcing), otro en Colombia (operación). Diferencial: **originalidad garantizada, sin intermediarios, marca cuidada**.

- **Idioma del sitio:** español (mercado colombiano). Siempre en español.
- **Moneda:** COP (peso colombiano).
- **Inversión inicial contemplada:** $30.000.000 COP para el primer lote.

---

## 2. Enlaces clave

| Qué | Dónde |
|-----|-------|
| Repo GitHub | https://github.com/andresfere25/seoul-drop |
| Producción (Vercel) | https://seoul-drop.vercel.app |
| Supabase (ref) | proyecto `pedwhanukymrktfkpqbh` |
| Repo skills de diseño | https://github.com/andresfere25/andres-design-skills |
| Carpeta de trabajo | `C:\Users\andre\OneDrive\Documentos\GITHUB\seoul-drop` |

**Todo vive en este repo.** (Se consolidó; ya no se usa la antigua carpeta "Proyecto Importación".)

---

## 3. Stack técnico

- **Next.js 16** (App Router, Turbopack) + **React 19** + **TypeScript**
- **Tailwind v4** + estilos inline (la mayoría del UI usa estilos inline con la paleta de marca)
- **Supabase** (Postgres + Auth + Storage) vía `@supabase/ssr` y `@supabase/supabase-js`
- **lucide-react** para iconos SVG (NO emojis como iconos estructurales)
- **motion** instalado (animaciones)
- Deploy: **Vercel** (auto-deploy en cada push a `main`)

### Paleta de marca
`--coral #FF6B9D` · `--coral-dark #E85A8C` · `--cream #FAF7F2` · `--mint #B8E6D9` · `--gold #D4AF37` · `--ink #1A1A1A`

---

## 4. Arquitectura — archivos clave

```
app/
  page.tsx                  Home (server, force-dynamic, fetch getFeatured)
  tienda/page.tsx           Server: fetch getCatalog → <TiendaClient/>
  tienda/TiendaClient.tsx   Client: filtros, búsqueda, orden
  producto/[slug]/page.tsx  Server: await params, getBySlug → <ProductDetail/>
  producto/[slug]/ProductDetail.tsx  Client: detalle + addItem
  carrito/page.tsx          Client: carrito completo + checkout WhatsApp
  admin/page.tsx            Client: gate de auth (login/dashboard/unconfigured)
  admin/AdminLogin.tsx      Login email+password (Supabase Auth)
  admin/AdminDashboard.tsx  CRUD productos + subida de fotos + logout
  sobre-nosotros, ayuda, envios, devoluciones, pedido-especial, cuenta  (páginas de contenido)
components/
  Navbar, Footer, PromoBar, Hero, CategoryGrid, FeaturedProducts,
  WhySeoulDrop, Testimonials, Newsletter, StorySection, BrandMarquee,
  LifestyleCarousel, SmartImage, SiteLayout, FaqAccordion, CartDrawer
lib/
  data.ts        Tipo Product + 30 productos estáticos (FALLBACK) + CATEGORIES + formatCOP
  products.ts    Data layer: getCatalog/getFeatured/getBySlug/getRelated (Supabase + fallback)
  images.ts      Banco de imágenes Unsplash por tema/categoría + helpers
  cart.tsx       CartProvider (Context + localStorage, guarda producto completo)
  supabase/      client.ts (browser), server.ts, types.ts
supabase/
  00-full-schema-reference.sql  Schema completo de referencia (21 tablas, no usado aún)
  01-catalog.sql                Tabla catalog_products + RLS + bucket Storage
  02-seed.sql                   30 productos (generado por scripts/generate-seed.ts)
scripts/generate-seed.ts        Regenera 02-seed.sql desde lib/data.ts
docs/                           PRIVADO (gitignored): investigación, legal, branding, marketing
```

### Patrón clave: data layer con FALLBACK
`lib/products.ts` lee de Supabase (`catalog_products`). Si Supabase no está configurado, la tabla está vacía o falla, **cae automáticamente a los 30 productos estáticos de `lib/data.ts`**. → **La tienda nunca se rompe.** Producción funciona aunque falten variables de entorno.

### Imágenes con degradación elegante
`SmartImage` muestra la imagen; si falla (`onError`), oculta el `<img>` y deja ver el **gradiente de fondo**. Nunca se ve un ícono de imagen rota. Las tarjetas de producto usan `product.image` (foto real subida) o, si no hay, una imagen lifestyle de Unsplash por categoría.

---

## 5. Supabase — base de datos

- **Tabla en uso:** `catalog_products` (mapea 1:1 con el tipo `Product`). Tiene 30 productos seed.
  - RLS: **lectura pública**, **escritura solo autenticados** (admin).
- **Storage:** bucket `product-images` (público) para fotos reales de productos.
- **Auth:** email + password. Usuario admin: `andresfere25@gmail.com`.
- **Variables de entorno** (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`):
  - Local: en `.env.local` (gitignored).
  - Producción: configuradas en Vercel → Settings → Environment Variables.
  - La `anon key` es pública por diseño; lo que protege es el RLS. **No hay service-role key en el repo.**
- El schema grande (`00-full-schema-reference.sql`, 21 tablas: orders, reviews, etc.) **aún no se usa**; queda para el futuro.

---

## 6. Estado actual (qué está HECHO ✅)

1. ✅ **Demo web completo y desplegado** — Home con carrusel, marquee, categorías, productos, testimonios, newsletter; páginas de contenido (sobre-nosotros, ayuda, envíos, devoluciones, pedido-especial, cuenta). Sin 404s.
2. ✅ **Carrito** — drawer + página `/carrito`, persistencia localStorage, checkout que arma pedido por WhatsApp.
3. ✅ **Supabase conectado** — tienda lee de la BD (con fallback), verificado en producción.
4. ✅ **Panel admin** (`/admin`) — login, CRUD de productos, subida de fotos a Storage. Funciona en local y producción.
5. ✅ **Investigación de mercado** — `docs/investigacion-mercado.html` (v1.1): legal SAS+CIIU, INVIMA NSO con costos, catálogo con márgenes, zonas de Seúl, plan de $30M, fases. Privado.

---

## 7. Pendientes / Roadmap

- ⬜ **Validar demanda** antes de importar: redes sociales (Instagram/TikTok) + captar interesados en la web (newsletter aún NO guarda en BD).
- ⬜ **Trámites legales reales** (los hace Andrés): constituir Seoul Drop S.A.S., RUT importador, iniciar NSO INVIMA.
- ⬜ **Primer lote / sourcing** del hermano en Seúl (usar `docs/inventario-template-hermano.csv`).
- ⬜ **Pasarela de pago** (Wompi/Bold) — decisión del usuario: **se hace DESPUÉS de la primera importación.**
- ⬜ (Futuro) Fotos reales de producto, marca registrada (SIC), posible tech con homologación CRC.

---

## 8. Convenciones de trabajo (IMPORTANTE para Claude)

- **Yo (Claude) me encargo de TODOS los commits y push.** El usuario lo pidió explícitamente. Cada cambio significativo: commit descriptivo + `git push origin main` → Vercel redespliega solo.
- **Nunca romper producción.** Mantener el patrón de fallback. Verificar con `npm run build` antes de pushear.
- **`docs/` es privado** (gitignored): material legal, branding, marketing, investigación, playbooks. NO se sube a GitHub. Ahí va info sensible.
- **Verificación visual:** usar el preview en **puerto 3100** (`.claude/launch.json`). Antes de build, matar node y borrar `.next` (OneDrive a veces bloquea archivos → error EPERM).
- **Para previsualizar un HTML de `docs/`:** copiar temporal a `public/_preview-*.html`, ver, y borrarlo.
- **Coautoría en commits:** `Co-Authored-By: Claude <modelo> <noreply@anthropic.com>`.
- **Next.js 16:** `params` en páginas dinámicas es `Promise` → usar `await params` (server) o `use(params)` (client).
- **Idioma:** todo el contenido del sitio y docs en **español**.

---

## 9. Contexto de negocio (resumen del estudio)

- **TLC Colombia–Corea (2016):** muchos productos con 0% arancel (requiere Certificado de Origen coreano).
- **Importación 2025+:** umbral libre bajó a **USD 50** (Decreto 1475/2025) → para $30M se requiere **importación formal** con agencia de aduanas. El "courier de uso personal" NO sirve para escala.
- **INVIMA:** cosméticos requieren **NSO obligatoria** (no expira; una NSO ampara una línea de marca). Microempresa paga solo **25%** de la tarifa.
- **Sociedad:** **S.A.S.** (CIIU principal **4791** internet, secundario **4773** cosméticos). Crear cuesta ~$150k–$250k COP.
- **Márgenes:** sérums K-Beauty y papelería = mejores (55–68%); snacks = gancho/rotación; K-Pop = ticket alto, margen medio; tech = bajo margen + barreras → dejar para después.
- **Zonas Seúl:** Myeongdong (K-Beauty + mayoristas NYUNYU), Dongdaemun (mayorista nocturno), Namdaemun (tradicional/papelería), Olive Young (referencia + rebajas mayo-jun), Artbox/Daiso (papelería), Yongsan (tech).
- **Marcas trending 2026:** Medicube (PDRN), SKIN1004 (Centella), Mixsoon (bean essence).

---

## 10. Bitácora de sesiones

- **2026-05-25** — Sesión fundacional. Construido: web completa + imágenes/carrusel, carrito, Supabase + admin, páginas de contenido, consolidación del repo, investigación de mercado (v1.1) y este CONTEXTO.md. Repo de skills de diseño creado aparte.

> **Para Claude:** al terminar cada sesión, añade una línea aquí con la fecha y lo que se hizo, y actualiza las secciones 6/7 (hecho/pendiente) si cambian.
