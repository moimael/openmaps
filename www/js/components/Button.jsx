var React = require('react');


var Button = React.createClass({
  render: function() {
    return (
      <button id={this.props.id} className={this.props.rounded ? 'rounded-button icon-download' : null} onClick={this.props.onClick}></button>
    );
  }
});

module.exports = Button;
