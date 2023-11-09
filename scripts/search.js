const searchWrapper = document.querySelector('.search__wrapper');
const searchInput = document.querySelector('.header__search_input');
const searchButton = document.querySelector('.header__search_button');

export const showSearchInput = () => {
  searchWrapper.classList.add('search__wrapper_active');
  searchInput.classList.remove('hidden');
  searchButton.classList.remove('hidden');
};

export const hideSearchInput = () => {
  searchWrapper.classList.remove('search__wrapper_active');
  searchInput.classList.add('hidden');
  searchButton.classList.add('hidden');
};
