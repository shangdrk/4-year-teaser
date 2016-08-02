'use strict';



var db = require('../database').db();
var coupons = require('./all-coupons');

module.exports.build = function (username) {
  if (db.sismember('user.username', username)) return;

  const id = db.incr('user.length');
  db.sadd('user.username', username);
  db.hset('user:'+username, 'id', id);

  buildDefault(username);
};

exports.buildLimited = function(username) {
  if (!db.sismember('user.username', username)) return;
  if (db.hget('user:'+username, 'buildComplete')) return;

  var existing = exports.getAll(username);

  var c1, c2;
  c1 = (c2 = Math.floor(Math.random() * 3));
  while (c1 === c2) {
    c1 = Math.floor(Math.random() * 3);
  }

  var selected = coupons.filter(function(c) {
    return c.limited === true;
  });
  existing.push(selected[c1], selected[c2]);

  db.hset('user:'+username, 'coupons', JSON.stringify(existing));
  return [selected[c1], selected[c2]];
};

exports.getAll = function(username) {
  var all = db.hget('user:'+username, 'coupons') || '[]';
  return JSON.parse(all);
};

exports.consumeAndUpdate = function (username, couponId) {

};

exports.history = function (username) {

};

function buildDefault(username) {
  var defaultCoupons = coupons.filter(function(c) {
    return c.limited === false;
  });

  defaultCoupons = defaultCoupons.map(function(c) {
    // add other properties to c
  });

  db.hset('user'+username, 'coupons', JSON.stringify(defaultCoupons));
}
