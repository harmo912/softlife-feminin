// src/app/compte/page.tsx
'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Suspense } from 'react'

function CompteContent() {
  const router = useRouter()
  const params = useSearchParams()
  const isError = params.get('error')

  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(isError ? 'Email ou mot de passe incorrect.' : '')

  function update(f: string, v: string) {
    setForm((p) => ({ ...p, [f]: v }))
  }

  async function handleLogin() {
    setLoading(true); setError('')
    const res = await signIn('credentials', {
      email: form.email, password: form.password, redirect: false,
    })
    setLoading(false)
    if (res?.error) setError('Email ou mot de passe incorrect.')
    else router.push('/compte/dashboard')
  }

  async function handleRegister() {
    if (form.password !== form.confirm) { setError('Les mots de passe ne correspondent pas.'); return }
    if (form.password.length < 8) { setError('Le mot de passe doit contenir au moins 8 caractères.'); return }
    setLoading(true); setError('')
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
    })
    const data = await res.json()
    setLoading(false)
    if (!res.ok) { setError(data.message || 'Erreur lors de la création du compte.'); return }
    await signIn('credentials', { email: form.email, password: form.password, redirect: false })
    router.push('/compte/dashboard')
  }

  return (
    <div className="min-h-[80vh] grid md:grid-cols-2">
      {/* Panneau gauche */}
      <div className="hidden md:flex bg-encre flex-col justify-center items-center p-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-rose/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-or/8 blur-3xl" />
        </div>
        <div className="relative text-center max-w-xs">
          <Link href="/" className="font-display text-4xl font-light text-creme block mb-8">
            Softlife <em className="text-rose-light not-italic">Féminin</em>
          </Link>
          <p className="text-white/50 leading-relaxed text-sm">
            Créez votre compte pour suivre vos commandes, gérer vos informations de livraison
            et profiter d'une expérience personnalisée.
          </p>
          <div className="mt-10 space-y-3 text-left">
            {['Suivi de commandes en temps réel', 'Historique de vos achats', 'Adresses de livraison sauvegardées'].map((b) => (
              <div key={b} className="flex items-center gap-3 text-sm text-white/60">
                <span className="w-5 h-5 rounded-full bg-rose/20 flex items-center justify-center flex-shrink-0">
                  <svg width="10" height="10" fill="none" stroke="#e87a92" strokeWidth="2" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                {b}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Panneau droit — formulaire */}
      <div className="flex items-center justify-center p-8 md:p-16 bg-creme">
        <div className="w-full max-w-sm">
          {/* Tabs */}
          <div className="flex bg-white border border-rose-pale rounded-full p-1 mb-8">
            {(['login', 'register'] as const).map((m) => (
              <button key={m} onClick={() => { setMode(m); setError('') }}
                className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all ${
                  mode === m ? 'bg-rose text-white' : 'text-gris hover:text-encre'
                }`}>
                {m === 'login' ? 'Connexion' : 'Créer un compte'}
              </button>
            ))}
          </div>

          {/* Login */}
          {mode === 'login' && (
            <div className="space-y-4">
              <h1 className="font-display text-3xl font-light text-encre mb-6">Bonjour !</h1>
              <div>
                <label className="block text-xs text-gris mb-1.5">Email</label>
                <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  className="w-full border border-rose-pale rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-rose" />
              </div>
              <div>
                <label className="block text-xs text-gris mb-1.5">Mot de passe</label>
                <input type="password" value={form.password} onChange={(e) => update('password', e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  className="w-full border border-rose-pale rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-rose" />
              </div>
              {error && <p className="text-sm text-rose">{error}</p>}
              <button onClick={handleLogin} disabled={loading}
                className="w-full bg-rose text-white text-sm font-medium py-4 rounded-full hover:bg-rose-dark transition-colors disabled:opacity-60">
                {loading ? 'Connexion...' : 'Se connecter'}
              </button>
              <p className="text-xs text-center text-gris">
                Pas encore de compte ?{' '}
                <button onClick={() => setMode('register')} className="text-rose hover:underline">Créer un compte</button>
              </p>
            </div>
          )}

          {/* Register */}
          {mode === 'register' && (
            <div className="space-y-4">
              <h1 className="font-display text-3xl font-light text-encre mb-6">Rejoignez-nous</h1>
              <div>
                <label className="block text-xs text-gris mb-1.5">Prénom et nom</label>
                <input type="text" value={form.name} onChange={(e) => update('name', e.target.value)}
                  className="w-full border border-rose-pale rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-rose" />
              </div>
              <div>
                <label className="block text-xs text-gris mb-1.5">Email</label>
                <input type="email" value={form.email} onChange={(e) => update('email', e.target.value)}
                  className="w-full border border-rose-pale rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-rose" />
              </div>
              <div>
                <label className="block text-xs text-gris mb-1.5">Mot de passe (8 caractères min.)</label>
                <input type="password" value={form.password} onChange={(e) => update('password', e.target.value)}
                  className="w-full border border-rose-pale rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-rose" />
              </div>
              <div>
                <label className="block text-xs text-gris mb-1.5">Confirmer le mot de passe</label>
                <input type="password" value={form.confirm} onChange={(e) => update('confirm', e.target.value)}
                  className="w-full border border-rose-pale rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-rose" />
              </div>
              {error && <p className="text-sm text-rose">{error}</p>}
              <button onClick={handleRegister} disabled={loading}
                className="w-full bg-rose text-white text-sm font-medium py-4 rounded-full hover:bg-rose-dark transition-colors disabled:opacity-60">
                {loading ? 'Création...' : 'Créer mon compte'}
              </button>
              <p className="text-xs text-center text-gris">
                En vous inscrivant, vous acceptez nos{' '}
                <Link href="/cgv" className="text-rose hover:underline">CGV</Link>{' '}
                et notre{' '}
                <Link href="/confidentialite" className="text-rose hover:underline">politique de confidentialité</Link>.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function ComptePage() {
  return (
    <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center text-gris">Chargement...</div>}>
      <CompteContent />
    </Suspense>
  )
}
