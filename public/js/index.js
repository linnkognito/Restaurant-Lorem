import '../css/styles.css';
import { init } from './init';

const nav = document.querySelector('nav');
const home = document.querySelector('#home');
const about = document.querySelector('#about');
//const pictures = document.querySelector('#pictures');
const menu = document.querySelector('#menu');
const contact = document.querySelector('#contact');

const images = document.querySelectorAll('.picture-container > img');
const dots = document.querySelector('.pictures__dots');

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

dots.addEventListener('click', (e) => {
  e.preventDefault();
  let dot = e.target;
  if (!dot.classList.contains('dot-icon')) return;

  if (dot.classList('')) e.target.classList.add('minimize');
});
