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

// Handler function
const getMenu = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: {
      menu,
    },
  });
};

// Requests
app.get('/api/menu', getMenu);

module.exports = app;
