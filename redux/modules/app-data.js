/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2016 Da Shang <derekshang07@gmail.com>
 */

import { fetchJson } from '../util';

export const RECEIVE_APP_DATA = 'app-data/receive-app-data';

const initial = {
  appData: {},
};

export default function reducer(state=initial, action={}) {
  switch (action.type) {
    case RECEIVE_APP_DATA:
      return Object.assign({}, state, {
        ...state,
        appData: action.data,
      });

    default: return state;
  }
}

/*** Action creators ***/

export function receiveAppData(data) {
  return {
    type: RECEIVE_APP_DATA,
    data,
  };
}

/*** Bound action creators ***/

export function fetchGreetingText() {
  return dispatch => {
    return fetchJson('/api/app-data/greeting')
    .then(data => dispatch(receiveAppData(data)));
  };
}

export function fetchFinaleText() {
  return dispatch => {
    return fetchJson('/api/app-data/finale')
    .then(data => dispatch(receiveAppData(data)));
  };
}
