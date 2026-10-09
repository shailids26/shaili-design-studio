import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
(window as any).__siteReady = true;

// Reveals
const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
if (reduced || !('IntersectionObserver' in window)) items.forEach((e) => e.classList.add('in'));
else {
  const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { rootMargin: '0px 0px -8% 0px' });
  items.forEach((e) => io.observe(e));
}

// Parallax (transform only)
if (!reduced) {
  gsap.registerPlugin(ScrollTrigger);
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    gsap.fromTo(el, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
  });
}

// Custom cursor
if (!reduced && matchMedia('(pointer: fine)').matches) {
  try {
    const dot = document.createElement('div');
    dot.className = 'cursor-dot hide'; dot.setAttribute('aria-hidden', 'true');
    document.body.appendChild(dot);
    const x = gsap.quickTo(dot, 'x', { duration: .25 }), y = gsap.quickTo(dot, 'y', { duration: .25 });
    addEventListener('mousemove', (e) => { x(e.clientX); y(e.clientY); dot.classList.remove('hide');
      const t = e.target as HTMLElement;
      dot.classList.toggle('big', !!t.closest('a,button,summary,[data-cursor]'));
      dot.classList.toggle('hide', !!t.closest('input,textarea,select'));
    });
    document.addEventListener('mouseleave', () => dot.classList.add('hide'));
    document.documentElement.classList.add('has-cursor');
  } catch { /* system cursor remains */ }
}

// Mobile menu (native dialog: focus trap, Escape, focus restore)
const menu = document.getElementById('menu') as HTMLDialogElement | null;
const openBtn = document.getElementById('menu-open');
if (menu && openBtn) {
  openBtn.addEventListener('click', () => { menu.showModal(); openBtn.setAttribute('aria-expanded', 'true'); });
  menu.addEventListener('close', () => { openBtn.setAttribute('aria-expanded', 'false'); (openBtn as HTMLElement).focus(); });
  menu.querySelectorAll('[data-close]').forEach((b) => b.addEventListener('click', () => menu.close()));
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => menu.close()));
  matchMedia('(min-width: 1280px)').addEventListener('change', (m) => m.matches && menu.open && menu.close());
}