var React = require('react');
var Actions = require('../actions/Actions');
var WaypointStore = require('../stores/WaypointStore');

var AutocompleteItem = React.createClass({

  propTypes: {
    location: React.PropTypes.object.isRequired
  },

  componentDidMount: function () {
    WaypointStore.addChangeListener(this._onChange);
  },

  componentWillUmount: function () {
    WaypointStore.removeChangeListener(this._onChange);
  },

  completeSearch: function () {
    Actions.addWaypoint(this.props.location);
  },

  render: function () {
    return (
      <li onClick={this.completeSearch}>
        <a href="#">
          <p>{this.props.location.get('name')}</p>
          <p>{this.props.location.get('state')}, {this.props.location.get('country')}</p>
        </a>
      </li>
    );
  }
});

module.exports = AutocompleteItem;