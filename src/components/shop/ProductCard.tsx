// src/components/shop/ProductCard.tsx
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types'
import { formatPrice } from '@/lib/utils'

interface Props { product: Product; dark?: boolean }

export function ProductCard({ product, dark = false }: Props) {
  const hasPromo = product.promoPrice && product.promoPrice < product.price

  return (
    <Link href={`/boutique/${product.slug}`}
      className={`group block rounded-2xl overflow-hidden border transition-all hover:shadow-md ${
        dark ? 'bg-white/5 border-white/10 hover:border-rose-light/40' : 'bg-white border-rose-pale hover:border-rose/30'
      }`}>
      <div className={`relative aspect-square overflow-hidden flex items-center justify-center ${dark ? 'bg-white/10' : 'bg-rose-pale/30'}`}>
        {product.images[0] ? (
          <Image src={product.images[0]} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="text-center">
            <i className={`bi bi-image text-5xl block mb-2 ${dark ? 'text-white/20' : 'text-rose-pale'}`} />
            <span className={`text-xs ${dark ? 'text-white/20' : 'text-gris'}`}>Photo à venir</span>
          </div>
        )}
        {hasPromo && (
          <div className="absolute top-3 left-3 bg-rose text-white text-xs font-medium px-3 py-1 rounded-full">Promo</div>
        )}
      </div>

      <div className="p-5">
        <h3 className={`font-display text-lg font-medium mb-2 ${dark ? 'text-creme' : 'text-encre'}`}>{product.name}</h3>
        <div className="flex items-baseline gap-2">
          {hasPromo ? (
            <>
              <span className={`text-base font-medium ${dark ? 'text-rose-light' : 'text-rose'}`}>{formatPrice(product.promoPrice!)}</span>
              <span className={`text-sm line-through ${dark ? 'text-white/30' : 'text-gris'}`}>{formatPrice(product.price)}</span>
            </>
          ) : (
            <span className={`text-base font-medium ${dark ? 'text-creme' : 'text-encre'}`}>{formatPrice(product.price)}</span>
          )}
        </div>
        <div className="mt-3 flex gap-1.5">
          {[
            { name: 'Ivoire', hex: '#F5F0E8' }, { name: 'Blush', hex: '#E8B4B8' },
            { name: 'Prune', hex: '#5C2D4E' }, { name: 'Ardoise', hex: '#607080' },
            { name: 'Marine', hex: '#1C3A5E' }, { name: 'Naturel', hex: '#C8A882' },
          ].map((c) => (
            <div key={c.name} title={c.name} className="w-4 h-4 rounded-full border border-white/20" style={{ background: c.hex }} />
          ))}
        </div>
      </div>
    </Link>
  )
}
