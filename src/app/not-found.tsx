// src/app/not-found.tsx
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <div className="font-display text-[8rem] font-light text-rose-pale leading-none mb-4">404</div>
        <h1 className="font-display text-3xl font-light text-encre mb-3">Page introuvable</h1>
        <p className="text-gris mb-8 leading-relaxed">La page que vous cherchez n'existe pas ou a été déplacée.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="bg-rose text-white text-sm font-medium px-8 py-3.5 rounded-full hover:bg-rose-dark transition-colors flex items-center justify-center gap-2">
            <i className="bi bi-house" /> Retour à l'accueil
          </Link>
          <Link href="/boutique" className="border border-encre text-encre text-sm font-medium px-8 py-3.5 rounded-full hover:bg-encre hover:text-creme transition-colors flex items-center justify-center gap-2">
            <i className="bi bi-bag" /> Voir la boutique
          </Link>
        </div>
      </div>
    </div>
  )
}
