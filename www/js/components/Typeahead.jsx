var React = require('react');
var $ = require('jquery');
var SearchInput = require('./SearchInput.jsx');
var AutocompleteListItem = require('./AutocompleteListItem.jsx');
var Actions = require('../actions/Actions');

var Typeahead = React.createClass({

  componentDidMount: function() {
    this.jqXHR = null;
  },

  render: function() {
    return (
      <div id="autocomplete">
        <div id="action-bar">
          <form action="#">
            <SearchInput searchText={this.props.searchText}/>
          </form>
        </div>
        { this.props.showSuggestions ?
        <section className="card" data-type="list">
          <AutocompleteListItem locations={this.props.locations} />
        </section> : null }
      </div>
    );
  }
});

module.exports = Typeahead;