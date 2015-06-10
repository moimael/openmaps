var React = require('react');
var Typeahead = require('./Typeahead.jsx');
var Toolbar = require('./Toolbar.jsx');
var MapComponent = require('./MapComponent.jsx');
var ActionMenu = require('./ActionMenu.jsx');
var UIStore = require('../stores/UIStore');

var App = React.createClass({

  getInitialState() {
    return UIStore.getState();
  },

  componentDidMount() {
    UIStore.listen(this.onChange);
  },

  componentWillUmount() {
    UIStore.unlisten(this.onChange);
  },

  handleLocateClicked() {
    this.refs.mapComponent.locate();
  },

  render() {
    return (
      <div role="main">
        <Typeahead searchText={this.state.searchText} showSuggestions={this.state.showSuggestions} locations={this.state.locations}/>
        {this.state.showRoutingWidget ?
        <Typeahead /> : null}

        <Toolbar onLocateClicked={this.handleLocateClicked}/>
        <MapComponent id="map" ref="mapComponent" mapState={this.state}/>
        {this.state.showLayerMenu ?
        <ActionMenu /> : null}
      </div>
    );
  },

  onChange(state) {
    this.setState(state);
  }

});

module.exports = App;