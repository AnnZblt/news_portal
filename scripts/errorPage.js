const errorResponseMessage = () => {
  const mainContainer = document.querySelector('.main__container');
  const newsWrappers = mainContainer.querySelectorAll('.news__wrapper');

  const errorContainer = document.createElement('div');
  const errorTitle = document.createElement('h3');
  const errorText = document.createElement('p');
  const errorImageContainer = document.createElement('div');

  errorContainer.classList.add('error__response');
  errorTitle.classList.add('error__response-title');
  errorText.classList.add('error__response-text');
  errorImageContainer.classList.add('error__response-image');
  for (let wrapper of newsWrappers) {
    wrapper.classList.add('hidden');
  }

  errorTitle.textContent = 'Что-то пошло не так';
  errorText.textContent = 'Кажется, у нас проблемы';

  errorContainer.append(errorTitle, errorText, errorImageContainer);
  mainContainer.prepend(errorContainer);
};

export default errorResponseMessage;
