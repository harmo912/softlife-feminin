// prisma/seed.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Code promo de lancement
  await prisma.promoCode.upsert({
    where: { code: 'BIENVENUE15' },
    update: {},
    create: {
      code: 'BIENVENUE15',
      discount: 15,
      active: true,
      usageLimit: null,
    },
  })

  // Produits en base
  const products = [
    {
      name: 'Serviette Confort Jour',
      slug: 'serviette-confort-jour',
      description: "Conçue pour un confort optimal en journée, la Serviette Confort Jour offre une protection douce et sûre. Fabriquée en coton biologique certifié, elle s'adapte à votre morphologie grâce à ses ailettes réglables.",
      price: 3500,
      promoPrice: 2975,
      images: [],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Ivoire', 'Blush', 'Prune', 'Ardoise', 'Marine', 'Naturel'],
      stock: 50,
      category: 'serviette',
      featured: true,
    },
    {
      name: 'Serviette Nuit Intégrale',
      slug: 'serviette-nuit-integrale',
      description: "Dormir sereinement, c'est possible. La Serviette Nuit Intégrale est extra-longue et offre une protection 360° pour les flux abondants.",
      price: 4500,
      promoPrice: null,
      images: [],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Ivoire', 'Blush', 'Prune', 'Ardoise', 'Marine', 'Naturel'],
      stock: 40,
      category: 'serviette',
      featured: true,
    },
    {
      name: 'Pack Découverte 3 serviettes',
      slug: 'pack-decouverte-3-serviettes',
      description: "Le Pack Découverte comprend 1 Serviette Confort Jour, 1 Serviette Nuit Intégrale et 1 sachet de lavage offert.",
      price: 10500,
      promoPrice: 8500,
      images: [],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Ivoire', 'Blush', 'Prune', 'Ardoise', 'Marine', 'Naturel'],
      stock: 30,
      category: 'pack',
      featured: true,
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    })
  }

  console.log('Seed terminé avec succès !')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
