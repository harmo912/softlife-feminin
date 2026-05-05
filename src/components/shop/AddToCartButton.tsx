// src/components/shop/AddToCartButton.tsx
'use client'
import { useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import { Product } from '@/types'

const COLOR_HEX: Record<string, string> = {
  Ivoire: '#F5F0E8', Blush: '#E8B4B8', Prune: '#5C2D4E',
  Ardoise: '#607080', Marine: '#1C3A5E', Naturel: '#C8A882',
}

export function AddToCartButton({ product }: { product: Product }) {
  const [size, setSize] = useState('')
  const [color, setColor] = useState('')
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [error, setError] = useState('')
  const addItem = useCartStore((s) => s.addItem)
  const price = product.promoPrice ?? product.price

  function handleAdd() {
    if (!size) { setError('Veuillez choisir une taille'); return }
    if (!color) { setError('Veuillez choisir un coloris'); return }
    setError('')
    addItem({ productId: product.id, name: product.name, price, image: product.images[0] ?? '', size, color, quantity: qty })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="space-y-5">
      <div>
        <p className="text-xs tracking-widest uppercase text-gris mb-3">Taille</p>
        <div className="flex gap-2">
          {product.sizes.map((s) => (
            <button key={s} onClick={() => setSize(s)}
              className={`w-11 h-11 rounded-full text-sm font-medium border transition-all ${
                size === s ? 'bg-encre text-creme border-encre' : 'bg-white text-encre border-rose-pale hover:border-rose'
              }`}>{s}</button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-xs tracking-widest uppercase text-gris mb-3">
          Coloris {color && <span className="text-rose normal-case">— {color}</span>}
        </p>
        <div className="flex gap-2.5">
          {product.colors.map((c) => (
            <button key={c} title={c} onClick={() => setColor(c)}
              className={`w-8 h-8 rounded-full border-2 transition-transform hover:scale-110 ${color === c ? 'border-encre scale-110' : 'border-transparent'}`}
              style={{ background: COLOR_HEX[c] ?? '#ccc' }} />
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <p className="text-xs tracking-widest uppercase text-gris">Quantité</p>
        <div className="flex items-center gap-3 bg-white border border-rose-pale rounded-full px-4 py-2">
          <button onClick={() => setQty(Math.max(1, qty - 1))} className="text-gris hover:text-encre">
            <i className="bi bi-dash" />
          </button>
          <span className="text-sm font-medium w-5 text-center">{qty}</span>
          <button onClick={() => setQty(qty + 1)} className="text-gris hover:text-encre">
            <i className="bi bi-plus" />
          </button>
        </div>
      </div>

      {error && <p className="text-sm text-rose flex items-center gap-1"><i className="bi bi-exclamation-circle" />{error}</p>}

      <button onClick={handleAdd}
        className={`w-full py-4 rounded-full text-sm font-medium transition-all flex items-center justify-center gap-2 ${
          added ? 'bg-green-600 text-white' : 'bg-rose text-white hover:bg-rose-dark'
        }`}>
        <i className={`bi ${added ? 'bi-check-lg' : 'bi-bag-plus'}`} />
        {added ? 'Ajouté au panier !' : 'Ajouter au panier'}
      </button>

      <a href={`https://wa.me/22901463731276?text=Bonjour,%20je%20voudrais%20commander%20:${encodeURIComponent(product.name)}`}
        target="_blank" rel="noopener noreferrer"
        className="w-full flex items-center justify-center gap-2 py-4 rounded-full border border-encre text-encre text-sm font-medium hover:bg-encre hover:text-creme transition-all">
        <i className="bi bi-whatsapp" /> Commander via WhatsApp
      </a>
    </div>
  )
}
