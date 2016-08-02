'use strict';

var Promise = require('bluebird');
var redis = require('redis');
var password = require('./secretes').redis_password;

Promise.promisifyAll(redis.RedisClient.prototype);

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
  if (client) {
    return client;
  } else {
    throw new Error('Database has not been connected yet');
  }
};
