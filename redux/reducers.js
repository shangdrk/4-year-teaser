import { combineReducers } from 'redux';

import couponReducer from './modules/coupon';

export default combineReducers({
  coupon: couponReducer,
});