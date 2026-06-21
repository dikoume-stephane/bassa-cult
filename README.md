# MBOG — Le Peuple Bassa

> Portail culturel dédié à la préservation et à la transmission du patrimoine du peuple Bassa du Cameroun.

## Présentation

**MBOG** est un site web éducatif et culturel qui explore les cinq piliers de la civilisation Bassa : les origines, la société et traditions, l'art, la gastronomie, et la langue & littérature. Ce projet a pour mission de **préserver, transmettre et célébrer** l'héritage millénaire d'un peuple ancré dans la forêt équatoriale du Littoral camerounais.

Le site se veut une archive vivante, accessible à tous — diaspora, chercheurs, étudiants et curieux souhaitant comprendre la richesse d'un peuple dont l'âme est profondément enracinée dans les rites, la parole et l'ancêtre.

## Pages

| Page | Contenu |
|------|---------|
| **Accueil** (`pages/index.html`) | Page d'accueil avec grille hexagonale de navigation, section actualités et festivals, et mission du projet |
| **Origines** (`pages/histoire.html`) | Fresque des migrations (Égypte antique → Afrique centrale), la légende de Ngog Lituba, carte interactive du territoire historique |
| **Société & Traditions** (`pages/societe.html`) | Organisation sociale (Mbog, Mbombog, clans, initiation), symboles traditionnels (tenues, objets de pouvoir), rite du Likile (mariage) |
| **Art** (`pages/art.html`) | Musique (Assiko, Hongo, Mandjang), instruments sacrés (Balafon, Tam-Tam, Hilun hi kôba), danses traditionnelles, festivals (NSA'A, Mbog Liaa, Jè Wèm) |
| **Gastronomie** (`pages/gastronomie.html`) | Plats traditionnels avec recettes : Okok, Ndolè, Mbongo'o, met de pistaches, escargots, Mbaafon, Nsugi, Mintoumba |
| **Langue & Littérature** (`pages/langue.html`) | Lexique de base, alphabet interactif, figures littéraires (Werewere Liking, Achille Mbembe, etc.), proverbes Bassa |

## Fonctionnalités

- **Thème sombre / clair** — basculement fluide avec effet glassmorphism et adaptation complète de la palette
- **Navigation responsive** — barre supérieure sur desktop, barre inférieure à icônes sur mobile (≤768px)
- **Animations au défilement** — effets de révélation via IntersectionObserver
- **Carte interactive** — Leaflet.js pour localiser le territoire historique Bassa (page Origines)
- **Carrousel gastronomique** — slider horizontal des plats emblématiques
- **Alphabet interactif** — survol des lettres pour découvrir la phonétique Bassa
- **Cartes à retourner** — proverbes Bassa avec recto (en langue) / verso (traduction)
- **Footer animé** — vagues SVG animées en CSS sur toutes les pages

## Stack technique

| Technologie | Usage |
|-------------|-------|
| **HTML5** | Structure sémantique des 6 pages |
| **CSS3** | Styles avec variables custom, clip-path, animations, responsive design |
| **JavaScript** | Vanilla JS — navbar, thème, IntersectionObserver, carrousel, flip cards |
| **Google Fonts** | Cinzel (titres), Cormorant Garamond (corps), Barlow Condensed (labels UI) |
| **Leaflet.js 1.9.4** | Carte interactive (page Origines uniquement) |

Aucun framework, aucune dépendance de build, aucun bundler. Le site s'exécute directement dans le navigateur.

## Installation

Clonez le dépôt et ouvrez le fichier `pages/index.html` dans un navigateur :

```bash
git clone https://github.com/votre-username/bassa-cult.git
cd bassa-cult
```

Puis ouvrez `pages/index.html` dans votre navigateur préféré.

> **Note** : La carte interactive (Leaflet.js) nécessite une connexion Internet.

## Structure du projet

```
bassa-cult/
├── pages/
│   ├── index.html          # Page d'accueil
│   ├── histoire.html       # Origines & histoire
│   ├── societe.html        # Société & traditions
│   ├── art.html            # Art, musique & danses
│   ├── gastronomie.html    # Gastronomie traditionnelle
│   └── langue.html         # Langue & littérature
├── css/
│   ├── style.css           # Styles principaux (palette, navbar, hero, hex, footer)
│   ├── transition.css      # Styles de transition entre pages
│   ├── histoire.css        # Styles spécifiques à la page Origines
│   ├── societe.css         # Styles spécifiques à la page Société
│   ├── art.css             # Styles spécifiques à la page Art
│   ├── gastro.css          # Styles spécifiques à la page Gastronomie
│   └── langue.css          # Styles spécifiques à la page Langue
├── js/
│   ├── main.js             # Navbar scroll, animations reveal
│   ├── theme.js            # Gestion du thème sombre/clair
│   ├── map.js              # Initialisation Leaflet.js
│   ├── sanaga.js           # Script pour la page Origines
│   ├── grotte.js           # Script pour la grotte de Ngog Lituba
│   ├── gastro-carousel.js  # Carrousel gastronomique
│   ├── recette.js          # Affichage des recettes
│   └── langue-proverbe.js  # Flip cards des proverbes
├── assets/
│   ├── images/             # Photographies et illustrations
│   └── videos/             # Vidéos (danse Assiko)
├── LICENSE                 # Licence MIT
└── README.md               # Ce fichier
```

## Licence

Ce projet est distribué sous la [Licence MIT](LICENSE) — Copyright (c) 2026 dikoume stephane.
