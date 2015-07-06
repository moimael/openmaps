var React = require('react/addons');
var SearchInput = require('./SearchInput.jsx');
var AutocompleteListItem = require('./AutocompleteListItem.jsx');
var Actions = require('../actions/Actions');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var RouteSearch = React.createClass({

  handleRouteStartChange: function(value) {
    Actions.fetchStartLocations(value);
  },

  handleRouteEndChange: function(value) {
    Actions.fetchEndLocations(value);
  },

  handleSearchCompleted: function(location) {
    Actions.confirmLocation(location);
  },

  render: function() {
    return (
      <div className="routing-autocomplete">
        <div className="routing-bar">
          <form action="#">
            <SearchInput placeholder="Start" searchText={this.props.routeStartText} onChange={this.handleRouteStartChange} />
            <SearchInput placeholder="End" searchText={this.props.routeEndText} onChange={this.handleRouteEndChange} />
          </form>
        </div>
        <ReactCSSTransitionGroup className="transitionGroup" transitionName="pull">
        { this.props.showSuggestions ?
          <section key="2" className="card" data-type="list">
            <AutocompleteListItem locations={this.props.locations} onItemClicked={this.handleSearchCompleted}/>
          </section> : null }
        { this.props.showInstructions ?
          <section key="3" className="card" data-type="list">
            <AutocompleteListItem locations={this.props.route.instructions} onItemClicked={this.handleSearchCompleted}/>
          </section> : null }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});

module.exports = RouteSearch;
