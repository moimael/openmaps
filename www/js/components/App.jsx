var React = require('react');
var Typeahead = require('./Typeahead.jsx');
var RouteSearch = require('./RouteSearch.jsx');
var Toolbar = require('./Toolbar.jsx');
var MapComponent = require('./MapComponent.jsx');
var ActionMenu = require('./ActionMenu.jsx');
var UIStore = require('../stores/UIStore');
var RouteStore = require('../stores/RouteStore');
var Actions = require('../actions/Actions');
import Button from './Button.jsx'
import Header from './Header.jsx'

var App = React.createClass({

  getInitialState() {
    return {
      ui: UIStore.getState(),
      route: RouteStore.getState()
    };
  },

  componentDidMount() {
    UIStore.listen(this.onChange);
    RouteStore.listen(this.onChange);
    this.handleLocateClicked();
  },

  componentWillUmount() {
    UIStore.unlisten(this.onChange);
    RouteStore.unlisten(this.onChange);
  },

  handleLocateClicked() {
    this.refs.mapComponent.locate();
  },

  handleSaveTiles() {
    Actions.saveTiles();
  },

  getCurrentBoundsCenter() {
    if (this.refs.mapComponent !== undefined) {
      return this.refs.mapComponent.getBoundsCenter();
    }
    return this.state.ui.userPosition;
  },

  render() {
    if (this.state.ui.shouldTilesBeSaved) {
      this.refs.mapComponent.saveTiles();
    }
    return (
      <div role="main">
        {this.state.ui.showSaveTiles ?
        <Header title="Choose area to save"/> : null}
        {this.state.ui.showRoutingWidget ?
        <RouteSearch routeStartText={this.state.route.routeStartText} routeEndText={this.state.route.routeEndText} showSuggestions={this.state.route.showSuggestions} showInstructions={this.state.route.showInstructions} locations={this.state.route.locations} route={this.state.route.route} hasRoute={this.state.route.hasRoute} map={this.refs.mapComponent} /> : null}

        {!this.state.ui.showRoutingWidget && !this.state.ui.showSaveTiles ?
        <Typeahead searchText={this.state.ui.searchText} showSuggestions={this.state.ui.showSuggestions} locations={this.state.ui.locations} bounds={this.getCurrentBoundsCenter()} /> : null}

        {this.state.ui.showSaveTiles ?
        <Button id="save-tiles-button" rounded={true} onClick={this.handleSaveTiles} /> :
        <Toolbar routeMode={this.state.ui.showRoutingWidget} onLocateClicked={this.handleLocateClicked}/>}

        <MapComponent id="map" ref="mapComponent" uiState={this.state.ui} routeState={this.state.route}/>
        {this.state.ui.showLayerMenu ?
        <ActionMenu /> : null}
      </div>
    );
  },

  onChange() {
    this.setState({
      ui: UIStore.getState(),
      route: RouteStore.getState()
    });
  }

});

module.exports = App;
