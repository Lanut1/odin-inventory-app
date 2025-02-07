function toggleFilters() {
  const filterForm = document.querySelector('.products-page__form');
  const icon = document.querySelector('.filters-toggle .material-symbols-outlined');

  filterForm.classList.toggle('active');

  if (filterForm.classList.contains('active')) {
    icon.textContent = 'keyboard_double_arrow_up';
  } else {
    icon.textContent = 'keyboard_double_arrow_down';
  }
}