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
      current: 0,
    };
  }

  componentWillMount() {
    this.props.dispatch(quizActions.fetchQuizData());
  }

  componentWillReceiveProps(newProps) {
    if (newProps.judgeResult) {

    }
  }

  getQuizItem() {
    const { current } = this.state;

    return null;
  }

  handleSubmitAnswer = (e) => {

  }

  // onClick={this.props.onSectionChange('Coupon', {username: 'morgana'})}
  render() {
    if (this.props.quiz.length === 0) return <div />;

    const { quiz, judgeResult, onSectionChange } = this.props;
    const { current } = this.state;
    const item = quiz[current],
      order = current + 1;

    return (
      <div>
        <h2>{`${order}. ${item.question}`}</h2>
        {item.choices.map((choice, index) => {
          return (
            <div className="radio" key={`choice-${index}`}>
              <label>
                <input type="radio" name="choice" value={`${index}`} />
                {choice}
              </label>
            </div>
          );
        })}
        <button className="butn btn-primary">确认</button>
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
