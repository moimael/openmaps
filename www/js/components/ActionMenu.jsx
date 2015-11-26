var React = require('react');
var Actions = require('../actions/Actions');

var ActionMenu = React.createClass({

  handleChangeLayer: function(event) {
    Actions.changeLayer(event.target.value);
    this.handleClose();
  },

  handleSaveTiles: function() {
    Actions.showSaveTiles();
    this.handleClose();
  },

  handleClose: function() {
    Actions.toggleLayerMenu();
  },

  render: function() {
    return (
      <div id="action-menu">
        <form data-type="action" role="dialog">
          <header>Layers</header>
          <menu>
            <button type="button" id="map-view-button" value="road" onClick={this.handleChangeLayer}>Map</button>
            <button type="button" id="satellite-view-button" value="satellite" onClick={this.handleChangeLayer}>Satellite</button>
            <button type="button" id="cycle-view-button" value="cycle" onClick={this.handleChangeLayer}>Cycle</button>
            <button type="button" id="offline-save-button" value="save" onClick={this.handleSaveTiles}>Save area</button>
            <button type="button" id="cancel-button" onClick={this.handleClose}>Cancel</button>
          </menu>
        </form>
      </div>
    );
  }
});

module.exports = ActionMenu;
