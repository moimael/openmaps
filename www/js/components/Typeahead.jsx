var React = require('react');
var $ = require('jquery');
var SearchInput = require('./SearchInput.jsx');
var AutocompleteListItem = require('./AutocompleteListItem.jsx');
var Actions = require('../actions/Actions');
var LocationStore = require('../stores/LocationStore');

var Typeahead = React.createClass({

  getInitialState: function() {
    return {
        searchText: '',
        loading: false,
        showResults: false
    };
  },

  componentDidMount: function() {
    this.jqXHR = null;
  },

  handleUserInput: function(searchText) {
    this.setState({
        searchText: searchText,
        showSuggestions: true
    }, function() {
      this.searchPlace();
    });
  },

  searchPlace: function() {

    if ( !this.state.searchText ) {
        this.setState({
          showResults: false
        });
        return;
    }

    var search_params = {
        'q': this.state.searchText,
        'limit': '8'
    };

    // Abort current request if another one was launched in the mean time
    if (this.jqXHR !== null) {
        this.jqXHR.abort();
    }

    this.jqXHR = LocationStore.fetch({
        reset: true,
        data: $.param(search_params)
    });
  },

  render: function() {
    return (
      <div id="autocomplete">
        <div id="action-bar">
          <form action="#">
            <SearchInput searchText={this.state.searchText} onUserInput={this.handleUserInput} />
          </form>
        </div>
        { this.state.showSuggestions ?
        <section className="card" data-type="list">
          <AutocompleteListItem locationStore={LocationStore} />
        </section> : null }
      </div>
    );
  }
});

module.exports = Typeahead;