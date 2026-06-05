# Mezanno IIIF Viewer

Un visualiseur de manifestes IIIF (International Image Interoperability Framework) ultra-rapide construit avec **React**, **TypeScript**, **Vite** et **Tailwind CSS**.

## ✨ Fonctionnalités

- **Barre d'outils compacte** : Les champs de saisie d'URL et de fichiers sont intégrés directement dans l'en-tête (Header) de l'application pour un gain de place vertical optimal.
- **Support des Manifestes IIIF** : Via l'intégration du composant open-source `@samvera/clover-iiif/viewer`.
- **Sources Multiples** :
  - **URL distante** : Visualisez n'importe quel manifeste IIIF via son lien web.
  - **Fichier local** : Importez un fichier `.json` directement depuis votre ordinateur.

## 🚀 Démarrage Rapide

### Prérequis

- Node.js (version 22+ recommandée)
- npm, yarn ou pnpm

### Installation

```bash
# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible (par défaut) sur `http://localhost:5173/`.

### Construction pour la production

```bash
npm run build
```

Les fichiers statiques prêts pour le déploiement se trouveront dans le dossier `dist/`. Notez que le `base` path de Vite est configuré sur `/mezanno-iiif-viewer/` pour faciliter le déploiement sur des plateformes comme GitHub Pages.

### Déploiement sur GitHub Pages (Nouvelle Méthode)

Ce projet est configuré pour se déployer de manière entièrement automatisée via **GitHub Actions** en utilisant la méthode native de GitHub.

Contrairement à l'ancienne méthode (qui consistait à compiler le projet et à forcer l'envoi du dossier `dist/` sur une branche fantôme `gh-pages`), la **nouvelle approche officielle** (`actions/deploy-pages@v4`) téléverse directement les artefacts compilés sur les serveurs d'hébergement de GitHub Pages. 

**Les avantages :**
- L'historique Git reste propre et linéaire.
- Aucune branche `gh-pages` inutile n'est créée.
- La gestion des droits est plus fine et sécurisée via les tokens (OIDC).

À chaque nouveau `git push` sur la branche `main`, le script défini dans `.github/workflows/deploy.yml` compile le projet et le met en ligne en quelques secondes.

> **Note importante** : Pour que cela fonctionne, vous devez vous rendre sur votre dépôt GitHub, dans **Settings > Pages**, et choisir **GitHub Actions** comme *Source* de déploiement.

### Résolution du problème de hauteur du Clover IIIF Viewer

Le composant `@samvera/clover-iiif/viewer` possède nativement une hauteur bloquée (souvent 500px). Pour forcer le document à occuper 100% de la hauteur disponible de l'interface (ce qui est crucial pour un Viewer d'images sans "boîte" contrainte), deux ajustements ont été mis en place :

1. **Prop `canvasHeight`** : L'option officielle `options={{ canvasHeight: '100%' }}` a été transmise au composant `<Viewer />` (voir `ViewerArea.tsx`).
2. **Forçage CSS** : Une règle CSS de sécurité (`height: 100% !important`) a été ajoutée globalement dans `index.css` via le sélecteur `.custom-viewer-container > div`. Cela permet de surcharger les styles en ligne (inline styles) du composant racine de Clover et garantit que l'interface s'adapte dynamiquement à la fenêtre.

## 📚 Technologies

- [Vite](https://vitejs.dev/) - Outil de build nouvelle génération.
- [React](https://react.dev/) - Bibliothèque UI.
- [TypeScript](https://www.typescriptlang.org/) - Typage statique robuste.
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utilitaire.
- [Lucide React](https://lucide.dev/) - Icônes élégantes.
- [Clover IIIF](https://samvera.github.io/clover-iiif/) - Moteur de visualisation IIIF.
