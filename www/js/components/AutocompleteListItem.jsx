var React = require('react');
var Spinner = require('react-spinkit');
var AutocompleteItem = require('./AutocompleteItem.jsx');

var AutocompleteListItem = React.createClass({

  handleClick: function(location) {
    console.log(location);
    this.props.onSearchCompleted(location);
  },

  render: function() {
    var autocompleteItem = null;

    if (this.props.locations.length > 0) {
      autocompleteItem = this.props.locations.map(function(location) {
        return (
          <AutocompleteItem key={location.id} location={location} onSearchCompleted={this.props.onSearchCompleted.bind(this, location)} />
        );
      }, this);
    } else {
      autocompleteItem = <Spinner spinnerName='pulse'/>;
    }

    return (
         <ul>
          {autocompleteItem}
        </ul>
    );
  }
});

module.exports = AutocompleteListItem;