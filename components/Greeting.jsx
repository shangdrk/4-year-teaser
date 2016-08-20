import React, { Component } from 'react';
import classnames from 'classnames';
import text from '../assets/greeting-template';

export default class Greeting extends Component {
  static propTypes = {
    onSectionChange: React.PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.state = {
      unwrapDisabled: false,
    };
  }

  handleUnwrapClick = e => {
    e.preventDefault();
    if (!this.state.unwrapDisabled) {
      this.setState({unwrapDisabled: true});
    }
  }

  render() {
    const { unwrapDisabled } = this.state;
    const unwrapBtnClass = classnames({
      'btn': true,
      'btn-primary': true,
      'btn-block': true,
      'disabled': unwrapDisabled,
    });

    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center Greeting-header4">🎉Happy 4 Year Anniversary!🎉</h1>
          </div>
        </div>
        <main>
          <p>{text.letter}</p>
          <button
            className={unwrapBtnClass}
            onClick={this.handleUnwrapClick} >
            now unwrap Derek's extra gift :)
          </button>
          {unwrapDisabled ? <p className="text-enter">{text.teaser}</p> : null}
          {unwrapDisabled ?
            <button
              className="btn btn-success btn-block text-enter"
              onClick={this.props.onSectionChange('Coupon', {username: 'leona'})} >
              take the quiz 🙈
            </button> : null}
        </main>
      </div>
    );
  }
}