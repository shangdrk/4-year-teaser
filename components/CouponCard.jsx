import React, { Component } from 'react';
import classnames from 'classnames';
import moment from 'moment';

export default class CouponCard extends Component {
  static propTypes = {
    coupon: React.PropTypes.object.isRequired,
    onUseCoupon: React.PropTypes.func.isRequired,
  }

  constructor() {
    super();

    this.state = {
      stack: false,
      activeIndex: -1,
    };
  }

  componentWillMount() {
    const { quantity } = this.props.coupon;

    this.setState({stack: (quantity > 1)});
  }

  handleSelectCoupon = (index) => {
    return (e) => {
      this.setState({activeIndex: index});
    };
  }

  createCoupon(index) {
    const { coupon, onUseCoupon } = this.props;
    const couponClassname = classnames({
      'CouponCard-card': true,
      'CouponCard-left': (index % 2) === 0 && this.state.stack,
      'CouponCard-right': (index % 2) === 1 && this.state.stack,
      'col-sm-9': this.state.stack,
      'active': this.state.activeIndex === index,
    });

    return (
      <div
        className={couponClassname}
        key={`card-stack-${index}`}
        onClick={this.handleSelectCoupon(index)} >
        <div className="CouponCard-block row">
          <div className="col-sm-8">
            <h4>{coupon.description}</h4>
            <button
              className="btn btn-primary"
              onClick={onUseCoupon(coupon['unique-id'][index])}>
              使用
            </button>
          </div>
          <div className="col-sm-4">
            <p className="text-center compact-para">有效期至：{coupon['expiration-date'] ?
              moment(coupon['expiration-date']).format('MM/DD/YYYY') : '永久'}</p>
            <p className="text-center compact-para">编号：{coupon['unique-id'][index]}</p>
            <p className="text-center compact-para">持有者：{coupon.owner}</p>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const quantity = this.props.coupon.quantity,
      cards = [];

    for (let i=0; i<quantity; i++) {
      cards.push(this.createCoupon(i));
    }

    return (
      <div className="CouponCard-container row">
        {cards}
      </div>
    );
  }
}
