// src/app/blog/[slug]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { BLOG_POSTS, getPostBySlug } from '@/lib/blog'

interface Props { params: { slug: string } }

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug(params.slug)
  if (!post) return {}
  return { title: post.title, description: post.excerpt }
}

export default function BlogPostPage({ params }: Props) {
  const post = getPostBySlug(params.slug)
  if (!post) notFound()

  const other = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2)

  // Convertir markdown basique en HTML
  function renderContent(md: string) {
  return md
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/^(\d+\.\s.+)$/gm, '<li>$1</li>')
    .split('\n\n')
    .map((block) =>
      block.startsWith('<h') || block.startsWith('<li')
        ? block
        : `<p>${block.replace(/\n/g, '<br/>')}</p>`
    )
    .join('\n')
}

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-gris mb-8">
        <Link href="/" className="hover:text-encre transition-colors">Accueil</Link>
        <span>/</span>
        <Link href="/blog" className="hover:text-encre transition-colors">Blog</Link>
        <span>/</span>
        <span className="text-encre">{post.title.slice(0, 40)}…</span>
      </div>

      {/* Header article */}
      <div className="mb-10">
        <p className="text-xs tracking-widest uppercase text-or mb-3">
          {post.publishedAt?.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-light text-encre leading-tight mb-6">
          {post.title}
        </h1>
        <p className="text-gris text-lg leading-relaxed">{post.excerpt}</p>
      </div>

      {/* Image principale */}
      <div className="aspect-video rounded-3xl overflow-hidden bg-rose-pale/30 mb-12 relative">
        {post.image ? (
          <Image src={post.image} alt={post.title} fill className="object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gris text-sm">
            Illustration de l'article
          </div>
        )}
      </div>

      {/* Contenu */}
      <article
        className="prose-softlife max-w-none"
        dangerouslySetInnerHTML={{ __html: renderContent(post.content) }}
      />

      {/* CTA */}
      <div className="mt-16 bg-rose rounded-3xl p-10 text-center">
        <h2 className="font-display text-3xl font-light text-white mb-3">
          Prête à essayer ?
        </h2>
        <p className="text-white/70 mb-6">Commencez avec notre Pack Découverte.</p>
        <Link href="/boutique/pack-decouverte-3-serviettes"
          className="inline-block bg-white text-rose text-sm font-medium px-8 py-3.5 rounded-full hover:bg-creme transition-colors">
          Voir le Pack Découverte
        </Link>
      </div>

      {/* Articles liés */}
      {other.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-light text-encre mb-8">À lire aussi</h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {other.map((p) => (
              <Link key={p.id} href={`/blog/${p.slug}`}
                className="group bg-white border border-rose-pale rounded-2xl p-6 hover:shadow-sm transition-shadow">
                <h3 className="font-display text-lg font-medium text-encre mb-2 group-hover:text-rose transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-gris">{p.excerpt.slice(0, 100)}…</p>
                <span className="inline-block mt-3 text-xs text-rose">Lire &rarr;</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
