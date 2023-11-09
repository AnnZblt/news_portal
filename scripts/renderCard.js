const localeDate = (date) => {
  const formatDate = new Date(date).toLocaleString('ru-RU', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  return formatDate;
};

const renderNewsCard = (err, data) => {
  if (err) {
    console.warn(err, data);
    return;
  }

  const template = document.createDocumentFragment();

  if (data.length === 0) {
    const notFoundedNews = document.createElement('p');
    notFoundedNews.classList.add('news__notfounded');
    notFoundedNews.textContent = 'Не нашли новостей по этой теме :(';

    template.append(notFoundedNews);
    return template;
  }

  const news = data.map(item => {
    if (item.author === null) {
      item.author = '';
    }

    if (item.description === null) {
      item.description = '';
    }

    const date = localeDate(item.publishedAt);

    const newsCard = document.createElement('div');
    newsCard.classList.add('news__card');
    newsCard.innerHTML = `
      <div class="new__card_image-wrapper">
        <img class="news__card_image hidden" src="${item.urlToImage}"
          alt="${item.title}">
      </div>
      <a class="news__card_link" href="${item.url}">
        <h3 class="news__card_title">${item.title}</h3>
      </a>
      <p class="news__card_description">${item.description}</p>
      <div class="news__card_puplish-wrapper">
        <p class="news__card_publish-date">${date}</p>
        <p class="news__card_publish-author news__card_publish_source">${item.source.name}</p>
      </div>
    `;

    return newsCard;
  });

  template.append(...news);

  return template;
};

export default renderNewsCard;
