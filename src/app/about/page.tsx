// src/app/about/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'À propos',
  description: "Découvrez l'histoire de Softlife Féminin et notre mission pour une hygiène féminine plus durable.",
}

export default function AboutPage() {
  return (
    <>
      <section className="bg-encre py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-rose/10 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-or/8 blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto text-center relative">
          <p className="text-xs tracking-widest uppercase text-or mb-4">Notre histoire</p>
          <h1 className="font-display text-5xl md:text-6xl font-light text-creme leading-tight">
            Une marque née<br /><em className="text-rose-light not-italic">d'une conviction</em>
          </h1>
          <p className="mt-6 text-white/60 leading-relaxed max-w-xl mx-auto">
            Softlife Féminin est né de la conviction que chaque femme mérite une hygiène
            confortable, accessible et respectueuse de l'environnement.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-rose-pale/30 relative flex items-center justify-center">
              <div className="text-center">
                <i className="bi bi-person-circle text-rose/30 text-8xl block mb-4" />
                <p className="text-gris text-sm">Photo fondateur à venir</p>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 bg-encre text-creme rounded-2xl p-5 shadow-xl">
              <p className="font-display text-3xl font-light">5</p>
              <p className="text-xs text-white/50 tracking-wide">ans de durée de vie</p>
            </div>
          </div>

          <div>
            <p className="text-xs tracking-widest uppercase text-or mb-4">Notre mission</p>
            <h2 className="font-display text-4xl font-light text-encre mb-6 leading-tight">
              Révolutionner l'hygiène féminine en Afrique
            </h2>
            <div className="space-y-4 text-gris leading-relaxed">
              <p>En Afrique de l'Ouest, des millions de femmes font face au coût répété des protections jetables et à leur impact environnemental sur nos territoires.</p>
              <p><strong className="text-encre">Softlife Féminin</strong> propose une alternative concrète : des serviettes hygiéniques réutilisables soigneusement sélectionnées, testées pour leur douceur et leur efficacité, livrées dans 8 pays d'Afrique de l'Ouest.</p>
              <p>Chaque serviette représente jusqu'à 200 jetables évitées. Sur 5 ans, c'est une économie réelle pour votre budget et un geste concret pour notre planète.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-creme border-y border-rose-pale py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="text-xs tracking-widest uppercase text-or mb-3">Ce en quoi nous croyons</p>
            <h2 className="font-display text-4xl font-light text-encre">Nos valeurs</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { icon: 'bi-people', title: 'Accessibilité', desc: "Un investissement initial qui s'amortit rapidement. Votre santé ne devrait pas être un luxe.", num: '01' },
              { icon: 'bi-recycle', title: 'Durabilité', desc: 'Des produits sélectionnés pour durer. Moins de déchets, plus de conscience.', num: '02' },
              { icon: 'bi-heart', title: 'Confort', desc: 'Coton bio, sans parfum ni gel synthétique. Doux sur votre peau, chaque jour.', num: '03' },
              { icon: 'bi-shield-check', title: 'Confiance', desc: 'Sélection rigoureuse auprès de fournisseurs certifiés. Qualité vérifiée avant livraison.', num: '04' },
              { icon: 'bi-chat-dots', title: 'Proximité', desc: 'Une équipe joignable sur WhatsApp. Nous répondons dans la journée, toujours.', num: '05' },
              { icon: 'bi-globe-americas', title: 'Engagement', desc: "Livraison dans 8 pays. Parce que chaque femme d'Afrique de l'Ouest mérite d'y accéder.", num: '06' },
            ].map((v) => (
              <div key={v.title} className="bg-white rounded-2xl border border-rose-pale p-7">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-rose-pale flex items-center justify-center">
                    <i className={`bi ${v.icon} text-rose`} />
                  </div>
                  <span className="font-display text-2xl font-light text-rose/30">{v.num}</span>
                </div>
                <h3 className="font-display text-xl font-medium text-encre mb-3">{v.title}</h3>
                <p className="text-sm text-gris leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <p className="text-xs tracking-widest uppercase text-or mb-3">L'entreprise</p>
        <h2 className="font-display text-4xl font-light text-encre mb-6">SemHarmo Business</h2>
        <p className="text-gris leading-relaxed mb-8 max-w-xl mx-auto">
          Softlife Féminin est une marque de <strong className="text-encre">SemHarmo Business</strong>,
          entreprise basée à Cotonou et Parakou, au Bénin, spécialisée dans le e-commerce de qualité.
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gris">
          <span className="flex items-center gap-1"><i className="bi bi-geo-alt text-rose" /> Cotonou & Parakou, Bénin</span>
          <span className="flex items-center gap-1"><i className="bi bi-envelope text-rose" />
            <a href="mailto:harmohlb01@gmail.com" className="hover:text-rose transition-colors">harmohlb01@gmail.com</a>
          </span>
          <span className="flex items-center gap-1"><i className="bi bi-whatsapp text-rose" />
            <a href="https://wa.me/22901463731276" className="hover:text-rose transition-colors">+229 01 46 37 31 76</a>
          </span>
        </div>
      </section>

      <section className="bg-rose py-16">
        <div className="max-w-2xl mx-auto px-6 text-center">
          <h2 className="font-display text-4xl font-light text-white mb-4">Rejoignez le mouvement</h2>
          <p className="text-white/70 mb-8">Commencez votre transition avec notre Pack Découverte.</p>
          <Link href="/boutique" className="inline-block bg-white text-rose text-sm font-medium px-10 py-4 rounded-full hover:bg-creme transition-colors">
            Découvrir la boutique
          </Link>
        </div>
      </section>
    </>
  )
}
