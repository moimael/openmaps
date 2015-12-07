var React = require('react');
var Actions = require('../actions/Actions');


var HeaderButton = React.createClass({
  render: function() {
    return (
      <button id={this.props.id} onClick={this.props.onClick}><span className="icon icon-back">back</span></button>
    );
  }
});

module.exports = HeaderButton;
