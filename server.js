const fs = require('fs');
const http = require('http');
const url = require('url');

const tempPreview = fs.readFileSync(
  './dev-data/templates/previewTemplate.html',
  'utf-8'
);
const data = fs.readFileSync('./dev-data/data/data.json', 'utf-8');
const dataObj = JSON.parse(data);

//////////////////////////////////////////////////////////
// const replaceWithHtml = (template, menuItem) => {
//   let output = template.replace(/{%MENU_ITEM_NAME%}/g, menuItem.name);
//   output = template.replace(/{%MENU_ITEM_PRICE%}/g, menuItem.price);
//   output = template.replace(/{%MENU_ITEM_DESCRIPTION%}/g, menuItem.description);
//   output = template.replace(/{%MENU_ITEM_IMG%}/g, menuItem.img);
//   output = template.replace(/{%MENU_ITEM_NAME%}/g, menuItem.imgAlt);
// return output;
// };
/////////////////////////////////////////////////////////

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url, true);

  if (pathname === '/api/menu') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    console.log('BACKEND:', dataObj);
    res.end(JSON.stringify(dataObj));
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>Page not found!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening on port 8000...');
});
