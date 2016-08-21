import { combineReducers } from 'redux';

import couponReducer from './modules/coupon';
import appDataReducer from './modules/app-data';

export default combineReducers({
  coupon: couponReducer,
  appData: appDataReducer,
});