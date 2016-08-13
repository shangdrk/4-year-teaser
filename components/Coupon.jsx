import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Coupon extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
    coupons: React.PropTypes.array.isRequired,
    history: React.PropTypes.array.isRequired,
  };

  constructor() {
    super();

    this.state = {

    };
  }

  render() {
    return (
      <div>Coupon</div>
    );
  }
}

export default connect(state => {
  return {
    coupons: state.coupon.coupons,
    history: state.coupon.history,
  };
})(Coupon);