<div align="center">

<img src="assets/icone/icone-gold.svg" alt="Mbog" width="80">

# MBOG

### Le Portail Culturel du Peuple Bassa

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](#)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](#)
[![Leaflet](https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](#)

> *Preserver. Transmettre. Celebrer.*

</div>

---

## A propos

**MBOG** est un site web immersif et educatif dedie a la preservation et a la transmission du patrimoine culturel du peuple **Bassa** du Cameroun. Le projet explore les cinq piliers de la civilisation Bassa a travers une experience web moderne, responsive et riche en contenu.

Ce site est une archive vivante — accessible a tous : diaspora, chercheurs, etudiants et tous ceux qui souhaitent comprendre la richesse d'un peuple dont l'ame est profondement enracinee dans la forêt, les rites, la parole et l'ancetre.

---

## Piliers du contenu

| # | Pilier | Page | Contenu |
|---|--------|------|---------|
| 01 | **Origines** | `histoire.html` | Fresque des migrations (Egypte → Douala), legende de Ngog Lituba, carte interactive Leaflet du territoire historique |
| 02 | **Societe & Traditions** | `societe.html` | Organisation sociale (Mbog, Mbombog, clans), symboles traditionnels, rite matrimonial du Likile |
| 03 | **Art** | `art.html` | Musique (Assiko, Hongo, Mandjang), instruments sacres (Balafon, Tam-Tam, Hilun hi koba), danses, festivals |
| 04 | **Gastronomie** | `gastronomie.html` | Plats ancestraux avec recettes detaillees : Okok, Ndoie, Mbongo'o, Mintoumba, Nsugi... |
| 05 | **Langue & Litterature** | `langue.html` | Alphabet interactif, lexique, figures litteraires (Werewere Liking, Achille Mbembe...), proverbes traduits |

---

## Fonctionnalites

| Fonctionnalite | Description |
|----------------|-------------|
| **Theme sombre / clair** | Basculement fluide avec toggle glassmorphism, adaptation complete de la palette via CSS custom properties |
| **Navigation responsive** | Navbar fixe desktop + barre inferieure a icones sur mobile (<=768px) |
| **Ambiance sonore** | Widget audio flottant avec son Assiko en boucle + coup de tambour au changement de page |
| **Persistance audio** | La musique continue entre les pages via `localStorage` (etat play/pause/volume/position) |
| **Decorations SVG** | 4 feuilles de palmier realesites en fond de page, adaptees au theme, masquees derriere le hero |
| **Animations au scroll** | Reveal progressif via `IntersectionObserver` avec cascade |
| **Carte interactive** | Leaflet.js pour localiser le territoire historique Bassa |
| **Carrousel gastronomique** | Slider horizontal des plats traditionnels |
| **Alphabet interactif** | Tooltips phonétiques au survol de chaque lettre de l'alphabet Bassa |
| **Cartes a retourner** | Proverbes Bassa avec recto (langue) / verso (traduction) |
| **Footer anime** | Vagues SVG animees en CSS sur toutes les pages |
| **Favicon dore** | Icone SVG doree dans l'onglet du navigateur |
| **Transitions de pages** | Animation push via API CSS `@view-transition` |

---

## Stack technique

### Frontend

| Technologie | Version | Usage |
|-------------|---------|-------|
| HTML5 | — | Structure semantique des 6 pages |
| CSS3 | — | Custom properties, clip-path, animations, responsive, glassmorphism |
| JavaScript | ES6+ | Vanilla JS — navbar, theme, IntersectionObserver, carrousel, flip cards, audio |
| Leaflet.js | 1.9.4 | Carte interactive (page Origines) |

### Systemes implementes

| Systeme | Methode |
|---------|---------|
| **Theme clair/sombre** | `data-theme` sur `<html>` + CSS custom properties |
| **Ambiance sonore** | `HTML5 Audio` + bouton flottant glassmorphism |
| **Persistance audio** | `localStorage` (sauvegarde play/pause/volume/position) |
| **Decorations SVG** | Feuilles de palmier inline avec gradients CSS adaptables |
| **Transitions pages** | API CSS `@view-transition` native |
| **Scroll animations** | `IntersectionObserver` avec threshold 15% |
| **Favicon** | SVG colore (`#c9a84c`) via `<link rel="icon">` |

### Typographie

| Police | Usage |
|--------|-------|
| **Cinzel** | Titres et en-tetes (style serif elegant) |
| **Cormorant Garamond** | Corps de texte (style literaire) |
| **Barlow Condensed** | Labels UI, navigation, badges (style condense) |

> **100% vanilla** — aucun framework CSS/JS, aucun bundler, aucune dependance npm.

---

## Installation

```bash
# Cloner le depot
git clone https://github.com/votre-username/bassa-cult.git

# Entrer dans le dossier
cd bassa-cult

# Ouvrir dans le navigateur (Windows)
start pages/index.html
```

> **Note** : La carte interactive (Leaflet.js) necessite une connexion Internet. Les sons d'ambiance necessitent les fichiers audio dans `assets/audio/`.

---

## Structure du projet

```
bassa-cult/
├── pages/
│   ├── index.html              # Accueil
│   ├── histoire.html           # Origines
│   ├── societe.html            # Societe & Traditions
│   ├── art.html                # Art
│   ├── gastronomie.html        # Gastronomie
│   └── langue.html             # Langue & Litterature
├── css/
│   ├── style.css               # Styles principaux + variables theme + palms
│   ├── transition.css          # Transitions @view-transition
│   ├── audio.css               # Widget audio flottant
│   ├── histoire.css            # Page Origines
│   ├── societe.css             # Page Societe
│   ├── art.css                 # Page Art
│   ├── gastro.css              # Page Gastronomie
│   └── langue.css              # Page Langue
├── js/
│   ├── main.js                 # Navbar, scroll reveal
│   ├── theme.js                # Basculement sombre/clair
│   ├── audio.js                # Ambiance sonore + persistance
│   ├── map.js                  # Leaflet.js
│   ├── sanaga.js               # Riviere Sanaga
│   ├── grotte.js               # Grotte Ngog Lituba
│   ├── gastro-carousel.js      # Carrousel gastronomique
│   ├── recette.js              # Modal recettes
│   └── langue-proverbe.js      # Flip cards proverbes
├── assets/
│   ├── icone/
│   │   ├── icone.svg           # Logo du site (noir)
│   │   └── icone-gold.svg      # Logo dore (favicon)
│   ├── audio/
│   │   ├── ambiance.m4a        # Son Assiko (boucle)
│   │   └── dum.m4a             # Coup de tambour (transition)
│   ├── images/                 # Photographies & illustrations
│   └── videos/                 # Video danse Assiko
├── LICENSE                     # MIT
└── README.md
```

---

## Auteur

**Dikoume Stephane** — Developpeur Web

---

## Licence

Ce projet est sous licence **MIT** — voir le fichier [LICENSE](LICENSE) pour plus de details.

---

<div align="center">

*Site dedie a perpetuer la grandeur du patrimoine bassa*

**© 2026 Mbog — Peuple Bassa. Tous droits reserves.**

</div>
