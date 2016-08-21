import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as quizActions from '../redux/modules/quiz';

export class Quiz extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    quiz: React.PropTypes.array,
    judgeResult: React.PropTypes.object,
    onSectionChange: React.PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.state = {
      currentQuestionIndex: -1,
    };
  }

  componentWillMount() {
    this.props.dispatch(quizActions.fetchQuizData());
  }

  componentWillReceiveProps(newProps) {

  }

  getQuestion() {

  }

  // onClick={this.props.onSectionChange('Coupon', {username: 'morgana'})}
  render() {
    return (
      <div>
        {this.getQuestion()}
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
