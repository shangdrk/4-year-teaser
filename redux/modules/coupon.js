/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2016 Da Shang <derekshang07@gmail.com>
 */

import { fetchJson } from '../util';

export const RECEIVE_BUILD_RESULTS = 'coupon/receive-build-results';
export const RECEIVE_BUILD_LIMITED_STATUS = 'coupon/receive-build-limited-status';

const initial = {
  coupons: [],
  history: [],
  buildLimitedComplete: false,
};

export default function reducer(state=initial, action={}) {
  switch (action.type) {
    case RECEIVE_BUILD_RESULTS:
      return Object.assign({}, state, {
        ...state,
        coupons: action.coupons,
      });

    case RECEIVE_BUILD_LIMITED_STATUS:
      return Object.assign({}, state, {
        ...state,
        buildLimitedComplete: action.buildLimitedComplete,
      });

    default: return state;
  }
}

/*** Action creators ***/

export function receiveBuildResults(coupons) {
  return {
    type: RECEIVE_BUILD_RESULTS,
    coupons,
  };
}

export function receiveBuildLimitedComplete(status) {
  return {
    type: RECEIVE_BUILD_LIMITED_STATUS,
    buildLimitedComplete: status.buildLimitedComplete,
  };
}

/*** Bound action creators ***/

export function fetchBuildResults(username) {
  return dispatch => {
    return fetchJson('/api/coupon/build', {username})
    .then(data => dispatch(receiveBuildResults(data)));
  };
}

export function fetchBuildLimitedResults(username) {
  return dispatch => {
    return fetchJson('/api/coupon/build-limited', {username})
    .then(data => dispatch(receiveBuildResults(data)));
  };
}

export function fetchBuildLimitedStatus(username) {
  return dispatch => {
    return fetchJson('/api/coupon/build-limited-status', {username})
    .then(data => dispatch(receiveBuildLimitedComplete(data)));
  };
}

// TODO: authentication and security: can't let user consume everyone's coupons
export function fetchConsumeResults(username, uniqueId) {
  console.log({username, uniqueId});
  return dispatch => {
    return fetchJson('/api/coupon/consume', {username, uniqueId})
    .then(data => dispatch(receiveBuildResults(data)));
  };
}
