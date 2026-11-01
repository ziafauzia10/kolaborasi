const nav = document.querySelector('.nav');
const hamburger = document.getElementById('hamburger');
const dropdown = document.getElementById('navDropdown');

function setMenu(open) {
  if (!nav || !hamburger) return;
  nav.classList.toggle('active', open);
  hamburger.classList.toggle('active', open);
  hamburger.setAttribute('aria-expanded', String(open));
  hamburger.setAttribute('aria-label', open ? 'Tutup menu navigasi' : 'Buka menu navigasi');
}

hamburger?.addEventListener('click', () => {
  setMenu(hamburger.getAttribute('aria-expanded') !== 'true');
});

dropdown?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    setMenu(false);
    closeLightbox();
  }
});

document.addEventListener('click', (event) => {
  if (nav && !nav.contains(event.target)) setMenu(false);
});

// Mark the section currently in view for both desktop and mobile navigation.
const sectionLinks = [...document.querySelectorAll('.nav-links a, .nav-dropdown a')];
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    sectionLinks.forEach((link) => {
      if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  });
}, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });
document.querySelectorAll('header[id], main[id], section[id]').forEach((section) => sectionObserver.observe(section));

// Reveal content as it enters the viewport; preserve content when motion is reduced.
const revealTargets = document.querySelectorAll('.content-left, .masalah-header, .solusi-card, .card, .mapel-block, .team h2, .member, .contact-container');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((element) => {
    element.classList.add('reveal');
    revealObserver.observe(element);
  });
}

// Product preview lightbox for the mathematics project artwork.
const lightbox = document.getElementById('imageLightbox');
const lightboxImage = lightbox?.querySelector('.lightbox-image');
const closeButton = lightbox?.querySelector('.lightbox-close');
let previousFocus = null;

function openLightbox(image) {
  if (!lightbox || !lightboxImage) return;
  previousFocus = document.activeElement;
  lightboxImage.src = image.currentSrc || image.src;
  lightboxImage.alt = image.alt;
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
  closeButton?.focus();
}

function closeLightbox() {
  if (!lightbox || lightbox.hidden) return;
  lightbox.hidden = true;
  lightboxImage.removeAttribute('src');
  document.body.style.overflow = '';
  previousFocus?.focus?.();
}

document.querySelectorAll('.math-card > img').forEach((image) => {
  image.tabIndex = 0;
  image.setAttribute('role', 'button');
  image.setAttribute('aria-haspopup', 'dialog');
  image.addEventListener('click', () => openLightbox(image));
  image.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openLightbox(image);
    }
  });
});

closeButton?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', (event) => {
  if (event.target === lightbox) closeLightbox();
});

// Keep the existing WhatsApp contact workflow and validate the form first.
document.getElementById('waForm')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const nama = document.getElementById('nama')?.value.trim() || '';
  const email = document.getElementById('email')?.value.trim() || '';
  const pesan = document.getElementById('pesan')?.value.trim() || '';
  const nomor = '6283844173959';
  const teks = `Halo, saya ${nama}\nEmail: ${email}\n\nPesan:\n${pesan}`;
  window.open(`https://wa.me/${nomor}?text=${encodeURIComponent(teks)}`, '_blank', 'noopener,noreferrer');
});
