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

export function fetchQuizData() {
  return dispatch => {
    return fetchJson('/api/app-data/quiz')
    .then(data => dispatch(receiveAppData(data)));
  };
}

export function fetchFinaleText() {
  return dispatch => {
    return fetchJson('/api/app-data/finale')
    .then(data => dispatch(receiveAppData(data)));
  };
}
