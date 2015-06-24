var React = require('react');
var Actions = require('../actions/Actions');

var ActionMenu = React.createClass({

  handleSwitchInput: function() {
    Actions.toggleActionbar();
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
        <button id="toggle-search-button" className={this.props.routeMode ? "pack-icon-search" : "pack-icon-route"} onClick={this.handleSwitchInput}></button>
        <button id="toggle-layers-button" className="pack-icon-layers" onClick={this.handleSwitchLayer}></button>
        <button id="locate-button" className="pack-icon-location" onClick={this.handleLocate}></button>
      </div>
    );
  }
});

module.exports = ActionMenu;