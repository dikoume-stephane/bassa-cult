# Ameliorations — Explications Techniques

Documentation de chaque amelioration apportee au site MBOG, avec la methode, le code, et les raisons techniques.

---

## 1. README.md — Documentation du projet

**Objectif** : Documenter le projet pour tout nouveau contributeur.

**Methode** : Fichier Markdown standard situe a la racine du depot.

**Exemple de structure :**
```markdown
# MBOG — Le Portail Culturel du Peuple Bassa

## Sommaire
- [Apercu](#apercu)
- [Fonctionnalites](#fonctionnalites)
- [Structure du projet](#structure-du-projet)

## Structure du projet
bassa-cult/
├── pages/
│   ├── index.html          # Page d'accueil
│   ├── histoire.html       # Origines & migrations
│   ...
├── css/
│   ├── style.css           # Styles principaux
│   ...
├── js/
│   ├── main.js             # Effets au scroll
│   ...
```

**Pourquoi** : Un README est indispensable pour tout depot Git. Il permet de comprendre le projet sans avoir a lire le code source.

---

## 2. Correction des couleurs — Section personnalites (societe.css)

**Objectif** : La nouvelle section "Figures Marquantes" avait des couleurs en dur (hex) qui n'adaptaient pas au theme.

**Methode** : Remplacement de chaque valeur hex par la CSS variable correspondante.

**Avant (incorrect) :**
```css
.personalities-section {
  background-color: #0b0908;     /* Noir en dur — casse le theme clair */
  border-top: 1px solid #1a1713;
}
.personality-card {
  background-color: #12100e;
  border: 1px solid #1f1b16;
}
.personality-info h3 {
  color: #f5f2eb;
}
.personality-title {
  color: #8c8275;
}
.personality-bio {
  color: #c4bfae;
}
.reveal-btn:hover {
  background-color: var(--c-gold, #d4af37);
  color: #0e0c0a;
}
```

**Apres (correct) :**
```css
.personalities-section {
  background-color: var(--c-bg);
  border-top: 1px solid var(--c-surface);
}
.personality-card {
  background-color: var(--c-surface);
  border: 1px solid var(--c-surface2);
}
.personality-info h3 {
  color: var(--c-cream);
}
.personality-title {
  color: var(--c-text-dim);
}
.personality-bio {
  color: var(--c-text);
}
.reveal-btn:hover {
  background-color: var(--c-gold);
  color: var(--c-bg);
}
```

**Le systeme de variables du site :**
```css
:root {
  --c-bg:         #0e0c09;     /* Fond sombre */
  --c-surface:    #1a1610;     /* Cartes sombre */
  --c-surface2:   #231e15;     /* Variante */
  --c-gold:       #c9a84c;     /* Accent doré */
  --c-cream:      #f2ead8;     /* Titres */
  --c-text:       #d4c9b0;     /* Texte principal */
  --c-text-dim:   #7a6e5a;     /* Texte secondaire */
}
[data-theme="light"] {
  --c-bg:         #FAF6F0;     /* Fond ivoire */
  --c-surface:    #EFEAE0;     /* Cartes clair */
  --c-gold:       #8C620B;     /* Or fonce */
  --c-cream:      #edb356;     /* Titres */
  --c-text:       #2A241C;     /* Texte sombre */
}
```

**Pourquoi** : Toute couleur hex casse la logique de theme. Les variables permettent la bascule instantanee.

---

## 3. Ambiance sonore — Widget audio flottant

**Objectif** : Ajouter un son Assiko en fond et un coup de tambour au changement de page.

### 3.1 Moteur audio (`js/audio.js`)

**Extrait — Initialisation de l'audio :**
```javascript
function initAudio() {
  if (audio) return;
  var state = loadState();
  audio = new Audio('../assets/audio/ambiance.m4a');
  audio.loop = true;           // Boucle infinie
  audio.volume = state.volume; // Restaure le volume sauvegarde
  audio.preload = 'auto';

  // Si l'utilisateur avait active la musique, on relance
  if (state.playing) {
    audio.currentTime = state.time || 0;
    audio.play().then(function() {
      ambientPlaying = true;
      updateUI(true);
    }).catch(function(){});
  }
}
```

**Extrait — Son de transition (tambour) :**
```javascript
function initDrum() {
  if (drumAudio) return;
  drumAudio = new Audio('../assets/audio/dum.m4a');
  drumAudio.volume = 0.6;
  drumAudio.preload = 'auto';
}

function playDrum() {
  initDrum();
  drumAudio.currentTime = 0;   // Recommence depuis le debut
  drumAudio.play().catch(function(){});
}
```

