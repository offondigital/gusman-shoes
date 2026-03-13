// Cookie bar
document.addEventListener('DOMContentLoaded', () => {
  const cookieBtn = document.querySelector('.btn-cookie');
  if (cookieBtn) {
    cookieBtn.addEventListener('click', (e) => {
      e.currentTarget.closest('.cookie-bar').style.display = 'none';
      // Salvar preferência no localStorage
      localStorage.setItem('cookiesAccepted', 'true');
    });
  }

  // Verificar se já aceitou cookies
  if (localStorage.getItem('cookiesAccepted') === 'true') {
    const cookieBar = document.querySelector('.cookie-bar');
    if (cookieBar) cookieBar.style.display = 'none';
  }
});

// Menú hamburguesa com acessibilidade
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', !isExpanded);
    mobileMenu.setAttribute('aria-hidden', isExpanded);
    mobileMenu.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : 'auto';
  });

  // Fechar ao clicar em links
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  });

  // Fechar com tecla ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.setAttribute('aria-hidden', 'true');
      mobileMenu.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });
}

// Fechar menu em resize
window.addEventListener('resize', () => {
  if (window.innerWidth > 1023 && mobileMenu?.classList.contains('active')) {
    hamburger?.setAttribute('aria-expanded', 'false');
    mobileMenu?.setAttribute('aria-hidden', 'true');
    mobileMenu?.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
});

// Lazy loading avançado com Intersection Observer
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
  }, { 
    rootMargin: '200px', // Carrega 200px antes de aparecer
    threshold: 0.01
  });

  // Observar todos os elementos com data-bg
  document.querySelectorAll('.slide-item[data-bg]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Detecção de toque para otimizações mobile
if ('ontouchstart' in window) {
  document.documentElement.classList.add('touch');
}

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Registrar Service Worker para cache (opcional)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(err => {
      console.log('ServiceWorker não suportado:', err);
    });
  });
}
