// src/app/page.tsx
import Link from 'next/link'
import { getFeaturedProducts } from '@/lib/products'
import { ProductCard } from '@/components/shop/ProductCard'
import { formatPrice } from '@/lib/utils'

export default function HomePage() {
  const products = getFeaturedProducts()

  return (
    <>
      {/* HERO SPLIT */}
      <section className="min-h-[92vh] grid md:grid-cols-2">
        <div className="bg-encre relative flex flex-col justify-between p-10 md:p-16 overflow-hidden min-h-[60vh] md:min-h-0">
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-rose/10 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-or/8 blur-3xl pointer-events-none" />
          <div>
            <p className="text-xs tracking-widest uppercase text-or mb-2">SemHarmo Business</p>
            <h1 className="font-display text-5xl md:text-6xl font-light text-creme leading-tight">
              Softlife<br/>
              <em className="text-rose-light not-italic">Féminin</em>
            </h1>
          </div>
          <div className="my-8 md:my-0 flex-1 flex items-center justify-center">
            <div className="w-56 h-56 md:w-72 md:h-72 rounded-full bg-rose/15 border border-rose/20 flex flex-col items-center justify-center gap-3">
              <i className="bi bi-stars text-rose-light text-5xl" />
              <span className="text-white/40 text-xs tracking-widest uppercase">Photo produit</span>
            </div>
          </div>
          <div>
            <p className="text-creme/70 text-base leading-relaxed max-w-xs">
              Des serviettes réutilisables douces sur votre peau, douces pour la planète.
            </p>
            <div className="mt-4 h-px w-16 bg-rose" />
          </div>
        </div>

        <div className="bg-creme flex flex-col justify-center p-10 md:p-16">
          <p className="text-xs tracking-widest uppercase text-gris mb-3">Nouveau</p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-encre leading-tight mb-6">
            Le confort<br/><span className="text-rose">réinventé</span>
          </h2>
          <p className="text-gris leading-relaxed mb-8 max-w-sm">
            Jusqu'à 5 ans de protection, sans déchets, sans compromis sur le confort.
            Fabriquées en coton bio, livrées chez vous en Afrique de l'Ouest.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link href="/boutique" className="bg-rose text-white text-sm font-medium px-8 py-3.5 rounded-full hover:bg-rose-dark transition-colors text-center">
              Découvrir la boutique
            </Link>
            <Link href="/boutique#pack-decouverte" className="border border-encre text-encre text-sm font-medium px-8 py-3.5 rounded-full hover:bg-encre hover:text-creme transition-colors text-center">
              Pack Découverte
            </Link>
          </div>

          <div className="mt-8 bg-rose/8 border border-rose/20 rounded-2xl p-5">
            <p className="text-xs tracking-widest uppercase text-rose mb-1">Offre de lancement</p>
            <p className="font-display text-2xl font-light text-encre">
              Code <strong className="font-medium">BIENVENUE15</strong>
            </p>
            <p className="text-sm text-gris mt-1">15% de réduction sur votre première commande</p>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-4 border-t border-rose-pale pt-8">
            {[
              { label: 'Durée de vie', value: '5 ans' },
              { label: 'Pays livrés', value: '8' },
              { label: 'Satisfaction', value: '100%' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="font-display text-2xl font-light text-rose">{s.value}</div>
                <div className="text-xs text-gris mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AVANTAGES */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-xs tracking-widest uppercase text-or mb-3">Pourquoi Softlife ?</p>
          <h2 className="font-display text-4xl font-light text-encre">Le choix qui change tout</h2>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: 'bi-leaf', title: 'Écologique', desc: "Évitez jusqu'à 200 serviettes jetables par an." },
            { icon: 'bi-piggy-bank', title: 'Économique', desc: 'Amorti en 2 mois. Gratuit les 5 ans suivants.' },
            { icon: 'bi-heart', title: 'Doux & sain', desc: 'Coton bio, sans parfum, sans irritants.' },
            { icon: 'bi-truck', title: 'Livraison rapide', desc: "8 pays en Afrique de l'Ouest couverts." },
          ].map((a) => (
            <div key={a.title} className="text-center p-6 rounded-2xl bg-white border border-rose-pale hover:shadow-sm transition-shadow">
              <i className={`bi ${a.icon} text-rose text-3xl mb-4 block`} />
              <h3 className="font-display text-lg font-medium text-encre mb-2">{a.title}</h3>
              <p className="text-sm text-gris leading-relaxed">{a.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUITS EN VEDETTE */}
      <section className="bg-encre py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs tracking-widest uppercase text-or mb-3">Notre sélection</p>
              <h2 className="font-display text-4xl font-light text-creme">Nos produits</h2>
            </div>
            <Link href="/boutique" className="text-sm text-white/50 hover:text-white transition-colors flex items-center gap-1">
              Voir tout <i className="bi bi-arrow-right" />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} dark />
            ))}
          </div>
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <p className="text-xs tracking-widest uppercase text-or mb-3">Elles témoignent</p>
        <h2 className="font-display text-4xl font-light text-encre mb-14">Ce qu'elles en disent</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: 'Aïssa K.', city: 'Cotonou', text: '"Je ne reviendrai jamais aux jetables. Le confort est incomparable."' },
            { name: 'Fatou D.', city: 'Dakar', text: '"Livrée en 5 jours au Sénégal. Qualité au rendez-vous !"' },
            { name: 'Mariam O.', city: 'Abidjan', text: '"Le Pack Découverte m\'a convaincue dès le premier cycle."' },
          ].map((t) => (
            <div key={t.name} className="bg-white border border-rose-pale rounded-2xl p-6 text-left">
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map(i => <i key={i} className="bi bi-star-fill text-or text-sm" />)}
              </div>
              <p className="text-sm text-gris leading-relaxed italic mb-4">{t.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-rose-pale flex items-center justify-center text-rose text-xs font-medium">
                  {t.name[0]}
                </div>
                <div>
                  <p className="text-sm font-medium text-encre">{t.name}</p>
                  <p className="text-xs text-gris">{t.city}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="bg-rose py-20">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-display text-5xl font-light text-white mb-4">Prête à faire le switch ?</h2>
          <p className="text-white/70 mb-8">Commencez avec le Pack Découverte et testez pendant un cycle complet.</p>
          <Link href="/boutique/pack-decouverte-3-serviettes"
            className="inline-block bg-white text-rose text-sm font-medium px-10 py-4 rounded-full hover:bg-creme transition-colors">
            Commander le Pack Découverte — {formatPrice(8500)}
          </Link>
        </div>
      </section>
    </>
  )
}
