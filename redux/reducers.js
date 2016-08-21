import { combineReducers } from 'redux';

import couponReducer from './modules/coupon';
import appDataReducer from './modules/app-data';
import quizReducer from './modules/quiz';

export default combineReducers({
  coupon: couponReducer,
  appData: appDataReducer,
  quiz: quizReducer,
});