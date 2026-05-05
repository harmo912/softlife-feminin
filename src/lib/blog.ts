// src/lib/blog.ts
import { BlogPost } from '@/types'

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog_001',
    title: 'Pourquoi passer aux serviettes réutilisables ?',
    slug: 'pourquoi-passer-serviettes-reutilisables',
    excerpt:
      'Une femme utilise en moyenne 12 000 serviettes jetables dans sa vie. Voici pourquoi (et comment) faire le switch sans stress.',
    content: `
## Le coût caché des serviettes jetables

En Afrique de l'Ouest, une femme dépense entre 12 000 et 24 000 XOF par an en protections hygiéniques jetables. Sur une vie reproductive de 35 ans, cela représente jusqu'à **840 000 XOF** — soit le prix d'une moto.

## L'impact environnemental

Une serviette jetable met **500 ans** pour se décomposer. En plastique à 90%, elle rejoint les rivières, les plages et les sols. En choisissant une serviette réutilisable, vous évitez en moyenne **200 serviettes jetables par an**.

## Le confort avant tout

Contrairement aux idées reçues, les serviettes réutilisables en coton bio sont **plus douces**, sans parfums irritants, sans gel synthétique. Elles s'adaptent à votre morphologie et restent en place grâce aux ailettes à bouton-pression.

## Comment entretenir sa serviette ?

1. Rincer à l'eau froide après utilisation
2. Faire tremper 30 min dans de l'eau froide avec du sel
3. Laver en machine à 30°C ou à la main
4. Sécher à l'air libre

Simple, non ?
    `.trim(),
    image: '/images/blog/article-1.jpg',
    publishedAt: new Date('2024-03-15'),
  },
  {
    id: 'blog_002',
    title: '5 mythes sur les serviettes réutilisables — démentis',
    slug: '5-mythes-serviettes-reutilisables',
    excerpt:
      '"C\'est sale." "Ça fuit." "C\'est compliqué." Nous répondons aux 5 idées reçues qui freinent encore trop de femmes.',
    content: `
## Mythe 1 : "C'est sale"

Non. Une serviette correctement lavée à 30°C est **plus hygiénique** qu'une serviette jetable laissée trop longtemps. Le coton n'accumule pas les bactéries si vous le rincez rapidement après utilisation.

## Mythe 2 : "Ça fuit forcément"

Nos serviettes possèdent une couche imperméable intégrée en PUL (polyuréthane laminé), la même matière utilisée dans les couches lavables pour bébés. Zéro fuite, zéro tache.

## Mythe 3 : "C'est trop cher"

Un investissement initial de 10 500 XOF (Pack Découverte) s'amortit en **moins de 2 mois** d'utilisation versus le jetable. Ensuite, c'est gratuit pendant 5 ans.

## Mythe 4 : "Ça ne tient pas en place"

Nos serviettes ont des ailettes à bouton-pression qui s'accrochent au sous-vêtement. Elles bougent aussi peu qu'une serviette jetable adhésive — sans la colle irritante.

## Mythe 5 : "C'est réservé aux femmes écolo"

Les serviettes réutilisables sont adoptées par des femmes de tous profils : étudiantes qui veulent économiser, mamans, professionnelles, femmes sensibles aux allergies. La seule chose qu'elles ont en commun : elles ne reviennent pas en arrière.
    `.trim(),
    image: '/images/blog/article-2.jpg',
    publishedAt: new Date('2024-04-02'),
  },
  {
    id: 'blog_003',
    title: 'Quelle taille de serviette choisir ?',
    slug: 'quelle-taille-serviette-choisir',
    excerpt:
      'S, M, L ou XL ? Notre guide complet pour choisir la bonne taille selon votre morphologie et votre flux.',
    content: `
## Comment choisir sa taille ?

Le bon choix dépend de deux facteurs : **votre morphologie** (tour de bassin) et **l'intensité de votre flux**.

### Taille S — Tour de bassin < 80 cm
Idéale pour les flux légers ou les jours de fin de cycle. Longueur : 22 cm.

### Taille M — Tour de bassin 80–95 cm
La taille la plus polyvalente. Couvre les flux modérés. Longueur : 26 cm. **Recommandée pour commencer.**

### Taille L — Tour de bassin 95–110 cm
Pour les flux abondants ou les personnes à morphologie généreuse. Longueur : 28 cm.

### Taille XL — Tour de bassin > 110 cm
Pour les flux très abondants ou les premières 48h du cycle. Longueur : 32 cm. Correspond à notre Serviette Nuit Intégrale.

## Mon conseil

Si vous hésitez entre deux tailles, prenez la **plus grande**. Vous aurez plus de confort et de sécurité. Notre Pack Découverte inclut plusieurs tailles — parfait pour tester.
    `.trim(),
    image: '/images/blog/article-3.jpg',
    publishedAt: new Date('2024-04-20'),
  },
]

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}
