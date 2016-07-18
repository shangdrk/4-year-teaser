'use strict';

var bodyParser = require('body-parser');
var cookieSession = require('cookie-session');
var crypto = require('crypto');
var express = require('express');
var path = require('path');
var secrets = require('./secrets');

var app = express();

process.env.MODE = 'development';

var validSessions = [];
var authenticate = function(req, res, next) {
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
      res.status(401).send("Permission denied. Please verify your identity first.");
    }
  }
};

app.use('/assets', express.static('assets'));
app.use('/components', express.static('components'));

app.use(bodyParser.json());
app.use(cookieSession({
  name: 'session',
  keys: [secrets.sessionKey],
}));

if (process.env.MODE !== 'development') {
  app.use(authenticate);
}

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/assets/index.html'));
});

app.get('/favicon.ico', function(req, res) {
  res.sendFile(path.join(__dirname, '/assets/images/favicon.ico'));
})

app.get('/verify', function(req, res) {
  res.sendFile(path.join(__dirname, '/assets/verify.html'));
});

app.post('/verify', function(req, res) {
  var code = req.body.code;
  if (code === secrets.passcode) {
    req.session.id = crypto.randomBytes(64).toString('hex');
    validSessions.push(req.session.id);

    res.send({
      verified: true,
    });
  } else {
    res.send({
      verified: false,
      msg: 'The verification failed!'
    });
  }
});

app.listen(8000);