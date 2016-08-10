import { db } from '../database';
import coupons from './coupons-all';

export function build(username) {
  if (db().sismemberAsync('user.username', username)) return;

  const id = db().incrAsync('user.length');
  db().saddAsync('user.username', username);
  db().hsetAsync(`user:${username}`, 'id', id);

  buildDefault(username);
}

export function buildLimited(username) {
  if (!db().sismemberAsync('user.username', username)) return;
  if (db().hgetAsync(`user:${username}`, 'buildComplete')) return;

  db().hsetAsync(`user:${username}`, 'buildComplete', true);
  let existing = getAll(username);

  let c1, c2;
  c1 = (c2 = Math.floor(Math.random() * 3));
  while (c1 === c2) {
    c1 = Math.floor(Math.random() * 3);
  }

  const selected = coupons.filter((c, index) => {
    return c.limited === true && (index === c1 || index === c2);
  }).map((c) => {
    c['quantity'] = 1;
    // set expiration date to be 8 months later
    c['expiration-date'] = new Date().setMonth(new Date().getMonth() + 8);
    c['owner'] = username;
    c['status'] = 'available';
  });

  existing.push(selected[c1], selected[c2]);

  db().hsetAsync(`user:${username}`, 'coupons', JSON.stringify(existing));
  return [selected[c1], selected[c2]];
}

export function getAll(username) {
  const all = db().hgetAsync(`user:${username}`, 'coupons') || '[]';

  return JSON.parse(all);
}

export function consumeAndUpdate(username, couponId) {
  let existing = getAll(username);
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

export function history(username) {
  const history = db().hgetAsync(`user:${username}`, 'history') || '[]';

  return JSON.parse(history);
}

function buildDefault(username) {
  var defaultCoupons = coupons.filter((c) => {
    return c.limited === false;
  });

  defaultCoupons = defaultCoupons.map((c) => {
    c['quantity'] = 2;
    c['expiration-date'] = null;
    c['owner'] = username;
    c['status'] = 'available';
  });

  db().hsetAsync(`user:${username}`, 'coupons', JSON.stringify(defaultCoupons));
}
