import fetchRequest from './fetchRequest.js';
import renderNewsCard from './renderCard.js';
import openNewsPreview from './newsPreview.js';
import preload from './preload.js';
import preloadImages from './preloadImages.js';
import {
  showSearchInput,
  hideSearchInput,
} from './search.js';

const urlSearch = 'https://newsapi.org/v2/everything?q=';
const urlHeadlines = 'https://newsapi.org/v2/top-headlines?country=us';
const headlinesNews = document.querySelector('.headlines__news');
const searchNews = document.querySelector('.search__news');
const searchWrapper = document.querySelector('.search__wrapper');
const searchForm = document.querySelector('.header__search_form');
const searchInput = document.querySelector('.header__search_input');

const fillHeadlines = () => {
  const headlinesTitle = document.createElement('h2');
  headlinesTitle.classList.add('headlines__news_title', 'news__title');
  headlinesTitle.textContent = 'Свежие новости';
  headlinesNews.append(headlinesTitle);
};

const fillSearch = (result) => {
  const searchTitle = document.createElement('h2');
  searchTitle.classList.add('search__news_title', 'news__title');
  searchTitle.textContent = `Новости по запросу "${result}"`;
  searchNews.append(searchTitle);
};

const loadHeadlinesNews = async (newsCount, headlinesPostfix) => {
  const data = await fetchRequest(newsCount, urlHeadlines, headlinesPostfix, {
    callback: renderNewsCard,
    headers: {
      'X-Api-Key': '78e29da4749747308cc117b9a6d03d87',
    },
  });
  return data;
};

const loadSearchNews = async (newsCount, searchQuery) => {
  const data = await fetchRequest(newsCount, urlSearch, searchQuery, {
    callback: renderNewsCard,
    headers: {
      'X-Api-Key': '78e29da4749747308cc117b9a6d03d87',
    },
  });
  return data;
};

const handleSearch = async (query) => {
  preload.show();
  try {
    const fetchNews = await Promise.all([
      loadSearchNews(8, query),
      loadHeadlinesNews(4),
    ]);

    headlinesNews.textContent = '';
    searchNews.textContent = '';
    fillHeadlines();
    fillSearch(query);
    preload.remove();
    searchNews.append(fetchNews[0]);
    headlinesNews.append(fetchNews[1]);
  } catch (error) {
    console.log('Произошла ошибка: ', error);
  }
};

// ? ЗАПУСК ПРОГРАММЫ

searchWrapper.addEventListener('click', () => {
  showSearchInput();
});

preload.show();
loadHeadlinesNews(8).then((data) => {
  preload.remove();
  fillHeadlines();
  headlinesNews.append(data);
  openNewsPreview();
}).then(() => {
  preloadImages();
});

searchForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  hideSearchInput();
  const query = searchInput.value.trim();

  if (query) {
    handleSearch(query).then(() => {
      preloadImages();
      openNewsPreview();
    }).catch((error) => {
      console.error('Произошла ошибка:', error);
    });
  }
});

