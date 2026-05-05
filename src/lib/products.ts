// src/lib/products.ts
import { Product } from '@/types'

export const PRODUCTS: Product[] = [
  {
    id: 'prod_001',
    name: 'Serviette Confort Jour',
    slug: 'serviette-confort-jour',
    description:
      "Conçue pour un confort optimal en journée, la Serviette Confort Jour offre une protection douce et sûre. Fabriquée en coton biologique certifié, elle s'adapte à votre morphologie grâce à ses ailettes réglables. Lavable en machine, elle dure jusqu'à 5 ans — un geste simple pour votre santé et la planète.",
    price: 3500,
    promoPrice: 2975,
    images: ['/images/products/confort-jour-1.jpg', '/images/products/confort-jour-2.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Ivoire', 'Blush', 'Prune', 'Ardoise', 'Marine', 'Naturel'],
    stock: 50,
    category: 'serviette',
    featured: true,
    active: true,
    createdAt: new Date(),
  },
  {
    id: 'prod_002',
    name: 'Serviette Nuit Intégrale',
    slug: 'serviette-nuit-integrale',
    description:
      "Dormir sereinement, c'est possible. La Serviette Nuit Intégrale est extra-longue (32 cm) et offre une protection 360° pour les flux abondants. Son tissu en microfibre ultra-absorbant retient jusqu'à 4x son poids en liquide. Dormez en confiance, quelle que soit la nuit.",
    price: 4500,
    promoPrice: null,
    images: ['/images/products/nuit-integrale-1.jpg', '/images/products/nuit-integrale-2.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Ivoire', 'Blush', 'Prune', 'Ardoise', 'Marine', 'Naturel'],
    stock: 40,
    category: 'serviette',
    featured: true,
    active: true,
    createdAt: new Date(),
  },
  {
    id: 'prod_003',
    name: 'Pack Découverte 3 serviettes',
    slug: 'pack-decouverte-3-serviettes',
    description:
      "Pas encore convaincue ? Le Pack Découverte est fait pour vous. Il comprend 1 Serviette Confort Jour, 1 Serviette Nuit Intégrale et 1 sachet de lavage offert. Testez pendant un cycle complet — nous sommes confiants que vous ne reviendrez plus en arrière.",
    price: 10500,
    promoPrice: 8500,
    images: ['/images/products/pack-decouverte-1.jpg', '/images/products/pack-decouverte-2.jpg'],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Ivoire', 'Blush', 'Prune', 'Ardoise', 'Marine', 'Naturel'],
    stock: 30,
    category: 'pack',
    featured: true,
    active: true,
    createdAt: new Date(),
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getFeaturedProducts(): Product[] {
  return PRODUCTS.filter((p) => p.featured && p.active)
}
