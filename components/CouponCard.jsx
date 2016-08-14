import React, { Component } from 'react';
import moment from 'moment';

export default class CouponCard extends Component {
  static propTypes = {
    coupon: React.PropTypes.object.isRequired,
    onUseCoupon: React.PropTypes.func.isRequired,
  }

  constructor() {
    super();

    this.state = {

    };
  }

  render() {
    const { coupon, onUseCoupon } = this.props;

    return (
      <div className="CouponCard-card">
        <div className="CouponCard-block row">
          <div className="col-sm-8">
            <h4>{coupon.description}</h4>
            <button
              className="btn btn-primary"
              onClick={onUseCoupon(coupon['unique-id'])}>
              使用
            </button>
          </div>
          <div className="col-sm-4">
            <p className="text-center compact-para">有效期至：{coupon['expiration-date'] ?
              moment(coupon['expiration-date']) : '永久'}</p>
            <p className="text-center compact-para">编号：{coupon['unique-id']}</p>
            <p className="text-center compact-para">持有者：{coupon.owner}</p>
          </div>
        </div>
      </div>
    );
  }
}
