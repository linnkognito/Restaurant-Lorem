import '../css/styles.css';
import { init } from './init';

const nav = document.querySelector('nav');
const home = document.querySelector('#home');
const about = document.querySelector('#about');
const menu = document.querySelector('#menu');
const contact = document.querySelector('#contact');

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
      class: 'slideshow-img pictures-img-1',
    },
    {
      path: '../public/img/photos/picture-1.jpg',
      alt: 'Greenery and creek',
      class: 'slideshow-img pictures-img-1',
    },
    {
      path: '../public/img/photos/picture-2.jpg',
      alt: 'Close up of a plate with foie gras dumplings for fall',
      class: 'slideshow-img pictures-img-1',
    },
  ],
  [
    {
      path: '../public/img/photos/picture-3.jpg',
      alt: 'Flower',
      class: 'slideshow-img pictures-img-1',
    },
    {
      path: '../public/img/photos/picture-4.jpg',
      alt: 'Close up of a plate with foie gras dumplings for spring',
      class: 'slideshow-img pictures-img-1',
    },
    {
      path: '../public/img/photos/picture-5.jpg',
      alt: 'Japanese garden',
      class: 'slideshow-img pictures-img-1',
    },
  ],
];
// markup = `
//     <img
//           src="${img.path}"
//           alt="${img.alt}"
//           class="${img.class}"
//         />
//     `;

dotsContainer.addEventListener('click', (e) => {
  if (!e.target.classList.contains('dot-icon')) return;

  const dot = e.target;
  const dotsArr = [...dots];
  let activeDot = dotsArr.find((el) => el.classList.contains('active'));

  const getIndex = (el) => el.getAttribute('data-index');

  console.log(activeDot);
  console.log(slideshow[getIndex(activeDot)]);

  // Apply minimize to active dots image array (nested)

  // Apply minimize
  //slideshow[index].forEach((img) => {});
});
