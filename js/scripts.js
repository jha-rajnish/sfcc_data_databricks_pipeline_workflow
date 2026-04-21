/*----------------------------------------------*
  © Rajnish Jha, India. All Rights Reserved.
*----------------------------------------------*/

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

// ── Reveal on scroll ──
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        e.target.style.transitionDelay = i * 0.05 + 's';
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
reveals.forEach((el) => io.observe(el));

// ── Carousel ──
let cur = 0;
const slides = document.getElementById('slides');
const dots = document.querySelectorAll('.dot');
const total = 3;

function goTo(n) {
  cur = (n + total) % total;
  slides.style.transform = `translateX(-${cur * 100}%)`;
  dots.forEach((d, i) => d.classList.toggle('active', i === cur));
}

document
  .getElementById('prevBtn')
  .addEventListener('click', () => goTo(cur - 1));
document
  .getElementById('nextBtn')
  .addEventListener('click', () => goTo(cur + 1));
dots.forEach((d) =>
  d.addEventListener('click', () => goTo(+d.dataset.i))
);

// auto-advance
setInterval(() => goTo(cur + 1), 5000);

// keyboard
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') goTo(cur - 1);
  if (e.key === 'ArrowRight') goTo(cur + 1);
});