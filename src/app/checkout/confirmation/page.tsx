// src/app/checkout/confirmation/page.tsx
'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ConfirmationContent() {
  const params = useSearchParams()
  const orderNumber = params.get('order') || '—'

  return (
    <div className="max-w-2xl mx-auto px-6 py-32 text-center">
      <div className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-8">
        <i className="bi bi-check-lg text-green-600 text-4xl" />
      </div>
      <p className="text-xs tracking-widest uppercase text-or mb-3">Commande confirmée</p>
      <h1 className="font-display text-5xl font-light text-encre mb-4">Merci !</h1>
      <p className="text-gris leading-relaxed mb-2">
        Votre commande <strong className="text-encre">#{orderNumber}</strong> a bien été enregistrée.
      </p>
      <p className="text-gris leading-relaxed mb-10">
        Vous recevrez une confirmation par email et nous vous contacterons sur WhatsApp pour finaliser le paiement.
      </p>

      <div className="bg-white border border-rose-pale rounded-2xl p-8 text-left mb-8">
        <h2 className="font-display text-xl font-medium text-encre mb-5">Prochaines étapes</h2>
        <div className="space-y-4">
          {[
            { icon: 'bi-envelope-check', step: '01', title: 'Confirmation email', desc: "Un email récapitulatif vient d'être envoyé." },
            { icon: 'bi-whatsapp', step: '02', title: 'Contact WhatsApp', desc: 'Notre équipe vous contacte sous 24h pour le paiement.' },
            { icon: 'bi-box-seam', step: '03', title: 'Expédition', desc: 'Votre colis est préparé dès réception du paiement.' },
            { icon: 'bi-truck', step: '04', title: 'Livraison', desc: 'Bénin : 2–3 jours. Autres pays : 5–10 jours ouvrés.' },
          ].map((s) => (
            <div key={s.step} className="flex gap-4">
              <div className="w-9 h-9 rounded-full bg-rose/10 flex items-center justify-center flex-shrink-0">
                <i className={`bi ${s.icon} text-rose`} />
              </div>
              <div>
                <p className="text-sm font-medium text-encre">{s.title}</p>
                <p className="text-xs text-gris mt-0.5">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <a href="https://wa.me/22901463731276" target="_blank" rel="noopener noreferrer"
        className="inline-flex items-center gap-2 bg-green-600 text-white text-sm font-medium px-8 py-3.5 rounded-full hover:bg-green-700 transition-colors mb-4">
        <i className="bi bi-whatsapp" /> Nous contacter sur WhatsApp
      </a>
      <br />
      <Link href="/boutique" className="inline-block text-sm text-gris hover:text-encre transition-colors mt-3">
        Continuer mes achats
      </Link>
    </div>
  )
}

export default function ConfirmationPage() {
  return (
    <Suspense fallback={<div className="py-32 text-center text-gris">Chargement...</div>}>
      <ConfirmationContent />
    </Suspense>
  )
}
