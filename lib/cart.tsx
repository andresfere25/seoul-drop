'use client'
import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react'
import { type Product } from './data'

export type CartItem = { product: Product; qty: number }

type Stored = CartItem

const STORAGE_KEY = 'seoul-drop-cart-v1'
export const FREE_SHIPPING_THRESHOLD = 150000
export const SHIPPING_COST = 15000

type CartContextType = {
  items: CartItem[]
  count: number
  subtotal: number
  shipping: number
  total: number
  isOpen: boolean
  open: () => void
  close: () => void
  addItem: (product: Product, qty?: number) => void
  removeItem: (id: string) => void
  updateQty: (id: string, qty: number) => void
  clear: () => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  // Cargar de localStorage al montar
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const stored: Stored[] = JSON.parse(raw)
        const restored = stored.filter(s => s && s.product && s.qty > 0)
        setItems(restored)
      }
    } catch {
      // ignora datos corruptos
    }
    setHydrated(true)
  }, [])

  // Guardar en localStorage cuando cambie
  useEffect(() => {
    if (!hydrated) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items, hydrated])

  const addItem = useCallback((product: Product, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.product.id === product.id)
      if (existing) {
        return prev.map(i =>
          i.product.id === product.id
            ? { ...i, qty: Math.min(i.qty + qty, product.stock) }
            : i
        )
      }
      return [...prev, { product, qty: Math.min(qty, product.stock) }]
    })
    setIsOpen(true)
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.product.id !== id))
  }, [])

  const updateQty = useCallback((id: string, qty: number) => {
    setItems(prev =>
      prev.flatMap(i => {
        if (i.product.id !== id) return [i]
        const next = Math.max(0, Math.min(qty, i.product.stock))
        return next === 0 ? [] : [{ ...i, qty: next }]
      })
    )
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const count = items.reduce((sum, i) => sum + i.qty, 0)
  const subtotal = items.reduce((sum, i) => sum + i.product.price * i.qty, 0)
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST
  const total = subtotal + shipping

  return (
    <CartContext.Provider value={{
      items, count, subtotal, shipping, total,
      isOpen, open: () => setIsOpen(true), close: () => setIsOpen(false),
      addItem, removeItem, updateQty, clear,
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider')
  return ctx
}
