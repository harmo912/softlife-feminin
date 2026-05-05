# Guide : Ajouter vos images produits

## Étape 1 — Créer un compte Cloudinary (gratuit)

1. Allez sur https://cloudinary.com
2. Créez un compte gratuit
3. Dans le dashboard, notez votre **Cloud Name**
4. Dans Settings > Access Keys, copiez votre **API Key** et **API Secret**
5. Ajoutez dans votre `.env` :
```
CLOUDINARY_CLOUD_NAME=votre-cloud-name
CLOUDINARY_API_KEY=votre-api-key
CLOUDINARY_API_SECRET=votre-api-secret
```

## Étape 2 — Uploader vos photos

1. Dans Cloudinary, allez dans **Media Library**
2. Créez un dossier `softlife/products`
3. Uploadez vos photos (format recommandé : JPG, 800x800px minimum, fond épuré)
4. Copiez l'URL de chaque image (format : `https://res.cloudinary.com/CLOUD_NAME/image/upload/v.../photo.jpg`)

## Étape 3 — Mettre à jour les URLs dans le code

Ouvrez `src/lib/products.ts` et remplacez les tableaux `images: []` :

```typescript
// Avant (placeholder)
images: [],

// Après (avec vos vraies URLs Cloudinary)
images: [
  'https://res.cloudinary.com/votre-cloud/image/upload/v123/softlife/products/confort-jour-1.jpg',
  'https://res.cloudinary.com/votre-cloud/image/upload/v123/softlife/products/confort-jour-2.jpg',
],
```

## Photos nécessaires par produit

### Serviette Confort Jour
- `confort-jour-1.jpg` — Vue principale (face)
- `confort-jour-2.jpg` — Détail texture / gros plan

### Serviette Nuit Intégrale
- `nuit-integrale-1.jpg` — Vue principale
- `nuit-integrale-2.jpg` — Détail longueur / comparaison

### Pack Découverte
- `pack-decouverte-1.jpg` — Les 3 serviettes ensemble
- `pack-decouverte-2.jpg` — Vue emballage / présentation

### Page À propos
- `fondateur.jpg` — Photo fondateur ou équipe

### Blog (3 articles)
- `article-1.jpg` — Serviette réutilisable en contexte naturel
- `article-2.jpg` — Comparaison jetable vs réutilisable
- `article-3.jpg` — Guide des tailles / femme souriante

## Conseils photo

- Fond : blanc cassé ou bois clair (cohérent avec la palette crème du site)
- Lumière : naturelle, pas de flash direct
- Format carré (1:1) pour les produits, 16:9 pour le blog
- Taille minimum : 800px × 800px
- Pas besoin d'un photographe professionnel — un smartphone récent suffit avec une bonne lumière
