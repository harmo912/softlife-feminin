// src/components/layout/Footer.tsx
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-encre text-creme mt-24">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <h2 className="font-display text-3xl font-light mb-3">
            Softlife <em className="text-rose-light not-italic">Féminin</em>
          </h2>
          <p className="text-sm text-white/50 leading-relaxed max-w-xs">
            Des serviettes hygiéniques réutilisables douces, durables et économiques.
            Livraison dans toute l'Afrique de l'Ouest.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a href="https://www.facebook.com/profile.php?id=61574322368908" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-rose-light hover:text-rose-light transition-colors" aria-label="Facebook">
              <i className="bi bi-facebook text-sm" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-rose-light hover:text-rose-light transition-colors" aria-label="Instagram">
              <i className="bi bi-instagram text-sm" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-rose-light hover:text-rose-light transition-colors" aria-label="TikTok">
              <i className="bi bi-tiktok text-sm" />
            </a>
            <a href="#" className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-rose-light hover:text-rose-light transition-colors" aria-label="LinkedIn">
              <i className="bi bi-linkedin text-sm" />
            </a>
            <a href="https://wa.me/22901463731276" target="_blank" rel="noopener noreferrer"
              className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center hover:border-rose-light hover:text-rose-light transition-colors" aria-label="WhatsApp">
              <i className="bi bi-whatsapp text-sm" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-medium tracking-widest uppercase text-or mb-5">Navigation</h3>
          <ul className="space-y-3">
            {[['/', 'Accueil'],['/boutique','Boutique'],['/about','À propos'],['/blog','Blog'],['/contact','Contact']].map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="text-sm text-white/50 hover:text-white transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-medium tracking-widest uppercase text-or mb-5">Contact</h3>
          <ul className="space-y-3 text-sm text-white/50">
            <li className="flex items-center gap-2">
              <i className="bi bi-whatsapp text-rose-light" />
              <a href="https://wa.me/22901463731276" className="hover:text-white transition-colors">+229 01 46 37 31 76</a>
            </li>
            <li className="flex items-center gap-2">
              <i className="bi bi-envelope text-rose-light" />
              <a href="mailto:harmohlb01@gmail.com" className="hover:text-white transition-colors">harmohlb01@gmail.com</a>
            </li>
            <li className="flex items-center gap-2">
              <i className="bi bi-geo-alt text-rose-light" />
              <span>Cotonou &amp; Parakou, Bénin</span>
            </li>
          </ul>
          <div className="mt-6 space-y-2">
            <Link href="/cgv" className="block text-xs text-white/30 hover:text-white/60 transition-colors">Conditions générales de vente</Link>
            <Link href="/confidentialite" className="block text-xs text-white/30 hover:text-white/60 transition-colors">Politique de confidentialité</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-6 py-5 text-center">
        <p className="text-xs text-white/25">
          © {new Date().getFullYear()} Softlife Féminin — SemHarmo Business · Cotonou, Bénin
        </p>
      </div>
    </footer>
  )
}
