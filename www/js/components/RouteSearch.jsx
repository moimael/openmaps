var React = require('react/addons');
var SearchInput = require('./SearchInput.jsx');
var ListComponent = require('./ListComponent.jsx');
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

  toggleInstructions: function() {
    Actions.toggleInstructions();
  },

  goBack: function() {
    Actions.goBack();
  },

  doNothing: function() {
  },

// <div className="hbox center"><button><span className="icon icon-back">back</span></button><button><span className="icon icon-back">back</span></button><button><span className="icon icon-back">back</span></button></div>
// <button onClick={this.goBack} disabled={this.props.showRouteInputs ? null : "disabled"}><span className="icon icon-back">back</span></button>
  render: function() {
    return (
      <div className="routing-autocomplete">
        <section role="region" className="skin-dark route-header">
          <header>
            <menu type="toolbar">
              <button onClick={this.toggleInstructions}  disabled={this.props.hasRoute ? null : "disabled"}><span className="icon icon-menu">menu</span></button>
            </menu>
            <h1>Route</h1>
          </header>
        </section>
        <div className="routing-bar">
          <form action="#">
            <SearchInput placeholder="Start" searchText={this.props.routeStartText} onChange={this.handleRouteStartChange} />
            <SearchInput placeholder="End" searchText={this.props.routeEndText} onChange={this.handleRouteEndChange} />
          </form>
        </div>
        <ReactCSSTransitionGroup className="transitionGroup" transitionName="pull">
        { this.props.showSuggestions ?
          <section key="2" className="card" data-type="list">
            <ListComponent items={this.props.locations} onItemClicked={this.handleSearchCompleted}/>
          </section> : null }
        { this.props.showInstructions ?
          <section key="3" className="card" data-type="list">
            <ListComponent items={this.props.route.instructions} onItemClicked={this.doNothing}/>
          </section> : null }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});

module.exports = RouteSearch;
