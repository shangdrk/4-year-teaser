import 'whatwg-fetch';

export const RECEIVE_BUILD_RESULTS = 'coupon/receive-build-results';
export const RECEIVE_BUILD_LIMITED_STATUS = 'coupon/receive-build-limited-status';
export const RECEIVE_ONBOARDING_STATUS = 'coupon/receive-onboarding-status';

const initial = {
  coupons: [],
  history: [],
  buildLimitedStatus: '',
  onboardingStatus: '',
};

export default function reducer(state=initial, action={}) {
  switch (action.type) {
    case RECEIVE_BUILD_RESULTS:
      return Object.assign({}, state, {
        ...state,
        coupons: action.coupons,
        buildLimitedStatus: action.buildLimitedStatus,
      });

    case RECEIVE_BUILD_LIMITED_STATUS:
      return Object.assign({}, state, {
        ...state,
        buildLimitedStatus: action.buildLimitedStatus,
      });

    case RECEIVE_ONBOARDING_STATUS:
      return Object.assign({}, state, {
        ...state,
        onboardingStatus: action.onboardingStatus,
      });

    default: return state;
  }
}

/*** Action creators ***/

export function receiveBuildResults(coupons) {
  return {
    type: RECEIVE_BUILD_RESULTS,
    coupons: coupons.coupons,
    buildLimitedStatus: coupons.buildLimitedStatus || '',
  };
}

export function receiveBuildLimitedStatus(status) {
  return {
    type: RECEIVE_BUILD_LIMITED_STATUS,
    buildLimitedStatus: status.buildLimitedStatus,
  };
}

export function receiveOnboardingStatus(status) {
  return {
    type: RECEIVE_ONBOARDING_STATUS,
    onboardingStatus: status.onboardingStatus,
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
      .then(data => dispatch(receiveBuildLimitedStatus(data)));
  };
}

export function fetchOnboardingStatus(username) {
  return dispatch => {
    return fetch('/api/coupon/onboarding-status', {
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
      .then(data => dispatch(receiveOnboardingStatus(data)));
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
