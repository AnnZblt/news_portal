const main = document.querySelector('.main');

const preload = {
  circle: `<img class="overlay__image" src="images/preload.svg">`,
  overlay: document.createElement('div'),

  show() {
    this.overlay.classList.add('overlay');
    this.overlay.innerHTML = this.circle;
    main.prepend(this.overlay);
  },

  remove() {
    this.overlay.remove();
  },
};

export default preload;
