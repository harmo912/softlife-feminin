// src/app/cgv/page.tsx
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente',
  description: 'Conditions générales de vente de Softlife Féminin — SemHarmo Business.',
}

export default function CGVPage() {
  const sections = [
    {
      title: 'Article 1 — Identification du vendeur',
      content: `Les présentes conditions générales de vente régissent les relations contractuelles entre SemHarmo Business (ci-après "le Vendeur"), entreprise basée à Cotonou et Parakou, Bénin, joignable à l'adresse email harmohlb01@gmail.com et au +229 01 46 37 31 76, et toute personne physique ou morale (ci-après "le Client") souhaitant procéder à un achat via le site softlife-feminin.com.`,
    },
    {
      title: 'Article 2 — Produits',
      content: `Les produits proposés à la vente sont des serviettes hygiéniques réutilisables sélectionnées auprès de fournisseurs qualifiés. Les photographies et descriptions des produits sont aussi précises que possible. Le Vendeur se réserve le droit de modifier le catalogue à tout moment. Les prix sont indiqués en Francs CFA (XOF) toutes taxes comprises.`,
    },
    {
      title: 'Article 3 — Commande',
      content: `La commande est ferme et définitive dès sa validation par le Client sur le site. Le Client recevra un email de confirmation récapitulant les articles commandés, le montant total et les modalités de paiement. Le Vendeur se réserve le droit d'annuler toute commande en cas de stock indisponible, en informant le Client dans les plus brefs délais et en procédant au remboursement intégral si le paiement a été effectué.`,
    },
    {
      title: 'Article 4 — Prix et paiement',
      content: `Les prix sont exprimés en Francs CFA (XOF). Le paiement s'effectue via les modes suivants : Moov Money, MTN MoMo, Celtiis, virement bancaire. Le traitement est sécurisé par FedaPay. La commande ne sera traitée qu'après confirmation du paiement. Des codes promotionnels peuvent être appliqués dans les conditions définies lors de leur émission. Le code BIENVENUE15 offre 15% de réduction sur la première commande.`,
    },
    {
      title: 'Article 5 — Livraison',
      content: `Le Vendeur livre dans les pays suivants : Bénin, Togo, Burkina Faso, Côte d'Ivoire, Sénégal, Niger, Mali, Ghana. Les délais indicatifs sont : Bénin 2–3 jours ouvrés, autres pays 5–10 jours ouvrés. Les frais de livraison sont calculés selon le pays de destination et indiqués lors du passage de commande. La livraison au Bénin est offerte. Le Vendeur ne peut être tenu responsable des retards liés aux transporteurs ou aux services douaniers.`,
    },
    {
      title: 'Article 6 — Droit de rétractation et retours',
      content: `Le Client dispose d'un délai de 14 jours à compter de la réception de sa commande pour exercer son droit de rétractation, sans justification. Les produits retournés doivent être non utilisés, dans leur emballage d'origine et en parfait état. Les frais de retour sont à la charge du Client. Le remboursement sera effectué dans un délai de 14 jours suivant la réception du produit retourné. Les produits hygiéniques déballés ou utilisés ne peuvent être retournés pour des raisons sanitaires.`,
    },
    {
      title: 'Article 7 — Garanties',
      content: `Les produits bénéficient de la garantie légale de conformité. En cas de défaut de fabrication constaté à la livraison, le Client doit en informer le Vendeur dans les 48h par email ou WhatsApp. Le Vendeur procédera à l'échange du produit défectueux ou au remboursement selon la disponibilité du stock.`,
    },
    {
      title: 'Article 8 — Responsabilité',
      content: `La responsabilité du Vendeur ne peut être engagée en cas d'utilisation non conforme des produits. Les produits sont destinés à un usage adulte. Le Vendeur ne peut être tenu responsable des dommages indirects résultant de l'utilisation des produits.`,
    },
    {
      title: 'Article 9 — Données personnelles',
      content: `Les informations collectées lors de la commande sont nécessaires au traitement de celle-ci et à la livraison. Elles ne seront ni vendues ni transmises à des tiers sans consentement préalable du Client. Pour toute demande d'accès, de rectification ou de suppression de vos données, contactez-nous à harmohlb01@gmail.com. Consultez notre Politique de confidentialité pour plus de détails.`,
    },
    {
      title: 'Article 10 — Droit applicable',
      content: `Les présentes CGV sont soumises au droit béninois. Tout litige sera soumis à la compétence des tribunaux de Cotonou, Bénin. En cas de litige, une solution amiable sera recherchée avant toute action judiciaire.`,
    },
  ]

  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <div className="mb-12">
        <p className="text-xs tracking-widest uppercase text-or mb-3">Légal</p>
        <h1 className="font-display text-4xl font-light text-encre mb-2">Conditions Générales de Vente</h1>
        <p className="text-sm text-gris">
          SemHarmo Business — Softlife Féminin · Dernière mise à jour : Janvier 2025
        </p>
      </div>

      <div className="space-y-10">
        {sections.map((s) => (
          <div key={s.title}>
            <h2 className="font-display text-xl font-medium text-encre mb-3">{s.title}</h2>
            <div className="h-px bg-rose-pale mb-4" />
            <p className="text-gris text-sm leading-relaxed">{s.content}</p>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-encre rounded-2xl p-8 text-center">
        <p className="text-white/60 text-sm mb-4">Une question sur nos CGV ?</p>
        <a href="mailto:harmohlb01@gmail.com" className="text-rose-light text-sm hover:text-white transition-colors">
          harmohlb01@gmail.com
        </a>
      </div>
    </div>
  )
}
