var React = require('react/addons');
var SearchInput = require('./SearchInput.jsx');
var ListComponent = require('./ListComponent.jsx');
var Actions = require('../actions/Actions');

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Typeahead = React.createClass({

  handleChange: function(value) {
    Actions.fetchLocations(value);
  },

  handleSearchCompleted: function(location) {
    Actions.showLocation(location);
  },

  render: function() {
    return (
      <div className="autocomplete">
        <div className="action-bar">
          <form action="#">
            <SearchInput placeholder="Enter search terms" searchText={this.props.searchText} onChange={this.handleChange} />
          </form>
        </div>
        <ReactCSSTransitionGroup className="transitionGroup" transitionName="pull">
        { this.props.showSuggestions ?
          <section key="1" className="card" data-type="list">
            <ListComponent items={this.props.locations} onItemClicked={this.handleSearchCompleted} />
          </section> : null }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});

module.exports = Typeahead;
