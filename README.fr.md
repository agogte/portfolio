<div align="center">

# Advait Gogte · Portfolio

**Ingénieur backend orienté IA. En ligne sur [agogte.github.io/portfolio](https://agogte.github.io/portfolio).**

[![Test](https://github.com/agogte/portfolio/actions/workflows/test.yml/badge.svg)](https://github.com/agogte/portfolio/actions/workflows/test.yml)
[![Deploy](https://github.com/agogte/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/agogte/portfolio/actions/workflows/deploy.yml)
[![Site en ligne](https://img.shields.io/badge/en_ligne-agogte.github.io%2Fportfolio-2563eb)](https://agogte.github.io/portfolio)

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-06B6D4?logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=nodedotjs&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-5-6E9F18?logo=vitest&logoColor=white)
![Testing Library](https://img.shields.io/badge/Testing_Library-16-E33332?logo=testinglibrary&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI%2FCD-2088FF?logo=githubactions&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-h%C3%A9bergement-222222?logo=githubpages&logoColor=white)

[English](README.md) · **Français**

</div>

## Contenu

Un portfolio d'une seule page, construit avec React et Tailwind CSS. Chaque section tient sur un écran d'ordinateur portable, et le site fonctionne en thème clair, sombre ou système.

- **Diagramme d'accueil** dessiné sur un canvas : des utilisateurs passent par les règles de dérogation, de segment et de déploiement progressif d'un feature flag.
- **Sélecteur de thème** : le nouveau thème s'étend en cercle à partir du bouton cliqué, grâce à l'API View Transitions. Il bascule instantanément si cette API n'est pas disponible ou si les animations sont réduites.
- **Compteurs animés** qui défilent quand ils apparaissent à l'écran.
- **Projecteur** qui suit le curseur sur chaque section, sur les appareils équipés d'une souris.
- **Toujours à jour après un déploiement.** GitHub Pages met les pages en cache pendant 10 minutes, donc le site vérifie au chargement s'il existe une version plus récente et se recharge si c'est le cas.

## Lancer en local

Nécessite Node.js 20.19 ou plus récent.

```bash
npm ci
npm start
```

Le serveur de développement tourne sur http://localhost:3000.

## Tests

```bash
npm test
```

Les tests utilisent Vitest et React Testing Library. Ils couvrent les sections de la page, le sélecteur de thème, les compteurs et la vérification de mise à jour après déploiement.

## Déploiement

Les déploiements sont automatiques :

1. **À l'ouverture d'une pull request**, les tests et un build de production sont lancés.
2. **À chaque merge sur `main`**, le site est construit puis publié sur la branche `gh-pages`, servie par GitHub Pages.

Pour déployer manuellement depuis n'importe quelle branche :

```bash
./deploy.sh
```

## Organisation du projet

```text
src/
  components/   sections de la page et éléments de mise en page partagés
  theme/        gestion des thèmes clair, sombre et système
  assets/       images et données du parcours professionnel
  freshness.js  recharge la page quand une nouvelle version est déployée
.github/
  workflows/    tests sur les pull requests, déploiement au merge sur main
```
