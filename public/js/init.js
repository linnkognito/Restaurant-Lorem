// VERSION 1
export const init = function () {
  const content = document.querySelector('#content');
  const markup = `
  <h1>Lorem</h1>
  <span class="content__stripe-h1"></span>
  <span class="content__stripe"></span>
  <span class="content__stripe-2"></span>  
  `;

  content.innerHTML = markup;
};

// VERSION 2
// export const init = function () {
//   const content = document.querySelector('#content');
//   let h1 = document.createElement('h1');
//   let p = document.createElement('p');
//   h1.textContent = 'Lorem';
//   p.textContent = 'Restaurant';
//   p.classList.add('subtitle');

//   content.insertAdjacentElement('afterbegin', h1);
//   content.insertAdjacentElement('beforeend', p);
// };
