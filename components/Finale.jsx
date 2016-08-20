import React, { Component } from 'react';
import text from '../assets/finale-template';

export default class Finale extends Component {
  static propTypes = {
    username: React.PropTypes.string.isRequired,
    onSectionChange: React.PropTypes.func.isRequired,
  };

  constructor() {
    super();
  }

  render() {
    const { onSectionChange, username } = this.props;
    const repoUrl = 'https://github.com/shangdrk/4-year-teaser';

    return (
      <div>
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
            <div className="collapse navbar-collapse">
              <span onClick={onSectionChange('Coupon', {username: 'leona'})}>
                <a className="navbar-text">
                  <span className="glyphicon glyphicon-menu-left"></span>
                </a>
                <span className="navbar-text navbar-no-left-margin">Back to coupons</span>
              </span>
              <span className="navbar-right">
                <span className="navbar-text">❤️</span>
                <span className="navbar-text navbar-no-left-margin">{username}</span>
              </span>
            </div>
          </div>
        </nav>
        <main id="finale-main">
          <p>{text.letterTop}</p>
          <p>如果你感兴趣的话，我把源代码（不包含 app data）都推到了 GitHub 上，可以直接看：</p>
          <div style={{'text-align': 'center', 'margin-bottom': '30px'}}>
            <a href={repoUrl} target=" _blank" className="Finale-better-font">{repoUrl}</a>
          </div>
          <p>{text.letterBot}</p>
          <p className="pull-right Finale-better-font">@derex</p>
        </main>
      </div>
    );
  }
}
