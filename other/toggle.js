const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

// Toggle menu visibility and hamburger animation
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  menu.classList.toggle('active');
});
