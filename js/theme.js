const checkbox = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');

// 1. Initialisation au chargement de la page
if (currentTheme === 'light') {
  document.documentElement.setAttribute('data-theme', 'light');
  checkbox.checked = true; // Place la bulle de verre sur le soleil dès le départ
} else {
  document.documentElement.setAttribute('data-theme', 'dark');
  checkbox.checked = false;
}

// 2. Écoute du clic sur le Toggle
checkbox.addEventListener('change', () => {
  if (checkbox.checked) {
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.setItem('theme', 'light');
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
  }
});