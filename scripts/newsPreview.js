const openNewsPreview = () => {
  const newsLinks = document.querySelectorAll('.news__card_link');

  newsLinks.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const newsUrl = link.href;
      const top = (screen.height - 800) / 2;
      const left = (screen.width - 1000) / 2;
      const features = `width=1000,height=800,top=${top},left=${left}`;
      open(newsUrl, '', features);
    });
  });
};

export default openNewsPreview;
