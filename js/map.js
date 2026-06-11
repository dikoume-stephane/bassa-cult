document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Initialisation de la carte
  const map = L.map('map-bassa').setView([4.05, 10.50], 8.5);

  // Variables pour stocker les couches interchangeables
  let currentTileLayer = null;
  let geojsonLayer = null;

  // 🗺️ Configuration des deux thèmes disponibles
  const mapThemes = {
    dark: {
      tiles: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
      zoneDefault: { color: "#ffd54f", weight: 2, opacity: 0.6, fillColor: "#ffb300", fillOpacity: 0.1 },
      zoneHover: { color: "#ffffff", weight: 3, fillOpacity: 0.35 }
    },
    light: {
      tiles: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', // Fond clair Positron
      zoneDefault: { color: "#b58900", weight: 2, opacity: 0.7, fillColor: "#b58900", fillOpacity: 0.08 },
      zoneHover: { color: "#000000", weight: 3, fillOpacity: 0.25 }
    }
  };

  // 🔄 FONCTION POUR CHANGER LE THÈME DE LA CARTE
  function updateMapTheme() {
    // ✅ CORRECTIF : On lit l'attribut de ton fichier theme.js
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    
    const themeChosen = isDark ? mapThemes.dark : mapThemes.light;

    // A. Mise à jour du fond de carte (Tiles)
    if (currentTileLayer) {
      map.removeLayer(currentTileLayer);
    }
    currentTileLayer = L.tileLayer(themeChosen.tiles, {
      attribution: '&copy; OpenStreetMap contributors &copy; CARTO',
      maxZoom: 13,
      minZoom: 7,
      detectRetina: true
    }).addTo(map);

    // B. Mise à jour du style des frontières GeoJSON (si déjà chargées)
    if (geojsonLayer) {
      geojsonLayer.setStyle(themeChosen.zoneDefault);
    }
  }
  // Initialisation du premier thème au chargement
  updateMapTheme();

  // ==========================================
  // 📍 POINTS HISTORIQUES (MARKERS)
  // ==========================================
  // Point 1 : Édéa
  const markerEdea = L.marker([3.80, 10.13]).addTo(map);
  markerEdea.bindPopup(`
    <div class="map-popup">
      <h3>Édéa</h3>
      <p>Ville carrefour de la Sanaga-Maritime, historiquement liée aux ponts et aux mouvements autour du grand fleuve.</p>
    </div>
  `);

  // Point 2 : Sakbayémé
  const markerSakbayeme = L.marker([4.22, 10.57]).addTo(map);
  markerSakbayeme.bindPopup(`
    <div class="map-popup">
      <h3>Sakbayémé</h3>
      <p>Haut-lieu de l'histoire Bassa sur les rives de la Sanaga, connu pour son rôle central dans la région de Babimbi.</p>
    </div>
  `);

  // Point 3 : Ngog Lituba
  const markerNgogLituba = L.marker([4.30, 10.92]).addTo(map);
  markerNgogLituba.bindPopup(`
    <div class="map-popup">
      <h3>Ngog Lituba</h3>
      <p>Le rocher sacré. Site mythique, spirituel et culturel, considéré traditionnellement comme le berceau de la création du peuple.</p>
    </div>
  `);

  // ==========================================
  // 🗺️ CHARGEMENT DES FRONTIE`RES (GEOJSON)
  // ==========================================
  fetch('../assets/data/zones_bassa1.geojson')
    .then(response => response.json())
    .then(geojsonData => {
      
      // Récupérer le thème actif pour le style de départ
      const isDark = document.documentElement.classList.contains("dark-theme") || document.body.classList.contains("dark");
      const initialTheme = isDark ? mapThemes.dark : mapThemes.light;

      geojsonLayer = L.geoJSON(geojsonData, {
        style: initialTheme.zoneDefault,
        onEachFeature: (feature, layer) => {
          const zoneName = feature.properties.NAME_2 || feature.properties.ADM2_FR || "Territoire Bassa";

          layer.bindPopup(`<div class="map-popup"><h3>${zoneName}</h3><p>Région d'implantation historique Bassa.</p></div>`);

          // Gestion dynamique des survols
          layer.on({
            mouseover: (e) => {
              // ✅ CORRECTIF : Détection basée sur data-theme
              const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
              e.target.setStyle(isDark ? mapThemes.dark.zoneHover : mapThemes.light.zoneHover);
              e.target.bringToFront();
            },
            mouseout: (e) => {
              // ✅ CORRECTIF : Détection basée sur data-theme
              const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
              e.target.setStyle(isDark ? mapThemes.dark.zoneDefault : mapThemes.light.zoneDefault);
            }
          });
        }
      }).addTo(map);
    })
    .catch(error => console.error("Erreur GeoJSON :", error));


  // ==========================================
  // 🎛️ ÉCOUTEUR DU CHANGEMENT DE THE`ME
  // ==========================================
  // Si tu as un bouton pour changer de thème, ajoute l'appel à `updateMapTheme()` dedans.
  // Exemple si ton bouton possède l'id "theme-toggle" :
  const themeBtn = document.getElementById("theme-toggle");
  if (themeBtn) {
    themeBtn.addEventListener("click", () => {
      // On attend une fraction de seconde que la classe CSS bascule sur le HTML avant de mettre la carte à jour
      setTimeout(updateMapTheme, 50);
    });
  }

  // ==========================================
  // 🎛️ ÉCOUTEUR DU CHANGEMENT DE THÈME AUTOMATIQUE
  // ==========================================
  const observer = new MutationObserver(updateMapTheme);
  // ✅ CORRECTIF : On surveille uniquement les modifications de 'data-theme'
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

});