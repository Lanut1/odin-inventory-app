const menu = document.querySelector('.header-menu');
const overlay = document.querySelector('.header-overlay');

function toggleMenu() {
  menu.classList.toggle('active');
  overlay.classList.toggle('active');
}

document.addEventListener('click', (event) => {
  if (!menu.contains(event.target) && !event.target.closest('.menu-toggle')) {
    menu.classList.remove('active');
    overlay.classList.remove('active');
  }
});