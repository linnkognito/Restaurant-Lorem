const fs = require('fs');
const http = require('http');

const tempPreview = fs.readFileSync(
  './dev-data/templates/previewTemplate.html',
  'utf-8'
);
const data = fs.readFileSync('./dev-data/data/data.json', 'utf-8');
const dataObj = JSON.parse(data);

//////////////////////////////////////////////////////////
const replaceWithHtml = (template, menuItem) => {
  let output = template.replace(/{%MENU_ITEM_NAME%}/g, menuItem.name);
  output = template.replace(/{%MENU_ITEM_PRICE%}/g, menuItem.price);
  output = template.replace(/{%MENU_ITEM_DESCRIPTION%}/g, menuItem.description);
  output = template.replace(/{%MENU_ITEM_IMG%}/g, menuItem.img);
  output = template.replace(/{%MENU_ITEM_NAME%}/g, menuItem.imgAlt);
};
/////////////////////////////////////////////////////////

const server = http.createServer((req, res) => {
  const path = req.url;

  if (path === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });

    const previewHtml = dataObj.map((el) => replaceWithHtml(tempPreview, el));
  }

  if (path === '/api') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(data);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>Page not found!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Listening on port 8000...');
});
