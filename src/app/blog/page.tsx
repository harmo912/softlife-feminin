// src/app/blog/page.tsx
import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { BLOG_POSTS } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Conseils, guides et informations sur les serviettes hygiéniques réutilisables par Softlife Féminin.',
}

export default function BlogPage() {
  const published = BLOG_POSTS.filter((p) => p.publishedAt)

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-xs tracking-widest uppercase text-or mb-3">Conseils & guides</p>
        <h1 className="font-display text-5xl font-light text-encre mb-4">Le Blog</h1>
        <p className="text-gris max-w-lg mx-auto leading-relaxed">
          Tout ce que vous devez savoir sur les serviettes réutilisables, l'hygiène féminine
          durable et nos conseils pratiques.
        </p>
      </div>

      {/* Article en vedette */}
      {published[0] && (
        <Link href={`/blog/${published[0].slug}`} className="group block mb-12">
          <div className="grid md:grid-cols-2 gap-8 bg-encre rounded-3xl overflow-hidden">
            <div className="relative aspect-video md:aspect-auto bg-rose/20">
              {published[0].image ? (
                <Image src={published[0].image} alt={published[0].title} fill className="object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-white/30 text-sm min-h-[200px]">Photo article</div>
              )}
              <div className="absolute top-4 left-4">
                <span className="bg-rose text-white text-xs font-medium px-3 py-1 rounded-full">À la une</span>
              </div>
            </div>
            <div className="p-8 md:p-10 flex flex-col justify-center">
              <p className="text-xs tracking-widest uppercase text-or mb-4">
                {published[0].publishedAt?.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
              <h2 className="font-display text-3xl font-light text-creme mb-4 group-hover:text-rose-light transition-colors leading-tight">
                {published[0].title}
              </h2>
              <p className="text-white/50 text-sm leading-relaxed mb-6">{published[0].excerpt}</p>
              <span className="text-rose-light text-sm">Lire l'article &rarr;</span>
            </div>
          </div>
        </Link>
      )}

      {/* Autres articles */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {published.slice(1).map((post) => (
          <Link key={post.id} href={`/blog/${post.slug}`} className="group bg-white border border-rose-pale rounded-2xl overflow-hidden hover:shadow-sm transition-shadow">
            <div className="relative aspect-video bg-rose-pale/40">
              {post.image ? (
                <Image src={post.image} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gris text-sm">Photo</div>
              )}
            </div>
            <div className="p-6">
              <p className="text-xs text-gris mb-2">
                {post.publishedAt?.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
              <h3 className="font-display text-xl font-medium text-encre mb-2 group-hover:text-rose transition-colors leading-snug">
                {post.title}
              </h3>
              <p className="text-sm text-gris leading-relaxed">{post.excerpt}</p>
              <span className="inline-block mt-4 text-xs text-rose font-medium">Lire &rarr;</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
