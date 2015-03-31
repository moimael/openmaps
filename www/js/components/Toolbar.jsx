var React = require('react');
var Actions = require('../actions/Actions');

var ActionMenu = React.createClass({

  handleSwitchInput: function() {
    Actions.toggleActionbar()
;      // this.toggleSearchButton.toggleClass('pack-icon-search');
    // this.toggleSearchButton.toggleClass('pack-icon-route');
  },

  handleSwitchLayer: function() {
    Actions.toggleLayerMenu();
  },

  handleLocate: function(event) {
    this.props.onLocateClicked();
  },

  render: function() {
    return (
      <div id="tool">
        <button id="toggle-search-button" className="pack-icon-route" onClick={this.handleSwitchInput}></button>
        <button id="toggle-layers-button" className="pack-icon-layers" onClick={this.handleSwitchLayer}></button>
        <button id="locate-button" className="pack-icon-location" onClick={this.handleLocate}></button>
      </div>
    );
  }
});

module.exports = ActionMenu;