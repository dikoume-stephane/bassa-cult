//script pour l'animation de la carte de la grotte dans la page histoire
document.addEventListener('DOMContentLoaded', () => {
  const card = document.getElementById('ngok-card');
  const openBtn = document.getElementById('open-ngok');
  const closeBtn = document.getElementById('close-ngok');
  const backdrop = document.getElementById('ngok-backdrop');

  // Fonction centrale pour ouvrir ou fermer la carte
  function toggleNgokCard(expand) {
    // Si le navigateur ne gère pas encore l'API, on applique le changement brutalement
    if (!document.startViewTransition) {
      if (expand) {
        card.classList.add('is-expanded');
        document.body.classList.add('ngok-open');
      } else {
        card.classList.remove('is-expanded');
        document.body.classList.remove('ngok-open');
      }
      return;
    }

    // 🌟 Lancement de la View Transition
    document.startViewTransition(() => {
      if (expand) {
        card.classList.add('is-expanded');
        document.body.classList.add('ngok-open');
      } else {
        card.classList.remove('is-expanded');
        document.body.classList.remove('ngok-open');
        
        // Sécurité : On remet l'écran au niveau de la carte pour ne pas perdre l'utilisateur
        card.scrollIntoView({ behavior: 'instant', block: 'center' });
      }
    });
  }

  // Événements de clics
  openBtn.addEventListener('click', () => toggleNgokCard(true));
  closeBtn.addEventListener('click', () => toggleNgokCard(false));
  backdrop.addEventListener('click', () => toggleNgokCard(false)); // Ferme aussi si on clique à côté
});