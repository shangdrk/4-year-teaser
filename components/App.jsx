import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import store from '../redux/store';
import Coupon from './Coupon';
import Greeting from './Greeting';
import Quiz from './Quiz';

export class App extends Component {
  static propTypes = {

  };

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
    let props;
    const { section, subProps } = this.state;

    switch(section) {
      case 'Greeting':
        props = {
          ...subProps,
          onSectionChange: this.handleSectionChange,
        };
        return (<Greeting {...props} />);

      case 'Quiz':
        props = {
          ...subProps,
          onSectionChange: this.handleSectionChange,
        };
        return (<Quiz {...props}/>);

      case 'Coupon':
        props = {
          ...subProps,
          onSectionChange: this.handleSectionChange,
        };
        return (<Coupon {...props} />);

      default:
        props = {
          ...subProps,
          onSectionChange: this.handleSectionChange,
        };
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
