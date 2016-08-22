/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2016 Da Shang <derekshang07@gmail.com>
 */

import { combineReducers } from 'redux';

import couponReducer from './modules/coupon';
import appDataReducer from './modules/app-data';
import quizReducer from './modules/quiz';

export default combineReducers({
  coupon: couponReducer,
  appData: appDataReducer,
  quiz: quizReducer,
});