// src/types/index.ts

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  promoPrice?: number | null
  images: string[]
  sizes: string[]
  colors: string[]
  stock: number
  category: string
  featured: boolean
  active: boolean
  createdAt: Date
}

export interface CartItem {
  productId: string
  name: string
  price: number
  image: string
  size: string
  color: string
  quantity: number
}

export interface Order {
  id: string
  orderNumber: string
  status: OrderStatus
  total: number
  shippingFee: number
  promoCode?: string
  discount: number
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  country: string
  paymentMethod: string
  paymentRef?: string
  items: OrderItem[]
  createdAt: Date
}

export interface OrderItem {
  id: string
  productId: string
  product: Product
  quantity: number
  size: string
  color: string
  price: number
}

export type OrderStatus =
  | 'PENDING'
  | 'PAID'
  | 'PROCESSING'
  | 'SHIPPED'
  | 'DELIVERED'
  | 'CANCELLED'
  | 'REFUNDED'

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  image?: string
  publishedAt?: Date
}

export const COUNTRIES = [
  { code: 'BJ', name: 'Bénin', flag: '🇧🇯' },
  { code: 'TG', name: 'Togo', flag: '🇹🇬' },
  { code: 'BF', name: 'Burkina Faso', flag: '🇧🇫' },
  { code: 'CI', name: "Côte d'Ivoire", flag: '🇨🇮' },
  { code: 'SN', name: 'Sénégal', flag: '🇸🇳' },
  { code: 'NE', name: 'Niger', flag: '🇳🇪' },
  { code: 'ML', name: 'Mali', flag: '🇲🇱' },
  { code: 'GH', name: 'Ghana', flag: '🇬🇭' },
]

export const PAYMENT_METHODS = [
  { id: 'moov', label: 'Moov Money', icon: 'bi-phone' },
  { id: 'mtn', label: 'MTN MoMo', icon: 'bi-phone-fill' },
  { id: 'celtiis', label: 'Celtiis', icon: 'bi-credit-card' },
  { id: 'virement', label: 'Virement bancaire', icon: 'bi-bank' },
]

export const SHIPPING_RATES: Record<string, number> = {
  BJ: 0,       // Gratuit Bénin
  TG: 1500,
  BF: 2000,
  CI: 2500,
  SN: 3000,
  NE: 2000,
  ML: 2500,
  GH: 2500,
}
