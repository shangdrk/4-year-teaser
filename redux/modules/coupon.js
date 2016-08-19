import 'whatwg-fetch';

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

export function fetchBuildLimitedStatus(username) {
  return dispatch => {
    return fetch('/api/coupon/build-limited-status', {
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
      .then(data => dispatch(receiveBuildLimitedComplete(data)));
  };
}

// TODO: authentication and security: can't let user consume everyone's coupons
export function fetchConsumeResults(username, uniqueId) {
  return dispatch => {
    return fetch('/api/coupon/consume', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        uniqueId: uniqueId,
      }),
    }).then(response => response.json())
      .then(data => dispatch(receiveBuildResults(data)));
  };
}
