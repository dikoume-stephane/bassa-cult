// ── Navbar scroll effect ──────────────────────────────────
    const nav = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });

    // ── Reveal on scroll ─────────────────────────────────────
    const revealEls = document.querySelectorAll(
      '.intro-inner, .hex-item, .news-card, .proverb-inner, .mission-inner'
    );
    revealEls.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Légère animation en cascade pour les éléments groupés
          setTimeout(() => entry.target.classList.add('visible'), i * 80);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(el => observer.observe(el));