document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Écouter le clic sur le bouton "Découvrir la recette détaillée"
  document.querySelectorAll(".js-open-recipe").forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault(); // Empêche le comportement par défaut du lien #
      
      // Trouve la carte parente de ce bouton spécifique
      const parentCard = button.closest(".gastro-wide-card");
      // Trouve la recette à l'intérieur de cette carte
      const recipeOverlay = parentCard.querySelector(".recette-card");
      
      if (recipeOverlay) {
        recipeOverlay.classList.add("is-visible");
      }
    });
  });

  // 2. Écouter le clic sur la croix (X) pour fermer la recette
  document.querySelectorAll(".close-recipe").forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
      const recipeOverlay = closeBtn.closest(".recette-card");
      if (recipeOverlay) {
        recipeOverlay.classList.remove("is-visible");
      }
    });
  });
});