**Extrait — Liaison avec les liens de navigation :**
```javascript
function bindTransitionSounds() {
  document.querySelectorAll('a[href]').forEach(function (link) {
    var href = link.getAttribute('href');
    // Ignore les ancres, liens externes, mailto
    if (!href || href.charAt(0) === '#' || href.indexOf('http') === 0) return;

    link.addEventListener('click', function (e) {
      if (e.metaKey || e.ctrlKey) return; // Ctrl+clic = nouvel onglet
      e.preventDefault();
      saveState();          // Sauvegarde avant navigation
      playDrum();           // Joue le son
      setTimeout(function () {
        window.location.href = href; // Delai pour laisser le son jouer
      }, 250);
    });
  });
}
```

### 3.2 Widget flottant (`css/audio.css`)

**Extrait — Structure du widget :**
```css
.audio-widget {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  display: flex;
  align-items: center;
}

.audio-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 1px solid var(--c-gold);
  background: rgba(14, 12, 10, 0.85);
  backdrop-filter: blur(10px);    /* Glassmorphism */
  color: var(--c-gold);
  cursor: pointer;
  transition: background var(--transition), transform 0.3s ease;
}

/* Pulsation quand la musique joue */
.audio-btn.is-playing {
  background: var(--c-gold);
  color: var(--c-bg);
  animation: audioPulse 2.5s ease-in-out infinite;
}

@keyframes audioPulse {
  0%, 100% { box-shadow: 0 4px 20px rgba(201, 168, 76, 0.2); }
  50%      { box-shadow: 0 4px 30px rgba(201, 168, 76, 0.5); }
}
```

**Extrait — Slider de volume (apparait au survol) :**
```css
.audio-volume-panel {
  width: 0;
  overflow: hidden;
  opacity: 0;
  transition: width 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
              opacity 0.3s ease;
}

/* Se deploye au survol du widget */
.audio-widget:hover .audio-volume-panel {
  width: 100px;
  opacity: 1;
  margin-left: 10px;
}

.audio-slider::-webkit-slider-thumb {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: var(--c-gold);
  border: 2px solid var(--c-bg);
}
```

**Extrait — Injection du widget via JS :**
```javascript
function createWidget() {
  var widget = document.createElement('div');
  widget.className = 'audio-widget';
  widget.innerHTML =
    '<button class="audio-btn" id="audio-toggle">' +
      '<svg class="audio-icon audio-icon--off" viewBox="0 0 24 24" ...>' +
        '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>' +
        '<line x1="23" y1="9" x2="17" y2="15"/>' +
        '<line x1="17" y1="9" x2="23" y2="15"/>' +
      '</svg>' +
      // ... icon "on" cachee par defaut
    '</button>' +
    '<div class="audio-volume-panel">' +
      '<input type="range" class="audio-slider" id="audio-volume" min="0" max="100" value="35"/>' +
    '</div>';
  document.body.appendChild(widget);
}
```

---

## 4. Persistance audio entre les pages

**Objectif** : La musique continuait meme quand l'utilisateur changeait de page.

**Methode** : `localStorage` pour sauvegarder/restaurer l'etat.

**Extrait — Sauvegarde :**
```javascript
var STORAGE_KEY = 'mbog-audio';

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      playing: ambientPlaying,
      volume: audio ? audio.volume : 0.35,
      time: audio ? audio.currentTime : 0
    }));
  } catch(e) {}
}

// Sauvegarde avant chaque changement de page
window.addEventListener('beforeunload', function () {
  saveState();
});
```

**Extrait — Restauration :**
```javascript
function loadState() {
  try {
    var s = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return s || { playing: false, volume: 0.35, time: 0 };
  } catch(e) {
    return { playing: false, volume: 0.35, time: 0 };
  }
}

function initAudio() {
  if (audio) return;
  var state = loadState();
  audio = new Audio('../assets/audio/ambiance.m4a');
  audio.loop = true;
  audio.volume = state.volume;

  // Restauration : si la musique jouait, on relance
  if (state.playing) {
    audio.currentTime = state.time || 0;
    audio.play().then(function() {
      ambientPlaying = true;
      updateUI(true);   // Met a jour le bouton (icones + classe)
    }).catch(function(){});
  }
}
```

**Flux technique :**
```
Page A                          Page B
  │                               │
  ├─ User clique "Play"           │
  ├─ audio.play()                 │
  ├─ saveState() → localStorage  │
  │   { playing:true,             │
  │     volume:0.35,              │
  │     time:42.5 }              │
  ├─ beforeunload → saveState()  │
  │                               ├─ DOMContentLoaded
  │                               ├─ initAudio()
  │                               ├─ loadState() ← localStorage
  │                               ├─ if playing: audio.play()
  │                               ├─ audio.currentTime = 42.5
  │                               └─ updateUI(true)
```

