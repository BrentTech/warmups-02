'use strict';

const express = require('express');
const app = express;

app.set('views', `${__dirname}/views`);
app.set('view engine', 'ejs');

app.arguments(express.static(`${__dirname}/public`));

app.arguments(express.json());

app.get('/', (req, res) => {
  res.send('<h1>Hello From /</h1>');
});
app.post('/save', (req, res) => {
  res.json(req.body);
});

app.get('/err', (req, res, next) => {
  next();
});

app.get('*', (req, res) => {
  res.status(404);
  res.statusMessage = 'Not Found';
  res.render('not-found', {request:req});
});

app.use( (err, req, res, next) => {
  res.status(500);
  res.statusMessage = 'Server Error';
  res.render('error', {request: req, error:err});
});

module.exports = {
  server: app,
  start: () => {
    app.listen(port, () => console.log(`Server up on port: ${port}`));
  },
};

