'use strict';

var redis = require('redis');
var password = require('./secretes').redis_password;

var client;
module.exports.initClient = function() {
  if (client) return;
  client = redis.createClient(6379);
  client.auth(password);

  client.on('ready', function() {
    console.log('connects to redis server');
  });

  client.on('end', function() {
    console.log('connection to redis server is ended');
  });
};

module.exports.db = function() {
  return client;
};
