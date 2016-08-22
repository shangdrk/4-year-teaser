/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2016 Da Shang <derekshang07@gmail.com>
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import Slider from 'react-slick';

import CouponCard from './CouponCard';
import * as couponActions from '../redux/modules/coupon';

export class Coupon extends Component {
  static propTypes = {
    dispatch: React.PropTypes.func,
    coupons: React.PropTypes.array,
    history: React.PropTypes.array,
    buildLimitedComplete: React.PropTypes.bool,
    username: React.PropTypes.string.isRequired,
    onSectionChange: React.PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.state = {
      firstTime: false,
      showBuildLimited: false,
      showModal: false,
    };
  }

  componentWillMount() {
    const { dispatch, username } = this.props;

    dispatch(couponActions.fetchBuildLimitedStatus(username));
    dispatch(couponActions.fetchBuildResults(username));
  }

  componentWillReceiveProps(newProps) {
    if (!newProps.buildLimitedComplete) {
      this.setState({firstTime: true});
    }
  }

  getTotalQuantity() {
    console.log('in the function');
    const { coupons } = this.props;

    return coupons.reduce((prev, cur) => {
      return prev + cur.quantity;
    }, 0);
  }

  handleUseCoupon = (uniqueId) => {
    return (e) => {
      const { dispatch, username } = this.props;
      dispatch(couponActions.fetchConsumeResults(username, uniqueId));
    };
  };

  handleBuildLimited = (e) => {
    const { dispatch, username } = this.props;
    dispatch(couponActions.fetchBuildLimitedResults(username))
    .then(() => dispatch(couponActions.fetchBuildLimitedStatus(username)));
  };

  handleSlideChange = (index) => {
    const { coupons } = this.props;
    if (index === coupons.length - 1) {
      if (!this.props.buildLimitedComplete) {
        this.setState({
          showBuildLimited: true,
        });
      } else if (this.state.firstTime) {
        this.setState({
          showModal: true,
          firstTime: false,
        });
      }
    }
  };

  handleHideModal = (e) => {
    this.setState({showModal: false});
  }

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

  getNoteModal() {
    const modalStyle = {
      content: {
        'position': 'absolute',
        'backgroundColor': 'rgba(0, 0, 0, 0)',
        'border': 'none',
        'width': '35%',
        'margin': 'auto',
        'top': '20vh',
      },
    };

    return (
      <Modal isOpen={this.state.showModal} style={modalStyle} >
        <div className="modal-content">
          <div className="modal-body">
            <p>You can come back to this page whenever you want.
            So don't hesitate to click "next step" :) in the upper right corner</p>
          </div>
          <div className="modal-footer">
            <button className="btn btn-primary" onClick={this.handleHideModal}>
              Got it
            </button>
          </div>
        </div>
      </Modal>
    );
  }

  render() {
    const { buildLimitedComplete, onSectionChange, username } = this.props;
    const { showBuildLimited } = this.state;
    const settings = {
      centerMode: true,
      dots: true,
      draggable: false,
      infinite: false,
      afterChange: this.handleSlideChange,
    };

    return (
      <div>
        {this.getNoteModal()}
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand">❤️</a>
            </div>
            <div className="collapse navbar-collapse">
              <span className="navbar-text">{username}</span>
              <span className="navbar-right">
                <a className="navbar-text" onClick={onSectionChange('Finale', {username})}>
                  next step
                </a>
                <span className="navbar-text navbar-no-left-margin">
                  <span className="glyphicon glyphicon-circle-arrow-right" aria-hidden="true"></span>
                </span>
              </span>
            </div>
          </div>
        </nav>
        <Slider {...settings}>
          {this.getCouponCards()}
        </Slider>
        <span className="Coupon-quantity">Total quantity: {this.getTotalQuantity()}</span>
        {showBuildLimited && !buildLimitedComplete ?
          <div className="Coupon-limited-dialog text-center">
            <p>是否还想随机抽取一张至尊酷胖？</p>
            <button
              className="btn btn-success"
              onClick={this.handleBuildLimited} >
              走起
            </button>
          </div> : null}
      </div>
    );
  }
}

export default connect(state => {
  return {
    coupons: state.coupon.coupons,
    history: state.coupon.history,
    buildLimitedComplete: state.coupon.buildLimitedComplete,
  };
})(Coupon);