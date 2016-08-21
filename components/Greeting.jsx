import React, { Component } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import * as appDataActions from '../redux/modules/app-data';


export class Greeting extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    appData: React.PropTypes.object,
    onSectionChange: React.PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.state = {
      unwrapDisabled: false,
    };
  }

  componentWillMount() {
    this.props.dispatch(appDataActions.fetchGreetingText());
  }

  handleUnwrapClick = e => {
    e.preventDefault();
    if (!this.state.unwrapDisabled) {
      this.setState({unwrapDisabled: true});
    }
  }

  render() {
    const { appData, onSectionChange } = this.props;
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
          <p>{appData.letter}</p>
          <button
            className={unwrapBtnClass}
            onClick={this.handleUnwrapClick} >
            now unwrap Derek's extra gift :)
          </button>
          {unwrapDisabled ? <p className="text-enter">{appData.teaser}</p> : null}
          {unwrapDisabled ?
            <button
              className="btn btn-success btn-block text-enter"
              onClick={this.props.onSectionChange('Quiz', {onSectionChange})} >
              take the quiz 🙈
            </button> : null}
        </main>
      </div>
    );
  }
}

export default connect(state => {
  return {
    appData: state.appData.appData,
  };
})(Greeting);
