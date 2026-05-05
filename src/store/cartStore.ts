// src/store/cartStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem } from '@/types'

interface CartStore {
  items: CartItem[]
  promoCode: string
  discount: number
  addItem: (item: CartItem) => void
  removeItem: (productId: string, size: string, color: string) => void
  updateQuantity: (productId: string, size: string, color: string, qty: number) => void
  clearCart: () => void
  applyPromo: (code: string, discount: number) => void
  removePromo: () => void
  getSubtotal: () => number
  getTotal: (shippingFee?: number) => number
  getCount: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      promoCode: '',
      discount: 0,

      addItem: (newItem) => {
        set((state) => {
          const existing = state.items.find(
            (i) =>
              i.productId === newItem.productId &&
              i.size === newItem.size &&
              i.color === newItem.color
          )
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === newItem.productId &&
                i.size === newItem.size &&
                i.color === newItem.color
                  ? { ...i, quantity: i.quantity + newItem.quantity }
                  : i
              ),
            }
          }
          return { items: [...state.items, newItem] }
        })
      },

      removeItem: (productId, size, color) => {
        set((state) => ({
          items: state.items.filter(
            (i) =>
              !(i.productId === productId && i.size === size && i.color === color)
          ),
        }))
      },

      updateQuantity: (productId, size, color, qty) => {
        if (qty <= 0) {
          get().removeItem(productId, size, color)
          return
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId && i.size === size && i.color === color
              ? { ...i, quantity: qty }
              : i
          ),
        }))
      },

      clearCart: () => set({ items: [], promoCode: '', discount: 0 }),

      applyPromo: (code, discount) => set({ promoCode: code, discount }),

      removePromo: () => set({ promoCode: '', discount: 0 }),

      getSubtotal: () => {
        return get().items.reduce((sum, i) => sum + i.price * i.quantity, 0)
      },

      getTotal: (shippingFee = 0) => {
        const sub = get().getSubtotal()
        const disc = get().discount
        const discAmount = Math.round(sub * (disc / 100))
        return sub - discAmount + shippingFee
      },

      getCount: () => {
        return get().items.reduce((sum, i) => sum + i.quantity, 0)
      },
    }),
    { name: 'softlife-cart' }
  )
)
