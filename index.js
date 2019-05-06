const express = require('express');
const nunjucks = require('nunjucks');

const app = express();
nunjucks.configure('views', {
  autoescape: true,
  express: app,
  watch: true,
});

const checkAgePresent = (req, res, next) => {
  if (!req.query.age) {
    return res.redirect('/');
  }
  return next();
};

app.use(express.urlencoded({extended: false}));
app.set('view engine', 'njk');

app.get('/', (req, res) => {
  return res.render('home');
});

app.post('/check', (req, res) => {
  const {age} = req.body;
  const path = age >= 18 ? 'major' : 'minor';
  return res.redirect(`/${path}?age=${age}`);
});

app.get('/major', checkAgePresent, (req, res) => {
  const {age} = req.query;
  return res.render('major', {age});
});

app.get('/minor', checkAgePresent, (req, res) => {
  const {age} = req.query;
  return res.render('minor', {age});
});

app.listen(3000);
