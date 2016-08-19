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

  await db().hsetAsync(`user:${username}`, 'buildComplete', true);
  let existing = await getAll(username);

  let c1, c2;
  c1 = (c2 = Math.floor(Math.random() * 3) + 5);
  while (c1 === c2) {
    c1 = Math.floor(Math.random() * 3) + 5;
  }

  const selected = coupons.filter((c, index) => {
    return c.limited === true && (index === c1 || index === c2);
  }).map(c => {
    const uidArray = generateUidArray(1, username);

    return Object.assign({
      'unique-id': uidArray,
      'quantity': 1,
      // set expiration date to be 8 months later
      'expiration-date': new Date().setMonth(new Date().getMonth() + 8),
      'owner': username,
      'status': 'available',
    }, c);
  });

  existing.push(...selected);

  return db().hsetAsync(`user:${username}`, 'coupons', JSON.stringify(existing))
  .then(() => getAll(username));
}

export function getBuildLimitedStatus(username) {
  return db().hgetAsync(`user:${username}`, 'buildComplete')
  .then(value => {
    return {
      buildLimitedComplete: (value == null) ? false : true,
    };
  });
}

export async function getAll(username) {
  const all = await db().hgetAsync(`user:${username}`, 'coupons') || '[]';

  return JSON.parse(all);
}

export async function consumeAndUpdate(username, couponId) {
  let existing = await getAll(username);
  const owner = await db().getAsync(`uid:${couponId}`);

  if (owner !== username) {
    return {status: '401'};
  }

  for (let c of existing) {
    const pos = c['unique-id'].indexOf(couponId);
    if (pos !== -1) {
      c['unique-id'].splice(pos, 1);
      c.quantity -= 1;
      await db().delAsync(`uid:${couponId}`);
      break;
    }
  }

  return db().hsetAsync(`user:${username}`, 'coupons', JSON.stringify(existing))
  .then(() => existing);
}

export async function history(username) {
  const history = await db().hgetAsync(`user:${username}`, 'history') || '[]';

  return JSON.parse(history);
}

function buildDefault(username) {
  let defaultCoupons = coupons.filter((c) => {
    return c.limited === false;
  }).map(c => {
    const uidArray = generateUidArray(2, username);

    return Object.assign({
      'unique-id': uidArray,
      'quantity': 2,
      'expiration-date': null,
      'owner': username,
      'status': 'available',
    }, c);
  });

  return db().hsetAsync(`user:${username}`, 'coupons', JSON.stringify(defaultCoupons));
}

async function generateUidArray(quantity, username) {
  const uidArray = [];

  for (let i=0; i< quantity; i++) {
    let uid = util.numericId(7);
    let collision = await db().getAsync(`uid:${uid}`);

    while (collision) {
      uid = util.numericId(7);
      collision = await db().getAsync(`uid:${uid}`);
    }

    await db().setAsync(`uid:${uid}`, username);
    uidArray.push(uid);
  }

  return uidArray;
}

