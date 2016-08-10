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
});

app.listen(8000, () => {
  db.initClient();
  console.log('server starts listening to port 8000...');
});
