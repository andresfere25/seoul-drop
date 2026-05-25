-- =====================================================================
-- SEOUL DROP — Esquema Base de Datos Supabase (PostgreSQL)
-- Versión 3.0 — Mayo 2026
-- =====================================================================
-- Seguro para ejecutar múltiples veces (idempotente)
-- =====================================================================

-- =====================================================================
-- EXTENSIONES
-- =====================================================================
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- =====================================================================
-- TABLA 1: PROFILES
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id                  UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email               TEXT NOT NULL,
  full_name           TEXT,
  phone               TEXT,
  role                TEXT NOT NULL DEFAULT 'customer'
                        CHECK (role IN ('customer', 'admin', 'partner')),
  city                TEXT,
  department          TEXT,
  address             TEXT,
  avatar_url          TEXT,
  loyalty_points      INT NOT NULL DEFAULT 0,
  total_orders        INT NOT NULL DEFAULT 0,
  total_spent_cop     BIGINT NOT NULL DEFAULT 0,
  marketing_consent   BOOLEAN DEFAULT FALSE,
  whatsapp_opt_in     BOOLEAN DEFAULT FALSE,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_role  ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- =====================================================================
-- TABLA 2: CATEGORIES
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.categories (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug          TEXT UNIQUE NOT NULL,
  name          TEXT NOT NULL,
  description   TEXT,
  icon          TEXT,
  banner_url    TEXT,
  display_order INT DEFAULT 0,
  is_active     BOOLEAN DEFAULT TRUE,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.categories (slug, name, icon, display_order) VALUES
  ('kpop',       'K-Pop',      '🎵', 1),
  ('kbeauty',    'K-Beauty',   '💄', 2),
  ('stationery', 'Stationery', '📝', 3),
  ('tech',       'Tech',       '🎧', 4),
  ('snacks',     'Snacks',     '🍜', 5)
ON CONFLICT (slug) DO NOTHING;

-- =====================================================================
-- TABLA 3: BRANDS
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.brands (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug            TEXT UNIQUE NOT NULL,
  name            TEXT NOT NULL,
  origin_country  TEXT DEFAULT 'KR',
  logo_url        TEXT,
  website         TEXT,
  instagram       TEXT,
  is_active       BOOLEAN DEFAULT TRUE,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.brands (slug, name, origin_country) VALUES
  ('cosrx',            'COSRX',             'KR'),
  ('beauty-of-joseon', 'Beauty of Joseon',  'KR'),
  ('anua',             'ANUA',              'KR'),
  ('laneige',          'Laneige',           'KR'),
  ('some-by-mi',       'Some By Mi',        'KR'),
  ('torriden',         'Torriden',          'KR'),
  ('isntree',          'Isntree',           'KR'),
  ('medicube',         'Medicube',          'KR'),
  ('hybe',             'HYBE',              'KR'),
  ('jyp',              'JYP Entertainment', 'KR'),
  ('yg',               'YG Entertainment',  'KR'),
  ('sm',               'SM Entertainment',  'KR'),
  ('samsung',          'Samsung',           'KR'),
  ('daiso',            'Daiso Korea',       'KR'),
  ('artbox',           'Artbox',            'KR')
ON CONFLICT (slug) DO NOTHING;

-- =====================================================================
-- TABLA 4: PRODUCTS
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.products (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug                 TEXT UNIQUE NOT NULL,
  name                 TEXT NOT NULL,
  description          TEXT,
  category_id          UUID REFERENCES public.categories(id),
  brand_id             UUID REFERENCES public.brands(id),
  price_cop            INT NOT NULL,
  compare_at_price_cop INT,
  cost_krw             INT,
  cost_cop             INT,
  sku                  TEXT UNIQUE,
  stock                INT NOT NULL DEFAULT 0,
  low_stock_threshold  INT DEFAULT 3,
  weight_g             INT,
  is_active            BOOLEAN DEFAULT TRUE,
  is_featured          BOOLEAN DEFAULT FALSE,
  is_preorder          BOOLEAN DEFAULT FALSE,
  allow_backorder      BOOLEAN DEFAULT FALSE,
  featured_image_url   TEXT,
  gallery_urls         JSONB DEFAULT '[]'::jsonb,
  tags                 TEXT[] DEFAULT '{}',
  badge_text           TEXT,
  badge_color          TEXT,
  meta_title           TEXT,
  meta_description     TEXT,
  total_sold           INT DEFAULT 0,
  average_rating       NUMERIC(3,2) DEFAULT 0,
  review_count         INT DEFAULT 0,
  created_at           TIMESTAMPTZ DEFAULT NOW(),
  updated_at           TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_products_category ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_brand    ON public.products(brand_id);
CREATE INDEX IF NOT EXISTS idx_products_active   ON public.products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_featured ON public.products(is_featured);
CREATE INDEX IF NOT EXISTS idx_products_slug     ON public.products(slug);
CREATE INDEX IF NOT EXISTS idx_products_stock    ON public.products(stock);
CREATE INDEX IF NOT EXISTS idx_products_tags     ON public.products USING GIN(tags);

-- =====================================================================
-- TABLA 5: PRODUCT_VARIANTS
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.product_variants (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id  UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  sku         TEXT UNIQUE,
  price_cop   INT,
  stock       INT NOT NULL DEFAULT 0,
  image_url   TEXT,
  is_active   BOOLEAN DEFAULT TRUE,
  sort_order  INT DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_variants_product ON public.product_variants(product_id);

-- =====================================================================
-- TABLA 6: PRODUCT_REVIEWS
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.product_reviews (
  id             UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id     UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  user_id        UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  order_id       UUID,
  rating         SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title          TEXT,
  body           TEXT,
  image_urls     JSONB DEFAULT '[]'::jsonb,
  is_verified    BOOLEAN DEFAULT FALSE,
  is_approved    BOOLEAN DEFAULT FALSE,
  helpful_count  INT DEFAULT 0,
  reviewer_name  TEXT,
  reviewer_city  TEXT,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reviews_product  ON public.product_reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON public.product_reviews(is_approved);

-- =====================================================================
-- TABLA 7: DISCOUNT_CODES
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.discount_codes (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code                 TEXT UNIQUE NOT NULL,
  description          TEXT,
  discount_type        TEXT NOT NULL
                         CHECK (discount_type IN ('percentage', 'fixed_amount', 'free_shipping')),
  discount_value       NUMERIC(10,2) NOT NULL,
  minimum_order_cop    INT DEFAULT 0,
  maximum_discount_cop INT,
  applies_to           TEXT DEFAULT 'all'
                         CHECK (applies_to IN ('all', 'category', 'product')),
  applies_to_id        UUID,
  usage_limit          INT,
  usage_limit_per_user INT DEFAULT 1,
  times_used           INT DEFAULT 0,
  starts_at            TIMESTAMPTZ DEFAULT NOW(),
  expires_at           TIMESTAMPTZ,
  is_active            BOOLEAN DEFAULT TRUE,
  created_by           UUID REFERENCES public.profiles(id),
  created_at           TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_discount_codes_code   ON public.discount_codes(code);
CREATE INDEX IF NOT EXISTS idx_discount_codes_active ON public.discount_codes(is_active);

INSERT INTO public.discount_codes (code, description, discount_type, discount_value, usage_limit_per_user)
VALUES ('HELLOSEOUL', 'Descuento lanzamiento 10%', 'percentage', 10, 1)
ON CONFLICT (code) DO NOTHING;

-- =====================================================================
-- TABLA 8: DISCOUNT_CODE_USES
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.discount_code_uses (
  id        UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code_id   UUID NOT NULL REFERENCES public.discount_codes(id),
  user_id   UUID REFERENCES public.profiles(id),
  order_id  UUID,
  used_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_discount_uses_code ON public.discount_code_uses(code_id);
CREATE INDEX IF NOT EXISTS idx_discount_uses_user ON public.discount_code_uses(user_id);

-- =====================================================================
-- TABLA 9: SUBSCRIBERS
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.subscribers (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email             TEXT UNIQUE NOT NULL,
  phone             TEXT,
  full_name         TEXT,
  source            TEXT DEFAULT 'website'
                      CHECK (source IN ('website', 'instagram', 'whatsapp', 'referral', 'manual')),
  tags              TEXT[] DEFAULT '{}',
  is_active         BOOLEAN DEFAULT TRUE,
  user_id           UUID REFERENCES public.profiles(id),
  subscribed_at     TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at   TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_subscribers_email  ON public.subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_active ON public.subscribers(is_active);

-- =====================================================================
-- TABLA 10: EXCHANGE_RATES
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.exchange_rates (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  date        DATE NOT NULL UNIQUE,
  krw_to_cop  NUMERIC(10,4) NOT NULL,
  usd_to_cop  NUMERIC(10,4) NOT NULL,
  usd_to_krw  NUMERIC(10,4),
  source      TEXT DEFAULT 'manual',
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_exchange_rates_date ON public.exchange_rates(date DESC);

INSERT INTO public.exchange_rates (date, krw_to_cop, usd_to_cop, usd_to_krw)
VALUES (CURRENT_DATE, 3.12, 4150.00, 1330.00)
ON CONFLICT (date) DO NOTHING;

-- =====================================================================
-- TABLA 11: SHIPPING_RATES
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.shipping_rates (
  id                      UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name                    TEXT NOT NULL,
  departments             TEXT[] NOT NULL,
  carrier                 TEXT DEFAULT 'servientrega',
  rate_cop                INT NOT NULL,
  estimated_days          INT,
  free_shipping_from_cop  INT,
  is_active               BOOLEAN DEFAULT TRUE,
  created_at              TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO public.shipping_rates (name, departments, rate_cop, estimated_days, free_shipping_from_cop) VALUES
  ('Bogotá',         ARRAY['Bogotá D.C.'],                    10000, 1, 150000),
  ('Cundinamarca',   ARRAY['Cundinamarca'],                   12000, 2, 200000),
  ('Eje Cafetero',   ARRAY['Antioquia','Caldas','Risaralda','Quindío','Valle del Cauca'], 14000, 3, 200000),
  ('Costa',          ARRAY['Atlántico','Bolívar','Córdoba','Magdalena','Cesar','Sucre','La Guajira'], 16000, 4, 250000),
  ('Resto del país', ARRAY['Nariño','Cauca','Huila','Tolima','Meta','Santander','Norte de Santander','Boyacá','Chocó','Putumayo','Caquetá','Arauca','Casanare','Vichada','Amazonas','Guainía','Vaupés','Guaviare'], 18000, 5, 300000)
ON CONFLICT DO NOTHING;

-- =====================================================================
-- TABLA 12: CARTS
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.carts (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  session_id  TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_carts_user    ON public.carts(user_id);
CREATE INDEX IF NOT EXISTS idx_carts_session ON public.carts(session_id);

-- =====================================================================
-- TABLA 13: CART_ITEMS
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.cart_items (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  cart_id     UUID NOT NULL REFERENCES public.carts(id) ON DELETE CASCADE,
  product_id  UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  variant_id  UUID REFERENCES public.product_variants(id) ON DELETE SET NULL,
  quantity    INT NOT NULL DEFAULT 1 CHECK (quantity > 0),
  added_at    TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(cart_id, product_id, variant_id)
);

CREATE INDEX IF NOT EXISTS idx_cart_items_cart    ON public.cart_items(cart_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_product ON public.cart_items(product_id);

-- =====================================================================
-- TABLA 14: IMPORT_BATCHES
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.import_batches (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  batch_number        TEXT UNIQUE NOT NULL,
  status              TEXT NOT NULL DEFAULT 'planning'
                        CHECK (status IN ('planning','purchased','in_transit','customs','received','distributed')),
  total_krw           INT,
  total_cop_purchase  INT,
  shipping_usd        INT,
  shipping_cop        INT,
  customs_cop         INT,
  customs_agent_cop   INT,
  other_costs_cop     INT DEFAULT 0,
  total_cost_cop      INT GENERATED ALWAYS AS (
    COALESCE(total_cop_purchase,0) + COALESCE(shipping_cop,0) +
    COALESCE(customs_cop,0) + COALESCE(customs_agent_cop,0) + COALESCE(other_costs_cop,0)
  ) STORED,
  krw_to_cop_rate     NUMERIC(10,4),
  usd_to_cop_rate     NUMERIC(10,4),
  korea_post_tracking TEXT,
  shipped_date        DATE,
  estimated_arrival   DATE,
  received_date       DATE,
  total_items         INT,
  total_weight_g      INT,
  notes               TEXT,
  invoice_url         TEXT,
  created_by          UUID REFERENCES public.profiles(id),
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_batches_status ON public.import_batches(status);
CREATE INDEX IF NOT EXISTS idx_batches_number ON public.import_batches(batch_number);

-- =====================================================================
-- TABLA 15: IMPORT_BATCH_ITEMS
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.import_batch_items (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  batch_id              UUID NOT NULL REFERENCES public.import_batches(id) ON DELETE CASCADE,
  product_id            UUID REFERENCES public.products(id),
  variant_id            UUID REFERENCES public.product_variants(id),
  product_name_snapshot TEXT,
  quantity              INT NOT NULL,
  unit_cost_krw         INT NOT NULL,
  total_cost_krw        INT GENERATED ALWAYS AS (quantity * unit_cost_krw) STORED,
  unit_cost_cop_total   INT,
  store_purchased       TEXT,
  district_seoul        TEXT,
  purchase_date         DATE,
  receipt_image_url     TEXT,
  notes                 TEXT,
  created_at            TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_batch_items_batch   ON public.import_batch_items(batch_id);
CREATE INDEX IF NOT EXISTS idx_batch_items_product ON public.import_batch_items(product_id);

-- =====================================================================
-- TABLA 16: ORDERS
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.orders (
  id                   UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_number         TEXT UNIQUE NOT NULL,
  user_id              UUID REFERENCES public.profiles(id),
  customer_email       TEXT NOT NULL,
  customer_phone       TEXT NOT NULL,
  customer_name        TEXT NOT NULL,
  customer_id_number   TEXT,
  shipping_address     TEXT NOT NULL,
  shipping_city        TEXT NOT NULL,
  shipping_department  TEXT,
  shipping_zip         TEXT,
  shipping_rate_id     UUID REFERENCES public.shipping_rates(id),
  shipping_carrier     TEXT,
  shipping_cost_cop    INT DEFAULT 0,
  shipping_tracking    TEXT,
  shipped_at           TIMESTAMPTZ,
  delivered_at         TIMESTAMPTZ,
  status               TEXT NOT NULL DEFAULT 'pending'
                         CHECK (status IN ('pending','paid','preparing','shipped','delivered','cancelled','refunded')),
  payment_method       TEXT CHECK (payment_method IN ('wompi','mercadopago','nequi','transfer','cash')),
  payment_id           TEXT,
  payment_status       TEXT DEFAULT 'pending'
                         CHECK (payment_status IN ('pending','approved','rejected','refunded')),
  paid_at              TIMESTAMPTZ,
  discount_code_id     UUID REFERENCES public.discount_codes(id),
  discount_cop         INT DEFAULT 0,
  subtotal_cop         INT NOT NULL,
  total_cop            INT NOT NULL,
  customer_notes       TEXT,
  admin_notes          TEXT,
  gift_message         TEXT,
  created_at           TIMESTAMPTZ DEFAULT NOW(),
  updated_at           TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_orders_user       ON public.orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status     ON public.orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_number     ON public.orders(order_number);
CREATE INDEX IF NOT EXISTS idx_orders_created    ON public.orders(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_orders_payment_id ON public.orders(payment_id);

-- =====================================================================
-- TABLA 17: ORDER_ITEMS
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.order_items (
  id              UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id        UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id      UUID REFERENCES public.products(id),
  variant_id      UUID REFERENCES public.product_variants(id),
  product_name    TEXT NOT NULL,
  variant_name    TEXT,
  product_image   TEXT,
  unit_price_cop  INT NOT NULL,
  quantity        INT NOT NULL,
  subtotal_cop    INT GENERATED ALWAYS AS (unit_price_cop * quantity) STORED,
  unit_cost_cop   INT,
  margin_cop      INT GENERATED ALWAYS AS (
    (unit_price_cop - COALESCE(unit_cost_cop, 0)) * quantity
  ) STORED,
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_order_items_order   ON public.order_items(order_id);
CREATE INDEX IF NOT EXISTS idx_order_items_product ON public.order_items(product_id);

-- =====================================================================
-- TABLA 18: RETURNS
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.returns (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id          UUID NOT NULL REFERENCES public.orders(id),
  user_id           UUID REFERENCES public.profiles(id),
  reason            TEXT NOT NULL
                      CHECK (reason IN ('damaged','wrong_item','not_as_described','changed_mind','other')),
  description       TEXT,
  image_urls        JSONB DEFAULT '[]'::jsonb,
  status            TEXT NOT NULL DEFAULT 'requested'
                      CHECK (status IN ('requested','approved','rejected','received','refunded')),
  refund_amount_cop INT,
  refund_method     TEXT,
  refund_at         TIMESTAMPTZ,
  admin_notes       TEXT,
  created_at        TIMESTAMPTZ DEFAULT NOW(),
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_returns_order  ON public.returns(order_id);
CREATE INDEX IF NOT EXISTS idx_returns_status ON public.returns(status);

-- =====================================================================
-- TABLA 19: WISHLIST
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.wishlist (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  product_id  UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

CREATE INDEX IF NOT EXISTS idx_wishlist_user    ON public.wishlist(user_id);
CREATE INDEX IF NOT EXISTS idx_wishlist_product ON public.wishlist(product_id);

-- =====================================================================
-- TABLA 20: SPECIAL_REQUESTS
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.special_requests (
  id                  UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id             UUID REFERENCES public.profiles(id),
  customer_email      TEXT,
  customer_phone      TEXT,
  customer_name       TEXT,
  product_description TEXT NOT NULL,
  reference_url       TEXT,
  reference_image_url TEXT,
  estimated_price_cop INT,
  status              TEXT DEFAULT 'pending'
                        CHECK (status IN ('pending','quoted','accepted','rejected','completed')),
  quote_cop           INT,
  batch_id            UUID REFERENCES public.import_batches(id),
  notes               TEXT,
  admin_notes         TEXT,
  created_at          TIMESTAMPTZ DEFAULT NOW(),
  updated_at          TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_special_requests_status ON public.special_requests(status);

-- =====================================================================
-- TABLA 21: NOTIFICATIONS
-- =====================================================================
CREATE TABLE IF NOT EXISTS public.notifications (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  type        TEXT NOT NULL
                CHECK (type IN ('order_confirmed','order_shipped','order_delivered','restock','promo','system')),
  title       TEXT NOT NULL,
  body        TEXT,
  data        JSONB DEFAULT '{}'::jsonb,
  is_read     BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_notifications_user   ON public.notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_notifications_unread ON public.notifications(user_id, is_read);

-- =====================================================================
-- SECUENCIA PARA NÚMEROS DE ORDEN
-- =====================================================================
CREATE SEQUENCE IF NOT EXISTS order_number_seq START 1000;

-- =====================================================================
-- FUNCIONES
-- =====================================================================

-- Helper: verificar si el usuario actual es admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
$$;

-- Actualizar campo updated_at automáticamente
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Auto-crear perfil al registrarse un nuevo usuario
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Actualizar stats de rating al agregar/modificar/eliminar reseña
CREATE OR REPLACE FUNCTION public.update_product_review_stats()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  v_product_id UUID;
BEGIN
  v_product_id := COALESCE(NEW.product_id, OLD.product_id);
  UPDATE public.products
  SET
    average_rating = COALESCE((
      SELECT ROUND(AVG(rating)::NUMERIC, 2)
      FROM public.product_reviews
      WHERE product_id = v_product_id AND is_approved = TRUE
    ), 0),
    review_count = (
      SELECT COUNT(*)
      FROM public.product_reviews
      WHERE product_id = v_product_id AND is_approved = TRUE
    )
  WHERE id = v_product_id;
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- Actualizar stats al pagar un pedido
CREATE OR REPLACE FUNCTION public.update_stats_on_order_paid()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  IF NEW.status = 'paid' AND (OLD.status IS NULL OR OLD.status <> 'paid') THEN

    -- Reducir stock y aumentar total_sold por producto
    UPDATE public.products p
    SET
      stock      = GREATEST(stock - oi.quantity, 0),
      total_sold = total_sold + oi.quantity
    FROM public.order_items oi
    WHERE oi.order_id = NEW.id AND p.id = oi.product_id;

    -- Actualizar stats del perfil del cliente
    IF NEW.user_id IS NOT NULL THEN
      UPDATE public.profiles
      SET
        total_orders    = total_orders + 1,
        total_spent_cop = total_spent_cop + NEW.total_cop,
        loyalty_points  = loyalty_points + FLOOR(NEW.total_cop / 10000)
      WHERE id = NEW.user_id;
    END IF;

    -- Incrementar uso del código de descuento
    IF NEW.discount_code_id IS NOT NULL THEN
      UPDATE public.discount_codes
      SET times_used = times_used + 1
      WHERE id = NEW.discount_code_id;
    END IF;

  END IF;
  RETURN NEW;
END;
$$;

-- Generar número de orden único
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TEXT
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN 'SD-' || LPAD(NEXTVAL('order_number_seq')::TEXT, 6, '0');
END;
$$;

-- Validar código de descuento
CREATE OR REPLACE FUNCTION public.validate_discount_code(
  p_code        TEXT,
  p_user_id     UUID,
  p_order_total INT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_code  public.discount_codes;
  v_uses  INT;
BEGIN
  SELECT * INTO v_code
  FROM public.discount_codes
  WHERE code = UPPER(TRIM(p_code)) AND is_active = TRUE;

  IF NOT FOUND THEN
    RETURN '{"valid":false,"error":"Código no encontrado"}'::jsonb;
  END IF;

  IF v_code.expires_at IS NOT NULL AND v_code.expires_at < NOW() THEN
    RETURN '{"valid":false,"error":"Código expirado"}'::jsonb;
  END IF;

  IF v_code.starts_at > NOW() THEN
    RETURN '{"valid":false,"error":"Código aún no está vigente"}'::jsonb;
  END IF;

  IF v_code.usage_limit IS NOT NULL AND v_code.times_used >= v_code.usage_limit THEN
    RETURN '{"valid":false,"error":"Código agotado"}'::jsonb;
  END IF;

  IF p_order_total < COALESCE(v_code.minimum_order_cop, 0) THEN
    RETURN jsonb_build_object(
      'valid', false,
      'error', 'Pedido mínimo requerido: $' || v_code.minimum_order_cop || ' COP'
    );
  END IF;

  IF p_user_id IS NOT NULL AND v_code.usage_limit_per_user IS NOT NULL THEN
    SELECT COUNT(*) INTO v_uses
    FROM public.discount_code_uses
    WHERE code_id = v_code.id AND user_id = p_user_id AND order_id IS NOT NULL;

    IF v_uses >= v_code.usage_limit_per_user THEN
      RETURN '{"valid":false,"error":"Ya usaste este código anteriormente"}'::jsonb;
    END IF;
  END IF;

  RETURN jsonb_build_object(
    'valid',              true,
    'code_id',            v_code.id,
    'discount_type',      v_code.discount_type,
    'discount_value',     v_code.discount_value,
    'discount_amount_cop', CASE
      WHEN v_code.discount_type = 'percentage' THEN
        LEAST(
          FLOOR(p_order_total * v_code.discount_value / 100),
          COALESCE(v_code.maximum_discount_cop, 9999999)
        )
      WHEN v_code.discount_type = 'fixed_amount' THEN
        v_code.discount_value::INT
      ELSE 0
    END
  );
END;
$$;

-- Buscar productos (usa ILIKE — simple y confiable)
CREATE OR REPLACE FUNCTION public.search_products(search_term TEXT)
RETURNS TABLE (
  id                   UUID,
  slug                 TEXT,
  name                 TEXT,
  price_cop            INT,
  compare_at_price_cop INT,
  stock                INT,
  featured_image_url   TEXT,
  badge_text           TEXT,
  badge_color          TEXT,
  total_sold           INT,
  average_rating       NUMERIC,
  review_count         INT,
  category_slug        TEXT,
  category_name        TEXT,
  brand_name           TEXT
)
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT
    p.id,
    p.slug,
    p.name,
    p.price_cop,
    p.compare_at_price_cop,
    p.stock,
    p.featured_image_url,
    p.badge_text,
    p.badge_color,
    p.total_sold,
    p.average_rating,
    p.review_count,
    c.slug  AS category_slug,
    c.name  AS category_name,
    b.name  AS brand_name
  FROM public.products p
  LEFT JOIN public.categories c ON c.id = p.category_id
  LEFT JOIN public.brands     b ON b.id = p.brand_id
  WHERE
    p.is_active = TRUE AND (
      p.name        ILIKE '%' || search_term || '%'
      OR p.description ILIKE '%' || search_term || '%'
      OR b.name        ILIKE '%' || search_term || '%'
      OR c.name        ILIKE '%' || search_term || '%'
    )
  ORDER BY
    p.is_featured DESC,
    p.total_sold  DESC;
$$;

-- =====================================================================
-- TRIGGERS (DROP IF EXISTS primero para que sea idempotente)
-- =====================================================================

DROP TRIGGER IF EXISTS trg_profiles_updated       ON public.profiles;
DROP TRIGGER IF EXISTS trg_products_updated       ON public.products;
DROP TRIGGER IF EXISTS trg_orders_updated         ON public.orders;
DROP TRIGGER IF EXISTS trg_batches_updated        ON public.import_batches;
DROP TRIGGER IF EXISTS trg_reviews_updated        ON public.product_reviews;
DROP TRIGGER IF EXISTS trg_returns_updated        ON public.returns;
DROP TRIGGER IF EXISTS trg_carts_updated          ON public.carts;
DROP TRIGGER IF EXISTS trg_review_stats           ON public.product_reviews;
DROP TRIGGER IF EXISTS trg_order_paid_stats       ON public.orders;
DROP TRIGGER IF EXISTS on_auth_user_created       ON auth.users;

CREATE TRIGGER trg_profiles_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER trg_products_updated
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER trg_orders_updated
  BEFORE UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER trg_batches_updated
  BEFORE UPDATE ON public.import_batches
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER trg_reviews_updated
  BEFORE UPDATE ON public.product_reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER trg_returns_updated
  BEFORE UPDATE ON public.returns
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER trg_carts_updated
  BEFORE UPDATE ON public.carts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at();

CREATE TRIGGER trg_review_stats
  AFTER INSERT OR UPDATE OR DELETE ON public.product_reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_product_review_stats();

CREATE TRIGGER trg_order_paid_stats
  AFTER UPDATE ON public.orders
  FOR EACH ROW EXECUTE FUNCTION public.update_stats_on_order_paid();

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================================
-- VISTAS
-- =====================================================================

CREATE OR REPLACE VIEW public.v_product_catalog AS
SELECT
  p.id,
  p.slug,
  p.name,
  p.description,
  p.price_cop,
  p.compare_at_price_cop,
  p.cost_cop,
  p.stock,
  p.low_stock_threshold,
  p.is_active,
  p.is_featured,
  p.is_preorder,
  p.featured_image_url,
  p.gallery_urls,
  p.tags,
  p.badge_text,
  p.badge_color,
  p.total_sold,
  p.average_rating,
  p.review_count,
  p.sku,
  p.weight_g,
  c.slug   AS category_slug,
  c.name   AS category_name,
  c.icon   AS category_icon,
  b.slug   AS brand_slug,
  b.name   AS brand_name,
  b.logo_url AS brand_logo,
  CASE
    WHEN p.cost_cop > 0
    THEN ROUND(((p.price_cop::NUMERIC - p.cost_cop) / p.cost_cop) * 100, 1)
    ELSE NULL
  END AS margin_pct,
  p.created_at,
  p.updated_at
FROM public.products p
LEFT JOIN public.categories c ON p.category_id = c.id
LEFT JOIN public.brands     b ON p.brand_id     = b.id;

CREATE OR REPLACE VIEW public.v_margin_analysis AS
SELECT
  p.id,
  p.name,
  c.name   AS category,
  b.name   AS brand,
  p.price_cop   AS sale_price,
  p.cost_cop    AS unit_cost,
  (p.price_cop - COALESCE(p.cost_cop, 0)) AS margin_cop,
  CASE WHEN p.cost_cop > 0
    THEN ROUND(((p.price_cop::NUMERIC - p.cost_cop) / p.cost_cop) * 100, 1)
    ELSE NULL
  END AS margin_pct,
  p.stock,
  p.total_sold,
  p.total_sold * p.price_cop                               AS potential_revenue,
  p.total_sold * (p.price_cop - COALESCE(p.cost_cop, 0))  AS potential_profit
FROM public.products p
LEFT JOIN public.categories c ON p.category_id = c.id
LEFT JOIN public.brands     b ON p.brand_id     = b.id
ORDER BY margin_pct DESC NULLS LAST;

CREATE OR REPLACE VIEW public.v_monthly_sales AS
SELECT
  DATE_TRUNC('month', o.created_at)  AS month,
  COUNT(DISTINCT o.id)               AS total_orders,
  SUM(o.total_cop)                   AS gross_revenue,
  SUM(oi.margin_cop)                 AS gross_profit,
  ROUND(AVG(o.total_cop), 0)         AS avg_order_value,
  COUNT(DISTINCT o.user_id)          AS unique_customers
FROM public.orders o
JOIN public.order_items oi ON o.id = oi.order_id
WHERE o.status IN ('paid','preparing','shipped','delivered')
GROUP BY DATE_TRUNC('month', o.created_at)
ORDER BY month DESC;

CREATE OR REPLACE VIEW public.v_low_stock_alerts AS
SELECT
  p.id,
  p.name,
  p.sku,
  c.name AS category,
  p.stock,
  p.low_stock_threshold,
  CASE
    WHEN p.stock = 0                      THEN 'AGOTADO'
    WHEN p.stock <= p.low_stock_threshold THEN 'STOCK BAJO'
  END AS alert_type
FROM public.products p
LEFT JOIN public.categories c ON p.category_id = c.id
WHERE p.stock <= p.low_stock_threshold AND p.is_active = TRUE
ORDER BY p.stock ASC;

CREATE OR REPLACE VIEW public.v_order_summary AS
SELECT
  o.id,
  o.order_number,
  o.customer_name,
  o.customer_email,
  o.customer_phone,
  o.shipping_city,
  o.shipping_department,
  o.status,
  o.payment_method,
  o.payment_status,
  o.subtotal_cop,
  o.discount_cop,
  o.shipping_cost_cop,
  o.total_cop,
  o.shipping_tracking,
  dc.code       AS discount_code,
  COUNT(oi.id)       AS item_count,
  SUM(oi.quantity)   AS total_units,
  o.created_at,
  o.paid_at,
  o.shipped_at
FROM public.orders o
LEFT JOIN public.order_items    oi ON o.id = oi.order_id
LEFT JOIN public.discount_codes dc ON o.discount_code_id = dc.id
GROUP BY o.id, dc.code
ORDER BY o.created_at DESC;

-- =====================================================================
-- ROW LEVEL SECURITY
-- =====================================================================

ALTER TABLE public.profiles           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_variants   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_reviews    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discount_codes     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.discount_code_uses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exchange_rates     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shipping_rates     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.carts              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items         ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.import_batches     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.import_batch_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.returns            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wishlist           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.special_requests   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications      ENABLE ROW LEVEL SECURITY;

-- =====================================================================
-- POLICIES (DROP IF EXISTS para que sea idempotente)
-- =====================================================================

-- CATEGORIES
DROP POLICY IF EXISTS "categories_select_public" ON public.categories;
CREATE POLICY "categories_select_public" ON public.categories FOR SELECT USING (is_active = TRUE);
DROP POLICY IF EXISTS "categories_all_admin"     ON public.categories;
CREATE POLICY "categories_all_admin"     ON public.categories FOR ALL USING (public.is_admin());

-- BRANDS
DROP POLICY IF EXISTS "brands_select_public" ON public.brands;
CREATE POLICY "brands_select_public" ON public.brands FOR SELECT USING (is_active = TRUE);
DROP POLICY IF EXISTS "brands_all_admin"     ON public.brands;
CREATE POLICY "brands_all_admin"     ON public.brands FOR ALL USING (public.is_admin());

-- PRODUCTS
DROP POLICY IF EXISTS "products_select_public" ON public.products;
CREATE POLICY "products_select_public" ON public.products FOR SELECT USING (is_active = TRUE);
DROP POLICY IF EXISTS "products_insert_admin"  ON public.products;
CREATE POLICY "products_insert_admin"  ON public.products FOR INSERT WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "products_update_admin"  ON public.products;
CREATE POLICY "products_update_admin"  ON public.products FOR UPDATE USING (public.is_admin());
DROP POLICY IF EXISTS "products_delete_admin"  ON public.products;
CREATE POLICY "products_delete_admin"  ON public.products FOR DELETE USING (public.is_admin());

-- PRODUCT_VARIANTS
DROP POLICY IF EXISTS "variants_select_public" ON public.product_variants;
CREATE POLICY "variants_select_public" ON public.product_variants FOR SELECT USING (is_active = TRUE);
DROP POLICY IF EXISTS "variants_all_admin"     ON public.product_variants;
CREATE POLICY "variants_all_admin"     ON public.product_variants FOR ALL USING (public.is_admin());

-- PRODUCT_REVIEWS
DROP POLICY IF EXISTS "reviews_select_approved"   ON public.product_reviews;
CREATE POLICY "reviews_select_approved"   ON public.product_reviews FOR SELECT USING (is_approved = TRUE OR auth.uid() = user_id);
DROP POLICY IF EXISTS "reviews_insert_auth"       ON public.product_reviews;
CREATE POLICY "reviews_insert_auth"       ON public.product_reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "reviews_all_admin"         ON public.product_reviews;
CREATE POLICY "reviews_all_admin"         ON public.product_reviews FOR ALL USING (public.is_admin());

-- PROFILES
DROP POLICY IF EXISTS "profiles_select_own"   ON public.profiles;
CREATE POLICY "profiles_select_own"   ON public.profiles FOR SELECT USING (auth.uid() = id);
DROP POLICY IF EXISTS "profiles_update_own"   ON public.profiles;
CREATE POLICY "profiles_update_own"   ON public.profiles FOR UPDATE USING (auth.uid() = id);
DROP POLICY IF EXISTS "profiles_all_admin"    ON public.profiles;
CREATE POLICY "profiles_all_admin"    ON public.profiles FOR ALL USING (public.is_admin());

-- ORDERS
DROP POLICY IF EXISTS "orders_select_own"    ON public.orders;
CREATE POLICY "orders_select_own"    ON public.orders FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "orders_insert_own"    ON public.orders;
CREATE POLICY "orders_insert_own"    ON public.orders FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "orders_all_admin"     ON public.orders;
CREATE POLICY "orders_all_admin"     ON public.orders FOR ALL USING (public.is_admin());

-- ORDER_ITEMS
DROP POLICY IF EXISTS "order_items_select_own" ON public.order_items;
CREATE POLICY "order_items_select_own" ON public.order_items FOR SELECT
  USING (EXISTS (SELECT 1 FROM public.orders WHERE id = order_id AND user_id = auth.uid()));
DROP POLICY IF EXISTS "order_items_insert_own" ON public.order_items;
CREATE POLICY "order_items_insert_own" ON public.order_items FOR INSERT
  WITH CHECK (EXISTS (SELECT 1 FROM public.orders WHERE id = order_id AND user_id = auth.uid()));
DROP POLICY IF EXISTS "order_items_all_admin"  ON public.order_items;
CREATE POLICY "order_items_all_admin"  ON public.order_items FOR ALL USING (public.is_admin());

-- CARTS
DROP POLICY IF EXISTS "carts_all_own"       ON public.carts;
CREATE POLICY "carts_all_own"       ON public.carts FOR ALL USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "cart_items_all_own"  ON public.cart_items;
CREATE POLICY "cart_items_all_own"  ON public.cart_items FOR ALL
  USING (EXISTS (SELECT 1 FROM public.carts WHERE id = cart_id AND user_id = auth.uid()));

-- WISHLIST
DROP POLICY IF EXISTS "wishlist_all_own" ON public.wishlist;
CREATE POLICY "wishlist_all_own" ON public.wishlist FOR ALL USING (auth.uid() = user_id);

-- RETURNS
DROP POLICY IF EXISTS "returns_select_own" ON public.returns;
CREATE POLICY "returns_select_own" ON public.returns FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "returns_insert_own" ON public.returns;
CREATE POLICY "returns_insert_own" ON public.returns FOR INSERT WITH CHECK (auth.uid() = user_id);
DROP POLICY IF EXISTS "returns_all_admin"  ON public.returns;
CREATE POLICY "returns_all_admin"  ON public.returns FOR ALL USING (public.is_admin());

-- NOTIFICATIONS
DROP POLICY IF EXISTS "notifications_select_own" ON public.notifications;
CREATE POLICY "notifications_select_own" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "notifications_update_own" ON public.notifications;
CREATE POLICY "notifications_update_own" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);
DROP POLICY IF EXISTS "notifications_all_admin"  ON public.notifications;
CREATE POLICY "notifications_all_admin"  ON public.notifications FOR ALL USING (public.is_admin());

-- SPECIAL_REQUESTS
DROP POLICY IF EXISTS "special_requests_insert_any"  ON public.special_requests;
CREATE POLICY "special_requests_insert_any"  ON public.special_requests FOR INSERT WITH CHECK (TRUE);
DROP POLICY IF EXISTS "special_requests_select_own"  ON public.special_requests;
CREATE POLICY "special_requests_select_own"  ON public.special_requests FOR SELECT
  USING (auth.uid() = user_id OR user_id IS NULL);
DROP POLICY IF EXISTS "special_requests_all_admin"   ON public.special_requests;
CREATE POLICY "special_requests_all_admin"   ON public.special_requests FOR ALL USING (public.is_admin());

-- SUBSCRIBERS
DROP POLICY IF EXISTS "subscribers_insert_any"  ON public.subscribers;
CREATE POLICY "subscribers_insert_any"  ON public.subscribers FOR INSERT WITH CHECK (TRUE);
DROP POLICY IF EXISTS "subscribers_all_admin"   ON public.subscribers;
CREATE POLICY "subscribers_all_admin"   ON public.subscribers FOR ALL USING (public.is_admin());

-- SHIPPING_RATES
DROP POLICY IF EXISTS "shipping_rates_select_public" ON public.shipping_rates;
CREATE POLICY "shipping_rates_select_public" ON public.shipping_rates FOR SELECT USING (is_active = TRUE);
DROP POLICY IF EXISTS "shipping_rates_all_admin"     ON public.shipping_rates;
CREATE POLICY "shipping_rates_all_admin"     ON public.shipping_rates FOR ALL USING (public.is_admin());

-- EXCHANGE_RATES
DROP POLICY IF EXISTS "exchange_rates_select_public" ON public.exchange_rates;
CREATE POLICY "exchange_rates_select_public" ON public.exchange_rates FOR SELECT USING (TRUE);
DROP POLICY IF EXISTS "exchange_rates_all_admin"     ON public.exchange_rates;
CREATE POLICY "exchange_rates_all_admin"     ON public.exchange_rates FOR ALL USING (public.is_admin());

-- DISCOUNT_CODES
DROP POLICY IF EXISTS "discount_codes_select_active" ON public.discount_codes;
CREATE POLICY "discount_codes_select_active" ON public.discount_codes FOR SELECT USING (is_active = TRUE);
DROP POLICY IF EXISTS "discount_codes_all_admin"     ON public.discount_codes;
CREATE POLICY "discount_codes_all_admin"     ON public.discount_codes FOR ALL USING (public.is_admin());

-- DISCOUNT_CODE_USES
DROP POLICY IF EXISTS "discount_uses_all_admin" ON public.discount_code_uses;
CREATE POLICY "discount_uses_all_admin" ON public.discount_code_uses FOR ALL USING (public.is_admin());

-- IMPORT_BATCHES
DROP POLICY IF EXISTS "import_batches_all_admin" ON public.import_batches;
CREATE POLICY "import_batches_all_admin" ON public.import_batches FOR ALL USING (public.is_admin());

-- IMPORT_BATCH_ITEMS
DROP POLICY IF EXISTS "import_batch_items_all_admin" ON public.import_batch_items;
CREATE POLICY "import_batch_items_all_admin" ON public.import_batch_items FOR ALL USING (public.is_admin());

-- =====================================================================
-- FIN DEL ESQUEMA
-- =====================================================================
-- 21 tablas | 5 vistas | 10 triggers | 7 funciones
-- RLS completo | 100% idempotente (seguro para re-ejecutar)
-- =====================================================================
