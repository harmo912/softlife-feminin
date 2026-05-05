// src/app/layout.tsx
import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Providers } from '@/components/layout/Providers'

export const metadata: Metadata = {
  title: {
    default: 'Softlife Féminin — Serviettes hygiéniques réutilisables',
    template: '%s | Softlife Féminin',
  },
  description:
    "Softlife Féminin — Des serviettes hygiéniques réutilisables douces, durables et économiques. Livraison en Afrique de l'Ouest. SemHarmo Business, Bénin.",
  keywords: ['serviettes réutilisables', 'hygiène féminine', 'Bénin', "Afrique de l'Ouest", 'eco', 'coton bio'],
  authors: [{ name: 'SemHarmo Business' }],
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: 'https://softlife-feminin.com',
    siteName: 'Softlife Féminin',
    title: 'Softlife Féminin — Serviettes hygiéniques réutilisables',
    description: 'Des serviettes hygiéniques réutilisables douces, durables et économiques.',
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '32x32' },
      { url: '/favicon.svg', type: 'image/svg+xml' },
    ],
    apple: '/favicon-180.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
        />
      </head>
      <body>
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
