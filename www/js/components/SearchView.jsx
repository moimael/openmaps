var React = require('react');
var Typeahead = require('./Typeahead.jsx');
var Toolbar = require('./Toolbar.jsx');
var MapComponent = require('./MapComponent.jsx');
var ActionMenu = require('./ActionMenu.jsx');

var SearchView = React.createClass({

  componentDidMount() {
    this.handleLocateClicked();
  },

  handleLocateClicked() {
    this.refs.mapComponent.locate();
  },

  getCurrentBoundsCenter() {
    if (this.refs.mapComponent !== undefined) {
      return this.refs.mapComponent.getBoundsCenter();
    }
    return this.props.uiState.userPosition;
  },

  render() {
    return (
      <div role="main">
        <Typeahead searchText={this.props.uiState.searchText} showSuggestions={this.props.uiState.showSuggestions} locations={this.props.uiState.locations} bounds={this.getCurrentBoundsCenter()} />
        <Toolbar routeMode={false} onLocateClicked={this.handleLocateClicked}/>
        {this.props.uiState.showLayerMenu ?
        <ActionMenu /> : null}
      </div>
    );
  }

});

module.exports = SearchView;
