// src/app/panier/page.tsx
'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'
import { useState } from 'react'

export default function PanierPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getTotal, promoCode, discount, applyPromo, removePromo } = useCartStore()
  const [promoInput, setPromoInput] = useState('')
  const [promoError, setPromoError] = useState('')
  const VALID_PROMOS: Record<string, number> = { BIENVENUE15: 15 }

  function handlePromo() {
    const code = promoInput.trim().toUpperCase()
    if (VALID_PROMOS[code]) { applyPromo(code, VALID_PROMOS[code]); setPromoError('') }
    else setPromoError('Code promo invalide')
  }

  const subtotal = getSubtotal()
  const discountAmount = Math.round(subtotal * (discount / 100))
  const total = getTotal(0)

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-32 text-center">
        <div className="w-20 h-20 rounded-full bg-rose-pale flex items-center justify-center mx-auto mb-8">
          <i className="bi bi-bag text-rose text-3xl" />
        </div>
        <p className="text-xs tracking-widest uppercase text-or mb-4">Votre panier</p>
        <h1 className="font-display text-4xl font-light text-encre mb-4">Panier vide</h1>
        <p className="text-gris mb-8">Vous n'avez aucun article dans votre panier.</p>
        <Link href="/boutique" className="inline-block bg-rose text-white text-sm font-medium px-8 py-3.5 rounded-full hover:bg-rose-dark transition-colors">
          Découvrir la boutique
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-10">
        <p className="text-xs tracking-widest uppercase text-or mb-2">Votre sélection</p>
        <h1 className="font-display text-4xl font-light text-encre">
          Panier ({items.reduce((s, i) => s + i.quantity, 0)} articles)
        </h1>
      </div>

      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-4">
          {items.map((item) => (
            <div key={`${item.productId}-${item.size}-${item.color}`}
              className="bg-white border border-rose-pale rounded-2xl p-5 flex gap-5">
              <div className="w-20 h-20 rounded-xl bg-rose-pale/30 flex-shrink-0 overflow-hidden relative flex items-center justify-center">
                {item.image
                  ? <Image src={item.image} alt={item.name} fill className="object-cover" />
                  : <i className="bi bi-image text-gris text-2xl" />
                }
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-display text-lg font-medium text-encre">{item.name}</h3>
                  <button onClick={() => removeItem(item.productId, item.size, item.color)}
                    className="text-gris hover:text-rose transition-colors">
                    <i className="bi bi-trash" />
                  </button>
                </div>
                <p className="text-xs text-gris mt-0.5">{item.size} — {item.color}</p>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center gap-3 bg-creme border border-rose-pale rounded-full px-3 py-1.5">
                    <button onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity - 1)}
                      className="text-gris hover:text-encre"><i className="bi bi-dash" /></button>
                    <span className="text-sm w-4 text-center">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productId, item.size, item.color, item.quantity + 1)}
                      className="text-gris hover:text-encre"><i className="bi bi-plus" /></button>
                  </div>
                  <span className="font-medium text-encre">{formatPrice(item.price * item.quantity)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="bg-white border border-rose-pale rounded-2xl p-6">
            <h2 className="font-display text-xl font-medium text-encre mb-5">Récapitulatif</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gris"><span>Sous-total</span><span>{formatPrice(subtotal)}</span></div>
              {discount > 0 && (
                <div className="flex justify-between text-rose">
                  <span>{promoCode} -{discount}%</span><span>-{formatPrice(discountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between text-gris">
                <span>Livraison</span><span className="text-green-600">Au checkout</span>
              </div>
              <div className="border-t border-rose-pale pt-3 flex justify-between font-medium text-encre text-base">
                <span>Total</span><span>{formatPrice(total)}</span>
              </div>
            </div>

            <div className="mt-5">
              {promoCode ? (
                <div className="flex items-center justify-between bg-rose/10 border border-rose/20 rounded-xl p-3">
                  <span className="text-sm text-rose font-medium flex items-center gap-1">
                    <i className="bi bi-tag" /> {promoCode} — -{discount}%
                  </span>
                  <button onClick={removePromo} className="text-xs text-gris hover:text-rose">
                    <i className="bi bi-x" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input value={promoInput} onChange={(e) => setPromoInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handlePromo()}
                    placeholder="Code promo"
                    className="flex-1 border border-rose-pale rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-rose bg-creme" />
                  <button onClick={handlePromo}
                    className="bg-encre text-creme text-xs font-medium px-4 py-2.5 rounded-xl hover:bg-rose-dark transition-colors">
                    OK
                  </button>
                </div>
              )}
              {promoError && <p className="text-xs text-rose mt-2 flex items-center gap-1"><i className="bi bi-exclamation-circle" />{promoError}</p>}
            </div>

            <Link href="/checkout"
              className="mt-5 flex items-center justify-center gap-2 w-full bg-rose text-white text-sm font-medium py-4 rounded-full hover:bg-rose-dark transition-colors">
              <i className="bi bi-lock" /> Passer la commande
            </Link>
            <Link href="/boutique" className="mt-3 flex items-center justify-center gap-1 text-sm text-gris hover:text-encre transition-colors">
              <i className="bi bi-arrow-left" /> Continuer mes achats
            </Link>
          </div>

          <div className="bg-white border border-rose-pale rounded-2xl p-5">
            <p className="text-xs text-gris mb-3 flex items-center gap-1"><i className="bi bi-credit-card" /> Modes de paiement</p>
            <div className="grid grid-cols-2 gap-2 text-xs text-gris">
              {['Moov Money', 'MTN MoMo', 'Celtiis', 'Virement'].map(m => (
                <span key={m} className="flex items-center gap-1.5">
                  <i className="bi bi-check-circle text-green-500" />{m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
