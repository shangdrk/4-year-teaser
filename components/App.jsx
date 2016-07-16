var App = React.createClass({
  getInitialState: function() {
    return {

    };
  },

  render: function() {
    return (
      <div>
        <div id="intro" className="container">
          <div className="row">
            <div className="col-md-12">
              <h1>Welcome~</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  <App name="World" />,
  document.getElementById('content')
);