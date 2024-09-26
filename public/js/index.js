import '../css/styles.css';

const header = document.querySelector('header');
const home = document.querySelector('#home');
const about = document.querySelector('#about');
const menu = document.querySelector('#menu');
const contact = document.querySelector('#contact');

const picturesContainer = document.querySelector('.pictures-container');
const dotsContainer = document.querySelector('.dots-container');
const dots = document.querySelectorAll('.dot');

const menuItemPreview = document.querySelector('.dish-preview-wrapper');
const menuColumn = document.querySelectorAll('.menu__slip');
const menuStarters = document.querySelectorAll('.menu__slip-starters');
const menuMains = document.querySelectorAll('.menu__slip-mains');

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

header.addEventListener('click', (e) => navigation(e));

//////////////////////////////////////////////

// SLIDESHOW //
const slideshowImages = [
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

  // Helper functions
  const removeClass = (el, className) => el.classList.remove(className);
  const addClass = (el, className) => el.classList.add(className);

  // Visually indicate what dot is active:
  removeClass(currentDot, 'active');
  currentDot.querySelector('img').classList.remove('dot-active');

  addClass(dot, 'active');
  dot.querySelector('img').classList.add('dot-active');

  // PICTURES //
  let currentImages = [...picturesContainer.querySelectorAll('img')];

  const imgMarkup = (img) => {
    return `
    <img
    src="${img.path}"
    alt="${img.alt}"
    class="${img.class} scale-zero"
    />
    `;
  };

  // Apply animation one image at the time
  const addAnimation = function (el, className) {
    return new Promise((resolve) => {
      addClass(el, className);
      setTimeout(() => {
        resolve();
      }, 100);
    });
  };

  const applyAnimations = async function () {
    // Minimize current images
    for (const img of currentImages) {
      img.className = ''; // test
      addClass(img, 'slideshow-img'); // test
      await addAnimation(img, 'minimize');
    }
    // Remove minimized images from the DOM
    currentImages.forEach((img) => img.remove());

    // Insert markup for new images
    for (const img of slideshowImages[index].flat()) {
      picturesContainer.insertAdjacentHTML('afterbegin', imgMarkup(img));
    }

    // Insert new images
    const newImages = [...document.querySelectorAll('.pictures-container img')];

    // Maximize new images
    for (const img of newImages) {
      removeClass(img, 'scale-zero');
      await addAnimation(img, 'maximize');
    }
  };

  applyAnimations();
};

dotsContainer.addEventListener('click', (e) => {
  e.preventDefault();
  if (!e.target.classList.contains('dot-icon')) return;
  changeSlideshow(e);
});

//////////////////////////////////////////////

// PREVIEW DISH //
const loadMenu = async (e, item) => {
  try {
    const res = await fetch('/api/menu');
    const data = await res.json();

    const markup = function (category) {
      return `
      <h4 class="menu__slip-heading">${category}</h4>
      <div class="menu-card__item" data-id="${item.id}"></div>
        <div class="menu-card__item-title--wrapper">
          <p class="menu-card__item-title">${item.name}</p>
          <span class="menu-card__item-price">${item.price}</span>
        </div>
        <em class="menu-card__item-description">${item.description}</em>
      </div>
    `;
    };

    if (data.status === 'success') {
      const menu = data.data.menu;
      menu.forEach((item) => {
        if (item.category === 'starter') {
          menuStarters.innerHTML = '';
          menuStarters.insertAdjacentHTML('beforeend', markup('Starters'));
        }
        if (item.category === 'main') {
          menuStarters.innerHTML = '';
          menuMains.insertAdjacentHTML('beforeend', markup('Mains'));
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const loadPreview = async () => {
  // Get data id from menu item
  const id = item.dataset.id;
};

menuColumn.forEach((col) =>
  col.addEventListener('click', (e) => {
    e.preventDefault();
    const listItem = e.target.closest('.menu-card__item');
    if (listItem) getMenuItem(e, listItem);
  })
);
