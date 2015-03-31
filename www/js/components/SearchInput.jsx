var React = require('react');

var SearchInput = React.createClass({

  propTypes: {
    searchText: React.PropTypes.string
  },

  handleChange: function(event) {
    console.log(event.target.value)
    this.props.onUserInput(
         event.target.value
    );
  },

  render: function() {
    return (
        <p>
          <input id="search-input" type="text" placeholder="Enter search terms" value={this.props.searchText} ref="searchTextInput" onInput={this.handleChange}/>
          <button id="clear-btn" type="reset">Clear</button>
        </p>
    );
  }
});

module.exports = SearchInput;