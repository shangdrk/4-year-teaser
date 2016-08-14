import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from 'react-slick';

import CouponCard from './CouponCard';
import * as couponActions from '../redux/modules/coupon';

export class Coupon extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    coupons: React.PropTypes.array,
    history: React.PropTypes.array,
    username: React.PropTypes.string.isRequired,
    onSectionChange: React.PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.state = {

    };
  }

  componentWillMount() {
    const { dispatch, username } = this.props;
    dispatch(couponActions.fetchBuildResults(username));
  }

  handleUseCoupon = (uniqueId) => {
    return (e) => {
      const { dispatch, username } = this.props;
      dispatch(couponActions.fetchConsumeResults(uniqueId, username));
    };
  };

  getCouponCards() {
    const { coupons } = this.props;
    return coupons.map((coupon, index) => {
      return (
        <div key={`card-${index}`}>
          <CouponCard coupon={coupon} onUseCoupon={this.handleUseCoupon} />
        </div>
      );
    });
  }

  render() {
    const settings = {
      centerMode: true,
      dots: true,
      draggable: false,
      infinite: false,
      afterChange: null,
    };

    return (
      <div>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand">❤️</a>
            </div>
            <div className="collapse navbar-collapse">
              <span className="navbar-text">{this.props.username}</span>
              <a className="navbar-text navbar-right">next step >></a>
            </div>
          </div>
        </nav>
        <Slider {...settings}>
          {this.getCouponCards()}
        </Slider>
      </div>
    );
  }
}

export default connect(state => {
  return {
    coupons: state.coupon.coupons,
    history: state.coupon.history,
  };
})(Coupon);