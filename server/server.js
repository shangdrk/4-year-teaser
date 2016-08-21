import 'babel-polyfill';
import 'babel-core/register';

import bodyParser from 'body-parser';
import cookieSession from 'cookie-session';
import crypto from 'crypto';
import express from 'express';
import path from 'path';

import * as couponAPI from './api/coupon';
import * as db from './database';
import secrets from './secrets';

let app = express();

process.env.MODE = 'development';

let validSessions = [];
const authenticate = (req, res, next) => {
  if (req.session.id && validSessions.indexOf(req.session.id) !== -1) {
    if (req.url === '/verify') {
      res.redirect('/');
    } else {
      next();
    }
  } else {
    if (req.url === '/') {
      res.redirect('/verify');
    } else if (req.url === '/verify' || req.url === '/favicon.ico') {
      next();
    } else {
      res.status(401).send('Permission denied. Please verify your identity first.');
    }
  }
};

app.use('/assets', express.static(`${__dirname}/assets`));
app.use('/components', express.static(`${__dirname}/components`));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(cookieSession({
  name: 'session',
  keys: [secrets.sessionKey],
}));

if (process.env.MODE !== 'development') {
  app.use(authenticate);
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/assets/index.html'));
});

app.get('/favicon.ico', (req, res) => {
  res.sendFile(path.join(__dirname, '/assets/images/favicon.ico'));
});

app.get('/verify', (req, res) => {
  res.sendFile(path.join(__dirname, '/assets/verify.html'));
});

app.post('/verify', (req, res) => {
  const code = req.body.code;
  if (code === secrets.passcode) {
    req.session.id = crypto.randomBytes(64).toString('hex');
    validSessions.push(req.session.id);

    res.send({
      verified: true,
    });
  } else {
    res.send({
      verified: false,
      msg: 'The verification failed!',
    });
  }
});

app.post('/api/coupon/build', (req, res) => {
  const username = req.body.username;

  pack(couponAPI.build(username), res);
});

app.post('/api/coupon/build-limited', (req, res) => {
  const username = req.body.username;

  pack(couponAPI.buildLimited(username), res);
});

app.post('/api/coupon/build-limited-status', (req, res) => {
  const username = req.body.username;

  pack(couponAPI.getBuildLimitedStatus(username), res);
});

app.post('/api/coupon/consume', (req, res) => {
  const { username, uniqueId } = req.body;

  pack(couponAPI.requestConsumption(username, uniqueId), res);
});

app.post('/api/app-data/greeting', (req, res) => {
  const promiseWrapper = Promise.resolve(require('./app-data/greeting'));

  pack(promiseWrapper, res);
});

app.post('/api/app-data/quiz', (req, res) => {
  const promiseWrapper = Promise.resolve(require('./app-data/quiz'));

  pack(promiseWrapper, res);
});

app.post('/api/app-data/finale', (req, res) => {
  const promiseWrapper = Promise.resolve(require('./app-data/finale'));

  pack(promiseWrapper, res);
});

// Validity check and error handling before sending back response
function pack(promise, res) {
  return promise
    .then(result => {
      if (result == null) {
        res.status(404).sendFile(path.join(__dirname, '/assets/404NotFound.html'));
      } else {
        res.send(result);
      }
    }).catch(error => {
      console.error(error);
    });
}

app.listen(8000, () => {
  db.initClient();
  console.log('server starts listening to port 8000...');
});
