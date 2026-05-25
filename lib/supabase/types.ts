// Tipos principales de Seoul Drop

export type UserRole = 'customer' | 'admin' | 'partner'
export type OrderStatus = 'pending' | 'paid' | 'preparing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
export type BatchStatus = 'planning' | 'purchased' | 'in_transit' | 'customs' | 'received' | 'distributed'

export interface Profile {
  id: string
  email: string
  full_name?: string
  phone?: string
  role: UserRole
  city?: string
  department?: string
  address?: string
  avatar_url?: string
  loyalty_points: number
  total_orders: number
  total_spent_cop: number
  created_at: string
}

export interface Category {
  id: string
  slug: string
  name: string
  description?: string
  icon?: string
  banner_url?: string
  display_order: number
  is_active: boolean
}

export interface Brand {
  id: string
  slug: string
  name: string
  origin_country: string
  logo_url?: string
  website?: string
  instagram?: string
}

export interface Product {
  id: string
  slug: string
  name: string
  description?: string
  category_id?: string
  brand_id?: string
  price_cop: number
  compare_at_price_cop?: number
  cost_krw?: number
  cost_cop?: number
  sku?: string
  stock: number
  low_stock_threshold: number
  weight_g?: number
  is_active: boolean
  is_featured: boolean
  is_preorder: boolean
  featured_image_url?: string
  gallery_urls: string[]
  tags: string[]
  badge_text?: string
  badge_color?: string
  total_sold: number
  average_rating: number
  review_count: number
  created_at: string
  updated_at: string
}

export interface ProductCatalog extends Product {
  category_slug: string
  category_name: string
  category_icon: string
  brand_slug: string
  brand_name: string
  brand_logo?: string
  margin_pct?: number
}

export interface Order {
  id: string
  order_number: string
  user_id?: string
  customer_email: string
  customer_phone: string
  customer_name: string
  shipping_address: string
  shipping_city: string
  shipping_department?: string
  shipping_cost_cop: number
  shipping_tracking?: string
  status: OrderStatus
  payment_method?: string
  payment_status: string
  paid_at?: string
  discount_cop: number
  subtotal_cop: number
  total_cop: number
  customer_notes?: string
  created_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id?: string
  product_name: string
  variant_name?: string
  product_image?: string
  unit_price_cop: number
  quantity: number
  subtotal_cop: number
}

export interface CartItem {
  id: string
  cart_id: string
  product_id: string
  variant_id?: string
  quantity: number
  product?: ProductCatalog
}

export interface ShippingRate {
  id: string
  name: string
  departments: string[]
  carrier: string
  rate_cop: number
  estimated_days: number
  free_shipping_from_cop?: number
}

export interface DiscountCode {
  id: string
  code: string
  discount_type: 'percentage' | 'fixed_amount' | 'free_shipping'
  discount_value: number
  minimum_order_cop: number
  is_active: boolean
  expires_at?: string
}
