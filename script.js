const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-nav');
const marqueeTrack = document.querySelector('.marquee-track');
const marqueeGroup = document.querySelector('.marquee-group');

menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!open));
  navigation.classList.toggle('open', !open);
});

const marqueeClone = marqueeGroup.cloneNode(true);
marqueeClone.setAttribute('aria-hidden', 'true');
marqueeClone.querySelectorAll('img').forEach((image) => image.setAttribute('alt', ''));
marqueeTrack.appendChild(marqueeClone);

const howSteps = document.querySelector('.how-steps');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
// Only opt into the animated hidden state when we can reliably reveal it.
// Otherwise the steps stay visible (their default), so nothing can get stuck.
if (howSteps && !prefersReducedMotion && 'IntersectionObserver' in window) {
  howSteps.classList.add('reveal');
  const reveal = () => howSteps.classList.add('is-visible');
  const stepObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        reveal();
        observer.disconnect();
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });
  stepObserver.observe(howSteps);
  // Safety net: if the section is already on-screen at load, reveal next frame.
  requestAnimationFrame(() => {
    const rect = howSteps.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) reveal();
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.focus();
  }
});
