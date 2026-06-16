document.addEventListener("DOMContentLoaded", () => {
  
  // Cibler toutes les flip-cards de la page
  const flipCards = document.querySelectorAll(".js-flip-card");

  flipCards.forEach(card => {
    card.addEventListener("click", () => {
      // Alterne la classe qui applique la rotation de 180deg
      card.classList.toggle("is-flipped");
    });
  });
  
});