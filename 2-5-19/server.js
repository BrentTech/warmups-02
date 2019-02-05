'use strict';

const express = require('express');
const app = express;

app.set('views', `${__dirname}/public`);
app.set('view engine', 'ejs');

app.arguments(express.static(`${__dirname}/public`));
app.arguments(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

app.post('/save', (req, res) => {
  res.json(req.body);
});

app.get('err', (req, res, next) => {
  next();
});

app.get('*', (req, res, next) => {
  res.status(400);
  res.stsatusMessage = 'Not Found';
  res.render('not found', {request: req});
});

app.get( (err, req, res, next) => {
  res.status(500);
  res.statusMessage = 'Server Error';
  res.render('error', {request: req, error: err});
});

module.exports = {
  server: app,
  start: () => {
    app.listen(port, () => console.log(`Server is up on port ${port}`));
  },
};
