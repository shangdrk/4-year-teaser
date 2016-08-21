import { db } from '../database';
import quiz from '../app-data/quiz';

export function getQuestions() {
  return quiz.map(q => {
    return Object.assign({}, {
      question: q.question,
      choices: q.choices,
    });
  });
}

export function getJudgeResult(index, answer) {
  if (index >= quiz.length) {
    return null;
  }

  db().rpushAsync(`quiz:${index}`, answer);
  if (answer === quiz[index].answer) {
    return {result: 'correct'};
  } else {
    return {result: 'wrong'};
  }
}