**Pourquoi localStorage** : Simple, pas de dependance serveur, supporte par tous les navigateurs.

---

## 5. Feuilles de palmier SVG — Decoration culturelle

**Objectif** : Feuilles de palmier realesites en fond de page.

### 5.1 Methode SVG (Version A optimisee)

**Structure d'une feuille (code complet d'une feuille) :**
```html
<div class="palm-leaf palm-leaf--1" aria-hidden="true">
  <svg viewBox="0 0 500 700" xmlns="http://www.w3.org/2000/svg">
    <!-- Gradient : fonce → clair → fonce (effet de lumiere) -->
    <defs>
      <linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%"   stop-color="var(--palm-dark)"/>
        <stop offset="50%"  stop-color="var(--palm-light)"/>
        <stop offset="100%" stop-color="var(--palm-dark)"/>
      </linearGradient>
      <linearGradient id="ps" x1="50%" y1="0%" x2="50%" y2="100%">
        <stop offset="0%"   stop-color="var(--palm-stem-light)"/>
        <stop offset="100%" stop-color="var(--palm-stem-dark)"/>
      </linearGradient>
    </defs>

    <!-- Rachis (tige centrale courbe) -->
    <path d="M250 680C248 550 240 400 250 250Q255 150 260 60"
          stroke="url(#ps)" stroke-width="5" fill="none" stroke-linecap="round"/>

    <!-- Pinnules GAUCHES (1 seul path combine) -->
    <path fill="url(#pg)" opacity="0.85"
      d="M248 630C170 615 70 640 20 670 75 630 175 608 248 622
         M246 570C150 540 35 545 5 575 45 538 155 530 246 558
         M244 510C130 470 15 465 2 492 25 460 135 458 244 498
         ...
         M258 105C242 96 218 94 215 96 222 90 245 93 258 100"/>

    <!-- Pinnules DROITES (1 seul path combine) -->
    <path fill="url(#pg)" opacity="0.82"
      d="M252 610C330 590 430 600 480 625 420 595 325 582 252 600
         M254 548C345 515 455 515 500 542 440 512 340 508 254 536
         ...
         M248 122C262 114 280 112 285 114 275 108 260 112 248 116"/>
  </svg>
</div>
```

**Explication d'un sous-chemin de pinnule :**
```
M248 630          → Point de depart sur le rachis (x=248, y=630)
C170 615 70 640   → Courbe de Bezier : controle1(170,615) controle2(70,640)
  20 670          → Point d'arrivee : extremite de la pinnule (20,670)
75 630 175 608    → Retour : controle1(75,630) controle2(175,608)
  248 622         → Retour au rachis (248,622)
```

### 5.2 Disposition CSS

```css
.palm-leaf {
  position: fixed;
  z-index: 1;
  pointer-events: none;
}

.palm-leaf--1 {
  top: -12%;
  right: -6%;
  width: 40vw;
  max-width: 500px;
  min-width: 250px;
  opacity: 0.55;
  transform: rotate(-25deg);
  transform-origin: top right;
  animation: palmSway1 9s ease-in-out infinite alternate;
}

@keyframes palmSway1 {
  0%   { transform: rotate(-25deg) translate(0, 0); }
  100% { transform: rotate(-23.5deg) translate(-4px, 6px); }
}
```

### 5.3 Masquage derriere le hero

```css
.hero {
  position: relative;
  z-index: 2;    /* Hero au-dessus des palms */
}
.palm-leaf {
  position: fixed;
  z-index: 1;    /* Palms derriere le hero */
}
```

### 5.4 Adaptation au theme

```css
:root {
  --palm-light:       #2a5a2e;   /* Pinnules sombre */
  --palm-dark:        #122e14;
  --palm-stem-light:  #3a6b3e;
  --palm-stem-dark:   #1a3a1c;
}
[data-theme="light"] {
  --palm-light:       #8cc484;   /* Pinnules clair */
  --palm-dark:        #4a8a42;
  --palm-stem-light:  #5a9a5e;
  --palm-stem-dark:   #3a7a3e;
}
```

---

## 6. Grille des 5 piliers (hexagones)

**Objectif** : Navigation visuelle vers les 5 sections.

**Extrait — Forme hexagonale :**
```css
.hex-clip {
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  overflow: hidden;
}

.hex-item:hover .hex-clip {
  background: var(--c-gold);  /* Fond doré derrière */
}

/* Bordure lumineuse : le clip se reduit pour reveler le fond */
.hex-item:hover .hex-img,
.hex-item:hover .hex-veil {
  clip-path: polygon(50% 1.5%, 98.5% 25.5%, 98.5% 74.5%, 50% 98.5%, 1.5% 74.5%, 1.5% 25.5%);
}
```

