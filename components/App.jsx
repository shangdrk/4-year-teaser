import React, { Component } from 'react';

import Greeting from './Greeting';
import Quiz from './Quiz';

class App extends Component {
  static propTypes = {

  };

  constructor() {
    super();

    this.state = {
      section: 'Greeting',
    };
  }

  handleSectionChange = (section) => {
    return (e) => {
      this.setState({section});
    };
  };

  sectionToReactComponent = () => {
    let props;

    switch(this.state.section) {
      case 'Greeting':
        props = {
          onSectionChange: this.handleSectionChange,
        };
        return (<Greeting {...props} />);
      case 'Quiz':
        props = {
          onSectionChange: this.handleSectionChange,
        };
        return (<Quiz {...props}/>);
      default:
        props = {
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
  <App name="World" />,
  document.getElementById('content')
);
