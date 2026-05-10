/* ============================================================
   ROI — main.js  |  Nav · Reveals · Magnetic · Tilt · Drawer
   Zero Three.js. Zero custom cursor. Lean and fast.
   ============================================================ */

/* ── SCROLL PROGRESS ─────────────────────────────────────── */
const scrollProg = document.getElementById('scroll-prog');
window.addEventListener('scroll', () => {
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  if (scrollProg) scrollProg.style.width = pct + '%';
}, { passive: true });

/* ── NAV scroll ───────────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

/* ── MOBILE BURGER ────────────────────────────────────────── */
const burger = document.getElementById('nav-burger');
const drawer = document.getElementById('nav-drawer');
burger?.addEventListener('click', () => {
  const open = burger.classList.toggle('open');
  drawer.classList.toggle('open', open);
});
drawer?.querySelectorAll('.drawer-link').forEach(a => {
  a.addEventListener('click', () => {
    burger.classList.remove('open');
    drawer.classList.remove('open');
  });
});

/* ── SCROLL REVEAL ────────────────────────────────────────── */
const revObs = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    revObs.unobserve(entry.target);
  });
}, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

/* ── ACTIVE NAV LINK ──────────────────────────────────────── */
const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id]');
const secObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(a => a.classList.remove('active'));
    const match = [...navLinks].find(a => a.getAttribute('href') === '#' + entry.target.id);
    if (match) match.classList.add('active');
  });
}, { threshold: 0.4 });
sections.forEach(s => secObs.observe(s));

/* ── MAGNETIC BUTTONS ─────────────────────────────────────── */
document.querySelectorAll('.btn-solid, .btn-outline, .nav-cta').forEach(el => {
  const R = 70;
  el.addEventListener('mousemove', e => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width  / 2;
    const y = e.clientY - rect.top  - rect.height / 2;
    const d = Math.sqrt(x * x + y * y);
    if (d < R) {
      const f = (R - d) / R;
      el.style.transform = `translate(${x * f * 0.28}px, ${y * f * 0.28}px)`;
    }
  });
  el.addEventListener('mouseleave', () => { el.style.transform = ''; });
});

/* ── PROJECT SCREEN TILT ──────────────────────────────────── */
document.querySelectorAll('.proj-screen').forEach(el => {
  const MAX = 5;
  el.addEventListener('mousemove', e => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width  - 0.5;
    const y = (e.clientY - r.top)  / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateX(${-y * MAX}deg) rotateY(${x * MAX}deg)`;
    el.style.transition = 'none';
  });
  el.addEventListener('mouseleave', () => {
    el.style.transition = 'transform 0.5s cubic-bezier(0.22,1,0.36,1)';
    el.style.transform  = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
  });
});

/* ── COPY EMAIL ───────────────────────────────────────────── */
const copyEmailBtn = document.querySelector('.copy-email');
if (copyEmailBtn) {
  copyEmailBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const email = copyEmailBtn.getAttribute('data-email');
    const textSpan = copyEmailBtn.querySelector('.cl-email-text');
    const originalText = textSpan.innerText;
    
    navigator.clipboard.writeText(email).then(() => {
      textSpan.innerText = 'Copied to clipboard!';
      textSpan.style.color = 'var(--cc)';
      setTimeout(() => {
        textSpan.innerText = originalText;
        textSpan.style.color = '';
      }, 2000);
    });
  });
}
