/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2016 Da Shang <derekshang07@gmail.com>
 */

import { fetchJson } from '../util';

export const RECEIVE_QUIZ_DATA = 'quiz/receive-quiz-data';
export const RECEIVE_JUDGE_RESULT = 'quiz/receive-judge-result';

const initial = {
  quiz: [],
  judgeResult: '',
};

export default function reducer(state=initial, action={}) {
  switch(action.type) {
    case RECEIVE_QUIZ_DATA:
      return Object.assign({}, state, {
        ...state,
        quiz: action.quiz,
      });

    case RECEIVE_JUDGE_RESULT:
      return Object.assign({}, state, {
        ...state,
        judgeResult: action.judgeResult,
      });

    default: return state;
  }
}

/*** Action creators ***/

export function receiveQuizData(data) {
  return {
    type: RECEIVE_QUIZ_DATA,
    quiz: data,
  };
}

export function receiveJudgeResult(data) {
  return {
    type: RECEIVE_JUDGE_RESULT,
    judgeResult: data.result,
  };
}

/*** Bound action creators ***/

export function fetchQuizData() {
  return dispatch => {
    return fetchJson('/api/quiz/data')
    .then(data => dispatch(receiveQuizData(data)));
  };
}

export function fetchJudgeResult(question, choice) {
  return dispatch => {
    return fetchJson('/api/quiz/judge', {question, choice})
    .then(data => dispatch(receiveJudgeResult(data)));
  };
}
