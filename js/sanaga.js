let scrollTimer = null;

window.addEventListener("scroll", () => {
  // 1. Dès qu'on détecte un scroll, on ajoute la classe d'illumination
  document.documentElement.classList.add("is-scrolling");

  // 2. On annule le compte à rebours précédent tant que ça bouge
  window.clearTimeout(scrollTimer);

  // 3. On lance un chrono de 200ms. S'il arrive au bout sans nouveau scroll, on éteint
  scrollTimer = setTimeout(() => {
    document.documentElement.classList.remove("is-scrolling");
  }, 200); // 200 millisecondes d'immobilité = arrêt
});