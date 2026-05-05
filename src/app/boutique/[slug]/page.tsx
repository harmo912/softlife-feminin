// src/app/boutique/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import { PRODUCTS, getProductBySlug } from '@/lib/products'
import { AddToCartButton } from '@/components/shop/AddToCartButton'
import { formatPrice } from '@/lib/utils'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug)
  if (!product) return {}
  return { title: product.name, description: product.description.slice(0, 160) }
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug)
  if (!product) notFound()

  const hasPromo = product.promoPrice && product.promoPrice < product.price
  const savings = hasPromo ? product.price - product.promoPrice! : 0

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="grid md:grid-cols-2 gap-16">
        <div className="space-y-4">
          <div className="aspect-square rounded-3xl bg-rose-pale/30 overflow-hidden relative flex items-center justify-center">
            {product.images[0] ? (
              <Image src={product.images[0]} alt={product.name} fill className="object-cover" />
            ) : (
              <div className="text-center">
                <i className="bi bi-image text-rose/20 text-8xl block mb-3" />
                <p className="text-gris text-sm">Photo principale à venir</p>
              </div>
            )}
            {hasPromo && (
              <div className="absolute top-4 left-4 bg-rose text-white text-xs font-medium px-3 py-1.5 rounded-full">Promo</div>
            )}
          </div>
          {product.images[1] && (
            <div className="aspect-video rounded-2xl bg-rose-pale/30 overflow-hidden relative">
              <Image src={product.images[1]} alt={product.name} fill className="object-cover" />
            </div>
          )}
        </div>

        <div>
          <p className="text-xs tracking-widest uppercase text-or mb-3">
            {product.category === 'pack' ? 'Pack' : 'Serviette'}
          </p>
          <h1 className="font-display text-4xl font-light text-encre mb-4">{product.name}</h1>

          <div className="flex items-baseline gap-3 mb-2">
            {hasPromo ? (
              <>
                <span className="text-3xl font-medium text-rose">{formatPrice(product.promoPrice!)}</span>
                <span className="text-lg line-through text-gris">{formatPrice(product.price)}</span>
              </>
            ) : (
              <span className="text-3xl font-medium text-encre">{formatPrice(product.price)}</span>
            )}
          </div>
          {hasPromo && (
            <p className="text-sm text-rose mb-6 flex items-center gap-1">
              <i className="bi bi-tag" /> Vous économisez {formatPrice(savings)}
            </p>
          )}

          <p className="text-gris leading-relaxed mb-8">{product.description}</p>

          <AddToCartButton product={product} />

          <div className="mt-8 space-y-3 border-t border-rose-pale pt-6">
            {[
              { icon: 'bi-truck', text: 'Livraison gratuite au Bénin' },
              { icon: 'bi-arrow-return-left', text: 'Retours acceptés sous 14 jours' },
              { icon: 'bi-credit-card', text: 'Moov Money, MTN MoMo, Celtiis, virement' },
              { icon: 'bi-shield-check', text: 'Paiement 100% sécurisé via FedaPay' },
            ].map((i) => (
              <div key={i.text} className="flex items-center gap-3 text-sm text-gris">
                <i className={`bi ${i.icon} text-rose`} />
                <span>{i.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
