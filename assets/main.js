// ---- Scroll reveal (staggered groups) ----
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('[data-reveal],[data-reveal-group]').forEach(el => io.observe(el));

// ---- Nav scrolled state ----
const nav = document.getElementById('nav');
if (nav) addEventListener('scroll', () => nav.classList.toggle('scrolled', scrollY > 10), { passive: true });

// ---- Mobile menu ----
const burger = document.getElementById('burger');
if (burger && nav) {
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('menu-open');
    burger.setAttribute('aria-expanded', open);
  });
  document.querySelectorAll('#navLinks a').forEach(a =>
    a.addEventListener('click', () => { nav.classList.remove('menu-open'); burger.setAttribute('aria-expanded', 'false'); })
  );
}

// ---- FAQ accordion ----
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-q');
  const body = item.querySelector('.faq-a');
  if (!btn || !body) return;
  btn.addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(o => {
      o.classList.remove('open');
      o.querySelector('.faq-a').style.maxHeight = null;
      o.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
    });
    if (!wasOpen) {
      item.classList.add('open');
      body.style.maxHeight = body.scrollHeight + 'px';
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// ---- Language switcher ----
const langSwitch = document.getElementById('langSwitch');
const langBtn = document.getElementById('langBtn');
if (langSwitch && langBtn) {
  langBtn.addEventListener('click', e => {
    e.stopPropagation();
    const open = langSwitch.classList.toggle('open');
    langBtn.setAttribute('aria-expanded', open);
  });
  document.addEventListener('click', e => {
    if (!langSwitch.contains(e.target)) {
      langSwitch.classList.remove('open');
      langBtn.setAttribute('aria-expanded', 'false');
    }
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && langSwitch.classList.contains('open')) {
      langSwitch.classList.remove('open');
      langBtn.setAttribute('aria-expanded', 'false');
      langBtn.focus();
    }
  });
}

// ---- Mouse-follow specular glow on glass cards ----
document.querySelectorAll('.glow-card').forEach(card => {
  card.addEventListener('pointermove', e => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
    card.style.setProperty('--my', (e.clientY - r.top) + 'px');
  });
});
