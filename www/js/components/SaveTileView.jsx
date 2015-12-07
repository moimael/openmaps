var React = require('react');
var Typeahead = require('./Typeahead.jsx');
var Toolbar = require('./Toolbar.jsx');
var MapComponent = require('./MapComponent.jsx');
var ActionMenu = require('./ActionMenu.jsx');
var Actions = require('../actions/Actions');

var SaveTilesView = React.createClass({

  handleSaveTiles() {
    Actions.handleSaveTiles();
  },

  render() {
    return (
      <div role="main">
        <Header title="Choose area to save"/>
        <Button id="save-tiles-button" rounded={true} onClick={this.handleSaveTiles}/>
      </div>
    );
  }
});

module.exports = SaveTilesView;
