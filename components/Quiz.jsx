import 'whatwg-fetch';
import React, { Component } from 'react';

export default class Quiz extends Component {
  static propTypes = {
    onSectionChange: React.PropTypes.func.isRequired,
  };

  constructor() {
    super();

    this.state = {
  
    };
  }

  handleClick = (e) => {
    fetch('/api/coupon/build-limited', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: 'derex',
      }),
    }).then(data => {
      console.log(data);
    });
  };

  render() {
    return (
      <button onClick={this.handleClick}>
        Click for database test
      </button>
    );
  }
}
