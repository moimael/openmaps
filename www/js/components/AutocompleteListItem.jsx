var React = require('react');
var Spinner = require('react-spinkit');
var AutocompleteItem = require('./AutocompleteItem.jsx');

var AutocompleteListItem = React.createClass({

  handleClick: function(location) {
    this.props.onItemClicked(location);
  },

  render: function() {
    var autocompleteItem = null;

    if (this.props.locations.length > 0) {
      autocompleteItem = this.props.locations.map(function(location) {
        return (
          <AutocompleteItem key={location.id} location={location} onItemClicked={this.props.onItemClicked.bind(null, location)} />
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
