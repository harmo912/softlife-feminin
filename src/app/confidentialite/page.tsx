// src/app/confidentialite/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité de Softlife Féminin — Protection de vos données personnelles.',
}

export default function ConfidentialitePage() {
  const sections = [
    {
      title: 'Qui sommes-nous ?',
      content: `SemHarmo Business, éditeur de Softlife Féminin (softlife-feminin.com), est responsable du traitement de vos données personnelles. Contact : harmohlb01@gmail.com — +229 01 46 37 31 76 — Cotonou, Bénin.`,
    },
    {
      title: 'Données collectées',
      content: `Nous collectons les données que vous nous fournissez lors de :\n• La création d'un compte (nom, email, mot de passe hashé)\n• Le passage d'une commande (nom, email, téléphone, adresse de livraison)\n• L'envoi d'un message via le formulaire de contact (nom, email, message)\n\nNous ne collectons pas de données bancaires. Les paiements sont traités directement par FedaPay, selon sa propre politique de confidentialité.`,
    },
    {
      title: 'Utilisation des données',
      content: `Vos données sont utilisées pour :\n• Traiter et livrer vos commandes\n• Vous envoyer des confirmations et mises à jour de commande\n• Gérer votre compte client\n• Répondre à vos demandes de contact\n• Améliorer nos services (données agrégées et anonymisées)\n\nNous n'utilisons pas vos données à des fins de prospection sans votre consentement explicite.`,
    },
    {
      title: 'Durée de conservation',
      content: `Vos données personnelles sont conservées :\n• Données de compte : jusqu'à suppression du compte ou 3 ans d'inactivité\n• Données de commande : 5 ans (obligations comptables et légales)\n• Messages de contact : 2 ans\n\nPassé ces délais, vos données sont supprimées ou anonymisées.`,
    },
    {
      title: 'Partage avec des tiers',
      content: `Nous ne vendons jamais vos données personnelles. Nous pouvons les partager avec :\n• FedaPay : pour le traitement sécurisé des paiements\n• Nos partenaires de livraison : uniquement les informations nécessaires à l'expédition\n• Nos hébergeurs (Vercel, Railway) : dans le cadre de l'opération du site\n\nCes prestataires agissent en qualité de sous-traitants et sont contractuellement tenus de protéger vos données.`,
    },
    {
      title: 'Cookies',
      content: `Notre site utilise des cookies essentiels au fonctionnement (session d'authentification, panier). Nous n'utilisons pas de cookies publicitaires ou de tracking tiers. Vous pouvez désactiver les cookies dans les paramètres de votre navigateur, bien que certaines fonctionnalités puissent ne plus fonctionner correctement.`,
    },
    {
      title: 'Vos droits',
      content: `Vous disposez des droits suivants sur vos données :\n• Droit d'accès : obtenir une copie de vos données\n• Droit de rectification : corriger des données inexactes\n• Droit à l'effacement : demander la suppression de vos données\n• Droit à la portabilité : recevoir vos données dans un format structuré\n• Droit d'opposition : vous opposer à certains traitements\n\nPour exercer ces droits, contactez-nous à harmohlb01@gmail.com. Nous répondrons dans un délai de 30 jours.`,
    },
    {
      title: 'Sécurité',
      content: `Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données : connexion HTTPS, mots de passe hashés (bcrypt), accès limité aux données selon les rôles. En cas de violation de données, nous vous en informerons dans les meilleurs délais.`,
    },
    {
      title: 'Modifications',
      content: `Cette politique peut être mise à jour. Toute modification significative vous sera notifiée par email. Nous vous encourageons à consulter régulièrement cette page. Date de dernière mise à jour : Janvier 2025.`,
    },
  ]

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-12">
        <p className="text-xs tracking-widest uppercase text-or mb-3">Légal</p>
        <h1 className="font-display text-4xl font-light text-encre mb-2">Politique de confidentialité</h1>
        <p className="text-sm text-gris">
          SemHarmo Business — Softlife Féminin · Dernière mise à jour : Janvier 2025
        </p>
      </div>

      <div className="space-y-10">
        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="font-display text-xl font-medium text-encre mb-3">{s.title}</h2>
            <div className="h-px bg-rose-pale mb-4" />
            <div className="text-gris text-sm leading-relaxed whitespace-pre-line">{s.content}</div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-encre rounded-2xl p-8 text-center">
        <p className="text-white/60 text-sm mb-4">Questions sur vos données personnelles ?</p>
        <a href="mailto:harmohlb01@gmail.com" className="text-rose-light text-sm hover:text-white transition-colors">
          harmohlb01@gmail.com
        </a>
      </div>
    </div>
  )
}
