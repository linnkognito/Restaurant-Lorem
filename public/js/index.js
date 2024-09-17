import '../css/styles.css';
import { init } from './init';

const nav = document.querySelector('nav');
const home = document.querySelector('#home');
const about = document.querySelector('#about');
const menu = document.querySelector('#menu');
const contact = document.querySelector('#contact');

const picturesContainer = document.querySelector('.pictures-container');
const pictures = document.querySelectorAll('.slideshow-img');
const dotsContainer = document.querySelector('.dots-container');
const dots = document.querySelectorAll('.dot');

//////////////////////////////////////////////

// NAVIGATION //
const classExist = (arr, name) => {
  return arr.some((className) => className.endsWith(name));
};

function smoothScrollTo(targetEl, behavior = 'smooth') {
  targetEl.scrollIntoView({
    behavior,
    block: 'start',
  });
}

const navigation = function (e) {
  if (!e.target.classList.contains('nav__btn')) return;

  const btn = e.target;
  const destinations = [...btn.classList];

  if (classExist(destinations, 'home')) return smoothScrollTo(home);
  if (classExist(destinations, 'about')) return smoothScrollTo(about);
  if (classExist(destinations, 'menu')) return smoothScrollTo(menu);
  if (classExist(destinations, 'contact')) return smoothScrollTo(contact);
};

nav.addEventListener('click', (e) => navigation(e));

//////////////////////////////////////////////

// SLIDESHOW //
const slideshow = [
  [
    {
      path: '../img/photos/picture-0.jpg',
      alt: 'Dessert',
      class: 'slideshow-img',
    },
    {
      path: '../img/photos/picture-1.jpg',
      alt: 'Greenery and creek',
      class: 'slideshow-img',
    },
    {
      path: '../img/photos/picture-2.jpg',
      alt: 'Close up of a plate with foie gras dumplings for fall',
      class: 'slideshow-img',
    },
  ],
  [
    {
      path: '../img/photos/picture-3.jpg',
      alt: 'Flower',
      class: 'slideshow-img',
    },
    {
      path: '../img/photos/picture-4.jpg',
      alt: 'Close up of a plate with foie gras dumplings for spring',
      class: 'slideshow-img',
    },
    {
      path: '../img/photos/picture-5.jpg',
      alt: 'Japanese garden',
      class: 'slideshow-img',
    },
  ],
];

const changeSlideshow = function (e) {
  // DOTS //
  const dot = e.target.closest('li');
  if (dot.classList.contains('active')) return;

  const index = dot.getAttribute('data-index');
  const dotsArr = [...dots];
  let currentDot = dotsArr.find((el) => el.classList.contains('active'));

  // Visually indicate what dot is active:
  currentDot.classList.remove('active');
  currentDot.querySelector('img').classList.remove('dot-active');
  dot.classList.add('active');
  dot.querySelector('img').classList.add('dot-active');

  // PICTURES //
  let imgArr = [...pictures];

  const imgMarkup = (img) => {
    return `
    <img
    src="${img.path}"
    alt="${img.alt}"
    class="${img.class} scale-zero"
    />
    `;
  };

  const addAnimation = function (el, className) {
    return new Promise((resolve) => {
      el.classList.add(className);
      setTimeout(() => {
        resolve();
      }, 100);
    });
  };

  const applyAnimations = async function () {
    // Minimize current images
    for (const img of imgArr) {
      await addAnimation(img, 'minimize');
    }

    // Clear
    picturesContainer.innerHTML = '';

    // Insert markup for new images
    for (const img of slideshow[index].flat()) {
      picturesContainer.insertAdjacentHTML('afterbegin', imgMarkup(img));
    }

    // Insert new images
    imgArr = [...document.querySelectorAll('.pictures-container img')];

    // Maximize new images
    for (const img of imgArr) {
      img.classList.remove('scale-zero'); // test
      await addAnimation(img, 'maximize');
    }
  };
  applyAnimations();
};

dotsContainer.addEventListener('click', (e) => {
  if (!e.target.classList.contains('dot-icon')) return;
  changeSlideshow(e);
});
