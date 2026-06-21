(function () {
  'use strict';

  var STORAGE_KEY = 'mbog-audio';
  var audio = null;
  var ambientPlaying = false;
  var DRUM_SRC = '../assets/audio/dum.m4a';
  var drumAudio = null;

  function initDrum() {
    if (drumAudio) return;
    drumAudio = new Audio(DRUM_SRC);
    drumAudio.volume = 0.6;
    drumAudio.preload = 'auto';
  }

  function playDrum() {
    initDrum();
    drumAudio.currentTime = 0;
    drumAudio.play().catch(function(){});
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        playing: ambientPlaying,
        volume: audio ? audio.volume : 0.35,
        time: audio ? audio.currentTime : 0
      }));
    } catch(e) {}
  }

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
    audio.preload = 'auto';

    if (state.playing) {
      audio.currentTime = state.time || 0;
      audio.play().then(function() {
        ambientPlaying = true;
        updateUI(true);
      }).catch(function(){});
    }
  }

  function startAmbient() {
    initAudio();
    audio.play().then(function() {
      ambientPlaying = true;
      saveState();
      updateUI(true);
    }).catch(function(){});
  }

  function stopAmbient() {
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    ambientPlaying = false;
    saveState();
    updateUI(false);
  }

  function updateUI(playing) {
    var btn = document.getElementById('audio-toggle');
    if (!btn) return;
    var iconOff = btn.querySelector('.audio-icon--off');
    var iconOn = btn.querySelector('.audio-icon--on');
    if (playing) {
      iconOff.style.display = 'none';
      iconOn.style.display = '';
      btn.classList.add('is-playing');
    } else {
      iconOff.style.display = '';
      iconOn.style.display = 'none';
      btn.classList.remove('is-playing');
    }
    var slider = document.getElementById('audio-volume');
    if (slider && audio) {
      slider.value = Math.round(audio.volume * 100);
    }
  }

  function createWidget() {
    var widget = document.createElement('div');
    widget.className = 'audio-widget';
    widget.innerHTML =
      '<button class="audio-btn" id="audio-toggle" aria-label="Activer le son">' +
        '<svg class="audio-icon audio-icon--off" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
          '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>' +
          '<line x1="23" y1="9" x2="17" y2="15"></line>' +
          '<line x1="17" y1="9" x2="23" y2="15"></line>' +
        '</svg>' +
        '<svg class="audio-icon audio-icon--on" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none">' +
          '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>' +
          '<path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>' +
          '<path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>' +
        '</svg>' +
      '</button>' +
      '<div class="audio-volume-panel">' +
        '<input type="range" class="audio-slider" id="audio-volume" min="0" max="100" value="35" aria-label="Volume">' +
      '</div>';
    document.body.appendChild(widget);

    var toggleBtn = document.getElementById('audio-toggle');
    var slider = document.getElementById('audio-volume');

    toggleBtn.addEventListener('click', function () {
      if (ambientPlaying) {
        stopAmbient();
      } else {
        startAmbient();
      }
    });

    slider.addEventListener('input', function () {
      var val = parseInt(slider.value, 10) / 100;
      if (audio) audio.volume = val;
      saveState();
    });

    // Sync UI with saved state
    var state = loadState();
    if (state.playing) {
      initAudio();
    } else {
      updateUI(false);
    }
  }

  function bindTransitionSounds() {
    document.querySelectorAll('a[href]').forEach(function (link) {
      var href = link.getAttribute('href');
      if (!href || href.charAt(0) === '#' || href.indexOf('http') === 0 || href.indexOf('mailto') === 0) return;

      link.addEventListener('click', function (e) {
        if (e.metaKey || e.ctrlKey) return;
        e.preventDefault();
        saveState();
        playDrum();
        setTimeout(function () { window.location.href = href; }, 250);
      });
    });
  }

  // Save state before page unload
  window.addEventListener('beforeunload', function () {
    saveState();
  });

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
