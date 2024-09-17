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
      path: '../public/img/photos/picture-0.jpg',
      alt: 'Dessert',
      class: 'slideshow-img',
    },
    {
      path: '../public/img/photos/picture-1.jpg',
      alt: 'Greenery and creek',
      class: 'slideshow-img',
    },
    {
      path: '../public/img/photos/picture-2.jpg',
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

dotsContainer.addEventListener('click', (e) => {
  if (!e.target.classList.contains('dot-icon')) return;
  if (e.target.closest('li').classList.contains('active')) return;

  const getIndex = (el) => el.getAttribute('data-index');

  const dot = e.target.closest('li');
  const index = getIndex(dot);
  const dotsArr = [...dots];
  let currentDot = dotsArr.find((el) => el.classList.contains('active'));
  const picturesArray = [...pictures];
  const currentIndex = getIndex(currentDot); // get active dot's index

  const imgMarkup = (img, className) => {
    return `
    <img
    src="${img.path}"
    alt="${img.alt}"
    class="${img.class} ${className}"
    />
    `;
  };

  const addAnimation = function (el, className, time) {
    return new Promise((resolve) => {
      setTimeout(() => {
        el.classList.add(className);
        resolve();
      }, time);
    });
  };

  // Visually indicate what dot is active:
  currentDot.classList.remove('active');
  currentDot.querySelector('img').classList.remove('dot-active');
  dot.classList.add('active');
  dot.querySelector('img').classList.add('dot-active');

  const applyAnimations = async function () {
    // Minimize current images
    for (const img of picturesArray) {
      await addAnimation(img, 'minimize', 200);
    }

    // Clear
    picturesContainer.innerHTML = '';
    /*
    // Maximize new images
    for (const img of slideshow[index].flat()) {
      picturesContainer.insertAdjacentHTML(
        'afterbegin',
        imgMarkup(img, 'scale-zero')
      );

      await addAnimation(img, 'maximize', 200);
    }
    */
  };

  applyAnimations();
});

//console.log('currentDot:', currentDot);
//console.log('dot:', dot);
//console.log('index:', index);
//console.log('dotsArr:', dotsArr);
//console.log('currentIndex:', currentIndex);
