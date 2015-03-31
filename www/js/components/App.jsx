var React = require('react');
var Typeahead = require('./Typeahead.jsx');
var Toolbar = require('./Toolbar.jsx');
var MapComponent = require('./MapComponent.jsx');
var ActionMenu = require('./ActionMenu.jsx');
var UIStore = require('../stores/UIStore');

function getUIState() {
  return {
    ui: UIStore.getAll()
  };
}

var App = React.createClass({

  getInitialState: function() {
    return getUIState();
  },

  componentDidMount: function () {
    UIStore.addChangeListener(this._onChange);
  },

  componentWillUmount: function () {
    UIStore.removeChangeListener(this._onChange);
  },

  handleLocateClicked: function() {
    this.refs.mapComponent.locate();
  },

  render: function() {
    return (
      <div role="main">
        <Typeahead />
        {this.state.ui.showRoutingWidget ?
        <Typeahead /> : null}

        <Toolbar onLocateClicked={this.handleLocateClicked}/>
        <MapComponent id="map" ref="mapComponent" mapState={this.state.ui}/>
        {this.state.ui.showLayerMenu ?
        <ActionMenu /> : null}
      </div>
    );
  },

  _onChange: function() {
    this.setState(getUIState());
  }

});

module.exports = App;