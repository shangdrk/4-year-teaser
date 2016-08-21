import { db } from '../database';
import quiz from '../app-data/quiz';

export function getQuestions() {
  return quiz.map(q => {
    return Object.assign({}, {
      question: q.question,
      choices: q.choices,
      resources: q.resources,
    });
  });
}

export function getJudgeResult(question, choice) {
  if (question >= quiz.length) {
    return null;
  }

  db().rpushAsync(`quiz:${question}`, choice);
  if (choice === quiz[question].answer) {
    return {result: 'correct'};
  } else {
    return {result: 'wrong'};
  }
}
