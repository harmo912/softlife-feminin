// src/components/layout/Navbar.tsx
'use client'
import Link from 'next/link'
import { useState } from 'react'
import { useCartStore } from '@/store/cartStore'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const count = useCartStore((s) => s.getCount())

  const links = [
    { href: '/', label: 'Accueil' },
    { href: '/boutique', label: 'Boutique' },
    { href: '/about', label: 'À propos' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <header className="sticky top-0 z-50 bg-creme/95 backdrop-blur border-b border-rose-pale">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="font-display text-2xl font-light text-encre">
          Softlife <em className="text-rose not-italic">Féminin</em>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="text-sm text-gris hover:text-encre transition-colors">
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <Link href="/panier" className="relative flex items-center text-encre hover:text-rose transition-colors">
            <i className="bi bi-bag text-xl" />
            {count > 0 && (
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-rose text-white rounded-full text-[10px] flex items-center justify-center font-medium">
                {count}
              </span>
            )}
          </Link>
          <Link href="/compte" className="hidden md:flex text-encre hover:text-rose transition-colors">
            <i className="bi bi-person text-xl" />
          </Link>
          <button className="md:hidden text-encre" onClick={() => setOpen(!open)} aria-label="Menu">
            <i className={`bi ${open ? 'bi-x-lg' : 'bi-list'} text-2xl`} />
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden bg-creme border-t border-rose-pale px-6 py-4 flex flex-col gap-4 animate-fade-in">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="text-sm text-encre font-medium py-1">
              {l.label}
            </Link>
          ))}
          <Link href="/compte" onClick={() => setOpen(false)} className="text-sm text-encre font-medium py-1 flex items-center gap-2">
            <i className="bi bi-person" /> Mon compte
          </Link>
        </div>
      )}
    </header>
  )
}
