// src/app/contact/page.tsx
'use client'
import { useState } from 'react'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle'|'sending'|'sent'|'error'>('idle')

  function update(f: string, v: string) { setForm((p) => ({ ...p, [f]: v })) }

  async function handleSubmit() {
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      setStatus(res.ok ? 'sent' : 'error')
    } catch { setStatus('error') }
  }

  const contacts = [
    { icon: 'bi-whatsapp', label: 'WhatsApp', value: '+229 01 46 37 31 76', href: 'https://wa.me/22901463731276' },
    { icon: 'bi-envelope', label: 'Email', value: 'harmohlb01@gmail.com', href: 'mailto:harmohlb01@gmail.com' },
    { icon: 'bi-geo-alt', label: 'Adresse', value: 'Cotonou & Parakou, Bénin', href: null },
    { icon: 'bi-clock', label: 'Disponibilité', value: 'Lun – Sam, 8h – 19h', href: null },
  ]

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="text-center mb-16">
        <p className="text-xs tracking-widest uppercase text-or mb-3">Nous écrire</p>
        <h1 className="font-display text-5xl font-light text-encre mb-4">Contact</h1>
        <p className="text-gris max-w-lg mx-auto leading-relaxed">
          Une question sur un produit, une commande ou la livraison ? Nous répondons sous 24h.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-16">
        <div>
          {status === 'sent' ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center mx-auto mb-6">
                <i className="bi bi-check-lg text-green-600 text-2xl" />
              </div>
              <h2 className="font-display text-2xl font-light text-encre mb-2">Message envoyé !</h2>
              <p className="text-gris text-sm">Nous vous répondrons dans les plus brefs délais.</p>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gris mb-1.5">Nom complet *</label>
                  <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)}
                    className="w-full border border-rose-pale rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-rose" />
                </div>
                <div>
                  <label className="block text-xs text-gris mb-1.5">Email *</label>
                  <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)}
                    className="w-full border border-rose-pale rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-rose" />
                </div>
              </div>
              <div>
                <label className="block text-xs text-gris mb-1.5">Téléphone / WhatsApp</label>
                <input type="tel" value={form.phone} onChange={(e) => update('phone', e.target.value)}
                  className="w-full border border-rose-pale rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-rose" />
              </div>
              <div>
                <label className="block text-xs text-gris mb-1.5">Sujet</label>
                <select value={form.subject} onChange={(e) => update('subject', e.target.value)}
                  className="w-full border border-rose-pale rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-rose">
                  <option value="">Sélectionner un sujet</option>
                  <option value="commande">Ma commande</option>
                  <option value="produit">Question produit</option>
                  <option value="livraison">Livraison</option>
                  <option value="retour">Retour / remboursement</option>
                  <option value="autre">Autre</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-gris mb-1.5">Message *</label>
                <textarea value={form.message} onChange={(e) => update('message', e.target.value)}
                  rows={5} placeholder="Comment pouvons-nous vous aider ?"
                  className="w-full border border-rose-pale rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-rose resize-none" />
              </div>
              {status === 'error' && (
                <p className="text-sm text-rose flex items-center gap-2">
                  <i className="bi bi-exclamation-circle" /> Une erreur est survenue. Contactez-nous directement sur WhatsApp.
                </p>
              )}
              <button onClick={handleSubmit} disabled={status === 'sending'}
                className="w-full bg-rose text-white text-sm font-medium py-4 rounded-full hover:bg-rose-dark transition-colors disabled:opacity-60 flex items-center justify-center gap-2">
                <i className="bi bi-send" />
                {status === 'sending' ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>
            </div>
          )}
        </div>

        <div className="space-y-5">
          {contacts.map((c) => (
            <div key={c.label} className="bg-white border border-rose-pale rounded-2xl p-6 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-rose-pale flex items-center justify-center flex-shrink-0">
                <i className={`bi ${c.icon} text-rose`} />
              </div>
              <div>
                <p className="text-xs tracking-widest uppercase text-gris mb-1">{c.label}</p>
                {c.href ? (
                  <a href={c.href} target="_blank" rel="noopener noreferrer"
                    className="text-encre font-medium hover:text-rose transition-colors">{c.value}</a>
                ) : (
                  <p className="text-encre font-medium">{c.value}</p>
                )}
              </div>
            </div>
          ))}

          <div className="bg-encre rounded-2xl p-6">
            <p className="text-xs tracking-widest uppercase text-or mb-4">Suivez-nous</p>
            <div className="flex gap-3">
              {[
                { icon: 'bi-facebook', href: 'https://www.facebook.com/profile.php?id=61574322368908', label: 'Facebook' },
                { icon: 'bi-instagram', href: '#', label: 'Instagram' },
                { icon: 'bi-tiktok', href: '#', label: 'TikTok' },
                { icon: 'bi-linkedin', href: '#', label: 'LinkedIn' },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="flex-1 bg-white/10 hover:bg-white/20 transition-colors text-white text-center py-3 rounded-xl flex flex-col items-center gap-1">
                  <i className={`bi ${s.icon} text-lg`} />
                  <span className="text-xs">{s.label}</span>
                </a>
              ))}
            </div>
          </div>

          <a href="https://wa.me/22901463731276" target="_blank" rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-600 text-white text-sm font-medium py-4 rounded-2xl hover:bg-green-700 transition-colors">
            <i className="bi bi-whatsapp text-lg" /> Réponse rapide via WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
