/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2016 Da Shang <derekshang07@gmail.com>
 */

import Promise from 'bluebird';
import redis from 'redis';
import secrets from './secrets';

const password = secrets.redis_password;

Promise.promisifyAll(redis.RedisClient.prototype);

let client;
export function initClient() {
  if (client) return;
  client = redis.createClient(6379);
  client.auth(password);

  client.on('ready', () => {
    console.log('connects to redis server');
  });

  client.on('end', () => {
    console.log('connection to redis server is ended');
  });
}

export function db() {
  if (client) {
    return client;
  } else {
    throw new Error('Database has not been connected yet');
  }
}
