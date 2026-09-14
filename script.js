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
if (howSteps) {
  if (!('IntersectionObserver' in window)) {
    howSteps.classList.add('is-visible');
  } else {
    const stepObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });
    stepObserver.observe(howSteps);
  }
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.focus();
  }
});
