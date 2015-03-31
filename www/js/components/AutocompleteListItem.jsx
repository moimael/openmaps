var React = require('react');
var FluxBoneMixin = require('../constants/FluxBoneMixin');
var AutocompleteItem = require('./AutocompleteItem.jsx');

var AutocompleteListItem = React.createClass({

  mixins: [FluxBoneMixin.CollectionMixin('locationStore', 'add remove reset')],

  render: function() {
    var autocompleteItem = this.props.locationStore.map(function(location) {
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