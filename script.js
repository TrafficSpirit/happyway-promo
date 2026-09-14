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

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    navigation.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.focus();
  }
});
