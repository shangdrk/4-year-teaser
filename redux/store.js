/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2016 Da Shang <derekshang07@gmail.com>
 */

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import combineReducers from './reducers';

const store = createStore(
  combineReducers,
  {},
  applyMiddleware(thunk),
);
export default store;