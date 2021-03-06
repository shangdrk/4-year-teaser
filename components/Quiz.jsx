/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2016 Da Shang <derekshang07@gmail.com>
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as quizActions from '../redux/modules/quiz';

export class Quiz extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    quiz: React.PropTypes.array,
    judgeResult: React.PropTypes.oneOf(['', 'correct', 'wrong']),
    onSectionChange: React.PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.state = {
      currentQuestion: 0,
      currentChoice: -1,
      validityWarning: null,
      nextButton: null,
    };
  }

  componentWillMount() {
    this.props.dispatch(quizActions.fetchQuizData());
  }

  componentWillReceiveProps(newProps) {
    const { quiz, dispatch, onSectionChange } = this.props;
    const { currentQuestion } = this.state;

    switch(newProps.judgeResult) {
      case 'correct': {
        let nextButton;
        if (currentQuestion === quiz.length - 1) {
          nextButton = (
            <div>
              <p className="text-enter">你全部回答正确啦，真是太厉害了。
              呆里克的4周年小礼物是好多好多张金牌酷胖😏</p>
              <button
                className="btn btn-primary btn-block text-enter"
                onClick={onSectionChange('Coupon', {username: 'zora'})}>
                领取呆里克金牌酷胖
              </button>
            </div>
          );
        } else {
          nextButton = (
            <button className="btn btn-primary Quiz-btn-right" onClick={this.handleNextQuestion}>
              答对啦~ 下一个
            </button>
          );
        }

        this.setState({nextButton});
        break;
      }

      case 'wrong':
        this.setState({
          validityWarning: (
            <div className="alert alert-danger">
              嘤嘤，换一个答案试试
            </div>
          ),
        });
        break;

      default: break;
    }

    dispatch(quizActions.receiveJudgeResult({result: ''}));
  }

  getFormattedQuestion(order, item) {
    let images = [];
    if (item.resources.length !== 0) {
      for (let re of item.resources) {
        images.push(
          <img src={`/assets/images/${re}`} className="img-responsive img-thumbnail"
            key={`${re}`} />
        );
      }
    }

    return (
      <div style={{'textAlign': 'center'}}>
        <h2>{`${order}. ${item.question}`}</h2>
        {images}
      </div>
    );
  }

  handleSubmitAnswer = (e) => {
    const { dispatch } = this.props;
    const { currentQuestion, currentChoice } = this.state;

    if (this.state.currentChoice === -1) {
      const warning = (
        <div className="alert alert-info">
          不许耍赖哟，要选择一项才能提交
        </div>
      );

      this.setState({
        validityWarning: warning,
      });
    } else {
      this.setState({validityWarning: null});
      dispatch(quizActions.fetchJudgeResult(currentQuestion, currentChoice));
    }
  };

  handleChangeChoice = (e) => {
    const choiceValue = parseInt(e.target.value);

    this.setState({currentChoice: choiceValue});
  };

  handleNextQuestion = (e) => {
    this.setState({
      currentQuestion: this.state.currentQuestion + 1,
      currentChoice: -1,
      validityWarning: null,
      nextButton: null,
    });
  };

  render() {
    if (this.props.quiz.length === 0) return <div />;

    const { quiz } = this.props;
    const { currentQuestion, validityWarning, nextButton, currentChoice } = this.state;
    const item = quiz[currentQuestion],
      order = currentQuestion + 1;

    return (
      <div className="Quiz-container">
        {validityWarning}
        {this.getFormattedQuestion(order, item)}
        {item.choices.map((choice, index) => {
          return (
            <div className="radio" key={`choice-${index}`}>
              <label onChange={this.handleChangeChoice}>
                <input type="radio" name={`choice-${order}`} value={`${index}`}
                  checked={currentChoice === index} />
                {choice}
              </label>
            </div>
          );
        })}
        <button className="btn btn-primary" onClick={this.handleSubmitAnswer}>
          确认
        </button>
        {nextButton}
      </div>
    );
  }
}

export default connect(state => {
  return {
    quiz: state.quiz.quiz,
    judgeResult: state.quiz.judgeResult,
  };
})(Quiz);
