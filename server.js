require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const User = require('./models/user.js');
const { name: projectId } = require('./package.json');

const flash = require('connect-flash');

// const { Storage } = require('@google-cloud/storage');
// const bucket = storage.bucket('simc-web.appspot.com');

app.engine('html', require('ejs').renderFile);

const port = process.env.PORT || 8080, ip = process.env.IP || '0.0.0.0';

// set up routes

// app.use(require(__dirname + '/routes/https-redirect.js')({ httpsPort: app.get('https-port') }));
app.set('trust proxy', true);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// set no cache
app.use(function (req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});

app.use(flash());

app.use('/', require('./routes/auth.js'));

app.get('/', async (req, res, next) => {
  try {
    if (!req.user) return res.render('index.ejs');
    if (req.user.email == 'admin') return res.redirect('/console');
    // if (req.hostname == 'oph2020.sirirajmedcamp.com') return res.render('wait.ejs');
    return res.render('home.ejs', { user: req.user });
  } catch (e) {
    return next(e);
  }
});

app.use('/', require('./routes/debug.js'));
app.use('/', require('./routes/register.js'));
app.use('/', require('./routes/quiz.js'));
app.use('/', require('./routes/eval.js'));
app.use('/', require('./routes/cert.js'));

// set normal cache
app.use(function(req, res, next) {
  res.set('Cache-Control', 'public');
  next();
});

app.use(express.static('public'));
app.use(express.static('views'));

// 404
app.use((req, res, next) => {
  res.status(404);

  // respond with html page
  if (req.accepts('html')) res.render('404.ejs', { url: req.url });

  // respond with json
  else if (req.accepts('json')) res.send({ error: 'Not found' });

  // default to plain-text. send()
  else res.type('txt').send('Not found');
}); // http://bit.ly/2O01RDa

app.use((err, req, res, next) => {
  console.error(err);
  req.flash('error', err.message);
  res.redirect('/');
});

app.listen(port, ip, () => console.log('Server running on http://%s:%s', ip, port));

module.exports = app;
