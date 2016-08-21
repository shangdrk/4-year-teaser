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
    type: RECEIVE_QUIZ_DATA,
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
