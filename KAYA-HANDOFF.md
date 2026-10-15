# Kaya handoff 2026-10-14

Brand confirmed: Kaya. Planned legal entity: KAYA S.A.S.
Founders: Andres, Joan and David, equal thirds. No capital paid yet.
Commercial WhatsApp: +57 320 946 4352.

Current iteration replaces the homepage, category tiles, featured products,
footer and metadata. Default KAYA_CATALOG_MODE is reference with six products,
zero real stock and no reviews. Live mode is explicit and still requires
operational, legal and security validation. Cart is a quotation request.

Global emil-design-eng and impeccable were refreshed from official repositories.
PRODUCT.md and DESIGN.md define brand truth and design constraints.

Admin now denies access unless RPC is_kaya_admin returns true. Migration
supabase/03-admin-access.sql is prepared but NOT applied remotely. Before
granting access review existing policies and insert approved Auth user UUIDs.
Front-end gating alone does not secure the existing remote database.

Existing CRUD supports prices and photos. It does not yet implement explicit
SKU, variants, batch inventory, scheduled promotions, payment orders or audit.
Wompi is recommended but NOT integrated. No bank account has been opened.

Operations update: /admin now opens OperationsPanel after the Auth/RPC gate,
with an option to open the legacy catalogue. /demo-operacion is a public
isolated demonstration; data lasts only during the visit. Migration 04 adds
ops_* products, SKUs, suppliers, stock movements, promotions, requests and
audit. It depends on 03 and is NOT applied to Supabase. Mutations go through
checked RPCs and approval transactions. Promotions are NOT connected to the
public checkout. No AI API integration yet; this is NOT a complete live ERP.
Tests: unit rules, Chrome mobile/desktop, PostgreSQL in-memory with auth and
storage stubs, anon/customer/admin access checks. Remote permissions and
multiuser concurrency still require staging verification.

Build: npm run build. For OneDrive locks use environment variable
KAYA_BUILD_DIR=.next-kaya-review before build/start; do not delete user data.
Local preview: port 3100. Chrome desktop/mobile tested, cart and query filters.
No secrets or private legal documents should be committed.
