import 'whatwg-fetch';

export const RECEIVE_BUILD_RESULTS = 'coupon/receive-build-results';

const initial = {
  coupons: [],
  history: [],
};

export default function reducer(state=initial, action={}) {
  switch (action.type) {
    case RECEIVE_BUILD_RESULTS:
      return Object.assign({}, state, {
        ...state,
        coupons: action.coupons,
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

/*** Bound action creators ***/

export function fetchBuildResults(username) {
  return dispatch => {
    return fetch('/api/coupon/build', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
      }),
    }).then(response => response.json())
      .then(data => dispatch(receiveBuildResults(data)));
  };
}

export function fetchBuildLimitedResults(username) {
  return dispatch => {
    return fetch('/api/coupon/build-limited', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
      }),
    }).then(response => response.json())
      .then(data => dispatch(receiveBuildResults(data)));
  };
}
