import { db } from '../database';
import coupons from './coupons-data';
import * as util from './util';

export async function build(username) {
  const userAlreadyExists = await db().sismemberAsync('user.username', username);
  if (userAlreadyExists) {
    return getAll(username);
  }

  const id = await db().incrAsync('user.length');

  return db().saddAsync('user.username', username)
  .then(() => db().hsetAsync(`user:${username}`, 'id', id))
  .then(() => buildDefault(username))
  .then(() => getAll(username));
}

export async function buildLimited(username) {
  const userAlreadyExists = await db().sismemberAsync('user.username', username);
  if (!userAlreadyExists) return {};

  const buildComplete = await db().hgetAsync(`user:${username}`, 'buildComplete');
  if (buildComplete) {
    return getAll(username);
  }

  db().hsetAsync(`user:${username}`, 'buildComplete', true);
  let existing = await getAll(username);

  let c1, c2;
  c1 = (c2 = Math.floor(Math.random() * 3) + 5);
  while (c1 === c2) {
    c1 = Math.floor(Math.random() * 3) + 5;
  }

  console.log(c1);
  console.log(c2);

  const selected = coupons.filter((c, index) => {
    return c.limited === true && (index === c1 || index === c2);
  }).map(c => {
    return Object.assign({
      'unique-id': util.numericId(7),
      'quantity': 1,
      // set expiration date to be 8 months later
      'expiration-date': new Date().setMonth(new Date().getMonth() + 8),
      'owner': username,
      'status': 'available',
    }, c);
  });

  existing.push(...selected);

  console.log(existing);

  return db().hsetAsync(`user:${username}`, 'coupons', JSON.stringify(existing))
  .then(() => getAll(username));
}

export async function getAll(username) {
  const all = await db().hgetAsync(`user:${username}`, 'coupons') || '[]';

  return JSON.parse(all);
}

export async function consumeAndUpdate(username, couponId) {
  let existing = await getAll(username);
  let intended = null;
  for (let c of existing) {
    if (c.id === couponId) {
      intended = c;
      break;
    }
  }
  if (!intended || !intended.quantity) return;

  intended.quantity = intended.quantity - 1;
  intended.status = 'pending';

  db().hsetAsync(`user:${username}`, 'coupons', JSON.stringify(existing));
}

export async function history(username) {
  const history = await db().hgetAsync(`user:${username}`, 'history') || '[]';

  return JSON.parse(history);
}

function buildDefault(username) {
  let defaultCoupons = coupons.filter((c) => {
    return c.limited === false;
  }).map(c => {
    return Object.assign({
      'unique-id': util.numericId(7),
      'quantity': 2,
      'expiration-date': null,
      'owner': username,
      'status': 'available',
    }, c);
  });

  return db().hsetAsync(`user:${username}`, 'coupons', JSON.stringify(defaultCoupons));
}
