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
        {this.props.routeMode ? null :
        <button id="toggle-search-button" className="pack-icon-route rounded-button" onClick={this.handleSwitchInput}></button>}
        <button id="toggle-layers-button" className="pack-icon-layers rounded-button" onClick={this.handleSwitchLayer}></button>
        <button id="locate-button" className="pack-icon-location rounded-button" onClick={this.handleLocate}></button>
      </div>
    );
  }
});

module.exports = ActionMenu;
