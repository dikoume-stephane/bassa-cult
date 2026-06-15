document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('gastro-track');
  const delay = 3500; // Temps de pause sur le plat actif (3.5 secondes)

  function nextSlide() {
    const cards = document.querySelectorAll('.gastro-card');
    const firstCard = cards[0];
    const cardWidth = firstCard.offsetWidth;
    const gap = parseFloat(window.getComputedStyle(track).gap) || 0;
    const moveDistance = cardWidth + gap;

    // 1. On active la transition CSS sur le rail
    track.style.transition = 'transform 0.8s cubic-bezier(0.25, 1, 0.5, 1)';
    
    // 2. On glisse le rail vers la gauche d'une longueur de carte + espace
    track.style.transform = `translateX(-${moveDistance}px)`;

    // 3. On bascule la classe active sur le plat suivant (qui arrive au centre)
    cards[1].classList.remove('is-active');
    cards[2].classList.add('is-active');

    // 4. Dès que l'animation de glissement est finie (après 800ms)
    setTimeout(() => {
      // On coupe proprement la transition pour faire la manipulation invisible
      track.style.transition = 'none';
      
      // On remet le rail à sa position de départ (0px)
      track.style.transform = 'translateX(0px)';
      
      // On prend la première carte (qui vient de sortir à gauche) et on la pousse à la fin du code HTML
      track.appendChild(firstCard);
    }, 800); // Doit correspondre à la durée de l'animation CSS (0.8s)
  }

  // 🔄 Lance la boucle infinie automatique
  setInterval(nextSlide, delay);
});