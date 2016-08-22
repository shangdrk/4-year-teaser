/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 *
 * Copyright (c) 2016 Da Shang <derekshang07@gmail.com>
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from '../redux/store';
import Coupon from './Coupon';
import Finale from './Finale';
import Greeting from './Greeting';
import Quiz from './Quiz';

export class App extends Component {
  constructor() {
    super();

    this.state = {
      section: 'Greeting',
      subProps: {},
    };
  }

  handleSectionChange = (section, subProps) => {
    subProps = subProps || {};

    return (e) => {
      this.setState({section, subProps});
    };
  };

  sectionToReactComponent = () => {
    const { section, subProps } = this.state;
    const props = {
      ...subProps,
      onSectionChange: this.handleSectionChange,
    };

    switch(section) {
      case 'Greeting':
        return (<Greeting {...props} />);

      case 'Quiz':
        return (<Quiz {...props}/>);

      case 'Coupon':
        return (<Coupon {...props} />);

      case 'Finale':
        return (<Finale {...props} />);

      default:
        return (<Greeting {...props} />);
    }
  };

  render() {
    return (
      <div className="container">
        {this.sectionToReactComponent()}
      </div>
    );
  }
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('content')
);
