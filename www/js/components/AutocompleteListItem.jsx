var React = require('react');
var AutocompleteItem = require('./AutocompleteItem.jsx');

var AutocompleteListItem = React.createClass({

  // mixins: [FluxBoneMixin.CollectionMixin('locationStore', 'add remove reset')],

  render: function() {
    console.log(this.props.locations);
    var autocompleteItem = this.props.locations.map(function(location) {
      return (
        <AutocompleteItem key={location.id} location={location} />
      );
    });
    return (
      <ul>
        {autocompleteItem}
      </ul>
    );
  }
});

module.exports = AutocompleteListItem;