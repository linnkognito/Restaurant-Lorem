const fs = require('fs');
const http = require('http');
const { replaceTemplate } = require('./modules/replaceTemplate');

const app = require('./app');

// HTML /////////////////////////////////////////////////
const home = fs.readFileSync('./public/template.html', 'utf-8');
const templateMenuItem = fs.readFileSync(
  './dev-data/templates/menuItemTemplate.html',
  'utf-8'
);
const templatePreview = fs.readFileSync(
  './dev-data/templates/previewTemplate.html',
  'utf-8'
);

// MENUS /////////////////////////////////////////////////
const data = fs.readFileSync('./dev-data/data/data.json', 'utf-8');
const dataObj = JSON.parse(data);

// SERVER ///////////////////////////////////////////////
// app.listen(8081, '127.0.0.1', () => {
//   console.log('💻 Listening on port 8081...');
// });