**Extrait — Effets au survol :**
```css
.hex-item:hover {
  transform: translateY(-8px) scale(1.03);
  filter: drop-shadow(0 0 15px var(--c-gold));
}

.hex-cta {
  opacity: 0;
  transform: translateY(6px);
  transition: opacity var(--transition), transform var(--transition);
}
.hex-item:hover .hex-cta {
  opacity: 1;
  transform: translateY(0);
}
```

---

## 7. Transitions entre pages (`transition.css`)

**Objectif** : Navigation fluide entre les pages.

**Extrait complet :**
```css
@media (prefers-reduced-motion: no-preference) {
  @view-transition { navigation: auto; }
  main { view-transition-name: main-content; }

  @keyframes push-to-left {
    from { transform: translateX(0); }
    to   { transform: translateX(-100%); }
  }
  @keyframes push-from-right {
    from { transform: translateX(100%); }
    to   { transform: translateX(0); }
  }

  ::view-transition-group(main-content) {
    animation-duration: 1.2s;
    animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
  }
  ::view-transition-old(main-content) {
    animation-name: push-to-left;
    mix-blend-mode: normal;
  }
  ::view-transition-new(main-content) {
    animation-name: push-from-right;
    mix-blend-mode: normal;
  }
}
```

**Pourquoi** : API CSS native, pas de JS requis. Respecte `prefers-reduced-motion` pour l'accessibilite.

---

## 8. Theme clair/sombre

**Extrait — HTML :**
```html
<html lang="fr" data-theme="dark">
```

**Extrait — CSS (definition des themes) :**
```css
:root {
  --c-bg:       #0e0c09;
  --c-surface:  #1a1610;
  --c-gold:     #c9a84c;
  --c-cream:    #f2ead8;
  --c-text:     #d4c9b0;
}
[data-theme="light"] {
  --c-bg:       #FAF6F0;
  --c-surface:  #EFEAE0;
  --c-gold:     #8C620B;
  --c-cream:    #edb356;
  --c-text:     #2A241C;
}
```

**Extrait — Toggle glassmorphism :**
```css
.theme-toggle-label {
  width: 75px;
  height: 34px;
  background: rgba(23, 20, 16, 0.23);
  border: 1px solid rgba(214, 175, 55, 0.2);
  border-radius: 50px;
  backdrop-filter: blur(0px);
}

.glass-bubble {
  position: absolute;
  top: -7px;
  width: 28px;
  height: 46px;
  border-radius: 50px;
  background: rgba(128, 127, 127, 0.06);
  backdrop-filter: blur(6px);
  border: 1px solid rgba(255, 255, 255, 0.153);
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

/* La bulle glisse vers le soleil quand le mode light est actif */
.theme-checkbox:checked + .theme-toggle-label .glass-bubble {
  transform: translateX(43px);
}
```

---

## 9. Scroll animations (`IntersectionObserver`)

**Extrait — JavaScript (`js/main.js`) :**
```javascript
// Selectionne les elements a animer
const revealEls = document.querySelectorAll(
  '.intro-inner, .hex-item, .news-card, .proverb-inner, .mission-inner'
);
revealEls.forEach(el => el.classList.add('reveal'));

// Observe quand chaque element entre dans le viewport
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Delai en cascade pour les elements groupes
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      observer.unobserve(entry.target); // Une seule fois
    }
  });
}, { threshold: 0.15 });  // 15% de l'element visible

revealEls.forEach(el => observer.observe(el));
```

**Extrait — CSS :**
```css
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.8s ease, transform 0.8s ease;
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

---

## 10. Footer avec vagues SVG animees

**Extrait — Structure SVG :**
```html
<div class="flooter-waves">
  <svg viewBox="0 0 1440 390" preserveAspectRatio="none">
    <!-- Vague 1 -->
    <path fill="var(--c-surface)"
      d="M 0,400 L 0,100 C 99.4,70.8 198.9,41.6 273,55 ..."
      class="path-0"/>
    <!-- Vague 2 (phase decalee) -->
    <path fill="var(--c-surface)" fill-opacity="1"
      d="M 0,400 L 0,233 C 94.3,214.8 188.7,196.7 261,189 ..."
      class="path-1"/>
  </svg>
