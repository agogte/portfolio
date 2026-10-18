<div align="center">

# Advait Gogte · Portfolio

**AI-first backend engineer. Live at [agogte.github.io/portfolio](https://agogte.github.io/portfolio).**

[![Test](https://github.com/agogte/portfolio/actions/workflows/test.yml/badge.svg)](https://github.com/agogte/portfolio/actions/workflows/test.yml)
[![Deploy](https://github.com/agogte/portfolio/actions/workflows/deploy.yml/badge.svg)](https://github.com/agogte/portfolio/actions/workflows/deploy.yml)
[![Live site](https://img.shields.io/badge/live-agogte.github.io%2Fportfolio-2563eb)](https://agogte.github.io/portfolio)

![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.3-06B6D4?logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=nodedotjs&logoColor=white)
![Vitest](https://img.shields.io/badge/Vitest-5-6E9F18?logo=vitest&logoColor=white)
![Testing Library](https://img.shields.io/badge/Testing_Library-16-E33332?logo=testinglibrary&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-CI%2FCD-2088FF?logo=githubactions&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/GitHub_Pages-hosting-222222?logo=githubpages&logoColor=white)

**English** · [Français](README.fr.md)

</div>

## What's here

A single-page portfolio built with React and Tailwind CSS. Each section fills one screen on a laptop, and the whole site works in light, dark or system theme.

- **Hero diagram** drawn on a canvas, showing users flowing through a feature flag's override, segment and rollout rules.
- **Theme switcher** that wipes the new theme outward from the button you press, using the View Transitions API. It falls back to an instant swap where that API is missing or motion is reduced.
- **Animated stat counters** that count up when they scroll into view.
- **Cursor spotlight** that follows the pointer across each section on devices with a mouse.
- **Stays current after a deploy.** GitHub Pages caches pages for 10 minutes, so the site checks for a newer build on load and reloads itself when one exists.

## Run it locally

Requires Node.js 20.19 or newer.

```bash
npm ci
npm start
```

The dev server runs at http://localhost:3000.

## Test

```bash
npm test
```

Tests use Vitest and React Testing Library. They cover the page sections, the theme switcher, the stat counters and the post-deploy refresh check.

## Deploy

Deploys are automatic:

1. **Opening a pull request** runs the tests and a production build.
2. **Merging to `main`** builds the site and publishes it to the `gh-pages` branch, which GitHub Pages serves.

To deploy by hand from any branch:

```bash
./deploy.sh
```

## Project layout

```text
src/
  components/   page sections and shared layout pieces
  theme/        light, dark and system theme handling
  assets/       images and work history data
  freshness.js  reloads the page when a newer build is deployed
.github/
  workflows/    test on pull requests, deploy on merge to main
```
