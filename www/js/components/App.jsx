var React = require('react');
var Typeahead = require('./Typeahead.jsx');
var RouteSearch = require('./RouteSearch.jsx');
var Toolbar = require('./Toolbar.jsx');
var MapComponent = require('./MapComponent.jsx');
var ActionMenu = require('./ActionMenu.jsx');
var UIStore = require('../stores/UIStore');
var RouteStore = require('../stores/RouteStore');

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

  getCurrentBoundsCenter() {
    if (this.refs.mapComponent !== undefined) {
      return this.refs.mapComponent.getBoundsCenter();
    }
    return this.state.ui.userPosition;
  },

  render() {
    let buttons = [
      {
        'id': 'map-view-button',
        'value': 'road',
        'text': 'Map'
      },
      {
        'id': 'satellite-view-button',
        'value': 'satellite',
        'text': 'Satellite'
      },
      {
        'id': 'cycle-view-button',
        'value': 'cycle',
        'text': 'Cycle'
      }
    ];
    return (
      <div role="main">
        {this.state.ui.showRoutingWidget ?
        <RouteSearch routeStartText={this.state.route.routeStartText} routeEndText={this.state.route.routeEndText} showSuggestions={this.state.route.showSuggestions} showInstructions={this.state.route.showInstructions} locations={this.state.route.locations} route={this.state.route.route} hasRoute={this.state.route.hasRoute} map={this.refs.mapComponent}/> :
        <Typeahead searchText={this.state.ui.searchText} showSuggestions={this.state.ui.showSuggestions} locations={this.state.ui.locations} bounds={this.getCurrentBoundsCenter()} />
        }

        <Toolbar routeMode={this.state.ui.showRoutingWidget} onLocateClicked={this.handleLocateClicked}/>
        <MapComponent id="map" ref="mapComponent" uiState={this.state.ui} routeState={this.state.route}/>
        {this.state.ui.showLayerMenu ?
        <ActionMenu title="Layers" items={buttons} /> : null}
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
