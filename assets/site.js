// Northern Resilience Initiatives - Site JS
document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !expanded);
      nav.classList.toggle('open');
    });
  }

  // Auto-update year in footer
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // Professional scroll reveals (respect reduced motion)
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const observerOptions = {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  };

  const makeVisible = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(makeVisible, observerOptions);

  // Headings, eyebrows, section intros
  document.querySelectorAll(
    '.section-pad h2, .section-pad .eyebrow, .program-detail h2, .section-header, .intro-grid, .intro-text, .mv-grid, .resource-list'
  ).forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });

  // Motto band
  document.querySelectorAll('.motto-band').forEach(el => {
    observer.observe(el);
  });

  // Cards (program, value, mv, resource)
  document.querySelectorAll(
    '.program-card, .mv-card, .values-grid article, .form-card'
  ).forEach(el => {
    el.classList.add('reveal-card');
    observer.observe(el);
  });

  // Photos & image grids – professional scale reveal
  document.querySelectorAll(
    '.img-grid img, .photo-section img, .about-hero img, .page-hero img'
  ).forEach(el => {
    el.classList.add('reveal-img');
    observer.observe(el);
  });

  // Photo section text side (the non-image child)
  document.querySelectorAll('.photo-section').forEach(section => {
    Array.from(section.children).forEach(child => {
      if (!child.querySelector('img') && child.tagName !== 'IMG') {
        child.classList.add('reveal-right');
        observer.observe(child);
      }
    });
  });

  // Quote & CTA bands
  document.querySelectorAll('.quote-band, .cta-section').forEach(el => {
    observer.observe(el);
  });

  // Program detail blocks
  document.querySelectorAll('.program-detail').forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = `${i * 0.08}s`;
    observer.observe(el);
  });

  // Any remaining section content that benefits from entrance
  document.querySelectorAll(
    '.contact-grid > *, .involvement-grid > *, .split-content > *'
  ).forEach((el, i) => {
    el.classList.add(i % 2 === 0 ? 'reveal-left' : 'reveal-right');
    observer.observe(el);
  });
});
