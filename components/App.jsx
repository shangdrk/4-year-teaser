import React, { Component } from 'react';

import Greeting from './Greeting';

class App extends Component {
  static propTypes = {

  };

  constructor() {
    super();

    this.state = {

    };
  }

  render() {
    return (
      <div className="container">
        <Greeting />
      </div>
    );
  }
}

ReactDOM.render(
  <App name="World" />,
  document.getElementById('content')
);
