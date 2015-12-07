var React = require('react');
var Typeahead = require('./Typeahead.jsx');
var Toolbar = require('./Toolbar.jsx');
var MapComponent = require('./MapComponent.jsx');
var ActionMenu = require('./ActionMenu.jsx');

var RouteView = React.createClass({

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
    return (
      <div role="main">
        <RouteSearch routeStartText={this.state.route.routeStartText} routeEndText={this.state.route.routeEndText} showSuggestions={this.state.route.showSuggestions} showInstructions={this.state.route.showInstructions} locations={this.state.route.locations} route={this.state.route.route} hasRoute={this.state.route.hasRoute} map={this.refs.mapComponent}/>
        <Toolbar routeMode={this.state.ui.showRoutingWidget} onLocateClicked={this.handleLocateClicked}/>
        {this.state.ui.showLayerMenu ?
        <ActionMenu /> : null}
      </div>
    );
  }
});

module.exports = RouteView;
