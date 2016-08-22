/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2016 Da Shang <derekshang07@gmail.com>
 */

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
