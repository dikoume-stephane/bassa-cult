// ── MBOG Audio — Ambiance Sonore Culturelle ──────────────
// Utilise des fichiers audio reels pour un rendu authentique.

(function () {
  'use strict';

  // ── Chemins des fichiers audio ────────────────────────
  const AMBIENT_SRC = '../assets/audio/ambiance.m4a';
  const DRUM_SRC    = '../assets/audio/dum.m4a';

  // ── Etat ──────────────────────────────────────────────
  let ambientAudio = null;
  let ambientPlaying = false;
  let drumAudio = null;

  // ── Initialiser l'audio ambient ───────────────────────
  function initAmbient() {
    if (ambientAudio) return;
    ambientAudio = new Audio(AMBIENT_SRC);
    ambientAudio.loop = true;
    ambientAudio.volume = 0.35;
    ambientAudio.preload = 'auto';
  }

  // ── Initialiser le son de tambour ─────────────────────
  function initDrum() {
    if (drumAudio) return;
    drumAudio = new Audio(DRUM_SRC);
    drumAudio.volume = 0.6;
    drumAudio.preload = 'auto';
  }

  // ── Jouer le son de tambour (page change) ─────────────
  function playDrum() {
    initDrum();
    drumAudio.currentTime = 0;
    drumAudio.play().catch(() => {});
  }

  // ── Demarrer / Arreter l'ambient ─────────────────────
  function startAmbient() {
    initAmbient();
    ambientAudio.play().then(() => {
      ambientPlaying = true;
    }).catch(() => {});
  }

  function stopAmbient() {
    if (!ambientAudio) return;
    ambientAudio.pause();
    ambientAudio.currentTime = 0;
    ambientPlaying = false;
  }

  // ── Creer le widget flottant ──────────────────────────
  function createWidget() {
    const widget = document.createElement('div');
    widget.className = 'audio-widget';
    widget.innerHTML = `
      <button class="audio-btn" id="audio-toggle" aria-label="Activer le son">
        <svg class="audio-icon audio-icon--off" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <line x1="23" y1="9" x2="17" y2="15"></line>
          <line x1="17" y1="9" x2="23" y2="15"></line>
        </svg>
        <svg class="audio-icon audio-icon--on" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
        </svg>
      </button>
      <div class="audio-volume-panel">
        <input type="range" class="audio-slider" id="audio-volume" min="0" max="100" value="35" aria-label="Volume">
      </div>
    `;
    document.body.appendChild(widget);

    const toggleBtn = document.getElementById('audio-toggle');
    const slider    = document.getElementById('audio-volume');
    const iconOff   = toggleBtn.querySelector('.audio-icon--off');
    const iconOn    = toggleBtn.querySelector('.audio-icon--on');

    toggleBtn.addEventListener('click', () => {
      if (ambientPlaying) {
        stopAmbient();
        iconOff.style.display = '';
        iconOn.style.display  = 'none';
        toggleBtn.classList.remove('is-playing');
      } else {
        startAmbient();
        iconOff.style.display = 'none';
        iconOn.style.display  = '';
        toggleBtn.classList.add('is-playing');
      }
    });

    slider.addEventListener('input', () => {
      if (ambientAudio) {
        ambientAudio.volume = parseInt(slider.value, 10) / 100;
      }
    });
  }

  // ── Son de transition sur les liens ───────────────────
  function bindTransitionSounds() {
    document.querySelectorAll('a[href]').forEach(link => {
      const href = link.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('http') || href.startsWith('mailto')) return;

      link.addEventListener('click', (e) => {
        if (e.metaKey || e.ctrlKey) return;

        e.preventDefault();
        playDrum();

        setTimeout(() => {
          window.location.href = href;
        }, 250);
      });
    });
  }

  // ── Init ──────────────────────────────────────────────
  function init() {
    createWidget();
    bindTransitionSounds();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
