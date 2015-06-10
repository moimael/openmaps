var React = require('react');
var Actions = require('../actions/Actions');

var SearchInput = React.createClass({

  handleChange: function(event) {
    console.log(event.target.value)
    Actions.fetchLocations(event.target.value);
  },

  render: function() {
    return (
        <p>
          <input id="search-input" type="text" placeholder="Enter search terms" ref="searchTextInput" onInput={this.handleChange}/>
          <button id="clear-btn" type="reset">Clear</button>
        </p>
    );
  }
});

module.exports = SearchInput;