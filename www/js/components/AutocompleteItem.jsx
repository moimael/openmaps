var React = require('react');

var AutocompleteItem = React.createClass({

  propTypes: {
    location: React.PropTypes.object.isRequired
  },

  handleClick: function() {
    this.props.onSearchCompleted(this.props.location);
  },

  render: function () {
    return (
      <li onClick={this.handleClick}>
        <a href="#">
          <p>{this.props.location.name}</p>
          <p>{this.props.location.state ? this.props.location.state + ", " : null}{this.props.location.country}</p>
        </a>
      </li>
    );
  }
});

module.exports = AutocompleteItem;