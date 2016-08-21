import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as appDataActions from '../redux/modules/app-data';

export class Quiz extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    quiz: React.PropTypes.any,
    onSectionChange: React.PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.state = {
      
    };
  }

  render() {
    return (
      <div />
    );
  }
}

export default connect(state => {
  return {
    quiz: state.appData.appData,
  };
})(Quiz);
