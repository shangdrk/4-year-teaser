import { db } from '../database';
import coupons from '../app-data/coupons';
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
  let index = Math.floor(Math.random() * 2) + 5;
  let c = coupons[index];

  return await generateUidArray(1, username)
  .then(uidArray => {
    return Object.assign({
      'unique-id': uidArray,
      'quantity': 1,
      // set expiration date to be 8 months later
      'expiration-date': new Date().setMonth(new Date().getMonth() + 8),
      'owner': username,
      'status': 'available',
    }, c);
  }).then(selected => {
    existing.push(selected);
    return db().hsetAsync(`user:${username}`, 'coupons', JSON.stringify(existing));
  }).then(() => getAll(username));
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

export async function requestConsumption(username, couponId) {
  let existing = await getAll(username);
  const owner = await db().getAsync(`uid:${couponId}`);

  if (owner !== username) {
    return {status: '401'};
  }

  for (let c of existing) {
    const pos = c['unique-id'].indexOf(couponId);
    if (pos !== -1) {
      const pendingRecord = {username, couponId};
      c.status = 'pending';
      await db().rpushAsync('admin.pending', JSON.stringify(pendingRecord));

      break;
    }
  }

  return db().hsetAsync(`user:${username}`, 'coupons', JSON.stringify(existing))
  .then(() => existing);
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

  existing = existing.filter(c => {
    return c.quantity != 0;
  });

  return db().hsetAsync(`user:${username}`, 'coupons', JSON.stringify(existing))
  .then(() => existing);
}

export async function history(username) {
  const history = await db().hgetAsync(`user:${username}`, 'history') || '[]';

  return JSON.parse(history);
}

function buildDefault(username) {
  let couponPromises = coupons.filter(c => {
    return c.limited === false;
  }).map(async c => {
    return await generateUidArray(2, username)
    .then(uidArray => {
      return Object.assign({
        'unique-id': uidArray,
        'quantity': 2,
        'expiration-date': null,
        'owner': username,
        'status': 'available',
      }, c);
    });
  });

  return Promise.all(couponPromises).then(defaultCoupons =>
    db().hsetAsync(`user:${username}`, 'coupons', JSON.stringify(defaultCoupons)));
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

