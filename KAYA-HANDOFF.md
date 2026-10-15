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

Build: npm run build. For OneDrive locks use environment variable
KAYA_BUILD_DIR=.next-kaya-review before build/start; do not delete user data.
Local preview: port 3100. Chrome desktop/mobile tested, cart and query filters.
No secrets or private legal documents should be committed.
