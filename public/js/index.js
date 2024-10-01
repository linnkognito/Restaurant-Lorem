import '../css/styles.css';

const header = document.querySelector('header');
const home = document.querySelector('#home');
const about = document.querySelector('#about');
const menu = document.querySelector('#menu');
const contact = document.querySelector('#contact');

const picturesContainer = document.querySelector('.pictures-container');
const dotsContainer = document.querySelector('.dots-container');
const dots = document.querySelectorAll('.dot');

const menuColumn = document.querySelectorAll('.menu__slip');
const menuStarters = document.querySelector('.menu__slip-starters');
const menuMains = document.querySelector('.menu__slip-mains');

const preview = document.querySelector('.dish-preview-wrapper');

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

// MARKUP //
const menuItemMarkup = function (item) {
  return `
    <div class="menu-card__item" data-id="${item.id}">
      <div class="menu-card__item-title--wrapper">
        <p class="menu-card__item-title">${item.name}</p>
        <span class="menu-card__item-price">${item.price}</span>
      </div>
      <em class="menu-card__item-description">${item.description}</em>
    </div>
    `;
};

const previewItemMarkup = function (item) {
  console.log('markup:', item);
  return `
  <div class="dish-preview-container">
    <span class="dish-preview__price">$${item.price}</span>
    <div class="dish-preview__text-container">
      <h2 class="dish-preview__name">${item.name}</h2>
      <p class="dish-preview__description">${item.description}</p>
    </div>
    <span class="dish-preview__rectangle"></span>
  </div>
  <div class="dish-preview__img">
    <img src="${item.img}" alt="${item.imgAlt}" />
  </div>
  `;
};

const loadPreview = async (item) => {
  try {
    // Get id from menu item
    const id = item.dataset.id - 1;

    // Get menu item data
    const res = await fetch('/api/menu');
    const menu = await res.json();
    item = menu.data.menu[id];

    // Clear container
    preview.innerHTML = '';
    preview.insertAdjacentHTML('afterbegin', previewItemMarkup(item));
  } catch (err) {
    console.log(err);
  }
};

const loadMenu = async () => {
  try {
    const res = await fetch('/api/menu');
    const data = await res.json();

    if (data.status === 'success') {
      const menu = data.data.menu;
      menu.forEach((item) => {
        if (item.category === 'starter') {
          menuStarters.insertAdjacentHTML('beforeend', menuItemMarkup(item));
        }
        if (item.category === 'main') {
          menuMains.insertAdjacentHTML('beforeend', menuItemMarkup(item));
        }
      });
    }
  } catch (err) {
    console.log(err);
  }
};

const loadContactInfo = async () => {
  try {
    const res = await fetch('/api/contact');
    const data = await res.json();

    const markupContact = (label, data) => {
      let value;
      value = `<div class="contact-info__table-data">${data}</div>`;

      if (typeof data === 'object') {
        value = Object.values(data)
          .map((val) => `<div class="contact-info__table-data">${val}</div>`)
          .join('');
      }

      return `
    <div class="contact-info__table-row">
      <div class="contact-info__table-label">${label}</div>
      <div class="contact-info__table-data-wrapper">
        ${value}
      </div>
    </div>
    `;
    };

    if (res.ok) {
      const table = document.querySelector('.contact-info__table');
      table.innerHTML = '';
      table.insertAdjacentHTML(
        'afterbegin',
        markupContact('Phone', data.phone) +
          markupContact('Email', data.email) +
          markupContact('Address', data.address) +
          markupContact('Hours', data.openingHours)
      );
    }
  } catch (err) {
    console.log(err);
  }
};

//////////////////////////////////////////////

// EVENT LISTENERS //
menuColumn.forEach((col) =>
  col.addEventListener('click', (e) => {
    e.preventDefault();
    const listItem = e.target.closest('.menu-card__item');
    console.log('listItem:', listItem);
    if (listItem) loadPreview(listItem);
  })
);

//////////////////////////////////////////////

// MAP //
const coords = [45.5152, -122.6784];
const map = L.map('map').setView(coords, 16);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

L.marker(coords).bindPopup('Restaurant Lorem').openPopup(coords).addTo(map);

map.on('dblclick', () => {
  map.flyTo(coords, 16);
});

//////////////////////////////////////////////
// INIT //
window.onload = loadMenu();
window.onload = loadContactInfo();
