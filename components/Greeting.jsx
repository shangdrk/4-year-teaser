import React, { Component } from 'react';

export default class Greeting extends Component {
  static propTypes = {
    onSectionChange: React.PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.state = {

    };
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center">🎉Happy 4 Year Anniversary!🎉</h1>
          </div>
        </div>
        <div>
          <button
            className="btn btn-primary"
            onClick={this.props.onSectionChange('Coupon', {username: 'kled'})} >
            Unwrap Derek's gift :)
          </button>
        </div>
      </div>
    );
  }
}