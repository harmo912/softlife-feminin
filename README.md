# Softlife Féminin — E-commerce Next.js 14

Site e-commerce complet pour **Softlife Féminin**, marque de serviettes hygiéniques réutilisables by SemHarmo Business.

---

## Stack technique

| Outil | Usage |
|-------|-------|
| Next.js 14 (App Router) | Framework frontend |
| TypeScript | Typage |
| Tailwind CSS | Styles |
| Prisma + PostgreSQL | Base de données |
| NextAuth.js | Authentification |
| Zustand | Gestion panier |
| Nodemailer | Emails transactionnels |
| FedaPay | Paiement mobile money |
| Cloudinary | Hébergement images |
| Vercel + Railway | Déploiement |

---

## Structure des pages

```
/                        → Page d'accueil (hero split, produits en vedette)
/boutique                → Liste de tous les produits
/boutique/[slug]         → Page produit détaillée
/panier                  → Panier d'achat (persistant)
/checkout                → Formulaire de commande
/checkout/confirmation   → Page de confirmation post-commande
/about                   → À propos de Softlife Féminin
/blog                    → Liste des articles
/blog/[slug]             → Article de blog
/contact                 → Formulaire de contact
/compte                  → Connexion / Inscription
/compte/dashboard        → Espace client (commandes)
/cgv                     → Conditions Générales de Vente
/confidentialite         → Politique de confidentialité
```

## API Routes

```
POST /api/auth/register        → Création de compte
POST /api/orders               → Création de commande + email confirmation
POST /api/contact              → Formulaire de contact
POST /api/promo                → Validation code promo
GET|POST /api/auth/[...nextauth] → NextAuth session
```

---

## Installation

### 1. Cloner et installer les dépendances

```bash
npm install
```

### 2. Configurer les variables d'environnement

```bash
cp .env.example .env
# Remplir les valeurs dans .env
```

Variables obligatoires :
- `DATABASE_URL` — URL PostgreSQL (Railway en production)
- `NEXTAUTH_SECRET` — Clé secrète aléatoire (`openssl rand -base64 32`)
- `NEXTAUTH_URL` — URL du site (`http://localhost:3000` en dev)
- `FEDAPAY_PUBLIC_KEY` + `FEDAPAY_SECRET_KEY` — Clés FedaPay
- `CLOUDINARY_CLOUD_NAME` + clés — Pour les images produits
- `SMTP_USER` + `SMTP_PASS` — Gmail avec mot de passe d'application

### 3. Base de données

```bash
npx prisma db push      # Créer les tables
npx prisma db seed      # Insérer les données de base (produits + code promo)
```

### 4. Lancer en développement

```bash
npm run dev
# → http://localhost:3000
```

---

## Déploiement (Vercel + Railway)

### Base de données (Railway)
1. Créer un projet PostgreSQL sur [railway.app](https://railway.app)
2. Copier l'URL de connexion dans `DATABASE_URL`

### Site (Vercel)
1. Pousser le code sur GitHub
2. Importer sur [vercel.com](https://vercel.com)
3. Configurer toutes les variables d'environnement
4. Déployer

---

## Ce qu'il reste à faire

- [ ] Ajouter les vraies photos produits dans Cloudinary
- [ ] Confirmer les prix définitifs
- [ ] Renseigner les URLs Instagram, TikTok, LinkedIn
- [ ] Choisir et configurer le nom de domaine
- [ ] Ouvrir le compte FedaPay et récupérer les clés API
- [ ] Configurer Gmail SMTP (mot de passe d'application)
- [ ] Définir la politique de livraison (délais, frais)
- [ ] Créer le compte Cloudinary

---

## Contacts

- **WhatsApp :** +229 01 46 37 31 76
- **Email :** harmohlb01@gmail.com
- **Facebook :** https://www.facebook.com/profile.php?id=61574322368908
