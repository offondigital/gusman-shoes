// Cookie bar
document.addEventListener('DOMContentLoaded', function() {
  const cookieBtn = document.querySelector('.btn-cookie');
  if (cookieBtn) {
    cookieBtn.addEventListener('click', function() {
      this.closest('.cookie-bar').style.display = 'none';
    });
  }
});

// Menú hamburguesa
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function toggleMenu() {
  mobileMenu.classList.toggle('active');
  document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
}

function closeMenu() {
  mobileMenu.classList.remove('active');
  document.body.style.overflow = 'auto';
}

if (hamburger) {
  hamburger.addEventListener('click', toggleMenu);
}

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.mobile-list a, .mobile-whatsapp a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// Cerrar menú al cambiar tamaño de ventana
window.addEventListener('resize', function() {
  if (window.innerWidth > 1023) {
    closeMenu();
  }
});

// Lazy loading para imágenes de fondo (opcional - mejora adicional)
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const bgImage = img.getAttribute('data-bg');
        if (bgImage) {
          img.style.backgroundImage = `url('${bgImage}')`;
          img.removeAttribute('data-bg');
        }
        observer.unobserve(img);
      }
    });
  });

  document.querySelectorAll('.slide-item[data-bg]').forEach(img => {
    imageObserver.observe(img);
  });
}
