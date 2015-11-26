var React = require('react');
var Actions = require('../actions/Actions');


var Header = React.createClass({

  goBack: function() {
    // this.props.map.clearRoutes();
    Actions.goBack();
  },

  render: function() {
    return (
      <section role="region" className="skin-dark route-header">
        <header>
          <button onClick={this.goBack}><span className="icon icon-back">back</span></button>
          {this.props.children}
          <h1>{this.props.title}</h1>
        </header>
      </section>
    );
  }
});

module.exports = Header;
