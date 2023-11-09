const preloadImages = () => {
  const newsImages = document.querySelectorAll('.news__card_image');
  const newsImagesWrappers = document.querySelectorAll('.new__card_image-wrapper');
  const imagesArr = Array.from(newsImages);

  const loadImg = url => new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.addEventListener('load', () => {
      resolve(img);
    });
    img.addEventListener('error', (err) => {
      console.error('Ошибка загрузки изображения:', err);
      const placeholderImage = new Image();
      placeholderImage.src = '/images/no_photo.jpg';
      resolve(placeholderImage);
    });
  });

  const showImages = async () => {
    newsImagesWrappers.forEach(item => {
      const preloadPlug = new Image();
      preloadPlug.src = '/images/preload.gif';
      preloadPlug.classList.add('news__image_preload');
      item.append(preloadPlug);
    });
    const promises = imagesArr.map(image => loadImg(image.src));
    const images = await Promise.all(promises);
    return images;
  };

  showImages().then(data => {
    data.forEach((image, index) => {
      const wrapper = newsImagesWrappers[index];
      wrapper.innerHTML = '';
      image.classList.add('news__card_image');
      wrapper.appendChild(image);
    });
  });
};

export default preloadImages;