</div>
```

**Extrait — Animation CSS :**
```css
.path-0 {
  animation: pathAnim-0 4s linear infinite;
}
@keyframes pathAnim-0 {
  0%   { d: path("M 0,400 L 0,100 C 99.4,70.8 ..."); }
  25%  { d: path("M 0,400 L 0,100 C 103.3,105.7 ..."); }
  50%  { d: path("M 0,400 L 0,100 C 93.9,88.9 ..."); }
  75%  { d: path("M 0,400 L 0,100 C 80.6,78.0 ..."); }
  100% { d: path("M 0,400 L 0,100 C 99.4,70.8 ..."); }
}
```

**Pourquoi SVG** : Les vagues sont vectorielles, s'adaptent a toute la largeur, et les animations CSS sur `d` sont performantes.

---

## 11. Logo du site — Remplacement du symbole ✦

**Objectif** : Remplacer le symbole Unicode "✦" par l'icone SVG officielle du site dans la navbar et le footer.

**Methode** : `<img>` avec CSS `filter` pour adapter la couleur au theme.

**Avant :**
```html
<div class="nav-logo">
  <span class="logo-symbol">✦</span>
  <span class="logo-text">MBOG</span>
</div>
```

**Apres :**
```html
<div class="nav-logo">
  <img src="../assets/icone/icone.svg" alt="Mbog" class="logo-icon">
  <span class="logo-text">MBOG</span>
</div>
```

**CSS — Filtres d'adaptation au theme :**
```css
.logo-icon {
  width: 28px;
  height: 28px;
  object-fit: contain;
  /* Inversion pour theme sombre (SVG est noir → presque blanc) */
  filter: invert(0.9) sepia(0.2) saturate(2) hue-rotate(10deg) brightness(1.2);
}
[data-theme="light"] .logo-icon {
  /* Fonce pour theme clair (SVG noir reste visible) */
  filter: invert(0.15) sepia(0.3) saturate(3) hue-rotate(10deg) brightness(0.8);
}
```

**Pourquoi** : Le SVG original est noir (`#000000`). Le filtre `invert(0.9)` le transforme en presque-blanc pour le theme sombre, et `invert(0.15)` le garde fonce pour le theme clair.

---

## 12. Favicon dore — Onglet du navigateur

**Objectif** : Afficher l'icone doree du site dans l'onglet du navigateur.

**Methode** : Deux versions du SVG — une noire (navbar/footer) et une doree (favicon).

**Fichiers SVG :**
```
assets/icone/icone.svg       → Noir (#000000) pour navbar + footer
assets/icone/icone-gold.svg  → Dore (#c9a84c) pour favicon
```

**Creation de la version doree :**
```powershell
# Copie du SVG noir avec remplacement de la couleur
$content = Get-Content "icone.svg" -Raw
$gold = $content -replace 'fill="#000000"', 'fill="#c9a84c"'
Set-Content "icone-gold.svg" -Value $gold
```

**HTML — Balises favicon dans chaque page :**
```html
<head>
  <link rel="icon" type="image/svg+xml" href="../assets/icone/icone-gold.svg" sizes="any">
  <link rel="icon" type="image/svg+xml" href="../assets/icone/icone-gold.svg" width="64" height="64">
  ...
</head>
```

**Pourquoi deux versions** : Les favicons ne supportent pas les filtres CSS. La version doree (`#c9a84c`) est un SVG separe utilise uniquement pour l'onglet du navigateur. Le navbar/footer utilisent le SVG noir avec les filtres CSS.

---

## Recapitulatif

| # | Amelioration | Fichiers | Technique cles |
|---|-------------|----------|----------------|
| 1 | README | `README.md` | Markdown |
| 2 | Couleurs theme | `css/societe.css` | CSS variables |
| 3 | Audio ambiant | `js/audio.js`, `css/audio.css` | `<audio>` natif, glassmorphism |
| 4 | Persistance audio | `js/audio.js` | `localStorage` |
| 5 | Palmiers SVG | `css/style.css`, `pages/*.html` | SVG + `clip-path` + animations |
| 6 | Hexagones | `css/style.css` | `clip-path: polygon()` |
| 7 | Transitions | `css/transition.css` | `@view-transition` CSS |
| 8 | Theme | `css/style.css`, `js/theme.js` | `data-theme` + custom properties |
| 9 | Scroll anim | `js/main.js`, `css/style.css` | `IntersectionObserver` |
| 10 | Vagues footer | `pages/*.html` | SVG inline + `@keyframes` sur `d` |
| 11 | Logo du site | `pages/*.html`, `css/style.css` | `<img>` SVG + CSS `filter` |
| 12 | Favicon dore | `assets/icone/icone-gold.svg`, `pages/*.html` | SVG colore + `<link rel="icon">` |
