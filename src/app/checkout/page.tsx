// src/app/checkout/page.tsx
'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useCartStore } from '@/store/cartStore'
import { formatPrice } from '@/lib/utils'
import { COUNTRIES, SHIPPING_RATES, PAYMENT_METHODS } from '@/types'

export default function CheckoutPage() {
  const router = useRouter()
  const { items, getSubtotal, promoCode, discount, clearCart } = useCartStore()
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', country: 'BJ', paymentMethod: 'moov',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const subtotal = getSubtotal()
  const discountAmount = Math.round(subtotal * (discount / 100))
  const shipping = SHIPPING_RATES[form.country] ?? 2000
  const total = subtotal - discountAmount + shipping

  function update(field: string, value: string) { setForm((f) => ({ ...f, [field]: value })) }

  async function handleSubmit() {
    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.address || !form.city) {
      setError('Veuillez remplir tous les champs obligatoires.')
      return
    }
    setError(''); setLoading(true)
    try {
      const res = await fetch('/api/orders', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, items, total, shippingFee: shipping, promoCode, discount: discountAmount }),
      })
      const data = await res.json()
      if (res.ok) { clearCart(); router.push(`/checkout/confirmation?order=${data.orderNumber}`) }
      else setError(data.message || 'Une erreur est survenue.')
    } catch { setError('Erreur réseau. Veuillez réessayer.') }
    finally { setLoading(false) }
  }

  if (items.length === 0) { router.push('/boutique'); return null }

  const paymentIcons: Record<string, string> = {
    moov: 'bi-phone', mtn: 'bi-phone-fill', celtiis: 'bi-credit-card', virement: 'bi-bank',
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="mb-10">
        <p className="text-xs tracking-widest uppercase text-or mb-2">Finaliser</p>
        <h1 className="font-display text-4xl font-light text-encre">Checkout</h1>
      </div>
      <div className="grid md:grid-cols-3 gap-12">
        <div className="md:col-span-2 space-y-8">
          {/* Coordonnées */}
          <div>
            <h2 className="font-display text-xl font-medium text-encre mb-5 flex items-center gap-2">
              <i className="bi bi-person-circle text-rose" /> Vos coordonnées
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { field: 'firstName', label: 'Prénom *', type: 'text' },
                { field: 'lastName', label: 'Nom *', type: 'text' },
                { field: 'email', label: 'Email *', type: 'email' },
                { field: 'phone', label: 'Téléphone / WhatsApp *', type: 'tel' },
              ].map(({ field, label, type }) => (
                <div key={field}>
                  <label className="block text-xs text-gris mb-1.5">{label}</label>
                  <input type={type} value={(form as Record<string,string>)[field]}
                    onChange={(e) => update(field, e.target.value)}
                    className="w-full border border-rose-pale rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-rose" />
                </div>
              ))}
            </div>
          </div>

          {/* Livraison */}
          <div>
            <h2 className="font-display text-xl font-medium text-encre mb-5 flex items-center gap-2">
              <i className="bi bi-truck text-rose" /> Adresse de livraison
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gris mb-1.5">Pays *</label>
                <select value={form.country} onChange={(e) => update('country', e.target.value)}
                  className="w-full border border-rose-pale rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-rose">
                  {COUNTRIES.map((c) => (
                    <option key={c.code} value={c.code}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gris mb-1.5">Ville *</label>
                  <input type="text" value={form.city} onChange={(e) => update('city', e.target.value)}
                    className="w-full border border-rose-pale rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-rose" />
                </div>
                <div>
                  <label className="block text-xs text-gris mb-1.5">Adresse complète *</label>
                  <input type="text" value={form.address} onChange={(e) => update('address', e.target.value)}
                    className="w-full border border-rose-pale rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-rose" />
                </div>
              </div>
              {shipping === 0
                ? <p className="text-sm text-green-600 font-medium flex items-center gap-1"><i className="bi bi-check-circle" /> Livraison gratuite au Bénin</p>
                : <p className="text-sm text-gris">Frais de livraison : <strong>{formatPrice(shipping)}</strong></p>
              }
            </div>
          </div>

          {/* Paiement */}
          <div>
            <h2 className="font-display text-xl font-medium text-encre mb-5 flex items-center gap-2">
              <i className="bi bi-credit-card text-rose" /> Mode de paiement
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {PAYMENT_METHODS.map((m) => (
                <button key={m.id} onClick={() => update('paymentMethod', m.id)}
                  className={`flex items-center gap-3 p-4 rounded-xl border text-sm text-left transition-all ${
                    form.paymentMethod === m.id
                      ? 'border-rose bg-rose/5 text-encre'
                      : 'border-rose-pale bg-white text-gris hover:border-rose/50'
                  }`}>
                  <i className={`bi ${paymentIcons[m.id]} text-lg`} />
                  <span className="font-medium">{m.label}</span>
                  {form.paymentMethod === m.id && (
                    <span className="ml-auto w-4 h-4 rounded-full bg-rose flex items-center justify-center">
                      <i className="bi bi-check text-white text-[10px]" />
                    </span>
                  )}
                </button>
              ))}
            </div>
            <p className="text-xs text-gris mt-3 flex items-center gap-1">
              <i className="bi bi-shield-check text-green-600" />
              Paiement sécurisé via FedaPay. Instructions envoyées par email et WhatsApp.
            </p>
          </div>
        </div>

        {/* Récap */}
        <div>
          <div className="bg-white border border-rose-pale rounded-2xl p-6 sticky top-24">
            <h2 className="font-display text-xl font-medium text-encre mb-5">Votre commande</h2>
            <div className="space-y-3 mb-5">
              {items.map((item) => (
                <div key={`${item.productId}-${item.size}-${item.color}`} className="flex justify-between text-sm">
                  <div>
                    <p className="text-encre font-medium">{item.name}</p>
                    <p className="text-gris text-xs">{item.size} · {item.color} · x{item.quantity}</p>
                  </div>
                  <span className="text-encre font-medium whitespace-nowrap">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-rose-pale pt-4 space-y-2 text-sm">
              <div className="flex justify-between text-gris"><span>Sous-total</span><span>{formatPrice(subtotal)}</span></div>
              {discount > 0 && (
                <div className="flex justify-between text-rose"><span>Promo -{discount}%</span><span>-{formatPrice(discountAmount)}</span></div>
              )}
              <div className="flex justify-between text-gris">
                <span>Livraison</span><span>{shipping === 0 ? 'Gratuit' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between font-medium text-base text-encre border-t border-rose-pale pt-3">
                <span>Total</span><span>{formatPrice(total)}</span>
              </div>
            </div>
            {error && <p className="mt-4 text-sm text-rose flex items-center gap-1"><i className="bi bi-exclamation-circle" />{error}</p>}
            <button onClick={handleSubmit} disabled={loading}
              className="mt-5 w-full bg-rose text-white text-sm font-medium py-4 rounded-full hover:bg-rose-dark transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
              <i className="bi bi-lock" />
              {loading ? 'Traitement...' : `Confirmer — ${formatPrice(total)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
