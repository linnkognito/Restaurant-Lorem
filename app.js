const fs = require('fs');

const express = require('express');
const app = express();

app.listen(3000, () => {
  console.log('💻 Listening on port 3000...');
});

// Serving static files:
app.use(express.static(`${__dirname}/public`));
app.use(express.json()); // middleware

// Read & parse data
const menu = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/data.json`, 'utf-8')
);
const home = fs.readFileSync('./public/template.html', 'utf-8');
const contactInfo = fs.readFileSync(
  `${__dirname}/dev-data/data/contact.json`,
  'utf-8'
);

// Handler function
const getMenu = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      menu,
    },
  });
};

const getHomePage = (req, res) => {
  res.status(200).send(home);
};

// const getContactInfo = (req, res) => {
//   res.status(200).send(contactInfo);
// };
const getData = (req, res, data) => {
  res.status(200).send(data);
};

// Requests
app.get('/api/menu', getMenu);
app.get('/api/contact', getData(contactInfo));
app.get('/', getHomePage);

module.exports = app;
