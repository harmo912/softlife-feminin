// src/app/boutique/page.tsx
import type { Metadata } from 'next'
import { PRODUCTS } from '@/lib/products'
import { ProductCard } from '@/components/shop/ProductCard'

export const metadata: Metadata = {
  title: 'Boutique',
  description: 'Découvrez nos serviettes hygiéniques réutilisables — Confort Jour, Nuit Intégrale et Pack Découverte.',
}

export default function BoutiquePage() {
  const serviettes = PRODUCTS.filter((p) => p.category === 'serviette' && p.active)
  const packs = PRODUCTS.filter((p) => p.category === 'pack' && p.active)

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-xs tracking-widest uppercase text-or mb-3">Notre catalogue</p>
        <h1 className="font-display text-5xl font-light text-encre mb-4">Boutique</h1>
        <p className="text-gris max-w-lg mx-auto leading-relaxed">
          Des serviettes réutilisables sélectionnées pour leur douceur, leur durabilité et leur style.
          Livraison dans 8 pays d'Afrique de l'Ouest.
        </p>
      </div>

      {/* Filtre info */}
      <div className="flex items-center gap-4 mb-10 pb-6 border-b border-rose-pale">
        <span className="text-sm text-gris">{PRODUCTS.length} produits</span>
        <div className="flex gap-2 ml-auto">
          {['Tailles : S M L XL', '6 coloris'].map((tag) => (
            <span key={tag} className="text-xs bg-rose-pale text-rose px-3 py-1 rounded-full">{tag}</span>
          ))}
        </div>
      </div>

      {/* Serviettes */}
      <section className="mb-16">
        <h2 className="font-display text-2xl font-light text-encre mb-8">Serviettes individuelles</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {serviettes.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Packs */}
      {packs.length > 0 && (
        <section id="pack-decouverte">
          <h2 className="font-display text-2xl font-light text-encre mb-8">Packs</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {packs.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* Code promo rappel */}
      <div className="mt-16 bg-encre rounded-3xl p-10 text-center">
        <p className="text-xs tracking-widest uppercase text-or mb-3">Offre de lancement</p>
        <p className="font-display text-4xl font-light text-creme mb-2">
          Code <em className="text-rose-light not-italic">BIENVENUE15</em>
        </p>
        <p className="text-white/50 text-sm">15% de réduction sur votre première commande</p>
      </div>
    </div>
  )
}
